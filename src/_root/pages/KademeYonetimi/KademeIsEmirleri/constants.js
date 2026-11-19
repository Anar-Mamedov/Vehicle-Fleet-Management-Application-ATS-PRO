import dayjs from "dayjs";
import { t } from "i18next";
import { formatDateForApi, formatIsoDateTimeForApi } from "../../../../utils/dateUtils";
import { KOD_BENZERSIZLIK_GRUBU } from "../../../../utils/kodBenzersizlikGruplari";
import { formatDateByLocale } from "../../../components/FormattedDate";

// Kod Yönetimi'ndeki kod listesi numaraları
export const BOLUM_KOD_ID = 925;
export const ONCELIK_KOD_ID = 926;
export const IS_EMRI_NEDENI_KOD_ID = 104;

// TableCodeItem/IsCodeItemExist ile iş emri numarasının benzersizlik kontrolünde kullanılan grup (servis numarasıyla ortak)
export const IS_EMRI_KOD_TABLE_NAME = KOD_BENZERSIZLIK_GRUBU.IS_EMRI_SERVIS_NO;

// Atanan işin (iş kartı / işçilik) numarasının benzersizlik grubu
export const IS_NO_TABLE_NAME = KOD_BENZERSIZLIK_GRUBU.ISCILIK_NO;

// İş emirleri servis işlemleri kayıtları olduğu için belge ve resimler servis ekranıyla aynı grupta tutulur
export const IS_EMRI_REF_GROUP = "Servis_islemleri";

// Durum değerleri servis işlemleri ekranıyla aynıdır.
// YENIDEN_ACILDI yalnızca tarihçede görünür; yeniden açılan kart atanan işlerine göre 2 veya 4 olur.
export const DURUM = {
  BEKLIYOR: 1,
  DEVAM_EDIYOR: 2,
  IPTAL_EDILDI: 3,
  TAMAMLANDI: 4,
  KAPATILDI: 5,
  YENIDEN_ACILDI: 6,
};

const DURUM_TANIMLARI = {
  [DURUM.BEKLIYOR]: { labelKey: "bekliyor", color: "#ff9800" },
  [DURUM.DEVAM_EDIYOR]: { labelKey: "devamEdiyor", color: "#2196f3" },
  [DURUM.IPTAL_EDILDI]: { labelKey: "iptalEdildi", color: "#ff4d4f" },
  [DURUM.TAMAMLANDI]: { labelKey: "tamamlandi", color: "#2bc770" },
  [DURUM.KAPATILDI]: { labelKey: "kapatildi", color: "#595959" },
  [DURUM.YENIDEN_ACILDI]: { labelKey: "yenidenAcildi", color: "#722ed1" },
};

export const getDurumTanimi = (durum) => DURUM_TANIMLARI[durum] || null;

// Filtre seçenekleri önceki dört durumdur; Kapatıldı ve Yeniden Açıldı yalnızca etiket olarak gösterilir.
// Etiketler dil değişimine uyum sağlasın diye her çağrıda üretilir.
const FILTRE_DURUMLARI = [DURUM.BEKLIYOR, DURUM.DEVAM_EDIYOR, DURUM.IPTAL_EDILDI, DURUM.TAMAMLANDI];

export const getDurumOptions = () =>
  FILTRE_DURUMLARI.map((durum) => ({
    value: durum,
    label: t(DURUM_TANIMLARI[durum].labelKey),
  }));

// Kapatılmış veya iptal edilmiş iş emrinin tamamı salt okunurdur; yalnızca yeniden açılabilir
export const isIsEmriSaltOkunur = (durum) => durum === DURUM.IPTAL_EDILDI || durum === DURUM.KAPATILDI;

// İptal edilen, tamamlanan veya kapatılan iş emrinde atanan işlerin durumu değiştirilemez, malzeme talep edilemez ve teslim yapılamaz
const IS_ISLEMLERI_KILITLI_DURUMLAR = [DURUM.IPTAL_EDILDI, DURUM.TAMAMLANDI, DURUM.KAPATILDI];

