# Урок 4 — Generics просунуті

## 🎯 Мета
Після цього уроку ти зможеш:
- Обмежувати дженерики через `extends`
- Створювати generic класи та інтерфейси
- Використовувати кілька type параметрів
- Читати типізацію React (`useState<T>`, пропси)

---

## 📖 Теорія

### 1. Generic constraints — обмеження через `extends`

Базовий дженерик приймає **будь-який** тип:
```ts
function identity<T>(value: T): T {
  return value;
}
```

Але іноді треба щоб `T` мав певні властивості:
```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length; // TS знає що length існує
}

getLength("hello");   // ✅
getLength([1, 2, 3]); // ✅
getLength(42);        // ❌ number не має length
```

`extends` тут = "T повинен мати хоча б ці властивості".

---

### 2. Generic інтерфейси

```ts
interface Repository<T> {
  findById(id: number): T;
  save(item: T): void;
  getAll(): T[];
}
```

Потім реалізуєш для конкретного типу:
```ts
class UserRepository implements Repository<User> {
  findById(id: number): User { ... }
  save(item: User): void { ... }
  getAll(): User[] { ... }
}
```

---

### 3. Generic класи

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push("hello"); // ❌ помилка
```

---

### 4. Кілька type параметрів

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

pair("name", "John");  // [string, string]
pair("age", 25);       // [string, number]
```

---

### 5. Як це виглядає в React

```ts
// useState — generic під капотом:
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useRef:
const inputRef = useRef<HTMLInputElement>(null);
```

---

## 📝 Додаткові заметки
