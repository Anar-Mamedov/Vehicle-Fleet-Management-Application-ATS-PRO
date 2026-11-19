import dayjs from "dayjs";
import { t } from "i18next";
import {
  GetServiceWorkCardByIdService,
  GetVehicleServiceByIdService,
  UpdateServiceWorkCardService,
  UpdateServiceWorkCardStatusService,
} from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatTimeForApi, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import { IS_DURUM, IS_ISLEMI_DURUMU, getIsIslemleri, getIsKartiKilitMesajKey, getVarsayilanIsIslemiAciklamasi, isSuccessResponse } from "../constants";

// Detay servisleri hata halinde { status: false, message } gövdesi döner
const getGovde = (response) => (response?.data?.status === false ? null : response?.data || null);

// İş kartını ve bağlı iş emrinin durumunu birlikte okur; kilit ve işlem kuralları ikisine birden bakar
export const getIsKartiDurumBilgisi = async (isId) => {
  const kart = getGovde(await GetServiceWorkCardByIdService(isId));
  if (!kart) return null;

  const isEmri = kart.servisSiraNo ? getGovde(await GetVehicleServiceByIdService(kart.servisSiraNo)) : null;
  return { kart, isEmriDurumu: isEmri?.durumBilgisi ?? null };
};

// Başlat/Devam Et boş başlama zamanını, Bitir boş bitiş zamanını sistem zamanıyla doldurur; dolu tarihe dokunulmaz
const getEksikTarihler = (kart, status) => {
  const simdi = dayjs();
  const baslatiliyor = status === IS_DURUM.DEVAM_EDIYOR || status === IS_DURUM.YENIDEN_BASLATILDI;

  if (baslatiliyor && !toDayjsOrNull(kart.baslamaTarih)) return { baslamaTarih: simdi, baslamaSaat: simdi };
  if (status === IS_DURUM.TAMAMLANDI && !toDayjsOrNull(kart.bitisTarih)) return { bitisTarih: simdi, bitisSaat: simdi };
  return null;
};

// Güncelleme gövdesi İş Detayı'ndaki gövdeyle aynıdır; değişmeyen alanlar kartın kayıtlı halinden aynen geri gönderilir
const buildIsKartiBody = (isId, kart, tarihler) => ({
  siraNo: isId,
  isNo: kart.isNo || "",
  personelId: kart.personelId || 0,
  yardimciPersonelId: kart.yardimciPersonelId || 0,
  baslamaTarih: formatDateForApi(tarihler.baslamaTarih ?? kart.baslamaTarih),
  baslamaSaat: formatTimeForApi(tarihler.baslamaSaat ?? toTimeDayjsOrNull(kart.baslamaSaat), true),
  bitisTarih: formatDateForApi(tarihler.bitisTarih ?? kart.bitisTarih),
  bitisSaat: formatTimeForApi(tarihler.bitisSaat ?? toTimeDayjsOrNull(kart.bitisSaat), true),
  toplam: Number(kart.toplam) || 0,
  aciklama: kart.aciklama || "",
});

const basarisiz = (response) => ({ basarili: false, mesaj: response?.data?.message || t("islemBasarisiz") });

// Atanan işe kullanıcı işlemini (IS_ISLEMI) uygular ve { basarili, mesaj } döner.
// Liste/detay eski kalmış olabileceği için kilit ve işlemin uygunluğu kartın güncel haline göre yeniden denetlenir.
// Durum servisi tarih yazmadığı için eksik başlama/bitiş zamanı önce iş kartına kaydedilir.
// Açıklama boşsa logda görünecek varsayılan metin gönderilir.
export const updateIsDurumu = async (isId, islem, aciklama = "") => {
  const bilgi = await getIsKartiDurumBilgisi(isId);
  if (!bilgi) return basarisiz();

  const { kart, isEmriDurumu } = bilgi;
  const kilitMesajKey = getIsKartiKilitMesajKey(kart.durum, isEmriDurumu);
  if (kilitMesajKey) return { basarili: false, mesaj: t(kilitMesajKey) };
  if (!getIsIslemleri(kart.durum)[islem]) return { basarili: false, mesaj: t("isDurumuBuIslemeUygunDegil") };

  const status = IS_ISLEMI_DURUMU[islem];
  const eksikTarihler = getEksikTarihler(kart, status);
  if (eksikTarihler) {
    const tarihResponse = await UpdateServiceWorkCardService(buildIsKartiBody(isId, kart, eksikTarihler));
    if (!isSuccessResponse(tarihResponse)) return basarisiz(tarihResponse);
  }

  const response = await UpdateServiceWorkCardStatusService({
    id: isId,
    isNo: kart.isNo || "",
    status,
    aciklama: aciklama?.trim() || getVarsayilanIsIslemiAciklamasi(status),
  });

  return isSuccessResponse(response) ? { basarili: true } : basarisiz(response);
};
