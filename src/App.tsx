import { EntityCard } from "./components/MovieCard"
import { EntityForm } from "./components/MovieForm"
import "./App.css"

export default function App() {
    return (
        <div className="layout">
            <header className="top">
                <h1>Мои сущности</h1>
                <span className="pill">Количество</span>
            </header>

            <aside>
                <EntityForm />
            </aside>

            <main>
                <p className="error">Ошибка: ошибка</p>
                <p className="hint">Загрузка…</p>
                <p className="hint">Добавьте сущность</p>
                <div className="grid">
                    <EntityCard />
                </div>
            </main>
        </div>
    )
}
