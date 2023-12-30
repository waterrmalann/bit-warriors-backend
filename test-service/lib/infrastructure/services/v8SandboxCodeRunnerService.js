import ICodeRunnerService from "../../domain/services/ICodeRunnerService.js";

export default class extends ICodeRunnerService {
    async evaluate(language, code) {
        try {
            const result = await fetch(environment.CES_URL, { 
                method: "POST",    
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    source_code: code
                }) 
            })
            const data = await result.json();
            if (result.status === 200) {
                return { success: true, output: data.stdout }
            } else {
                return { success: false, output: data.stderr, error: data.message }
            }
        } catch (err) {
            return { success: false, output: err.message, error: "internal error" };
        }
    }
}