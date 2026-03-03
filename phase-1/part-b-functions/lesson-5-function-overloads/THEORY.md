
# Урок 5: Function Overloads (Перевантаження функцій)

**Статус:** В процесі
**Дата:** 26 лютого 2026
**Фаза:** 1 / Частина B

---

## 📌 Тема уроку

**Function Overloads** — можливість описати кілька різних "версій" однієї функції з різними типами аргументів і значень, що повертаються.

---

## 🎯 Ціль уроку

Після уроку ти зможеш:
- Зрозуміти, НАВІЩО потрібні перевантаження (і коли без них не обійтися)
- Писати функції з кількома сигнатурами
- Відрізняти сигнатуру перевантаження від сигнатури реалізації
- Не плутати перевантаження з union types в параметрах

---

## 🤔 Проблема в JavaScript

В JS функція може приймати різні типи аргументів — це зручно, але TS втрачає інформацію про те, **що саме повернеться**:

```javascript
// JS: функція працює по-різному залежно від аргументу
function getInfo(value) {
  if (typeof value === "string") {
    return value.length; // повертає number
  }
  return String(value);  // повертає string
}

const result = getInfo("hello"); // що тут? number? string? Невідомо!
result.toUpperCase(); // Runtime error — але JS не попередить
```

Проблема: TypeScript не знає, **який тип поверне функція**, якщо ти передав рядок vs число. Він змушений сказати `string | number`, і ти втрачаєш автодоповнення і перевірки.

---

## 📖 Теорія

### Що таке Function Overload?

Перевантаження функції — це спосіб сказати TypeScript:

> "Якщо передаси **рядок** → отримаєш **число**.
> Якщо передаси **число** → отримаєш **рядок**."

Тобто ти описуєш **кілька точних контрактів** для однієї функції.

### Аналогія з життя

Уяви банкомат:
- Якщо вставив **картку** → він видає **гроші**
- Якщо ввів **PIN** → він показує **баланс**
- Якщо натиснув **"виписка"** → він друкує **чек**

Один банкомат, але різні входи → різні виходи. І ти **точно знаєш** що отримаєш у кожному випадку.

### Синтаксис

```typescript
// 1️⃣ Сигнатури перевантажень (overload signatures)
// Це тільки ОПИС — без тіла функції
function getInfo(value: string): number;
function getInfo(value: number): string;

// 2️⃣ Сигнатура реалізації (implementation signature)
// Це СПРАВЖНЯ функція — повинна охопити ВСІ варіанти вище
function getInfo(value: string | number): number | string {
  if (typeof value === "string") {
    return value.length;   // string → number
  }
  return String(value);    // number → string
}
```

### Ключові правила:

1. **Спочатку — перевантаження** (без тіла `{}`), потім — реалізація (з тілом)
2. **Реалізація** повинна приймати всі можливі типи з усіх перевантажень
3. **Реалізація НЕ видна ззовні** — TypeScript ховає її, користувач бачить тільки перевантаження
4. Мінімум **2 сигнатури перевантаження** — інакше в цьому немає сенсу

---

## 💡 Приклади з детальними коментарями

### Приклад 1: Простий — форматування значення

```typescript
// Сигнатури: описуємо контракти (типи повернення РІЗНІ — перевантаження виправдані)
function format(value: string): number;   // рядок → поверне довжину (число)
function format(value: number): string;   // число → поверне рядок "3.14"

// Реалізація: пишемо логіку
function format(value: string | number): string | number {
  if (typeof value === "string") {
    return value.length;           // "hello" → 5
  }
  return value.toFixed(2);         // 3.14159 → "3.14"
}

// Використання:
const a = format("hello");  // TypeScript знає: a — це number (довжина рядка)
const b = format(3.14159);  // TypeScript знає: b — це string ("3.14")
// a.toFixed(1) — працює, TS знає що це number ✅
// b.toUpperCase() — працює, TS знає що це string ✅
```

