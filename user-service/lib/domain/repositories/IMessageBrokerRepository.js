export default class IMessageBrokerRepository {
    async produceMessage(topic, message) {
        throw new Error('produceMessage method not implemented');
    }

    async consumeMessage(topic, callback) {
        throw new Error('consumeMessage method not implemented');
    }
}