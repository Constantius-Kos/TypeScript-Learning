export { };

// ============================================================
// Урок 5: Function Overloads — Практика
// ============================================================

// -----------------------------------------------------------
// ЗАВДАННЯ 1: Розминка (5-7 хвилин)
// -----------------------------------------------------------
// Напиши функцію `describe` з двома перевантаженнями:
//   - якщо передати string → повернути number (довжину рядка)
//   - якщо передати number → повернути string (вигляду "Число: 42")
//
// Після напиши 2-3 виклики і перевір, що TypeScript
// правильно визначає тип результату.
//
// Підказка: не забудь — спочатку сигнатури, потім реалізація.

// --- Твій код тут ---
function describe(arg: string): number;
function describe(arg: number): string;
function describe(arg: string | number): string | number {
    if (typeof arg === 'string') { return arg.length }
    return String(arg)
}
const a = describe('hello')
const b = describe(1234)
console.log(a);
console.log(b);
// -----------------------------------------------------------
// ЗАВДАННЯ 2: Основне завдання (10-15 хвилин)
// -----------------------------------------------------------
// Є два типи користувачів:
//
//   type GuestUser = { role: "guest"; sessionId: string };
//   type AdminUser = { role: "admin"; name: string; permissions: string[] };
//
// Напиши функцію `createUser` з перевантаженнями:
//   - якщо передати "guest" → повернути GuestUser
//   - якщо передати "admin" → повернути AdminUser
//
// В реалізації:
//   - для "guest": sessionId = випадкове число (Math.random().toString())
//   - для "admin": name = "Admin", permissions = ["read", "write"]
//
// Перевір: TypeScript повинен знати точний тип результату при виклику.

// --- Твій код тут ---
type GuestUser = { role: "guest"; sessionId: string };
type AdminUser = { role: "admin"; name: string; permissions: string[] };

function createUser(role: 'guest'): GuestUser;
function createUser(role: 'admin'): AdminUser;
function createUser(role: 'admin' | 'guest'): AdminUser | GuestUser {
    if (role === 'guest') { return { role: 'guest', sessionId: Math.random().toString() } }
    return { role: 'admin', name: "Admin", permissions: ['read', 'write'] }
}
const user1 = createUser('guest')
const user2 = createUser('admin')

// -----------------------------------------------------------
// ЗАВДАННЯ 3: Челендж (15-20 хвилин)
// -----------------------------------------------------------
// Напиши функцію `getFirst` з перевантаженнями:
//   - якщо передати string → повернути string (перший символ)
//   - якщо передати number[] → повернути number (перший елемент)
//   - якщо передати string[] → повернути string (перший елемент)
//
// Додатково: додай обробку порожнього масиву/рядка.
// Якщо порожній — повернути null (додай null в тип повернення перевантажень).
//
// Підказка: у тебе буде 3 сигнатури перевантажень і 1 реалізація.

// --- Твій код тут ---
function getFirst(arg: string): string | null;
function getFirst(arg: number[]): number | null;
function getFirst(arg: string[]): string | null;
function getFirst(arg: string | string[] | number[]) {
    if (!arg.length) { return null }
    if (typeof arg === 'string') { return arg[0] }
    if (typeof arg[0] === 'number') { return arg[0] }
    if (typeof arg[0] === 'string') { return arg[0] }
}
