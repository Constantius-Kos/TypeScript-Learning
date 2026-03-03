# Урок 4: Дженерики (Generics)

**Статус:** В процесі
**Оновлено:** 24 лютого 2026

---

## 🤔 Проблема в JavaScript

Уяви: тобі потрібна функція, яка повертає перший елемент масиву.

```javascript
// JS — пишемо одну функцію
function first(arr) {
    return arr[0];
}

const num = first([1, 2, 3]);     // num = 1, але JS не знає який тип
const str = first(["a", "b"]);   // str = "a"
```

Звучить нормально. Але в реальному проекті ти хочеш використовувати результат:

```javascript
const name = first(["Alice", "Bob"]);
console.log(name.toUpperCase()); // Працює в runtime... але тільки тому що пощастило
```

Проблема: JS не знає що `name` це рядок. Ти втрачаєш всі підказки редактора — автодоповнення, перевірку методів. Один рефакторинг і замість масиву рядків туди випадково прийде масив об'єктів — отримаєш помилку в runtime.

---

## 💡 Спроба вирішити це в TypeScript без дженериків

Перша ідея — додати перегрузки або union:

```typescript
// Варіант 1: окрема функція для кожного типу
function firstNumber(arr: number[]): number { return arr[0]; }
function firstString(arr: string[]): string { return arr[0]; }
function firstBoolean(arr: boolean[]): boolean { return arr[0]; }
// Для кожного нового типу — нова функція. Це погано.

// Варіант 2: any
function first(arr: any[]): any {
    return arr[0];
}
const name = first(["Alice", "Bob"]);
name.toUpperCase(); // TS не перевіряє — any вимикає типізацію
```

`any` — це "здатися". Ти втрачаєш всі переваги TypeScript.

**Нам потрібно:** одна функція, яка працює з будь-яким типом — і при цьому TS знає що саме вона поверне.

---

## 🎯 Рішення: дженерики

Дженерик — це **змінна для типу**. Так само як звичайний параметр зберігає значення, дженерик зберігає тип.

```typescript
function first<T>(arr: T[]): T {
    return arr[0];
}
```

- `<T>` — оголошуємо "тип-змінну" (placeholder)
- `arr: T[]` — масив елементів типу T
- `: T` — повертаємо елемент того ж типу T

При виклику TypeScript сам визначає що таке T:

```typescript
const num = first([1, 2, 3]);       // T = number → поверне number
const str = first(["a", "b", "c"]); // T = string → поверне string
const flag = first([true, false]);   // T = boolean → поверне boolean

str.toUpperCase(); // ✅ TS знає що str це string → дає автодоповнення
num.toFixed(2);    // ✅ TS знає що num це number → всі методи number доступні
```

Одна функція — повна типобезпека для будь-якого типу.

---

## 📖 Синтаксис

```typescript
function name<T>(param: T): T {
    return param;
}
```

- `<T>` пишеться після імені функції, до дужок
- `T` — просто угода (скорочення від Type). Можна назвати як завгодно: `<Item>`, `<Value>`, `<Data>`
- `T` використовуєш далі як звичайний тип в параметрах і значенні, що повертається

### Кілька тип-змінних

```typescript
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

pair("age", 25);    // → ["age", 25], тип: [string, number]
pair(true, "yes");  // → [true, "yes"], тип: [boolean, string]
```

---

## 🔍 JS vs TS

```javascript
// JS: одна функція, але тип результату невідомий
function first(arr) {
    return arr[0];
}
const x = first([1, 2, 3]);
x.toFixed(2); // сподіваємося що це число... або ні?
```

```typescript
// TS з дженериком: одна функція, тип результату відомий точно
function first<T>(arr: T[]): T {
    return arr[0];
}
const x = first([1, 2, 3]); // x: number — TS знає точно
x.toFixed(2); // ✅ автодоповнення, перевірка, все працює
```

---

## 💡 Приклади з коментарями

### Приклад 1: wrap — загортаємо значення в масив

```typescript
function wrap<T>(value: T): T[] {
    // приймаємо значення типу T
    // повертаємо масив з цього ж типу
    return [value];
}

wrap(42);       // T = number  → поверне number[]  → [42]
wrap("hello");  // T = string  → поверне string[]  → ["hello"]
wrap(true);     // T = boolean → поверне boolean[] → [true]
```

### Приклад 2: getElement — беремо елемент за індексом

```typescript
function getElement<T>(arr: T[], index: number): T {
    // arr: T[]    — масив елементів типу T
    // index: number — звичайний параметр, не дженерик
    // повертаємо: T — елемент того ж типу що масив
    return arr[index];
}

getElement([10, 20, 30], 1);       // T = number → поверне 20 (number)
getElement(["a", "b", "c"], 2);   // T = string → поверне "c" (string)
```

### Приклад 3: repeat — реальний use case

```typescript
// Такий патерн зустрічається в тестах, mock-даних, UI компонентах
function repeat<T>(value: T, times: number): T[] {
    return Array(times).fill(value);
}

repeat("ha", 3);   // → ["ha", "ha", "ha"]  (string[])
repeat(0, 4);      // → [0, 0, 0, 0]        (number[])
repeat(true, 2);   // → [true, true]         (boolean[])
```

---

## 🛠️ Де це використовується в реальних проектах

**1. Утилітарні функції** — будь-яка функція яка працює з даними не знаючи заздалегідь їх тип:
```typescript
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}
```

**2. API хелпери** — функції для роботи з HTTP запитами:
```typescript
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as T;
}
```

**3. Стандартна бібліотека TS** — `Array.map`, `Array.filter`, `Promise` — все це дженерики всередині.

---

## Підсумок

| Без дженерика | З дженериком |
|---|---|
| Копіюєш функцію під кожен тип | Одна функція для всіх типів |
| Використовуєш `any` — втрачаєш типізацію | Повна типобезпека |
| Редактор не підказує методи | Автодоповнення працює коректно |

**Головна ідея:** дженерик — це параметр для типу. Звичайний параметр передає значення, дженерик передає тип. TypeScript сам визначає тип по аргументу — явно вказувати не потрібно.

---

## 📝 Додаткові нотатки

### ❓ Дженерик потрібен щоб не задавати конкретний тип, а залишити простір для варіантів?

Так — але з важливим доповненням. Дженерик не просто "залишає простір", він **запам'ятовує тип** при виклику і стежить за зв'язками:

```typescript
const result = wrap(42);
// T = number — TS запам'ятав
result.push("hello"); // ❌ не можна — це number[], не any[]
```

Порівняй з `any` — воно теж "залишає простір", але тип втрачається:

```typescript
function wrap(value: any): any[] { return [value]; }

const result = wrap(42);
result.push("hello"); // ✅ мовчки пропустить — тип втрачено
```

**Підсумок:**
- `any` — "мені все одно що там, не перевіряй"
- `<T>` — "я поки не знаю тип, але коли дізнаюся — запам'ятай і перевіряй"

Дженерик залишає простір для варіантів **зі збереженням типобезпеки**. В цьому його сенс.

---

### ❓ Звідки беруться імена ключів у об'єкті, що повертається?

Імена ключів диктує **дженерик тип**, а не параметри функції.
Параметри функції можуть називатися як завгодно — але об'єкт, що повертається, зобов'язаний відповідати типу:

```typescript
type TestDjType<A, B> = { key: A, value: B }

function createRecord<C, D>(huy: C, pizda: D): TestDjType<C, D> {
    return { huy, pizda }             // ❌ немає полів key і value
    return { key: huy, value: pizda } // ✅ явно вказав потрібні імена
}
```

Shorthand `{ key, value }` працює тільки коли ім'я змінної збігається з іменем поля.
Тому зручно називати параметри так само як поля в типі:

```typescript
function createRecord<C, D>(key: C, value: D): TestDjType<C, D> {
    return { key, value } // ✅ імена збігаються — shorthand працює
}
```

---

### ❓ А якщо кілька параметрів з різними типами?

Оголошуєш кілька тип-змінних через кому:

```typescript
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

pair("age", 25);    // A = string, B = number → [string, number]
pair(true, "yes");  // A = boolean, B = string → [boolean, string]
```

TS дивиться на кожен аргумент окремо і запам'ятовує кожен тип окремо.

А якщо два параметри **одного** типу — використовуєш один T:

```typescript
function swap<T>(a: T, b: T): [T, T] {
    return [b, a];
}

swap(1, 2);       // ✅ обидва number
swap("a", "b");   // ✅ обидва string
swap(1, "hello"); // ❌ не можна — T повинен бути один тип
```

**Підсумок:**
- `<T>` — один тип, TS стежить що всі пов'язані параметри збігаються
- `<A, B>` — два незалежні типи, кожен запам'ятовується окремо

---

### ❓ Чим `function wrap<T>(value: T): T[]` відрізняється від `function wrap(value: T): T[]`?

Другий варіант — помилка компіляції:

```typescript
function wrap(value: T): T[] { // ❌ Cannot find name 'T'
    return [value];
}
```

TypeScript не знає що таке `T` — він ніде не оголошений.

**`<T>` — це оголошення тип-змінної.** Без нього T просто неіснуюче ім'я.

Аналогія зі звичайними параметрами:

```typescript
// Не можна використовувати змінну без оголошення:
function add(): number {
    return x + y; // ❌ Cannot find name 'x'
}

// Потрібно оголосити:
function add(x: number, y: number): number {
    return x + y; // ✅
}
```

Точно так само з типами — `<T>` оголошує тип-змінну перед використанням:

```
(x: number)  — оголошуєш параметр-значення через ()
<T>          — оголошуєш параметр-тип через <>
```

Обидва потрібно оголосити перед використанням. Просто синтаксис різний.
