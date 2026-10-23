// Takip panellerinin İşlem sütunundaki düğmeler (tasarım: 32px yükseklik, 8px köşe, içeriğe göre genişlik).
// Global CSS ".ant-btn-primary" zeminini !important ile ezdiği için renkli düğmeler type="primary" olmadan, satır içi stille boyanır.
const temelButonStyle = {
  height: "32px",
  padding: "0 14px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: 600,
  boxShadow: "none",
};

export const getDolguButonStyle = (renk, disabled = false) => ({
  ...temelButonStyle,
  border: "none",
  backgroundColor: renk,
  color: "#fff",
  opacity: disabled ? 0.45 : 1,
});

export const cerceveButonStyle = {
  ...temelButonStyle,
  fontWeight: 500,
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  color: "#141414",
};

// "⋯" menü düğmesi kare görünür
export const menuButonStyle = {
  ...cerceveButonStyle,
  width: "32px",
  padding: 0,
};
