// Hatırlatıcı satırına tıklanınca açılacak güncelleme ekranları.
// Reminder/GetRemindersByStatus her satırda `grup` ve `ilgiliKayitId` döndürür; ekran, kaydı kendi
// GetById servisiyle bu id üzerinden yükler.
export const REMINDER_UPDATE_SCREENS = {
  SIGORTA: "sigorta",
  SURUCU: "surucu",
  STOK: "stok",
  CEZA: "ceza",
  TASIT_KARTI: "tasitKarti",
  KIRALIK_ARAC: "kiralikArac",
  ARAC: "arac",
  IKAME_ARAC: "ikameArac",
  PERIYODIK_BAKIM: "periyodikBakim",
  DOSYA: "dosya",
};

// Anahtarlar backend'in grup adlarının küçük harfli halidir. Onay işlemlerinin GetById'si olmadığı için
// listede yoktur.
const updateScreenByGroup = {
  sigorta: REMINDER_UPDATE_SCREENS.SIGORTA,
  surucu: REMINDER_UPDATE_SCREENS.SURUCU,
  stok: REMINDER_UPDATE_SCREENS.STOK,
  ceza: REMINDER_UPDATE_SCREENS.CEZA,
  tasitkarti: REMINDER_UPDATE_SCREENS.TASIT_KARTI,
  kiralikarac: REMINDER_UPDATE_SCREENS.KIRALIK_ARAC,
  vergitarihi: REMINDER_UPDATE_SCREENS.ARAC,
  sozlesmetarihi: REMINDER_UPDATE_SCREENS.ARAC,
  takograftarihi: REMINDER_UPDATE_SCREENS.ARAC,
  egzostarihi: REMINDER_UPDATE_SCREENS.ARAC,
  muayenetarihi: REMINDER_UPDATE_SCREENS.ARAC,
  ikamearac: REMINDER_UPDATE_SCREENS.IKAME_ARAC,
  periyodikkm: REMINDER_UPDATE_SCREENS.PERIYODIK_BAKIM,
  periyodiktarih: REMINDER_UPDATE_SCREENS.PERIYODIK_BAKIM,
  dosya: REMINDER_UPDATE_SCREENS.DOSYA,
};

const normalizeGroupName = (grup) => {
  const groupName = String(grup ?? "");
  return groupName.trim().toLowerCase();
};

export const getReminderUpdateScreen = (grup) => updateScreenByGroup[normalizeGroupName(grup)] ?? null;

export const canOpenReminderRecord = (record) => Boolean(record?.ilgiliKayitId && getReminderUpdateScreen(record.grup));
