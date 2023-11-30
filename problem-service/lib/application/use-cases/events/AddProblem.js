import Problem from "../../../domain/entities/Problem.js";

export default async (problemData, { problemRepository }) => {
    const problem = new Problem(
        null,
        problemData.problemId,
        problemData.title,
        problemData.slug,
        problemData.description,
        problemData.difficulty,
        problemData.constraints,
        problemData.examples,
        problemData.tags,
        problemData.hint,
        [],
        [],
        problemData.createdAt,
        problemData.modifiedAt 
    );

    return problemRepository.persist(problem);
}