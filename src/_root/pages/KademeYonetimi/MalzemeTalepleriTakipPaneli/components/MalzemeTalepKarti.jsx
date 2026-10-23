import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../../KademeIsEmirleri/components/DurumTag";
import PersonelBilgisi from "../../components/PersonelBilgisi";
import TakipKarti from "../../components/TakipKarti";
import { getMalzemeTalepDurumTanimi } from "../../KademeIsEmirleri/constants";
import { formatMiktar } from "../constants";

const talepNoStyle = { fontSize: "15px", fontWeight: 600 };
const satirStyle = { fontSize: "13px", color: "#141414", lineHeight: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

// Kart görünümündeki malzeme talebi; liste satırındaki bilgilerin aynısını özet olarak gösterir
const MalzemeTalepKarti = ({ satir, islemler, onDetay, onIsEmriAc }) => (
  <TakipKarti islemler={islemler}>
    <div className="flex" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
      <div className="flex flex-col" style={{ minWidth: 0 }}>
        <a role="link" tabIndex={0} style={talepNoStyle} onClick={() => onDetay(satir)} onKeyDown={(e) => e.key === "Enter" && onDetay(satir)}>
          {satir.talepNo || "—"}
        </a>
        <span style={hintStyle}>{formatDateByLocale(satir.talepTarih, undefined, "—")}</span>
      </div>
      <DurumTag durum={satir.durum} getTanim={getMalzemeTalepDurumTanimi} />
    </div>

    <PersonelBilgisi isim={satir.talepEden} unvan={satir.unvan} resim={satir.personelVarsayilanResim} />

    <div className="flex flex-col" style={{ gap: "4px" }}>
      <span style={satirStyle}>
        {satir.servisNo && satir.servisSiraNo ? (
          <a role="link" tabIndex={0} onClick={() => onIsEmriAc(satir)} onKeyDown={(e) => e.key === "Enter" && onIsEmriAc(satir)}>
            {satir.servisNo}
          </a>
        ) : (
          satir.servisNo || "—"
        )}
        {satir.plaka ? ` · ${satir.plaka}` : ""}
      </span>
      <span style={satirStyle}>
        {satir.malzemeKod && <span style={{ color: "#8c8c8c" }}>{`${satir.malzemeKod} · `}</span>}
        {satir.malzemeTanim || "—"}
      </span>
      <span style={satirStyle}>
        {[`${t("talepMiktari")}: ${formatMiktar(satir.talepMiktar, satir.malzemeBirim)}`, `${t("kullanilan")}: ${formatMiktar(satir.kullanilanMiktar, satir.malzemeBirim)}`].join(" · ")}
      </span>
      <span style={satirStyle}>{`${t("gerekliTarih")}: ${formatDateByLocale(satir.gerekliTarih, undefined, "—")}`}</span>
    </div>
  </TakipKarti>
);

MalzemeTalepKarti.propTypes = {
  satir: PropTypes.object.isRequired,
  islemler: PropTypes.node,
  onDetay: PropTypes.func.isRequired,
  onIsEmriAc: PropTypes.func.isRequired,
};

export default MalzemeTalepKarti;
