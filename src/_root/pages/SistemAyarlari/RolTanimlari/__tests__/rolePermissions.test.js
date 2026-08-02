import { describe, expect, it } from "vitest";
import { buildRolePayload, createRolePermissionState, getVisibleRolePermissionGroups, updatePermissionGroup } from "../rolePermissions";

const modules = [
  { siraNo: 1, menuAdi: "filoYonetimi", anaMenuId: 0, sayfaKod: "-" },
  { siraNo: 2, menuAdi: "ayarlarA", anaMenuId: 1, sayfaKod: "00000" },
  { siraNo: 3, menuAdi: "ayarlarB", anaMenuId: 1, sayfaKod: "00000" },
  { siraNo: 4, menuAdi: "arac", anaMenuId: 1, sayfaKod: "00012" },
  { siraNo: 267, menuAdi: "yonetim", anaMenuId: 0, sayfaKod: "-" },
  { siraNo: 268, menuAdi: "dokumanYonetimi", anaMenuId: 267, sayfaKod: "00004" },
];

describe("role permission mapping", () => {
  it("matches duplicate permission codes by definition and unique codes by fallback", () => {
    const roleAuths = [
      { yetkiKod: "ayarlarB", yetkiTanim: "00000", sil: true },
      { yetkiKod: "00012", yetkiTanim: "Araçlar", goruntule: true },
      { yetkiKod: "LEGACY", yetkiTanim: "legacyModule", ekle: true },
    ];

    const result = createRolePermissionState(modules, roleAuths);
    const permissions = result.groups[0].permissions;

    expect(permissions.find((permission) => permission.menuAdi === "ayarlarA")?.sil).toBe(false);
    expect(permissions.find((permission) => permission.menuAdi === "ayarlarB")?.sil).toBe(true);
    expect(permissions.find((permission) => permission.menuAdi === "arac")?.goruntule).toBe(true);
    expect(permissions.find((permission) => permission.menuAdi === "arac")).toMatchObject({ yetkiKod: "arac", yetkiTanim: "00012" });
    expect(result.groups.find((group) => group.menuAdi === "yonetim")?.anaMenuId).toBe(267);
    expect(result.preservedAuths).toEqual([roleAuths[2]]);
  });

  it("hides the management group by menu name when its parent ID changes", () => {
    const { groups } = createRolePermissionState(modules);
    const visibleGroups = getVisibleRolePermissionGroups(groups);

    expect(groups.find((group) => group.menuAdi === "yonetim")?.anaMenuId).toBe(267);
    expect(visibleGroups.some((group) => group.menuAdi === "yonetim")).toBe(false);
    expect(groups.flatMap((group) => group.permissions).some((permission) => permission.menuAdi === "dokumanYonetimi")).toBe(true);
  });

  it("applies group-level permission shortcuts", () => {
    const { groups } = createRolePermissionState(modules);

    const viewOnlyGroups = updatePermissionGroup(groups, groups[0].key, "view");
    expect(viewOnlyGroups[0].permissions).toEqual(expect.arrayContaining([expect.objectContaining({ goruntule: true, ekle: false, degistir: false, sil: false })]));

    const allGroups = updatePermissionGroup(groups, groups[0].key, "all");
    expect(allGroups[0].permissions).toEqual(expect.arrayContaining([expect.objectContaining({ goruntule: true, ekle: true, degistir: true, sil: true })]));
  });

  it("uses zero IDs for create and the role ID for update payloads", () => {
    const { groups, preservedAuths } = createRolePermissionState(modules, [{ yetkiKod: "LEGACY", yetkiTanim: "legacyModule", goruntule: true }]);
    const values = { roleAdi: " Test Rol ", roleKodu: " TEST ", aciklama: " Açıklama ", durum: true, yonetici: false };

    const createPayload = buildRolePayload(values, 0, groups, preservedAuths);
    const updatePayload = buildRolePayload(values, 8, groups, preservedAuths);

    expect(createPayload).toMatchObject({ siraNo: 0, roleAdi: "Test Rol", roleKodu: "TEST", aciklama: "Açıklama" });
    expect(createPayload.roleAuths.every((roleAuth) => roleAuth.rolSiraNo === 0)).toBe(true);
    expect(updatePayload.siraNo).toBe(8);
    expect(updatePayload.roleAuths.every((roleAuth) => roleAuth.rolSiraNo === 8)).toBe(true);
    expect(updatePayload.roleAuths.find((roleAuth) => roleAuth.yetkiKod === "LEGACY")).toEqual({
      rolSiraNo: 8,
      yetkiKod: "LEGACY",
      yetkiTanim: "legacyModule",
      ekle: false,
      sil: false,
      degistir: false,
      goruntule: true,
    });
  });
});
