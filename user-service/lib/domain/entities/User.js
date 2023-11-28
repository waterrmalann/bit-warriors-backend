export default class {
    constructor(id = null, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.emailVerified = false;
     
        this.bio = undefined;
        this.clan = undefined;

        this.githubUsername = undefined;
        this.linkedInUsername = undefined;
        this.xUsername = undefined;
        this.personalWebsite = undefined;

        this.followers = 0;
        this.following = 0;
        this.createdAt = new Date();
        
        this.totalScore = 0;
        this.totalSubmissions = 0;
        this.totalActiveDays = 0;
        this.currentActiveDays = 0;
        this.maxActiveDays = 0;

        this.otp = {
            requested: false,
            value: undefined,
            expiry: 0
        }

        this.mfa = false;

        this._modifiedFields = {};
    }

    setBio(data) {
        this.bio = data;
        
        this._modifiedFields.bio = true;
    }

    setGithubUsername(username) {
        this.githubUsername = username;
        
        this._modifiedFields.githubUsername = true;
    }

    setLinkedInUsername(username) {
        this.linkedInUsername = username;

        this._modifiedFields.linkedInUsername = true;
    }

    setXUsername(username) {
        this.xUsername = username;

        this._modifiedFields.xUsername = true;
    }
    
    setPersonalWebsite(username) {
        this.personalWebsite = username;

        this._modifiedFields.personalWebsite = true;
    }

    setVerified(state) {
        this.emailVerified = state;

        this._modifiedFields.emailVerified = true;
    }

    setOTP(value, expiryInMinutes) {
        this.otp.value = value;
        this.otp.requested = true;
        
        const currentDateAsTimestamp = Math.floor(Date.now() / 1000);
        const futureDateAsTimestamp = currentDateAsTimestamp + (expiryInMinutes * 60);
        this.otp.expiry = futureDateAsTimestamp;

        this._modifiedFields.otp = true;
    }

    clearOTP() {
        this.otp.value = undefined;
        this.otp.requested = false;
        this.otp.expiry = 0;

        this._modifiedFields.otp = true;
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        return this._modifiedFields = {};
    }
};