import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import i18next from "i18next";
import { message } from "antd";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import IsDurumIslemModal from "../atananIsler/IsDurumIslemModal";
import { DURUM, IS_DURUM, IS_ISLEMI, MALZEME_TALEP_DURUM } from "../constants";
import {
  GetMaterialRequestListByServiceIdService,
  GetServiceWorkCardByIdService,
  GetVehicleServiceByIdService,
  UpdateServiceWorkCardService,
  UpdateServiceWorkCardStatusService,
} from "../../../../../api/services/isEmri/services";
import { GetApprovalSettingsListService } from "../../../../../api/services/onay/services";

vi.mock("../../../../../api/services/isEmri/services", async (importOriginal) => ({
  ...(await importOriginal()),
  GetMaterialRequestListByServiceIdService: vi.fn(),
  GetServiceWorkCardByIdService: vi.fn(),
  GetVehicleServiceByIdService: vi.fn(),
  UpdateServiceWorkCardService: vi.fn(),
  UpdateServiceWorkCardStatusService: vi.fn(),
}));

vi.mock("../../../../../api/services/onay/services", () => ({
  GetApprovalSettingsListService: vi.fn(),
}));

const IS_ID = 42;

const KART = {
  siraNo: IS_ID,
  isNo: "IS-001",
  servisSiraNo: 7,
  isTanim: "FREN BALATASI DEĞİŞİMİ",
  personelIsim: "GÖKHAN DERE",
  baslamaTarih: "2026-11-18T00:00:00",
  baslamaSaat: "08:00",
  bitisTarih: "2026-11-18T00:00:00",
  bitisSaat: "17:00",
  durum: IS_DURUM.DEVAM_EDIYOR,
};

const modaliAc = (islem, onSaved = vi.fn()) => render(<IsDurumIslemModal open islem={islem} isId={IS_ID} onClose={vi.fn()} onSaved={onSaved} />);

const aciklamaYaz = (metin) => fireEvent.change(screen.getByRole("textbox"), { target: { value: metin } });

describe("IsDurumIslemModal", () => {
  beforeAll(async () => {
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
    vi.spyOn(message, "success").mockImplementation(() => {});
    vi.spyOn(message, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    message.success.mockRestore();
    message.error.mockRestore();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    GetServiceWorkCardByIdService.mockResolvedValue({ data: KART });
    GetVehicleServiceByIdService.mockResolvedValue({ data: { durumBilgisi: DURUM.DEVAM_EDIYOR } });
    GetMaterialRequestListByServiceIdService.mockResolvedValue({ data: [] });
    GetApprovalSettingsListService.mockResolvedValue({ data: [{ tanim: "isTamamlamaOnayi", onayAktif: true }] });
    UpdateServiceWorkCardService.mockResolvedValue({ data: { statusCode: 200 } });
    UpdateServiceWorkCardStatusService.mockResolvedValue({ data: { statusCode: 200 } });
  });

  afterEach(() => cleanup());

  it("durdurma nedeni girilmeden İşi Durdur kapalıdır; girilince 5 ve açıklamayla gönderir", async () => {
    const onSaved = vi.fn();
    modaliAc(IS_ISLEMI.DURDUR, onSaved);

    expect(await screen.findByText(KART.isTanim)).toBeInTheDocument();
    const durdurButonu = screen.getByRole("button", { name: "isiDurdur" });
    expect(durdurButonu).toBeDisabled();

    aciklamaYaz("Araç lift alanına alınamadı.");
    expect(durdurButonu).toBeEnabled();
    fireEvent.click(durdurButonu);

    await waitFor(() =>
      expect(UpdateServiceWorkCardStatusService).toHaveBeenCalledWith({ id: IS_ID, isNo: "IS-001", status: IS_DURUM.DURDU, aciklama: "Araç lift alanına alınamadı." })
    );
    await waitFor(() => expect(onSaved).toHaveBeenCalled());
  });

  it("iş tamamlama onayı aktifse Bitir onaya gönderme metinlerini gösterir ve 12 gönderir", async () => {
    modaliAc(IS_ISLEMI.BITIR);

    expect(await screen.findByText("atananIsiBitirOnayliBilgi")).toBeInTheDocument();
    aciklamaYaz("Ön fren balataları değiştirildi.");
    fireEvent.click(screen.getByRole("button", { name: "isiBitirVeOnayaGonder" }));

    await waitFor(() => expect(UpdateServiceWorkCardStatusService).toHaveBeenCalledWith(expect.objectContaining({ status: IS_DURUM.TAMAMLANDI })));
    expect(message.success).toHaveBeenCalledWith("isTamamlamaOnayinaGonderildi");
  });

  it("iş tamamlama onayı pasifse Bitir doğrudan tamamlanacağını anlatır", async () => {
    GetApprovalSettingsListService.mockResolvedValue({ data: [{ tanim: "isTamamlamaOnayi", onayAktif: false }] });
    modaliAc(IS_ISLEMI.BITIR);

    expect(await screen.findByText("atananIsiBitirOnaysizBilgi")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "isiBitir" })).toBeInTheDocument();
  });

  it("iptalde işe bağlı açık malzeme taleplerini uyarır ve 13 gönderir", async () => {
    GetMaterialRequestListByServiceIdService.mockResolvedValue({
      data: [
        { siraNo: 1, isId: IS_ID, durum: MALZEME_TALEP_DURUM.ONAY_BEKLIYOR },
        { siraNo: 2, isId: IS_ID, durum: MALZEME_TALEP_DURUM.TESLIM_EDILDI },
        { siraNo: 3, isId: 99, durum: MALZEME_TALEP_DURUM.ONAYLANDI },
      ],
    });
    modaliAc(IS_ISLEMI.IPTAL_ET);

    expect(await screen.findByText("atananIsAcikMalzemeTalebiUyari")).toBeInTheDocument();
    aciklamaYaz("İş emri kapsamı değişti.");
    fireEvent.click(screen.getByRole("button", { name: "atananIsiIptalEt" }));

    await waitFor(() => expect(UpdateServiceWorkCardStatusService).toHaveBeenCalledWith(expect.objectContaining({ status: IS_DURUM.IPTAL_EDILDI })));
  });

  it("tamamlanan iş emrine bağlı işte kilit uyarısı gösterir ve kaydı kapatır", async () => {
    GetVehicleServiceByIdService.mockResolvedValue({ data: { durumBilgisi: DURUM.TAMAMLANDI } });
    modaliAc(IS_ISLEMI.DURDUR);

    expect(await screen.findByText("isEmriKapaliIslemYapilamaz")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "isiDurdur" })).toBeDisabled();
  });
});
