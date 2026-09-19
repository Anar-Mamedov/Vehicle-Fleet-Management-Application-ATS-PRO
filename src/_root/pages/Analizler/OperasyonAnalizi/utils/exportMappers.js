import { t } from "i18next";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { formatMonthLabel, formatPercent, safeText } from "./formatters";

// Excel çıktısındaki başlıklar ekrandaki kolon başlıklarıyla aynı olsun diye tek yerde tutulur
export const gunlukOzetRows = (rows = []) =>
  rows.map((item) => ({
    [t("tarih")]: formatDateByLocale(item.tarih),
    [t("operasyon")]: item.seferSayisi,
    [t("hareket")]: item.hareketSaysi,
    [t("planlanan")]: item.planlananMiktar,
    [t("gerceklesen")]: item.gerceklesenMiktar,
    [t("gerceklesmeOrani")]: formatPercent(item.dolulukOrani),
    [t("tutar")]: item.hakedisTutar,
  }));

// Değer kolonunun başlığı seçilen göstergeye (info) göre değişir
export const firmaDagilimRows = (rows = [], degerBasligi = t("deger")) =>
  rows.map((item) => ({
    [t("firma")]: safeText(item.firma),
    [degerBasligi]: item.deger,
    [t("oran")]: formatPercent(item.oran),
  }));

export const surucuOzetRows = (rows = []) =>
  rows.map((item) => ({
    [t("surucu")]: safeText(item.isim),
    [t("operasyon")]: item.seferSayisi,
    [t("hareket")]: item.hareketSayisi,
    [t("miktar")]: item.gerceklesenMiktar,
    [t("hareketBasinaOrt")]: item.hareketBasinaOrt,
  }));

export const personelKatilimRows = (rows = []) =>
  rows.map((item) => ({
    [t("personelTekil")]: safeText(item.isim),
    [t("aktifGun")]: item.aktifGunSayisi,
    [t("operasyon")]: item.seferSayisi,
    [t("hareket")]: item.hareketSayisi,
    [t("hareketGun")]: item.hareketGunOrani,
    [t("farkliArac")]: item.farkliAracSayisi,
    [t("guzergah")]: item.guzergahSayisi,
  }));

export const guzergahOzetRows = (rows = []) =>
  rows.map((item) => ({
    [t("guzergah")]: safeText(item.guzergah),
    [t("operasyon")]: item.seferSayisi,
    [t("hareket")]: item.hareketSayisi,
    [t("miktar")]: item.gerceklesenMiktar,
    [t("ortalamaMiktar")]: item.ortalamaMiktar,
    [t("tutar")]: item.hakedisTutar,
  }));

export const aylikTrendRows = (rows = []) =>
  rows.map((item) => ({
    [t("donem")]: formatMonthLabel(item.yil, item.ay),
    [t("operasyon")]: item.seferSayisi,
    [t("gerceklesenMiktar")]: item.toplamGerceklesenMiktar,
  }));

// Sayfa üstündeki "Excel İndir" düğmesi tüm bölümleri tek dosyada ayrı sayfalar olarak indirir
export const buildAllSheets = (analysisData, firmaDegerBasligi) => [
  { baslik: t("gunlukOperasyonOzeti"), satirlar: gunlukOzetRows(analysisData[6]) },
  { baslik: t("firmaBazliDagilim"), satirlar: firmaDagilimRows(analysisData[7], firmaDegerBasligi) },
  { baslik: t("surucuBazliOperasyonOzeti"), satirlar: surucuOzetRows(analysisData[8]) },
  { baslik: t("personelOperasyonKatilimi"), satirlar: personelKatilimRows(analysisData[9]) },
  { baslik: t("guzergahBazliOperasyonOzeti"), satirlar: guzergahOzetRows(analysisData[10]) },
  { baslik: t("aylikOperasyonMiktarTrendleri"), satirlar: aylikTrendRows(analysisData[11]) },
];
