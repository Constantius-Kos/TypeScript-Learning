// ============================================================
// Урок 3: Rest parameters с типами
// ============================================================
// Запуск: npx ts-node practice.ts
// ============================================================

// ------------------------------------------------------------
// Задача 1: РАЗМИНКА — базовый rest (5-7 минут)
// ------------------------------------------------------------
// Напиши функцию joinWords, которая принимает любое количество
// строк и возвращает их объединённую через пробел.
//
// Примеры вызовов:
//   joinWords("Hello", "world")        → "Hello world"
//   joinWords("TypeScript", "is", "cool") → "TypeScript is cool"
//   joinWords("one")                   → "one"

// Твой код здесь:
function joinWords(...strings: string[]): string {
    return strings.join(' ')
}
joinWords("Hello", "world")
joinWords("TypeScript", "is", "cool")
joinWords("one")
// ------------------------------------------------------------
// Задача 2: ОСНОВНАЯ — rest + обычные параметры (10-15 минут)
// ------------------------------------------------------------
// Напиши функцию createTag, которая создаёт HTML-тег.
// Параметры:
//   - tag: string (название тега, обязательный)
//   - cssClass: string (CSS класс, по умолчанию "default")
//   - ...content: string[] (содержимое тега, любое количество строк)
//
// Результат — строка вида:
//   <div class="default">Hello World</div>
//   <p class="title">TypeScript is great</p>
//
// Подсказка: content.join(" ") объединит все строки через пробел
//
// Вызови 3 раза:
//   1. Только tag и одна строка контента (без cssClass)
//   2. С cssClass и двумя строками контента
//   3. С cssClass и тремя строками контента    


// Твой код здесь:
function createTag(tag: string, cssClass: string = 'default', ...content: string[]): string {
    return `<${tag} class="${cssClass}">${content.join(' ')}</${tag}>`
}
console.log(createTag("div", "default", "Hello World"));
console.log(createTag("p", "title", "TypeScript", "is great"));
console.log(createTag("section", "main", "Один", "два", "три"));
// ------------------------------------------------------------
// Задача 3: ЧЕЛЛЕНДЖ — статистика (15-20 минут)
// ------------------------------------------------------------
// Напиши функцию getStats, которая принимает любое количество чисел
// и возвращает объект со статистикой.
//
// Возвращаемый тип (объяви сам):
//   {
//     count: number    — количество чисел
//     sum: number      — сумма
//     min: number      — минимальное
//     max: number      — максимальное
//     average: number  — среднее (sum / count)
//   }
//
// Подсказки:
//   - Math.min(...numbers) — минимум
//   - Math.max(...numbers) — максимум
//   - Используй reduce для суммы
//
// Вызови 2 раза:
//   1. getStats(3, 7, 2, 9, 1)
//   2. getStats(100, 200, 150)

// Объяви тип результата:


// Твоя функция:
type Stats = {
    count: number,
    sum: number,
    min: number,
    max: number,
    average: number
}
function getStats(...numbers: number[]): Stats {
    return {
        count: numbers.length,
        sum: numbers.reduce((acc, n) => acc + n, 0),
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        average: numbers.reduce((acc, n) => acc + n, 0) / numbers.length


    }
}
console.log(getStats(3, 7, 2, 9, 1));
console.log(getStats(100, 200, 150));
// ------------------------------------------------------------
// Задача 4: ЗАКРЕПЛЕНИЕ — spread при вызове (10 минут)
// ------------------------------------------------------------
// У тебя есть функция sum (напиши её сам — принимает rest number[]).
// Затем:
//   1. Вызови с отдельными числами: sum(1, 2, 3, 4, 5)
//   2. Создай массив const scores = [10, 20, 30, 40]
//   3. Вызови sum передав массив через spread: sum(...scores)
//   4. Выведи оба результата
//
// Цель: почувствовать разницу между rest (в объявлении)
//       и spread (при вызове)

// Твой код здесь:
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0)
}
const scores = [10, 20, 30, 40]

console.log(sum(1, 2, 3, 4, 5));
console.log(sum(...scores));
export { };
