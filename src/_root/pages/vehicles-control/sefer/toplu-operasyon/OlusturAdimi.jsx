import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import { CarOutlined, InfoCircleOutlined, NodeIndexOutlined, ScheduleOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { BORDER_COLOR, cardStyle } from "../components/uiStyles";

const { Text } = Typography;

const iconBoxStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "#f0f4ff",
  color: "#1677ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  flexShrink: 0,
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px 0",
  borderBottom: `1px solid ${BORDER_COLOR}`,
};

const labelStyle = {
  fontSize: "13px",
  color: "#5d6786",
  lineHeight: "18px",
};

const valueStyle = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#141414",
  lineHeight: "30px",
};

const unitStyle = {
  fontSize: "13px",
  color: "#5d6786",
  marginLeft: "6px",
};

const noteBoxStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  backgroundColor: "#f0f4ff",
  border: "1px solid #d6e4ff",
  borderRadius: "8px",
  padding: "12px",
  marginTop: "16px",
  fontSize: "13px",
  color: "#5d6786",
  lineHeight: "20px",
};

// 5. adım: oluşturmadan önceki son onay ekranı
const OlusturAdimi = ({ aracSayisi, hareketSayisi }) => {
  const rows = [
    { icon: <CarOutlined />, label: t("secilenArac"), value: aracSayisi, unit: t("arac") },
    { icon: <ScheduleOutlined />, label: t("olusturulacakOperasyon"), value: aracSayisi, unit: t("operasyon") },
    { icon: <NodeIndexOutlined />, label: t("olusturulacakHareket"), value: aracSayisi * hareketSayisi, unit: t("hareket") },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: "18px", fontWeight: 600, color: "#141414", lineHeight: "26px" }}>{t("adimOlustur")}</div>
      <Text type="secondary">{t("olusturAdimiAciklama")}</Text>

      {rows.map((row, index) => (
        <div key={row.label} style={index === rows.length - 1 ? { ...rowStyle, borderBottom: "none" } : rowStyle}>
          <span style={iconBoxStyle}>{row.icon}</span>
          <div>
            <div style={labelStyle}>{row.label}</div>
            <div>
              <span style={valueStyle}>{formatNumberWithLocale(row.value)}</span>
              <span style={unitStyle}>{row.unit}</span>
            </div>
          </div>
        </div>
      ))}

      <div style={noteBoxStyle}>
        <InfoCircleOutlined style={{ color: "#1677ff", marginTop: "3px" }} />
        <span>{t("aracSecimiBilgiNotu")}</span>
      </div>
    </div>
  );
};

OlusturAdimi.propTypes = {
  aracSayisi: PropTypes.number.isRequired,
  hareketSayisi: PropTypes.number.isRequired,
};

export default OlusturAdimi;
