import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import MalzemeTalepleriTakipPaneli from "../MalzemeTalepleriTakipPaneli";
import { GetMaterialRequestListService, GetMaterialRequestStatisticsByTypeService } from "../../../../../api/services/isEmri/services";
import { MALZEME_TALEP_DURUM } from "../../KademeIsEmirleri/constants";

vi.mock("i18next", async (importOriginal) => {
  const actual = await importOriginal();
  const t = (key) => key;
  return { ...actual, t, default: { ...actual.default, t } };
});

vi.mock("../../../../../api/services/isEmri/services", async (importOriginal) => ({
  ...(await importOriginal()),
  GetMaterialRequestListService: vi.fn(),
  GetMaterialRequestStatisticsByTypeService: vi.fn(),
}));

// Son liste ve KPI isteklerinde giden durum filtresi
const sonListeDurumIds = () => GetMaterialRequestListService.mock.lastCall[3].durumIds;
const sonKpiDurumIds = () => GetMaterialRequestStatisticsByTypeService.mock.lastCall[2].durumIds;

const kutuyaTikla = (title) => fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${title}`) }));

describe("Malzeme Talepleri KPI kutuları", () => {
  beforeAll(() => {
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
  });

  beforeEach(() => {
    GetMaterialRequestListService.mockResolvedValue({ data: { list: [], recordCount: 0 } });
    GetMaterialRequestStatisticsByTypeService.mockResolvedValue({ data: 0 });
  });

  afterEach(() => cleanup());

  it("panel devam eden taleplerle açılır", async () => {
    render(<MalzemeTalepleriTakipPaneli />);

    await waitFor(() => expect(GetMaterialRequestListService).toHaveBeenCalled());
    expect(sonListeDurumIds()).toEqual([MALZEME_TALEP_DURUM.BEKLIYOR, MALZEME_TALEP_DURUM.KISMI_KARSILANDI]);
  });

  it.each([
    ["bekleyen", [MALZEME_TALEP_DURUM.BEKLIYOR]],
    ["kismiKarsilandi", [MALZEME_TALEP_DURUM.KISMI_KARSILANDI]],
    ["tamamlanan", [MALZEME_TALEP_DURUM.TAMAMLANDI]],
    ["toplamTalep", []],
  ])("%s kutusu durum filtresini %j yapar ve liste ile kutuları bu filtreyle yeniden okur", async (title, durumIds) => {
    render(<MalzemeTalepleriTakipPaneli />);
    await waitFor(() => expect(GetMaterialRequestListService).toHaveBeenCalled());

    kutuyaTikla(title);

    await waitFor(() => expect(sonListeDurumIds()).toEqual(durumIds));
    await waitFor(() => expect(sonKpiDurumIds()).toEqual(durumIds));
  });
});
