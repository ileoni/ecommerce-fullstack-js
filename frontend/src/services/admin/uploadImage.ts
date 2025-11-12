import { api } from "../api";

const endpoint = "upload";

export const getPage = (param: unknown, body: unknown) => {
    const init: RequestInit = {
        method: "POST",
        body: JSON.stringify(body)
    }
 
    return api(`${endpoint}/${param}`, init);
}