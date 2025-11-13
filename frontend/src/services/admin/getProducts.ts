import { api } from "../api";

const endpoint = "products";

export const getProducts = (query: string) => {
    const init: RequestInit = {
        method: "GET"
    }
    
    if(!query) return api(endpoint, init);
    return api(`${endpoint}${query}`, init);
}