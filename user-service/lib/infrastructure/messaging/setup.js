import { Kafka } from 'kafkajs';
import environment from '../config/environment.js';

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: environment.KAFKA_BROKERS,
});

export default kafka;