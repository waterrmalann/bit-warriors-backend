import RunProblemInteractor from '../../application/use-cases/RunProblem.js';
import SubmitProblemInteractor from '../../application/use-cases/SubmitProblem.js';

import TestService from '../../infrastructure/services/TestService.js';
import TestsRepository from '../../infrastructure/repositories/TestsRepositoryMongo.js';
import SubmissionRepository from '../../infrastructure/repositories/SubmissionRepositoryMongo.js';
import UserRepository from '../../infrastructure/repositories/UserRepositoryMongo.js';

const testService = new TestService();
const testsRepository = new TestsRepository();
const submissionRepository = new SubmissionRepository();
const userRepository = new UserRepository();

export async function RunProblem(req, res) {
    const { code, language } = req.body;
    const { problemId } = req.params;
    const userId = req.headers['x-username'] || "anonymous";

    try {
        const result = await RunProblemInteractor(userId, problemId, language, code, {
            testsRepository: testsRepository, 
            testService: testService 
         });
        res.status(200).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function SubmitProblem(req, res) {
    const { code, language } = req.body;
    const { problemId } = req.params;
    const userId = req.headers['x-username'] || "anonymous";

    try {
        const result = await SubmitProblemInteractor(userId, problemId, language, code, {
            submissionRepository: submissionRepository,
            userRepository: userRepository,
            testsRepository: testsRepository, 
            testService: testService 
         });
        res.status(200).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}