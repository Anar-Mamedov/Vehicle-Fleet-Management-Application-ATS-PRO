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

// Servis "oran" alanını yüzde değil kesir olarak gönderir: (bu dönem - önceki dönem) / önceki dönem.
// Örn. 491 operasyon / önceki dönem 178 -> oran 1.76 -> ekranda %176. Bu yüzden 100 ile çarpılır.
// toFixed, çarpımdan doğan kayan nokta artığını temizler (1.39 * 100 = 139.00000000000003).
export const formatChangeRatio = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "-";
  }

  // 100 ile çarpım ondalığı iki basamak sola kaydırır; backend'in kalan hassasiyeti korunur
  const digits = Math.max(0, getFractionDigits(value) - 2);
  const percentage = Number((Number(value) * 100).toFixed(digits));

  return `%${formatNumberWithLocale(percentage, digits, digits)}`;
};

// Aylık trend ekseni: kullanıcının dilinde "Ara 2026" biçiminde etiket üretir
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
