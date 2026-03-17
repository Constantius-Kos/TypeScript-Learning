# Урок 3 — Наслідування: extends та implements

## 🎯 Мета
Навчитись будувати ієрархії класів та описувати контракти через інтерфейси.

---

## 📖 Теорія

### extends — наслідування класу
Дозволяє одному класу отримати властивості та методи іншого.

```typescript
class Animal {
  constructor(public name: string) {}

  speak(): string {
    return `${this.name} робить звук`;
  }
}

class Dog extends Animal {
  // перевизначаємо метод батька
  speak(): string {
    return `${this.name} гавкає`;
  }
}

const dog = new Dog("Рекс");
dog.speak(); // "Рекс гавкає"
```

### super — виклик батьківського конструктора
Якщо дочірній клас має конструктор — обов'язково викликати `super()`.

```typescript
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // передаємо name в батьківський конструктор
  }
}
```

### implements — контракт інтерфейсу
Клас зобов'язується реалізувати всі поля та методи інтерфейсу.

```typescript
interface Flyable {
  altitude: number;
  fly(): void;
}

class Bird implements Flyable {
  altitude = 100;

  fly(): void {
    console.log("Летить!");
  }
}
```

### Різниця extends vs implements

| | extends | implements |
|---|---|---|
| Що це | Наслідує клас | Виконує контракт |
| Код передається | ✅ Так | ❌ Ні |
| Можна кілька | ❌ Ні | ✅ Так |
| Звідки | Клас | Інтерфейс |

---

## 📝 Додаткові нотатки
<!-- Відповіді на запитання студента з'являться тут -->
