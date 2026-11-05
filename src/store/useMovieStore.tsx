import { create } from "zustand"
import type { IMovie, IMovieInput, IStrapiResponse } from "../types"
import { api } from "../api"

interface IMovieStore {
    movies: IStrapiResponse<IMovie[]> | undefined
    getMovies: () => Promise<void>
    createMovie: (input: IMovieInput) => Promise<void>
    deleteMovie: (documentId: string) => Promise<void>
}

export const useMovieStore = create<IMovieStore>((set) => ({
    movies: undefined,

    getMovies: async () => {
        const res = await api.getMovies()
        set({ movies: res })
    },

    createMovie: async (input) => {
        await api.createMovie(input)
        const res = await api.getMovies()
        set({ movies: res })
    },

    deleteMovie: async (documentId) => {
        await api.deleteMovie(documentId)
        const res = await api.getMovies()
        set({ movies: res })
    },
}))