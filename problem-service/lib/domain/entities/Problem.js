export default class {
    constructor(id, problemId, title, slug, description, difficulty, constraints = [], examples = [], tags = [], hint = '', upvotes = [], downvotes = [], createdAt, modifiedAt) {
        this.id = id;
        this.problemId = problemId;
        this.title = title;
        this.slug = slug;
        this.description = description;

        this.difficulty = difficulty;
        this.constraints = constraints;
        this.examples = examples;
        
        this.tags = tags;
        this.hint = hint;
        
        this.upvotes = [];
        this.downvotes = [];
        
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;

        this._modifiedFields = {};
    }

    updateData(newData) {
        if (newData.title && newData.title !== this.title) {
            this.title = newData.title;
            this._modifiedFields.title = true;
        }
        
        if (newData.slug && newData.slug !== this.slug) {
            this.slug = newData.slug;
            this._modifiedFields.slug = true;
        }
        
        if (newData.description && newData.description !== this.description) {
            this.description = newData.description;
            this._modifiedFields.description = true;
        }
        
        if (newData.difficulty && newData.difficulty !== this.difficulty) {
            this.difficulty = newData.difficulty;
            this._modifiedFields.difficulty = true;
        }
        
        if (newData.constraints && newData.constraints !== this.constraints) {
            this.constraints = newData.constraints;
            this._modifiedFields.constraints = true;
        }
        
        if (newData.examples && newData.examples !== this.examples) {
            this.examples = newData.examples;
            this._modifiedFields.examples = true;
        }
        
        if (newData.tags && newData.tags !== this.tags) {
            this.tags = newData.tags;
            this._modifiedFields.tags = true;
        }
        
        if (newData.hint && newData.hint !== this.hint) {
            this.hint = newData.hint;
            this._modifiedFields.hint = true;
        }
        
        if (newData.modifiedAt && newData.modifiedAt !== this.modifiedAt) {
            this.modifiedAt = newData.modifiedAt;
            this._modifiedFields.modifiedAt = true;
        }

        return true;
    }

    upvote(userId) {
        this.upvotes.push(userId);
        return this._modifiedFields.upvotes = true;
    }

    downvote(userId) {
        this.downvotes.push(userId);
        return this._modifiedFields.downvotes = true;
    }

    getModifiedFields() {
        return this._modifiedFields;
    }

    clearModifiedFields() {
        return this._modifiedFields = {};
    }
};