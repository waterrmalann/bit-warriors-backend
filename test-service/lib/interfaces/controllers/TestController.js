import RunTestsInteractor from '../../application/use-cases/RunTests.js';
import EvaluateCodeInteractor from '../../application/use-cases/EvaluateCode.js';

import CodeExecutionSandbox from '../../infrastructure/services/v8SandboxCodeRunnerService.js';

const codeRunner = new CodeExecutionSandbox();

export async function RunTests(req, res) {
    const { sourceCode, languageId, functionName, tests } = req.body;

    try {
        const results = await RunTestsInteractor(sourceCode, languageId, functionName, tests, { codeRunner: codeRunner });
        res.status(200).send(results);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function Evaluate(req, res) {
    const { sourceCode, languageId } = req.body;
    
    try {
        const results = await EvaluateCodeInteractor(sourceCode, languageId, { codeRunner });
        res.status(200).send(results);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}