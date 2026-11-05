import axios from "axios"
import { useState, type FormEvent } from "react"
import { useMovieStore } from "../store/useMovieStore"
import { GENRES, GENRES_LABELS } from "../types"
import type { Genre, IMovieInput } from "../types"

const initialForm: IMovieInput = {
    title: "",
    description: "",
    duration: 0,
    rating: 7,
    genre: GENRES[0],
    releaseDate: new Date().toLocaleDateString("sv-SE"),
    isWatched: false,
}

export function MovieForm() {
    const createMovie = useMovieStore((s) => s.createMovie)
    const [form, setForm] = useState<IMovieInput>(initialForm)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onChange = <K extends keyof IMovieInput>(
        key: K,
        value: IMovieInput[K],
    ) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formEl = e.currentTarget

        if (!Number.isInteger(form.duration)) {
            setError("Длительность должна быть целым числом")
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            await createMovie(form)
            formEl.reset()
            setForm(initialForm)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? err.message)
            } else {
                setError("Неизвестная ошибка")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <h2>Добавить фильм</h2>

            <label className="field">
                Название
                <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={(e) => onChange("title", e.target.value)}
                />
            </label>

            <label className="field">
                Описание
                <textarea
                    rows={3}
                    name="description"
                    required
                    value={form.description}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </label>

            <div className="row">
                <label className="field">
                    Жанр
                    <select
                        name="genre"
                        value={form.genre}
                        onChange={(e) => onChange("genre", e.target.value as Genre)}
                    >
                        {GENRES.map((g) => (
                            <option key={g} value={g}>
                                {GENRES_LABELS[g]}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="field">
                    Дата выхода
                    <input
                        type="date"
                        name="releaseDate"
                        required
                        value={form.releaseDate}
                        onChange={(e) => onChange("releaseDate", e.target.value)}
                    />
                </label>
            </div>

            <div className="row">
                <label className="field">
                    <span>Оценка: {form.rating}</span>
                    <input
                        type="range"
                        name="rating"
                        min={0}
                        max={10}
                        step={0.5}
                        value={form.rating}
                        onChange={(e) => onChange("rating", Number(e.target.value))}
                    />
                </label>
                <label className="field">
                    Длительность, мин
                    <input
                        type="number"
                        name="duration"
                        min={0}
                        step={1}
                        required
                        value={form.duration}
                        onChange={(e) => onChange("duration", Number(e.target.value))}
                    />
                </label>
            </div>

            <label className="check">
                <input
                    type="checkbox"
                    name="isWatched"
                    checked={form.isWatched}
                    onChange={(e) => onChange("isWatched", e.target.checked)}
                />
                Просмотрено
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Сохраняем…" : "Добавить фильм"}
            </button>
        </form>
    )
}
