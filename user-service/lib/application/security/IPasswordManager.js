export default class IPasswordManager {
    async hash(password) {
        throw new Error("method hash not implemented");
    }

    async compare(enteredPassword, password) {
        throw new Error("method compare not implemented");
    }
}