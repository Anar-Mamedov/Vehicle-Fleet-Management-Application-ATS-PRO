const numberFormatter = new Intl.NumberFormat("tr-TR");
const currencyFormatter = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

export const formatNumber = (value) => numberFormatter.format(Number(value) || 0);
export const formatCurrency = (value) => currencyFormatter.format(Number(value) || 0);
export const formatDecimalCurrency = (value) => `₺${Number(value || 0).toLocaleString("tr-TR", { maximumFractionDigits: 2 })}`;
export const safeText = (value, fallback = "-") => (value === null || value === undefined || value === "" ? fallback : value);

export const getVehicleTitle = (item = {}) => safeText(item.plaka || item.name);
export const getVehicleSubTitle = (item = {}) => [item.marka, item.model, item.yil || item.year].filter(Boolean).join(" • ") || "-";
