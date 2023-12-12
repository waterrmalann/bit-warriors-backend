'use strict';

export default async (sourceCode, languageId, { codeRunner }) => {
    if (!sourceCode || !languageId) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    let code = sourceCode;

    const stdout = await codeRunner.evaluate(languageId, code);

    return stdout;
};