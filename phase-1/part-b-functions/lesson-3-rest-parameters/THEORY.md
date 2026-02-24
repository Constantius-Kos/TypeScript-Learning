# Урок 3: Rest parameters с типами

## Что такое rest parameters?

Иногда заранее неизвестно, сколько аргументов получит функция.
Rest parameter позволяет принять **любое количество аргументов** и собрать их в массив.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);       // 6
sum(10, 20);        // 30
sum(1, 2, 3, 4, 5); // 15
```

`...numbers` — это и есть rest parameter. Внутри функции он становится обычным массивом.

---

## Синтаксис

```typescript
function name(...paramName: тип[]): возврат {
  // paramName — это массив
}
```

Три точки `...` всегда перед именем. Тип всегда массив (`тип[]`).

---

## Rest parameter и обычные параметры

Rest parameter можно комбинировать с обычными — но он **всегда последний**:

```typescript
function log(level: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(`[${level}] ${msg}`));
}

log("INFO", "Сервер запущен");
log("ERROR", "Ошибка 404", "Путь не найден", "Проверьте URL");
```

```typescript
// ❌ Rest НЕ может быть в середине
function bad(...items: string[], last: string) {} // Ошибка!
```

---

## Чем отличается от обычного массива?

```typescript
// Массив как параметр — вызов с одним аргументом:
function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sumArray([1, 2, 3]); // передаём массив в []

// Rest — вызов с отдельными аргументами:
function sumRest(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sumRest(1, 2, 3); // передаём числа через запятую
```

Оба варианта внутри работают одинаково — разница только в том, **как вызываешь**.

---

## Spread оператор при вызове (бонус)

Если у тебя уже есть массив и нужно передать его в rest-функцию — используй `...` при вызове:

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

const nums = [1, 2, 3, 4];
sum(...nums); // "разворачивает" массив в отдельные аргументы → 10
```

Это называется **spread** — он противоположен rest:
- **rest** `...` в объявлении функции — *собирает* аргументы в массив
- **spread** `...` при вызове — *разворачивает* массив в аргументы

---

## Типичные use-cases

```typescript
// Логгер
function logger(prefix: string, ...lines: string[]): void {
  lines.forEach(line => console.log(`${prefix}: ${line}`));
}

// Математика
function max(...nums: number[]): number {
  return Math.max(...nums);
}
```

---

## Итого

| Синтаксис | Где | Что делает |
|-----------|-----|------------|
| `...param: T[]` | объявление функции | собирает аргументы в массив |
| `...array` | вызов функции | разворачивает массив в аргументы |
| Всегда последний | объявление | нельзя ставить в середину |

---

## 📝 Дополнительные заметки

### ❓ Что будет если передать строки и числа в rest строкового типа?

**Проблема в JS:** функция принимает что угодно молча:

```javascript
function joinWords(...strings) {
    return strings.join(' ');
}

joinWords("Hello", 42, true); // "Hello 42 true" — работает, но это баг
```

В реальном проекте это ловушка: передал ID вместо имени — на экране `"Привет, 4829!"`. Баг найдёшь только по жалобе пользователя.

**TS ловит это сразу:**

```typescript
joinWords("hello", 42); // ❌ Ошибка: Argument of type 'number' is not assignable to parameter of type 'string'
```

Ошибка прямо в редакторе, до запуска.

**Когда нужен union `(string | number)[]`?**

Когда смешанные типы — намеренный дизайн, а не ошибка:

```typescript
// Логгер — принимать строки и числа это его суть
function log(prefix: string, ...args: (string | number)[]): void {
    console.log(`[${prefix}]`, ...args);
}

log("DB", "Подключено к", "localhost", "порт", 5432); // ✅ осмысленно
```

Ты явно документируешь: "да, смешанные типы здесь задуманы". TS не запрещает гибкость — он требует явно её объявить.

---

### `<T>` и дженерики (Generics)
В примере `function merge<T>(...arrays: T[][]): T[]` используются дженерики — отдельная большая тема.
- `<T>` — placeholder для типа (как переменная, только для типа)
- `T[][]` — массив массивов типа T (каждый аргумент это `T[]`, rest собирает их в `T[][]`)
- TypeScript сам определяет что такое T по переданным аргументам
- Дженерики позволяют писать одну функцию для разных типов
- В задачах этого урока дженерики не нужны — это бонусный пример
