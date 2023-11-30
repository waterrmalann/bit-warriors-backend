import RetrieveProblemInteractor from '../../application/use-cases/GetProblem.js';
import ListProblemsInteractor from '../../application/use-cases/ListProblems.js';
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
    const { sort_by, skip, limit } = req.query;
    if (limit > 50) return res.status(400).send({ message: "bad request, limit cannot exceed 50" });
    try {
        const problems = await ListProblemsInteractor(limit);
        res.status(200).send(problems);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message })
    }
    
}

// todo: UpvoteProblem(req, res)