export const isIsEmriIsIslemleriKilitli = (durum) => IS_ISLEMLERI_KILITLI_DURUMLAR.includes(Number(durum));

// İş emri durum aksiyonları (UpdateVehicleServiceOrderStatus durumId değerleri)
export const DURUM_ISLEMI = {
  KAPAT: DURUM.KAPATILDI,
  IPTAL_ET: DURUM.IPTAL_EDILDI,
  YENIDEN_AC: DURUM.YENIDEN_ACILDI,
};

export const IS_EMRI_IPTAL_NEDEN_KOD_ID = 928;

// Atanan işlerin (iş kartlarının) durumları; iş emri durumlarından farklı bir listedir
export const IS_TURU_KOD_ID = 113;

// İş kartı durumları (backend "Servis İş Kartı ve Malzeme Talebi" notu). 3, 4, 7 ve 8'i yalnızca backend atar;
// 6, 9 ve 10 yalnızca logda kullanılır ve kart durumu olarak gönderilmez.
export const IS_DURUM = {
  BEKLIYOR: 1,
  DEVAM_EDIYOR: 2,
  MALZEME_ONAYI_BEKLIYOR: 3,
  MALZEME_TESLIMI_BEKLIYOR: 4,
  DURDU: 5,
  DEVAM_ETMESI_BEKLENIYOR: 7,
  TAMAMLAMA_ONAYI_BEKLIYOR: 8,
  YENIDEN_BASLATILDI: 11,
  TAMAMLANDI: 12,
  IPTAL_EDILDI: 13,
};

const IS_DURUM_TANIMLARI = {
  [IS_DURUM.BEKLIYOR]: { labelKey: "bekliyor", color: "#8c8c8c" },
  [IS_DURUM.DEVAM_EDIYOR]: { labelKey: "devamEdiyor", color: "#2196f3" },
  [IS_DURUM.MALZEME_ONAYI_BEKLIYOR]: { labelKey: "malzemeOnayiBekliyor", color: "#d48806" },
  [IS_DURUM.MALZEME_TESLIMI_BEKLIYOR]: { labelKey: "malzemeTeslimiBekliyor", color: "#fa8c16" },
  [IS_DURUM.DURDU]: { labelKey: "durdu", color: "#ff9800" },
  [IS_DURUM.DEVAM_ETMESI_BEKLENIYOR]: { labelKey: "isinDevamEtmesiBekleniyor", color: "#13a8a8" },
  [IS_DURUM.TAMAMLAMA_ONAYI_BEKLIYOR]: { labelKey: "tamamlamaOnayiBekliyor", color: "#eb2f96" },
  [IS_DURUM.YENIDEN_BASLATILDI]: { labelKey: "yenidenBaslatildi", color: "#722ed1" },
  [IS_DURUM.TAMAMLANDI]: { labelKey: "tamamlandi", color: "#2bc770" },
  [IS_DURUM.IPTAL_EDILDI]: { labelKey: "iptalEdildi", color: "#ff4d4f" },
};

// Yeni atanan iş servisten durumsuz (0) gelebilir; henüz başlamamış iş "Bekliyor" kabul edilir
export const normalizeIsDurumu = (durum) => Number(durum) || IS_DURUM.BEKLIYOR;

export const getIsDurumTanimi = (durum) => IS_DURUM_TANIMLARI[normalizeIsDurumu(durum)] || null;

export const getIsDurumFiltreOptions = () =>
  Object.values(IS_DURUM).map((durum) => ({
    value: durum,
    label: t(IS_DURUM_TANIMLARI[durum].labelKey),
  }));

