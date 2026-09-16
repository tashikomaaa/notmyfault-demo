import { describe, expect, it } from "vitest";
import { charge, sandboxGateway } from "../src/payments";

describe("payments", () => {
  it("rejects invalid amounts", async () => {
    await expect(charge(sandboxGateway(0, 1), 0)).rejects.toThrow(RangeError);
  });

  // The sandbox bank sometimes answers after the 100ms timeout: this test is flaky on purpose.
  it("confirms card payments with the sandbox bank in time", async () => {
    const transaction = await charge(sandboxGateway(20, 160), 3758);
    expect(transaction).toMatch(/^txn_\d+$/);
  });
});
