'use strict';

export default async (userId, problemId, code, { userStatsRepository, problemRepository, codeRunnerService }) => {
    if (!userId || !problemId || !code) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    // step 1: find problem and test cases
    // step 2: pass to test service
    // step 3: update userRepo with result
    // step 4: return result
};