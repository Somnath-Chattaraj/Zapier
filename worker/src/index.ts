require('dotenv').config()

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./solana";

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker-2' });
    await consumer.connect();
    const producer =  kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
  autoCommit: false,
  eachMessage: async ({ topic, partition, message }) => {
    const rawValue = message.value?.toString();
    console.log({
      partition,
      offset: message.offset,
      value: rawValue,
    });

    if (!rawValue) {
      console.warn("⚠️ Empty Kafka message, skipping...");
      await commitOffset();
      return;
    }

    let parsedValue;
    try {
      parsedValue = JSON.parse(rawValue);
    } catch (err) {
      console.warn("⚠️ Invalid JSON in message, skipping...");
      await commitOffset();
      return;
    }

    const zapRunId = parsedValue.zapRunId;
    const stage = parsedValue.stage;

    if (!zapRunId || typeof stage !== "number") {
      console.warn("⚠️ Missing zapRunId or stage, skipping...");
      await commitOffset();
      return;
    }

    const zapRunDetails = await prismaClient.zapRun.findFirst({
      where: { id: zapRunId },
      include: {
        zap: {
          include: {
            actions: { include: { type: true } }
          }
        },
      }
    });

    if (!zapRunDetails?.zap?.actions) {
      console.warn(`⚠️ No zap or actions found for zapRunId ${zapRunId}, skipping...`);
      await commitOffset();
      return;
    }

    const currentAction = zapRunDetails.zap.actions.find(x => x.sortingOrder === stage);
    if (!currentAction) {
      console.warn(`⚠️ No action found at stage ${stage}, skipping...`);
      await commitOffset();
      return;
    }

    const zapRunMetadata = zapRunDetails.metadata;

    try {
      if (currentAction.type.id === "email") {
        const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
        const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
        if (!to || !body) throw new Error("Invalid email action fields");

        console.log(`📧 Sending out email to ${to} | Body: ${body}`);
        await sendEmail(to, body);
      }

      if (currentAction.type.id === "send-sol") {
        const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
        const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
        if (!amount || !address) throw new Error("Invalid SOL action fields");

        console.log(`🪙 Sending out SOL of ${amount} to address ${address}`);
        await sendSol(address, amount);
      }
    } catch (err) {
      console.error("❌ Action execution failed:", err);
      await commitOffset(); // still commit to avoid retry loop on bad input
      return;
    }

    await new Promise(r => setTimeout(r, 500));

    const lastStage = (zapRunDetails.zap.actions.length || 1) - 1;
    if (stage < lastStage) {
      console.log("➡️ Pushing next stage to queue...");
      await producer.send({
        topic,
        messages: [{
          value: JSON.stringify({
            zapRunId,
            stage: stage + 1
          })
        }]
      });
    }

    console.log("✅ Processing done.");

    await commitOffset();

    // commitOffset helper to avoid repeating the same logic
    async function commitOffset() {
      await consumer.commitOffsets([{
        topic,
        partition,
        offset: (parseInt(message.offset) + 1).toString()
      }]);
    }
  },
});

}

main()