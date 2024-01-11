// @ts-check
'use strict';

import Submission from '../../domain/entities/Submission.js';

/**
 * Fetches a list of submissions by specified user.
 * 
 * @typedef {import('../../domain/repositories/ISubmissionRepository.js').default} ISubmissionRepository
 *
 * @param {string} userId - The ID of the user.
 * @param {{
 *       submissionRepository: ISubmissionRepository;
 * }} dependencies - An object containing required dependencies for the function.
 *
 * @returns {Promise<object[]>} A promise resolving to an array of objects, containing information about each past submission.
*/
export default async (
    userId,
    { submissionRepository }
) => {

    if (!userId) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    const pastSubmissions = await submissionRepository.findByUser(userId) ?? [];

    return pastSubmissions.map(submission => ({ 
        feedback: submission.feedback,
        id: submission.id,
        problemId: submission.problemId,
        submittedBy: submission.submittedBy,
        submittedAt: submission.submittedAt,
        language: submission.language,
        code: submission.code,
        runtime: submission.runtime,
        memory: submission.memory,
    }));
};