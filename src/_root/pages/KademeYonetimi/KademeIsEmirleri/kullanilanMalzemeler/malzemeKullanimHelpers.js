import dayjs from "dayjs";
import { GetServiceWorkCardsByServiceIdService } from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatIsoDateTimeForApi, toDayjsOrNull } from "../../../../../utils/dateUtils";
import { toNullable, toNullableId } from "../constants";

// Servis ekranındaki malzeme kullanımıyla aynı hareket tipi
const SERVIS_MALZEME_HAREKET_TIPI = 3;

export const getDefaultMalzemeKullanimValues = () => ({
  stoklu: false,
  cikisDepo: null,
  cikisDepoID: null,
  malzemeKod: null,
  malzemeId: null,
  malzemeTanim: null,
  miktar: null,
  birim: null,
  birimID: null,
  malzemeTip: null,
  bagliTalep: null,
  bagliTalepID: null,
  bagliIs: null,
  bagliIsID: null,
  aciklama: null,
  fiyat: 0,
  kdvOran: 0,
  indirimOran: 0,
  digerGiderler: 0,
  toplam: 0,
  faturaNo: null,
  faturaTarih: null,
  belgeIrsaliyeNo: null,
  tedarikci: null,
  faturaAciklama: null,
});

// Ara toplam = miktar × birim fiyatı; indirim ara toplamdan, KDV indirimli tutardan hesaplanır, diğer gider en sona eklenir
export const hesaplaMalzemeTutarlari = ({ miktar, fiyat, kdvOran, indirimOran, digerGiderler }) => {
  const araToplam = (Number(miktar) || 0) * (Number(fiyat) || 0);
  const indirim = (araToplam * (Number(indirimOran) || 0)) / 100;
  const kdvTutar = ((araToplam - indirim) * (Number(kdvOran) || 0)) / 100;
  const toplam = araToplam - indirim + kdvTutar + (Number(digerGiderler) || 0);
  return { araToplam, indirim, kdvTutar, toplam };
};

// Detaydaki iş tanımı malzeme tanımıyla karışabildiği için bağlı işin tanımı iş emrinin atanan işlerinden bulunur
export const getBagliIsTanimi = async (isEmriId, isId) => {
  if (!isId) return null;

  // Tanım bulunamazsa kayıt yine açılır; yalnızca select boş görünür
  try {
    const response = await GetServiceWorkCardsByServiceIdService(isEmriId);
    const isler = Array.isArray(response?.data) ? response.data : response?.data?.list || [];
    return isler.find((is) => is.siraNo === isId)?.isTanim || null;
  } catch {
    return null;
  }
};

export const mapMalzemeKullanimToFormValues = (kayit, bagliIsTanimi) => ({
  stoklu: Boolean(kayit.stoklu),
  cikisDepo: toNullable(kayit.cikisDepo),
  cikisDepoID: toNullableId(kayit.cikisDepoSiraNo),
  malzemeKod: toNullable(kayit.malezemeKod),
  malzemeId: toNullableId(kayit.malzemeId),
  malzemeTanim: toNullable(kayit.malezemeTanim),
  miktar: kayit.miktar ?? null,
  birim: toNullable(kayit.birim),
  birimID: toNullableId(kayit.birimKodId),
  malzemeTip: toNullable(kayit.malzemeTip),
  bagliTalep: kayit.talepId ? toNullable(kayit.talepNo) : null,
  bagliTalepID: toNullableId(kayit.talepId),
  bagliIs: kayit.isId ? bagliIsTanimi : null,
  bagliIsID: toNullableId(kayit.isId),
  aciklama: toNullable(kayit.aciklama),
  fiyat: kayit.fiyat || 0,
  kdvOran: kayit.kdvOran || 0,
  indirimOran: kayit.indirimOran || 0,
  digerGiderler: kayit.digerGiderler || 0,
  toplam: kayit.toplam || 0,
  faturaNo: toNullable(kayit.faturaNo),
  faturaTarih: toDayjsOrNull(kayit.faturaTarih),
  belgeIrsaliyeNo: toNullable(kayit.belgeIrsaliyeNo),
  tedarikci: toNullable(kayit.tedarikci),
  faturaAciklama: toNullable(kayit.faturaAciklama),
});

// Ekleme ve güncellemede formdan gelen ortak alanlar; tutarlar backend hesaplamadığı için burada hesaplanır
const buildFormAlanlari = (values) => ({
  malezemeTanim: values.malzemeTanim || "",
  miktar: Number(values.miktar) || 0,
  birimKodId: values.birimID || 0,
  talepId: values.bagliTalepID || 0,
  isId: values.bagliIsID || 0,
  aciklama: values.aciklama || "",
  fiyat: Number(values.fiyat) || 0,
  kdvOran: Number(values.kdvOran) || 0,
  indirimOran: Number(values.indirimOran) || 0,
  digerGiderler: Number(values.digerGiderler) || 0,
  ...hesaplaMalzemeTutarlari(values),
  faturaNo: values.faturaNo || "",
  faturaTarih: formatDateForApi(values.faturaTarih),
  belgeIrsaliyeNo: values.belgeIrsaliyeNo || "",
  tedarikci: values.tedarikci || "",
  faturaAciklama: values.faturaAciklama || "",
});

// Kullanım tarihi formda yer almaz; kaydın girildiği an gönderilir
export const buildMalzemeKullanimEklemeBody = (values, { isEmriId, aracId }) => ({
  servisSirano: isEmriId,
  mlzAracId: aracId || 0,
  gc: SERVIS_MALZEME_HAREKET_TIPI,
  stoklu: Boolean(values.stoklu),
  cikisDepoSiraNo: values.stoklu ? values.cikisDepoID || 0 : 0,
  malzemeId: values.malzemeId || 0,
  tarih: formatIsoDateTimeForApi(dayjs()),
  ...buildFormAlanlari(values),
});

// Güncelleme sorgusu stoklu, malzeme, depo, malzeme tipi ve tarihi değiştirmez; stok hesabı için mevcut değerleriyle gider.
// Sorgunun yazdığı ama formda olmayan alanlar da (araç, lokasyon, KDV toplamı, KDV dahil/hariç) detaydan aynen geri gönderilir.
export const buildMalzemeKullanimGuncellemeBody = (values, detay, isEmriId) => ({
  siraNo: detay.siraNo,
  servisSirano: detay.servisSirano || isEmriId,
  mlzAracId: detay.mlzAracId,
  gc: detay.gc,
  stoklu: detay.stoklu,
  malzemeId: detay.malzemeId,
  cikisDepoSiraNo: detay.cikisDepoSiraNo,
  malzemeTipKodId: detay.malzemeTipKodId,
  tarih: formatIsoDateTimeForApi(detay.tarih),
  lokasyonId: detay.lokasyonId,
  kdvToplam: detay.kdvToplam,
  kdvDahilHaric: detay.kdvDahilHaric,
  ...buildFormAlanlari(values),
});
