'use strict';

export default async (userId, problemId, amount, { problemRepository }) => {
    if (!userId || !problemId || amount === 0 || amount < -1 || amount > 1) {
        throw Object.assign(new Error("Bad Input"), { statusCode: 400 })
    }

    const problem = await problemRepository.findById(problemId);
    if (!problem) {
        throw Object.assign(new Error("Problem Not Found"), { statusCode: 404 })
    }

    // todo: edge-case involving upvote after downvote, and vice versa.
    if (amount === 1) {
        if (!problem.upvotes.includes(userId)) {
            problem.upvote(userId);
        }
    } else if (amount === -1) {
        if (!problem.downvotes.includes(userId)) {
            problem.downvote(userId);
        }
    }

    return problemRepository.merge(problem);
    // const user = await userRepository.findByUsername(username) ?? await userRepository.findByEmail(username);
    // if (!user) {
    //     // todo: Decouple statusCode (HTTP Method) from Business Logic
    //     throw Object.assign(new Error('Invalid username/password'), { statusCode: 401 });
    // }
    // // if (!user.emailVerified) {
    // //     throw Object.assign(new Error('Unverified email'), { statusCode: 403 });
    // // }
};