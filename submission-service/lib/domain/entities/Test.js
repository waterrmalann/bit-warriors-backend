export default class {
    constructor(id, problemId) {
        this.id = id;
        this.problemId = problemId;

        this.language = '';
        this.preloadedCode = '';
        this.functionName = '';
        this.testCases = [];

        this._modifiedFields = {};
    }

    setLanguage(language) {
        this.language = language;
        this._modifiedFields.language = true;
        return true;
    }

    setPreloadedCode(code) {
        this.preloadedCode = code;
        this._modifiedFields.preloadedCode = true;
        return true;
    }

    setFunctionName(functionName) {
        this.functionName = functionName;
        this._modifiedFields.functionName = true;
        return true;
    }

    setTestCases(testCases) {
        this.testCases = testCases;
        this._modifiedFields.testCases = true;
        return true;
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        return this._modifiedFields = {};
    }
};