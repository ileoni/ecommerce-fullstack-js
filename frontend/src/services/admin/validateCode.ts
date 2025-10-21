import { api } from "../api";

type Body = { validateCode: string };

const endpoint = "validate-code";

export const validateCode = (body: Body) => {
    const init: RequestInit = {
        method: "POST",
        body: JSON.stringify(body)
    }
 
    return api(endpoint, init);
}