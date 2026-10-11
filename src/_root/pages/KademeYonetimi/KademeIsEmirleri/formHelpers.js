import dayjs from "dayjs";
import { t } from "i18next";
import { formatDateForApi, formatTimeForApi, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../utils/dateUtils";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import { formatDateByLocale } from "../../../components/FormattedDate";
import { DURUM, toNullable, toNullableId } from "./constants";

// Yeni iş emri formunun başlangıç değerleri; servis ekranında olduğu gibi yeni kayıt "Bekliyor" durumunda açılır
export const getDefaultIsEmriValues = () => ({
  servisNo: null,
  servisTanimi: null,
  bakimId: null,
  plaka: null,
  plakaID: null,
  surucu: null,
  surucuID: null,
  km: null,
  servisNedeni: null,
  servisNedeniID: null,
  durumBilgisi: DURUM.BEKLIYOR,
  kademe: null,
  kademeID: null,
  bolum: null,
  bolumID: null,
  lokasyon: null,
  lokasyonId: null,
  oncelik: null,
  oncelikID: null,
  baslamaTarih: null,
  baslamaSaat: null,
  bitisTarih: null,
  bitisSaat: null,
  iscilik: 0,
  malzeme: 0,
  kdv: 0,
  indirim: 0,
  diger: 0,
  aciklama: null,
});

// GetVehicleServiceById yanıtını form alanlarına çevirir.
// KodIDSelectbox / KademeSelectbox id'yi `${name1}ID` alanına yazdığı için kod id eşlemeleri burada yapılır.
export const mapIsEmriToFormValues = (item) => ({
  ...getDefaultIsEmriValues(),
  servisNo: toNullable(item.servisNo),
  servisTanimi: toNullable(item.servisTanimi),
  bakimId: toNullableId(item.bakimId),
  plaka: toNullable(item.plaka),
  plakaID: toNullableId(item.aracId),
  surucu: toNullable(item.surucuIsim),
  surucuID: toNullableId(item.surucuId),
  km: toNullableId(item.km),
  servisNedeni: toNullable(item.servisNedeni),
  servisNedeniID: toNullableId(item.servisNedeniKodId),
  durumBilgisi: toNullableId(item.durumBilgisi),
  kademe: toNullable(item.kademe),
  kademeID: toNullableId(item.kademeId),
  bolum: toNullable(item.bolum),
  bolumID: toNullableId(item.bolumKodId),
  lokasyon: toNullable(item.lokasyon),
  lokasyonId: toNullableId(item.lokasyonId),
  oncelik: toNullable(item.oncelik),
  oncelikID: toNullableId(item.oncelikKodId),
  baslamaTarih: toDayjsOrNull(item.baslamaTarih),
  baslamaSaat: toTimeDayjsOrNull(item.baslamaSaat),
  bitisTarih: toDayjsOrNull(item.bitisTarih),
  bitisSaat: toTimeDayjsOrNull(item.bitisSaat),
  diger: item.diger || 0,
  aciklama: toNullable(item.aciklama),
});

// Servis ekranındaki toplam maliyet hesabı: işçilik + malzeme + diğer + KDV - indirim (2 haneye yuvarlanır)
export const hesaplaToplamMaliyet = ({ iscilik, malzeme, diger, kdv, indirim }) => {
  const toplam = Number(iscilik || 0) + Number(malzeme || 0) + Number(diger || 0) + Number(kdv || 0) - Number(indirim || 0);
  return Math.round((toplam + Number.EPSILON) * 100) / 100;
};

// Ekleme ve güncelleme servislerinin ortak gövdesi.
// tamamlandi bilgisi servis ekranındaki gibi gönderilir; periyodik bakımın bir sonraki hedefi bu bilgiyle güncellenir.
export const buildIsEmriBody = (values) => ({
  servisNo: values.servisNo || "",
  aracId: values.plakaID || 0,
  surucuId: values.surucuID || 0,
  durumBilgisi: values.durumBilgisi || 0,
  tamamlandi: values.durumBilgisi === DURUM.TAMAMLANDI,
  kademeId: values.kademeID || 0,
  bakimId: values.bakimId || 0,
  km: Number(values.km) || 0,
  servisNedeniKodId: values.servisNedeniID || 0,
  bolumKodId: values.bolumID || 0,
  lokasyonId: values.lokasyonId || 0,
  oncelikKodId: values.oncelikID || 0,
  baslamaTarih: formatDateForApi(values.baslamaTarih),
  baslamaSaat: formatTimeForApi(values.baslamaSaat, true),
  bitisTarih: formatDateForApi(values.bitisTarih),
  bitisSaat: formatTimeForApi(values.bitisSaat, true),
  isIsemri: true,
  iscilik: Number(values.iscilik) || 0,
  malzeme: Number(values.malzeme) || 0,
  kdv: Number(values.kdv) || 0,
  indirim: Number(values.indirim) || 0,
  diger: Number(values.diger) || 0,
  toplam: hesaplaToplamMaliyet(values),
  aciklama: values.aciklama || "",
});

// Yeni kayıtta düzenlenme tarihi/saati servis ekranındaki gibi kaydın açıldığı an olarak gönderilir
export const buildEklemeAlanlari = () => {
  const now = dayjs();
  return { tarih: formatDateForApi(now), saat: formatTimeForApi(now, true), isRecordSeen: true };
};

// İş emri formunda bulunmayan servis alanları (fatura, sigorta, özel alanlar vb.) güncellemede silinmesin diye
// detaydan okunan değerleriyle aynen geri gönderilir.
export const buildKorunanServisAlanlari = (item) => ({
  tarih: formatDateForApi(item.tarih),
  saat: formatTimeForApi(toTimeDayjsOrNull(item.saat), true),
  islemiYapan: item.islemiYapan,
  islemiYapanId: item.islemiYapanId || 0,
  kazaId: item.kazaId || 0,
  onayId: item.onayId || 0,
  talepNo: item.talepNo,
  faturaNo: item.faturaNo,
  faturaTarih: formatDateForApi(item.faturaTarih),
  sikayetler: item.sikayetler,
  sigortaVar: Boolean(item.sigortaVar),
  sigortaId: item.sigortaId || 0,
  surucuOder: Boolean(item.surucuOder),
  garantili: Boolean(item.garantili),
  arizaTalepId: item.arizaTalepId || 0,
  ozelAlan1: item.ozelAlan1,
  ozelAlan2: item.ozelAlan2,
  ozelAlan3: item.ozelAlan3,
  ozelAlan4: item.ozelAlan4,
  ozelAlan5: item.ozelAlan5,
  ozelAlan6: item.ozelAlan6,
  ozelAlan7: item.ozelAlan7,
  ozelAlan8: item.ozelAlan8,
  ozelAlanKodId9: item.ozelAlanKodId9 || 0,
  ozelAlanKodId10: item.ozelAlanKodId10 || 0,
  ozelAlan11: item.ozelAlan11 || 0,
  ozelAlan12: item.ozelAlan12 || 0,
  isRecordSeen: false,
});

// Periyodik bakım tamamlandığında servis bir sonraki hedef km/tarihi döner; servis ekranındaki bilgi mesajı gösterilir
export const getKayitBasariMesaji = (responseData, values) => {
  const hedefKm = responseData?.targetKm;
  const hedefTarih = responseData?.targetDate;
  if (hedefKm === undefined || hedefKm === null || hedefTarih === undefined || hedefTarih === null) {
    return t("islemBasarili");
  }

  return t("periyodikBakimHedefiGuncellendi", {
    plaka: values.plaka,
    servisTanimi: values.servisTanimi,
    km: formatNumberWithLocale(responseData.targetKm),
    tarih: formatDateByLocale(responseData.targetDate),
  });
};
