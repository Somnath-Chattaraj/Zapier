"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const parser_1 = require("./parser");
const email_1 = require("./email");
const solana_1 = require("./solana");
const prismaClient = new client_1.PrismaClient();
const TOPIC_NAME = "zap-events";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: 'main-worker-2' });
        yield consumer.connect();
        const producer = kafka.producer();
        yield producer.connect();
        yield consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d, _e, _f, _g;
                const rawValue = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString();
                console.log({
                    partition,
                    offset: message.offset,
                    value: rawValue,
                });
                if (!rawValue) {
                    console.warn("⚠️ Empty Kafka message, skipping...");
                    yield commitOffset();
                    return;
                }
                let parsedValue;
                try {
                    parsedValue = JSON.parse(rawValue);
                }
                catch (err) {
                    console.warn("⚠️ Invalid JSON in message, skipping...");
                    yield commitOffset();
                    return;
                }
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                if (!zapRunId || typeof stage !== "number") {
                    console.warn("⚠️ Missing zapRunId or stage, skipping...");
                    yield commitOffset();
                    return;
                }
                const zapRunDetails = yield prismaClient.zapRun.findFirst({
                    where: { id: zapRunId },
                    include: {
                        zap: {
                            include: {
                                actions: { include: { type: true } }
                            }
                        },
                    }
                });
                if (!((_c = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap) === null || _c === void 0 ? void 0 : _c.actions)) {
                    console.warn(`⚠️ No zap or actions found for zapRunId ${zapRunId}, skipping...`);
                    yield commitOffset();
                    return;
                }
                const currentAction = zapRunDetails.zap.actions.find(x => x.sortingOrder === stage);
                if (!currentAction) {
                    console.warn(`⚠️ No action found at stage ${stage}, skipping...`);
                    yield commitOffset();
                    return;
                }
                const zapRunMetadata = zapRunDetails.metadata;
                try {
                    if (currentAction.type.id === "email") {
                        const body = (0, parser_1.parse)((_d = currentAction.metadata) === null || _d === void 0 ? void 0 : _d.body, zapRunMetadata);
                        const to = (0, parser_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.email, zapRunMetadata);
                        if (!to || !body)
                            throw new Error("Invalid email action fields");
                        console.log(`📧 Sending out email to ${to} | Body: ${body}`);
                        yield (0, email_1.sendEmail)(to, body);
                    }
                    if (currentAction.type.id === "send-sol") {
                        const amount = (0, parser_1.parse)((_f = currentAction.metadata) === null || _f === void 0 ? void 0 : _f.amount, zapRunMetadata);
                        const address = (0, parser_1.parse)((_g = currentAction.metadata) === null || _g === void 0 ? void 0 : _g.address, zapRunMetadata);
                        if (!amount || !address)
                            throw new Error("Invalid SOL action fields");
                        console.log(`🪙 Sending out SOL of ${amount} to address ${address}`);
                        yield (0, solana_1.sendSol)(address, amount);
                    }
                }
                catch (err) {
                    console.error("❌ Action execution failed:", err);
                    yield commitOffset(); // still commit to avoid retry loop on bad input
                    return;
                }
                yield new Promise(r => setTimeout(r, 500));
                const lastStage = (zapRunDetails.zap.actions.length || 1) - 1;
                if (stage < lastStage) {
                    console.log("➡️ Pushing next stage to queue...");
                    yield producer.send({
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
                yield commitOffset();
                // commitOffset helper to avoid repeating the same logic
                function commitOffset() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield consumer.commitOffsets([{
                                topic,
                                partition,
                                offset: (parseInt(message.offset) + 1).toString()
                            }]);
                    });
                }
            }),
        });
    });
}
main();
