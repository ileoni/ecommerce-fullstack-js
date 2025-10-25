import { api } from "../api";

const endpoint = "user";

export const getUser = (id: unknown) => {
    const init: RequestInit = {
        method: "GET"
    }
 
    return api(`${endpoint}/${id}`, init);
}