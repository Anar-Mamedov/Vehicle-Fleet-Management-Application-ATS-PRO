import React from "react";
import PropTypes from "prop-types";
import { labelStyle } from "../../KademeTanimlari/components/uiStyles";

const kutuStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 12px",
  borderRadius: "8px",
  backgroundColor: "#eef4ff",
};

// Elle girilmeyip formdaki alanlardan hesaplanan değerlerin (toplam maliyet, süre) ortak açık mavi kutusu
const HesapKutusu = ({ span = 12, label, value, style }) => (
  <div className={`col-span-${span}`} style={{ ...kutuStyle, ...style }}>
    <span style={{ ...labelStyle, color: "#141414" }}>{label}</span>
    <span style={{ fontSize: "18px", fontWeight: 700, color: "#1d4ed8" }}>{value}</span>
  </div>
);

HesapKutusu.propTypes = {
  span: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.node,
  style: PropTypes.object,
};

export default HesapKutusu;
