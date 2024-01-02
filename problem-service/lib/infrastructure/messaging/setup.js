import { Kafka } from 'kafkajs';
import environment from '../config/environment';

const kafka = new Kafka({
    clientId: 'problem-service',
    brokers: environment.KAFKA_BROKERS,
});

export default kafka;