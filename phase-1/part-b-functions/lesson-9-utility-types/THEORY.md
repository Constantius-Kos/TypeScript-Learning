# Урок 9: Utility Types — Partial, Pick, Omit, Record

**Статус:** В процессе
**Фаза:** 1 | **Часть:** B | **Урок:** 9 из 9
**Дата начала:** 3 марта 2026

---

## 📌 Тема урока

Utility Types — встроенные TypeScript-инструменты для трансформации типов. Вместо того чтобы каждый раз описывать новый тип с нуля, ты берёшь существующий и видоизменяешь его.

---

## 🎯 Цель урока

После урока ты сможешь:
- Использовать `Partial<T>` — сделать все поля необязательными
- Использовать `Required<T>` — сделать все поля обязательными
- Использовать `Pick<T, K>` — выбрать только нужные поля
- Использовать `Omit<T, K>` — исключить ненужные поля
- Использовать `Record<K, V>` — создать объект-словарь
- Понять ЗАЧЕМ они нужны в реальных проектах

---

## 🤔 Проблема в JavaScript

В JS нет типов вообще. Но даже в TypeScript без Utility Types ты сталкиваешься с дублированием:

```ts
// Есть тип User:
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Нужен тип для обновления пользователя — все поля опциональны
// БЕЗ Utility Types — дублируем всё вручную:
interface UserUpdate {
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}

// Нужен тип только с именем и email для формы входа
// БЕЗ Utility Types — снова дублируем:
interface LoginForm {
  email: string;
  // и где-то забыли поле или опечатка...
}
```

**Проблемы:**
1. **Дублирование кода** — меняешь `User`, надо помнить обновить все производные типы
2. **Рассинхронизация** — легко забыть поменять в одном из мест
3. **Больше кода** — чем больше проект, тем хуже

**Решение в TypeScript** — Utility Types: берёшь один "базовый" тип и трансформируешь его.

---

## 📖 Теория

### Что такое Utility Types?

Utility Types — это **встроенные generic-типы**, которые TypeScript предоставляет "из коробки". Они принимают тип как аргумент и возвращают новый, модифицированный тип.

Если generics — это шаблоны для функций (`function identity<T>(x: T): T`), то Utility Types — это шаблоны для типов.

---

### 1. `Partial<T>` — всё становится необязательным

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial делает ВСЕ поля опциональными (добавляет ? к каждому)
type UserUpdate = Partial<User>;

// Эквивалентно:
// type UserUpdate = {
//   id?: number;
//   name?: string;
//   email?: string;
// }
```

**Когда нужен:**
- Функции обновления (PATCH запросы) — передаёшь только то, что изменилось
- Формы с частичным заполнением
- Тестовые данные (заполняешь только нужные поля)

```ts
function updateUser(id: number, changes: Partial<User>): void {
  // changes может содержать только name, или только email, или ничего
  console.log(`Обновляем пользователя ${id}`, changes);
}

updateUser(1, { name: "Иван" });         // ✅ OK
updateUser(1, { email: "new@mail.com" }); // ✅ OK
updateUser(1, {});                        // ✅ OK (ничего не меняем)
updateUser(1, { name: "Иван", email: "new@mail.com" }); // ✅ OK
```

---

### 2. `Required<T>` — всё становится обязательным

Противоположность `Partial` — убирает `?` у всех полей.

```ts
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

// После загрузки конфига — все поля точно есть
type LoadedConfig = Required<Config>;

// Эквивалентно:
// type LoadedConfig = {
//   host: string;
//   port: number;
//   debug: boolean;
// }
```

**Когда нужен:**
- Тип до и после валидации
- Конфиг после инициализации с дефолтными значениями

---

### 3. `Pick<T, K>` — выбрать конкретные поля

`Pick` берёт тип `T` и оставляет только указанные ключи `K`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

// Для публичного профиля — только безопасные данные
type PublicProfile = Pick<User, "id" | "name">;

// Эквивалентно:
// type PublicProfile = {
//   id: number;
//   name: string;
// }

// Для формы входа
type LoginCredentials = Pick<User, "email" | "password">;
```

**Когда нужен:**
- API ответы — возвращаешь только нужные поля, не раскрываешь лишнее
- Формы — выбираешь только поля, которые редактирует пользователь
- Переиспользование — одна база, много представлений

