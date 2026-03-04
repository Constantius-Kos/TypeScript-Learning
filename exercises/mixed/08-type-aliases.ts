/**
 * УРОК 8: Type Aliases (Псевдонимы типов)
 */

export {};

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
