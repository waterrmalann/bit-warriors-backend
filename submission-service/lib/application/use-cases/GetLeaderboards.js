'use strict';

export default async ({ userRepository }) => {

    const rankedUsers = await userRepository.calculateRankings();

    return rankedUsers;
};