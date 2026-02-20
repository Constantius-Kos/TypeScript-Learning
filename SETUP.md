# 🛠️ Инструкция по настройке проекта

## Шаг 1: Установка зависимостей

Открой терминал в папке проекта и выполни:

```bash
npm install
```

Это установит TypeScript локально для проекта.

---

## Шаг 2: Проверка установки

Проверь версию TypeScript:

```bash
npx tsc --version
```

Должна появиться версия TypeScript (например, `Version 5.7.2`).

---

## Шаг 3: Настройка VS Code (опционально, но рекомендуется)

### Установи расширения:
1. **TypeScript** (обычно встроено)
2. **ESLint** (для проверки кода)
3. **Error Lens** (для удобной подсветки ошибок)

### Включи автосохранение:
- `File > Auto Save` (поставь галочку)

---

## Шаг 4: Первый тест

Создай файл `test.ts` с содержимым:

```typescript
const message: string = "Hello, TypeScript!";
console.log(message);
```

Скомпилируй:

```bash
npx tsc test.ts
```

Запусти:

```bash
node test.js
```

Должно вывести: `Hello, TypeScript!`

---

## Шаг 5: Начни обучение

Теперь ты готов! Открой файл `START_HERE.md` и следуй инструкциям.

---

## Полезные команды

```bash
# Скомпилировать все .ts файлы
npm run build

# Запустить компиляцию в режиме отслеживания
npm run watch

# Скомпилировать конкретный файл
npx tsc path/to/file.ts
```

---

## Структура проекта

```
TypeScript/
├── .cursorrules          # Правила для AI ментора
├── README.md             # Твой прогресс
├── START_HERE.md         # Стартовый промпт
├── SETUP.md              # Эта инструкция
├── package.json          # Зависимости проекта
├── tsconfig.json         # Конфигурация TypeScript
├── phase-1/              # Фаза 1 обучения
│   ├── part-a-basics/    # Часть A: Основы
│   ├── part-b-functions/ # Часть B: Функции
│   └── final-project/    # Финальный проект
├── exercises/            # Практические задачи
└── notes/                # Твои заметки
```

---

## Что делать если что-то не работает?

### TypeScript не компилируется:
1. Проверь установку: `npx tsc --version`
2. Убедись что файл имеет расширение `.ts`
3. Проверь ошибки в терминале

### Ошибки в VS Code:
1. Перезапусти VS Code
2. Открой Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Введи: `TypeScript: Restart TS server`

---

**Всё готово? Отлично! Теперь иди в `START_HERE.md` 🚀**
