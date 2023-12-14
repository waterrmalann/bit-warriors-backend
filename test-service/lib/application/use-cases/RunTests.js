'use strict';

import test from "node:test";

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

    let code = sourceCode;

    const isCodeOkay = staticallyAnalyzeForIssues(code);
    if (!isCodeOkay) throw Object.assign(new Error("Bad Code", { statusCode: 400 }));

    // append test cases
    code += `\n\ntestCases = ${testCasesToCode(tests, functionName)};\n`;

    // append compare func
    code += `\n\nfunction compare(output, expected) {
        return JSON.stringify(output) === JSON.stringify(expected);
    }\n\n`

    // append test cases driver
    code += `const __$ces_outputs = [];
for (let test of testCases) {
    let testPassed = false;
    let message = '';
    try {
        const result = eval(test.evaluate);
        testPassed = compare(result, eval(test.expect));
        if (testPassed) {
            message = "test passed";
        } else {
            message = test.evaluate + " expected " + test.expect + ", received " + result.toString();
        }
    } catch (err) {
        testPassed = false;
        message = err.message;
    }
    
    __$ces_outputs.push({ label: test.label, passed: testPassed, message: message });
}`;

    // append output (assuming v8-sandbox)
    code += `\nsetResult({ value: __$ces_outputs })`;

    console.log('```\n' + code + '\n```');

    const { success, output, error } = await codeRunner.evaluate(languageId, code);

    if (error) {
        console.log(error);
    } else {
        console.log(output);
    }
    
    if (success) {
        return output;
        // which will be in the format of [{label, passed, message}]
    } else {
        throw Object.assign(new Error(output || error), { statusCode: 400 });
    }
};