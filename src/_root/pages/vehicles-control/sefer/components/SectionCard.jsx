import React from "react";
import PropTypes from "prop-types";
import { cardStyle, fieldGridStyle, sectionIconStyle, sectionTitleStyle } from "./uiStyles";

// Başlığında ikon bulunan kart; güncelleme ekranındaki tüm bölümler bu kalıbı kullanır
const SectionCard = ({ icon, title, gridStyle, children }) => (
  <div style={cardStyle}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <span style={sectionIconStyle}>{icon}</span>
      <span style={sectionTitleStyle}>{title}</span>
    </div>
    <div className="grid" style={{ ...fieldGridStyle, ...gridStyle }}>
      {children}
    </div>
  </div>
);

SectionCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  gridStyle: PropTypes.object,
  children: PropTypes.node,
};

export default SectionCard;
