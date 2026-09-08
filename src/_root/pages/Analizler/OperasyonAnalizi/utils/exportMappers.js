import { t } from "i18next";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { formatMonthLabel, safeText } from "./formatters";

// Excel çıktısındaki başlıklar ekrandaki kolon başlıklarıyla aynı olsun diye tek yerde tutulur
export const gunlukOzetRows = (rows = []) =>
  rows.map((item) => ({
    [t("tarih")]: formatDateByLocale(item.tarih),
    [t("operasyonNo")]: safeText(item.operasyonNo),
    [t("hareket")]: item.hareketSaysi,
    [t("planlanan")]: item.planlananMiktar,
    [t("gerceklesen")]: item.gerceklesenMiktar,
    [t("tutar")]: item.hakedisTutar,
  }));

export const firmaTutarRows = (rows = []) =>
  rows.map((item) => ({
    [t("firma")]: safeText(item.firma),
    [t("tutar")]: item.tutar,
  }));

export const surucuPerformansRows = (rows = []) =>
  rows.map((item) => ({
    [t("surucu")]: safeText(item.isim),
    [t("hareket")]: item.hareketSayisi,
    [t("gerceklesen")]: item.gerceklesenMiktar,
    [t("tutar")]: item.hakedisTutar,
  }));

export const personelOzetRows = (rows = []) =>
  rows.map((item) => ({
    [t("personelTekil")]: safeText(item.isim),
    [t("tip")]: safeText(item.tip),
    [t("hareket")]: item.hareketSayisi,
  }));

export const guzergahToplamRows = (rows = []) =>
  rows.map((item) => ({
    [t("guzergah")]: safeText(item.guzergah),
    [t("hareket")]: item.hareketSayisi,
    [t("miktar")]: item.gerceklesenMiktar,
    [t("ortalamaMiktar")]: item.ortalamaMiktar,
    [t("tutar")]: item.hakedisTutar,
  }));

export const aylikTrendRows = (rows = []) =>
  rows.map((item) => ({
    [t("donem")]: formatMonthLabel(item.yil, item.ay),
    [t("operasyonSayisi")]: item.operasyonSayisi,
    [t("gerceklesenMiktar")]: item.toplamGerceklesenMiktar,
  }));

// Sayfa üstündeki "Excel İndir" düğmesi tüm bölümleri tek dosyada ayrı sayfalar olarak indirir
export const buildAllSheets = (analysisData) => [
  { baslik: t("gunlukOperasyonOzeti"), satirlar: gunlukOzetRows(analysisData[6]) },
  { baslik: t("firmaBazliTutarOzeti"), satirlar: firmaTutarRows(analysisData[7]) },
  { baslik: t("surucuPerformansi"), satirlar: surucuPerformansRows(analysisData[8]) },
  { baslik: t("personelOzeti"), satirlar: personelOzetRows(analysisData[9]) },
  { baslik: t("guzergahBazliToplamlar"), satirlar: guzergahToplamRows(analysisData[10]) },
  { baslik: t("aylikOperasyonMiktarTrendleri"), satirlar: aylikTrendRows(analysisData[11]) },
];
