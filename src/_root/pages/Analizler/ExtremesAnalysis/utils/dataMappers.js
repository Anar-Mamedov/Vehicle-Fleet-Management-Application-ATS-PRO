import { monthNames } from "./constants";
import { getVehicleSubTitle, getVehicleTitle, safeText } from "./formatters";

export const normalizeArray = (data) => (Array.isArray(data) ? data : []);
export const hasErrorShape = (data) => data && typeof data === "object" && data.status === false;

const getTypeValue = (type, item = {}) => {
  switch (type) {
    case 6:
      return Number(item.toplamMiktar) || 0;
    case 7:
      return Number(item.toplamMaliyetTutar ?? item.toplamHarcamaTutar) || 0;
    case 8:
      return Number(item.toplamArizaSayisi ?? item.toplamArizaTutar) || 0;
    case 9:
      return Number(item.toplamKm) || 0;
    case 10:
      return Number(item.maliyetPerKm) || 0;
    case 11:
      return (Number(item.servisSuresiDk) || 0) / 60;
    default:
      return 0;
  }
};

export const toChartData = (items, type) =>
  normalizeArray(items).map((item, index) => ({
    key: `${type}-${index}`,
    plate: getVehicleTitle(item),
    model: getVehicleSubTitle(item),
    value: getTypeValue(type, item),
    original: item,
  }));

export const toType12ChartData = (items) =>
  normalizeArray(items).map((item, index) => ({
    key: `12-${index}`,
    plate: `${monthNames[item.ay] || item.ay}. ${safeText(item.bakimTanim)}`,
    model: `Sıra ${safeText(item.sira)} • Bakım ID ${safeText(item.bakimId)}`,
    value: Number(item.tekrarSayisi) || 0,
    original: item,
  }));

export const toRepeatedFaultLineData = (items) => {
  const normalizedItems = normalizeArray(items);
  const seriesNames = normalizedItems.reduce((accumulator, item) => {
    const faultName = safeText(item.bakimTanim, "");
    if (faultName && !accumulator.includes(faultName) && accumulator.length < 3) {
      accumulator.push(faultName);
    }
    return accumulator;
  }, []);

  const rowsByMonth = normalizedItems.reduce((accumulator, item) => {
    const month = item.ay;
    if (!accumulator[month]) {
      accumulator[month] = {
        month: monthNames[month] || String(month),
        sira1: 0,
        sira2: 0,
        sira3: 0,
        sira1Tanim: seriesNames[0] || "",
        sira2Tanim: seriesNames[1] || "",
        sira3Tanim: seriesNames[2] || "",
      };
    }

    const faultName = safeText(item.bakimTanim, "");
    const seriesIndex = seriesNames.indexOf(faultName);
    if (seriesIndex >= 0) {
      accumulator[month][`sira${seriesIndex + 1}`] += Number(item.tekrarSayisi) || 0;
    }
    return accumulator;
  }, {});

  return Object.entries(rowsByMonth)
    .sort(([monthA], [monthB]) => Number(monthA) - Number(monthB))
    .map(([, row]) => row);
};
