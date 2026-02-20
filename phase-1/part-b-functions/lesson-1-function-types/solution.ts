// Решение к Уроку 1: Function types и type signatures

// ==========================================
// 🎯 ЗАДАЧА 1: Разминка
// ==========================================

function createProfile(name: string, age: number): string {
    return `Профиль: ${name}, возраст: ${age}`;
}

const myProfile = createProfile("Иван", 25);


// ==========================================
// 🎯 ЗАДАЧА 2: Основная (Работа с объектами)
// ==========================================

type Product = {
    readonly id: number;
    title: string;
    price: number;
}

function calculateTotal(products: Product[]): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price;
    }
    return total;
}

const cart: Product[] = [
    { id: 1, title: "Книга", price: 500 },
    { id: 2, title: "Ручка", price: 50 }
];
const sum = calculateTotal(cart);

export { }; // Делаем файл модулем, чтобы изолировать область видимости
