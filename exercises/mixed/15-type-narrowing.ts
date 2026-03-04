// ============================================================
// Урок B7: Type Narrowing
// ============================================================

export {};

// --- Задание 1: Разминка — typeof narrowing ---
//
// Напиши функцію `describe(value: string | number | boolean): string`
// яка повертає опис змінної:
// - якщо string: `"Рядок: <значення у верхньому регістрі>"`
// - якщо number: `"Число: <значення * 2>"`
// - якщо boolean: `"Булеве: <true/false>"`
//
// Приклад:
//   describe("hello") → "Рядок: HELLO"
//   describe(5)       → "Число: 10"
//   describe(true)    → "Булеве: true"

// твій код тут:

// --- Задание 2: Truthiness narrowing ---
//
// Напиши функцію `getLength(value: string | null | undefined): number`
// яка повертає довжину рядка, або 0 якщо значення порожнє/null/undefined
//
// Приклад:
//   getLength("hello") → 5
//   getLength(null)    → 0
//   getLength("")      → 0

// твій код тут:

// --- Задание 3: Discriminated union ---
//
// У нас є три типи сповіщень:
//   - EmailNotification: { kind: "email", to: string, subject: string }
//   - SmsNotification:   { kind: "sms", phone: string, text: string }
//   - PushNotification:  { kind: "push", deviceId: string, title: string }
//
// 1. Створи тип Notification = об'єднання всіх трьох
// 2. Напиши функцію `send(notification: Notification): string`
//    яка повертає рядок з описом відправки:
//    - email: `"Email → <to>: <subject>"`
//    - sms:   `"SMS → <phone>: <text>"`
//    - push:  `"Push → <deviceId>: <title>"`

// твої типи і код тут:

// --- Задание 4 (Челлендж): Exhaustiveness checking ---
//
// Візьми типи із завдання 3 і додай четвертий тип:
//   - SlackNotification: { kind: "slack", channel: string, message: string }
//
// Онови тип Notification щоб включав SlackNotification.
// Додай обробку "slack" у функцію send.
// В кінці switch додай default з exhaustiveness check через never.
//
// Перевір: якщо прибрати обробку "slack" — повинна з'явитися помилка TypeScript.

// твій код тут:
