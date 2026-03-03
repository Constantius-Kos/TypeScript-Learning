# Нотатки — Урок 6: Type Guards

*(твої особисті нотатки по уроку)*

---

## ❓ Питання: `type ApiResponse = | {...} | {...}` — це union interface?

Так, по суті це **union з двох об'єктних типів**.

```ts
type ApiResponse =
  | { status: "success"; data: string[] }   // анонімний об'єктний тип
  | { status: "error"; message: string };   // анонімний об'єктний тип
```

Можна розписати через іменовані типи — результат той самий:
```ts
type Success  = { status: "success"; data: string[] };
type ApiError = { status: "error"; message: string };
type ApiResponse = Success | ApiError;
```

**Чому не interface?**
Interface не вміє робити `|` сам по собі.
Для union завжди потрібен `type`:
```ts
interface Success { ... }
interface ApiError { ... }
type ApiResponse = Success | ApiError; // ← type обов'язковий для union
```

---

## ❓ Питання: навіщо ведучий `|` в `type X = | {...} | {...}`?

Жодної різниці — це суто стиль форматування.

```ts
// одне і те саме:
type ApiResponse = { status: "success" } | { status: "error" };

type ApiResponse =
  | { status: "success" }
  | { status: "error" };
```

Ведучий `|` використовують коли варіантів багато — кожен на своєму рядку, легше читати.
Сучасний TS-код частіше використовує ведучий `|`.
