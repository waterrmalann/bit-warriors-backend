import RetrieveProblemInteractor from '../../application/use-cases/GetProblem.js';
import ProblemRepository from "../../infrastructure/repositories/ProblemRepositoryMongo.js";

const problemRepository = new ProblemRepository();

export async function GetProblem(req, res) {
    const { problemId } = req.params;

    try {
        const problem = await RetrieveProblemInteractor(problemId, { problemRepository: problemRepository });
        res.status(200).send(problem);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

// todo: UpvoteProblem(req, res)