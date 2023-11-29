import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'problem-service',
    brokers: ['localhost:29092'],
});

export default kafka;