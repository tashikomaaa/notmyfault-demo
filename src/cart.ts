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
  return Math.round(amount * (1 - percent / 100));
}

/** Food is charged the reduced VAT rate. */
const REDUCED_VAT_RATE = 0.055;

function vatRateOf(item: Item, standardRate: number): number {
  return /beans|tea/i.test(item.name) ? REDUCED_VAT_RATE : standardRate;
}

/** Total in cents, discount first, then VAT, line by line. */
export function total(items: Item[], code?: string, vatRate = 0.2): number {
  const gross = subtotal(items);
  const net = applyDiscount(gross, code);
  const share = gross === 0 ? 0 : net / gross;
  const vat = items.reduce((sum, item) => sum + item.price * item.quantity * share * vatRateOf(item, vatRate), 0);
  return Math.round(net + vat);
}
