export const calculateHakedisTutar = (gerceklesenMiktar, birimFiyat) => {
  const alanlardanBiriBos = [gerceklesenMiktar, birimFiyat].some((value) => value === null || value === undefined || value === "");
  if (alanlardanBiriBos) return null;

  const miktar = Number(gerceklesenMiktar);
  const fiyat = Number(birimFiyat);

  return Number.isFinite(miktar) && Number.isFinite(fiyat) ? miktar * fiyat : null;
};

export const calculateRecordHakedisTutar = (record, changedField, changedValue) => {
  const gerceklesenMiktar = changedField === "gerceklesenMiktar" ? changedValue : record?.gerceklesenMiktar;
  const birimFiyat = changedField === "birimFiyat" ? changedValue : record?.birimFiyat;

  return calculateHakedisTutar(gerceklesenMiktar, birimFiyat);
};
