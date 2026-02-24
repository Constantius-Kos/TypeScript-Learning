// ============================================================
// Урок 4: Дженерики (Generics)
// ============================================================
// Запуск: npm run lesson phase-1/part-b-functions/lesson-4-generics/practice.ts
// ============================================================

// ------------------------------------------------------------
// Задача 1: РАЗМИНКА — первый дженерик (5-7 минут)
// ------------------------------------------------------------
// Напиши дженерик-функцию getFirst, которая принимает массив
// любого типа и возвращает его первый элемент.
//
// Вызови 3 раза:
//   1. getFirst([10, 20, 30])           → 10
//   2. getFirst(["apple", "banana"])    → "apple"
//   3. getFirst([true, false, true])    → true

// Твой код здесь:
function getFirst<T>(arr: T[]): T {
    return arr[0]
}
console.log(getFirst([10, 20, 30]));
console.log(getFirst(["apple", "banana"]));
console.log(getFirst([true, false, true]));
// ------------------------------------------------------------
// Задача 2: ОСНОВНАЯ — wrap и unwrap (10-15 минут)
// ------------------------------------------------------------
// Напиши две дженерик-функции:
//
// 1. wrapInArray<T> — принимает значение типа T, возвращает T[]
//    wrapInArray(42)       → [42]
//    wrapInArray("hello")  → ["hello"]
//
// 2. getElement<T> — принимает массив T[] и индекс number,
//    возвращает элемент типа T
//    getElement([10, 20, 30], 1)       → 20
//    getElement(["a", "b", "c"], 2)   → "c"
//
// Вызови каждую по 2 раза с разными типами.

// Твой код здесь:
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
// Задача 3: ЧЕЛЛЕНДЖ — две тип-переменных (15-20 минут)
// ------------------------------------------------------------
// Напиши дженерик-функцию createRecord<K, V>, которая принимает
// ключ типа K и значение типа V, и возвращает объект { key: K, value: V }.
//
// Примеры:
//   createRecord("name", "Vasya")  → { key: "name", value: "Vasya" }
//   createRecord("age", 25)        → { key: "age", value: 25 }
//   createRecord(1, true)          → { key: 1, value: true }
//
// Сначала объяви тип возвращаемого значения через дженерик:
//   type Record<K, V> = { key: K, value: V }  ← подсказка
//
// Внимание: Record — зарезервированное имя в TS!
// Назови свой тип, например, KeyValuePair<K, V>
//
// Вызови 3 раза с разными комбинациями типов.

// Твой код здесь:
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
// Задача 4: ЗАКРЕПЛЕНИЕ — repeat (10 минут)
// ------------------------------------------------------------
// Напиши дженерик-функцию repeat<T>, которая принимает:
//   - value: T (значение любого типа)
//   - times: number (сколько раз повторить)
// и возвращает T[] (массив из этих значений).
//
// Подсказка: Array(times).fill(value) создаёт массив
//
// Примеры:
//   repeat("ha", 3)   → ["ha", "ha", "ha"]
//   repeat(0, 4)      → [0, 0, 0, 0]
//   repeat(true, 2)   → [true, true]
//
// Вызови 3 раза.

// Твой код здесь:
function repeat<T>(value: T, times: number): T[] {
    return Array(times).fill(value)
}
console.log(repeat("ha", 3));
console.log(repeat(0, 4));
console.log(repeat(true, 2));
export { };
