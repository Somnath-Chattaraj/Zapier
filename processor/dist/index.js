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
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const TOPIC_NAME = 'zap-events';
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
const client = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer();
        yield producer.connect();
        try {
            while (true) {
                const pendingRows = yield client.zapRunOutbox.findMany({
                    where: {},
                    take: 10
                });
                if (pendingRows.length > 0) {
                    yield producer.send({
                        topic: TOPIC_NAME,
                        messages: pendingRows.map(r => ({
                            value: r.zapRunId.toString() // Ensure value is a string
                        }))
                    });
                }
                // Add a delay to avoid tight loop
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        catch (error) {
            console.error('Error in processing:', error);
        }
        finally {
            yield producer.disconnect();
            yield client.$disconnect();
        }
    });
}
main();
