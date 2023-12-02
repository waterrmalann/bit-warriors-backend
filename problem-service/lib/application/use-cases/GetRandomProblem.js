'use strict';

export default async (criteria, { problemRepository }) => {

    const problem = await problemRepository.getRandomProblem(criteria);

    return {
        id: problem.id,
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