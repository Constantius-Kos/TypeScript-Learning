export { };

// ============================================================
// Урок 2: Модифікатори доступу — Практика
// ============================================================

// Задача 1: Розминка
// Створи клас Person з властивостями:
//   - public name: string
//   - private age: number
//
// Додай метод getAge(): number який повертає вік.
// Спробуй звернутись до age напряму — переконайся що TS дає помилку.
// Створи екземпляр і виведи ім'я та вік через метод.

// Напиши тут:
class Person {
    constructor(public name: string, private age: number) { }

    getAge(): number {
        return this.age
    }
}

const user = new Person('Микола', 25)

console.log(user.name);
console.log(user.getAge());


// ============================================================

// Задача 2: Основна
// Створи клас BankAccount з захищеним балансом.
// Властивості:
//   - public owner: string
//   - private balance: number (початкове значення 0)
//
// Методи:
//   - deposit(amount: number): void — поповнити (тільки якщо amount > 0)
//   - withdraw(amount: number): boolean — зняти (якщо вистачає і amount > 0)
//   - getBalance(): number — повернути поточний баланс
//
// Створи екземпляр, поповни, зніми, виведи баланс.
// Переконайся що напряму змінити balance неможливо.

// Напиши тут:
class BankAccount {
    constructor(public owner: string, private balans: number) { }

    deposit(amount: number): void {
        amount > 0 ? this.balans += amount : console.log('Сума повинна бути більшою за 0');
    }
    withdraw(amount: number): boolean {
        if (amount <= this.balans && this.balans > 0) {
            this.balans -= amount

            return true
        }
        return false
    }

    getBalance(): number {
        return this.balans
    }
}

const myBalance = new BankAccount('Kostiantyn', 0)
myBalance.deposit(1000)
myBalance.withdraw(112)
console.log(myBalance.getBalance());

// ============================================================

// Задача 3: Челендж (опціонально)
// Створи клас Employee (працівник) та Manager (менеджер).
//
// Employee:
//   - public name: string
//   - protected salary: number
//   - getSalary(): number
//
// Manager extends Employee:
//   - public department: string
//   - getInfo(): string — повертає:
//     "Менеджер Алекс | Відділ: IT | Зарплата: 5000"
//     (Manager має доступ до salary через protected)
//
// Створи екземпляр Manager і виведи getInfo().

// Напиши тут:
class Employee {
    constructor(public name: string, protected salary: number) { }
    getSalary(): number {
        return this.salary
    }
}
class Manager extends Employee {
    constructor(name: string, salary: number, public departament: string) {
        super(name, salary)
    }

    getInfo(): string {
        return `Manager ${this.name} | Departament: ${this.departament} | Salary: ${this.salary}`
    }
}

const newManager = new Manager('Alex', 5000, 'IT')
console.log(newManager.getInfo());