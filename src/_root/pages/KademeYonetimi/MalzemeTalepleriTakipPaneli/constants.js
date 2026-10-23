import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import { MALZEME_TALEP_DURUM, getMalzemeTalepDurumTanimi } from "../KademeIsEmirleri/constants";

// MaterialRequestStatistics/GetInfoByType kutuları; sayılar miktar toplamı değil talep kayıt sayısıdır
export const MALZEME_TALEP_KPI = {
  TOPLAM_TALEP: 1,
  BEKLEYEN: 2,
  KISMI_KARSILANDI: 3,
  TAMAMLANAN: 4,
};

// Backend yalnızca üç talep durumu tanımlar; filtre ve satır etiketleri bu üç durumu kullanır
export const getMalzemeTalepDurumFiltreOptions = () =>
  Object.values(MALZEME_TALEP_DURUM).map((durum) => ({
    value: durum,
    label: t(getMalzemeTalepDurumTanimi(durum).labelKey),
  }));

const getOndalikHane = (deger) => (String(Number(deger) || 0).split(".")[1] || "").length;

// Miktarlar backend'in gönderdiği ondalık hane sayısı korunarak birimiyle gösterilir (ör. "8 Lt")
export const formatMiktar = (miktar, birim) => {
  const deger = Number(miktar) || 0;
  const ondalikHane = getOndalikHane(deger);
  const metin = formatNumberWithLocale(deger, ondalikHane, ondalikHane);
  return birim ? `${metin} ${birim}` : metin;
};

// Talep edilen miktarın ne kadarının kullanıma aktarıldığı (yüzde)
export const getKullanimYuzdesi = (talepMiktar, kullanilanMiktar) => {
  const talep = Number(talepMiktar) || 0;
  if (talep <= 0) return 0;
  return Math.min(100, Math.round(((Number(kullanilanMiktar) || 0) / talep) * 100));
};

// Ondalıklı çıkarmada oluşan kayan nokta artığı (ör. 7.6999999) gösterilmesin diye sonuç girdilerin hane sayısına yuvarlanır
export const getKalanMiktar = (talepMiktar, kullanilanMiktar) => {
  const talep = Number(talepMiktar) || 0;
  const kullanilan = Number(kullanilanMiktar) || 0;
  const ondalikHane = Math.max(getOndalikHane(talep), getOndalikHane(kullanilan));
  return Math.max(Number((talep - kullanilan).toFixed(ondalikHane)), 0);
};