### Приклад 2: Різні типи повернення

```typescript
// Тут ТИПИ, ЩО ПОВЕРТАЮТЬСЯ різні!
function parseInput(value: string): number;   // рядок → число
function parseInput(value: number): string;   // число → рядок

function parseInput(value: string | number): string | number {
  if (typeof value === "string") {
    return parseInt(value, 10);  // "42" → 42
  }
  return String(value);          // 42 → "42"
}

const num = parseInput("42");    // TS знає: це number!
const str = parseInput(42);      // TS знає: це string!

// Без перевантажень TS сказав би string | number — і ти не знав би точно
```

### Приклад 3: Реальний use case — створення елементу

```typescript
// Функція може створити рядок або об'єкт — залежно від аргументу
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement("div");      // TypeScript знає: це HTMLDivElement
const input = createElement("input");  // TypeScript знає: це HTMLInputElement
// div.value — помилка TS, у div немає .value ✅
// input.value — ок, у input є .value ✅
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
// Що тут? JS не знає. Ти не знаєш. Помилка прийде в runtime.
result.toFixed(2); // 💥 Runtime error!
```

**TypeScript з перевантаженнями:**
```typescript
function process(value: string): number;
function process(value: number): string;
function process(value: string | number): string | number {
  if (typeof value === "string") return value.length;
  return String(value);
}

const result = process("hello"); // TypeScript знає: result — number
result.toFixed(2);  // ✅ Компілятор перевірить: у number є .toFixed
result.toUpperCase(); // ❌ Помилка компілятора: у number немає .toUpperCase
```

**Перевага:** помилка спіймана **до запуску**, не після.

---

## ⚠️ Часті помилки

### "Можна просто використовувати union type в параметрі"

```typescript
// ❌ Це НЕ те саме що перевантаження:
function process(value: string | number): string | number { ... }

// TS знає що повернеться string | number — але НЕ ЗНАЄ точно що саме
const result = process("hello"); // тип: string | number — неточно!

// ✅ З перевантаженнями:
function process(value: string): number;
function process(value: number): string;
function process(value: string | number): string | number { ... }

const result = process("hello"); // тип: number — точно!
```

Різниця: перевантаження дають **точний** тип, union — **розмитий**.

### "Реалізацію теж можна викликати"

```typescript
function greet(name: string): string;
function greet(age: number): string;
function greet(value: string | number): string { ... }

// ❌ Це не працює — реалізація прихована:
greet("hello", 42);    // Помилка! Не відповідає жодному перевантаженню
```

---

## ✍️ Практика

Завдання знаходяться у файлі `practice.ts`.

Три завдання із зростаючою складністю:
1. **Розминка** — прості перевантаження з примітивами
2. **Основне** — перевантаження з об'єктами
3. **Челендж** — практичний use case

---

## ✅ Перевірка розуміння (після практики)

1. **Теорія:** Чим сигнатура перевантаження відрізняється від сигнатури реалізації?
2. **Практика:** Коли перевантаження кращі, ніж просто `string | number` в параметрі?
3. **Порівняння:** Чим функція з перевантаженнями відрізняється від функції з union type?
4. **Причина:** НАВІЩО взагалі потрібні перевантаження, якщо можна написати `any`?

---

## 🛠️ Практична порада

**В реальних проектах перевантаження зустрічаються:**
- В стандартній бібліотеці (`Array.slice`, `String.replace`)
- В бібліотеках типу jQuery (`$(selector)`, `$(element)`)
- Коли пишеш утиліти, які вміють працювати з різними типами

**Правило:** Якщо функція при одному типі аргументу завжди повертає один тип, а при іншому — інший → перевантаження твій інструмент.

**Не зловживай:** Якщо поведінка однакова для всіх типів — просто використовуй generics (ти вже знаєш!).

---

## 📝 Додаткові нотатки

---



**Оновлено:** 26 лютого 2026
