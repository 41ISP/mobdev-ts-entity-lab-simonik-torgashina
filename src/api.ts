import axios from "axios"
import type { IMovie, IMovieInput, IStrapiResponse } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getMovies = async (): Promise<IStrapiResponse<IMovie[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IMovie[]>>("/movies", {
        params: { populate: "*", sort: "createdAt:desc" },
    })
    return res.data
}

const createMovie = async (input: IMovieInput): Promise<IMovie> => {
    const res = await apiInstance.post<IStrapiResponse<IMovie>>("/movies", { data: input })
    return res.data.data
}

const deleteMovie = async (documentId: string): Promise<void> => {
    await apiInstance.delete(`/movies/${documentId}`)
}

export const api = { getMovies, createMovie, deleteMovie }