---

### 4. `Omit<T, K>` — исключить конкретные поля

`Omit` — противоположность `Pick`. Берёт тип `T` и убирает указанные ключи `K`.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Тип для создания нового пользователя — без id и createdAt (они создаются сервером)
type CreateUserDto = Omit<User, "id" | "createdAt">;

// Эквивалентно:
// type CreateUserDto = {
//   name: string;
//   email: string;
//   password: string;
// }
```

**Pick vs Omit — когда что использовать:**
- Если нужно **мало полей** из большого типа → `Pick` (перечисляешь нужное)
- Если нужно **почти все поля**, исключив пару → `Omit` (перечисляешь ненужное)

```ts
// Из 10 полей нужно 2 → Pick (короче список)
type Preview = Pick<BigType, "title" | "image">;

// Из 10 полей нужно 8 → Omit (короче список)
type WithoutMeta = Omit<BigType, "createdAt" | "updatedAt">;
```

---

### 5. `Record<K, V>` — словарь (объект-маппинг)

`Record<K, V>` создаёт тип объекта, где:
- Ключи имеют тип `K`
- Значения имеют тип `V`

```ts
// Словарь: строковые ключи → числовые значения
type ScoreMap = Record<string, number>;

const scores: ScoreMap = {
  alice: 95,
  bob: 87,
  carol: 92,
};

// Словарь с конкретными ключами (Literal union)
type Status = "active" | "inactive" | "pending";
type UserCountByStatus = Record<Status, number>;

const counts: UserCountByStatus = {
  active: 42,
  inactive: 13,
  pending: 7,
  // TS потребует ВСЕ три ключа!
};
```

**Когда нужен:**
- Кэши и справочники (`Record<string, User>`)
- Маппинги статусов, кодов, ошибок
- Когда заранее знаешь ключи (Literal union) — гарантирует полноту

---

### Комбинирование Utility Types

Их можно комбинировать:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
}

// Форма редактирования: без id (его не меняем), все остальные — опциональны
type EditProductForm = Partial<Omit<Product, "id">>;

// Эквивалентно:
// type EditProductForm = {
//   name?: string;
//   price?: number;
//   description?: string;
//   stock?: number;
// }
```

---

## 🔍 JS vs TS сравнение

```js
// JavaScript — вообще нет защиты
function updateUser(id, changes) {
  // changes — это что угодно. Ты можешь передать { banana: true }
  // и JS не возразит
}
```

```ts
// TypeScript с Utility Types — точная типизация
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, changes: Partial<User>): void {
  // changes — только поля из User, все опциональные
  // { banana: true } → ошибка компиляции ✅
}
```

---

## ✍️ Практика

Задачи находятся в файле `practice.ts`.

---

## 📝 Дополнительные заметки

### ❓ Что такое DTO и как его использовать?

**DTO (Data Transfer Object)** — паттерн проектирования. Для каждой операции создаётся отдельный тип с ровно теми данными, которые нужны — не больше, не меньше.

**Зачем нужен:** у сущности `User` много полей, но разным операциям нужны разные подмножества:

| Операция | DTO |
|---|---|
| Регистрация | `CreateUserDto` — name, email, password |
| Вход | `LoginDto` — email, password |
| Обновление | `UpdateUserDto` — только изменяемые поля |
| Ответ API (список) | `UserPreviewDto` — id, name |
| Ответ API (профиль) | `UserResponseDto` — всё кроме password |

**Принципы:**
1. **Один DTO — одна операция**
2. **DTO — это граница системы** (данные входят / выходят)
3. **Внутри системы** работаем с полной моделью, **на границах** — с DTO

**Суффикс `Dto`** — соглашение команды, TypeScript не требует, но все сразу понимают назначение.

**Связь с Utility Types** — удобный инструмент для создания DTO без дублирования:
```ts
type CreateUserDto   = Omit<User, "id" | "createdAt">;       // убрать серверные поля
type UpdateUserDto   = Partial<Omit<User, "id">>;             // всё опционально, кроме id
type UserResponseDto = Omit<User, "password">;                // убрать секреты
type UserPreviewDto  = Pick<User, "id" | "name">;             // только для списка
```

---

**Создан:** 3 марта 2026
**Обновлён:** 3 марта 2026
