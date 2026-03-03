# Урок 3: Rest parameters з типами

## Що таке rest parameters?

Іноді заздалегідь невідомо, скільки аргументів отримає функція.
Rest parameter дозволяє прийняти **будь-яку кількість аргументів** і зібрати їх у масив.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);       // 6
sum(10, 20);        // 30
sum(1, 2, 3, 4, 5); // 15
```

`...numbers` — це і є rest parameter. Всередині функції він стає звичайним масивом.

---

## Синтаксис

```typescript
function name(...paramName: тип[]): повернення {
  // paramName — це масив
}
```

Три крапки `...` завжди перед іменем. Тип завжди масив (`тип[]`).

---

## Rest parameter і звичайні параметри

Rest parameter можна комбінувати зі звичайними — але він **завжди останній**:

```typescript
function log(level: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(`[${level}] ${msg}`));
}

log("INFO", "Сервер запущено");
log("ERROR", "Помилка 404", "Шлях не знайдено", "Перевірте URL");
```

```typescript
// ❌ Rest НЕ може бути в середині
function bad(...items: string[], last: string) {} // Помилка!
```

---

## Чим відрізняється від звичайного масиву?

```typescript
// Масив як параметр — виклик з одним аргументом:
function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sumArray([1, 2, 3]); // передаємо масив у []

// Rest — виклик з окремими аргументами:
function sumRest(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sumRest(1, 2, 3); // передаємо числа через кому
```

Обидва варіанти всередині працюють однаково — різниця лише в тому, **як викликаєш**.

---

## Spread оператор при виклику (бонус)

Якщо у тебе вже є масив і потрібно передати його в rest-функцію — використовуй `...` при виклику:

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

const nums = [1, 2, 3, 4];
sum(...nums); // "розгортає" масив в окремі аргументи → 10
```

Це називається **spread** — він протилежний rest:
- **rest** `...` в оголошенні функції — *збирає* аргументи в масив
- **spread** `...` при виклику — *розгортає* масив в аргументи

---

## Типові use-cases

```typescript
// Логер
function logger(prefix: string, ...lines: string[]): void {
  lines.forEach(line => console.log(`${prefix}: ${line}`));
}

// Математика
function max(...nums: number[]): number {
  return Math.max(...nums);
}
```

---

## Підсумок

| Синтаксис | Де | Що робить |
|-----------|-----|------------|
| `...param: T[]` | оголошення функції | збирає аргументи в масив |
| `...array` | виклик функції | розгортає масив в аргументи |
| Завжди останній | оголошення | не можна ставити в середину |

---

## 📝 Додаткові нотатки

### ❓ Що буде якщо передати рядки і числа в rest рядкового типу?

**Проблема в JS:** функція приймає що завгодно мовчки:

```javascript
function joinWords(...strings) {
    return strings.join(' ');
}

joinWords("Hello", 42, true); // "Hello 42 true" — працює, але це баг
```

В реальному проекті це пастка: передав ID замість імені — на екрані `"Привіт, 4829!"`. Баг знайдеш тільки за скаргою користувача.

**TS ловить це одразу:**

```typescript
joinWords("hello", 42); // ❌ Помилка: Argument of type 'number' is not assignable to parameter of type 'string'
```

Помилка прямо в редакторі, до запуску.

**Коли потрібен union `(string | number)[]`?**

Коли змішані типи — навмисний дизайн, а не помилка:

```typescript
// Логер — приймати рядки і числа це його суть
function log(prefix: string, ...args: (string | number)[]): void {
    console.log(`[${prefix}]`, ...args);
}

log("DB", "Підключено до", "localhost", "порт", 5432); // ✅ осмислено
```

Ти явно документуєш: "так, змішані типи тут задумані". TS не забороняє гнучкість — він вимагає явно її оголосити.

---

### `<T>` і дженерики (Generics)
В прикладі `function merge<T>(...arrays: T[][]): T[]` використовуються дженерики — окрема велика тема.
- `<T>` — placeholder для типу (як змінна, тільки для типу)
- `T[][]` — масив масивів типу T (кожен аргумент це `T[]`, rest збирає їх у `T[][]`)
- TypeScript сам визначає що таке T по переданих аргументах
- Дженерики дозволяють писати одну функцію для різних типів
- У завданнях цього уроку дженерики не потрібні — це бонусний приклад
