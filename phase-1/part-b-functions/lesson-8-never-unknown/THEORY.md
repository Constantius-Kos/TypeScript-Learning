# Урок 8: Never і Unknown типи

**Статус:** В процесі
**Дата:** 2026-03-01

---

## 🎯 Ціль уроку

Після цього уроку ти будеш розуміти:
- Що таке `never` і `unknown` і навіщо вони існують
- Чим `unknown` відрізняється від `any` — і чому `unknown` краще
- Де ці типи зустрічаються в реальних проектах

---

## 🤔 Проблема в JavaScript

```js
// JS: отримуємо дані із зовнішнього джерела
const data = JSON.parse(userInput); // що всередині? Невідомо!

data.name.toUpperCase(); // 💥 TypeError якщо name не рядок
data.forEach(...)        // 💥 TypeError якщо data не масив
```

В JS ти не знаєш що прийшло ззовні — і дізнаєшся про помилку тільки в рантаймі.

---

## 📖 Теорія

### Тип `unknown`

`unknown` перекладається як "невідомий". Це **безпечна версія `any`**.

Різниця одна, але принципова:
- `any` — TypeScript **вимикає перевірки**. Роби що хочеш.
- `unknown` — TypeScript **вимагає перевірити тип** перш ніж щось робити.

```ts
// any — TS мовчить, навіть якщо це нісенітниця
const a: any = "hello";
a.toFixed(2);     // TS не лається, хоча це метод числа!
a.foo.bar.baz;    // TS не лається! Все дозволено.

// unknown — TS змушує перевірити
const u: unknown = "hello";
u.toUpperCase();  // ❌ Помилка: не можна викликати методи на unknown
u.length;         // ❌ Помилка: не можна звертатися до властивостей

// Спочатку перевіряємо — потім використовуємо
if (typeof u === "string") {
    u.toUpperCase(); // ✅ Тепер TS знає що u — рядок
}
```

**Аналогія з життя:**
`any` — це посилка без маркування, яку ти відкриваєш і суєш руку всередину.
`unknown` — посилка без маркування, яку ти спочатку просвічуєш на рентгені, а потім відкриваєш.

---

### Де використовується `unknown`

**1. Обробка помилок в try/catch**

```ts
try {
    // щось небезпечне
} catch (error) {
    // В TS 4.0+ error має тип unknown (раніше був any)
    // Не можна просто написати error.message — потрібно перевірити

    if (error instanceof Error) {
        console.log(error.message); // ✅
    }
}
```

**2. Дані із зовнішніх джерел**

```ts
function parseConfig(json: string): unknown {
    return JSON.parse(json); // повертаємо unknown, а не any
}

const config = parseConfig('{"port": 3000}');

// Не можна одразу використовувати:
config.port; // ❌ Помилка

// Потрібно перевірити:
if (typeof config === "object" && config !== null && "port" in config) {
    console.log(config.port); // ✅
}
```

---

### Тип `never`

`never` — це **порожній тип**. Значення типу `never` **не може існувати**.

Ти вже бачив `never` в уроці 7 (exhaustiveness check). Але є ще випадки:

**1. Функція яка ніколи не повертає**

```ts
// Завжди кидає помилку
function fail(message: string): never {
    throw new Error(message);
}

// Нескінченний цикл
function forever(): never {
    while (true) {
        // слухаємо події сервера...
    }
}
```

**2. Неможлива гілка коду**

```ts
function process(value: string | number) {
    if (typeof value === "string") {
        // value: string
    } else if (typeof value === "number") {
        // value: number
    } else {
        // value: never — TypeScript знає що сюди не можна потрапити
        // Ця гілка "мертва"
    }
}
```

**3. Exhaustiveness check (з уроку 7)**

```ts
function assertNever(value: never): never {
    throw new Error(`Необроблений випадок: ${JSON.stringify(value)}`);
}
```

---

### `never` vs `void` vs `unknown` vs `any`

| Тип | Значення | Можна присвоїти | Можна використовувати |
|---|---|---|---|
| `any` | все що завгодно | що завгодно | що завгодно (без перевірок) |
| `unknown` | невідомо що | що завгодно | тільки після перевірки типу |
| `void` | undefined | тільки undefined | ні (тільки return) |
| `never` | не існує | нічого | — |

---

### Коли використовувати `unknown` замість `any`

**Правило:** завжди коли дані приходять ззовні і ти не знаєш їх тип:
```ts
// ❌ Погано — any вимикає всі перевірки
function handleApiResponse(data: any) {
    return data.users[0].name; // TS мовчить, але це може зламатися
}

// ✅ Добре — unknown змусить перевірити
function handleApiResponse(data: unknown) {
    if (
        typeof data === "object" &&
        data !== null &&
        "users" in data
    ) {
        // тепер безпечно
    }
}
```

---

## 🔍 JS vs TS

```js
// JS — жодних гарантій
function riskyOperation(value) {
    return value.toString(); // 💥 якщо value = null
}
```

```ts
// TS з unknown — компілятор змусить перевірити
function safeOperation(value: unknown): string {
    if (value === null || value === undefined) {
        return "порожньо";
    }
    return String(value); // ✅ безпечно
}
```

---

## 📝 Додаткові нотатки

*(Тут будуть з'являтися відповіді на твої питання)*
