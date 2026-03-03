# Урок 7: Type Narrowing (Звуження типів)

**Статус:** В процесі
**Дата:** 2026-02-28

---

## 📌 Тема уроку

Type Narrowing — звуження типів. Це процес, коли TypeScript автоматично уточнює (звужує) тип змінної всередині певного блоку коду на основі перевірок.

---

## 🎯 Ціль уроку

Після уроку ти будеш:
- Розуміти що таке "звуження типу" і навіщо воно потрібне
- Вміти використовувати різні способи narrowing
- Розуміти як TypeScript "думає" при аналізі коду
- Знати патерн exhaustiveness checking

---

## 🤔 Проблема в JavaScript

В JS у нас часто буває змінна, яка може бути різного типу:

```js
// JS — немає захисту, помилки тільки в runtime
function formatValue(value) {
    return value.toUpperCase(); // 💥 CRASH якщо value — число!
}

formatValue("hello"); // OK
formatValue(42);      // TypeError: value.toUpperCase is not a function
```

Проблема: ми не знаємо тип `value` в момент написання коду. Помилка виявляється тільки при запуску.

---

## 📖 Теорія

### Що таке Type Narrowing?

Narrowing — це коли TypeScript **звужує** (уточнює) тип змінної всередині блоку коду.

Уяви: у тебе є змінна типу `string | number`. Це широкий тип — "або рядок, або число". Коли ти пишеш `if (typeof value === "string")`, TypeScript **звужує** тип до просто `string` всередині цього блоку.

```
string | number  →  (перевірка)  →  string (всередині if)
   широкий тип                       вузький тип
```

### Чому це важливо?

Це дозволяє TypeScript бути **розумним**: він розуміє що в кожній гілці коду доступно, і дозволяє тільки ті методи, які точно існують для даного типу.

---

## 💡 Способи звуження типів

### 1. typeof narrowing

Вже знайоме з минулого уроку:

```typescript
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        // TypeScript знає: тут value — точно string
        return value.toUpperCase(); // ✅ OK
    } else {
        // TypeScript знає: тут value — точно number
        return value.toFixed(2); // ✅ OK
    }
}
```

### 2. Truthiness narrowing (перевірка на правдивість)

```typescript
function greet(name: string | null): string {
    if (name) {
        // TypeScript знає: name не null і не порожній рядок
        return `Привіт, ${name.toUpperCase()}!`;
    }
    return "Привіт, гостю!";
}
```

Що вважається "хибним" (falsy) в JavaScript:
- `null`
- `undefined`
- `0`
- `""` (порожній рядок)
- `false`
- `NaN`

### 3. Equality narrowing (перевірка рівності)

```typescript
function compare(x: string | number, y: string | boolean): void {
    if (x === y) {
        // Якщо x === y, то обидва повинні бути одного типу
        // TypeScript знає: тут обидва — string
        console.log(x.toUpperCase()); // ✅ OK
        console.log(y.toUpperCase()); // ✅ OK
    }
}
```

### 4. in narrowing (перевірка властивості)

Вже знайоме:

```typescript
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog): void {
    if ("meow" in animal) {
        // TypeScript знає: тут animal — Cat
        animal.meow();
    } else {
        // TypeScript знає: тут animal — Dog
        animal.bark();
    }
}
```

### 5. instanceof narrowing (перевірка класу)

```typescript
function processDate(value: Date | string): string {
    if (value instanceof Date) {
        // TypeScript знає: тут value — Date
        return value.toISOString();
    }
    // TypeScript знає: тут value — string
    return value.toUpperCase();
}
```

### 6. Discriminated unions (розмічені об'єднання)

Це один з найпотужніших патернів. Суть: у кожного типу є спільне поле-"мітка" з унікальним літеральним значенням:

```typescript
type Circle = {
    kind: "circle";    // ← мітка
    radius: number;
};

type Square = {
    kind: "square";    // ← мітка
    side: number;
};

type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            // TypeScript знає: тут shape — Circle
            return Math.PI * shape.radius ** 2;
        case "square":
            // TypeScript знає: тут shape — Square
            return shape.side ** 2;
    }
}
```

Поле `kind` — це і є "дискримінант" (мітка). TypeScript використовує його для звуження.

### 7. Exhaustiveness checking (перевірка повноти)

Що якщо додамо новий тип, але забудемо його обробити? TypeScript може спіймати це:

```typescript
type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
};

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        default:
            // Якщо ми забули обробити "triangle" — TypeScript покаже помилку тут
            const _exhaustive: never = shape; // ❌ Type 'Triangle' is not assignable to type 'never'
            throw new Error("Unknown shape");
    }
}
```

Тип `never` означає "сюди ніколи не повинні потрапити". Якщо TypeScript бачить що сюди може потрапити якийсь тип — це помилка.

---

## 🔍 JS vs TS

```javascript
// JS — немає захисту
function processInput(input) {
    if (typeof input === "string") {
        return input.toUpperCase(); // Сподіваємося що все OK
    }
    return input * 2; // Сподіваємося що це число
}
```

```typescript
// TS — TypeScript перевіряє кожну гілку
function processInput(input: string | number): string | number {
    if (typeof input === "string") {
        return input.toUpperCase(); // ✅ TypeScript впевнений — це string
    }
    return input * 2; // ✅ TypeScript впевнений — це number
}
```

---

## ✍️ Практика

Завдання знаходяться у файлі `practice.ts`.

---

## ✅ Перевірка розуміння (після практики)

1. Що таке type narrowing своїми словами?
2. Чим discriminated union відрізняється від звичайного union?
3. Навіщо потрібен `never` в exhaustiveness checking?
4. Коли краще використовувати `switch` з `kind`, а коли `if` з `typeof`?

---

## 🛠️ Практична порада

Discriminated unions — один з найбільш використовуваних патернів в реальних проектах:
- Стани завантаження: `{ status: "loading" } | { status: "success", data: T } | { status: "error", message: string }`
- Типи подій в Redux/state machines
- Результати API запитів

---

## 📝 Додаткові нотатки

*(Тут будуть з'являтися відповіді на твої питання)*

---

*Створено: 2026-02-28*
*Оновлено: 2026-02-28*
