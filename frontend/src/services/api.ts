import { BASE_URL } from "../constants"

const headers = new Headers();

headers.append("Content-Type", "application/json");

export const api = (endpoint: string, init: RequestInit) => {
    const request = new Request(`${BASE_URL}/${endpoint}`, { headers, ...init });
    return fetch(request);
}