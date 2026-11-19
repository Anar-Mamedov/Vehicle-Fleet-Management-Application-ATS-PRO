import dayjs from "dayjs";
import { toDayjsOrNull } from "../../../../utils/dateUtils";
import { IS_ISLEMI, getAnaIsIslemi, isIsCalisiyor } from "../KademeIsEmirleri/constants";

// ServiceWorkCardStatistics/GetInfoByType kutuları
export const IS_TAKIP_KPI = {
  TOPLAM_IS: 1,
  BEKLEYEN: 2,
  DEVAM_EDEN: 3,
  DURDU: 4,
  TAMAMLANAN: 5,
  MALZEME_TALEBI: 6,
};

// Satırdaki ana düğmenin görünümü; hangi işlemin açık olduğu iş kartı kurallarından (getAnaIsIslemi) gelir
const ANA_ISLEM_GORUNUMLERI = {
  [IS_ISLEMI.BASLAT]: { labelKey: "baslat", color: "#1677ff" },
  [IS_ISLEMI.DURDUR]: { labelKey: "durdur", color: "#e5484d" },
  [IS_ISLEMI.DEVAM_ET]: { labelKey: "devamEt", color: "#f08c00" },
};

export const getAnaDurumAksiyonu = (durum) => {
  const islem = getAnaIsIslemi(durum);
  return islem ? { islem, ...ANA_ISLEM_GORUNUMLERI[islem] } : null;
};

// Süre servisten saniye (toplamSaniye) veya dakika (sure) olarak gelir; ekranda SS:dd:ss gösterilir, 24 saatte sıfırlanmaz
const ikiHane = (value) => String(value).padStart(2, "0");

export const formatSureSaniye = (saniye) => {
  const toplamSaniye = Math.max(0, Math.floor(Number(saniye) || 0));
  const saat = Math.floor(toplamSaniye / 3600);
  const dakika = Math.floor((toplamSaniye % 3600) / 60);
  return `${ikiHane(saat)}:${ikiHane(dakika)}:${ikiHane(toplamSaniye % 60)}`;
};

// Planlanan süre dakikadır; eksik/geçersiz tarihlerde backend 0 döner ve "—" gösterilir
export const formatPlanlananSure = (dakika) => {
  const toplamDakika = Number(dakika) || 0;
  return toplamDakika > 0 ? formatSureSaniye(toplamDakika * 60) : "—";
};

// Çalışma süresi sayacı (backend FRONTEND_SAYAC notu):
// - toplamSaniye, sunucunun sorgu anına kadarki toplamdır (aktif çalışma dahil).
// - Yalnızca 2 ve 11 durumlarında sayaç, yanıt alındıktan sonra geçen saniyeleri ekleyerek ilerler.
// - toplamSaniye + (şimdi - sonBaslamaTarihiUtc) kullanılmaz; aynı süre iki kez sayılır.
// Yanıt alındığı an (alinmaAni) satıra yazılır; son başlamadan o ana kadar geçen süre referans alınıp çıkarılır.
// Liste yanıtında sonBaslamaTarihiUtc boş/geçersiz gelse de çalışan iş canlı sayar; o durumda referans yalnızca yanıt anıdır.
export const getSayacBaslangicAni = (kart) => toDayjsOrNull(kart?.sonBaslamaTarihiUtc)?.valueOf() ?? null;

export const isSayacCalisiyor = (kart) => isIsCalisiyor(kart?.durum);

export const getSayacSaniyesi = (kart, simdi = dayjs().valueOf()) => {
  const toplam = Number(kart?.toplamSaniye) || 0;
  if (!isSayacCalisiyor(kart) || !kart.sayacAlinmaAni) return toplam;

  const baslangicAni = getSayacBaslangicAni(kart) ?? kart.sayacAlinmaAni;
  const gecenSure = (an) => Math.max(0, an - baslangicAni);
  const alinirkenGecenSure = gecenSure(kart.sayacAlinmaAni);

  return toplam + Math.floor(Math.max(0, gecenSure(simdi) - alinirkenGecenSure) / 1000);
};

// Sayaç referansı için yanıtın alındığı an satırlara eklenir
export const withSayacAlinmaAni = (kartlar) => {
  const alinmaAni = dayjs().valueOf();
  return kartlar.map((kart) => ({ ...kart, sayacAlinmaAni: alinmaAni }));
};
