import { formatDateForApi } from "../../../../../utils/dateUtils";

// Sihirbazın "Ortak Operasyon Bilgileri" adımındaki form değerlerinden sefer gövdesi üretilir.
// Alan adları operasyon ekleme ekranıyla (AddModal) birebir aynıdır; sihirbazın toplamadığı
// alanlar servisin beklediği boş değerlerle gönderilir. Araçlar `aracIds` ile ayrıca gittiği
// için `aracId` boş bırakılır, operasyon numarasını her kayıt için backend üretir.
export const buildExpeditionBody = (values) => ({
  aracId: 0,
  surucuId1: 0,
  surucuId2: 0,
  aciklama: values.aciklama || "",
  seferNo: "",
  firmaId: values.firmaId || 0,
  seferSorumlusu: values.seferSorumlusu || "",
  seferYeriKodId: values.seferYeriID || 0,
  projeKodId: values.projeID || 0,
  departmanKodId: values.departmanID || 0,
  isEmriNo: values.isEmriNo || "",
  dorseId: 0,
  guzergahId: values.guzergahId || 0,
  seferTipKodId: values.seferTipID || 0,
  seferDurumKodId: values.seferDurumID || 0,
  cikisTarih: formatDateForApi(values.cikisTarih),
  varisTarih: null,
  cikisSaat: null,
  varisSaat: null,
  seferAdedi: 1,
  cikisKm: 0,
  varisKm: 0,
  farkKm: 0,
  ozelAlan1: "",
  ozelAlan2: "",
  ozelAlan3: "",
  ozelAlan4: "",
  ozelAlan5: "",
  ozelAlan6: "",
  ozelAlan7: "",
  ozelAlan8: "",
  ozelAlanKodId9: 0,
  ozelAlanKodId10: 0,
  ozelAlan11: 0,
  ozelAlan12: 0,
});
