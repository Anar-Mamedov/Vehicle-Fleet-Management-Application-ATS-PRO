import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/az";

/**
 * Tarih formatlaması için yeniden kullanılabilir bileşen
 * @param {string} date - Formatlanacak tarih değeri
 * @param {string} format - Özel format (opsiyonel)
 * @param {string} fallback - Boş değer için gösterilecek metin (varsayılan: "-")
 * @param {string} className - CSS sınıfı (opsiyonel)
 * @param {object} style - Inline stil (opsiyonel)
 * @returns {JSX.Element} Formatlanmış tarih
 */
const FormattedDate = ({ date, format, fallback = "-", className, style, ...props }) => {
  // Tarih formatlaması için yardımcı fonksiyon
  const formatDateByLocale = (text, customFormat) => {
    if (!text) return fallback;

    const currentLang = localStorage.getItem("i18nextLng") || "tr";

    // dayjs locale'ini ayarla
    dayjs.locale(currentLang);

    // Dile göre tarih formatı (eğer özel format verilmemişse)
    const dateFormats = {
      tr: "DD.MM.YYYY",
      en: "MM/DD/YYYY",
      ru: "DD.MM.YYYY",
      az: "DD.MM.YYYY",
    };

    // Özel format varsa onu kullan, yoksa dile göre format kullan
    const formatToUse = customFormat || dateFormats[currentLang] || "DD.MM.YYYY";

    const parsed = dayjs(text);
    if (!parsed.isValid()) return fallback;
    return parsed.format(formatToUse);
  };

  const formattedDate = formatDateByLocale(date, format);

  return (
    <span className={className} style={style} {...props}>
      {formattedDate}
    </span>
  );
};

export default FormattedDate;
