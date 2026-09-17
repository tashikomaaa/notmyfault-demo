export interface Item {
  name: string;
  /** Unit price in cents. */
  price: number;
  quantity: number;
}

type Discount = { kind: "percent"; value: number } | { kind: "fixed"; cents: number };

const DISCOUNT_CODES: Record<string, Discount> = {
  WELCOME10: { kind: "percent", value: 10 },
  SUMMER20: { kind: "percent", value: 20 },
  GIFT5: { kind: "fixed", cents: 500 },
};

export function subtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Applies a discount code to an amount in cents. Unknown codes are ignored. */
export function applyDiscount(amount: number, code?: string): number {
  const discount = code ? DISCOUNT_CODES[code] : undefined;
  if (!discount) return amount;
  if (discount.kind === "fixed") return Math.max(0, amount - discount.cents);
  return Math.round(amount * (1 - discount.value / 100));
}

/** Total in cents, discount first, then VAT. */
export function total(items: Item[], code?: string, vatRate = 0.2): number {
  return Math.round(applyDiscount(subtotal(items), code) * (1 + vatRate));
}
