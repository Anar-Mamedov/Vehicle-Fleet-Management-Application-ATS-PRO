import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../../KademeIsEmirleri/components/DurumTag";
import PersonelBilgisi from "../../components/PersonelBilgisi";
import TakipKarti, { KartAlani } from "../../components/TakipKarti";
import { getIsDurumTanimi } from "../../KademeIsEmirleri/constants";
import { formatPlanlananSure } from "../constants";
import SureSayaci from "./SureSayaci";

const isTanimStyle = { fontSize: "15px", fontWeight: 600, color: "#141414", lineHeight: "22px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

const sureKutusuStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  padding: "10px 12px",
  borderRadius: "8px",
  backgroundColor: "#f7f8fa",
};

// Satırlar uzun açıklamada kartı uzatmasın diye iki satırla sınırlanır
const aciklamaStyle = {
  ...hintStyle,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

// Kart görünümündeki atanan iş; liste satırındaki bilgilerin özeti ve aynı işlem düğmeleri
const AtananIsKarti = ({ kart, malzeme, islemler, onIsEmriAc }) => (
  <TakipKarti islemler={islemler}>
    <div className="flex flex-col" style={{ gap: "4px" }}>
      <div className="flex" style={{ justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
        {kart.servisNo ? (
          <a role="link" tabIndex={0} style={{ fontSize: "13px" }} onClick={() => onIsEmriAc(kart)} onKeyDown={(e) => e.key === "Enter" && onIsEmriAc(kart)}>
            {kart.servisNo}
          </a>
        ) : (
          <span style={hintStyle}>—</span>
        )}
        <DurumTag durum={kart.durum} getTanim={getIsDurumTanimi} />
      </div>
      <span style={isTanimStyle}>{kart.isTanim || "—"}</span>
    </div>

    <PersonelBilgisi isim={kart.personelIsim} unvan={kart.unvan} resim={kart.personelVarsayilanResim} />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <KartAlani label={t("plaka")}>{kart.plaka}</KartAlani>
      <KartAlani label={t("arac")}>{[kart.marka, kart.model].filter(Boolean).join(" ")}</KartAlani>
    </div>

    <div style={sureKutusuStyle}>
      <KartAlani label={t("gerceklesenSure")}>
        <SureSayaci kart={kart} style={{ fontWeight: 600 }} />
      </KartAlani>
      <KartAlani label={t("planlananSure")}>{formatPlanlananSure(kart.sure)}</KartAlani>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "start" }}>
      <KartAlani label={t("kademe")}>{kart.kademeAdi}</KartAlani>
      <KartAlani label={t("malzemeTalepleri")}>{malzeme}</KartAlani>
    </div>

    {kart.aciklama && <span style={aciklamaStyle}>{kart.aciklama}</span>}
  </TakipKarti>
);

AtananIsKarti.propTypes = {
  kart: PropTypes.object.isRequired,
  malzeme: PropTypes.node,
  islemler: PropTypes.node,
  onIsEmriAc: PropTypes.func.isRequired,
};

export default AtananIsKarti;
