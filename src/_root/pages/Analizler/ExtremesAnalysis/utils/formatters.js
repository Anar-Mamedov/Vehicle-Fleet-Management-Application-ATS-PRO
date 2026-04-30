import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

export const formatNumber = (value) => formatNumberWithLocale(Number(value) || 0);
export const formatCurrency = (value) => formatNumberWithLocale(Number(value) || 0) + " ₺";
export const formatDecimalCurrency = (value) => "₺" + formatNumberWithLocale(Number(value) || 0, 2, 2);
export const safeText = (value, fallback = "-") => (value === null || value === undefined || value === "" ? fallback : value);

export const getVehicleTitle = (item = {}) => safeText(item.plaka || item.name);
export const getVehicleSubTitle = (item = {}) => [item.marka, item.model, item.yil || item.year].filter(Boolean).join(" • ") || "-";
