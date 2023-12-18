'use strict';

export default async (userId, problemId, language, code, { userStatsRepository, testsRepository, testService }) => {

    if (!userId || !problemId || !language || !code) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    // step 1: find problem and test cases
    const problem = await testsRepository.findByProblemId(problemId);
    const testCases = problem.testCases; // .slice(0, 3);
    const functionName = problem.functionName;
    const preloadedCode = problem.preloadedCode;

    // step 2: pass to test service
    const out = await testService.runTests(language, code, { preloadedCode, functionName, testCases })

    if (out.success) {
        let totalTests = out.results.length;
        let failedTests = out.results.filter(e => !e.passed);
        let testsPassed = totalTests - failedTests.length;

        if (failedTests.length > 0) {
            return { success: true, results: failedTests, totalTests: totalTests, testsPassed: testsPassed, runtime: '0ms', memory: '0mb' };
        } else {
            // All tests passed.
            return { success: true, results: [], totalTests: totalTests, testsPassed: totalTests, runtime: '0ms', memory: '0mb' };
        }
    } else {
        return { success: false, results: [], totalTests: totalTests, testsPassed: 0, runtime: '0ms', memory: '0mb' };
    }
};