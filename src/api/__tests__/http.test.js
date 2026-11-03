import i18next from "i18next";
import { beforeAll, describe, expect, it } from "vitest";
import http from "../http";
import httpAktarim from "../httpAktarim";

// i18next yalnızca çevirisi olan dili çözümlenmiş dil sayar; uygulamadaki gibi her dilde en az bir anahtar bulunur
const resources = {
  tr: { translation: { kaydet: "Kaydet" } },
  en: { translation: { kaydet: "Save" } },
  ru: { translation: { kaydet: "Сохранить" } },
  az: { translation: { kaydet: "Yadda saxla" } },
};

// İsteği ağa göndermeden giden başlıkları döndürür
const gidenBasliklar = async (instance) => {
  const response = await instance.get("/test", {
    adapter: async (config) => ({ data: config.headers, status: 200, statusText: "OK", headers: {}, config }),
  });
  return response.data;
};

describe.each([
  ["http", http],
  ["httpAktarim", httpAktarim],
])("%s istek dili", (_, instance) => {
  beforeAll(async () => {
    await i18next.init({ lng: "tr", fallbackLng: "tr", resources });
  });

  it("kullanıcının arayüz dilini Accept-Language başlığında gönderir", async () => {
    await i18next.changeLanguage("az");

    expect((await gidenBasliklar(instance))["Accept-Language"]).toBe("az");
  });

  it("dil değişince sonraki istek yeni dille gider", async () => {
    await i18next.changeLanguage("ru");
    expect((await gidenBasliklar(instance))["Accept-Language"]).toBe("ru");

    await i18next.changeLanguage("en");
    expect((await gidenBasliklar(instance))["Accept-Language"]).toBe("en");
  });

  it("tarayıcıdan bölgeli dil algılanırsa arayüzün kullandığı dili gönderir", async () => {
    await i18next.changeLanguage("en-US");

    expect((await gidenBasliklar(instance))["Accept-Language"]).toBe("en");
  });
});
