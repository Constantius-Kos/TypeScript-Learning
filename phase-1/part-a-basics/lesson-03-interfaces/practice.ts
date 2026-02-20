/**
 * Урок 3: Объекты и Интерфейсы
 */

// 1. Создай интерфейс 'Laptop' со свойствами:
// brand (строка), ram (число), isSsd (boolean)
interface Laptop {
    // напиши здесь свойства
    brand: string,
    ram: number,
    isSsd: boolean
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
    userName: string;
    email: string;
    isAdmin: boolean
}

const newUser: User = {
    id: 1,
    userName: "alex_pro", // Ошибка: найди опечатку в ключе
    email: "alex@example.com",
    isAdmin: true // Ошибка: этого свойства нет в интерфейсе (удали его или добавь в интерфейс)
};

// 4. ОПЦИОНАЛЬНЫЕ свойства. 
// В интерфейсе ниже добавь знак '?' после bio, чтобы сделать его необязательным.
interface Profile {
    name: string;
    bio?: string; // Сделай меня необязательным
}

const shortProfile: Profile = {
    name: "Anna"
    // bio — отсутствует, и TS должен это разрешить
};

console.log("Урок 3 начат!");
