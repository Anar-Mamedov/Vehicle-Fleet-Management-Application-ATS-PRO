import React from "react";
import PropTypes from "prop-types";
import { CarOutlined, FileTextOutlined, InfoCircleOutlined, NodeIndexOutlined, ScheduleOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { BORDER_COLOR, cardStyle } from "../components/uiStyles";

const iconBoxStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  backgroundColor: "#f0f4ff",
  color: "#1677ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  flexShrink: 0,
};

const rowStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  padding: "16px 0",
  borderBottom: `1px solid ${BORDER_COLOR}`,
};

const labelStyle = {
  fontSize: "13px",
  color: "#5d6786",
  lineHeight: "18px",
};

const bigValueStyle = {
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

// Sihirbazın solunda duran özet kartı; her adımda seçimin sonucunu gösterir
const OzetPaneli = ({ aracSayisi, hareketSayisi, bilgiNotu }) => (
  <div style={{ ...cardStyle, padding: "16px 20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "16px", borderBottom: `1px solid ${BORDER_COLOR}` }}>
      <span style={iconBoxStyle}>
        <FileTextOutlined />
      </span>
      <span style={{ fontSize: "15px", fontWeight: 600, color: "#141414" }}>{t("operasyonOzeti")}</span>
    </div>

    <div style={rowStyle}>
      <span style={iconBoxStyle}>
        <CarOutlined />
      </span>
      <div>
        <div style={labelStyle}>{t("secilenArac")}</div>
        <div>
          <span style={bigValueStyle}>{formatNumberWithLocale(aracSayisi)}</span>
          <span style={unitStyle}>{t("arac")}</span>
        </div>
      </div>
    </div>

    {/* Her araç için bir operasyon kaydı oluşturulur */}
    <div style={rowStyle}>
      <span style={iconBoxStyle}>
        <ScheduleOutlined />
      </span>
      <div>
        <div style={labelStyle}>{t("olusturulacakOperasyon")}</div>
        <div>
          <span style={bigValueStyle}>{formatNumberWithLocale(aracSayisi)}</span>
          <span style={unitStyle}>{t("operasyon")}</span>
        </div>
      </div>
    </div>

    <div style={{ ...rowStyle, borderBottom: "none" }}>
      <span style={iconBoxStyle}>
        <NodeIndexOutlined />
      </span>
      {/* Her araca tanımlanan tüm hareketler eklendiği için toplam, araç sayısı × hareket sayısıdır */}
      <div>
        <div style={labelStyle}>{t("olusturulacakHareket")}</div>
        {hareketSayisi > 0 ? (
          <div>
            <span style={bigValueStyle}>{formatNumberWithLocale(aracSayisi * hareketSayisi)}</span>
            <span style={unitStyle}>{t("hareket")}</span>
          </div>
        ) : (
          <>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "#141414", lineHeight: "24px" }}>{t("belirlenmedi")}</div>
            <div style={{ ...labelStyle, fontSize: "12px" }}>{`(${t("hareketlerAdimindaHesaplanacak")})`}</div>
          </>
        )}
      </div>
    </div>

    <div style={noteBoxStyle}>
      <InfoCircleOutlined style={{ color: "#1677ff", marginTop: "3px" }} />
      <span>{bilgiNotu}</span>
    </div>
  </div>
);

OzetPaneli.propTypes = {
  aracSayisi: PropTypes.number.isRequired,
  hareketSayisi: PropTypes.number.isRequired,
  bilgiNotu: PropTypes.string.isRequired,
};

export default OzetPaneli;
