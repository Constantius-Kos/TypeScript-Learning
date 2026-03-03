// ============================================================
// Урок 2: Optional і default параметри функцій — РІШЕННЯ
// ============================================================

// ------------------------------------------------------------
// Завдання 1: РОЗМИНКА — Optional параметр
// ------------------------------------------------------------
function printOrderInfo(orderId: number, status?: string): void {
  console.log(`Замовлення #${orderId}: ${status ?? 'статус невідомий'}`);
}
printOrderInfo(123, 'відправлено');
printOrderInfo(123);

// ------------------------------------------------------------
// Завдання 2: ОСНОВНЕ — Default параметри
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

console.log(calculateShipping(7, 'Київ'));
console.log(calculateShipping(6, 'Київ', true));
console.log(calculateShipping(5, 'Київ', true, 10));

// ------------------------------------------------------------
// Завдання 3: ЧЕЛЕНДЖ — Комбінуй optional і default
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
// Завдання 4: ЗАКРІПЛЕННЯ — Optional + default
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

console.log(formatUserName('Іван', 'Іванов'));
console.log(formatUserName('Іван', 'Іванов', 'Іванович'));
console.log(formatUserName('Іван', 'Іванов', 'Іванович', true));

// ------------------------------------------------------------
// Завдання 5: ЗАКРІПЛЕННЯ — Робота з масивом і default
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
