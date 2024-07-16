import { PrismaClient } from '@prisma/client'
import { Kafka } from 'kafkajs'

const TOPIC_NAME = 'zap-events';

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

const client = new PrismaClient()

async function main() {
    const producer = kafka.producer();
    await producer.connect();
    
    try {
        while (true) {
            const pendingRows = await client.zapRunOutbox.findMany({
                where: {},
                take: 10
            })
            
            if (pendingRows.length > 0) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: pendingRows.map(r => ({
                        value: r.zapRunId.toString()  // Ensure value is a string
                    }))
                })
            }

            // Add a delay to avoid tight loop
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error('Error in processing:', error);
    } finally {
        await producer.disconnect();
        await client.$disconnect();
    }
}

main();
