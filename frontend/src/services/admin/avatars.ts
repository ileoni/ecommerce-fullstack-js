import { api } from "../api";

const endpoint = (id: unknown) => `user/${id}/avatars`;

export const avatars = (id: unknown) => {
    const init: RequestInit = {
        method: "GET"
    }
 
    return api(endpoint(id), init);
}