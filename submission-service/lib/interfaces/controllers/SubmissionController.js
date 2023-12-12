import RunProblemInteractor from '../../application/use-cases/RunProblem.js';
import SubmitProblemInteractor from '../../application/use-cases/SubmitProblem.js';

export async function RunProblem(req, res) {
    const { problemId, code, } = req.body;
    const { userId } = req.headers['x-user-id']

    try {
        const result = await RunProblemInteractor(userId, problemId, code, { problemRepository, testService });
        res.status(200).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function SubmitProblem(req, res) {
    const { problemId, code, } = req.body;
    const { userId } = req.headers['x-user-id']

    try {
        const result = await SubmitProblemInteractor(userId, problemId, code, { userStatsRepository, problemRepository, testService });
        res.status(200).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}