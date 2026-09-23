// Backend kod listelerinin numaraları; sefer/operasyon modülüyle aynı numaralar kullanılır
export const OPERASYON_TIP_KOD_ID = 120;
export const HAREKET_TIP_KOD_ID = 916;
export const VARDIYA_KOD_ID = 917;
export const OPERASYON_YERI_KOD_ID = 918;

// type=1..5 KPI kutularını, type=6..11 alt bölümleri besler
export const KPI_TYPES = [1, 2, 3, 4, 5];
export const SECTION_TYPES = [6, 7, 8, 9, 10, 11];
export const ALL_TYPES = [...KPI_TYPES, ...SECTION_TYPES];

// type=7 "info" parametresine, type=11 ise widget'ın kendi yıl seçimine bağlı olduğu için ayrı istekle çekilir
export const FIRMA_DAGILIM_TYPE = 7;
export const AYLIK_TREND_TYPE = 11;
export const BASE_TYPES = ALL_TYPES.filter((type) => type !== FIRMA_DAGILIM_TYPE && type !== AYLIK_TREND_TYPE);

// type=7 için servisin kabul ettiği gösterge değerleri
export const FIRMA_DAGILIM_INFO = {
  OPERASYON: "operasyon",
  HAREKET: "hareket",
  TUTAR: "tutar",
  GERCEKLESEN_MIKTAR: "gerceklesenMiktar",
};

// Seçilen göstergenin ekranda ve Excel başlığında kullanılan çeviri anahtarı
export const FIRMA_DAGILIM_INFO_LABEL_KEYS = {
  [FIRMA_DAGILIM_INFO.OPERASYON]: "operasyon",
  [FIRMA_DAGILIM_INFO.HAREKET]: "hareket",
  [FIRMA_DAGILIM_INFO.TUTAR]: "tutar",
  [FIRMA_DAGILIM_INFO.GERCEKLESEN_MIKTAR]: "gerceklesenMiktar",
};

// Servis 1 yıldan uzun tarih aralığını 403 ile reddediyor
export const MAX_DATE_RANGE_YEARS = 1;

// Kartlarda yalnızca ilk 5 kayıt görünür, tamamı "Büyüt" penceresinde sayfalanarak listelenir
export const WIDGET_PREVIEW_ROW_COUNT = 5;
// Firma bazlı dağılım kartı ilk 10 firmayı gösterir; tablo kartlarının 5 kayıt sınırından bağımsızdır
export const FIRMA_DAGILIM_PREVIEW_COUNT = 10;
export const WIDGET_PAGE_SIZE_STORAGE_KEY = "operasyonAnaliziWidgetPageSize";

// "Büyüt" penceresinin gövde yüksekliği ile içindeki tablo gövdesi birlikte hesaplanır (RULES.md 14).
// 140px: modal üst boşluğu (20) + başlık bloğu (32) + içerik dolgusu (40) + alt boşluk (48).
// Aradaki 110px fark: tablo başlığı, yatay kaydırma çubuğu ve sayfalama satırı.
// Modal gövdesi taşmayı gizler; tek kaydırma çubuğu tablonun kendi gövdesindedir.
// Biri değişirse ikisi birlikte güncellenir.
export const EXPANDED_MODAL_BODY_HEIGHT = "calc(100vh - 140px)";
export const EXPANDED_TABLE_SCROLL_Y = "calc(100vh - 250px)";

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
  track: "#eef2f7",
  chartCursor: "#cccccc",
};

// Firma bazlı dağılım grafiğinde en yüksekten en düşüğe koyudan açığa giden ton dizisi
export const barColorRamp = ["#14304f", "#1d4e89", "#2f6fbd", "#5b93d3", "#8fb8e2", "#a8c9e8"];

// Aylık trend grafiğinin seri renkleri; kartların koyu paletinden ayrı, grafik için canlı tonlar kullanılır
export const trendSeriesColors = {
  operasyon: "#1677ff",
  miktar: "#13c2c2",
};

export const emptyFilters = {
  firmaIds: [],
  aracIds: [],
  lokasyonIds: [],
  operasyonTipIds: [],
  hareketTipIds: [],
  guzergahIds: [],
  operasyonYeriIds: [],
  vardiyaIds: [],
  surucuIds: [],
  personelIds: [],
};
