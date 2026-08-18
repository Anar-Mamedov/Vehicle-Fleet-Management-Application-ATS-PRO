import dayjs from "dayjs";
import "dayjs/locale/tr";

// API'ye gönderilen ve API'den alınan TÜM tarih/saat değerleri yalnızca dayjs ile işlenir.
// new Date(), toISOString() veya elle string birleştirme kesinlikle kullanılmaz;
// toISOString() yerel saati UTC'ye çevirdiği için (UTC+3) tarihi bir gün geriye kaydırır.

const API_DATE_FORMAT = "YYYY-MM-DD";
const API_TIME_FORMAT = "HH:mm";
const API_TIME_WITH_SECONDS_FORMAT = "HH:mm:ss";
const API_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// API'den gelen tarih/saat değerini dayjs nesnesine çevirir (DatePicker/TimePicker'a verilecek değer).
export const toDayjsOrNull = (value) => {
  if (!value) {
    return null;
  }

  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate : null;
};

// DatePicker değerini API'ye gönderilecek tarih formatına çevirir.
export const formatDateForApi = (value) => {
  const parsedDate = toDayjsOrNull(value);
  return parsedDate ? parsedDate.format(API_DATE_FORMAT) : null;
};

// TimePicker değerini API'ye gönderilecek saat formatına çevirir.
export const formatTimeForApi = (value, withSeconds = false) => {
  const parsedTime = toDayjsOrNull(value);
  if (!parsedTime) {
    return null;
  }

  return parsedTime.format(withSeconds ? API_TIME_WITH_SECONDS_FORMAT : API_TIME_FORMAT);
};

// Tarih + saat değerini API'ye gönderilecek formata çevirir.
export const formatDateTimeForApi = (value) => {
  const parsedDateTime = toDayjsOrNull(value);
  return parsedDateTime ? parsedDateTime.format(API_DATE_TIME_FORMAT) : null;
};

// Tablo sıralamalarında API'den gelen tarihleri karşılaştırır (boş değerler başa alınır).
export const compareDatesForSorter = (firstValue, secondValue) => {
  const firstDate = toDayjsOrNull(firstValue);
  const secondDate = toDayjsOrNull(secondValue);

  if (!firstDate) {
    return -1;
  }
  if (!secondDate) {
    return 1;
  }

  return firstDate.valueOf() - secondDate.valueOf();
};
