export { };

// ============================================================
// Урок 5: Function Overloads — Практика
// ============================================================

// -----------------------------------------------------------
// ЗАДАНИЕ 1: Разминка (5-7 минут)
// -----------------------------------------------------------
// Напиши функцию `describe` с двумя перегрузками:
//   - если передать string → вернуть number (длину строки)
//   - если передать number → вернуть string (вида "Число: 42")
//
// После напиши 2-3 вызова и проверь, что TypeScript
// правильно определяет тип результата.
//
// Подсказка: не забудь — сначала сигнатуры, потом реализация.

// --- Твой код здесь ---
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
// ЗАДАНИЕ 2: Основная задача (10-15 минут)
// -----------------------------------------------------------
// Есть два типа пользователей:
//
//   type GuestUser = { role: "guest"; sessionId: string };
//   type AdminUser = { role: "admin"; name: string; permissions: string[] };
//
// Напиши функцию `createUser` с перегрузками:
//   - если передать "guest" → вернуть GuestUser
//   - если передать "admin" → вернуть AdminUser
//
// В реализации:
//   - для "guest": sessionId = случайное число (Math.random().toString())
//   - для "admin": name = "Admin", permissions = ["read", "write"]
//
// Проверь: TypeScript должен знать точный тип результата при вызове.

// --- Твой код здесь ---
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
// ЗАДАНИЕ 3: Челлендж (15-20 минут)
// -----------------------------------------------------------
// Напиши функцию `getFirst` с перегрузками:
//   - если передать string → вернуть string (первый символ)
//   - если передать number[] → вернуть number (первый элемент)
//   - если передать string[] → вернуть string (первый элемент)
//
// Дополнительно: добавь обработку пустого массива/строки.
// Если пустой — вернуть null (добавь null в тип возврата перегрузок).
//
// Подсказка: у тебя будет 3 сигнатуры перегрузок и 1 реализация.

// --- Твой код здесь ---
function getFirst(arg: string): string | null;
function getFirst(arg: number[]): number | null;
function getFirst(arg: string[]): string | null;
function getFirst(arg: string | string[] | number[]) {
    if (!arg.length) { return null }
    if (typeof arg === 'string') { return arg[0] }
    if (typeof arg[0] === 'number') { return arg[0] }
    if (typeof arg[0] === 'string') { return arg[0] }
}