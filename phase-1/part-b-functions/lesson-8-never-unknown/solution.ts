export { };

// Урок 8: Never и Unknown типы — Эталонное решение
// ================================================

// --- Задача 1 ---
function stringify(value: unknown): string {
    switch (typeof value) {
        case 'string':  return value;
        case 'number':  return String(value);
        case 'boolean': return String(value);
        default:        return 'неизвестно';
    }
}

// --- Задача 2 ---
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Неизвестная ошибка';
}

// --- Задача 3 ---
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "triangle"; base: number; height: number }

function assertNever(value: never): never {
    throw new Error(`Необработанный случай: ${JSON.stringify(value)}`);
}

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':   return Math.PI * shape.radius ** 2;
        case 'square':   return shape.side ** 2;
        case 'triangle': return (shape.base * shape.height) / 2;
        default:         return assertNever(shape);
    }
}

// --- Задача 4 ---
function safeParseUser(json: string): { name: string; age: number } | null {
    try {
        const parseResult: unknown = JSON.parse(json);
        if (
            typeof parseResult === 'object' &&
            parseResult !== null &&
            'name' in parseResult &&
            'age' in parseResult &&
            typeof (parseResult as any).name === 'string' &&
            typeof (parseResult as any).age === 'number'
        ) {
            return parseResult as { name: string; age: number };
        }
        return null;
    } catch {
        return null;
    }
}
