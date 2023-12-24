export default class Submission {
    constructor(id, problemId, language, code, runtime, memory, userId, timestamp = Date.now()) {
        this.id = id;
        this.problemId = problemId;
        
        this.submittedBy = userId;
        this.submittedAt = timestamp;
        this.language = language;
        this.code = code;
        this.runtime = runtime;
        this.memory = memory;

        this.feedback = '';

        this._modifiedFields = {};
    }

    setFeedback(feedback) {
        this.feedback = feedback;
        this._modifiedFields.feedback = true;
        return true;
    }

    setLanguage(language) {
        this.language = language;
        this._modifiedFields.language = true;
        return true;
    }

    setCode(code) {
        this.code = code;
        this._modifiedFields.code = true;
        return true;
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        return this._modifiedFields = {};
    }
};