import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import IsEmriTopluIslem from "../components/IsEmriTopluIslem";
import { DURUM_ISLEMI } from "../constants";

vi.mock("i18next", () => ({ t: (key) => key }));

vi.mock("../durumIslemleri/durumIslemHelpers", () => ({
  isKayitSaltOkunur: (kayit) => kayit.saltOkunur,
}));

const acikKayit = { siraNo: 1, saltOkunur: false };
const kapaliKayit = { siraNo: 2, saltOkunur: true };

const menuyuAc = () => fireEvent.click(screen.getByRole("button", { name: "topluIslem" }));
const pasifMi = (label) => screen.getByText(label).closest("li").getAttribute("aria-disabled") === "true";

describe("IsEmriTopluIslem", () => {
  afterEach(() => cleanup());

  it("seçim yokken menü açılır ama öğeler pasif kalır", async () => {
    render(<IsEmriTopluIslem seciliKayitlar={[]} onIslemSec={vi.fn()} />);

    expect(screen.getByRole("button", { name: "topluIslem" })).not.toHaveTextContent(/\d/);
    menuyuAc();

    expect(await screen.findByText("isEmriniKapat")).toBeInTheDocument();
    expect(pasifMi("isEmriniKapat")).toBe(true);
    expect(pasifMi("isEmriniIptalEt")).toBe(true);
    expect(pasifMi("isEmriniYenidenAc")).toBe(true);
  });

  it("tek açık kayıtta kapatmayı seçtirir", async () => {
    const onIslemSec = vi.fn();
    render(<IsEmriTopluIslem seciliKayitlar={[acikKayit]} onIslemSec={onIslemSec} />);

    expect(screen.getByRole("button", { name: "topluIslem" })).toHaveTextContent("1");
    menuyuAc();
    fireEvent.click(await screen.findByText("isEmriniKapat"));

    expect(onIslemSec).toHaveBeenCalledWith(DURUM_ISLEMI.KAPAT);
  });

  it("birden çok açık kayıtta kapatma pasif, iptal kullanılabilir", async () => {
    render(<IsEmriTopluIslem seciliKayitlar={[acikKayit, { ...acikKayit, siraNo: 3 }]} onIslemSec={vi.fn()} />);

    expect(screen.getByRole("button", { name: "topluIslem" })).toHaveTextContent("2");
    menuyuAc();

    expect(await screen.findByText("isEmriniKapat")).toBeInTheDocument();
    expect(pasifMi("isEmriniKapat")).toBe(true);
    expect(pasifMi("isEmriniIptalEt")).toBe(false);
  });

  it("hepsi kapalıyken yalnızca yeniden açma kullanılabilir", async () => {
    render(<IsEmriTopluIslem seciliKayitlar={[kapaliKayit]} onIslemSec={vi.fn()} />);

    menuyuAc();

    expect(await screen.findByText("isEmriniYenidenAc")).toBeInTheDocument();
    expect(pasifMi("isEmriniYenidenAc")).toBe(false);
    expect(pasifMi("isEmriniKapat")).toBe(true);
  });
});
