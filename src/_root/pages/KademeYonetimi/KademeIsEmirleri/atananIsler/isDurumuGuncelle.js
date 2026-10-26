import dayjs from "dayjs";
import { GetServiceWorkCardByIdService, UpdateServiceWorkCardService, UpdateServiceWorkCardStatusService } from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatTimeForApi, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import { IS_DURUM, isSuccessResponse } from "../constants";

// Başlat boş başlama zamanını, Bitir boş bitiş zamanını sistem zamanıyla doldurur; dolu tarihe dokunulmaz
const getEksikTarihler = (kart, status) => {
  const simdi = dayjs();
  const baslatiliyor = status === IS_DURUM.DEVAM_EDIYOR || status === IS_DURUM.YENIDEN_BASLADI;

  if (baslatiliyor && !toDayjsOrNull(kart.baslamaTarih)) return { baslamaTarih: simdi, baslamaSaat: simdi };
  if (status === IS_DURUM.TAMAMLANDI && !toDayjsOrNull(kart.bitisTarih)) return { bitisTarih: simdi, bitisSaat: simdi };
  return null;
};

// Güncelleme gövdesi İş Detayı'ndaki gövdeyle aynıdır; değişmeyen alanlar kartın kayıtlı halinden aynen geri gönderilir
const buildIsKartiBody = (isId, kart, tarihler) => ({
  siraNo: isId,
  personelId: kart.personelId || 0,
  yardimciPersonelId: kart.yardimciPersonelId || 0,
  baslamaTarih: formatDateForApi(tarihler.baslamaTarih ?? kart.baslamaTarih),
  baslamaSaat: formatTimeForApi(tarihler.baslamaSaat ?? toTimeDayjsOrNull(kart.baslamaSaat), true),
  bitisTarih: formatDateForApi(tarihler.bitisTarih ?? kart.bitisTarih),
  bitisSaat: formatTimeForApi(tarihler.bitisSaat ?? toTimeDayjsOrNull(kart.bitisSaat), true),
  toplam: Number(kart.toplam) || 0,
  aciklama: kart.aciklama || "",
});

// İş durumunu değiştirir. Durum servisi tarih yazmadığı için eksik başlama/bitiş zamanı önce iş kartına kaydedilir.
// Dönen değer durum servisinin (veya başarısız olduysa tarih güncellemesinin) yanıtıdır.
export const updateIsDurumu = async (isId, status) => {
  const kartResponse = await GetServiceWorkCardByIdService(isId);
  const kart = kartResponse?.data?.status === false ? null : kartResponse?.data;
  const eksikTarihler = kart ? getEksikTarihler(kart, status) : null;

  if (eksikTarihler) {
    const tarihResponse = await UpdateServiceWorkCardService(buildIsKartiBody(isId, kart, eksikTarihler));
    if (!isSuccessResponse(tarihResponse)) return tarihResponse;
  }

  return UpdateServiceWorkCardStatusService(isId, status);
};
