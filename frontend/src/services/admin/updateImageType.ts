import { api } from "../api";

const endpoint = (id: unknown) => `image-type/${id}`;

export const updateImageType = (id: unknown, body: unknown) => {
    const init: RequestInit = {
        method: "PUT",
        body: JSON.stringify(body)
    }
 
    return api(endpoint(id), init);
}