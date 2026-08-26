import { describe, expect, it } from "vitest";
import { calculateHakedisTutar } from "../HareketForm";

describe("calculateHakedisTutar", () => {
  it("calculates the progress payment from the actual amount and unit price", () => {
    expect(calculateHakedisTutar(22, 250)).toBe(5500);
    expect(calculateHakedisTutar("22.5", "250")).toBe(5625);
  });

  it("does not calculate when either source value is empty or invalid", () => {
    expect(calculateHakedisTutar(null, 250)).toBeNull();
    expect(calculateHakedisTutar(22, "")).toBeNull();
    expect(calculateHakedisTutar("invalid", 250)).toBeNull();
  });
});
