import { GeminiEngine } from '@bit-warriors/ai-feedback';
import environment from '../../infrastructure/config/environment';
import GetFeedbackInteractor from '../../application/use-cases/GetFeedback.js';

const aiEngine = new GeminiEngine(environment.GEMINI_API_KEY);
const submissionRepository = null;
const problemRepository = null;

export async function RequestFeedback(req, res) {
    const { submissionId } = req.params;
    const userId = req.headers['x-username'] || 'anonymous';

    try {
        const feedback = GetFeedbackInteractor(submissionId, { submissionRepository, problemRepository, aiEngine })
        res.status(200).send(result);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}