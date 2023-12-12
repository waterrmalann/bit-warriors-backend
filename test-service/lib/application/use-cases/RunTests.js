'use strict';

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

export default async (sourceCode, languageId, tests, { codeRunner }) => {
    if (!sourceCode || !languageId || !tests) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    let code = sourceCode;

    const isCodeOkay = staticallyAnalyzeForIssues(code);
    if (!isCodeOkay) throw Object.assign(new Error("Bad Code", { statusCode: 400 }));

    const stdout = await codeRunner.evaluate(languageId, code);

    // step 1: append test cases to the code
    // step 2: run the code and collect stdout
    // step 3: filter the actual output from the code
    // step 4: 

    // function extractOutput(output) {
    //     let stdout = string.split('\n');
    //     let actualOutput = [];
    //     for (let line of stdout) {
    //         if (line.startsWith('<::container::> ') {
    //             actualOutput.push(line.slice(15 + 1));
    //         }
    //     }
    //     let actualOutput = stdout.filter(line => line.startsWith('<::container::>'));
    // }
    
    return stdout;
};