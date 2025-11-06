import { api } from "../api";

const endpoint = "images";

export const images = () => {
    const init: RequestInit = {
        method: "GET",
    }
 
    return api(endpoint, init);
}