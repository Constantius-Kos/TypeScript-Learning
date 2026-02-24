# Урок 4: Дженерики (Generics)

**Статус:** В процессе
**Обновлено:** 24 февраля 2026

---

## 🤔 Проблема в JavaScript

Представь: тебе нужна функция, которая возвращает первый элемент массива.

```javascript
// JS — пишем одну функцию
function first(arr) {
    return arr[0];
}

const num = first([1, 2, 3]);     // num = 1, но JS не знает какой тип
const str = first(["a", "b"]);   // str = "a"
```

Звучит нормально. Но в реальном проекте ты хочешь использовать результат:

```javascript
const name = first(["Alice", "Bob"]);
console.log(name.toUpperCase()); // Работает в runtime... но только потому что повезло
```

Проблема: JS не знает что `name` это строка. Ты теряешь все подсказки редактора — автодополнение, проверку методов. Один рефакторинг и вместо массива строк туда случайно придёт массив объектов — получишь ошибку в runtime.

---

## 💡 Попытка решить это в TypeScript без дженериков

Первая идея — добавить перегрузки или union:

```typescript
// Вариант 1: отдельная функция для каждого типа
function firstNumber(arr: number[]): number { return arr[0]; }
function firstString(arr: string[]): string { return arr[0]; }
function firstBoolean(arr: boolean[]): boolean { return arr[0]; }
// Для каждого нового типа — новая функция. Это плохо.

// Вариант 2: any
function first(arr: any[]): any {
    return arr[0];
}
const name = first(["Alice", "Bob"]);
name.toUpperCase(); // TS не проверяет — any отключает типизацию
```

`any` — это "сдаться". Ты теряешь все преимущества TypeScript.

**Нам нужно:** одна функция, которая работает с любым типом — и при этом TS знает что именно она вернёт.

---

## 🎯 Решение: дженерики

Дженерик — это **переменная для типа**. Так же как обычный параметр хранит значение, дженерик хранит тип.

```typescript
function first<T>(arr: T[]): T {
    return arr[0];
}
```

- `<T>` — объявляем "тип-переменную" (placeholder)
- `arr: T[]` — массив элементов типа T
- `: T` — возвращаем элемент того же типа T

При вызове TypeScript сам определяет что такое T:

```typescript
const num = first([1, 2, 3]);       // T = number → вернёт number
const str = first(["a", "b", "c"]); // T = string → вернёт string
const flag = first([true, false]);   // T = boolean → вернёт boolean

str.toUpperCase(); // ✅ TS знает что str это string → даёт автодополнение
num.toFixed(2);    // ✅ TS знает что num это number → все методы number доступны
```

Одна функция — полная типобезопасность для любого типа.

---

## 📖 Синтаксис

```typescript
function name<T>(param: T): T {
    return param;
}
```

- `<T>` пишется после имени функции, до скобок
- `T` — просто соглашение (сокращение от Type). Можно назвать как угодно: `<Item>`, `<Value>`, `<Data>`
- `T` используешь дальше как обычный тип в параметрах и возвращаемом значении

### Несколько тип-переменных

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
// JS: одна функция, но тип результата неизвестен
function first(arr) {
    return arr[0];
}
const x = first([1, 2, 3]);
x.toFixed(2); // надеемся что это число... или нет?
```

```typescript
// TS с дженериком: одна функция, тип результата известен точно
function first<T>(arr: T[]): T {
    return arr[0];
}
const x = first([1, 2, 3]); // x: number — TS знает точно
x.toFixed(2); // ✅ автодополнение, проверка, всё работает
```

---

## 💡 Примеры с комментариями

### Пример 1: wrap — оборачиваем значение в массив

```typescript
function wrap<T>(value: T): T[] {
    // принимаем значение типа T
    // возвращаем массив из этого же типа
    return [value];
}

wrap(42);       // T = number  → вернёт number[]  → [42]
wrap("hello");  // T = string  → вернёт string[]  → ["hello"]
wrap(true);     // T = boolean → вернёт boolean[] → [true]
```

### Пример 2: getElement — берём элемент по индексу

```typescript
function getElement<T>(arr: T[], index: number): T {
    // arr: T[]    — массив элементов типа T
    // index: number — обычный параметр, не дженерик
    // возвращаем: T — элемент того же типа что массив
    return arr[index];
}

getElement([10, 20, 30], 1);       // T = number → вернёт 20 (number)
getElement(["a", "b", "c"], 2);   // T = string → вернёт "c" (string)
```

### Пример 3: repeat — реальный use case

```typescript
// Такой паттерн встречается в тестах, mock-данных, UI компонентах
function repeat<T>(value: T, times: number): T[] {
    return Array(times).fill(value);
}

