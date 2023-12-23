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

    /**
     * Finds a user by their username.
     * @typedef {import('../entities/User').default} User
     * 
     * @param {string} username - The username of the user to find.
     *
     * @returns {Promise<User | null>}
     */
    async findByUsername(username) {
        throw new Error('findByUsername method not implemented');
    }
};