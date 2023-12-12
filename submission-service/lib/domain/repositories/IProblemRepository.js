export default class IProblemRepository {
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

    async findByProblemId(problemId) {
        throw new Error("findByProblemId method not implemented");
    }
};