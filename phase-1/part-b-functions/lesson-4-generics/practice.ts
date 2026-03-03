// ============================================================
// Урок 4: Дженерики (Generics)
// ============================================================
// Запуск: npm run lesson phase-1/part-b-functions/lesson-4-generics/practice.ts
// ============================================================

// ------------------------------------------------------------
// Завдання 1: РОЗМИНКА — перший дженерик (5-7 хвилин)
// ------------------------------------------------------------
// Напиши дженерик-функцію getFirst, яка приймає масив
// будь-якого типу і повертає його перший елемент.
//
// Викличи 3 рази:
//   1. getFirst([10, 20, 30])           → 10
//   2. getFirst(["apple", "banana"])    → "apple"
//   3. getFirst([true, false, true])    → true

// Твій код тут:
function getFirst<T>(arr: T[]): T {
    return arr[0]
}
console.log(getFirst([10, 20, 30]));
console.log(getFirst(["apple", "banana"]));
console.log(getFirst([true, false, true]));
// ------------------------------------------------------------
// Завдання 2: ОСНОВНЕ — wrap і unwrap (10-15 хвилин)
// ------------------------------------------------------------
// Напиши дві дженерик-функції:
//
// 1. wrapInArray<T> — приймає значення типу T, повертає T[]
//    wrapInArray(42)       → [42]
//    wrapInArray("hello")  → ["hello"]
//
// 2. getElement<T> — приймає масив T[] і індекс number,
//    повертає елемент типу T
//    getElement([10, 20, 30], 1)       → 20
//    getElement(["a", "b", "c"], 2)   → "c"
//
// Викличи кожну по 2 рази з різними типами.

// Твій код тут:
function wrapInArray<T>(arg: T): T[] {
    return [arg]
}

function getElement<T>(arr: T[], index: number): T {
    return arr[index]
}


console.log(wrapInArray(42));
console.log(wrapInArray("hello"));
console.log(getElement([10, 20, 30], 1));
console.log(getElement(["a", "b", "c"], 2));
// ------------------------------------------------------------
// Завдання 3: ЧЕЛЕНДЖ — дві тип-змінні (15-20 хвилин)
// ------------------------------------------------------------
// Напиши дженерик-функцію createRecord<K, V>, яка приймає
// ключ типу K і значення типу V, і повертає об'єкт { key: K, value: V }.
//
// Приклади:
//   createRecord("name", "Vasya")  → { key: "name", value: "Vasya" }
//   createRecord("age", 25)        → { key: "age", value: 25 }
//   createRecord(1, true)          → { key: 1, value: true }
//
// Спочатку оголоси тип значення, що повертається через дженерик:
//   type Record<K, V> = { key: K, value: V }  ← підказка
//
// Увага: Record — зарезервоване ім'я в TS!
// Назви свій тип, наприклад, KeyValuePair<K, V>
//
// Викличи 3 рази з різними комбінаціями типів.

// Твій код тут:
type TestDjType<A, B> = {
    key: A,
    value: B

}
function createRecord<C, D>(key: C, value: D): TestDjType<C, D> {
    return { key, value }
}
console.log(createRecord("name", "Vasya"));
console.log(createRecord("age", 25));
console.log(createRecord(1, true));

// ------------------------------------------------------------
// Завдання 4: ЗАКРІПЛЕННЯ — repeat (10 хвилин)
// ------------------------------------------------------------
// Напиши дженерик-функцію repeat<T>, яка приймає:
//   - value: T (значення будь-якого типу)
//   - times: number (скільки разів повторити)
// і повертає T[] (масив з цих значень).
//
// Підказка: Array(times).fill(value) створює масив
//
// Приклади:
//   repeat("ha", 3)   → ["ha", "ha", "ha"]
//   repeat(0, 4)      → [0, 0, 0, 0]
//   repeat(true, 2)   → [true, true]
//
// Викличи 3 рази.

// Твій код тут:
function repeat<T>(value: T, times: number): T[] {
    return Array(times).fill(value)
}
console.log(repeat("ha", 3));
console.log(repeat(0, 4));
console.log(repeat(true, 2));
export { };
