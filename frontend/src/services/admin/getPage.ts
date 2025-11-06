import { api } from "../api";

const endpoint = "page";

export const getPage = (id: unknown) => {
    const init: RequestInit = {
        method: "GET"
    }
 
    return api(`${endpoint}/${id}`, init);
}