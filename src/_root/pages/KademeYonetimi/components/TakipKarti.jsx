import React from "react";
import PropTypes from "prop-types";
import { Empty } from "antd";
import { t } from "i18next";
import { hintStyle } from "../KademeTanimlari/components/uiStyles";

const kartStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px",
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  backgroundColor: "white",
  minWidth: 0,
};

const altBantStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "auto",
  paddingTop: "12px",
  borderTop: "1px solid #f0f0f0",
};

const degerStyle = { fontSize: "14px", fontWeight: 500, color: "#141414", lineHeight: "20px", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

// Kart görünümünde kayıtlar ekran genişliğine göre sütunlara yerleşir
export const TakipKartIzgarasi = ({ children, bos }) =>
  bos ? (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("kayitBulunamadi")} />
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "12px" }}>{children}</div>
  );

TakipKartIzgarasi.propTypes = {
  children: PropTypes.node,
  bos: PropTypes.bool,
};

// Kart içindeki küçük etiket + değer ikilisi
export const KartAlani = ({ label, children }) => (
  <div className="flex flex-col" style={{ gap: "2px", minWidth: 0 }}>
    <span style={hintStyle}>{label}</span>
    <span style={degerStyle}>{children || "—"}</span>
  </div>
);

KartAlani.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

// Takip panellerindeki kayıt kartı; işlem düğmeleri alt bantta sağa yaslı durur
const TakipKarti = ({ children, islemler }) => (
  <div style={kartStyle}>
    {children}
    <div style={altBantStyle}>{islemler}</div>
  </div>
);

TakipKarti.propTypes = {
  children: PropTypes.node,
  islemler: PropTypes.node,
};

export default TakipKarti;
