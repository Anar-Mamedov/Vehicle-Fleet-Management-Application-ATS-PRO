// Backend kod listelerinin numaraları; sefer/operasyon modülüyle aynı numaralar kullanılır
export const OPERASYON_TIP_KOD_ID = 120;
export const HAREKET_TIP_KOD_ID = 916;
export const VARDIYA_KOD_ID = 917;
export const OPERASYON_YERI_KOD_ID = 918;

// type=1..5 KPI kutularını, type=6..11 alt bölümleri besler
export const KPI_TYPES = [1, 2, 3, 4, 5];
export const SECTION_TYPES = [6, 7, 8, 9, 10, 11];
export const ALL_TYPES = [...KPI_TYPES, ...SECTION_TYPES];

export const colors = {
  navy: "#14304f",
  teal: "#0f9b8e",
  positive: "#16a34a",
  negative: "#dc2626",
  grid: "#e5e7eb",
  cardBorder: "#e2e8f0",
  pageBackground: "#f8fafc",
  title: "#0f172a",
  muted: "#64748b",
};

// Firma bazlı tutar grafiğinde en yüksekten en düşüğe koyudan açığa giden ton dizisi
export const barColorRamp = ["#14304f", "#1d4e89", "#2f6fbd", "#5b93d3", "#8fb8e2", "#a8c9e8"];

export const emptyFilters = {
  firmaIds: [],
  operasyonTipIds: [],
  hareketTipIds: [],
  guzergahIds: [],
  operasyonYeriIds: [],
  vardiyaIds: [],
  surucuIds: [],
  personelIds: [],
};
