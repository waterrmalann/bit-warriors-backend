'use strict';
import environment from '../../infrastructure/config/environment.js';

export default async (submissionId, { submissionRepository, problemRepository, aiEngine }) => {
    if (!submissionId) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    const submission = await submissionRepository.findById(submissionId);
    if (!submission) {
        throw Object.assign(new Error("Submission not found."), { statusCode: 404 });
    }

    // const problem = await problemRepository.findByProblemId(submission.problemId);
    // if (!problem) {
    //     throw Object.assign(new Error("Problem not found."), { statusCode: 404 });
    // }
    const problem = await fetch(`${environment.PROBLEM_SERVICE_URL}/${submission.problemId}`);
    const statement = await problem.json();

    const feedback = await aiEngine.getFeedback(statement.description, submission.code);
    if (!feedback) {
        throw Object.assign(new Error("Could not generate any feedback."), { statusCode: 500 })
    }

    submission.setFeedback(feedback);
    await submissionRepository.merge(submission);

    return feedback;
};