# Урок 6: Type Guards (Защитники типов)

**Статус:** В процессе
**Дата:** 27 февраля 2026

---

## 📌 Тема урока

Type Guards — способы сказать TypeScript: "в этом блоке кода переменная точно имеет ВОТ ЭТОТ тип".

---

## 🎯 Цель урока

После урока ты сможешь:
- Использовать `typeof` для проверки примитивных типов
- Использовать `instanceof` для проверки классов/объектов
- Писать собственные type guard функции с `is`
- Объяснить зачем нужны type guards и когда их применять

---

## 🤔 Проблема в JavaScript

```js
// JS: функция принимает строку или число
function double(value) {
  return value * 2; // Если value — строка, получим "hellohello" вместо ошибки!
}

double("hello"); // "hellohello" — тихая ошибка, JS не жалуется
double(5);       // 10 — ок
```

В JS ты узнаёшь о проблеме только в runtime, когда баг уже в продакшне.

В TS с union типом:
```ts
function double(value: string | number) {
  return value * 2; // ❌ Ошибка! TS не знает — строка это или число
}
```

TypeScript видит `string | number` и не разрешает операцию `* 2`, потому что она не работает для строк. Нужно **сначала проверить тип**, и тогда TS поймёт что делать.

---

## 📖 Теория

### Что такое Type Guard?

**Type Guard** — это проверка типа в runtime, после которой TypeScript **сужает** (narrows) тип переменной внутри блока кода.

Ключевое слово: **сужение (narrowing)**. Из широкого типа (`string | number`) TypeScript понимает что внутри `if`-блока тип конкретный (`string` или `number`).

```ts
function double(value: string | number) {
  if (typeof value === "string") {
    // Здесь TypeScript ЗНАЕТ: value — это string
    return value.repeat(2); // ✅ ok
  }
  // Здесь TypeScript ЗНАЕТ: value — это number
  return value * 2; // ✅ ok
}
```

---

### Type Guard #1: `typeof`

Используется для **примитивных типов**: `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `function`.

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
    console.log(value ? "да" : "нет");
  }
}
```

**Важно:** `typeof null === "object"` — это историческая ошибка JS. Для проверки на `null` используй `=== null`.

---

### Type Guard #2: `instanceof`

Используется для **классов и объектов**: когда хочешь проверить "это экземпляр класса X?".

```ts
class Cat {
  meow() { return "Мяу!"; }
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

### Type Guard #3: "in" оператор

Проверяет наличие свойства в объекте. Полезен когда нет классов, просто объекты с разными полями.

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

### Type Guard #4: Пользовательские type guards (функции с `is`)

Иногда проверка сложная — тогда выносим её в отдельную функцию.

Синтаксис возвращаемого типа: `параметр is Тип`

```ts
type Cat = { name: string; meow: () => void };
type Dog = { name: string; bark: () => void };

// Функция-guard: возвращает boolean, но TypeScript знает больше
function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function interact(animal: Cat | Dog) {
  if (isCat(animal)) {
    // animal: Cat — TypeScript знает это благодаря `animal is Cat`
    animal.meow();
  } else {
    // animal: Dog
    animal.bark();
  }
}
```

**Зачем `is` вместо просто `boolean`?**

Если написать просто `: boolean` — TypeScript не сужает тип внутри `if`. Магия именно в `animal is Cat` — это сигнал компилятору.

---

## 🔍 JS vs TS сравнение

```js
// JavaScript — проверяем тип вручную, нет гарантий
function processJS(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
  // Что если value — массив? JS молчит, получаем NaN
}
```

```ts
// TypeScript — проверяем тип, и TS следит за полнотой
function processTS(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TS знает: string
  }
  return value * 2; // TS знает: number (string уже отсеян выше)
}
// Если добавить третий тип в union — TS скажет что случай не обработан
```

---

## 💡 Реальный пример

```ts
type ApiResponse =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    // response: { status: "success"; data: string[] }
    console.log("Данные:", response.data.join(", "));
  } else {
    // response: { status: "error"; message: string }
    console.log("Ошибка:", response.message);
  }
}
```

Это называется **discriminated union** — объединение с полем-дискриминатором (`status`). Очень частый паттерн в реальных проектах.

---

## ✍️ Практика

Смотри файл `practice.ts`

---

## 📝 Дополнительные заметки

*(появятся по ходу урока)*

---

**Обновлено:** 27 февраля 2026
