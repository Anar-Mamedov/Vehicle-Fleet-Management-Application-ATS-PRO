import { formatTimeForApi, toTimeDayjsOrNull } from "../../../../utils/dateUtils";
import { CALISMA_GUNU_DEGERLERI, VARSAYILAN_BASLAMA_SAATI, VARSAYILAN_BITIS_SAATI, VARSAYILAN_CALISMA_GUNLERI, toNullable, toNullableId } from "./constants";

// Yeni kademe formunun başlangıç değerleri
export const getDefaultKademeValues = () => ({
  kademeKod: null,
  kademeAdi: null,
  kademeTip: null,
  kademeTipID: null,
  lokasyon: null,
  lokasyonId: null,
  kademeSorumluPersonel: null,
  kademeSorumlusu: null,
  durum: true,
  yediYirmiDort: false,
  baslamaSaat: toTimeDayjsOrNull(VARSAYILAN_BASLAMA_SAATI),
  bitisSaat: toTimeDayjsOrNull(VARSAYILAN_BITIS_SAATI),
  calismaGunleri: VARSAYILAN_CALISMA_GUNLERI,
  aciklama: null,
});

// GetWorkShopDefItemById yanıtını form alanlarına çevirir.
// KodIDSelectbox id'yi `${name1}ID` alanına yazdığı için kademeTipKodId -> kademeTipID eşlemesi burada yapılır.
export const mapKademeToFormValues = (item) => ({
  kademeKod: toNullable(item.kademeKod),
  kademeAdi: toNullable(item.kademeAdi),
  kademeTip: toNullable(item.kademeTip),
  kademeTipID: toNullableId(item.kademeTipKodId),
  lokasyon: toNullable(item.lokasyon),
  lokasyonId: toNullableId(item.lokasyonId),
  kademeSorumluPersonel: toNullable(item.kademeSorumlusu),
  kademeSorumlusu: toNullable(item.kademeSorumlusu),
  durum: Boolean(item.durum),
  yediYirmiDort: Boolean(item.yediYirmiDort),
  baslamaSaat: toTimeDayjsOrNull(item.baslamaSaat),
  bitisSaat: toTimeDayjsOrNull(item.bitisSaat),
  calismaGunleri: Array.isArray(item.calismaGunleri) ? item.calismaGunleri.map(String) : [],
  aciklama: toNullable(item.aciklama),
});

// Ekleme ve güncelleme servislerinin ortak gövdesi.
// 7/24 çalışan kademede saat aralığı anlamsız olduğu için saatler boş, çalışma günleri haftanın tamamı gönderilir.
export const buildKademeBody = (values) => ({
  kademeKod: values.kademeKod || "",
  kademeAdi: values.kademeAdi || "",
  kademeTipKodId: values.kademeTipID || 0,
  lokasyonId: values.lokasyonId || 0,
  kademeSorumlusu: values.kademeSorumlusu || "",
  durum: Boolean(values.durum),
  yediYirmiDort: Boolean(values.yediYirmiDort),
  baslamaSaat: values.yediYirmiDort ? null : formatTimeForApi(values.baslamaSaat),
  bitisSaat: values.yediYirmiDort ? null : formatTimeForApi(values.bitisSaat),
  aciklama: values.aciklama || "",
  calismaGunleri: values.yediYirmiDort ? CALISMA_GUNU_DEGERLERI : values.calismaGunleri || [],
});
