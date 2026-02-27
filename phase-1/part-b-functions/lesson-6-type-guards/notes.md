# Заметки — Урок 6: Type Guards

*(твои личные заметки по уроку)*

---

## ❓ Вопрос: `type ApiResponse = | {...} | {...}` — это union interface?

Да, по сути это **union из двух объектных типов**.

```ts
type ApiResponse =
  | { status: "success"; data: string[] }   // анонимный объектный тип
  | { status: "error"; message: string };   // анонимный объектный тип
```

Можно расписать через именованные типы — результат тот же:
```ts
type Success  = { status: "success"; data: string[] };
type ApiError = { status: "error"; message: string };
type ApiResponse = Success | ApiError;
```

**Почему не interface?**
Interface не умеет делать `|` сам по себе.
Для union всегда нужен `type`:
```ts
interface Success { ... }
interface ApiError { ... }
type ApiResponse = Success | ApiError; // ← type обязателен для union
```

---

## ❓ Вопрос: зачем ведущий `|` в `type X = | {...} | {...}`?

Никакой разницы — это чисто стиль форматирования.

```ts
// одно и то же:
type ApiResponse = { status: "success" } | { status: "error" };

type ApiResponse =
  | { status: "success" }
  | { status: "error" };
```

Ведущий `|` используют когда вариантов много — каждый на своей строке, легче читать.
Современный TS-код чаще использует ведущий `|`.
