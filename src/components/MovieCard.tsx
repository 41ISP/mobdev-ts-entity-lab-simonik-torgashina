import type { IMovie } from "../types";
import { useMovieStore } from "../store/useMovieStore";
import { api } from "../api";

interface IMovieCard extends IMovie {

}

export function MovieCard({ } : IMovieCard) {
    const {getMovie} = useMovieStore()
    const handleDelete = async() => {
        await api.deleteMovie(documentId)
        getMovie()
    }
    
    return (
        <article className="card">
            <div className="card__cover">
                <img src="x" alt="Сущность" />
                <span>Название если нет картинки</span>
                <b className="card__badge">Бейдж</b>
            </div>

            <div className="card__body">
                <h3>Название</h3>

                <p className="card__desc">Описание</p>

                <p className="card__meta">Чекбокс: да</p>

                <div className="chips">
                    <span className="chip">Популярное</span>
                </div>
            </div>

            <footer className="card__footer">
                <strong>100 Р</strong>
                <button onClick={handleDelete} className="link-btn">Удалить</button>
            </footer>
        </article>
    )
}
