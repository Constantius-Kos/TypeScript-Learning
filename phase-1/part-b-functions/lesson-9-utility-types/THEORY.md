# Урок 9: Utility Types — Partial, Pick, Omit, Record

**Статус:** В процесі
**Фаза:** 1 | **Частина:** B | **Урок:** 9 з 9
**Дата початку:** 3 березня 2026

---

## 📌 Тема уроку

Utility Types — вбудовані TypeScript-інструменти для трансформації типів. Замість того щоб кожного разу описувати новий тип з нуля, ти береш існуючий і видозмінюєш його.

---

## 🎯 Ціль уроку

Після уроку ти зможеш:
- Використовувати `Partial<T>` — зробити всі поля необов'язковими
- Використовувати `Required<T>` — зробити всі поля обов'язковими
- Використовувати `Pick<T, K>` — вибрати тільки потрібні поля
- Використовувати `Omit<T, K>` — виключити непотрібні поля
- Використовувати `Record<K, V>` — створити об'єкт-словник
- Зрозуміти НАВІЩО вони потрібні в реальних проектах

---

## 🤔 Проблема в JavaScript

В JS немає типів взагалі. Але навіть у TypeScript без Utility Types ти стикаєшся з дублюванням:

```ts
// Є тип User:
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Потрібен тип для оновлення користувача — всі поля опціональні
// БЕЗ Utility Types — дублюємо все вручну:
interface UserUpdate {
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}

// Потрібен тип тільки з іменем та email для форми входу
// БЕЗ Utility Types — знову дублюємо:
interface LoginForm {
  email: string;
  // і десь забули поле або опечатка...
}
```

**Проблеми:**
1. **Дублювання коду** — змінюєш `User`, треба пам'ятати оновити всі похідні типи
2. **Розсинхронізація** — легко забути змінити в одному з місць
3. **Більше коду** — чим більший проект, тим гірше

**Рішення в TypeScript** — Utility Types: береш один "базовий" тип і трансформуєш його.

---

## 📖 Теорія

### Що таке Utility Types?

Utility Types — це **вбудовані generic-типи**, які TypeScript надає "з коробки". Вони приймають тип як аргумент і повертають новий, модифікований тип.

Якщо generics — це шаблони для функцій (`function identity<T>(x: T): T`), то Utility Types — це шаблони для типів.

---

### 1. `Partial<T>` — все стає необов'язковим

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial робить ВСІ поля опціональними (додає ? до кожного)
type UserUpdate = Partial<User>;

// Еквівалентно:
// type UserUpdate = {
//   id?: number;
//   name?: string;
//   email?: string;
// }
```

**Коли потрібен:**
- Функції оновлення (PATCH запити) — передаєш тільки те, що змінилося
- Форми з частковим заповненням
- Тестові дані (заповнюєш тільки потрібні поля)

```ts
function updateUser(id: number, changes: Partial<User>): void {
  // changes може містити тільки name, або тільки email, або нічого
  console.log(`Оновлюємо користувача ${id}`, changes);
}

updateUser(1, { name: "Іван" });         // ✅ OK
updateUser(1, { email: "new@mail.com" }); // ✅ OK
updateUser(1, {});                        // ✅ OK (нічого не змінюємо)
updateUser(1, { name: "Іван", email: "new@mail.com" }); // ✅ OK
```

---

### 2. `Required<T>` — все стає обов'язковим

Протилежність `Partial` — прибирає `?` у всіх полів.

```ts
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

// Після завантаження конфігу — всі поля точно є
type LoadedConfig = Required<Config>;

// Еквівалентно:
// type LoadedConfig = {
//   host: string;
//   port: number;
//   debug: boolean;
// }
```

**Коли потрібен:**
- Тип до і після валідації
- Конфіг після ініціалізації з дефолтними значеннями

---

### 3. `Pick<T, K>` — вибрати конкретні поля

`Pick` бере тип `T` і залишає тільки вказані ключі `K`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

// Для публічного профілю — тільки безпечні дані
type PublicProfile = Pick<User, "id" | "name">;

// Еквівалентно:
// type PublicProfile = {
//   id: number;
//   name: string;
// }

// Для форми входу
type LoginCredentials = Pick<User, "email" | "password">;
```

**Коли потрібен:**
- API відповіді — повертаєш тільки потрібні поля, не розкриваєш зайве
- Форми — вибираєш тільки поля, які редагує користувач
- Повторне використання — одна база, багато представлень

