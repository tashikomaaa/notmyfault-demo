export interface Gateway {
  /** Resolves with a transaction id once the bank confirms the charge. */
  confirm(amount: number): Promise<string>;
}

export class TimeoutError extends Error {}

/** Charges a card, giving up when the bank takes longer than `timeoutMs`. */
export async function charge(gateway: Gateway, amount: number, timeoutMs = 100): Promise<string> {
  if (!Number.isInteger(amount) || amount <= 0) throw new RangeError("Amount must be a positive number of cents");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(`Bank did not answer within ${timeoutMs}ms`)), timeoutMs);
  });
  try {
    return await Promise.race([gateway.confirm(amount), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/** Sandbox bank: answers after a random latency, like the real one on a bad day. */
export function sandboxGateway(minLatencyMs: number, maxLatencyMs: number): Gateway {
  let next = 1;
  return {
    confirm: () =>
      new Promise((resolve) => {
        const latency = minLatencyMs + Math.random() * (maxLatencyMs - minLatencyMs);
        setTimeout(() => resolve(`txn_${next++}`), latency);
      }),
  };
}
