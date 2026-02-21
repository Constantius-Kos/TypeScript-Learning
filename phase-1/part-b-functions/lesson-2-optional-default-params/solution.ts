// ============================================================
// Урок 2: Optional и default параметры функций — РЕШЕНИЕ
// ============================================================

// ------------------------------------------------------------
// Задача 1: РАЗМИНКА — Optional параметр
// ------------------------------------------------------------
function printOrderInfo(orderId: number, status?: string): void {
  console.log(`Заказ #${orderId}: ${status ?? 'статус неизвестен'}`);
}
printOrderInfo(123, 'отправлен');
printOrderInfo(123);

// ------------------------------------------------------------
// Задача 2: ОСНОВНАЯ — Default параметры
// ------------------------------------------------------------
type ShippingResult = {
  destination: string;
  totalCost: number;
  express: boolean;
};

function calculateShipping(
  weight: number,
  destination: string,
  express: boolean = false,
  insurancePercent: number = 0
): ShippingResult {
  const base = weight * 100;
  const withExpress = express ? base * 2 : base;
  const totalCost = withExpress * (1 + insurancePercent / 100);
  return { destination, totalCost, express };
}

console.log(calculateShipping(7, 'Москва'));
console.log(calculateShipping(6, 'Москва', true));
console.log(calculateShipping(5, 'Москва', true, 10));

// ------------------------------------------------------------
// Задача 3: ЧЕЛЛЕНДЖ — Комбинируй optional и default
// ------------------------------------------------------------
function buildApiUrl(
  baseUrl: string,
  endpoint: string,
  version: string = 'v1',
  queryParams?: Record<string, string>
): string {
  const query = queryParams
    ? '?' + Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&')
    : '';
  return `${baseUrl}/${version}${endpoint}${query}`;
}

console.log(buildApiUrl('https://api.example.com', '/users'));
console.log(buildApiUrl('https://api.example.com', '/products', 'v2'));
console.log(buildApiUrl('https://api.example.com', '/products', 'v2', { limit: '10', page: '2' }));

// ------------------------------------------------------------
// Задача 4: ЗАКРЕПЛЕНИЕ — Optional + default
// ------------------------------------------------------------
function formatUserName(
  firstName: string,
  lastName: string,
  middleName?: string,
  uppercase: boolean = false
): string {
  const name = middleName
    ? `${lastName} ${firstName} ${middleName}`
    : `${lastName} ${firstName}`;
  return uppercase ? name.toUpperCase() : name;
}

console.log(formatUserName('Иван', 'Иванов'));
console.log(formatUserName('Иван', 'Иванов', 'Иванович'));
console.log(formatUserName('Иван', 'Иванов', 'Иванович', true));

// ------------------------------------------------------------
// Задача 5: ЗАКРЕПЛЕНИЕ — Работа с массивом и default
// ------------------------------------------------------------
function getTopItems(
  items: string[],
  count: number = 3,
  separator: string = ', '
): string {
  return items.slice(0, count).join(separator);
}

console.log(getTopItems(['apple', 'banana', 'cherry', 'date', 'elderberry']));
console.log(getTopItems(['apple', 'banana', 'cherry', 'date'], 2));
console.log(getTopItems(['apple', 'banana', 'cherry'], 3, ' | '));

export {};
