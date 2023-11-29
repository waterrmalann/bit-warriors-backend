'use strict';

export default async (problemIdOrSlug, { problemRepository }) => {
    if (!problemIdOrSlug) {
        throw Object.assign(new Error("Problem Not Found"), { statusCode: 404 })
    }

    const problem = await problemRepository.findById(problemIdOrSlug) ?? await problemRepository.findBySlug(problemIdOrSlug);
    if (!problem) {
        throw Object.assign(new Error("Problem Not Found"), { statusCode: 404 })
    }

    return {
        id: problem.id,
        problemId: problem.id,
        slug: problem.slug,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        constraints: problem.constraints,
        examples: problem.examples,
        tags: problem.tags,
        hint: problem.hint,
        upvotes: problem.votes.length,
        downvotes: problem.votes.length,
        
        // createdAt, modiifedAt
    };
};