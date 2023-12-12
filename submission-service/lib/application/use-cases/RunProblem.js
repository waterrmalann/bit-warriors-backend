'use strict';

export default async (userId, problemId, code, { problemRepository, testService }) => {
    if (!userId || !problemId || !code) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    // step 1: find problem and test cases
    // step 2: pass to test service (first three tests)
    // step 3: return result
};