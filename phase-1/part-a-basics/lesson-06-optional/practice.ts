/**
 * УРОК 6: Optional свойства (?) и работа с отсутствующими данными
 * 
 * В этом уроке мы научимся делать свойства объектов необязательными,
 * а также безопасно работать с данными, которые могут быть undefined.
 */

// 1. Определение опциональных свойств в интерфейсах
// interface UserProfile {
//     id: number;
//     username: string;
//     firstName?: string; // Знак вопроса делает свойство необязательным
//     lastName?: string;
//     bio?: string;
// }

// const user1: UserProfile = {
//     id: 1,
//     username: "coder123"
//     // firstName, lastName, bio - отсутствуют, и это нормально!
// };

// const user2: UserProfile = {
//     id: 2,
//     username: "pro_dev",
//     firstName: "Иван"
// };

// // 2. Опциональные параметры в функциях
// function greetUser(greeting: string, name?: string): string {
//     if (name) {
//         return `${greeting}, ${name}!`;
//     }
//     return `${greeting}!`;
// }

// 3. Optional Chaining (?.) - Безопасный доступ к вложенным свойствам
interface Company {
    name: string;
    address?: {
        city: string;
        street?: string;
    };
}

const company: Company = { name: "Google" };
// Без опциональной цепочки нам пришлось бы писать:
// const street = company.address && company.address.street;

// С опциональной цепочкой:
const street = company.address?.street; // вернет undefined, а не ошибку!

/**
 * ЗАДАНИЕ 1:
 * Создайте интерфейс 'Car' со свойствами:
 * - brand (string) - обязательно
 * - model (string) - обязательно
 * - year (number) - опционально
 * - engine (объект с опциональным свойством hp: number) - опционально
 *
 * Создайте два объекта этого типа: один с минимальным набором свойств,
 * другой - со всеми заполненными.
 */

// TODO: Ваш код здесь
interface Car {
    brand: string,
    model: string,
    year?: number,
    engine?: {
        hp?: number
    }
}
const car1: Car = {
    brand: 'BMW',
    model: 'x6',

}
const car2: Car = {
    brand: 'Mersedes',
    model: '240',
    year: 1990,
    engine: {
        hp: 100
    }

}
/**
 * ЗАДАНИЕ 2:
 * Напишите функцию 'getCarDisplayYear', которая принимает объект 'Car'
 * и возвращает строку с годом выпуска или "Year unknown".
 * Используйте проверку на наличие значения.
 */

// TODO: Ваш код здесь
function getCarDisplayYear(car: Car): string {
    return car.year?.toString() ?? 'Year unknow'
}

/**
 * ЗАДАНИЕ 3:
 * Используя Optional Chaining, попробуйте вывести мощность двигателя (hp)
 * автомобиля в консоль. Проверьте, что будет, если двигателя нет.
 */
// TODO: Ваш код здесь
console.log(getCarDisplayYear(car1))
console.log(getCarDisplayYear(car2))
console.log(car1.engine?.hp ?? 'Нет мощи');
console.log(car2.engine?.hp);

/**
 * ЗАДАНИЕ 4: Социальная сеть
 * 1. Создайте интерфейс 'UserProfile' со свойствами:
 *    - name (string)
 *    - bio (string, опционально)
 * 2. Напишите функцию 'getBio', которая возвращает bio или "Bio не заполнено".
 * 3. ВАЖНО: Если bio - пустая строка "", функция ДОЛЖНА вернуть пустую строку, а не дефолтную фразу.
 */

// TODO: Ваш код здесь
interface UserProfile {
    name: string,
    bio?: string
}

const user: UserProfile = {
    name: 'Вася Пупкин'
}
const user1: UserProfile = {
    name: "Петя Петечкин",
    bio: "Алкаш"

}
function getBio(user?: UserProfile): string {
    return user?.bio?.toString() ?? 'Bio not found'
}
console.log(getBio(user));
console.log(getBio(user1));
/**
 * ЗАДАНИЕ 5: Глубокий поиск (Optional Chaining)
 * 1. Создайте интерфейс 'User' со свойством 'settings', которое опционально.
 * 2. Внутри 'settings' есть опциональное свойство 'theme' (объект с полем 'color': string).
 * 3. Попробуйте достать 'color' одной строкой, используя ?.
 * 4. Если цвета нет, верните "white" по умолчанию.
 */

// TODO: Ваш код здесь
