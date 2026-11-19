import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import i18next from "i18next";
import { message } from "antd";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import MalzemeTeslimEtModal from "../malzemeTalepleri/MalzemeTeslimEtModal";
import { DURUM, IS_DURUM, MALZEME_TALEP_DURUM } from "../constants";
import {
  GetMaterialRequestItemByIdService,
  GetServiceWorkCardByIdService,
  GetVehicleServiceByIdService,
  UpdateMaterialRequestQuantityUsedService,
} from "../../../../../api/services/isEmri/services";

vi.mock("../../../../../api/services/isEmri/services", async (importOriginal) => ({
  ...(await importOriginal()),
  GetMaterialRequestItemByIdService: vi.fn(),
  GetServiceWorkCardByIdService: vi.fn(),
  GetVehicleServiceByIdService: vi.fn(),
  UpdateMaterialRequestQuantityUsedService: vi.fn(),
}));

const TALEP_ID = 36;

const TALEP = {
  siraNo: TALEP_ID,
  talepNo: "MLZTLP00036",
  malzemeKod: "MLZ99",
  malzemeTanim: "SİLECEK",
  malzemeBirim: "ADET",
  talepMiktar: 12,
  kullanilanMiktar: 5,
  malzemeId: 99,
  birimKodId: 300,
  isId: 42,
  servisSiraNo: 7,
  personelId: 3,
  talepEden: "MURAT YILMAZ",
};

const modaliAc = (durum = MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI, onSaved = vi.fn()) =>
  render(<MalzemeTeslimEtModal open isEmriId={7} aracId={5} talepId={TALEP_ID} durum={durum} onClose={vi.fn()} onSaved={onSaved} />);

const miktarInputu = () => screen.getByRole("spinbutton");

describe("MalzemeTeslimEtModal", () => {
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
    vi.spyOn(message, "warning").mockImplementation(() => {});
    vi.spyOn(message, "error").mockImplementation(() => {});
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 10, 7, 18, 40));
  });

  afterAll(() => {
    vi.useRealTimers();
    message.success.mockRestore();
    message.warning.mockRestore();
    message.error.mockRestore();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    GetMaterialRequestItemByIdService.mockResolvedValue({ data: TALEP });
    GetServiceWorkCardByIdService.mockResolvedValue({ data: { siraNo: 42, servisSiraNo: 7, durum: IS_DURUM.DEVAM_EDIYOR } });
    GetVehicleServiceByIdService.mockResolvedValue({ data: { durumBilgisi: DURUM.DEVAM_EDIYOR } });
    UpdateMaterialRequestQuantityUsedService.mockResolvedValue({ data: { statusCode: 200 } });
  });

  afterEach(() => cleanup());

  it("teslim bekleyen miktarla açılır ve tamamını teslim ederken kullanilanMiktar olarak gönderir", async () => {
    const onSaved = vi.fn();
    modaliAc(undefined, onSaved);

    expect(await screen.findByText("teslimTamamiBilgi")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "tamaminiTeslimEt" }));

    await waitFor(() => expect(UpdateMaterialRequestQuantityUsedService).toHaveBeenCalledWith(expect.objectContaining({ siraNo: TALEP_ID, kullanilanMiktar: 7, servisSiraNo: 7 })));
    await waitFor(() => expect(onSaved).toHaveBeenCalled());
  });

  it("teslim alanı varsayılan olarak talep eden personelle, teslim zamanını ISO biçiminde gönderir", async () => {
    modaliAc();

    expect(await screen.findByText("MURAT YILMAZ")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "tamaminiTeslimEt" }));

    await waitFor(() =>
      expect(UpdateMaterialRequestQuantityUsedService).toHaveBeenCalledWith(expect.objectContaining({ teslimAlanPersonelId: 3, teslimTarih: "2026-11-07T18:40:00" }))
    );
  });

  it("teslim alan personel seçilmeden teslim göndermez", async () => {
    GetMaterialRequestItemByIdService.mockResolvedValue({ data: { ...TALEP, personelId: 0, talepEden: null } });
    modaliAc();
    await screen.findByText("teslimTamamiBilgi");

    fireEvent.click(screen.getByRole("button", { name: "tamaminiTeslimEt" }));

    await waitFor(() => expect(message.warning).toHaveBeenCalledWith("zorunluAlanlariDoldurun"));
    expect(UpdateMaterialRequestQuantityUsedService).not.toHaveBeenCalled();
  });

  it("teslim bekleyen miktarı aşan teslimi göndermez", async () => {
    modaliAc();
    await screen.findByText("teslimTamamiBilgi");

    fireEvent.change(miktarInputu(), { target: { value: "8" } });
    fireEvent.click(screen.getByRole("button", { name: "teslimEt" }));

    await waitFor(() => expect(message.warning).toHaveBeenCalledWith("teslimMiktariGecersiz"));
    expect(UpdateMaterialRequestQuantityUsedService).not.toHaveBeenCalled();
  });

  it("teslim edilmiş talepte teslim kapalıdır", async () => {
    modaliAc(MALZEME_TALEP_DURUM.TESLIM_EDILDI);

    expect(await screen.findByText("malzemeTalebiTeslimEdilemez")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /teslimEt/i })).toBeDisabled();
  });

  it("bağlı iş iptal edildiyse teslim kapalıdır", async () => {
    GetServiceWorkCardByIdService.mockResolvedValue({ data: { siraNo: 42, servisSiraNo: 7, durum: IS_DURUM.IPTAL_EDILDI } });
    modaliAc();

    expect(await screen.findByText("isKartiKapaliIslemYapilamaz")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /teslimEt/i })).toBeDisabled();
  });
});
