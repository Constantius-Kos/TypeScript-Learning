// ============================================================
// Урок 3: Rest parameters з типами
// ============================================================
// Запуск: npx ts-node practice.ts
// ============================================================

// ------------------------------------------------------------
// Завдання 1: РОЗМИНКА — базовий rest (5-7 хвилин)
// ------------------------------------------------------------
// Напиши функцію joinWords, яка приймає будь-яку кількість
// рядків і повертає їх об'єднаними через пробіл.
//
// Приклади викликів:
//   joinWords("Hello", "world")        → "Hello world"
//   joinWords("TypeScript", "is", "cool") → "TypeScript is cool"
//   joinWords("one")                   → "one"

// Твій код тут:
function joinWords(...strings: string[]): string {
    return strings.join(' ')
}
joinWords("Hello", "world")
joinWords("TypeScript", "is", "cool")
joinWords("one")
// ------------------------------------------------------------
// Завдання 2: ОСНОВНЕ — rest + звичайні параметри (10-15 хвилин)
// ------------------------------------------------------------
// Напиши функцію createTag, яка створює HTML-тег.
// Параметри:
//   - tag: string (назва тегу, обов'язковий)
//   - cssClass: string (CSS клас, за замовчуванням "default")
//   - ...content: string[] (вміст тегу, будь-яка кількість рядків)
//
// Результат — рядок виду:
//   <div class="default">Hello World</div>
//   <p class="title">TypeScript is great</p>
//
// Підказка: content.join(" ") об'єднає всі рядки через пробіл
//
// Викличи 3 рази:
//   1. Тільки tag і один рядок контенту (без cssClass)
//   2. З cssClass і двома рядками контенту
//   3. З cssClass і трьома рядками контенту


// Твій код тут:
function createTag(tag: string, cssClass: string = 'default', ...content: string[]): string {
    return `<${tag} class="${cssClass}">${content.join(' ')}</${tag}>`
}
console.log(createTag("div", "default", "Hello World"));
console.log(createTag("p", "title", "TypeScript", "is great"));
console.log(createTag("section", "main", "Один", "два", "три"));
// ------------------------------------------------------------
// Завдання 3: ЧЕЛЕНДЖ — статистика (15-20 хвилин)
// ------------------------------------------------------------
// Напиши функцію getStats, яка приймає будь-яку кількість чисел
// і повертає об'єкт зі статистикою.
//
// Тип, що повертається (оголоси сам):
//   {
//     count: number    — кількість чисел
//     sum: number      — сума
//     min: number      — мінімальне
//     max: number      — максимальне
//     average: number  — середнє (sum / count)
//   }
//
// Підказки:
//   - Math.min(...numbers) — мінімум
//   - Math.max(...numbers) — максимум
//   - Використовуй reduce для суми
//
// Викличи 2 рази:
//   1. getStats(3, 7, 2, 9, 1)
//   2. getStats(100, 200, 150)

// Оголоси тип результату:


// Твоя функція:
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
// Завдання 4: ЗАКРІПЛЕННЯ — spread при виклику (10 хвилин)
// ------------------------------------------------------------
// У тебе є функція sum (напиши її сам — приймає rest number[]).
// Потім:
//   1. Викличи з окремими числами: sum(1, 2, 3, 4, 5)
//   2. Створи масив const scores = [10, 20, 30, 40]
//   3. Викличи sum передавши масив через spread: sum(...scores)
//   4. Виведи обидва результати
//
// Ціль: відчути різницю між rest (в оголошенні)
//       і spread (при виклику)

// Твій код тут:
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0)
}
const scores = [10, 20, 30, 40]

console.log(sum(1, 2, 3, 4, 5));
console.log(sum(...scores));
export { };
