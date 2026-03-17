# Нотатки — Урок 3: Наслідування

## Що таке контракт?

**Контракт** = домовленість: якщо клас каже `implements Interface` — зобов'язаний мати ВСЕ що в інтерфейсі описано.

```typescript
interface Payable {
  salary: number;
  pay(): void;
}

// ✅ OK — виконав контракт
class Employee implements Payable {
  salary = 1000;
  pay() { console.log("Виплата!"); }
}

// ❌ Помилка — не виконав контракт (немає pay())
class Contractor implements Payable {
  salary = 500;
  // TypeScript: "де pay()? Ти ж обіцяв!"
}
```

Простими словами: **інтерфейс = список вимог, implements = підпис під ними**.

## implements не замінює написання коду

`implements` — це страховка, не спосіб уникнути написання методів.
Ти все одно пишеш конструктор і методи сам — TypeScript просто перевіряє що нічого не забув.

## Як імплементувати кілька інтерфейсів

Просто через кому:

```typescript
class Document implements Printable, Saveable {
  print(): void { console.log("Друкую..."); }
  save(): string { return "Збережено"; }
}
```

TS перевірить що є **і** `print()` **і** `save()`.

---

```typescript
// БЕЗ implements — пишеш сам, ніхто не перевіряє
class Employee {
  salary = 1000;
  // забув pay() — TypeScript мовчить
}

// З implements — TypeScript слідкує
class Employee implements Payable {
  salary = 1000;
  // забув pay() — одразу помилка!
}
```
