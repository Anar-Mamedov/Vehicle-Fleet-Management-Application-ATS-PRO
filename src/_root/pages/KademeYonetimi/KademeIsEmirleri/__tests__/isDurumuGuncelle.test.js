import i18next from "i18next";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { updateIsDurumu } from "../atananIsler/isDurumuGuncelle";
import { DURUM, IS_DURUM, IS_ISLEMI } from "../constants";
import {
  GetServiceWorkCardByIdService,
  GetVehicleServiceByIdService,
  UpdateServiceWorkCardService,
  UpdateServiceWorkCardStatusService,
} from "../../../../../api/services/isEmri/services";

vi.mock("../../../../../api/services/isEmri/services", async (importOriginal) => ({
  ...(await importOriginal()),
  GetServiceWorkCardByIdService: vi.fn(),
  GetVehicleServiceByIdService: vi.fn(),
  UpdateServiceWorkCardService: vi.fn(),
  UpdateServiceWorkCardStatusService: vi.fn(),
}));

const IS_ID = 42;
const BASARILI = { data: { statusCode: 200 } };

const kartiHazirla = (alanlar = {}) =>
  GetServiceWorkCardByIdService.mockResolvedValue({
    data: {
      siraNo: IS_ID,
      isNo: "IS-001",
      servisSiraNo: 7,
      personelId: 3,
      baslamaTarih: "2026-11-18T00:00:00",
      baslamaSaat: "08:00",
      bitisTarih: null,
      bitisSaat: null,
      toplam: 0,
      aciklama: "",
      durum: IS_DURUM.DEVAM_EDIYOR,
      ...alanlar,
    },
  });

const isEmriDurumu = (durumBilgisi) => GetVehicleServiceByIdService.mockResolvedValue({ data: { durumBilgisi } });

describe("updateIsDurumu", () => {
  beforeAll(async () => {
    await i18next.init({ lng: "cimode" });
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 19, 10, 30));
  });

  afterAll(() => vi.useRealTimers());

  beforeEach(() => {
    vi.clearAllMocks();
    isEmriDurumu(DURUM.DEVAM_EDIYOR);
    UpdateServiceWorkCardService.mockResolvedValue(BASARILI);
    UpdateServiceWorkCardStatusService.mockResolvedValue(BASARILI);
  });

  it("Durdur gövdesini id, isNo, status 5 ve kullanıcı açıklamasıyla gönderir", async () => {
    kartiHazirla();

    const sonuc = await updateIsDurumu(IS_ID, IS_ISLEMI.DURDUR, "  Lift dolu  ");

    expect(sonuc).toEqual({ basarili: true });
    expect(UpdateServiceWorkCardStatusService).toHaveBeenCalledWith({ id: IS_ID, isNo: "IS-001", status: IS_DURUM.DURDU, aciklama: "Lift dolu" });
  });

  it("Bitir 12 gönderir, boş bitiş zamanını önce sistem zamanıyla ve isNo korunarak kaydeder", async () => {
    kartiHazirla();

    await updateIsDurumu(IS_ID, IS_ISLEMI.BITIR, "Balatalar değişti");

    expect(UpdateServiceWorkCardService).toHaveBeenCalledWith(expect.objectContaining({ siraNo: IS_ID, isNo: "IS-001", bitisTarih: "2026-11-19", bitisSaat: "10:30:00" }));
    expect(UpdateServiceWorkCardStatusService).toHaveBeenCalledWith(expect.objectContaining({ status: IS_DURUM.TAMAMLANDI }));
  });

  it("açıklamasız Devam Et varsayılan log metnini ve 11 durumunu gönderir", async () => {
    kartiHazirla({ durum: IS_DURUM.DURDU });

    await updateIsDurumu(IS_ID, IS_ISLEMI.DEVAM_ET);

    expect(UpdateServiceWorkCardStatusService).toHaveBeenCalledWith({ id: IS_ID, isNo: "IS-001", status: IS_DURUM.YENIDEN_BASLATILDI, aciklama: "isYenidenBaslatildiAciklama" });
  });

  it("tamamlanan işte durum servisini çağırmaz", async () => {
    kartiHazirla({ durum: IS_DURUM.TAMAMLANDI });

    const sonuc = await updateIsDurumu(IS_ID, IS_ISLEMI.IPTAL_ET, "Gerek kalmadı");

    expect(sonuc).toEqual({ basarili: false, mesaj: "isKartiKapaliIslemYapilamaz" });
    expect(UpdateServiceWorkCardStatusService).not.toHaveBeenCalled();
  });

  it("tamamlanan iş emrine bağlı işte durum servisini çağırmaz", async () => {
    kartiHazirla();
    isEmriDurumu(DURUM.TAMAMLANDI);

    const sonuc = await updateIsDurumu(IS_ID, IS_ISLEMI.DURDUR, "Bekleme");

    expect(sonuc).toEqual({ basarili: false, mesaj: "isEmriKapaliIslemYapilamaz" });
    expect(UpdateServiceWorkCardStatusService).not.toHaveBeenCalled();
  });

  it("tamamlama onayı bekleyen işte Bitir tekrar gönderilmez", async () => {
    kartiHazirla({ durum: IS_DURUM.TAMAMLAMA_ONAYI_BEKLIYOR });

    const sonuc = await updateIsDurumu(IS_ID, IS_ISLEMI.BITIR, "Tekrar");

    expect(sonuc).toEqual({ basarili: false, mesaj: "isDurumuBuIslemeUygunDegil" });
    expect(UpdateServiceWorkCardStatusService).not.toHaveBeenCalled();
  });

  it("hiç başlamamış (bekleyen) işte Bitir gönderilmez", async () => {
    kartiHazirla({ durum: IS_DURUM.BEKLIYOR });

    const sonuc = await updateIsDurumu(IS_ID, IS_ISLEMI.BITIR, "Atlandı");

    expect(sonuc).toEqual({ basarili: false, mesaj: "isDurumuBuIslemeUygunDegil" });
    expect(UpdateServiceWorkCardStatusService).not.toHaveBeenCalled();
  });

  it("servis reddederse backend mesajını döner", async () => {
    kartiHazirla();
    UpdateServiceWorkCardStatusService.mockResolvedValue({ data: { statusCode: 400, message: "Geçersiz durum" } });

    const sonuc = await updateIsDurumu(IS_ID, IS_ISLEMI.DURDUR, "Bekleme");

    expect(sonuc).toEqual({ basarili: false, mesaj: "Geçersiz durum" });
  });
});
