// @ts-check
'use strict';

/**
 * Handles a code submission for a given problem, including testing and persistence.
 * 
 * @typedef {import('../../domain/repositories/IUserRepository').default} IUserRepository
 * @typedef {import('../../domain/repositories/ISubmissionRepository').default} ISubmissionRepository
 * @typedef {import('../../domain/repositories/ITestsRepository').default} ITestsRepository
 * @typedef {import('../../domain/services/ITestService').default} TestService
 *
 * @param {string} userId - The ID of the user submitting the code.
 * @param {string} problemId - The ID of the problem being solved.
 * @param {string} language - The programming language of the submitted code.
 * @param {string} code - The submitted code content.
 * @param {{
 *       userRepository: IUserRepository;
 *       submissionRepository: ISubmissionRepository;
 *       testsRepository: ITestsRepository;
 *       testService: TestService;
 * }} dependencies - An object containing required dependencies for the function.
 *
 * @returns {Promise<object>} A promise resolving to an object representing the submission result,
 *       containing details about the submission's status, test outcomes, and any errors.
*/
export default async (
    userId, problemId, language, code, 
    { userRepository, submissionRepository, testsRepository, testService }
) => {

    if (!userId || !problemId || !language || !code) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    const problem = await testsRepository.findByProblemId(problemId);
    if (!problem) {
        throw Object.assign(new Error("Problem not found."), { statusCode: 404 });
    }

    const testCases = problem.testCases; // .slice(0, 3);
    const functionName = problem.functionName;
    const preloadedCode = problem.preloadedCode;

    // Let's weed off attempts to submit an exact same solution as earlier.
    const pastSubmissions = await submissionRepository.findByProblemAndUser(problemId, userId) ?? [];
    let sameAsPreviousSubmission = false;
    for (let submission of pastSubmissions) {
        // todo: This could strip away comments, whitespace (ie: minify) and do a proper static analysis.
        if (submission.code === code /* && submission.language === language */) {
            sameAsPreviousSubmission = true;
        }
    }

    if (sameAsPreviousSubmission) {
        throw Object.assign(new Error("Duplicate submission."), { statusCode: 409 });
    }

    const out = await testService.runTests(language, code, { preloadedCode, functionName, testCases })

    let totalTests = out.results.length;
    let failedTests = out.results.filter(e => !e.passed);
    let testsPassed = totalTests - failedTests.length;
    if (!out.success) {
        return { success: false, results: [], totalTests: totalTests, testsPassed: 0, runtime: '0ms', memory: '0mb' };
    } 

    if (failedTests.length > 0) {
        return { success: true, results: failedTests, totalTests: totalTests, testsPassed: testsPassed, runtime: '0ms', memory: '0mb' };
    }

    // All tests passed.
    const user = await userRepository.findByUsername(userId);
    if (!user) {
        throw Object.assign(new Error("User not found"), { statusCode: 404 });
    }
    
    if (pastSubmissions.length === 0) {
        // switch (problem.difficulty) {
        //     case 'easy':
        //         user.addScore(10);
        //         break;
        //     case 'medium':
        //         user.addScore(25);
        //         break;
        //     case 'hard':
        //         user.addScore(50);
        //         break;
        //     default:
        //         throw Object.assign(new Error(`problem.difficulty was ${problem.difficulty}`));
        // }
        user.addScore(50);
    }
    await userRepository.merge(user);

    return { success: true, results: [], totalTests: totalTests, testsPassed: totalTests, runtime: '0ms', memory: '0mb' };
};