export default class IUserRepository {
    async persist(userEntity) {
        throw new Error('persist method not implemented');        
    }

    async merge(userEntity) {
        throw new Error('merge method not implemented');        
    }

    async remove(userId) {
        throw new Error('remove method not implemented');        
    }

    async findById(userId) {
        throw new Error('findById method not implemented');        
    }

    async findByEmail(userEmail) {
        throw new Error('findByEmail method not implemented');       
    }

    async findByUsername(username) {
        throw new Error('findByUsername method not implemented');
    }

    async find() {
        throw new Error('find method not implemented');
    }
};