import i18next from "i18next";
import { beforeAll, describe, expect, it } from "vitest";
import { getIsAtamaAciklamasi } from "../isKartiAciklamalari";

const PERSONEL = "GÖKHAN DERE";

describe("getIsAtamaAciklamasi", () => {
  beforeAll(async () => {
    await i18next.init({ lng: "tr", resources: { tr: { translation: { atamaYapildiAciklama: "Atama yapıldı. Personel Adı: ({{personel}})" } } } });
  });

  it("kullanıcı açıklaması doluysa onu korur", () => {
    expect(getIsAtamaAciklamasi("  Ön balatalar  ", PERSONEL)).toBe("Ön balatalar");
  });

  it("açıklama boşsa atama log metnini personel adıyla üretir", () => {
    expect(getIsAtamaAciklamasi("", PERSONEL)).toBe(`Atama yapıldı. Personel Adı: (${PERSONEL})`);
    expect(getIsAtamaAciklamasi(null, PERSONEL)).toBe(`Atama yapıldı. Personel Adı: (${PERSONEL})`);
  });
});
