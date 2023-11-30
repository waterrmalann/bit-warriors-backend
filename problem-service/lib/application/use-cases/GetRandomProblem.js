'use strict';

export default async (criteria, { problemRepository }) => {

    const problem = await problemRepository.getRandomProblem(criteria);

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