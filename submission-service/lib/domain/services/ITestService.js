export default class ITestService {
    evaluate(language, code) {
        throw new Error("method evaluate not implemented.");
    }

    /**
     * Runs given testcases on submitted code and returns the result.
     * @param {string} language - The language the code uses.
     * @param {string} code - The submitted code.
     * @param {{
     *       preloadedCode: string;
     *       functionName: string;
     *       testCases: object[];
     * }} problem - An object containing information about the problem and test cases.
     *
     * @returns {Promise<object>}
    */
    runTests(language, code, { preloadedCode, functionName, testCases }) {
        throw new Error("method runTests not implemented.");
    }
}