import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'submission-service',
    brokers: ['localhost:29092'],
});

export default kafka;