import { api } from "../api";

const endpoint = "me";

export const me = () => {
    const init: RequestInit = {
        method: "POST",
    }
 
    return api(endpoint, init);
}