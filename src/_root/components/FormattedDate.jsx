import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/az";

const defaultDateFormat = "DD.MM.YYYY";

const dateFormats = {
  tr: defaultDateFormat,
  en: "MM/DD/YYYY",
  ru: defaultDateFormat,
  az: defaultDateFormat,
};

export const formatDateByLocale = (text, customFormat, fallback = "-") => {
  if (!text) return fallback;

  const currentLang = localStorage.getItem("i18nextLng") || "tr";

  dayjs.locale(currentLang);

  const formatToUse = customFormat || dateFormats[currentLang] || defaultDateFormat;

  const parsed = dayjs(text);
  if (!parsed.isValid()) return fallback;
  return parsed.format(formatToUse);
};

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
  const formattedDate = formatDateByLocale(date, format, fallback);

  return (
    <span className={className} style={style} {...props}>
      {formattedDate}
    </span>
  );
};

FormattedDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.number]),
  format: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

FormattedDate.defaultProps = {
  date: null,
  format: undefined,
  fallback: "-",
  className: undefined,
  style: undefined,
};

export default FormattedDate;
