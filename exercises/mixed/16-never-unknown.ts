// ============================================================
// Урок B8: Never і Unknown типи
// ============================================================

export {};

// --- Задание 1: Разминка — unknown vs any ---
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

// --- Задание 2: Обработка ошибок с unknown ---
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

// --- Задание 3: never як exhaustiveness check ---
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

// --- Задание 4 (Челлендж): Безопасный парсер JSON ---
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
