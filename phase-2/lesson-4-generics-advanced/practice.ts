// ============================================================
// Урок 4: Generics просунуті — Практика
// ============================================================

// Задача 1: Розминка
// Напиши функцію getFirstElement<T> яка:
// - приймає масив будь-якого типу
// - повертає перший елемент
// - якщо масив порожній — повертає undefined

// Напиши тут:
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0]
}

console.log(getFirstElement([1, 2, 3]));
console.log(getFirstElement([]));

// ============================================================

// Задача 2: Основна
// Напиши generic функцію filterItems<T> яка:
// - приймає масив T[] та функцію-предикат (T) => boolean
// - повертає новий масив тільки з елементами які пройшли фільтр
//
// Використай generic constraint: T extends object
//
// Приклад використання:
// const users = [{ name: 'Аня', age: 17 }, { name: 'Боб', age: 25 }]
// filterItems(users, u => u.age >= 18) // [{ name: 'Боб', age: 25 }]

// Напиши тут:
// function filterItems<T extends object>(arr: T[], fn: (i: T) => boolean): T[] {
//     return arr.filter((o) => fn(o))
// }
// ============================================================

// Задача 3: Челендж (опціонально)
// Створи generic клас Stack<T> (стек — структура даних "останній прийшов — перший вийшов"):
// - метод push(item: T): void — додає елемент
// - метод pop(): T | undefined — прибирає та повертає останній елемент
// - метод peek(): T | undefined — повертає останній елемент БЕЗ видалення
// - метод isEmpty(): boolean — чи порожній стек
//
// Створи Stack<number> і Stack<string>, протестуй обидва.

// Напиши тут:



class Stack<T> {
    constructor(private arr: T[] = []) { }
    push(i: T): void {
        this.arr.push(i)
    }
    pop(): T | undefined {
        return this.arr.pop()
    }
    peek(): T | undefined {
        return this.arr[this.arr.length - 1]
    }
    isEmpty(): boolean {
        return this.arr.length === 0
    }
}

const NumbersStack = new Stack<number>([1, 2, 3, 4])
const StringsStack = new Stack<string>(['123', '321', '333'])
NumbersStack.push(5)
StringsStack.push('asd')
console.log('3:', NumbersStack);
console.log('3:', NumbersStack.pop());
console.log('3:', NumbersStack);

console.log('3:', NumbersStack.peek());

console.log('3:', NumbersStack.isEmpty());
console.log('3:', StringsStack);
console.log('3:', StringsStack.pop());
console.log('3:', StringsStack);

console.log('3:', StringsStack.peek());

console.log('3:', StringsStack.isEmpty());

export { }
