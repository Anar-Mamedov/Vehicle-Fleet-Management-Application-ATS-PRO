import dayjs from "dayjs";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/az";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

const getCurrentLanguage = () => localStorage.getItem("i18nextLng") || "tr";

// Backend'in gönderdiği ondalık basamak sayısı korunur (RULES.md 8)
const getFractionDigits = (value) => {
  const [, decimals = ""] = String(value ?? "").split(".");
  return decimals.length;
};

export const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const digits = getFractionDigits(value);
  return formatNumberWithLocale(value, digits, digits);
};

export const safeText = (value, fallback = "-") => (value === null || value === undefined || value === "" ? fallback : value);

// Servisin tüm "oran" alanları yüzde değil kesir olarak gelir:
// değişim oranı (bu dönem - önceki dönem) / önceki dönem, pay oranı ise parça / toplam.
// Örn. 27 operasyon / toplam 113 -> oran 0,2389 -> ekranda %23,9. Bu yüzden 100 ile çarpılır.
// toFixed, çarpımdan doğan kayan nokta artığını temizler (1.39 * 100 = 139.00000000000003).
export const formatPercent = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "-";
  }

  // 100 ile çarpım ondalığı iki basamak sola kaydırır; backend'in kalan hassasiyeti korunur
  const digits = Math.max(0, getFractionDigits(value) - 2);
  const percentage = Number((Number(value) * 100).toFixed(digits));

  return `%${formatNumberWithLocale(percentage, digits, digits)}`;
};

// Progress çubuklarının beklediği 0-100 aralığına çevirir
export const toPercentValue = (value) => {
  const percentage = Number(value) * 100;

  if (Number.isNaN(percentage)) {
    return 0;
  }

  return Math.min(100, Math.max(0, percentage));
};

// Servis type=2 yanıtında değişim oranını göndermediği için önceki dönemden hesaplanır
export const calculateChangeRatio = (current, previous) => {
  const previousValue = Number(previous);

  if (!previousValue) {
    return null;
  }

  return (Number(current) - previousValue) / previousValue;
};

// Aylık trend tooltip ve Excel çıktısı: kullanıcının dilinde "Ara 2026" biçiminde etiket üretir
export const formatMonthLabel = (yil, ay) => {
  const date = dayjs()
    .year(Number(yil))
    .month(Number(ay) - 1)
    .startOf("month");

  if (!date.isValid()) {
    return "-";
  }

  return date.locale(getCurrentLanguage()).format("MMM YYYY");
};

// Aylık trend ekseni yılı başlıkta gösterdiği için yalnızca kısa ay adını kullanır
export const formatShortMonthLabel = (ay) => {
  const date = dayjs()
    .month(Number(ay) - 1)
    .startOf("month");

  if (!date.isValid()) {
    return "-";
  }

  return date.locale(getCurrentLanguage()).format("MMM");
};
