import ICodeRunnerService from "../../domain/services/ICodeRunnerService.js";

export default class extends ICodeRunnerService {
    async evaluate(code, language) {
        return "[stdout] Hello World";
    }
}