import dayjs from "dayjs";
import { t } from "i18next";
import { formatDateForApi } from "../../../../utils/dateUtils";

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

// Servisten gelen boş metin ve 0 değerleri placeholder kaybolmasın diye form alanlarına null yazılır
export const toNullable = (value) => (value === "" || value === undefined ? null : value);
export const toNullableId = (value) => (value === 0 || value === "" || value === undefined ? null : value);

export const isSuccessResponse = (response) => [200, 201, 202].includes(response?.data?.statusCode);
