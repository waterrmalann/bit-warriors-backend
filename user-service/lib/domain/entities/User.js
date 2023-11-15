export default class {
    constructor(id = null, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.emailVerified = false;
     
        this.bio = undefined;
        this.clan = undefined;
        this.followers = 0;
        this.following = 0;
        this.createdAt = new Date();
        
        this.totalScore = 0;
        this.totalSubmissions = 0;
        this.totalActiveDays = 0;
        this.currentActiveDays = 0;
        this.maxActiveDays = 0;

        this._modifiedFields = {};
    }

    setBio(data) {
        this.bio = data;
        
        this._modifiedFields.bio = true;
    }

    setVerified(state) {
        this.emailVerified = state;

        this._modifiedFields.emailVerified = true;
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        return this._modifiedFields = {};
    }
};