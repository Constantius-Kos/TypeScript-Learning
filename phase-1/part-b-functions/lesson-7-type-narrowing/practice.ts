export { };

// Урок 7: Type Narrowing
// ================================================

// --- Завдання 1: Розминка — typeof narrowing ---
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
function describe(value: string | number | boolean): string {
    switch (typeof value) {
        case 'string':
            return `Рядок: ${value.toUpperCase()}`
        case 'number':
            return `Число: ${value * 2}`
        case 'boolean':
            return `Булеве ${value}`
        default:

            throw new Error('Переданий невірний тип')
    }
}
describe('test')
// --- Завдання 2: Truthiness narrowing ---
//
// Напиши функцію `getLength(value: string | null | undefined): number`
// яка повертає довжину рядка, або 0 якщо значення порожнє/null/undefined
//
// Приклад:
//   getLength("hello") → 5
//   getLength(null)    → 0
//   getLength("")      → 0

// твій код тут:
function getLength(value: string | null | undefined): number {
    return value ? value.length : 0
}
getLength('43')
// --- Завдання 3: Discriminated union ---
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
type EmailNotification = { kind: "email", to: string, subject: string }
type SmsNotification = { kind: "sms", phone: string, text: string }
type PushNotification = { kind: "push", deviceId: string, title: string }

// function send(notification: Notification): string {
//     switch (notification.kind) {
//         case 'email':
//             return `Email → ${notification.to}: ${notification.subject}`
//         case 'sms':
//             return `SMS → ${notification.phone}: ${notification.text}`
//         case 'push':
//             return `Push → ${notification.deviceId}: ${notification.title}`
//         default:

//             throw new Error('Невідомий тип')
//     }



// }
// --- Завдання 4 (Челендж): Exhaustiveness checking ---
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
type SlackNotification = { kind: "slack", channel: string, message: string }
type AppNotification = EmailNotification | SmsNotification | PushNotification | SlackNotification
function send(notification: AppNotification): string {
    switch (notification.kind) {
        case 'email':
            return `Email → ${notification.to}: ${notification.subject}`
        case 'sms':
            return `SMS → ${notification.phone}: ${notification.text}`
        case 'push':
            return `Push → ${notification.deviceId}: ${notification.title}`
        case 'slack':
            return `Slack → ${notification.channel}: ${notification.message}`
        default:
            // const _test: never = notification
            throw new Error('Unknown notification')
    }
} send({ kind: "slack", channel: 'string', message: 'string' })