// İş kartı logunun anlamı kart durumundan farklı adlandırılır; açıklama metni logun kendisinden gelir
const IS_LOG_DURUM_TANIMLARI = {
  1: { labelKey: "atamaYapildi", color: "#8c8c8c" },
  2: { labelKey: "baslatildi", color: "#2196f3" },
  3: { labelKey: "malzemeOnayiBekleniyor", color: "#d48806" },
  4: { labelKey: "malzemeTeslimiBekleniyor", color: "#fa8c16" },
  5: { labelKey: "duraklatildi", color: "#ff9800" },
  6: { labelKey: "malzemeTalebiOnaylanmadi", color: "#ff4d4f" },
  7: { labelKey: "isinDevamEtmesiBekleniyor", color: "#13a8a8" },
  8: { labelKey: "tamamlamaOnayiBekleniyor", color: "#eb2f96" },
  9: { labelKey: "tamamlamaReddedildi", color: "#ff4d4f" },
  10: { labelKey: "tamamlamaOnaylandi", color: "#2bc770" },
  11: { labelKey: "yenidenBaslatildi", color: "#722ed1" },
  12: { labelKey: "tamamlandi", color: "#2bc770" },
  13: { labelKey: "iptalEdildi", color: "#ff4d4f" },
};

export const getIsLogDurumTanimi = (durum) => IS_LOG_DURUM_TANIMLARI[Number(durum)] || null;

// Kullanıcı işlemleri ve durum servisine gönderilen değerleri. Bitir her zaman 12 gönderir;
// iş tamamlama onayı aktifse backend kartı 8'e alır, onaylanınca 12, reddedilince 5 olur.
export const IS_ISLEMI = {
  BASLAT: "baslat",
  DURDUR: "durdur",
  DEVAM_ET: "devamEt",
  BITIR: "bitir",
  IPTAL_ET: "iptalEt",
};

export const IS_ISLEMI_DURUMU = {
  [IS_ISLEMI.BASLAT]: IS_DURUM.DEVAM_EDIYOR,
  [IS_ISLEMI.DURDUR]: IS_DURUM.DURDU,
  [IS_ISLEMI.DEVAM_ET]: IS_DURUM.YENIDEN_BASLATILDI,
  [IS_ISLEMI.BITIR]: IS_DURUM.TAMAMLANDI,
  [IS_ISLEMI.IPTAL_ET]: IS_DURUM.IPTAL_EDILDI,
};

// Durdur, Bitir ve İptal açıklama ister; Başlat ve Devam Et açıklamasız gönderilir
export const ACIKLAMA_ZORUNLU_IS_ISLEMLERI = [IS_ISLEMI.DURDUR, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET];

// Açıklama boş gönderilecekse logda görünecek varsayılan metin (backend notundaki örnek metinler)
const VARSAYILAN_IS_ISLEMI_ACIKLAMALARI = {
  [IS_DURUM.DEVAM_EDIYOR]: "isBaslatildiAciklama",
  [IS_DURUM.DURDU]: "isDuraklatildiAciklama",
  [IS_DURUM.YENIDEN_BASLATILDI]: "isYenidenBaslatildiAciklama",
  [IS_DURUM.TAMAMLANDI]: "isTamamlandiAciklama",
  [IS_DURUM.IPTAL_EDILDI]: "isIptalEdildiAciklama",
};

export const getVarsayilanIsIslemiAciklamasi = (status) => (VARSAYILAN_IS_ISLEMI_ACIKLAMALARI[status] ? t(VARSAYILAN_IS_ISLEMI_ACIKLAMALARI[status]) : "");

// Süre yalnızca 2 ve 11 durumlarında çalışır
export const isIsCalisiyor = (durum) => {
  const isDurumu = normalizeIsDurumu(durum);
  return isDurumu === IS_DURUM.DEVAM_EDIYOR || isDurumu === IS_DURUM.YENIDEN_BASLATILDI;
};

// Tamamlanan (onaylanan dahil) veya iptal edilen iş yalnızca görüntülenir
export const isIsKartiKapali = (durum) => {
  const isDurumu = normalizeIsDurumu(durum);
  return isDurumu === IS_DURUM.TAMAMLANDI || isDurumu === IS_DURUM.IPTAL_EDILDI;
};

