export { };

// Урок 7: Type Narrowing
// ================================================

// --- Задача 1: Разминка — typeof narrowing ---
//
// Напиши функцию `describe(value: string | number | boolean): string`
// которая возвращает описание переменной:
// - если string: `"Строка: <значение в верхнем регистре>"`
// - если number: `"Число: <значение * 2>"`
// - если boolean: `"Булево: <true/false>"`
//
// Пример:
//   describe("hello") → "Строка: HELLO"
//   describe(5)       → "Число: 10"
//   describe(true)    → "Булево: true"

// твой код здесь:
function describe(value: string | number | boolean): string {
    switch (typeof value) {
        case 'string':
            return `Строка: ${value.toUpperCase()}`
        case 'number':
            return `Число: ${value * 2}`
        case 'boolean':
            return `Булево ${value}`
        default:

            throw new Error('Передан не верный тип')
    }
}
describe('test')
// --- Задача 2: Truthiness narrowing ---
//
// Напиши функцию `getLength(value: string | null | undefined): number`
// которая возвращает длину строки, или 0 если значение пустое/null/undefined
//
// Пример:
//   getLength("hello") → 5
//   getLength(null)    → 0 
//   getLength("")      → 0

// твой код здесь:
function getLength(value: string | null | undefined): number {
    return value ? value.length : 0
}
getLength('43')
// --- Задача 3: Discriminated union ---
//
// У нас есть три типа уведомлений:
//   - EmailNotification: { kind: "email", to: string, subject: string }
//   - SmsNotification:   { kind: "sms", phone: string, text: string }
//   - PushNotification:  { kind: "push", deviceId: string, title: string }
//
// 1. Создай тип Notification = объединение всех трёх
// 2. Напиши функцию `send(notification: Notification): string`
//    которая возвращает строку с описанием отправки:
//    - email: `"Email → <to>: <subject>"`
//    - sms:   `"SMS → <phone>: <text>"`
//    - push:  `"Push → <deviceId>: <title>"`

// твои типы и код здесь:
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

//             throw new Error('Ротбомжа')
//     }



// }
// --- Задача 4 (Челлендж): Exhaustiveness checking ---
//
// Возьми типы из задачи 3 и добавь четвёртый тип:
//   - SlackNotification: { kind: "slack", channel: string, message: string }
//
// Обнови тип Notification чтобы включал SlackNotification.
// Добавь обработку "slack" в функцию send.
// В конце switch добавь default с exhaustiveness check через never.
//
// Проверь: если убрать обработку "slack" — должна появиться ошибка TypeScript.

// твой код здесь:
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