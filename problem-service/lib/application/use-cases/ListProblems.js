'use strict';

export default async (problemsAmount, sortBy, { problemRepository }) => {

    if (problemsAmount > 100) {
        throw Object.assign(new Error("too many problems were requested"), { statusCode: 400 });
    }

    const problems = await problemRepository.find(limit = problemsAmount);
    const problemsFiltered = problems.map(problem => {
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
        }
    })

    return problemsFiltered;
};