
# Урок 5: Function Overloads (Перегрузка функций)

**Статус:** В процессе
**Дата:** 26 февраля 2026
**Фаза:** 1 / Часть B

---

## 📌 Тема урока

**Function Overloads** — возможность описать несколько разных "версий" одной функции с разными типами аргументов и возвращаемых значений.

---

## 🎯 Цель урока

После урока ты сможешь:
- Понять, ЗАЧЕМ нужны перегрузки (и когда без них не обойтись)
- Писать функции с несколькими сигнатурами
- Отличать сигнатуру перегрузки от сигнатуры реализации
- Не путать перегрузки с union types в параметрах

---

## 🤔 Проблема в JavaScript

В JS функция может принимать разные типы аргументов — это удобно, но TS теряет информацию о том, **что именно вернётся**:

```javascript
// JS: функция работает по-разному в зависимости от аргумента
function getInfo(value) {
  if (typeof value === "string") {
    return value.length; // возвращает number
  }
  return String(value);  // возвращает string
}

const result = getInfo("hello"); // что тут? number? string? Неизвестно!
result.toUpperCase(); // Runtime error — но JS не предупредит
```

Проблема: TypeScript не знает, **какой тип вернёт функция**, если ты передал строку vs число. Он вынужден сказать `string | number`, и ты теряешь автодополнение и проверки.

---

## 📖 Теория

### Что такое Function Overload?

Перегрузка функции — это способ сказать TypeScript:

> "Если передашь **строку** → получишь **число**.
> Если передашь **число** → получишь **строку**."

То есть ты описываешь **несколько точных контрактов** для одной функции.

### Аналогия из жизни

Представь банкомат:
- Если вставил **карту** → он выдаёт **деньги**
- Если ввёл **PIN** → он показывает **баланс**
- Если нажал **"выписка"** → он печатает **чек**

Один банкомат, но разные входы → разные выходы. И ты **точно знаешь** что получишь в каждом случае.

### Синтаксис

```typescript
// 1️⃣ Сигнатуры перегрузок (overload signatures)
// Это только ОПИСАНИЕ — без тела функции
function getInfo(value: string): number;
function getInfo(value: number): string;

// 2️⃣ Сигнатура реализации (implementation signature)
// Это НАСТОЯЩАЯ функция — должна охватить ВСЕ варианты выше
function getInfo(value: string | number): number | string {
  if (typeof value === "string") {
    return value.length;   // string → number
  }
  return String(value);    // number → string
}
```

### Ключевые правила:

1. **Сначала — перегрузки** (без тела `{}`), потом — реализация (с телом)
2. **Реализация** должна принимать все возможные типы из всех перегрузок
3. **Реализация НЕ видна снаружи** — TypeScript прячет её, пользователь видит только перегрузки
4. Минимум **2 сигнатуры перегрузки** — иначе в этом нет смысла

---

## 💡 Примеры с детальными комментариями

### Пример 1: Простой — форматирование значения

```typescript
// Сигнатуры: описываем контракты (типы возврата РАЗНЫЕ — перегрузки оправданы)
function format(value: string): number;   // строку → вернёт длину (число)
function format(value: number): string;   // число → вернёт строку "3.14"

// Реализация: пишем логику
function format(value: string | number): string | number {
  if (typeof value === "string") {
    return value.length;           // "hello" → 5
  }
  return value.toFixed(2);         // 3.14159 → "3.14"
}

// Использование:
const a = format("hello");  // TypeScript знает: a — это number (длина строки)
const b = format(3.14159);  // TypeScript знает: b — это string ("3.14")
// a.toFixed(1) — работает, TS знает что это number ✅
// b.toUpperCase() — работает, TS знает что это string ✅
```

### Пример 2: Разные типы возврата

```typescript
// Здесь ВОЗВРАЩАЕМЫЕ ТИПЫ разные!
function parseInput(value: string): number;   // строку → число
function parseInput(value: number): string;   // число → строку

function parseInput(value: string | number): string | number {
  if (typeof value === "string") {
    return parseInt(value, 10);  // "42" → 42
  }
  return String(value);          // 42 → "42"
}

const num = parseInput("42");    // TS знает: это number!
const str = parseInput(42);      // TS знает: этобля  string!

// Без перегрузок TS сказал бы string | number — и ты не знал бы точно
```

### Пример 3: Реальный use case — создание элемента

```typescript
// Функция может создать строку или объект — в зависимости от аргумента
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement("div");      // TypeScript знает: это HTMLDivElement
const input = createElement("input");  // TypeScript знает: это HTMLInputElement
// div.value — ошибка TS, у div нет .value ✅
// input.value — ок, у input есть .value ✅
```

---

## 🔍 JS vs TS

**JavaScript:**
```javascript
function process(value) {
  if (typeof value === "string") return value.length;
  return String(value);
}

const result = process("hello");
// Что тут? JS не знает. Ты не знаешь. Ошибка придёт в runtime.
result.toFixed(2); // 💥 Runtime error!
```

**TypeScript с перегрузками:**
```typescript
function process(value: string): number;
function process(value: number): string;
function process(value: string | number): string | number {
  if (typeof value === "string") return value.length;
  return String(value);
}

const result = process("hello"); // TypeScript знает: result — number
result.toFixed(2);  // ✅ Компилятор проверит: у number есть .toFixed
result.toUpperCase(); // ❌ Ошибка компилятора: у number нет .toUpperCase
```

**Преимущество:** ошибка поймана **до запуска**, не после.

---

## ⚠️ Частые заблуждения

### "Можно просто использовать union type в параметре"

```typescript
// ❌ Это НЕ то же самое что перегрузки:
function process(value: string | number): string | number { ... }

// TS знает что вернётся string | number — но НЕ ЗНАЕТ точно что именно
const result = process("hello"); // тип: string | number — неточно!

// ✅ С перегрузками:
function process(value: string): number;
function process(value: number): string;
function process(value: string | number): string | number { ... }

const result = process("hello"); // тип: number — точно!
```

Разница: перегрузки дают **точный** тип, union — **размытый**.

### "Реализацию тоже можно вызвать"

```typescript
function greet(name: string): string;
function greet(age: number): string;
function greet(value: string | number): string { ... }

// ❌ Это не работает — реализация скрыта:
greet("hello", 42);    // Ошибка! Не соответствует ни одной перегрузке
```

---

## ✍️ Практика

Задачи находятся в файле `practice.ts`.

Три задания с нарастающей сложностью:
1. **Разминка** — простые перегрузки с примитивами
2. **Основная** — перегрузки с объектами
3. **Челлендж** — практичный use case

---

## ✅ Проверка понимания (после практики)

1. **Теория:** Чем сигнатура перегрузки отличается от сигнатуры реализации?
2. **Практика:** Когда перегрузки лучше, чем просто `string | number` в параметре?
3. **Сравнение:** Чем функция с перегрузками отличается от функции с union type?
4. **Причина:** ЗАЧЕМ вообще нужны перегрузки, если можно написать `any`?

---

## 🛠️ Практический совет

**В реальных проектах перегрузки встречаются:**
- В стандартной библиотеке (`Array.slice`, `String.replace`)
- В библиотеках типа jQuery (`$(selector)`, `$(element)`)
- Когда пишешь утилиты, которые умеют работать с разными типами

**Правило:** Если функция при одном типе аргумента всегда возвращает один тип, а при другом — другой → перегрузки твой инструмент.

**Не злоупотребляй:** Если поведение одинаковое для всех типов — просто используй generics (ты уже знаешь!).

---

## 📝 Дополнительные заметки

---



**Обновлено:** 26 февраля 2026
