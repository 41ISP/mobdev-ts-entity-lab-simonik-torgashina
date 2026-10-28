import axios from "axios"
import type { IMovie, IStrapiResponse } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getMovie = async (): Promise<IStrapiResponse<IMovie[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IMovie[]>>('/movies', {
        params: {
            populate: "*",
        },
    })
    return res.data
}

export const api = { getMovie } 