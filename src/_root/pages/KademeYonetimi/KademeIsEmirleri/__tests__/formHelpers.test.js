import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import { buildIsEmriBody, hesaplaIsEmriSuresi } from "../formHelpers";

const GUN = "2026-11-01";
const ERTESI_GUN = "2026-11-02";

const tarih = (value) => dayjs(value);
const saat = (value) => toTimeDayjsOrNull(value);

describe("hesaplaIsEmriSuresi", () => {
  it("başlama ile bitiş arasındaki süreyi gün geçişi dahil dakika olarak hesaplar", () => {
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(GUN), baslamaSaat: saat("09:00"), bitisTarih: tarih(GUN), bitisSaat: saat("14:30") })).toBe(330);
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(GUN), baslamaSaat: saat("22:00"), bitisTarih: tarih(ERTESI_GUN), bitisSaat: saat("01:15") })).toBe(195);
  });

  it("saat girilmemişse günün başlangıcını alır", () => {
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(GUN), baslamaSaat: null, bitisTarih: tarih(GUN), bitisSaat: null })).toBe(0);
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(GUN), baslamaSaat: null, bitisTarih: tarih(ERTESI_GUN), bitisSaat: saat("02:00") })).toBe(24 * 60 + 120);
  });

  it("DatePicker değerindeki günün saatini hesaba katmaz", () => {
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(`${GUN} 16:47:12`), baslamaSaat: saat("09:00"), bitisTarih: tarih(`${GUN} 08:03:55`), bitisSaat: saat("10:00") })).toBe(60);
  });

  it("tarihlerden biri boşsa veya bitiş başlamadan önceyse süre hesaplanmaz", () => {
    expect(hesaplaIsEmriSuresi({ baslamaTarih: null, baslamaSaat: saat("09:00"), bitisTarih: tarih(GUN), bitisSaat: saat("10:00") })).toBeNull();
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(GUN), baslamaSaat: saat("09:00"), bitisTarih: null, bitisSaat: null })).toBeNull();
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(ERTESI_GUN), baslamaSaat: null, bitisTarih: tarih(GUN), bitisSaat: null })).toBeNull();
    expect(hesaplaIsEmriSuresi({ baslamaTarih: tarih(GUN), baslamaSaat: saat("10:00"), bitisTarih: tarih(GUN), bitisSaat: saat("09:59") })).toBeNull();
  });

  it("süre kayıt gövdesine eklenmez", () => {
    const body = buildIsEmriBody({ baslamaTarih: tarih(GUN), baslamaSaat: saat("09:00"), bitisTarih: tarih(GUN), bitisSaat: saat("14:30") }, 1);

    expect(Object.keys(body).some((key) => key.toLowerCase().includes("sure"))).toBe(false);
  });
});
