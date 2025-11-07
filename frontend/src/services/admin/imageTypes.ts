import { api } from "../api";

const endpoint = "image-types";

export const imageTypes = () => {
    const init: RequestInit = {
        method: "GET"
    }
 
    return api(`${endpoint}`, init);
}