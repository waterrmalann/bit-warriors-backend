import AddProblemInteractor from '../../application/use-cases/events/AddProblem.js';
import EditProblemInteractor from '../../application/use-cases/events/EditProblem.js';
import DeleteProblemInteractor from '../../application/use-cases/events/DeleteProblem.js';
import kafka from '../../infrastructure/messaging/setup.js';
import ProblemRepository from "../../infrastructure/repositories/ProblemRepositoryMongo.js";

const problemRepository = new ProblemRepository();

const consumer = kafka.consumer({ groupId: 'problem-consumer-group' });

const run = async () => {

    await consumer.connect();
    console.log("💬 Established connection with Kafka.");

    await consumer.subscribe({ topics: ['PROBLEM_CREATION', 'PROBLEM_UPDATION', 'PROBLEM_DELETION'] });
    console.log("\t - Subscribed to PROBLEM_CREATION, PROBLEM_UPDATION, PROBLEM_DELETION");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            switch (topic) {
                case "PROBLEM_CREATION": {
                    console.log("[PROBLEM_CREATION] A new problem was created.");
                    await AddProblemInteractor(data, { problemRepository });
                    break;
                }
                case "PROBLEM_UPDATION": {
                    console.log("[PROBLEM_UPDATION] A problem was updated.");
                    await EditProblemInteractor(data.id, data.data, { problemRepository });
                    break;
                }
                case "PROBLEM_DELETION": {
                    console.log("[PROBLEM_DELETION] A problem was deleted.");
                    await DeleteProblemInteractor(data.id, { problemRepository });
                    break;
                }
            }
            console.log(data);
        },
    });
};

run().catch(console.error);

export default run;