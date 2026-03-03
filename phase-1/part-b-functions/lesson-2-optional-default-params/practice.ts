// ============================================================
// Урок 2: Optional і default параметри функцій
// ============================================================
// Запуск: npx ts-node practice.ts
// ============================================================

// ------------------------------------------------------------
// Завдання 1: РОЗМИНКА — Optional параметр (5-7 хвилин)
// ------------------------------------------------------------
// Напиши функцію printOrderInfo, яка приймає:
//   - orderId: number (обов'язковий)
//   - status: string (необов'язковий)
//
// Якщо status переданий — виводь: "Замовлення #[id]: [status]"
// Якщо status НЕ переданий — виводь: "Замовлення #[id]: статус невідомий"
//
// Викличи функцію обома способами і переконайся що обидва працюють.

// Твій код тут:
function printOrderInfo(orderId: number, status?: string) {
  console.log(`замовлення ${orderId}: ${status ?? 'статус невідомий'} `);
}
printOrderInfo(123, 'відправлено');
printOrderInfo(123);
// ------------------------------------------------------------
// Завдання 2: ОСНОВНЕ — Default параметри (10-15 хвилин)
// ------------------------------------------------------------
// Напиши функцію calculateShipping, яка рахує вартість доставки.
// Параметри:
//   - weight: number (вага посилки в кг, обов'язковий)
//   - destination: string (напрямок, обов'язковий)
//   - express: boolean (експрес-доставка, за замовчуванням false)
//   - insurancePercent: number (страховка в %, за замовчуванням 0)
//
// Логіка (придумай сам):
//   - Базова ціна: weight * 100
//   - Якщо express=true: ціна * 2
//   - Страховка додається як відсоток від підсумкової ціни
//   - Функція повертає об'єкт: { destination, totalCost, express }
//
// Викличи функцію 3 рази:
//   1. Тільки weight і destination
//   2. З express=true
//   3. З усіма параметрами

// Спочатку оголоси тип об'єкта, що повертається:
type ShippingResult = {
  destination: string,
  totalCost: number,
  express: boolean
  // заповни сам
};

// Твоя функція:
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
// Завдання 3: ЧЕЛЕНДЖ — Комбінуй optional і default (15-20 хв)
// ------------------------------------------------------------
// Напиши функцію buildApiUrl яка збирає URL для API запиту.
// Параметри:
//   - baseUrl: string (обов'язковий, наприклад "https://api.example.com")
//   - endpoint: string (обов'язковий, наприклад "/users")
//   - version: string (за замовчуванням "v1")
//   - queryParams?: Record<string, string> (необов'язковий — об'єкт з параметрами запиту)
//
// Результат: рядок-URL виду:
//   "https://api.example.com/v1/users"
//   "https://api.example.com/v2/products?limit=10&page=2"
//
// Підказка: для queryParams використовуй Object.entries() і .join("&")
// Підказка 2: Record<string, string> — це тип для об'єкта { ключ: рядок }
//   Наприклад: { limit: "10", page: "2" }
//
// Викличи 3 рази:
//   1. Тільки baseUrl і endpoint
//   2. З іншою версією API
//   3. З усіма параметрами включаючи queryParams

// Твій код тут:
function buildApiUrl(baseUrl: string, endpoint: string, version: string = 'v1', queryParams?: Record<string, string>): string {
  return `${baseUrl}/${version}/${endpoint}${queryParams ? '?' + Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&') : ''}`
}

console.log(buildApiUrl('www.test.com', 'home'));
console.log(buildApiUrl('www.test.com', 'home', 'v2'));
console.log((buildApiUrl('www.test.com', 'home', 'v3', { page: 'cabinet', options: 'subcribes' })));
// ------------------------------------------------------------
// Завдання 4: ЗАКРІПЛЕННЯ — Optional + default (10 хв)
// ------------------------------------------------------------
// Напиши функцію formatUserName, яка форматує ім'я користувача.
// Параметри:
//   - firstName: string (обов'язковий)
//   - lastName: string (обов'язковий)
//   - middleName?: string (необов'язковий — по батькові)
//   - uppercase: boolean (за замовчуванням false)
//
// Логіка:
//   - Якщо middleName переданий: "Прізвище Ім'я По батькові"
//   - Якщо не переданий: "Прізвище Ім'я"
//   - Якщо uppercase=true — весь результат у верхньому регістрі
//
// Підказка: string.toUpperCase() переводить рядок у верхній регістр
//
// Викличи 3 рази:
//   1. Тільки ім'я і прізвище
//   2. З по батькові
//   3. З по батькові і uppercase=true

// Твій код тут:
function formatUserName(firstName: string, lastname: string, middleName?: string, uppercase: boolean = false): string {
  let username = middleName ? `${firstName} ${lastname} ${middleName}` : `${firstName} ${lastname}`
  return uppercase ? username.toUpperCase() : username
}
console.log((formatUserName('Vasya', 'Pupkin')));
console.log((formatUserName('Vasya', 'Pupkin', 'Srepanovich')));
console.log((formatUserName('Vasya', 'Pupkin', 'Stepanovich', true)));



// ------------------------------------------------------------
// Завдання 5: ЗАКРІПЛЕННЯ — Робота з масивом і default (10 хв)
// ------------------------------------------------------------
// Напиши функцію getTopItems, яка повертає перші N елементів масиву.
// Параметри:
//   - items: string[] (обов'язковий — масив рядків)
//   - count: number (за замовчуванням 3 — скільки елементів повернути)
//   - separator: string (за замовчуванням ", " — розділювач у результаті)
//
// Функція повертає рядок — елементи через розділювач.
//
// Підказка: array.slice(0, count) повертає перші count елементів масиву
//
// Викличи 3 рази:
//   1. Тільки масив (бере перші 3, через ", ")
//   2. З count=2
//   3. Зі своїм розділювачем, наприклад " | "

// Твій код тут:
function getTopItems(items: string[], count: number = 3, separator: string = ', '): string {
  return items.slice(0, count).join(separator)
}
console.log((getTopItems(['1', '2', '3', '4', '5'])));
console.log((getTopItems(['1', '2', '3', '4', '5'], 4)));
console.log((getTopItems(['1', '2', '3', '4', '5'], 2, ' and ')));


export { };
