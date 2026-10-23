import dayjs from "dayjs";
import { t } from "i18next";
import { formatDateForApi, formatIsoDateTimeForApi } from "../../../../utils/dateUtils";
import { formatDateByLocale } from "../../../components/FormattedDate";

// Kod Yönetimi'ndeki kod listesi numaraları
export const BOLUM_KOD_ID = 925;
export const ONCELIK_KOD_ID = 926;
export const IS_EMRI_NEDENI_KOD_ID = 104;

// TableCodeItem/IsCodeItemExist ile iş emri numarasının benzersizlik kontrolünde kullanılan tablo adı
export const IS_EMRI_KOD_TABLE_NAME = "isEmri";

// İş emirleri servis işlemleri kayıtları olduğu için belge ve resimler servis ekranıyla aynı grupta tutulur
export const IS_EMRI_REF_GROUP = "Servis_islemleri";

// Durum değerleri servis işlemleri ekranıyla aynıdır
export const DURUM = {
  BEKLIYOR: 1,
  DEVAM_EDIYOR: 2,
  IPTAL_EDILDI: 3,
  TAMAMLANDI: 4,
};

const DURUM_TANIMLARI = {
  [DURUM.BEKLIYOR]: { labelKey: "bekliyor", color: "#ff9800" },
  [DURUM.DEVAM_EDIYOR]: { labelKey: "devamEdiyor", color: "#2196f3" },
  [DURUM.IPTAL_EDILDI]: { labelKey: "iptalEdildi", color: "#ff4d4f" },
  [DURUM.TAMAMLANDI]: { labelKey: "tamamlandi", color: "#2bc770" },
};

export const getDurumTanimi = (durum) => DURUM_TANIMLARI[durum] || null;

// Etiketler dil değişimine uyum sağlasın diye her çağrıda üretilir
export const getDurumOptions = () =>
  Object.entries(DURUM_TANIMLARI).map(([value, { labelKey }]) => ({
    value: Number(value),
    label: t(labelKey),
  }));

// Atanan işlerin (iş kartlarının) durumları; iş emri durumlarından farklı bir listedir
export const IS_TURU_KOD_ID = 113;

export const IS_DURUM = {
  BEKLIYOR: 1,
  DEVAM_EDIYOR: 2,
  DURDU: 3,
  YENIDEN_BASLADI: 4,
  TAMAMLANDI: 5,
};

const IS_DURUM_TANIMLARI = {
  [IS_DURUM.BEKLIYOR]: { labelKey: "bekliyor", color: "#8c8c8c" },
  [IS_DURUM.DEVAM_EDIYOR]: { labelKey: "devamEdiyor", color: "#2196f3" },
  [IS_DURUM.DURDU]: { labelKey: "durdu", color: "#ff9800" },
  [IS_DURUM.YENIDEN_BASLADI]: { labelKey: "yenidenBasladi", color: "#722ed1" },
  [IS_DURUM.TAMAMLANDI]: { labelKey: "tamamlandi", color: "#2bc770" },
};

// Yeni atanan iş servisten durumsuz (0) gelir; henüz başlamamış iş "Bekliyor" kabul edilir
export const normalizeIsDurumu = (durum) => Number(durum) || IS_DURUM.BEKLIYOR;

export const getIsDurumTanimi = (durum) => IS_DURUM_TANIMLARI[normalizeIsDurumu(durum)] || null;

// Durum servisi "Bekliyor" değerini kabul etmediği için o seçenek yalnızca gösterilir, seçilemez
export const getIsDurumOptions = () =>
  Object.entries(IS_DURUM_TANIMLARI).map(([value, { labelKey }]) => ({
    value: Number(value),
    label: t(labelKey),
    disabled: Number(value) === IS_DURUM.BEKLIYOR,
  }));

// Malzeme talepleri
export const MALZEME_TALEP_NEDEN_KOD_ID = 927;
export const MALZEME_BIRIM_KOD_ID = 300;

// TableCodeItem/IsCodeItemExist ile talep numarasının benzersizlik kontrolünde kullanılan tablo adı
export const MALZEME_TALEP_KOD_TABLE_NAME = "talepNo";

