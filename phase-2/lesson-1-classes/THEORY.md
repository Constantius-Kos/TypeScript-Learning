# Урок 1: Классы в TypeScript

**Фаза:** 2 | **Часть:** Классы и ООП | **Статус:** В процессе

---

## 🎯 Цель урока

После урока ты сможешь:
- Создавать классы с типизированными свойствами
- Типизировать конструктор и методы
- Понимать зачем классы нужны в реальных проектах

---

## 🤔 Проблема в JavaScript

В JS класс выглядит так:

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Привет, " + this.name;
  }
}

const user = new User("Алекс", 25);
user.name = 123;        // TS бы запретил — но JS молчит
user.greet(42);         // лишний аргумент — JS молчит
```

**Проблемы:**
- Никто не знает какие свойства есть у класса пока не прочитает весь код
- Можно передать неверные типы — JS не предупредит
- IDE не подсказывает автодополнение

---

## 📖 Теория

### Класс в TypeScript

TypeScript требует **объявить свойства** класса ДО конструктора:

```ts
class User {
  name: string;       // ← объявляем свойство с типом
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return "Привет, " + this.name;
  }
}
```

Теперь TS знает:
- какие свойства есть у `User`
- какого они типа
- что принимает и возвращает каждый метод

---

### Shorthand через constructor

Можно сократить запись — объявить и присвоить свойства прямо в конструкторе:

```ts
class User {
  constructor(
    public name: string,    // ← автоматически создаёт this.name = name
    public age: number      // ← автоматически создаёт this.age = age
  ) {}
}
```

Это полностью эквивалентно длинной записи выше. Модификатор `public` говорит TS: "создай свойство и присвой значение".

---

### Readonly свойства в классе

```ts
class User {
  constructor(
    public readonly id: number,   // нельзя изменить после создания
    public name: string
  ) {}
}

const user = new User(1, "Алекс");
user.id = 2;    // ❌ Ошибка — id readonly
user.name = "Боб"; // ✅ OK
```

---

### Методы класса

Методы типизируются как обычные функции:

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
// JavaScript — нет информации о типах
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
```

```ts
// TypeScript — всё явно и безопасно
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
p.price = "дорого";  // ❌ TS поймает сразу
```

---

## ✍️ Практика

Смотри файл `practice.ts`

---

## 📝 Дополнительные заметки

*(появятся по мере вопросов)*

---

*Создано: 5 марта 2026*
*Обновлено: 5 марта 2026*
