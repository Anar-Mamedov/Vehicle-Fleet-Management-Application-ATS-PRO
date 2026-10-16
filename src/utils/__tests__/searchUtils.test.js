import { describe, expect, it } from "vitest";
import { filterOptionByLabel, includesSearchText } from "../searchUtils";

const UPPERCASE_DRIVER_NAME = "ÇİMEN YILMAZ";

describe("searchUtils case-insensitive search", () => {
  it("matches Turkish letters regardless of case", () => {
    expect(includesSearchText(UPPERCASE_DRIVER_NAME, "Çim")).toBe(true);
    expect(includesSearchText("Çimen Yılmaz", "ÇİM")).toBe(true);
    expect(includesSearchText("İSMAİL ŞAHİN", "ismail şah")).toBe(true);
    expect(includesSearchText("IŞIK KAYA", "ışık")).toBe(true);
    expect(includesSearchText("ÖZGÜR DOĞAN", "özgür doğ")).toBe(true);
  });

  it("matches Latin uppercase I with a lowercase i search", () => {
    expect(includesSearchText("IVECO", "iveco")).toBe(true);
    expect(includesSearchText("MITSUBISHI", "Mitsu")).toBe(true);
  });

  it("does not match unrelated text", () => {
    expect(includesSearchText(UPPERCASE_DRIVER_NAME, "kaya")).toBe(false);
  });

  it("filters select options by label and tolerates a missing label", () => {
    expect(filterOptionByLabel("34 abc", { label: "34 ABC 123", value: 1 })).toBe(true);
    expect(filterOptionByLabel("çim", { label: UPPERCASE_DRIVER_NAME, value: 2 })).toBe(true);
    expect(filterOptionByLabel("çim", { value: 3 })).toBe(false);
    expect(filterOptionByLabel("çim", undefined)).toBe(false);
  });
});