// Çalışmayan ama daha önce başlamış işler (durmuş, malzeme bekleyen, malzemesi teslim edilen) Devam Et ile sürer
const DEVAM_ETTIRILEBILIR_DURUMLAR = [IS_DURUM.MALZEME_ONAYI_BEKLIYOR, IS_DURUM.MALZEME_TESLIMI_BEKLIYOR, IS_DURUM.DURDU, IS_DURUM.DEVAM_ETMESI_BEKLENIYOR];

// İşin durumuna göre hangi kullanıcı işlemlerinin açık olduğu (backend'deki geçiş kontrolleriyle aynı).
// Tamamlama onayı bekleyen işte (8) aynı iş için ikinci bir onay oluşmasın diye hiçbir durum işlemi yapılamaz;
// onay sonucu backend tarafından işlenir. Hiç başlamamış iş (1) bitirilemez; önce başlatılır ya da iptal edilir.
export const getIsIslemleri = (durum) => {
  const isDurumu = normalizeIsDurumu(durum);
  const islemYapilabilir = !isIsKartiKapali(isDurumu) && isDurumu !== IS_DURUM.TAMAMLAMA_ONAYI_BEKLIYOR;

  return {
    [IS_ISLEMI.BASLAT]: isDurumu === IS_DURUM.BEKLIYOR,
    [IS_ISLEMI.DURDUR]: isIsCalisiyor(isDurumu),
    [IS_ISLEMI.DEVAM_ET]: DEVAM_ETTIRILEBILIR_DURUMLAR.includes(isDurumu),
    [IS_ISLEMI.BITIR]: islemYapilabilir && isDurumu !== IS_DURUM.BEKLIYOR,
    [IS_ISLEMI.IPTAL_ET]: islemYapilabilir,
  };
};

// Satırdaki ana düğme: bekleyen iş Başlat, çalışan iş Durdur, duran/bekleyen iş Devam Et; diğerlerinde ana durum işlemi yoktur
export const getAnaIsIslemi = (durum) => {
  const islemler = getIsIslemleri(durum);
  return [IS_ISLEMI.BASLAT, IS_ISLEMI.DURDUR, IS_ISLEMI.DEVAM_ET].find((islem) => islemler[islem]) || null;
};

// Atanan işin kilidi: kart kapalıysa veya bağlı iş emri kilitliyse durum değişikliği, malzeme talebi ve teslim yapılamaz
export const getIsKartiKilitMesajKey = (isDurumu, isEmriDurumu) => {
  if (isIsKartiKapali(isDurumu)) return "isKartiKapaliIslemYapilamaz";
  if (isIsEmriIsIslemleriKilitli(isEmriDurumu)) return "isEmriKapaliIslemYapilamaz";
  return null;
};

// Malzeme talepleri
export const MALZEME_TALEP_NEDEN_KOD_ID = 927;
export const MALZEME_BIRIM_KOD_ID = 300;

// TableCodeItem/IsCodeItemExist ile talep numarasının benzersizlik kontrolünde kullanılan tablo adı
export const MALZEME_TALEP_KOD_TABLE_NAME = "talepNo";

export const MALZEME_TALEP_DURUM = {
  ONAYLANDI: 1,
  ONAY_BEKLIYOR: 2,
  REDDEDILDI: 3,
  KISMI_TESLIM_EDILDI: 4,
  TESLIM_EDILDI: 5,
};

const MALZEME_TALEP_DURUM_TANIMLARI = {
  [MALZEME_TALEP_DURUM.ONAYLANDI]: { labelKey: "onaylandi", color: "#13a8a8" },
  [MALZEME_TALEP_DURUM.ONAY_BEKLIYOR]: { labelKey: "onayBekliyor", color: "#ff9800" },
  [MALZEME_TALEP_DURUM.REDDEDILDI]: { labelKey: "reddedildi", color: "#ff4d4f" },
  [MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI]: { labelKey: "kismiTeslimEdildi", color: "#2196f3" },
  [MALZEME_TALEP_DURUM.TESLIM_EDILDI]: { labelKey: "teslimEdildi", color: "#2bc770" },
};

