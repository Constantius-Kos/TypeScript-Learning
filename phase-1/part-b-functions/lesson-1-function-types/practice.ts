// Практика до Уроку 1: Function types і type signatures

// ==========================================
// 🎯 ЗАВДАННЯ 1: Розминка
// Нижче написана функція на чистому JS.
// Твоє завдання: додати типізацію аргументів і значення, що повертається.
// Функція повинна приймати ім'я (рядок), вік (число) і повертати рядок.
// ==========================================

function createProfile(name: string, age: number): string {
    return `Профіль: ${name}, вік: ${age}`;
}

// Розкоментуй і перевір, що немає помилок TS:
const myProfile = createProfile("Іван", 25);
// createProfile("Анна"); // Повинна бути помилка TS (не вистачає аргументу)
// createProfile("Олег", "тридцять"); // Повинна бути помилка TS (невірний тип)


// ==========================================
// 🎯 ЗАВДАННЯ 2: Основне (Робота з об'єктами)
// 1. Створи Type Alias з іменем 'Product', який містить поля:
//    - id (число, тільки для читання)
//    - title (рядок)
//    - price (число)
// 2. Напиши типізацію для функції calculateTotal
//    Функція приймає масив продуктів і повертає загальну суму (число).
// ==========================================

// Твій тип Product тут:
type Product = {
    readonly id: number,
    title: string,
    price: number,
}

// Додай типи сюди:
function calculateTotal(products: Product[]): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price;
    }
    return total;
}

// Розкоментуй для перевірки:

const cart: Product[] = [
    { id: 1, title: "Книга", price: 500 },
    { id: 2, title: "Ручка", price: 50 }
];
const sum = calculateTotal(cart); // sum повинно бути 550 і мати тип number

export { }; // Робимо файл модулем, щоб ізолювати область видимості
