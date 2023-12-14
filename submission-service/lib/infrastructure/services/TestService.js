import ITestService from "../../domain/services/ITestService.js";
import environment from '../config/environment.js';

export default class TestService extends ITestService {
    async evaluate(language, code) {
        throw "evaluate method not implemented";
    }

    async runTests(language, code, { preloadedCode, functionName, testCases }) {
        const testBody = JSON.stringify({
            functionName,
            languageId: language,
            sourceCode: code,
            preloadedCode,
            tests: testCases
        });
        console.log(testBody);
        try {
            const result = await fetch(environment.TEST_SERVICE_URL + '/run-tests', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: testBody
            });

            if (!result.ok) throw new Error(result.message);

            const data = await result.json();

            return { success: true, results: [
                ...data // { label: string, passed: boolean, message: string }
            ]}
        } catch (err) {
            return { success: false, results: [], message: err.message }
        }
    }
}