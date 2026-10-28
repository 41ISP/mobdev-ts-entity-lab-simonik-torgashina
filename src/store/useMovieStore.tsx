import { create } from "zustand";
import type { IMovie, IStrapiResponse } from "../types";
import { api } from "../api";

interface IMovieStore{
    movies: IStrapiResponse<IMovie[]> | undefined,
    getMovie: () => void
}

export const useGamesStore = create<IMovieStore>((set) => ({
    movies: undefined,
    getMovie: async () => {
        try {
            const res = await api.getMovie()
            set({ movies: res})
        } catch (error) {
            console.error(error)
        }
    }
}))