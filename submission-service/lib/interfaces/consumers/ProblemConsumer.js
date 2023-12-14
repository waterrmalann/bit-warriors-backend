import AddTestsInteractor from '../../application/use-cases/events/AddTests.js';
import EditTestsInteractor from '../../application/use-cases/events/EditTests.js';
import DeleteTestsInteractor from '../../application/use-cases/events/DeleteTests.js';
import kafka from '../../infrastructure/messaging/setup.js';
import TestsRepository from "../../infrastructure/repositories/TestsRepositoryMongo.js";

const testsRepository = new TestsRepository();

const consumer = kafka.consumer({ groupId: 'problem-test-consumer-group' });
// const producer = kafka.producer({});

const run = async () => {

    await consumer.connect();
    // await producer.connect();
    console.log("💬 Established connection with Kafka.");

    await consumer.subscribe({ topics: ['TEST_CREATION', 'TEST_UPDATION', 'PROBLEM_DELETION'] });
    console.log("\t - Subscribed to TEST_CREATION, TEST_UPDATION, PROBLEM_DELETION");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            let acknowledgeProblemId = null;
            switch (topic) {
                case "TEST_CREATION": {
                    console.log("[TEST_CREATION] A problem test was created.");
                    await AddTestsInteractor(data, { testsRepository });
                    acknowledgeProblemId = data.problemId;
                    break;
                }
                case "TEST_UPDATION": {
                    console.log("[TEST_UPDATION] A problem test was updated.");
                    await EditTestsInteractor(data.id, data.data, { testsRepository });
                    acknowledgeProblemId = data.id;
                    break;
                }
                case "PROBLEM_DELETION": {
                    console.log("[PROBLEM_DELETION] A problem was deleted.");
                    await DeleteTestsInteractor(data.id, { testsRepository });
                    acknowledgeProblemId = data.id;
                    break;
                }
            }

            // const ackMessage = {
            //     key: 'test_crud_ack', 
            //     value: JSON.stringify({ 
            //         from: 'submission-service',
            //         problemId: acknowledgeProblemId, 
            //         topic: topic, 
            //         timestamp: Date.now() 
            //     }) 
            // };

            // try {
            //     await producer.send({
            //         topic: 'TEST_ACK',
            //         messages: [ackMessage],
            //     });
            // } catch (err) {
            //     console.error(err);
            // }
        },
    });
};

run().catch(console.error);

export default run;