---

### 4. `Omit<T, K>` — виключити конкретні поля

`Omit` — протилежність `Pick`. Бере тип `T` і прибирає вказані ключі `K`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Тип для створення нового користувача — без id та createdAt (вони створюються сервером)
type CreateUserDto = Omit<User, "id" | "createdAt">;

// Еквівалентно:
// type CreateUserDto = {
//   name: string;
//   email: string;
//   password: string;
// }
```

**Pick vs Omit — коли що використовувати:**
- Якщо потрібно **мало полів** з великого типу → `Pick` (перелічуєш потрібне)
- Якщо потрібно **майже всі поля**, виключивши пару → `Omit` (перелічуєш непотрібне)

```ts
// З 10 полів потрібно 2 → Pick (коротший список)
type Preview = Pick<BigType, "title" | "image">;

// З 10 полів потрібно 8 → Omit (коротший список)
type WithoutMeta = Omit<BigType, "createdAt" | "updatedAt">;
```

---

### 5. `Record<K, V>` — словник (об'єкт-маппінг)

`Record<K, V>` створює тип об'єкта, де:
- Ключі мають тип `K`
- Значення мають тип `V`

```ts
// Словник: рядкові ключі → числові значення
type ScoreMap = Record<string, number>;

const scores: ScoreMap = {
  alice: 95,
  bob: 87,
  carol: 92,
};

// Словник з конкретними ключами (Literal union)
type Status = "active" | "inactive" | "pending";
type UserCountByStatus = Record<Status, number>;

const counts: UserCountByStatus = {
  active: 42,
  inactive: 13,
  pending: 7,
  // TS вимагатиме ВСІ три ключі!
};
```

**Коли потрібен:**
- Кеші та довідники (`Record<string, User>`)
- Маппінги статусів, кодів, помилок
- Коли заздалегідь знаєш ключі (Literal union) — гарантує повноту

---

### Комбінування Utility Types

Їх можна комбінувати:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

// Форма редагування: без id (його не змінюємо), всі інші — опціональні
type EditProductForm = Partial<Omit<Product, "id">>;

// Еквівалентно:
// type EditProductForm = {
//   name?: string;
//   price?: number;
//   description?: string;
//   stock?: number;
// }
```

---

## 🔍 JS vs TS порівняння

```js
// JavaScript — взагалі немає захисту
function updateUser(id, changes) {
  // changes — це що завгодно. Можна передати { banana: true }
  // і JS не заперечить
}
```

```ts
// TypeScript з Utility Types — точна типізація
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, changes: Partial<User>): void {
  // changes — тільки поля з User, всі опціональні
  // { banana: true } → помилка компіляції ✅
}
```

---

## ✍️ Практика

Задачі знаходяться у файлі `practice.ts`.

---

## 📝 Додаткові нотатки

### ❓ Що таке DTO і як його використовувати?

**DTO (Data Transfer Object)** — патерн проектування. Для кожної операції створюється окремий тип з рівно тими даними, які потрібні — не більше, не менше.

**Навіщо потрібен:** у сутності `User` багато полів, але різним операціям потрібні різні підмножини:

| Операція | DTO |
|---|---|
| Реєстрація | `CreateUserDto` — name, email, password |
| Вхід | `LoginDto` — email, password |
| Оновлення | `UpdateUserDto` — тільки поля що змінюються |
| Відповідь API (список) | `UserPreviewDto` — id, name |
| Відповідь API (профіль) | `UserResponseDto` — все крім password |

**Принципи:**
1. **Один DTO — одна операція**
2. **DTO — це межа системи** (дані входять / виходять)
3. **Всередині системи** працюємо з повною моделлю, **на межах** — з DTO

**Суфікс `Dto`** — угода команди, TypeScript не вимагає, але всі одразу розуміють призначення.

**Зв'язок з Utility Types** — зручний інструмент для створення DTO без дублювання:
```ts
type CreateUserDto   = Omit<User, "id" | "createdAt">;       // прибрати серверні поля
type UpdateUserDto   = Partial<Omit<User, "id">>;             // все опціонально, крім id
type UserResponseDto = Omit<User, "password">;                // прибрати секрети
type UserPreviewDto  = Pick<User, "id" | "name">;             // тільки для списку
```

---

**Створено:** 3 березня 2026
**Оновлено:** 3 березня 2026
