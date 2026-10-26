import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

const TALEP_VAR_RENGI = "#c2410c";
const TALEP_YOK_RENGI = "#15803d";

// İş emri / atanan iş satırındaki malzeme talebi sayısı (servisteki malzemeSayisi alanı); talep yoksa "Talep Yok" yazar
const MalzemeTalebiOzet = ({ sayi }) => {
  const talepSayisi = Number(sayi) || 0;

  if (talepSayisi === 0) return <span style={{ color: TALEP_YOK_RENGI }}>{t("talepYok")}</span>;

  return <span style={{ color: TALEP_VAR_RENGI }}>{t("talepSayisi", { sayi: formatNumberWithLocale(talepSayisi) })}</span>;
};

MalzemeTalebiOzet.propTypes = {
  sayi: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MalzemeTalebiOzet;
