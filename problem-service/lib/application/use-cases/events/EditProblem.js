export default async (problemId, newData, { problemRepository }) => {
    const problem = await problemRepository.findByProblemId(problemId);
    problem.updateData({
        ...newData
    });
    return problemRepository.merge(problem);
}