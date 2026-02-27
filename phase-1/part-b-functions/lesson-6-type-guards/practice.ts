export { };

// =============================================================
// УРОК 6: Type Guards
// =============================================================

// -------------------------------------------------------------
// ЗАДАЧА 1 — Разминка: typeof
// -------------------------------------------------------------
// Напиши функцию `describe(value: string | number): string`
// Если value — строка: вернуть `"Строка длиной N символов"`
// Если value — число: вернуть `"Число, удвоенное: N"`
//
// Примеры:
//   describe("hello") → "Строка длиной 5 символов"
//   describe(7)       → "Число, удвоенное: 14"

// Твой код:
function describe(value: string | number): string {
    if (typeof value === 'string') { return `строка длиной ${value.length} символов` }
    return `Число удвоенное: ${value * 2}`
}
console.log(describe('уйпидаджигурда'));
console.log(describe(12));
// -------------------------------------------------------------
// ЗАДАЧА 2 — Основная: in оператор
// -------------------------------------------------------------
// Есть два типа:
//   type EmailContact = { email: string; sendEmail: () => void }
//   type PhoneContact = { phone: string; call: () => void }
//
// Напиши функцию `contact(person: EmailContact | PhoneContact): void`
// Если у person есть email — вызвать sendEmail() и вывести в консоль "Отправляем email на [email]"
// Если у person есть phone — вызвать call() и вывести в консоль "Звоним на [phone]"

// Твой код:
type EmailContact = { email: string; sendEmail: () => void }
type PhoneContact = { phone: string; call: () => void }
function contact(person: EmailContact | PhoneContact): void {
    if ('email' in person) { person.sendEmail(); console.log(`Отправляем email на ${person.email}`); return }

    person.call(); console.log(`Звоним на ${person.phone}`);
}
const emailUser: EmailContact = {
    email: "test@mail.com",
    sendEmail: () => console.log("(метод sendEmail вызван)")
};

const phoneUser: PhoneContact = {
    phone: "+380663141977",
    call: () => console.log("(метод call вызван)")
}
contact(emailUser);
contact(phoneUser)
// -------------------------------------------------------------
// ЗАДАЧА 3 — Челлендж: пользовательский type guard
// -------------------------------------------------------------
// Есть типы:
//   type Square = { kind: "square"; side: number }
//   type Circle = { kind: "circle"; radius: number }
//   type Shape = Square | Circle
//
// 1. Напиши type guard функцию `isSquare(shape: Shape): shape is Square`
// 2. Напиши функцию `getArea(shape: Shape): number`
//    - для Square: side * side
//    - для Circle: Math.PI * radius * radius (можно округлить до 2 знаков)
// 3. Используй isSquare внутри getArea

// Твой код:
type Square = { kind: "square"; side: number }
type Circle = { kind: "circle"; radius: number }
type Shape = Square | Circle

function isSquare(shape: Shape): shape is Square {
    return shape.kind === 'square'
}
function getArea(shape: Shape): number {
    if (isSquare(shape)) { return shape.side * shape.side }
    return Number((Math.PI * shape.radius * shape.radius).toFixed(2))
}

const square: Square = {
    kind: 'square', side: 12
}
const circle: Circle = {
    kind: 'circle', radius: 32
}

console.log(getArea(square));
console.log(getArea(circle));