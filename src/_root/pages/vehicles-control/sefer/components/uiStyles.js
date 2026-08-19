// Operasyon güncelleme ekranındaki tüm sekmeler aynı kart/etiket görünümünü paylaşır
export const BORDER_COLOR = "#f0f0f0";

export const cardStyle = {
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: "8px",
  padding: "20px",
  backgroundColor: "white",
};

export const labelStyle = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#5d6786",
  lineHeight: "18px",
};

export const sectionIconStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "8px",
  backgroundColor: "#f0f1fa",
  color: "#5b548b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  flexShrink: 0,
};

export const sectionTitleStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#141414",
  lineHeight: "20px",
};

// Kart içindeki alanların satır/sütun boşlukları
export const fieldGridStyle = {
  rowGap: "18px",
  columnGap: "16px",
};
