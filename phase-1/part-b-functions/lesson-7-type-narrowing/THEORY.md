# Урок 7: Type Narrowing (Сужение типов)

**Статус:** В процессе
**Дата:** 2026-02-28

---

## 📌 Тема урока

Type Narrowing — сужение типов. Это процесс, когда TypeScript автоматически уточняет (сужает) тип переменной внутри определённого блока кода на основе проверок.

---

## 🎯 Цель урока

После урока ты будешь:
- Понимать что такое "сужение типа" и зачем оно нужно
- Уметь использовать разные способы narrowing
- Понимать как TypeScript "думает" при анализе кода
- Знать паттерн exhaustiveness checking

---

## 🤔 Проблема в JavaScript

В JS у нас часто бывает переменная, которая может быть разного типа:

```js
// JS — нет защиты, ошибки только в runtime
function formatValue(value) {
    return value.toUpperCase(); // 💥 CRASH если value — число!
}

formatValue("hello"); // OK
formatValue(42);      // TypeError: value.toUpperCase is not a function
```

Проблема: мы не знаем тип `value` в момент написания кода. Ошибка обнаруживается только при запуске.

---

## 📖 Теория

### Что такое Type Narrowing?

Narrowing — это когда TypeScript **сужает** (уточняет) тип переменной внутри блока кода.

Представь: у тебя есть переменная типа `string | number`. Это широкий тип — "либо строка, либо число". Когда ты пишешь `if (typeof value === "string")`, TypeScript **сужает** тип до просто `string` внутри этого блока.

```
string | number  →  (проверка)  →  string (внутри if)
   широкий тип                       узкий тип
```

### Почему это важно?

Это позволяет TypeScript быть **умным**: он понимает что в каждой ветке кода доступно, и разрешает только те методы, которые точно существуют для данного типа.

---

## 💡 Способы сужения типов

### 1. typeof narrowing

Уже знакомо из прошлого урока:

```typescript
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        // TypeScript знает: здесь value — точно string
        return value.toUpperCase(); // ✅ OK
    } else {
        // TypeScript знает: здесь value — точно number
        return value.toFixed(2); // ✅ OK
    }
}
```

### 2. Truthiness narrowing (проверка на правдивость)

```typescript
function greet(name: string | null): string {
    if (name) {
        // TypeScript знает: name не null и не пустая строка
        return `Привет, ${name.toUpperCase()}!`;
    }
    return "Привет, гость!";
}
```

Что считается "ложным" (falsy) в JavaScript:
- `null`
- `undefined`
- `0`
- `""` (пустая строка)
- `false`
- `NaN`

### 3. Equality narrowing (проверка равенства)

```typescript
function compare(x: string | number, y: string | boolean): void {
    if (x === y) {
        // Если x === y, то оба должны быть одного типа
        // TypeScript знает: здесь оба — string
        console.log(x.toUpperCase()); // ✅ OK
        console.log(y.toUpperCase()); // ✅ OK
    }
}
```

### 4. in narrowing (проверка свойства)

Уже знакомо:

```typescript
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog): void {
    if ("meow" in animal) {
        // TypeScript знает: здесь animal — Cat
        animal.meow();
    } else {
        // TypeScript знает: здесь animal — Dog
        animal.bark();
    }
}
```

### 5. instanceof narrowing (проверка класса)

```typescript
function processDate(value: Date | string): string {
    if (value instanceof Date) {
        // TypeScript знает: здесь value — Date
        return value.toISOString();
    }
    // TypeScript знает: здесь value — string
    return value.toUpperCase();
}
```

### 6. Discriminated unions (размеченные объединения)

Это один из самых мощных паттернов. Суть: у каждого типа есть общее поле-"метка" с уникальным литеральным значением:

```typescript
type Circle = {
    kind: "circle";    // ← метка
    radius: number;
};

type Square = {
    kind: "square";    // ← метка
    side: number;
};

type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            // TypeScript знает: здесь shape — Circle
            return Math.PI * shape.radius ** 2;
        case "square":
            // TypeScript знает: здесь shape — Square
            return shape.side ** 2;
    }
}
```

Поле `kind` — это и есть "дискриминант" (метка). TypeScript использует его для сужения.

### 7. Exhaustiveness checking (проверка полноты)

Что если добавим новый тип, но забудем обработать его? TypeScript может поймать это:

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
            // Если мы забыли обработать "triangle" — TypeScript покажет ошибку здесь
            const _exhaustive: never = shape; // ❌ Type 'Triangle' is not assignable to type 'never'
            throw new Error("Unknown shape");
    }
}
```

Тип `never` означает "сюда никогда не должны попасть". Если TypeScript видит что сюда может попасть какой-то тип — это ошибка.

---

## 🔍 JS vs TS

```javascript
// JS — нет защиты
function processInput(input) {
    if (typeof input === "string") {
        return input.toUpperCase(); // Надеемся что всё OK
    }
    return input * 2; // Надеемся что это число
}
```

```typescript
// TS — TypeScript проверяет каждую ветку
function processInput(input: string | number): string | number {
    if (typeof input === "string") {
        return input.toUpperCase(); // ✅ TypeScript уверен — это string
    }
    return input * 2; // ✅ TypeScript уверен — это number
}
```

---

## ✍️ Практика

Задачи находятся в файле `practice.ts`.

---

## ✅ Проверка понимания (после практики)

1. Что такое type narrowing своими словами?
2. Чем discriminated union отличается от обычного union?
3. Зачем нужен `never` в exhaustiveness checking?
4. Когда лучше использовать `switch` с `kind`, а когда `if` с `typeof`?

---

## 🛠️ Практический совет

Discriminated unions — один из самых используемых паттернов в реальных проектах:
- Состояния загрузки: `{ status: "loading" } | { status: "success", data: T } | { status: "error", message: string }`
- Типы событий в Redux/state machines
- Результаты API запросов

---

## 📝 Дополнительные заметки

*(Здесь будут появляться ответы на твои вопросы)*

---

*Создано: 2026-02-28*
*Обновлено: 2026-02-28*
