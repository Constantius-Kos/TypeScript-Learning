# Урок 2: Модифікатори доступу

**Фаза:** 2 | **Частина:** Класи та ООП | **Статус:** В процесі

---

## 🎯 Ціль уроку

Після уроку ти зможеш:
- Розуміти різницю між public, private та protected
- Захищати внутрішні дані класу від зовнішнього доступу
- Розуміти навіщо це потрібно в реальних проектах

---

## 🤔 Проблема без модифікаторів

```ts
class BankAccount {
    constructor(public balance: number) {}
}

const acc = new BankAccount(1000);
acc.balance = -99999;  // ← нічого не заважає зламати дані
```

Будь-хто може змінити `balance` напряму — обійти всю логіку класу.

---

## 📖 Теорія

### public — відкрито для всіх (за замовчуванням)

```ts
class User {
    public name: string;  // доступно звідусіль

    constructor(name: string) {
        this.name = name;
    }
}

const user = new User("Алекс");
console.log(user.name);  // ✅
user.name = "Боб";       // ✅
```

`public` — значення за замовчуванням. Якщо не писати нічого — властивість публічна.

---

### private — тільки всередині класу

```ts
class BankAccount {
    private balance: number = 0;

    deposit(amount: number): void {
        this.balance += amount;  // ✅ всередині класу — можна
    }

    getBalance(): number {
        return this.balance;     // ✅ всередині класу — можна
    }
}

const acc = new BankAccount();
acc.deposit(1000);
console.log(acc.getBalance());  // ✅ через метод — можна
acc.balance = -99999;           // ❌ Помилка — private!
```

---

### protected — всередині класу та спадкоємців

```ts
class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    bark(): void {
        console.log(`${this.name} гавкає`);  // ✅ спадкоємець має доступ
    }
}

const dog = new Dog("Рекс");
dog.bark();         // ✅
console.log(dog.name);  // ❌ Помилка — protected, ззовні не доступно
```

---

## 🔍 Порівняння

| Модифікатор | Всередині класу | Спадкоємці | Ззовні |
|---|---|---|---|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |

---

## 💡 Реальний приклад

```ts
class User {
    private password: string;  // ніхто не може прочитати напряму
    public name: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    checkPassword(input: string): boolean {
        return this.password === input;  // перевіряємо тільки через метод
    }
}

const user = new User("Алекс", "secret123");
console.log(user.name);              // ✅ "Алекс"
console.log(user.password);          // ❌ Помилка — private
user.checkPassword("secret123");     // ✅ true
```

---

## ✍️ Практика

Дивись файл `practice.ts`

---

## 📝 Додаткові нотатки

*(з'являться по мірі питань)*

---

*Створено: 13 березня 2026*
