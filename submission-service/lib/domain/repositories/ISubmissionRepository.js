import Submission from "../entities/Submission";

export default class ISubmissionRepository {
    /**
     * Persists a Submission entity to the actual database.
     * @param {Submission} submissionEntity - The business entity.
     *
     * @returns {Promise<Submission | null>}
    */
    async persist(submissionEntity) {
        throw new Error('persist method not implemented');        
    }

    async merge(submissionEntity) {
        throw new Error('merge method not implemented');        
    }

    async remove(submissionId) {
        throw new Error('remove method not implemented');        
    }

    async findById(id) {
        throw new Error("findById method not implemented");
    }

    // async findBySubmissionId(submissionId) {
    //     throw new Error("findBySubmissionId method not implemented");
    // }

    /**
     * Finds a submission by user and problem.
     * @param {string} problemId - The problemId of the problem.
     * @param {string} userId - The username of the user.
     *
     * @returns {Promise<Submission[] | null>}
    */
    async findByProblemAndUser(problemId, userId) {
        throw new Error("findByProblemAndUser method not implemented");
    }
};