export default async (problemId, newData, { problemRepository }) => {
    const problem = await problemRepository.findByProblemId(problemId);
    newData.preloadedCode && problem.setPreloadedCode(newData.preloadedCode);
    newData.functionName && problem.setFunctionName(newData.functionName);
    newData.testCases && problem.setTestCases(newData.testCases);
    return problemRepository.merge(problem);
}