// Практика к Уроку 1: Function types и type signatures

// ==========================================
// 🎯 ЗАДАЧА 1: Разминка
// Ниже написана функция на чистом JS. 
// Твоя задача: добавить типизацию аргументов и возвращаемого значения.
// Функция должна принимать имя (строка), возраст (число) и возвращать строку.
// ==========================================

function createProfile(name: string, age: number): string {
    return `Профиль: ${name}, возраст: ${age}`;
}

// Раскоментируй и проверь, что нет ошибок TS:
const myProfile = createProfile("Иван", 25);
// createProfile("Анна"); // Должна быть ошибка TS (не хватает аргумента)
// createProfile("Олег", "тридцать"); // Должна быть ошибка TS (неверный тип)


// ==========================================
// 🎯 ЗАДАЧА 2: Основная (Работа с объектами)
// 1. Создай Type Alias с именем 'Product', который содержит поля:
//    - id (число, только для чтения)
//    - title (строка)
//    - price (число)
// 2. Напиши типизацию для функции calculateTotal
//    Функция принимает массив продуктов и возвращает общую сумму (число).
// ==========================================

// Твой тип Product здесь:
type Product = {
    readonly id: number,
    title: string,
    price: number,
}

// Добавь типы сюда:
function calculateTotal(products: Product[]): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price;
    }
    return total;
}

// Раскоментируй для проверки:

const cart: Product[] = [
    { id: 1, title: "Книга", price: 500 },
    { id: 2, title: "Ручка", price: 50 }
];
const sum = calculateTotal(cart); // sum должно быть 550 и иметь тип number

export { }; // Делаем файл модулем, чтобы изолировать область видимости
