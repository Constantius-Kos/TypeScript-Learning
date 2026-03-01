export { };

// Урок 8: Never и Unknown типы
// ================================================

// --- Задача 1: Разминка — unknown vs any ---
//
// Напиши функцию `stringify(value: unknown): string`
// которая безопасно превращает любое значение в строку:
// - если string — возвращает как есть
// - если number — возвращает как строку (String(value))
// - если boolean — возвращает "true" или "false"
// - иначе — возвращает "неизвестно"
//
// Пример:
//   stringify("hello")  → "hello"
//   stringify(42)       → "42"
//   stringify(true)     → "true"
//   stringify(null)     → "неизвестно"

// твой код здесь:
function stringify(value: unknown): string {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
            return String(value)
        case "boolean":
            return String(value)

        default:
            return 'неизвестно'
    }
}
stringify('test')
// --- Задача 2: Обработка ошибок с unknown ---
//
// В TypeScript catch(error) имеет тип unknown.
// Напиши функцию `getErrorMessage(error: unknown): string`
// которая возвращает текст ошибки:
// - если error — это Error объект: возвращает error.message
// - если error — строка: возвращает её напрямую
// - иначе: возвращает "Неизвестная ошибка"
//
// Пример использования:
//   try { ... }
//   catch (error) { console.log(getErrorMessage(error)); }

// твой код здесь:
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message
    }
    if (typeof error === 'string') {
        return error
    }
    return 'неизвестная ошибка'
}
getErrorMessage('test')
// --- Задача 3: never как exhaustiveness check ---
//
// Есть тип фигуры:
//   type Shape =
//     | { kind: "circle"; radius: number }
//     | { kind: "square"; side: number }
//     | { kind: "triangle"; base: number; height: number }
//
// 1. Напиши функцию `assertNever(value: never): never`
// 2. Напиши функцию `getArea(shape: Shape): number` которая:
//    - circle:   Math.PI * radius ** 2
//    - square:   side ** 2
//    - triangle: (base * height) / 2
//    - default:  вызывает assertNever (exhaustiveness check)
//
// Проверь: закомментируй один case — должна появиться ошибка TS.

// твой код здесь:
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "triangle"; base: number; height: number }

function assertNever(value: never): never {
    throw new Error('передан необрабатываемый тип')
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
// --- Задача 4 (Челлендж): Безопасный парсер JSON ---
//
// Напиши функцию `safeParseUser(json: string)`
// которая парсит JSON и возвращает объект с полями:
//   { name: string; age: number }
// или null если данные невалидны.
//
// Требования:
// - используй unknown (не any!) для результата JSON.parse
// - проверь что результат — объект (не null)
// - проверь что есть поле name типа string
// - проверь что есть поле age типа number
// - если что-то не так — return null
//
// Пример:
//   safeParseUser('{"name":"Alice","age":30}')  → { name: "Alice", age: 30 }
//   safeParseUser('{"name":"Bob"}')             → null (нет age)
//   safeParseUser('not json')                   → null

// твой код здесь:
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