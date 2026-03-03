# Урок 6: Type Guards (Захисники типів)

**Статус:** В процесі
**Дата:** 27 лютого 2026

---

## 📌 Тема уроку

Type Guards — способи сказати TypeScript: "в цьому блоці коду змінна точно має ОСЬ ЦЕЙ тип".

---

## 🎯 Ціль уроку

Після уроку ти зможеш:
- Використовувати `typeof` для перевірки примітивних типів
- Використовувати `instanceof` для перевірки класів/об'єктів
- Писати власні type guard функції з `is`
- Пояснити навіщо потрібні type guards і коли їх застосовувати

---

## 🤔 Проблема в JavaScript

```js
// JS: функція приймає рядок або число
function double(value) {
  return value * 2; // Якщо value — рядок, отримаємо "hellohello" замість помилки!
}

double("hello"); // "hellohello" — тиха помилка, JS не скаржиться
double(5);       // 10 — ок
```

В JS ти дізнаєшся про проблему тільки в runtime, коли баг вже в продакшні.

В TS з union типом:
```ts
function double(value: string | number) {
  return value * 2; // ❌ Помилка! TS не знає — рядок це чи число
}
```

TypeScript бачить `string | number` і не дозволяє операцію `* 2`, тому що вона не працює для рядків. Потрібно **спочатку перевірити тип**, і тоді TS зрозуміє що робити.

---

## 📖 Теорія

### Що таке Type Guard?

**Type Guard** — це перевірка типу в runtime, після якої TypeScript **звужує** (narrows) тип змінної всередині блоку коду.

Ключове слово: **звуження (narrowing)**. З широкого типу (`string | number`) TypeScript розуміє що всередині `if`-блоку тип конкретний (`string` або `number`).

```ts
function double(value: string | number) {
  if (typeof value === "string") {
    // Тут TypeScript ЗНАЄ: value — це string
    return value.repeat(2); // ✅ ok
  }
  // Тут TypeScript ЗНАЄ: value — це number
  return value * 2; // ✅ ok
}
```

---

### Type Guard #1: `typeof`

Використовується для **примітивних типів**: `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `function`.

```ts
function process(value: string | number | boolean) {
  if (typeof value === "string") {
    // value: string
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    // value: number
    console.log(value.toFixed(2));
  } else {
    // value: boolean
    console.log(value ? "так" : "ні");
  }
}
```

**Важливо:** `typeof null === "object"` — це історична помилка JS. Для перевірки на `null` використовуй `=== null`.

---

### Type Guard #2: `instanceof`

Використовується для **класів і об'єктів**: коли хочеш перевірити "це екземпляр класу X?".

```ts
class Cat {
  meow() { return "Няв!"; }
}

class Dog {
  bark() { return "Гав!"; }
}

function makeSound(animal: Cat | Dog) {
  if (animal instanceof Cat) {
    // animal: Cat
    console.log(animal.meow());
  } else {
    // animal: Dog
    console.log(animal.bark());
  }
}
```

---

### Type Guard #3: оператор "in"

Перевіряє наявність властивості в об'єкті. Корисний коли немає класів, просто об'єкти з різними полями.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // animal: Fish
    animal.swim();
  } else {
    // animal: Bird
    animal.fly();
  }
}
```

---

### Type Guard #4: Користувацькі type guards (функції з `is`)

Іноді перевірка складна — тоді виносимо її в окрему функцію.

Синтаксис типу, що повертається: `параметр is Тип`

```ts
type Cat = { name: string; meow: () => void };
type Dog = { name: string; bark: () => void };

// Функція-guard: повертає boolean, але TypeScript знає більше
function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function interact(animal: Cat | Dog) {
  if (isCat(animal)) {
    // animal: Cat — TypeScript знає це завдяки `animal is Cat`
    animal.meow();
  } else {
    // animal: Dog
    animal.bark();
  }
}
```

**Навіщо `is` замість просто `boolean`?**

Якщо написати просто `: boolean` — TypeScript не звужує тип всередині `if`. Магія саме в `animal is Cat` — це сигнал компілятору.

---

## 🔍 JS vs TS порівняння

```js
// JavaScript — перевіряємо тип вручну, немає гарантій
function processJS(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
  // Що якщо value — масив? JS мовчить, отримуємо NaN
}
```

```ts
// TypeScript — перевіряємо тип, і TS стежить за повнотою
function processTS(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TS знає: string
  }
  return value * 2; // TS знає: number (string вже відсіяний вище)
}
// Якщо додати третій тип в union — TS скаже що випадок не оброблений
```

---

## 💡 Реальний приклад

```ts
type ApiResponse =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    // response: { status: "success"; data: string[] }
    console.log("Дані:", response.data.join(", "));
  } else {
    // response: { status: "error"; message: string }
    console.log("Помилка:", response.message);
  }
}
```

Це називається **discriminated union** — об'єднання з полем-дискримінатором (`status`). Дуже частий патерн в реальних проектах.

---

## ✍️ Практика

Дивись файл `practice.ts`

---

## 📝 Додаткові нотатки

*(з'являться в ході уроку)*

---

**Оновлено:** 27 лютого 2026
