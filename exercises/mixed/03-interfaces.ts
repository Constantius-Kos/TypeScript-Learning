/**
 * Урок 3: Объекты и Интерфейсы
 */

// 1. Создай интерфейс 'Laptop' со свойствами:
// brand (строка), ram (число), isSsd (boolean)
interface Laptop {
    // напиши здесь свойства
}

// 2. Используй интерфейс Laptop для этой переменной
const myLaptop: Laptop = {
    brand: "Apple",
    ram: 16,
    isSsd: true
};

// 3. Создай интерфейс 'User' и исправь ошибки в объекте ниже
interface User {
    id: number;
    name: string;     // подсказка: найди опечатку в объекте ниже
    email: string;
}

const newUser: User = {
    id: 1,
    usrname: "alex_pro", // Ошибка: опечатка в ключе
    email: "alex@example.com",
    isAdmin: true         // Ошибка: этого свойства нет в интерфейсе
};

// 4. ОПЦИОНАЛЬНЫЕ свойства.
// В интерфейсе ниже сделай bio необязательным (добавь '?')
interface Profile {
    name: string;
    bio: string;
}

const shortProfile: Profile = {
    name: "Anna"
    // bio — отсутствует, но TS пока не разрешает это
};

console.log("Урок 3 начат!");
