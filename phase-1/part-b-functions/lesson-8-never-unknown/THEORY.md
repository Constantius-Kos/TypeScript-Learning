# Урок 8: Never и Unknown типы

**Статус:** В процессе
**Дата:** 2026-03-01

---

## 🎯 Цель урока

После этого урока ты будешь понимать:
- Что такое `never` и `unknown` и зачем они существуют
- Чем `unknown` отличается от `any` — и почему `unknown` лучше
- Где эти типы встречаются в реальных проектах

---

## 🤔 Проблема в JavaScript

```js
// JS: получаем данные из внешнего источника
const data = JSON.parse(userInput); // что внутри? Неизвестно!

data.name.toUpperCase(); // 💥 TypeError если name не строка
data.forEach(...)        // 💥 TypeError если data не массив
```

В JS ты не знаешь что пришло снаружи — и узнаёшь об ошибке только в рантайме.

---

## 📖 Теория

### Тип `unknown`

`unknown` переводится как "неизвестный". Это **безопасная версия `any`**.

Разница одна, но принципиальная:
- `any` — TypeScript **отключает проверки**. Делай что хочешь.
- `unknown` — TypeScript **требует проверить тип** прежде чем что-то делать.

```ts
// any — TS молчит, даже если это бред
const a: any = "hello";
a.toFixed(2);     // TS не ругается, хотя это метод числа!
a.foo.bar.baz;    // TS не ругается! Всё разрешено.

// unknown — TS заставляет проверить
const u: unknown = "hello";
u.toUpperCase();  // ❌ Ошибка: нельзя вызывать методы на unknown
u.length;         // ❌ Ошибка: нельзя обращаться к свойствам

// Сначала проверяем — потом используем
if (typeof u === "string") {
    u.toUpperCase(); // ✅ Теперь TS знает что u — строка
}
```

**Аналогия из жизни:**
`any` — это посылка без маркировки, которую ты открываешь и суёшь руку внутрь.
`unknown` — посылка без маркировки, которую ты сначала просвечиваешь на рентгене, а потом открываешь.

---

### Где используется `unknown`

**1. Обработка ошибок в try/catch**

```ts
try {
    // что-то опасное
} catch (error) {
    // В TS 4.0+ error имеет тип unknown (раньше был any)
    // Нельзя просто написать error.message — нужно проверить

    if (error instanceof Error) {
        console.log(error.message); // ✅
    }
}
```

**2. Данные из внешних источников**

```ts
function parseConfig(json: string): unknown {
    return JSON.parse(json); // возвращаем unknown, а не any
}

const config = parseConfig('{"port": 3000}');

// Нельзя сразу использовать:
config.port; // ❌ Ошибка

// Нужно проверить:
if (typeof config === "object" && config !== null && "port" in config) {
    console.log(config.port); // ✅
}
```

---

### Тип `never`

`never` — это **пустой тип**. Значение типа `never` **не может существовать**.

Ты уже видел `never` в уроке 7 (exhaustiveness check). Но есть ещё случаи:

**1. Функция которая никогда не возвращает**

```ts
// Всегда бросает ошибку
function fail(message: string): never {
    throw new Error(message);
}

// Бесконечный цикл
function forever(): never {
    while (true) {
        // слушаем события сервера...
    }
}
```

**2. Невозможная ветка кода**

```ts
function process(value: string | number) {
    if (typeof value === "string") {
        // value: string
    } else if (typeof value === "number") {
        // value: number
    } else {
        // value: never — TypeScript знает что сюда нельзя попасть
        // Эта ветка "мертва"
    }
}
```

**3. Exhaustiveness check (из урока 7)**

```ts
function assertNever(value: never): never {
    throw new Error(`Необработанный случай: ${JSON.stringify(value)}`);
}
```

---

### `never` vs `void` vs `unknown` vs `any`

| Тип | Значение | Можно присвоить | Можно использовать |
|---|---|---|---|
| `any` | всё что угодно | что угодно | что угодно (без проверок) |
| `unknown` | неизвестно что | что угодно | только после проверки типа |
| `void` | undefined | только undefined | нет (только return) |
| `never` | не существует | ничего | — |

---

### Когда использовать `unknown` вместо `any`

**Правило:** всегда когда данные приходят извне и ты не знаешь их тип:е
```ts
// ❌ Плохо — any отключает все проверки
function handleApiResponse(data: any) {
    return data.users[0].name; // TS молчит, но это может сломаться
}

// ✅ Хорошо — unknown заставит проверить
function handleApiResponse(data: unknown) {
    if (
        typeof data === "object" &&
        data !== null &&
        "users" in data
    ) {
        // теперь безопасно
    }
}
```

---

## 🔍 JS vs TS

```js
// JS — никаких гарантий
function riskyOperation(value) {
    return value.toString(); // 💥 если value = null
}
```

```ts
// TS с unknown — компилятор заставит проверить
function safeOperation(value: unknown): string {
    if (value === null || value === undefined) {
        return "пусто";
    }
    return String(value); // ✅ безопасно
}
```

---

## 📝 Дополнительные заметки

*(Здесь будут появляться ответы на твои вопросы)*
