import { API_URL } from "../api"
import { GENRES_LABELS, type IMovie } from "../types"

interface IMovieCard extends IMovie {
    onDelete: (documentId: string) => void
}

export function MovieCard({ documentId, picture, description, rating, duration, title, releaseDate, genre, isWatched, onDelete }: IMovieCard) {
    return (
        <article className="card">
            <div className="card__cover">
                {picture ? (
                    <img
                        src={API_URL + picture.url}
                        alt={picture.alternativeText ?? title}
                    />
                ) : (
                    <span>{title.charAt(0)}</span>
                )}
                <b className="card__badge">{rating}</b>
            </div>

            <div className="card__body">
                <h3>{title}</h3>
                {description && <p className="card__desc">{description}</p>}
                <p className="card__meta">Жанр: {GENRES_LABELS[genre]}</p>
                <p className="card__meta">
                    Дата выхода: {new Date(releaseDate).toLocaleDateString("ru-RU")}
                </p>
                <p className="card__meta">Просмотрено: {isWatched ? "да" : "нет"}</p>
            </div>

            <footer className="card__footer">
                <strong>{duration} мин</strong>
                <button
                    type="button"
                    className="link-btn"
                    onClick={() => onDelete(documentId)}
                >
                    Удалить
                </button>
            </footer>
        </article>
    )
}