import { api } from "../api";

type Body = { email: string, password: string };

const endpoint = "login";

export const login = (body: Body) => {
    const init: RequestInit = {
        method: "POST",
        body: JSON.stringify(body)
    }
 
    return api(endpoint, init);
}