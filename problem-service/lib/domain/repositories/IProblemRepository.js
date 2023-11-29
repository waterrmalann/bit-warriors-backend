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

    async findById(problemId) {
        throw new Error('findById method not implemented');        
    }

    async findByProblemId(problemId) {
        throw new Error("findByAltId method not implemented");
    }
    
    async findBySlug(problemSlug) {
        throw new Error("findBySlug method not implemented");
    }

    async find() {
        throw new Error('find method not implemented');
    }
};