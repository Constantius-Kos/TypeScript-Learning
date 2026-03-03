// Рішення до Уроку 1: Function types і type signatures

// ==========================================
// 🎯 ЗАВДАННЯ 1: Розминка
// ==========================================

function createProfile(name: string, age: number): string {
    return `Профіль: ${name}, вік: ${age}`;
}

const myProfile = createProfile("Іван", 25);


// ==========================================
// 🎯 ЗАВДАННЯ 2: Основне (Робота з об'єктами)
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

export { }; // Робимо файл модулем, щоб ізолювати область видимості
