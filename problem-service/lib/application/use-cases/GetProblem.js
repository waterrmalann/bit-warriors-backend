'use strict';

export default async (problemIdOrSlug, { problemRepository }) => {
    if (!problemIdOrSlug) {
        throw Object.assign(new Error("Problem Not Found"), { statusCode: 404 })
    }

    const problem = await problemRepository.findByProblemId(problemIdOrSlug) ?? await problemRepository.findBySlug(problemIdOrSlug);
    if (!problem) {
        throw Object.assign(new Error("Problem Not Found"), { statusCode: 404 })
    }

    return {
        id: problem._id,
        problemId: problem.problemId,
        slug: problem.slug,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        constraints: problem.constraints,
        examples: problem.examples,
        tags: problem.tags,
        hint: problem.hint,
        upvotes: problem.upvotes.length,
        downvotes: problem.downvotes.length,
        // createdAt, modiifedAt
    };
};
