import { api } from "../api";

const endpoint = (id: unknown) => `user/${id}/avatar`;

export const updateAvatar = (id: unknown, body: unknown) => {
    const init: RequestInit = {
        method: "PUT",
        body: JSON.stringify(body)
    }
 
    return api(endpoint(id), init);
}