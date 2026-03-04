// ============================================================
// Урок B9: Utility Types — Partial, Pick, Omit, Record
// ============================================================

export {};

// Базовый тип — используется во всех задачах
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
}

// ============================================================
// ЗАДАЧА 1 — Разминка: Partial и Required
// ============================================================
// Создай два производных типа от User:
//   - UserUpdate: все поля User опциональны (для PATCH-запросов)
//   - StrictUser: все поля User обязательны (если вдруг были ? в оригинале)
//
// Затем напиши функцию updateUser(id: number, changes: UserUpdate): void
// Она должна просто выводить в консоль: "Обновляем #${id}" и changes
//
// Проверь что работает:
//   updateUser(1, { name: "Иван" })
//   updateUser(2, { email: "new@mail.com", age: 30 })
//   updateUser(3, {})

// 👇 Пиши здесь:

// ============================================================
// ЗАДАЧА 2 — Pick: публичный профиль и форма входа
// ============================================================
// У нас есть User. Создай два типа через Pick:
//   - PublicProfile: только id, name, age (безопасно показывать всем)
//   - LoginCredentials: только email и password
//
// Напиши функцию getPublicProfile(user: User): PublicProfile
// Она возвращает объект только с нужными полями.

// 👇 Пиши здесь:

// ============================================================
// ЗАДАЧА 3 — Omit: создание пользователя
// ============================================================
// При создании нового пользователя — id и createdAt задаёт сервер.
// Создай тип CreateUserDto через Omit (исключи id и createdAt).
//
// Напиши функцию createUser(data: CreateUserDto): User
// Она возвращает полный User, добавив:
//   - id: Math.floor(Math.random() * 1000)
//   - createdAt: new Date()
//
// Проверь что TS не даёт передать id или createdAt в createUser()

// 👇 Пиши здесь:

// ============================================================
// ЗАДАЧА 4 — Record: справочник статусов
// ============================================================
// Есть статусы задач: "todo" | "in-progress" | "done" | "cancelled"
// Создай тип TaskStatus как union этих строк.
//
// Создай тип StatusLabels = Record<TaskStatus, string>
// Это словарь: каждый статус → его русское название
//
// Заполни объект statusLabels типа StatusLabels:
//   todo → "К выполнению"
//   in-progress → "В работе"
//   done → "Готово"
//   cancelled → "Отменено"
//
// Напиши функцию getStatusLabel(status: TaskStatus): string

// 👇 Пиши здесь:

// ============================================================
// ЗАДАЧА 5 — Челлендж: комбинирование (Partial + Omit)
// ============================================================
// Представь форму редактирования профиля пользователя.
// Пользователь не может менять id, email и createdAt.
// Но все остальные поля — необязательны (он может изменить только имя).
//
// 1. Создай тип EditProfileForm = Partial<Omit<User, "id" | "email" | "createdAt">>
//
// 2. Напиши функцию applyProfileEdit(user: User, form: EditProfileForm): User
//    Она возвращает новый объект User, применив изменения из form.
//    Подсказка: используй spread: { ...user, ...form }
//
// 3. Проверь работу:
//    const user: User = { id: 1, name: "Анна", email: "anna@mail.com",
//                         password: "secret", age: 25, createdAt: new Date() };
//    const updated = applyProfileEdit(user, { name: "Анна Иванова", age: 26 });
//    console.log(updated);

// 👇 Пиши здесь:
