export default class User {
    constructor(id = null, username) {
        this.id = id;
        this.username = username;
        
        this.totalScore = 0;
        this.totalSubmissions = 0;
        this.totalActiveDays = 0;
        this.currentActiveDays = 0;
        this.maxActiveDays = 0;

        this._modifiedFields = {};
    }

    incrementSubmission() {
        this.totalSubmissions++;

        this._modifiedFields.totalSubmissions = true;
    }

    addScore(score) {
        this.totalScore += score;

        this._modifiedFields.totalScore = true;
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        return this._modifiedFields = {};
    }
};