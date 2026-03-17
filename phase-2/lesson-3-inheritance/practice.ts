// Урок 3 — Наслідування: extends та implements
// ================================================

// --- МІНІ-ЗАДАЧА (повторення Уроку 2) ---
// Постав правильні модифікатори та перепиши конструктор у shorthand стилі
// - name: доступне ззовні
// - age: тільки всередині класу
// - id: доступне в цьому класі та підкласах

// class User {
//   constructor(public name: string, private age: number, protected id: string) { }
// }


// --- ЗАДАЧА 1: Розминка ---
// Є базовий клас Vehicle.
// Створи клас Car який:
// - наслідує Vehicle
// - додає поле doors: number
// - перевизначає describe() — додає кількість дверей до тексту

class Vehicle {
  constructor(public brand: string, public speed: number) { }

  describe(): string {
    return `${this.brand} їде зі швидкістю ${this.speed} км/год`;
  }
}

// твій код тут
class Car extends Vehicle {
  constructor(brand: string, speed: number, public doors: number) {
    super(brand, speed)
  }
  describe(): string {
    return `${this.brand} їде зі швидкістю ${this.speed} км/год та має ${this.doors} дверей`;
  }
}
const bmw = new Car('bmw', 220, 2)
console.log(bmw.describe());

// --- ЗАДАЧА 2: Основна ---
// Створи ієрархію:
// Базовий клас Employee: name, salary, методи getSalary() та describe()
// Клас Manager extends Employee:
//   - додаткове поле: department: string
//   - перевизначає describe() — додає відділ
//   - новий метод: giveRaise(amount: number) — збільшує salary
// Клас Developer extends Employee:
//   - додаткове поле: language: string (мова програмування)
//   - перевизначає describe() — додає мову

// твій код тут
class Employee {
  constructor(protected name: string, protected salary: number) { }
  getSalary(): number {
    return this.salary
  }
  describe(): string {
    return `${this.name} отримує ${this.salary}$`
  }
}

class Manager extends Employee {
  constructor(name: string, salary: number, private department: string) {
    super(name, salary)
  }
  giveRaise(amount: number): void {
    this.salary += amount
  }
  describe(): string {
    return `${this.name} з відділу ${this.department} отримує ${this.salary}$`
  }
}

class Developer extends Employee {
  constructor(name: string, salary: number, private department: string, private language: string) {
    super(name, salary)
  }
  describe(): string {
    return `${this.name} з відділу ${this.department}, мова программування ${this.language}, отримує ${this.salary}$`
  }
}
const newManager = new Manager('Community Manager', 2000, 'PR')
const newDeveloper = new Developer('FrontEnd junior', 1500, 'IT', 'Java Script + React')

console.log(newManager.describe());
console.log(newDeveloper.describe());


// --- ЗАДАЧА 3: Челлендж ---
// Опиши інтерфейси та реалізуй класи:
//
// interface Printable { print(): void }
// interface Saveable { save(): string }
//
// Клас Document implements Printable, Saveable:
//   - поля: title: string, content: string
//   - print(): виводить title та content
//   - save(): повертає JSON рядок з title та content

// твій код тут
interface Printable {
  print(): void
}
interface Savable {
  save(): string
}

class NewDocument implements Printable, Savable {
  constructor(private title: string, private content: string) { }
  print(): void {
    console.log(this.title);
    console.log(this.content);
  }
  save(): string {
    return JSON.stringify({ title: this.title, content: this.content })
  }
}


const doc = new NewDocument('Resume', 'Atatat atatatat atatata')
doc.print()
console.log(doc.save());
export { }