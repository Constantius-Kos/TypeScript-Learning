/**
 * Урок 5: Union Types & Literal Types
 */

// 1. Создай Union Type 'Size', который может принимать только строки:
// "small", "medium", "large"
type Size = 'small' | "medium" | 'large'; // Исправь здесь

function setSize(size: Size) {
    console.log("Size set to:", size);
}

setSize("medium"); // Ок
setSize("small"); // Здесь должна быть ошибка

// 2. Создай Union Type 'ID', который может быть либо числом, либо строкой.
type ID = number | string; // Исправь здесь

let userId: ID = 101;
userId = "uk-202"; // Ок
userId = "true"; // Ошибка!

// 3. Комбинируем: создай интерфейс 'Button'
// - label: string
// - color: "red" | "blue" | "green"
// - padding: number | string (например, 10 или "10px")
interface Button {
    // напиши свойства здесь
    label: string,
    color: "red" | "blue" | "green",
    padding: string | number
}

const myButton: Button = {
    label: "Click me",
    color: "blue", // Ошибка: желтого нет в списке разрешенных
    padding: "20px"
};

// 4. Вопрос: Как ты думаешь, зачем нам использовать 
// "red" | "blue" вместо просто string? 
// Напиши ответ в комментарии.
// чтобы ограничить возможные варианты только этими двумя цветами (литеральные типы)


console.log("Урок 5 в разгаре!");
