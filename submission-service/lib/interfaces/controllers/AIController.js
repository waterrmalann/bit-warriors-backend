import { GeminiEngine } from '@bit-warriors/ai-feedback';
import environment from '../../infrastructure/config/environment.js';
import GetFeedbackInteractor from '../../application/use-cases/GetFeedback.js';
import SubmissionRepository from '../../infrastructure/repositories/SubmissionRepositoryMongo.js';
// import 

const aiEngine = new GeminiEngine(environment.GEMINI_API_KEY);
const submissionRepository = new SubmissionRepository();
const problemRepository = null;

export async function RequestFeedback(req, res) {
    const { submissionId } = req.params;
    const userId = req.headers['x-username'] || 'anonymous';

    try {
        const feedback = await GetFeedbackInteractor(submissionId, { submissionRepository, problemRepository, aiEngine })
        res.status(200).send(feedback);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}