import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { CheckCircleOutlined, InboxOutlined, ToolOutlined } from "@ant-design/icons";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { cardStyle, hintStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "./DurumTag";

const degerStyle = { fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px" };

const sayacIkonStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const OzetAlani = ({ label, children }) => (
  <div className="flex flex-col" style={{ gap: "2px", minWidth: 0 }}>
    <span style={hintStyle}>{label}</span>
    <span style={degerStyle}>{children || "-"}</span>
  </div>
);

OzetAlani.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

// Güncelleme ekranının üst özeti; değerler kayıtlı detaydan okunur, formdaki kaydedilmemiş değişiklikleri yansıtmaz
const IsEmriOzet = ({ detay }) => {
  const arac = [detay?.marka, detay?.model].filter(Boolean).join(" ");

  const sayaclar = [
    { label: t("acikIs"), value: detay?.acikIsler, icon: <ToolOutlined style={{ color: "#2563eb" }} />, background: "#eef4ff" },
    { label: t("tamamlananIs"), value: detay?.tamamlananIsler, icon: <CheckCircleOutlined style={{ color: "#16a34a" }} />, background: "#ecfdf3" },
    { label: t("malzemeSayisi"), value: detay?.malzemeSayisi, icon: <InboxOutlined style={{ color: "#9333ea" }} />, background: "#f5f0ff" },
  ];

  return (
    <div className="flex" style={{ gap: "16px", flexWrap: "wrap", marginBottom: "8px" }}>
      <div style={{ ...cardStyle, flex: "1 1 600px", padding: "16px 20px" }}>
        <div className="grid" style={{ rowGap: "14px", columnGap: "16px" }}>
          <div className="col-span-4">
            <OzetAlani label={t("isEmriNo")}>{detay?.servisNo}</OzetAlani>
          </div>
          <div className="col-span-4">
            <OzetAlani label={t("plaka")}>{detay?.plaka}</OzetAlani>
          </div>
          <div className="col-span-4">
            <OzetAlani label={t("arac")}>{arac}</OzetAlani>
          </div>
          <div className="col-span-4">
            <OzetAlani label={t("surucu")}>{detay?.surucuIsim}</OzetAlani>
          </div>
          <div className="col-span-4">
            <OzetAlani label={t("durum")}>{detay?.durumBilgisi ? <DurumTag durum={detay.durumBilgisi} /> : null}</OzetAlani>
          </div>
          <div className="col-span-4">
            <OzetAlani label={t("kademe")}>{detay?.kademe}</OzetAlani>
          </div>
        </div>
      </div>

      <div className="flex flex-col" style={{ ...cardStyle, flex: "0 1 320px", padding: "12px 20px", gap: "10px", justifyContent: "center" }}>
        {sayaclar.map((sayac) => (
          <div key={sayac.label} className="flex" style={{ alignItems: "center", gap: "10px" }}>
            <div style={{ ...sayacIkonStyle, backgroundColor: sayac.background }}>{sayac.icon}</div>
            <span style={{ flex: 1, fontSize: "13px", color: "#5d6786" }}>{sayac.label}</span>
            <span style={{ ...degerStyle, fontSize: "16px" }}>{formatNumberWithLocale(sayac.value || 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

IsEmriOzet.propTypes = {
  detay: PropTypes.object,
};

export default IsEmriOzet;
