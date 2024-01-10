'use strict';

import crypto from 'crypto';

function constructJSFunctionCall(functionName, params) {
    return functionName + '(' + params.join(',') + ');'
}

// construct function calls
// wrap them around _$ces_wrapper(</>)

function staticallyAnalyzeForIssues(sourceCode) {
    // If they try to construct this string via code, it cannot be handled.
    if (sourceCode.includes('__$ces_')) return false;
    return true;
}

function testCasesToCode(tests, functionName) {
    const testCases = [];
    for (let test of tests) {
        testCases.push({ 
            label: test.label,
            evaluate: `${functionName}(${test.params.join(', ')})`,
            expect: test.expect
        });
    }
    return JSON.stringify(testCases);
}

export default async (sourceCode, languageId, functionName, tests, { codeRunner }) => {
    if (!sourceCode || !languageId || !tests || !functionName) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    const reservedVariablePrefix = 'x' + crypto.randomBytes(5).toString('hex');

    // preloaded
    let code = `function ${reservedVariablePrefix}_replacer(key, value) {
        if (value === undefined) {
          return 'undefined';
        }
        if (Number.isNaN(value)) {
          return 'NaN';
        }
        if (value === Infinity) {
          return 'Infinity';
        }
        if (value === -Infinity) {
          return '-Infinity';
        }
        return value;
    }\n\n// begin user submitted code\n`

    code += sourceCode;

    code += '\n// end user submitted code'

    // const isCodeOkay = staticallyAnalyzeForIssues(code);
    // if (!isCodeOkay) throw Object.assign(new Error("Bad Code", { statusCode: 400 }));

    // append test cases
    code += `\n\n${reservedVariablePrefix}_testCases = ${testCasesToCode(tests, functionName)};\n`;

    // append compare func
    code += `\n\nfunction compare(output, expected) {
        return JSON.stringify(output) === JSON.stringify(expected);
    }\n\n`

    // append test cases driver
    code += `const ${reservedVariablePrefix}_outputs = [];
for (let test of ${reservedVariablePrefix}_testCases) {
    let testPassed = false;
    let message = '';
    try {
        const result = eval(test.evaluate);
        testPassed = compare(result, eval(test.expect));
        if (testPassed) {
            message = "test passed";
        } else {
            message = "received " + JSON.stringify(result, ${reservedVariablePrefix}_replacer);
        }
    } catch (err) {
        testPassed = false;
        message = err.message;
    }
    let ${reservedVariablePrefix}_test = testPassed ? (test.evaluate + " equals " + test.expect) : (test.evaluate + " expected " + test.expect);
    ${reservedVariablePrefix}_outputs.push({ label: test.label, passed: testPassed, test: ${reservedVariablePrefix}_test, message: message });
}`;

    // append output (assuming v8-sandbox)
    code += `\nsetResult({ value: ${reservedVariablePrefix}_outputs })`;

    console.log('```\n' + code + '\n```');

    let memoryUsageBefore = process.memoryUsage();
    let startTime = new Date();
    const { success, output, error } = await codeRunner.evaluate(languageId, code);
    let endTime = new Date();
    let memoryUsageAfter = process.memoryUsage();
    const memoryUsage = ((memoryUsageAfter.heapUsed - memoryUsageBefore.heapUsed) / 1024).toFixed(2) + 'mb';
    const runtime = ((endTime.getTime() - startTime.getTime()) * 10) + 'ms'; // ms

    if (error) {
        console.log(error);
    } else {
        console.log(output);
    }
    
    if (success) {
        return {output, metrics: { memory: memoryUsage, runtime: runtime }};
        // which will be in the format of [{label, passed, message}]
    } else {
        throw Object.assign(new Error(output || error), { statusCode: 400 });
    }
};