import RetrieveProblemInteractor from '../../application/use-cases/GetProblem.js';
import ListProblemsInteractor from '../../application/use-cases/ListProblems.js';
import GetRandomProblemInteractor from '../../application/use-cases/GetRandomProblem.js';
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

export async function ListProblems(req, res) {
    const { sort_by, skip } = req.query;
    const limit = parseInt(req.query.limit) ?? 12;
    if (limit > 50) return res.status(400).send({ message: "bad request, limit cannot exceed 50" });
    try {
        const problems = await ListProblemsInteractor(limit, 'recent', { problemRepository: problemRepository });
        res.status(200).send(problems);
    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function GetRandomProblem(req, res) {
    let criteria = undefined;
    try {
        const problem = await GetRandomProblemInteractor(criteria, { problemRepository: problemRepository });
        res.status(200).send(problem);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

// todo: UpvoteProblem(req, res)