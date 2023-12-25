import kafka from '../../infrastructure/messaging/setup.js';
import UpdateUserStatsInteractor from '../../application/use-cases/events/UpdateUserStats.js';
import UserRepository from '../../infrastructure/repositories/UserRepositoryMongo.js';
console.log("started kafka")

const userRepository = new UserRepository();

const consumer = kafka.consumer({ groupId: 'user-stats-consumer-group' });

const run = async () => {

    await consumer.connect();
    console.log("💬 Established connection with Kafka.");

    await consumer.subscribe({ topics: ['USER_STATS'] });
    console.log("\t - Subscribed to USER_STATS");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            switch (topic) {
                case "USER_STATS": {
                    console.log("[USER_STATS] An update was received.");
                    await UpdateUserStatsInteractor(
                        data.userId,
                        { totalSubmissions: data.totalSubmissions, totalScore: data.totalScore },
                        { userRepository: userRepository }
                    );
                    break;
                }
            }
        },
    });
};


run().catch(console.error);

export default run;