import { api } from "../api";

const endpoint = "images";

export const allImages = () => {
    const init: RequestInit = {
        method: "GET",
    }
 
    return api(endpoint, init);
}