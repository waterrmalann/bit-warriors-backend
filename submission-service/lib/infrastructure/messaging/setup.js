import { Kafka } from 'kafkajs';
import environment from '../config/environment.js';

const kafka = new Kafka({
    clientId: 'submission-service',
    brokers: environment.KAFKA_BROKERS
});

export default kafka;