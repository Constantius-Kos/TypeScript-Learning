export { };

// ============================================================
// 🛒 САМОСТОЯТЕЛЬНЫЙ ПРОЕКТ: Shopping List
// ============================================================
// ТЗ:
// Нужен модуль для управления списком покупок.
// Каждый товар имеет: id, название, количество, цену за штуку,
// флаг "куплен или нет".
//
// Нужно реализовать:
// 1. Интерфейс товара (Item)
// 2. Тип для добавления товара (без id — он генерируется автоматически)
// 3. Хранилище товаров (массив) и счётчик id
// 4. addItem(...)       — добавить товар в список
// 5. markAsPurchased(id) — отметить товар как купленный
// 6. removeItem(id)     — удалить товар
// 7. getAllItems()      — получить все товары
// 8. getTotalSum()     — сумма ВСЕХ товаров (amount * price)
// 9. getPurchasedSum() — сумма только КУПЛЕННЫХ товаров
//
// В конце: раскомментируй блок проверки и запусти:
// npx ts-node practice-projects/shopping-list.ts
// ============================================================


// Шаг 1 — Интерфейс и типы
// Напиши здесь:
interface Item {
    readonly id: string,
    name: string,
    amount: number,
    price: number,
    purchased: boolean
}

type NewItem = Omit<Item, 'id' | 'purchased'>



// Шаг 2 — Хранилище
// Напиши здесь:
let items: Item[] = []

// Шаг 3 — Функции
// Напиши здесь:

function addItem(item: NewItem): Item {
    const newItem = { ...item, id: String(Math.floor(Math.random() * 1000)), purchased: false }
    items.push(newItem)
    return newItem
}

function markAsPurchased(id: string): void {
    const item = items.find((i) => i.id === id)
    if (item) { item.purchased = true }
}

function removeItem(id: string): void {
    items = items.filter((i) => i.id !== id)
}
function getAllItems(): Item[] {
    return items
}
function getTotalSum(): number {
    return items.reduce((acc, i) => { acc += (i.amount * i.price); return acc }, 0)
}
function getPurchasedSum(): number {
    return items.reduce((acc, i) => { i.purchased ? acc += (i.amount * i.price) : ''; return acc }, 0)
}



// ============================================================
// ПРОВЕРКА — раскомментируй когда всё готово
// ============================================================
const milk = addItem({ name: "Молоко", amount: 3, price: 80 });
const bread = addItem({ name: "Хлеб", amount: 2, price: 45 });
const eggs = addItem({ name: "Яйца", amount: 1, price: 120 });

markAsPurchased(milk.id);
markAsPurchased(bread.id);
console.log("Все товары:", getAllItems());
console.log("Общая сумма:", getTotalSum());
console.log("Куплено на:", getPurchasedSum());
removeItem(eggs.id);
console.log("После удаления:", getAllItems());