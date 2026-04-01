import type { Book } from "../types/BookItem";
const API =
  import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7263'


interface FetchBooksResponse {

    books: Book[];
    totalCount: number;
    
}

export const fetchBooks = async (pageNum: number, pageSize: number, sortOrder: string, selectedCategories: string[]) : Promise<FetchBooksResponse> => {

    try{
        const params = new URLSearchParams()
        params.set('pageNum', String(pageNum))
        params.set('pageSize', String(pageSize))
        params.set('sortOrder', sortOrder)
        for (const c of selectedCategories) {
          params.append('categories', c)
        }
        const res = await fetch(`${API}/api/Books?${params.toString()}`)

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        } 
        return await res.json()

    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }

    return {
        books: [],
        totalCount: 0
    }
}