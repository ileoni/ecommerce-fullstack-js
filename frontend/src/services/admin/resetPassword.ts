import { api } from "../api";

type Body = { password: string, confirmPassword: string };

const endpoint = "reset-password";

export const resetPassword = (body: Body) => {
    const init: RequestInit = {
        method: "PUT",
        body: JSON.stringify(body)
    }
 
    return api(endpoint, init);
}