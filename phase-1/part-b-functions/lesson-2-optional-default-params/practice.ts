// ============================================================
// Урок 2: Optional и default параметры функций
// ============================================================
// Запуск: npx ts-node practice.ts
// ============================================================

// ------------------------------------------------------------
// Задача 1: РАЗМИНКА — Optional параметр (5-7 минут)
// ------------------------------------------------------------
// Напиши функцию printOrderInfo, которая принимает:
//   - orderId: number (обязательный)
//   - status: string (необязательный)
//
// Если status передан — выводи: "Заказ #[id]: [status]"
// Если status НЕ передан — выводи: "Заказ #[id]: статус неизвестен"
//
// Вызови функцию оба способами и убедись что оба работают.

// Твой код здесь:
function printOrderInfo(orderId: number, status?: string) {
  console.log(`заказ ${orderId}: ${status ?? 'статус неизвестен'} `);
}
printOrderInfo(123, 'отправлен');
printOrderInfo(123);
// ------------------------------------------------------------
// Задача 2: ОСНОВНАЯ — Default параметры (10-15 минут)
// ------------------------------------------------------------
// Напиши функцию calculateShipping, которая считает стоимость доставки.
// Параметры:
//   - weight: number (вес посылки в кг, обязательный)
//   - destination: string (направление, обязательный)
//   - express: boolean (экспресс-доставка, по умолчанию false)
//   - insurancePercent: number (страховка в %, по умолчанию 0)
//
// Логика (придумай сам):
//   - Базовая цена: weight * 100
//   - Если express=true: цена * 2
//   - Страховка добавляется как процент от итоговой цены
//   - Функция возвращает объект: { destination, totalCost, express }
//
// Вызови функцию 3 раза:
//   1. Только weight и destination
//   2. С express=true
//   3. Со всеми параметрами

// Сначала объяви тип возвращаемого объекта:
type ShippingResult = {
  destination: string,
  totalCost: number,
  express: boolean
  // заполни сам
};

// Твоя функция:
function calculateShipping(weight: number, destination: string, express: boolean = false, insurancePercent: number = 0): ShippingResult {
  return {
    destination,
    totalCost: weight * 100 * (express ? 2 : 1) * (1 + insurancePercent / 100),
    express
  }
}

console.log(calculateShipping(7, 'Huevo Kukuevo'));
console.log(calculateShipping(6, ' Huevo Kukuevo', true));
console.log(calculateShipping(5, 'Huevo Kukuevo', true, 10));
console.log(calculateShipping(5, 'Huevo Kukuevo', false, 10));
// ------------------------------------------------------------
// Задача 3: ЧЕЛЛЕНДЖ — Комбинируй optional и default (15-20 мин)
// ------------------------------------------------------------
// Напиши функцию buildApiUrl которая собирает URL для API запроса.
// Параметры:
//   - baseUrl: string (обязательный, например "https://api.example.com")
//   - endpoint: string (обязательный, например "/users")
//   - version: string (по умолчанию "v1")
//   - queryParams?: Record<string, string> (необязательный — объект с параметрами запроса)
//
// Результат: строка-URL вида:
//   "https://api.example.com/v1/users"
//   "https://api.example.com/v2/products?limit=10&page=2"
//
// Подсказка: для queryParams используй Object.entries() и .join("&")
// Подсказка 2: Record<string, string> — это тип для объекта { ключ: строка }
//   Например: { limit: "10", page: "2" }
//
// Вызови 3 раза:
//   1. Только baseUrl и endpoint
//   2. С другой версией API
//   3. Со всеми параметрами включая queryParams

// Твой код здесь:
function buildApiUrl(baseUrl: string, endpoint: string, version: string = 'v1', queryParams?: Record<string, string>): string {
  return `${baseUrl}/${version}/${endpoint}${queryParams ? '?' + Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&') : ''}`
}

console.log(buildApiUrl('www.test.com', 'home'));
console.log(buildApiUrl('www.test.com', 'home', 'v2'));
console.log((buildApiUrl('www.test.com', 'home', 'v3', { page: 'cabinet', options: 'subcribes' })));
// ------------------------------------------------------------
// Задача 4: ЗАКРЕПЛЕНИЕ — Optional + default (10 мин)
// ------------------------------------------------------------
// Напиши функцию formatUserName, которая форматирует имя пользователя.
// Параметры:
//   - firstName: string (обязательный)
//   - lastName: string (обязательный)
//   - middleName?: string (необязательный — отчество)
//   - uppercase: boolean (по умолчанию false)
//
// Логика:
//   - Если middleName передан: "Фамилия Имя Отчество"
//   - Если не передан: "Фамилия Имя"
//   - Если uppercase=true — весь результат в верхнем регистре
//
// Подсказка: string.toUpperCase() переводит строку в верхний регистр
//
// Вызови 3 раза:
//   1. Только имя и фамилия
//   2. С отчеством
//   3. С отчеством и uppercase=true

// Твой код здесь:
function formatUserName(firstName: string, lastname: string, middleName?: string, uppercase: boolean = false): string {
  let username = middleName ? `${firstName} ${lastname} ${middleName}` : `${firstName} ${lastname}`
  return uppercase ? username.toUpperCase() : username
}
console.log((formatUserName('Vasya', 'Pupkin')));
console.log((formatUserName('Vasya', 'Pupkin', 'Srepanovich')));
console.log((formatUserName('Vasya', 'Pupkin', 'Stepanovich', true)));



// ------------------------------------------------------------
// Задача 5: ЗАКРЕПЛЕНИЕ — Работа с массивом и default (10 мин)
// ------------------------------------------------------------
// Напиши функцию getTopItems, которая возвращает первые N элементов массива.
// Параметры:
//   - items: string[] (обязательный — массив строк)
//   - count: number (по умолчанию 3 — сколько элементов вернуть)
//   - separator: string (по умолчанию ", " — разделитель в результате)
//
// Функция возвращает строку — элементы через разделитель.
//
// Подсказка: array.slice(0, count) возвращает первые count элементов массива
//
// Вызови 3 раза:
//   1. Только массив (берёт первые 3, через ", ")
//   2. С count=2
//   3. Со своим разделитором, например " | "

// Твой код здесь:
function getTopItems(items: string[], count: number = 3, separator: string = ', '): string {
  return items.slice(0, count).join(separator)
}
console.log((getTopItems(['1', '2', '3', '4', '5'])));
console.log((getTopItems(['1', '2', '3', '4', '5'], 4)));
console.log((getTopItems(['1', '2', '3', '4', '5'], 2, ' and ')));


export { };
