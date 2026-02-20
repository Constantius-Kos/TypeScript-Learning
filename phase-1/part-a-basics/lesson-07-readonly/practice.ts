/**
 * УРОК 7: Readonly свойства (Только для чтения)
 * 
 * В этом уроке мы научимся защищать данные от случайных изменений.
 * Модификатор readonly делает свойство доступным только для чтения
 * после его инициализации.
 */

export { }; // Делаем файл модулем, чтобы избежать конфликтов имен с другими уроками

// --- ТЕОРИЯ И ПРИМЕРЫ ---

interface Lesson7User {
    readonly id: number; // Это свойство нельзя изменить после создания объекта
    name: string;        // Это свойство менять можно
}

const exampleUser: Lesson7User = {
    id: 1,
    name: "Ivan"
};

exampleUser.name = "Dmitry"; // OK
// exampleUser.id = 2;       // ОШИБКА: Cannot assign to 'id' because it is a read-only property.

// Readonly массивы
const readonlyScores: readonly number[] = [10, 20, 30];
// readonlyScores.push(40);   // ОШИБКА: Property 'push' does not exist on type 'readonly number[]'.


/**
 * ЗАДАНИЕ 1: Смартфон
 * 1. Создайте интерфейс 'Smartphone'.
 * 2. Свойства:
 *    - model (string) - ТОЛЬКО ДЛЯ ЧТЕНИЯ
 *    - year (number) - ТОЛЬКО ДЛЯ ЧТЕНИЯ
 *    - color (string) - можно изменять
 * 3. Создайте объект 'myPhone' и попробуйте изменить его цвет и модель.
 * 4. Закомментируйте строку, которая вызывает ошибку компиляции.
 */

// TODO: Ваш код здесь
interface Smartphone {
    readonly model: string,
    readonly year: number,
    color: string
}
const myPhone: Smartphone = {
    model: 'Samsung',
    year: 2010,
    color: 'red'
}
const myNewPhone: Smartphone = {
    ...myPhone,
    model: 'nokia',
    color: 'gren'
}
myPhone.color = 'green'
// myPhone.model= 'nokia'
/**
 * ЗАДАНИЕ 2: Конфигурация системы
 * 1. Создайте интерфейс 'AppConfig'.
 * 2. Поля:
 *    - endpoint (string) - readonly
 *    - version (string) - readonly
 *    - isDebug (boolean) - обычное
 * 3. Напишите функцию 'updateVersion', которая пытается изменить version в объекте.
 * 4. Убедитесь, что TypeScript выдает ошибку.
 */

// TODO: Ваш код здесь
interface appConfig {
    readonly endpoint: string,
    readonly version: string,
    isDebug: boolean
}
const newConfig: appConfig = {
    endpoint: '/endpoint',
    version: 'version 1',
    isDebug: false
}

function updateVersion(config: appConfig): appConfig {
    // config.version = 'version 2' //выдает ошибку чт освойство только readonly
    return config

}
/**
 * ЗАДАНИЕ 3: Неизменяемый список
 * 1. Создайте переменную 'tags' как readonly массив строк.
 * 2. Попробуйте добавить новый элемент в массив через .push() или изменить элемент по индексу.
 * 3. Опишите в комментариях, почему это полезно при работе с важными данными.
 */

// TODO: Ваш код здесь
const tags: readonly string[] = ['string1', 'string2', 'string3']

// tags.push('string4') //выдает ошибку:Property 'push' does not exist on type 'readonly string[]'