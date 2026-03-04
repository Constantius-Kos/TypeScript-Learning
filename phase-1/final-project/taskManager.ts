export { };

// ============================================================
// 🏆 ФИНАЛЬНЫЙ ПРОЕКТ: TypeScript Task Manager
// ============================================================
// Используй всё что изучил в Фазе 1.
// Двигайся этап за этапом. Не спеши.
// ============================================================


// ============================================================
// ЭТАП 1 — Типы и интерфейсы
// ============================================================
// Задача: описать структуру данных приложения.
//
// 1a. Создай тип TaskStatus — задача может быть:
//     'todo' | 'in-progress' | 'done'
//
// 1b. Создай тип TaskPriority:
//     'low' | 'medium' | 'high'
//
// 1c. Создай интерфейс Task со свойствами:
//     - id: number (readonly — нельзя менять после создания)
//     - title: string
//     - description: string (опциональное)
//     - status: TaskStatus
//     - priority: TaskPriority
//     - createdAt: Date (readonly)
//
// Напиши здесь:
type TaskStatus = 'todo' | 'in-progress' | 'done'
type TaskPriority = 'low' | 'medium' | 'high'
interface Task {
    readonly id: number,
    title: string,
    description?: string,
    status: TaskStatus,
    priority: TaskPriority,
    readonly createdAt: Date
}



// ============================================================
// ЭТАП 2 — Хранилище и добавление задач
// ============================================================
// Задача: создать хранилище и функцию добавления.
//
// 2a. Создай тип TaskInput — это Task без 'id' и 'createdAt'
//     (подсказка: Omit)
//
// 2b. Создай переменную tasks — массив Task (пустой)
//
// 2c. Создай переменную nextId: number = 1
//
// 2d. Напиши функцию addTask(input: TaskInput): Task
//     - создаёт объект Task (id = nextId++, createdAt = new Date())
//     - добавляет в tasks
//     - возвращает созданную задачу
//
// 2e. Напиши функцию getAllTasks(): Task[]
//     - возвращает все задачи
//
// Напиши здесь:
type TaskInput = Omit<Task, 'id' | 'createdAt'>
const tasks: Task[] = []
let nextId: number = 1
function addTask(input: TaskInput): Task {
    let newTask = { ...input, id: nextId++, createdAt: new Date() }
    tasks.push(newTask)
    return newTask
}
function getAllTasks(): Task[] {
    return tasks
}
// ============================================================
// ЭТАП 3 — Обновление и удаление
// ============================================================
// Задача: изменять и удалять задачи.
//
// 3a. Напиши функцию updateTask(id: number, changes: Partial<Task>): Task | undefined
//     - находит задачу по id
//     - применяет изменения (через spread: { ...task, ...changes })
//     - НО не позволяет менять id и createdAt (игнорируй их из changes)
//     - возвращает обновлённую задачу или undefined если не найдена
//
// 3b. Напиши функцию deleteTask(id: number): boolean
//     - удаляет задачу по id
//     - возвращает true если удалена, false если не найдена
//
// Напиши здесь:
function updateTask(id: number, changes: Omit<Partial<Task>, 'id' | 'createdAt'>): Task | undefined {
    let updatedTask = tasks.find((t) => t.id === id)
    if (updatedTask) {
        const index = tasks.findIndex((t) => t.id === updatedTask.id)
        const updated = { ...updatedTask, ...changes }
        tasks[index] = updated
        return updated
    }
    return undefined
}

function deleteTask(id: number): boolean {
    let deletedTask = tasks.find((t) => t.id === id)
    if (deletedTask) {
        const index = tasks.findIndex((t) => t.id === deletedTask.id)
        tasks.splice(index, 1);
        return true
    }
    return false
}


// ============================================================
// ЭТАП 4 — Фильтрация
// ============================================================
// Задача: искать задачи по разным критериям.
//
// 4a. Напиши функцию filterByStatus(status: TaskStatus): Task[]
//
// 4b. Напиши функцию filterByPriority(priority: TaskPriority): Task[]
//
// 4c. (Челлендж) Напиши функцию searchTasks(query: string): Task[]
//     - ищет по title и description (case-insensitive)
//     - подсказка: .toLowerCase().includes(...)
//
// Напиши здесь:




// ============================================================
// ЭТАП 5 — DTO и сводка
// ============================================================
// Задача: возвращать только нужные поля задачи.
//
// 5a. Создай тип TaskPreview — Pick из Task:
//     только id, title, status, priority
//
// 5b. Напиши функцию getTaskPreview(task: Task): TaskPreview
//     - возвращает только поля из TaskPreview
//
// 5c. Напиши функцию getSummary(): Record<TaskStatus, number>
//     - возвращает объект вида: { todo: 2, 'in-progress': 1, done: 3 }
//     - количество задач в каждом статусе
//
// Напиши здесь:




// ============================================================
// ПРОВЕРКА — запусти и убедись что всё работает
// ============================================================
// Раскомментируй после того как напишешь все этапы:

// const t1 = addTask({ title: "Изучить TypeScript", status: "todo", priority: "high" });
// const t2 = addTask({ title: "Сделать проект", description: "Task Manager", status: "in-progress", priority: "medium" });
// const t3 = addTask({ title: "Написать тесты", status: "todo", priority: "low" });

// console.log("Все задачи:", getAllTasks());
// console.log("Todo задачи:", filterByStatus("todo"));
// updateTask(t1.id, { status: "done" });
// console.log("После обновления:", getTaskPreview(getAllTasks()[0]));
// console.log("Сводка:", getSummary());