repeat("ha", 3);   // → ["ha", "ha", "ha"]  (string[])
repeat(0, 4);      // → [0, 0, 0, 0]        (number[])
repeat(true, 2);   // → [true, true]         (boolean[])
```

---

## 🛠️ Где это используется в реальных проектах

**1. Утилитарные функции** — любая функция которая работает с данными не зная заранее их тип:
```typescript
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}
```

**2. API хелперы** — функции для работы с HTTP запросами:
```typescript
async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as T;
}
```

**3. Стандартная библиотека TS** — `Array.map`, `Array.filter`, `Promise` — всё это дженерики внутри.

---

## Итого

| Без дженерика | С дженериком |
|---|---|
| Копируешь функцию под каждый тип | Одна функция для всех типов |
| Используешь `any` — теряешь типизацию | Полная типобезопасность |
| Редактор не подсказывает методы | Автодополнение работает корректно |

**Главная идея:** дженерик — это параметр для типа. Обычный параметр передаёт значение, дженерик передаёт тип. TypeScript сам определяет тип по аргументу — явно указывать не нужно.

---

## 📝 Дополнительные заметки

### ❓ Дженерик нужен чтобы не задавать конкретный тип, а оставить пространство для вариантов?

Да — но с важным дополнением. Дженерик не просто "оставляет пространство", он **запоминает тип** при вызове и следит за связями:

```typescript
const result = wrap(42);
// T = number — TS запомнил
result.push("hello"); // ❌ нельзя — это number[], не any[]
```

Сравни с `any` — оно тоже "оставляет пространство", но тип теряется:

```typescript
function wrap(value: any): any[] { return [value]; }

const result = wrap(42);
result.push("hello"); // ✅ молча пропустит — тип потерян
```

**Итог:**
- `any` — "мне всё равно что там, не проверяй"
- `<T>` — "я пока не знаю тип, но когда узнаю — запомни и проверяй"

Дженерик оставляет пространство для вариантов **с сохранением типобезопасности**. В этом его смысл.

---

### ❓ Откуда берутся имена ключей в возвращаемом объекте?

Имена ключей диктует **дженерик тип**, а не параметры функции.
Параметры функции могут называться как угодно — но возвращаемый объект обязан соответствовать типу:

```typescript
type TestDjType<A, B> = { key: A, value: B }

function createRecord<C, D>(huy: C, pizda: D): TestDjType<C, D> {
    return { huy, pizda }             // ❌ нет полей key и value
    return { key: huy, value: pizda } // ✅ явно указал нужные имена
}
```

Shorthand `{ key, value }` работает только когда имя переменной совпадает с именем поля.
Поэтому удобно называть параметры так же как поля в типе:

```typescript
function createRecord<C, D>(key: C, value: D): TestDjType<C, D> {
    return { key, value } // ✅ имена совпадают — shorthand работает
}
```

---

### ❓ А если несколько параметров с разными типами?

Объявляешь несколько тип-переменных через запятую:

```typescript
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

pair("age", 25);    // A = string, B = number → [string, number]
pair(true, "yes");  // A = boolean, B = string → [boolean, string]
```

TS смотрит на каждый аргумент отдельно и запоминает каждый тип отдельно.

А если два параметра **одного** типа — используешь один T:

```typescript
function swap<T>(a: T, b: T): [T, T] {
    return [b, a];
}

swap(1, 2);       // ✅ оба number
swap("a", "b");   // ✅ оба string
swap(1, "hello"); // ❌ нельзя — T должен быть один тип
```

**Итого:**
- `<T>` — один тип, TS следит что все связанные параметры совпадают
- `<A, B>` — два независимых типа, каждый запоминается отдельно

---

### ❓ Чем `function wrap<T>(value: T): T[]` отличается от `function wrap(value: T): T[]`?

Второй вариант — ошибка компиляции:

```typescript
function wrap(value: T): T[] { // ❌ Cannot find name 'T'
    return [value];
}
```

TypeScript не знает что такое `T` — он нигде не объявлен.

**`<T>` — это объявление тип-переменной.** Без него T просто несуществующее имя.

Аналогия с обычными параметрами:

```typescript
// Нельзя использовать переменную без объявления:
function add(): number {
    return x + y; // ❌ Cannot find name 'x'
}

// Нужно объявить:
function add(x: number, y: number): number {
    return x + y; // ✅
}
```

Точно так же с типами — `<T>` объявляет тип-переменную перед использованием:

```
(x: number)  — объявляешь параметр-значение через ()
<T>          — объявляешь параметр-тип через <>
```

Оба нужно объявить перед использованием. Просто синтаксис разный.
