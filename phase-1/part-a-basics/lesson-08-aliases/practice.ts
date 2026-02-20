/**
 * УРОК 8: Type Aliases (Псевдонимы типов)
 * 
 * Type Alias — это "второе имя" для типа.
 * Создаётся через ключевое слово `type`:
 * 
 *   type ИмяТипа = определение;
 * 
 * Зачем:
 * - Убирает дублирование сложных типов
 * - Делает код читаемым (type UserID понятнее чем string)
 * - Изменение в одном месте обновляет всё
 * 
 * Примеры:
 *   type UserID = string;
 *   type Status = "active" | "inactive";
 *   type Point = { x: number; y: number };
 */

export { }; // Делаем файл модулем, чтобы избежать конфликтов имён

// --- ПРИМЕРЫ ---

// Alias для примитива — код становится понятнее
type ExampleID = string;
const exampleUserId: ExampleID = "usr-001";

// Alias для union — описываем один раз, используем везде
type ExampleDirection = "up" | "down" | "left" | "right";
const move: ExampleDirection = "up";

// Alias для объекта — работает как interface
type ExamplePoint = {
    x: number;
    y: number;
};
const origin: ExamplePoint = { x: 0, y: 0 };


/**
 * =============================================
 * ЗАДАНИЕ 1: Разминка — Именуем типы (5-7 минут)
 * =============================================
 *
 * 1. Создай type alias 'Username' для string
 * 2. Создай type alias 'Score' для number
 * 3. Создай type alias 'IsOnline' для boolean
 * 4. Создай переменные каждого типа и присвой им значения
 * 5. Создай type alias 'Theme' для union: "light" | "dark" | "system"
 * 6. Создай переменную currentTheme типа Theme
 */

// TODO: Ваш код здесь
type Username = string;
type Score = number;
type IsOnline = boolean;
const name: Username = 'Petro';
const userScore: Score = 50;
const userStatus: IsOnline = false;

type Theme = 'light' | 'dark' | 'system'
const appTheme: Theme = 'dark'

/**
 * =============================================
 * ЗАДАНИЕ 2: Основное — Карточка игрока (10-15 минут)
 * =============================================
 *
 * Ты делаешь онлайн-игру. Нужно описать игрока.
 *
 * 1. Создай type alias 'PlayerID' для string
 * 2. Создай type alias 'PlayerRole' для union: "warrior" | "mage" | "archer" | "healer"
 * 3. Создай type alias 'PlayerStatus' для union: "online" | "offline" | "in-battle"
 * 4. Создай type alias 'Player' для объекта со свойствами:
 *    - id: PlayerID (используй свой alias!)
 *    - nickname: string
 *    - role: PlayerRole (используй свой alias!)
 *    - level: number
 *    - status: PlayerStatus (используй свой alias!)
 *    - guild?: string (опциональное — помнишь из урока 6?)
 * 5. Создай двух игроков: один в гильдии, другой без
 * 6. Напиши функцию 'describePlayer', которая принимает Player
 *    и возвращает string с описанием вида:
 *    "PlayerName (warrior, level 10) — online"
 */

// TODO: Ваш код здесь
type PlayerId = string;
type PlayerRole = "warrior" | "mage" | "archer" | "healer";
type PlayerStatus = 'online' | 'offline' | 'in-battle';
type Player = {
    id: PlayerId,
    nickname: string,
    role: PlayerRole,
    level: number,
    status: PlayerStatus,
    guild?: string
}

const playerOne: Player = {
    id: '123',
    nickname: 'Zadrot',
    role: 'warrior',
    level: 1,
    status: 'online',
}

const playerTwo: Player = {
    id: '1234',
    nickname: 'Piska',
    role: 'mage',
    level: 10,
    status: 'offline',
    guild: 'Killers'
}
function describePlayer(player: Player): string {
    return `"${player.nickname} (${player.role}, level ${player.level} - ${player.status} )"`
}
describePlayer(playerTwo)

/**
 * =============================================
 * ЗАДАНИЕ 3: Челлендж — Система заказов (15-20 минут)
 * =============================================
 *
 * Ты строишь систему для доставки еды. Используй ВСЁ что знаешь:
 * type aliases, optional свойства, readonly, union types.
 *
 * 1. Создай type alias 'OrderID' для string
 * 2. Создай type alias 'OrderStatus' для union:
 *    "created" | "preparing" | "delivering" | "delivered" | "cancelled"
 * 3. Создай type alias 'PaymentMethod' для union:
 *    "card" | "cash" | "online"
 * 4. Создай type alias 'OrderItem' для объекта:
 *    - name: string
 *    - price: number
 *    - quantity: number
 * 5. Создай type alias 'Order' для объекта:
 *    - readonly id: OrderID
 *    - items: OrderItem[]  (массив OrderItem!)
 *    - status: OrderStatus
 *    - payment: PaymentMethod
 *    - deliveryAddress: string
 *    - comment?: string  (опциональный комментарий)
 *    - readonly createdAt: string
 * 6. Создай один объект заказа со всеми полями
 * 7. Напиши функцию 'getOrderTotal', которая принимает Order
 *    и возвращает общую сумму (price * quantity для каждого item)
 * 8. Напиши функцию 'getOrderSummary', которая принимает Order
 *    и возвращает строку вида:
 *    "Заказ #id: 3 позиции, сумма: 1500, статус: delivering"
 */

// TODO: Ваш код здесь
type OrderId = string;
type OrderStatus = 'created' | 'preparing' | 'delivering' | 'delivered' | 'canceled';
type PaymentMethod = 'card' | 'cash' | 'online';
type OrderItem = {
    name: string,
    price: number,
    quantity: number
}
type Order = {
    readonly id: OrderId,
    items: OrderItem[],
    status: OrderStatus,
    payment: PaymentMethod,
    deliveryAdress: string,
    comment?: string,
    readonly createdAdd: string,
}

const order: Order = {
    id: '123',
    items: [{ name: 'pizza', price: 10, quantity: 2 }, { name: 'Coca-Cola', price: 5, quantity: 4 }],
    status: 'delivering',
    payment: 'cash',
    deliveryAdress: 'Huevo-Kukuevo',
    comment: 'comment',
    createdAdd: '10.01.2026T4:20:00'
}

function getOrderTotal(order: Order): number {
    return order.items.reduce((acc, item) => { return acc + (item.price * item.quantity) }, 0)
}

function getOrderSummary(order: Order): string {
    return `Заказ #${order.id}: ${order.items.length.toString()} позиции, сумма ${getOrderTotal(order)},
 cтатус: ${order.status}`
}