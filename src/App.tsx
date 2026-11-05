import axios from "axios"
import { useEffect, useState } from "react"
import { MovieCard } from "./components/MovieCard"
import { MovieForm } from "./components/MovieForm"
import { useMovieStore } from "./store/useMovieStore"
import "./App.css"

export default function App() {
    const { movies, getMovies, deleteMovie } = useMovieStore()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                await getMovies()
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    setError(e.response?.data?.error?.message ?? e.message)
                } else {
                    setError("Неизвестная ошибка")
                }
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const handleDelete = async (documentId: string) => {
        try {
            await deleteMovie(documentId)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                alert(e.response?.data?.error?.message ?? e.message)
            } else {
                alert("Неизвестная ошибка")
            }
        }
    }

    return (
        <div className="layout">
            <header className="top">
                <h1>Мои фильмы</h1>
                {movies?.meta && (
                    <span className="pill">
                        {movies.meta.pagination.total} в коллекции
                    </span>
                )}
            </header>

            <aside>
                <MovieForm />
            </aside>

            <main>
                {loading ? (
                    <p className="hint">Загружаем фильмы…</p>
                ) : error ? (
                    <p className="error">Ошибка: {error}</p>
                ) : !movies?.data || movies.data.length === 0 ? (
                    <p className="hint">Список пуст. Добавьте первый фильм через форму.</p>
                ) : (
                    <div className="grid">
                        {movies.data.map((el) => (
                            <MovieCard key={el.documentId} {...el} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}