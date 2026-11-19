import { describe, expect, it } from "vitest";
import {
  DURUM,
  IS_DURUM,
  IS_ISLEMI,
  MALZEME_TALEP_DURUM,
  getAnaIsIslemi,
  getIsIslemleri,
  getIsKartiKilitMesajKey,
  isIsCalisiyor,
  isIsKartiKapali,
  isMalzemeTalebiAcik,
  isMalzemeTalebiDuzenlenebilir,
  isMalzemeTeslimEdilebilir,
} from "../constants";

const acikIslemler = (durum) =>
  Object.entries(getIsIslemleri(durum))
    .filter(([, acik]) => acik)
    .map(([islem]) => islem);

describe("iş kartı durum kuralları", () => {
  it.each([
    // Hiç başlamamış iş bitirilemez (backend kuralı)
    [IS_DURUM.BEKLIYOR, [IS_ISLEMI.BASLAT, IS_ISLEMI.IPTAL_ET]],
    [IS_DURUM.DEVAM_EDIYOR, [IS_ISLEMI.DURDUR, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]],
    [IS_DURUM.YENIDEN_BASLATILDI, [IS_ISLEMI.DURDUR, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]],
    [IS_DURUM.MALZEME_ONAYI_BEKLIYOR, [IS_ISLEMI.DEVAM_ET, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]],
    [IS_DURUM.MALZEME_TESLIMI_BEKLIYOR, [IS_ISLEMI.DEVAM_ET, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]],
    [IS_DURUM.DURDU, [IS_ISLEMI.DEVAM_ET, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]],
    [IS_DURUM.DEVAM_ETMESI_BEKLENIYOR, [IS_ISLEMI.DEVAM_ET, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]],
    // Tamamlama onayı beklerken aynı iş için ikinci onay oluşmasın diye hiçbir işlem açık değildir
    [IS_DURUM.TAMAMLAMA_ONAYI_BEKLIYOR, []],
    [IS_DURUM.TAMAMLANDI, []],
    [IS_DURUM.IPTAL_EDILDI, []],
  ])("%i durumunda açık işlemler %j", (durum, beklenen) => {
    expect(acikIslemler(durum)).toEqual(beklenen);
  });

  it("servisten durumsuz (0) gelen iş Bekliyor sayılır ve Başlat ile açılır", () => {
    expect(getAnaIsIslemi(0)).toBe(IS_ISLEMI.BASLAT);
  });

  it("satırdaki ana işlem: bekleyen Başlat, çalışan Durdur, duran/malzeme bekleyen Devam Et, diğerlerinde yok", () => {
    expect(getAnaIsIslemi(IS_DURUM.BEKLIYOR)).toBe(IS_ISLEMI.BASLAT);
    expect(getAnaIsIslemi(IS_DURUM.DEVAM_EDIYOR)).toBe(IS_ISLEMI.DURDUR);
    expect(getAnaIsIslemi(IS_DURUM.YENIDEN_BASLATILDI)).toBe(IS_ISLEMI.DURDUR);
    expect(getAnaIsIslemi(IS_DURUM.DURDU)).toBe(IS_ISLEMI.DEVAM_ET);
    expect(getAnaIsIslemi(IS_DURUM.DEVAM_ETMESI_BEKLENIYOR)).toBe(IS_ISLEMI.DEVAM_ET);
    expect(getAnaIsIslemi(IS_DURUM.TAMAMLAMA_ONAYI_BEKLIYOR)).toBeNull();
    expect(getAnaIsIslemi(IS_DURUM.TAMAMLANDI)).toBeNull();
  });

  it("süre yalnızca 2 ve 11 durumlarında çalışır", () => {
    const calisanlar = Object.values(IS_DURUM).filter(isIsCalisiyor);
    expect(calisanlar).toEqual([IS_DURUM.DEVAM_EDIYOR, IS_DURUM.YENIDEN_BASLATILDI]);
  });

  it("12 ve 13 kapalıdır; kapalı iş veya iptal/tamamlanan/kapatılan iş emri kilit mesajı verir", () => {
    expect(Object.values(IS_DURUM).filter(isIsKartiKapali)).toEqual([IS_DURUM.TAMAMLANDI, IS_DURUM.IPTAL_EDILDI]);
    expect(getIsKartiKilitMesajKey(IS_DURUM.TAMAMLANDI, DURUM.DEVAM_EDIYOR)).toBe("isKartiKapaliIslemYapilamaz");
    expect(getIsKartiKilitMesajKey(IS_DURUM.DEVAM_EDIYOR, DURUM.IPTAL_EDILDI)).toBe("isEmriKapaliIslemYapilamaz");
    expect(getIsKartiKilitMesajKey(IS_DURUM.DEVAM_EDIYOR, DURUM.TAMAMLANDI)).toBe("isEmriKapaliIslemYapilamaz");
    expect(getIsKartiKilitMesajKey(IS_DURUM.DEVAM_EDIYOR, DURUM.KAPATILDI)).toBe("isEmriKapaliIslemYapilamaz");
    expect(getIsKartiKilitMesajKey(IS_DURUM.DEVAM_EDIYOR, DURUM.DEVAM_EDIYOR)).toBeNull();
  });
});

describe("malzeme talebi kuralları", () => {
  it("Teslim Et yalnızca Onaylandı (1) ve Kısmi Teslim Edildi (4) durumlarında açıktır", () => {
    expect(Object.values(MALZEME_TALEP_DURUM).filter(isMalzemeTeslimEdilebilir)).toEqual([MALZEME_TALEP_DURUM.ONAYLANDI, MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI]);
  });

  it("talep yalnızca onaylandıysa veya kısmen teslim edildiyse değiştirilebilir", () => {
    expect(Object.values(MALZEME_TALEP_DURUM).filter(isMalzemeTalebiDuzenlenebilir)).toEqual([MALZEME_TALEP_DURUM.ONAYLANDI, MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI]);
  });

  it("teslimi tamamlanmamış ve reddedilmemiş talepler açık sayılır", () => {
    expect(Object.values(MALZEME_TALEP_DURUM).filter(isMalzemeTalebiAcik)).toEqual([
      MALZEME_TALEP_DURUM.ONAYLANDI,
      MALZEME_TALEP_DURUM.ONAY_BEKLIYOR,
      MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI,
    ]);
  });
});
