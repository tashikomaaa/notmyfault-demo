import { describe, expect, it } from "vitest";
import { applyDiscount, subtotal, total, type Item } from "../src/cart";

const basket: Item[] = [
  { name: "Espresso beans", price: 1290, quantity: 2 },
  { name: "Ceramic mug", price: 900, quantity: 1 },
];

describe("checkout", () => {
  it("adds up the basket", () => {
    expect(subtotal(basket)).toBe(3480);
  });

  it("applies percentage discount codes", () => {
    expect(applyDiscount(3480, "WELCOME10")).toBe(3132);
    expect(applyDiscount(3480, "summer20")).toBe(2784);
  });

  it("applies fixed-amount discount codes, never below zero", () => {
    expect(applyDiscount(3480, "GIFT5")).toBe(2980);
    expect(applyDiscount(300, "GIFT5")).toBe(0);
  });

  it("ignores unknown discount codes", () => {
    expect(applyDiscount(3480, "FREESTUFF")).toBe(3480);
  });

  it("computes the total with VAT after the discount", () => {
    expect(total(basket, "WELCOME10")).toBe(3758);
  });
});
