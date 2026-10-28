export function EntityForm() {
    return (
        <form className="form">
            <h2>Добавить сущность</h2>

            <label className="field">
                Строка
                <input type="text" required />
            </label>

            <label className="field">
                Длинный текст
                <textarea rows={3} />
            </label>

            <label className="field">
                Целое число
                <input type="number" min={0} step={1} />
            </label>

            <label className="field">
                Число с плавающией точкой
                <input type="number" min={0} step={0.01} />
            </label>

            <label className="field">
                <span>Диапазон</span>
                <input type="range" min={0} max={10} step={0.5} />
            </label>

            <label className="field">
                Дата
                <input type="date" required />
            </label>

            <label className="field">
                Выпадающий список
                <select>
                    <option>Вариант 1</option>
                </select>
            </label>

            <fieldset>
                <legend>Группа чекбоксов</legend>
                <label className="check">
                    <input type="checkbox" />
                    Чекбокс 1
                </label>
                <label className="check">
                    <input type="checkbox" />
                    Чекбокс 2
                </label>
            </fieldset>

            <label className="check">
                <input type="checkbox" />
                Чекбокс
            </label>

            <button className="btn">Добавить</button>
        </form>
    )
}
