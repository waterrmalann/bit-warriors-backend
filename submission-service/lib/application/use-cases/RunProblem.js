'use strict';

export default async (userId, problemId, language, code, { testsRepository, testService }) => {
    if (!userId || !problemId || !language || !code) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    const problem = await testsRepository.findByProblemId(problemId);
    const testCases = problem.testCases.slice(0, 3);
    const functionName = problem.functionName;
    const preloadedCode = problem.preloadedCode;

    const result = await testService.runTests(language, code, { preloadedCode, functionName, testCases })

    return result;
};