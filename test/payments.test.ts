import { describe, expect, it } from "vitest";
import { charge, sandboxGateway } from "../src/payments";

describe("payments", () => {
  it("rejects invalid amounts", async () => {
    await expect(charge(sandboxGateway(0, 1), 0)).rejects.toThrow(RangeError);
  });
});
