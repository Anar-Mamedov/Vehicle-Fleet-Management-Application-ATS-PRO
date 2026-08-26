import { describe, expect, it } from "vitest";
import { calculateHakedisTutar, calculateRecordHakedisTutar } from "../hareketUtils";

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

  it("calculates a list row using the changed actual amount or unit price", () => {
    const record = { gerceklesenMiktar: 232, birimFiyat: 340 };

    expect(calculateRecordHakedisTutar(record)).toBe(78880);
    expect(calculateRecordHakedisTutar(record, "gerceklesenMiktar", 250)).toBe(85000);
    expect(calculateRecordHakedisTutar(record, "birimFiyat", 400)).toBe(92800);
  });
});
