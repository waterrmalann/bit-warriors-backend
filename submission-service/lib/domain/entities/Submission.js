export default class Submission {
    constructor(id, {problemId, language, code, runtime, memory}, userId, timestamp = Date.now()) {
        this.id = id;
        this.problemId = problemId;
        
        this.submittedBy = userId;
        this.submittedAt = timestamp;
        this.language = language;
        this.code = code;
        this.runtime = runtime;
        this.memory = memory;
        this._modifiedFields = {};
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