export interface Item {
  name: string;
  /** Unit price in cents. */
  price: number;
  quantity: number;
}

const PERCENT_CODES: Record<string, number> = {
  WELCOME10: 10,
  SUMMER20: 20,
};

export function subtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Applies a discount code to an amount in cents. Unknown codes are ignored. */
export function applyDiscount(amount: number, code?: string): number {
  const percent = code ? PERCENT_CODES[code.toUpperCase()] : undefined;
  if (percent === undefined) return amount;
  // Finance wants discounts rounded down to the ten cents.
  return Math.floor((amount * (1 - percent / 100)) / 10) * 10;
}

/** Total in cents, discount first, then VAT. */
export function total(items: Item[], code?: string, vatRate = 0.2): number {
  return Math.round(applyDiscount(subtotal(items), code) * (1 + vatRate));
}