export const getMalzemeTalepDurumTanimi = (durum) => MALZEME_TALEP_DURUM_TANIMLARI[Number(durum)] || null;

// Teslim Et yalnızca onaylanmış veya kısmen teslim edilmiş talepte açıktır
export const isMalzemeTeslimEdilebilir = (durum) => [MALZEME_TALEP_DURUM.ONAYLANDI, MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI].includes(Number(durum));

// Talep yalnızca onaylandıysa (1) veya kısmen teslim edildiyse (4) değiştirilebilir (backend kuralı); onay bekleyen (2)
// ve reddedilen (3) talep düzenlenip yeniden onaya gönderilmez, teslim edilmiş (5) talep doküman gereği değiştirilemez.
export const isMalzemeTalebiDuzenlenebilir = (durum) => [MALZEME_TALEP_DURUM.ONAYLANDI, MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI].includes(Number(durum));

// Teslimi tamamlanmamış ve reddedilmemiş talepler açık sayılır (iş iptal edilirken kullanıcı uyarılır)
export const isMalzemeTalebiAcik = (durum) =>
  [MALZEME_TALEP_DURUM.ONAYLANDI, MALZEME_TALEP_DURUM.ONAY_BEKLIYOR, MALZEME_TALEP_DURUM.KISMI_TESLIM_EDILDI].includes(Number(durum));

// Onay Ayarları ekranındaki onay türlerinin tanım anahtarları (ApprovalSettings tanim alanı)
export const ONAY_TANIMI = {
  IS_TAMAMLAMA: "isTamamlamaOnayi",
  MALZEME_TALEP: "malzemeTalepOnayi",
};

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

// Liste "Süre" filtresinin seçenekleri (projedeki standart dönem listesi); tarih aralığı API'ye gönderilirken hesaplanır
const SURE_ARALIKLARI = {
  bugun: () => [dayjs().startOf("day"), dayjs().endOf("day")],
  dun: () => [dayjs().subtract(1, "day").startOf("day"), dayjs().subtract(1, "day").endOf("day")],
  buHafta: () => [dayjs().startOf("week"), dayjs().endOf("week")],
  gecenHafta: () => [dayjs().subtract(1, "week").startOf("week"), dayjs().subtract(1, "week").endOf("week")],
  buAy: () => [dayjs().startOf("month"), dayjs().endOf("month")],
  gecenAy: () => [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")],
  buYil: () => [dayjs().startOf("year"), dayjs().endOf("year")],
  gecenYil: () => [dayjs().subtract(1, "year").startOf("year"), dayjs().subtract(1, "year").endOf("year")],
  son7Gun: () => [dayjs().subtract(7, "day").startOf("day"), dayjs().endOf("day")],
  son1Ay: () => [dayjs().subtract(1, "month").startOf("day"), dayjs().endOf("day")],
  son3Ay: () => [dayjs().subtract(3, "month").startOf("day"), dayjs().endOf("day")],
  son6Ay: () => [dayjs().subtract(6, "month").startOf("day"), dayjs().endOf("day")],
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

// Özel tarih aralığı seçiliyse hazır dönem yok sayılır; ikisi aynı anda uygulanmaz
export const getFiltreTarihAraligi = (sure, tarihAraligi) => {
  const [baslangic, bitis] = tarihAraligi || [];
  if (baslangic && bitis) return { baslangicTarih: formatDateForApi(baslangic), bitisTarih: formatDateForApi(bitis) };

  return getSureTarihAraligi(sure);
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

// Durum güncelleme servisinde başarı gövdedeki status alanıyla bildirilir; statusCode HTTP kodundan ayrıdır
export const isDurumGuncellemeBasarili = (response) => response?.data?.status === true;
