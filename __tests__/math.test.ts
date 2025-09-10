import { add } from "@/lib/math";

describe("math utils", () => {
  it("adds numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });
});


describe("math utils second", () => {
  it("adds numbers correctly", () => {
    expect(add(2, 4)).toBe(6);
  });
});