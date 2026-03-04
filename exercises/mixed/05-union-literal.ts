/**
 * Урок 5: Union Types & Literal Types
 */

// 1. Создай Union Type 'Size', который может принимать только строки:
// "small", "medium", "large"
type Size = string; // Исправь — сделай Literal type

function setSize(size: Size) {
    console.log("Size set to:", size);
}

setSize("medium"); // Ок
setSize("xlarge"); // Должна быть ошибка после исправления

// 2. Создай Union Type 'ID', который может быть либо числом, либо строкой.
type ID = number; // Исправь — добавь string в union

let userId: ID = 101;
userId = "uk-202"; // Сейчас ошибка — исправь тип выше

// 3. Комбинируем: создай интерфейс 'Button'
// - label: string
// - color: "red" | "blue" | "green"
// - padding: number | string (например, 10 или "10px")
interface Button {
    // напиши свойства здесь
}

const myButton: Button = {
    label: "Click me",
    color: "yellow", // Ошибка: yellow нет в списке разрешенных
    padding: "20px"
};

// 4. Вопрос: зачем использовать "red" | "blue" вместо просто string?
// Напиши ответ в комментарии:
//

console.log("Урок 5 в разгаре!");
