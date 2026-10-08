import { t } from "i18next";

// Kademe tipi kod listesinin Kod Yönetimi'ndeki numarası
export const KADEME_TIP_KOD_ID = 924;

// TableCodeItem/IsCodeItemExist ile kademe kodunun benzersizlik kontrolünde kullanılan tablo adı
export const KADEME_KOD_TABLE_NAME = "kademe";

// Ekli belgeler ve resimler için refGroup
export const KADEME_REF_GROUP = "KADEME";

// Çalışma günleri API'ye ISO hafta günü numarası olarak (string) gider: "1" = Pazartesi ... "7" = Pazar
export const CALISMA_GUNU_DEGERLERI = ["1", "2", "3", "4", "5", "6", "7"];

const CALISMA_GUNU_ETIKET_ANAHTARLARI = {
  1: "gunPzt",
  2: "gunSal",
  3: "gunCar",
  4: "gunPer",
  5: "gunCum",
  6: "gunCmt",
  7: "gunPaz",
};

// Etiketler dil değişimine uyum sağlasın diye her çağrıda üretilir
export const getCalismaGunuOptions = () =>
  CALISMA_GUNU_DEGERLERI.map((value) => ({
    value,
    label: t(CALISMA_GUNU_ETIKET_ANAHTARLARI[value]),
  }));

export const getCalismaGunuLabel = (value) => {
  const labelKey = CALISMA_GUNU_ETIKET_ANAHTARLARI[value];
  return labelKey ? t(labelKey) : value;
};

// Yeni kademe tasarımdaki varsayılanlarla açılır: aktif, 08:00 - 18:00, hafta içi
export const VARSAYILAN_BASLAMA_SAATI = "08:00";
export const VARSAYILAN_BITIS_SAATI = "18:00";
export const VARSAYILAN_CALISMA_GUNLERI = ["1", "2", "3", "4", "5"];

// Servisten gelen boş metin ve 0 değerleri placeholder kaybolmasın diye form alanlarına null yazılır
export const toNullable = (value) => (value === "" || value === undefined ? null : value);
export const toNullableId = (value) => (value === 0 || value === "" || value === undefined ? null : value);

export const isSuccessResponse = (response) => [200, 201, 202].includes(response?.data?.statusCode);
