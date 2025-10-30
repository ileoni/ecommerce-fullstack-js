import { api } from "../api";

export type Records = {
    id: number,
    title: string,
    slug: string
}

export type Page = {
    totalRecords: number
    perPage: number
    pageIndexes: number
    currentPage: number
    startPageIndex: number
    endPageIndex: number
    previousPageIndex: null | number
    nextPageIndex: null | number
    records: Records[]
}

const endpoint = "pages";

export const pages = (query: string) => {
    const init: RequestInit = {
        method: "GET"
    }
 
    if(!query) return api(endpoint, init);
    return api(`${endpoint}${query}`, init);
}