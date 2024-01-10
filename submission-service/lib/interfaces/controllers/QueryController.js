import FindSubmissionsOfUserInteractor from '../../application/use-cases/FindSubmissionsOfUser.js';
import GetLeaderboardsInteractor from '../../application/use-cases/GetLeaderboards.js';
import SubmissionRepository from '../../infrastructure/repositories/SubmissionRepositoryMongo.js';
import UserRepository from '../../infrastructure/repositories/UserRepositoryMongo.js';

const submissionRepository = new SubmissionRepository();
const userRepository = new UserRepository();

export async function FindSubmissionsByUser(req, res) {
    const { problemId, userId } = req.params;

    try {
        const result = await FindSubmissionsOfUserInteractor(userId, problemId, {
            submissionRepository: submissionRepository 
         });
        res.status(200).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function GetLeaderboards(req, res) {
    try {
        const results = await GetLeaderboardsInteractor({
            userRepository: userRepository
         });
        res.status(200).send(results);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}