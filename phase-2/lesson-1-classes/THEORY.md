# Урок 1: Класи в TypeScript

**Фаза:** 2 | **Частина:** Класи та ООП | **Статус:** В процесі

---

## 🎯 Ціль уроку

Після уроку ти зможеш:
- Створювати класи з типізованими властивостями
- Типізувати конструктор та методи
- Розуміти навіщо класи потрібні в реальних проектах

---

## 🤔 Проблема в JavaScript

В JS клас виглядає так:

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Привіт, " + this.name;
  }
}

const user = new User("Алекс", 25);
user.name = 123;        // TS би заборонив — але JS мовчить
user.greet(42);         // зайвий аргумент — JS мовчить
```

**Проблеми:**
- Ніхто не знає які властивості є у класу поки не прочитає весь код
- Можна передати невірні типи — JS не попередить
- IDE не підказує автодоповнення

---

## 📖 Теорія

### Клас в TypeScript

TypeScript вимагає **оголосити властивості** класу ДО конструктора:

```ts
class User {
  name: string;       // ← оголошуємо властивість з типом
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return "Привіт, " + this.name;
  }
}
```

Тепер TS знає:
- які властивості є у `User`
- якого вони типу
- що приймає і повертає кожен метод

---

### Shorthand через constructor

Можна скоротити запис — оголосити та присвоїти властивості прямо в конструкторі:

```ts
class User {
  constructor(
    public name: string,    // ← автоматично створює this.name = name
    public age: number      // ← автоматично створює this.age = age
  ) {}
}
```

Це повністю еквівалентно довгому запису вище. Модифікатор `public` каже TS: "створи властивість і присвой значення".

---

### Readonly властивості в класі

```ts
class User {
  constructor(
    public readonly id: number,   // не можна змінити після створення
    public name: string
  ) {}
}

const user = new User(1, "Алекс");
user.id = 2;    // ❌ Помилка — id readonly
user.name = "Боб"; // ✅ OK
```

---

### Методи класу

Методи типізуються як звичайні функції:

```ts
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  describe(): void {
    console.log("Я калькулятор");
  }
}
```

---

## 🔍 JS vs TS

```js
// JavaScript — немає інформації про типи
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
```

```ts
// TypeScript — все явно та безпечно
class Product {
  constructor(
    public name: string,
    public price: number
  ) {}

  getInfo(): string {
    return `${this.name} — ${this.price}₽`;
  }
}

const p = new Product("Молоко", 80);
p.price = "дорого";  // ❌ TS впіймає одразу
```

---

## ✍️ Практика

Дивись файл `practice.ts`

---

## 📝 Додаткові нотатки

*(з'являться по мірі питань)*

---

*Створено: 5 березня 2026*
*Оновлено: 5 березня 2026*
