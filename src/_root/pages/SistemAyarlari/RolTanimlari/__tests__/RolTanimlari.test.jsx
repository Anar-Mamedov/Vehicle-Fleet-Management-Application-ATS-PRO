import { describe, expect, it } from "vitest";
import { filterRoles } from "../RolTanimlari";

const roles = [
  { siraNo: 1, roleAdi: "Filo Yöneticisi", roleKodu: "FILO_YONETICISI", durum: true, yonetici: true },
  { siraNo: 2, roleAdi: "Sürücü", roleKodu: "SURUCU", durum: true, yonetici: false },
  { siraNo: 3, roleAdi: "Arşiv Rolü", roleKodu: "ARSIV", durum: false, yonetici: false },
];

describe("role list filtering", () => {
  it("filters roles by name or code", () => {
    expect(filterRoles(roles, "yönetici", "all", "all")).toEqual([roles[0]]);
    expect(filterRoles(roles, "SURUCU", "all", "all")).toEqual([roles[1]]);
  });

  it("filters roles by status and manager flags", () => {
    expect(filterRoles(roles, "", "active", "manager")).toEqual([roles[0]]);
    expect(filterRoles(roles, "", "passive", "standard")).toEqual([roles[2]]);
  });
});
