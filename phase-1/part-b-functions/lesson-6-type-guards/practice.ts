export { };

// =============================================================
// УРОК 6: Type Guards
// =============================================================

// -------------------------------------------------------------
// ЗАВДАННЯ 1 — Розминка: typeof
// -------------------------------------------------------------
// Напиши функцію `describe(value: string | number): string`
// Якщо value — рядок: повернути `"Рядок довжиною N символів"`
// Якщо value — число: повернути `"Число, подвоєне: N"`
//
// Приклади:
//   describe("hello") → "Рядок довжиною 5 символів"
//   describe(7)       → "Число, подвоєне: 14"

// Твій код:
function describe(value: string | number): string {
    if (typeof value === 'string') { return `рядок довжиною ${value.length} символів` }
    return `Число подвоєне: ${value * 2}`
}
console.log(describe('test'));
console.log(describe(12));
// -------------------------------------------------------------
// ЗАВДАННЯ 2 — Основне: оператор in
// -------------------------------------------------------------
// Є два типи:
//   type EmailContact = { email: string; sendEmail: () => void }
//   type PhoneContact = { phone: string; call: () => void }
//
// Напиши функцію `contact(person: EmailContact | PhoneContact): void`
// Якщо у person є email — викликати sendEmail() і вивести в консоль "Відправляємо email на [email]"
// Якщо у person є phone — викликати call() і вивести в консоль "Телефонуємо на [phone]"

// Твій код:
type EmailContact = { email: string; sendEmail: () => void }
type PhoneContact = { phone: string; call: () => void }
function contact(person: EmailContact | PhoneContact): void {
    if ('email' in person) { person.sendEmail(); console.log(`Відправляємо email на ${person.email}`); return }

    person.call(); console.log(`Телефонуємо на ${person.phone}`);
}
const emailUser: EmailContact = {
    email: "test@mail.com",
    sendEmail: () => console.log("(метод sendEmail викликано)")
};

const phoneUser: PhoneContact = {
    phone: "+380663141977",
    call: () => console.log("(метод call викликано)")
}
contact(emailUser);
contact(phoneUser)
// -------------------------------------------------------------
// ЗАВДАННЯ 3 — Челендж: користувацький type guard
// -------------------------------------------------------------
// Є типи:
//   type Square = { kind: "square"; side: number }
//   type Circle = { kind: "circle"; radius: number }
//   type Shape = Square | Circle
//
// 1. Напиши type guard функцію `isSquare(shape: Shape): shape is Square`
// 2. Напиши функцію `getArea(shape: Shape): number`
//    - для Square: side * side
//    - для Circle: Math.PI * radius * radius (можна округлити до 2 знаків)
// 3. Використай isSquare всередині getArea

// Твій код:
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
