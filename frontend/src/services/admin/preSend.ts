import { api } from "../api";

type Body = { email: string };

const endpoint = "pre-send";

export const preSend = (body: Body) => {
    const init: RequestInit = {
        method: "POST",
        body: JSON.stringify(body)
    }
 
    return api(endpoint, init);
}