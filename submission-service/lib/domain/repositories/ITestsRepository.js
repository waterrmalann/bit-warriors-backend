import User from '../entities/User.js';
import Problem from '../entities/Test.js';
import Submission from '../entities/Submission.js';
import Test from '../entities/Test.js';

/** 
 * @interface 
*/
export default class ITestsRepository {
    async persist(problemEntity) {
        throw new Error('persist method not implemented');        
    }

    async merge(problemEntity) {
        throw new Error('merge method not implemented');        
    }

    async remove(problemId) {
        throw new Error('remove method not implemented');        
    }

    async findById(id) {
        throw new Error("findById method not implemented");
    }

    /**
     * Finds a submission by user and problem.
     * @param {string} problemId - The problemId of the problem.
     *
     * @returns {Promise<Test | null>}
    */
    async findByProblemId(problemId) {
        throw new Error("findByProblemId method not implemented");
    }
};