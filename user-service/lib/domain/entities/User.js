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

    setPassword(password) {
        this.password = data;

        this._modifiedFields.password = true;
    }

    setBio(data) {
        if (!data || data === this.bio) return;
        this.bio = data;
        
        this._modifiedFields.bio = true;
    }

    setClan(clan) {
        if (!clan || clan === this.clan) return;
        this.clan = clan;

        this._modifiedFields.clan = true;
    }

    setGithubUsername(username) {
        if (!username || username === this.githubUsername) return;
        this.githubUsername = username;
        
        this._modifiedFields.githubUsername = true;
    }

    setLinkedInUsername(username) {
        if (!username || username === this.linkedInUsername) return;
        this.linkedInUsername = username;

        this._modifiedFields.linkedInUsername = true;
    }

    setXUsername(username) {
        if (!username || username === this.xUsername) return;
        this.xUsername = username;

        this._modifiedFields.xUsername = true;
    }
    
    setPersonalWebsite(url) {
        if (!url || url === this.personalWebsite) return;
        this.personalWebsite = url;

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