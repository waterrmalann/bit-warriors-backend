import Problem from "../../../domain/entities/Problem.js";

export default async (problemData, { problemRepository }) => {
    const problem = new Problem(
        null,
        problemData.problemId,
        problemData.title,
    );

    return problemRepository.persist(problem);
}