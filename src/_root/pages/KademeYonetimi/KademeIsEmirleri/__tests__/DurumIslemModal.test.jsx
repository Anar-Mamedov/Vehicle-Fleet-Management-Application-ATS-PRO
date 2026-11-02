import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import i18next from "i18next";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import DurumIslemModal from "../durumIslemleri/DurumIslemModal";
import { DURUM_ISLEMI } from "../constants";
import { GetVehicleServiceByIdService, UpdateVehicleServiceOrderStatusService } from "../../../../../api/services/isEmri/services";

vi.mock("../../../../../api/services/isEmri/services", async (importOriginal) => ({
  ...(await importOriginal()),
  GetVehicleServiceByIdService: vi.fn(),
  UpdateVehicleServiceOrderStatusService: vi.fn(),
}));

const KAYIT = { siraNo: 40, servisNo: "IE00040" };
const SERVIS_TANIMI = "YAĞ DEĞİŞİMİ";

const IS_EMRI_DETAYI = {
  baslamaTarih: "2026-11-01T00:00:00",
  baslamaSaat: "09:00",
  bitisTarih: "2026-11-02T00:00:00",
  bitisSaat: "13:30",
  km: 12345,
  servisTanimi: SERVIS_TANIMI,
};

const kapatmaModaliAc = (onSaved = vi.fn()) => render(<DurumIslemModal open islem={DURUM_ISLEMI.KAPAT} kayitlar={[KAYIT]} onClose={vi.fn()} onSaved={onSaved} />);

const kapatButonu = () => screen.getByRole("button", { name: "isEmriniKapat" });

describe("DurumIslemModal - iş emri kapatma", () => {
  beforeAll(async () => {
    // cimode'da t() anahtarın kendisini döndürür
    await i18next.init({ lng: "cimode" });
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    // Kapanış tarih/saati açılış anının değeriyle dolar
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 2, 14, 4));
  });

  afterAll(() => vi.useRealTimers());

  beforeEach(() => {
    UpdateVehicleServiceOrderStatusService.mockResolvedValue({ data: { status: true } });
  });

  afterEach(() => cleanup());

  it("iş emrinin servis tanımını düz metin gösterir ve km dahil tüm alanlarla kapatır", async () => {
    GetVehicleServiceByIdService.mockResolvedValue({ data: IS_EMRI_DETAYI });
    const onSaved = vi.fn();
    kapatmaModaliAc(onSaved);

    expect(await screen.findByText(SERVIS_TANIMI)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(SERVIS_TANIMI)).not.toBeInTheDocument();
    expect(GetVehicleServiceByIdService).toHaveBeenCalledWith(KAYIT.siraNo);

    fireEvent.click(kapatButonu());

    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    expect(UpdateVehicleServiceOrderStatusService).toHaveBeenCalledWith({
      siraNo: KAYIT.siraNo,
      durumId: DURUM_ISLEMI.KAPAT,
      aciklama: null,
      baslangicTarih: "2026-11-01",
      baslangicSaat: "09:00",
      bitisTarih: "2026-11-02",
      bitisSaat: "13:30",
      kapanisTarih: "2026-11-02",
      kapanisSaat: "14:04",
      km: 12345,
    });
  });

  it("bitiş tarihi ve saati boşken kapatmaz ve iki alanda da zorunlu uyarısı gösterir", async () => {
    GetVehicleServiceByIdService.mockResolvedValue({ data: { ...IS_EMRI_DETAYI, bitisTarih: null, bitisSaat: null } });
    kapatmaModaliAc();

    await screen.findByText(SERVIS_TANIMI);
    fireEvent.click(kapatButonu());

    expect(await screen.findAllByText("alanBosBirakilamaz")).toHaveLength(2);
    expect(UpdateVehicleServiceOrderStatusService).not.toHaveBeenCalled();
  });

  it("km boşsa 0 gönderir", async () => {
    GetVehicleServiceByIdService.mockResolvedValue({ data: { ...IS_EMRI_DETAYI, km: 0 } });
    const onSaved = vi.fn();
    kapatmaModaliAc(onSaved);

    await screen.findByText(SERVIS_TANIMI);
    fireEvent.click(kapatButonu());

    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    expect(UpdateVehicleServiceOrderStatusService.mock.lastCall[0].km).toBe(0);
  });
});
