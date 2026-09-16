import { describe, expect, it } from "vitest";
import { SearchIndex, tokenize } from "../src/search";

function catalog(): SearchIndex {
  const index = new SearchIndex();
  index.add("p1", "Crème brûlée torch");
  index.add("p2", "Espresso beans, dark roast");
  index.add("p3", "Ceramic espresso mug");
  return index;
}

describe("search", () => {
  it("splits text into lowercase words", () => {
    expect(tokenize("Dark-Roast ESPRESSO!")).toEqual(["dark", "roast", "espresso"]);
  });

  it("finds products matching every word", () => {
    expect(catalog().search("espresso mug")).toEqual(["p3"]);
  });

  it("finds products regardless of accents", () => {
    expect(catalog().search("creme brulee")).toEqual(["p1"]);
  });
});
