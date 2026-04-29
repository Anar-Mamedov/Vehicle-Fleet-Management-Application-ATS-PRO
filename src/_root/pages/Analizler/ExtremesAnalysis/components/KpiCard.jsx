import React from "react";
import { Card, Typography } from "antd";
import PropTypes from "prop-types";
import { cardBorder, flexDisplay, mutedTextColor, titleTextColor } from "../utils/constants";
import { getVehicleTitle } from "../utils/formatters";

const { Text } = Typography;

const singleLineText = {
  display: "block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function KpiCard({ title, icon, item, color, softColor, value, subtitle, subtitleColor, onClick }) {
  const Icon = icon;
  const clickable = typeof onClick === "function";

  return (
    <Card
      bordered={false}
      hoverable={clickable}
      onClick={onClick}
      style={{ borderRadius: 22, border: cardBorder, minHeight: 164, cursor: clickable ? "pointer" : "default", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
      bodyStyle={{ padding: 18, overflow: "hidden" }}
    >
      <div style={{ display: flexDisplay, alignItems: "flex-start", gap: 12, width: "100%", overflow: "hidden" }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: softColor, color, display: flexDisplay, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon style={{ fontSize: 22 }} />
        </div>
        <div style={{ minWidth: 0, width: "calc(100% - 56px)", maxWidth: "calc(100% - 56px)", overflow: "hidden" }}>
          <Text type="secondary" title={title} style={singleLineText}>
            {title}
          </Text>
          <div title={getVehicleTitle(item)} style={{ ...singleLineText, marginTop: 8, fontSize: 17, fontWeight: 700, color: titleTextColor }}>
            {getVehicleTitle(item)}
          </div>
          <div title={value} style={{ ...singleLineText, fontSize: 24, lineHeight: 1.25, fontWeight: 800, color: "#020617" }}>
            {value}
          </div>
          <div title={subtitle} style={{ ...singleLineText, marginTop: 8, fontSize: 12, fontWeight: subtitleColor ? 700 : 400, color: subtitleColor || mutedTextColor }}>
            {subtitle}
          </div>
        </div>
      </div>
    </Card>
  );
}

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    plaka: PropTypes.string,
    marka: PropTypes.string,
    model: PropTypes.string,
    yil: PropTypes.number,
    year: PropTypes.number,
  }),
  color: PropTypes.string.isRequired,
  softColor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  subtitleColor: PropTypes.string,
  onClick: PropTypes.func,
};

KpiCard.defaultProps = {
  item: {},
  subtitleColor: undefined,
  onClick: undefined,
};
