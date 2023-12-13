import AddProblemInteractor from '../../application/use-cases/events/AddProblem.js';
import EditProblemInteractor from '../../application/use-cases/events/EditProblem.js';
import DeleteProblemInteractor from '../../application/use-cases/events/DeleteProblem.js';
import kafka from '../../infrastructure/messaging/setup.js';
import ProblemRepository from "../../infrastructure/repositories/ProblemRepositoryMongo.js";

const problemRepository = new ProblemRepository();

const consumer = kafka.consumer({ groupId: 'problem-consumer-group' });
const producer = kafka.producer();

const run = async () => {

    await consumer.connect();
    console.log("💬 Established connection with Kafka.");
    await producer.connect();

    await consumer.subscribe({ topics: ['PROBLEM_CREATION', 'PROBLEM_UPDATION', 'PROBLEM_DELETION'] });
    console.log("\t - Subscribed to PROBLEM_CREATION, PROBLEM_UPDATION, PROBLEM_DELETION");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            let acknowledgeProblemId = null;
            switch (topic) {
                case "PROBLEM_CREATION": {
                    console.log("[PROBLEM_CREATION] A new problem was created.");
                    await AddProblemInteractor(data, { problemRepository });
                    acknowledgeProblemId = data.problemId;
                    break;
                }
                case "PROBLEM_UPDATION": {
                    console.log("[PROBLEM_UPDATION] A problem was updated.");
                    await EditProblemInteractor(data.id, data.data, { problemRepository });
                    acknowledgeProblemId = data.id;
                    break;
                }
                case "PROBLEM_DELETION": {
                    console.log("[PROBLEM_DELETION] A problem was deleted.");
                    await DeleteProblemInteractor(data.id, { problemRepository });
                    acknowledgeProblemId = data.id;
                    break;
                }
            }

            const ackMessage = {
                key: 'problem_crud_ack', 
                value: JSON.stringify({ 
                    problemId: acknowledgeProblemId, 
                    topic: topic, 
                    timestamp: Date.now() 
                }) 
            };

            try {
                await producer.send({
                    topic: 'PROBLEM_ACK',
                    messages: [ackMessage],
                });
            } catch (err) {
                console.error(err);
            }
        },
    });
};

run().catch(console.error);

export default run;