// Backend yalnızca bu üç durumu tanımlar
export const MALZEME_TALEP_DURUM = {
  BEKLIYOR: 1,
  KISMI_KARSILANDI: 2,
  TAMAMLANDI: 3,
};

const MALZEME_TALEP_DURUM_TANIMLARI = {
  [MALZEME_TALEP_DURUM.BEKLIYOR]: { labelKey: "bekliyor", color: "#ff9800" },
  [MALZEME_TALEP_DURUM.KISMI_KARSILANDI]: { labelKey: "kismiKarsilandi", color: "#2196f3" },
  [MALZEME_TALEP_DURUM.TAMAMLANDI]: { labelKey: "tamamlandi", color: "#2bc770" },
};

export const getMalzemeTalepDurumTanimi = (durum) => MALZEME_TALEP_DURUM_TANIMLARI[durum] || null;

// Tek alanda gelen tarih + saat değerini (ör. talepTarih) ekranda "tarih saat" olarak gösterir
export const formatTarihSaatDegeri = (value) => {
  const tarih = formatDateByLocale(value);
  const saat = formatDateByLocale(value, "HH:mm", "");
  return saat ? `${tarih} ${saat}` : tarih;
};

// Süre servisten dakika olarak gelir
const ikiHane = (value) => String(value).padStart(2, "0");

export const formatSureKisa = (dakika) => {
  const toplamDakika = Number(dakika) || 0;
  if (toplamDakika <= 0) return "-";
  return `${ikiHane(Math.floor(toplamDakika / 60))}:${ikiHane(toplamDakika % 60)}`;
};

export const formatSureUzun = (dakika) => {
  const toplamDakika = Number(dakika) || 0;
  return t("sureSaatDakika", { saat: Math.floor(toplamDakika / 60), dakika: toplamDakika % 60 });
};

// Liste "Süre" filtresinin seçenekleri; tarih aralığı API'ye gönderilirken hesaplanır
const SURE_ARALIKLARI = {
  bugun: () => [dayjs().startOf("day"), dayjs().endOf("day")],
  buHafta: () => [dayjs().startOf("week"), dayjs().endOf("week")],
  buAy: () => [dayjs().startOf("month"), dayjs().endOf("month")],
  gecenAy: () => [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")],
  son3Ay: () => [dayjs().subtract(3, "month").startOf("day"), dayjs().endOf("day")],
  buYil: () => [dayjs().startOf("year"), dayjs().endOf("year")],
};

export const TUMU = "tumu";
export const VARSAYILAN_SURE = "buAy";

export const getSureOptions = () => [TUMU, ...Object.keys(SURE_ARALIKLARI)].map((value) => ({ value, label: t(value) }));

export const getSureTarihAraligi = (sure) => {
  const getAralik = SURE_ARALIKLARI[sure];
  if (!getAralik) return { baslangicTarih: null, bitisTarih: null };

  const [baslangic, bitis] = getAralik();
  return { baslangicTarih: formatDateForApi(baslangic), bitisTarih: formatDateForApi(bitis) };
};

// Takip panelleri aralığı tarih + saat olarak bekler (ör. "2026-10-01T00:00:00" – "2026-10-31T23:59:59")
export const getSureTarihSaatAraligi = (sure) => {
  const getAralik = SURE_ARALIKLARI[sure];
  if (!getAralik) return { baslangicTarih: null, bitisTarih: null };

  const [baslangic, bitis] = getAralik();
  return { baslangicTarih: formatIsoDateTimeForApi(baslangic), bitisTarih: formatIsoDateTimeForApi(bitis) };
};

// Servisten gelen boş metin ve 0 değerleri placeholder kaybolmasın diye form alanlarına null yazılır
export const toNullable = (value) => (value === "" || value === undefined ? null : value);
export const toNullableId = (value) => (value === 0 || value === "" || value === undefined ? null : value);

export const isSuccessResponse = (response) => [200, 201, 202].includes(response?.data?.statusCode);
