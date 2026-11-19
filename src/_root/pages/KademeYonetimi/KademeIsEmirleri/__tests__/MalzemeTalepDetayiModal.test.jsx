import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import i18next from "i18next";
import { message } from "antd";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import MalzemeTalepDetayiModal from "../malzemeTalepleri/MalzemeTalepDetayiModal";
import { MALZEME_TALEP_DURUM } from "../constants";
import { GetMaterialRequestItemByIdService, UpdateMaterialRequestService } from "../../../../../api/services/isEmri/services";

vi.mock("../../../../../api/services/isEmri/services", async (importOriginal) => ({
  ...(await importOriginal()),
  GetMaterialRequestItemByIdService: vi.fn(),
  GetServiceWorkCardsByServiceIdService: vi.fn(),
  UpdateMaterialRequestService: vi.fn(),
}));

const TALEP_ID = 36;

const TALEP = {
  siraNo: TALEP_ID,
  talepNo: "MLZTLP00036",
  servisNo: "IE00048",
  malzemeKod: "MLZ99",
  malzemeId: 99,
  malzemeTanim: "SİLECEK",
  malzemeBirim: "ADET",
  birimKodId: 300,
  talepMiktar: 12,
  kullanilanMiktar: 5,
  talepNeden: "ARIZA",
  talepNedenKodId: 927,
  personelId: 3,
  talepTarih: "2026-11-07T10:00:00",
  isId: 0,
  durumTarihcesi: [],
};

const modaliAc = (durum, talep = TALEP) => {
  GetMaterialRequestItemByIdService.mockResolvedValue({ data: talep });
  return render(<MalzemeTalepDetayiModal open isEmriId={7} talepId={TALEP_ID} durum={durum} onClose={vi.fn()} onChange={vi.fn()} />);
};

const talepMiktariInputu = () => screen.getAllByRole("spinbutton")[0];

describe("MalzemeTalepDetayiModal", () => {
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
  });

  afterAll(() => {
    message.success.mockRestore();
    message.warning.mockRestore();
    message.error.mockRestore();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    UpdateMaterialRequestService.mockResolvedValue({ data: { statusCode: 200 } });
  });

  afterEach(() => cleanup());

  it.each([MALZEME_TALEP_DURUM.ONAY_BEKLIYOR, MALZEME_TALEP_DURUM.REDDEDILDI, MALZEME_TALEP_DURUM.TESLIM_EDILDI])("%i durumundaki talep yalnızca görüntülenir", async (durum) => {
    modaliAc(durum);

    expect(await screen.findByRole("button", { name: "kapat" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "kaydet" })).not.toBeInTheDocument();
  });

  it("kısmen teslim edilmiş talepte miktar teslim edilen miktarın altına indirilemez", async () => {
    modaliAc(MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI);
    await screen.findByRole("button", { name: "kaydet" });

    fireEvent.change(talepMiktariInputu(), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "kaydet" }));

    await waitFor(() => expect(message.warning).toHaveBeenCalledWith("talepMiktariTeslimEdilendenAzOlamaz"));
    expect(UpdateMaterialRequestService).not.toHaveBeenCalled();
  });

  it("onaylanmış talep güncellenir", async () => {
    modaliAc(MALZEME_TALEP_DURUM.ONAYLANDI, { ...TALEP, kullanilanMiktar: 0 });
    await screen.findByRole("button", { name: "kaydet" });

    fireEvent.change(talepMiktariInputu(), { target: { value: "15" } });
    fireEvent.click(screen.getByRole("button", { name: "kaydet" }));

    await waitFor(() => expect(UpdateMaterialRequestService).toHaveBeenCalledWith(expect.objectContaining({ siraNo: TALEP_ID, talepMiktar: 15, malzemeId: 99 })));
  });
});
