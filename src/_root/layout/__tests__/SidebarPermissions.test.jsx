import { describe, expect, it } from "vitest";
import { filterMenuItemsByModules, removeEmptyMenuGroups } from "../Sidebar";

describe("sidebar module permissions", () => {
  it("shows only API-approved children under an approved parent", () => {
    const items = [
      {
        key: "2",
        children: [{ key: "3" }, { key: "6" }],
      },
    ];

    const result = filterMenuItemsByModules(items, new Set(["filoYonetimi", "arac"]));

    expect(result).toEqual([
      {
        key: "2",
        children: [{ key: "3" }],
      },
    ]);
  });

  it("hides a parent when its module is not returned by the API", () => {
    const items = [
      {
        key: "2",
        children: [{ key: "3" }],
      },
    ];

    const result = filterMenuItemsByModules(items, new Set(["arac"]));

    expect(result).toEqual([]);
  });

  it("keeps a structural parent when at least one child is approved", () => {
    const items = [
      {
        key: "54",
        children: [{ key: "541" }, { key: "542" }],
      },
    ];

    const result = filterMenuItemsByModules(items, new Set(["onayAyarlari"]));

    expect(result).toEqual([
      {
        key: "54",
        children: [{ key: "541" }],
      },
    ]);
  });

  it("shows the combined management group for either API parent module", () => {
    const items = [
      {
        key: "50",
        children: [{ key: "53" }],
      },
    ];

    const result = filterMenuItemsByModules(items, new Set(["genel", "kodYonetimi"]));

    expect(result).toEqual(items);
  });

  it("removes section headers that have no visible menu items", () => {
    const items = [
      { key: "empty-section", type: "group" },
      { key: "visible-section", type: "group" },
      { key: "38" },
      { key: "last-empty-section", type: "group" },
    ];

    expect(removeEmptyMenuGroups(items)).toEqual([{ key: "visible-section", type: "group" }, { key: "38" }]);
  });
});
