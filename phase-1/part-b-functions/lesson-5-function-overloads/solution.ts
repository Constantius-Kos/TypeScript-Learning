export {};

// ============================================================
// Урок 5: Function Overloads — Еталонне рішення
// ============================================================

// -----------------------------------------------------------
// ЗАВДАННЯ 1: Розминка
// -----------------------------------------------------------
function describe(arg: string): number;
function describe(arg: number): string;
function describe(arg: string | number): string | number {
  if (typeof arg === 'string') { return arg.length; }
  return String(arg);
}

const a = describe('hello'); // number
const b = describe(1234);    // string
console.log(a); // 5
console.log(b); // "1234"

// -----------------------------------------------------------
// ЗАВДАННЯ 2: Основне завдання
// -----------------------------------------------------------
type GuestUser = { role: "guest"; sessionId: string };
type AdminUser = { role: "admin"; name: string; permissions: string[] };

function createUser(role: 'guest'): GuestUser;
function createUser(role: 'admin'): AdminUser;
function createUser(role: 'admin' | 'guest'): AdminUser | GuestUser {
  if (role === 'guest') {
    return { role: 'guest', sessionId: Math.random().toString() };
  }
  return { role: 'admin', name: "Admin", permissions: ['read', 'write'] };
}

const user1 = createUser('guest'); // GuestUser
const user2 = createUser('admin'); // AdminUser

// -----------------------------------------------------------
// ЗАВДАННЯ 3: Челендж
// -----------------------------------------------------------
function getFirst(arg: string): string | null;
function getFirst(arg: number[]): number | null;
function getFirst(arg: string[]): string | null;
function getFirst(arg: string | string[] | number[]): string | number | null {
  if (!arg.length) { return null; }
  if (typeof arg === 'string') { return arg[0]; }
  if (typeof arg[0] === 'number') { return arg[0]; }
  if (typeof arg[0] === 'string') { return arg[0]; }
  return null;
}
