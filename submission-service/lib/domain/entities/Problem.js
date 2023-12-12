export default class {
    constructor(id, problemId, title) {
        this.id = id;
        this.problemId = problemId;
        this.title = title;

        this.preloadedCode = '';
        this.functionName = '';
        this.testCases = [];

        this._modifiedFields = {};
    }

    setTitle(title) {
        if (title === this.title) return;
        this.title = title;
        this._modifiedFields.title = true;
        return true;
    }

    setPreloadedCode(code) {
        this.preloadedCode = preloadedCode;
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