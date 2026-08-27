import dayjs from "dayjs";

export const calculateHakedisTutar = (gerceklesenMiktar, birimFiyat) => {
  const alanlardanBiriBos = [gerceklesenMiktar, birimFiyat].some((value) => value === null || value === undefined || value === "");
  if (alanlardanBiriBos) return null;

  const miktar = Number(gerceklesenMiktar);
  const fiyat = Number(birimFiyat);

  if (miktar === 0 || fiyat === 0) return null;

  return Number.isFinite(miktar) && Number.isFinite(fiyat) ? miktar * fiyat : null;
};

export const calculateRecordHakedisTutar = (record, changedField, changedValue) => {
  const gerceklesenMiktar = changedField === "gerceklesenMiktar" ? changedValue : record?.gerceklesenMiktar;
  const birimFiyat = changedField === "birimFiyat" ? changedValue : record?.birimFiyat;

  return calculateHakedisTutar(gerceklesenMiktar, birimFiyat);
};

export const getHareketDefaultsFromOperation = (operationValues = {}) => ({
  planlananTarih: dayjs(),
  gerceklesenTarih: dayjs(),
  durum: operationValues.seferDurum || null,
  durumID: operationValues.seferDurumID || null,
  firmaUnvan: operationValues.firma || null,
  firmaId: operationValues.firmaId || null,
  guzergah: operationValues.guzergah || null,
  guzergahId: operationValues.guzergahId || null,
});
