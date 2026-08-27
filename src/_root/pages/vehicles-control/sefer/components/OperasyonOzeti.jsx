import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { BORDER_COLOR, cardStyle } from "./uiStyles";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 0",
  borderBottom: `1px solid ${BORDER_COLOR}`,
};

const labelStyle = {
  fontSize: "13px",
  color: "#5d6786",
  lineHeight: "18px",
};

const valueStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#141414",
  lineHeight: "20px",
};

const OperasyonOzeti = ({ summary }) => {
  const rows = [
    { label: t("toplamHareket"), value: formatNumberWithLocale(summary?.toplamHareketSayisi ?? 0) },
    { label: t("planlananMiktar"), value: formatNumberWithLocale(summary?.toplamPlanlananMiktar ?? 0) },
    { label: t("gerceklesenMiktar"), value: formatNumberWithLocale(summary?.toplamGerceklesenMiktar ?? 0) },
    { label: t("operasyonToplamTutar"), value: `₺${formatNumberWithLocale(summary?.toplamHakedisTutar ?? 0, 2, 2)}` },
  ];

  return (
    <div style={{ ...cardStyle, padding: "16px 20px" }}>
      <div style={{ fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px", marginBottom: "4px" }}>{t("operasyonOzeti")}</div>
      {rows.map((row, index) => (
        <div key={row.label} style={index === rows.length - 1 ? { ...rowStyle, borderBottom: "none" } : rowStyle}>
          <span style={labelStyle}>{row.label}</span>
          <span style={valueStyle}>{row.value}</span>
        </div>
      ))}
    </div>
  );
};

OperasyonOzeti.propTypes = {
  summary: PropTypes.shape({
    toplamHareketSayisi: PropTypes.number,
    toplamPlanlananMiktar: PropTypes.number,
    toplamGerceklesenMiktar: PropTypes.number,
    toplamHakedisTutar: PropTypes.number,
  }),
};

export default OperasyonOzeti;
