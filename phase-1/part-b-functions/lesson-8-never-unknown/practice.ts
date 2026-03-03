export { };

// Урок 8: Never і Unknown типи
// ================================================

// --- Завдання 1: Розминка — unknown vs any ---
//
// Напиши функцію `stringify(value: unknown): string`
// яка безпечно перетворює будь-яке значення на рядок:
// - якщо string — повертає як є
// - якщо number — повертає як рядок (String(value))
// - якщо boolean — повертає "true" або "false"
// - інакше — повертає "невідомо"
//
// Приклад:
//   stringify("hello")  → "hello"
//   stringify(42)       → "42"
//   stringify(true)     → "true"
//   stringify(null)     → "невідомо"

// твій код тут:
function stringify(value: unknown): string {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
            return String(value)
        case "boolean":
            return String(value)

        default:
            return 'невідомо'
    }
}
stringify('test')
// --- Завдання 2: Обробка помилок з unknown ---
//
// В TypeScript catch(error) має тип unknown.
// Напиши функцію `getErrorMessage(error: unknown): string`
// яка повертає текст помилки:
// - якщо error — це Error об'єкт: повертає error.message
// - якщо error — рядок: повертає його напряму
// - інакше: повертає "Невідома помилка"
//
// Приклад використання:
//   try { ... }
//   catch (error) { console.log(getErrorMessage(error)); }

// твій код тут:
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message
    }
    if (typeof error === 'string') {
        return error
    }
    return 'невідома помилка'
}
getErrorMessage('test')
// --- Завдання 3: never як exhaustiveness check ---
//
// Є тип фігури:
//   type Shape =
//     | { kind: "circle"; radius: number }
//     | { kind: "square"; side: number }
//     | { kind: "triangle"; base: number; height: number }
//
// 1. Напиши функцію `assertNever(value: never): never`
// 2. Напиши функцію `getArea(shape: Shape): number` яка:
//    - circle:   Math.PI * radius ** 2
//    - square:   side ** 2
//    - triangle: (base * height) / 2
//    - default:  викликає assertNever (exhaustiveness check)
//
// Перевір: закоментуй один case — повинна з'явитися помилка TS.

// твій код тут:
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "triangle"; base: number; height: number }

function assertNever(value: never): never {
    throw new Error('переданий необроблюваний тип')
}
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius * shape.radius
        case 'square':
            return shape.side ** 2
        case 'triangle':
            return shape.base * shape.height / 2
        default:
            return assertNever(shape)
    }
}
getArea({ kind: "circle", radius: 32 })
// --- Завдання 4 (Челендж): Безпечний парсер JSON ---
//
// Напиши функцію `safeParseUser(json: string)`
// яка парсить JSON і повертає об'єкт з полями:
//   { name: string; age: number }
// або null якщо дані невалідні.
//
// Вимоги:
// - використовуй unknown (не any!) для результату JSON.parse
// - перевір що результат — об'єкт (не null)
// - перевір що є поле name типу string
// - перевір що є поле age типу number
// - якщо щось не так — return null
//
// Приклад:
//   safeParseUser('{"name":"Alice","age":30}')  → { name: "Alice", age: 30 }
//   safeParseUser('{"name":"Bob"}')             → null (немає age)
//   safeParseUser('not json')                   → null

// твій код тут:
function safeParseUser(json: string): { name: string; age: number } | null {
    try {
        const parseResult: unknown = JSON.parse(json)

        if (typeof parseResult === 'object' &&
            parseResult !== null &&
            'name' in parseResult &&
            'age' in parseResult &&
            typeof parseResult.name === 'string' &&
            typeof parseResult.age === 'number') { return parseResult as { name: string; age: number } }
        return null
    } catch (error) {
        return null

    }

}
