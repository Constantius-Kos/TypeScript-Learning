export { };

// ============================================================
// Урок 1: Класи в TypeScript — Практика
// ============================================================

// Задача 1: Розминка
// Створи клас Animal з двома властивостями: name (string) і sound (string).
// Додай метод speak() який повертає рядок:
// "Кіт каже: Мяу"
// Використай shorthand через constructor.
// Створи екземпляр і викличи speak().

// Напиши тут:
class Animal {
    constructor(public name: string, public sound: string) { }
    speak(): void {
        console.log(`${this.name} каже: ${this.sound}`);
    }
}

const cat = new Animal('Кіт', 'Мяу')

cat.speak()

// ============================================================

// Задача 2: Основна
// Створи клас BankAccount (банківський рахунок).
// Властивості:
//   - owner: string (власник)
//   - readonly accountNumber: string (номер рахунку, не змінюється)
//   - balance: number (баланс, початкове значення 0)
//
// Методи:
//   - deposit(amount: number): void — поповнити рахунок
//   - withdraw(amount: number): boolean — зняти гроші.
//     Якщо грошей вистачає — знімає і повертає true.
//     Якщо не вистачає — нічого не робить і повертає false.
//   - getInfo(): string — повертає рядок виду:
//     "Рахунок #ABC123 | Власник: Алекс | Баланс: 1000₴"
//
// Створи екземпляр, поповни рахунок, зніми гроші, виведи getInfo().

// Напиши тут:
class BankAccount {
    constructor(public owner: string, public readonly accountNumber: string, public balance: number) { }
    deposit(amount: number): void {
        this.balance += amount
    }

    withdraw(amount: number): boolean {
        if (this.balance >= amount) {
            this.balance -= amount
            return true
        }
        return false
    }

    getInfo(): string {
        return `Рахунок: ${this.accountNumber} | Власник: ${this.owner} | Баланс: ${this.balance} `
    }
}

const newAcc = new BankAccount("Костянтин", '123jk1j1lk41k', 0)
newAcc.deposit(1000)
newAcc.withdraw(888)
const result = newAcc.getInfo()
console.log(result);
// ============================================================

// Задача 3: Челендж (опціонально)
// Створи клас TodoList для керування задачами.
// Кожна задача: { id: number, text: string, done: boolean }
// Методи:
//   - addTask(text: string): void
//   - completeTask(id: number): void
//   - getTasks(): масив всіх задач
//   - getPending(): масив незавершених задач
//
// Підказка: id генеруй автоматично через private лічильник.

// Напиши тут:
type Task = { id: number, text: string, done: boolean }
class TodoList {
    private nextId = 1
    private tasks: Task[] = []

    addTask(text: string): void {
        const id = this.nextId
        this.nextId++
        this.tasks.push({ id, text, done: false })
    }
    completeTask(id: number): void {
        this.tasks = this.tasks.map((t) => t.id === id ? { ...t, done: true } : t)
    }

    getTasks(): Task[] {
        return this.tasks
    }
    getPending(): Task[] {
        return this.tasks.filter((t) => t.done === false)
    }
} 