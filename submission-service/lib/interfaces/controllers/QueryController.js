import FindSubmissionsOfUserInteractor from '../../application/use-cases/FindSubmissionsOfUser.js';
import SubmissionRepository from '../../infrastructure/repositories/SubmissionRepositoryMongo.js';

const submissionRepository = new SubmissionRepository();

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