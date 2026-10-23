import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { formatSureSaniye, getSayacSaniyesi, isSayacCalisiyor } from "../constants";

const SAYAC_YENILEME_ARALIGI_MS = 1000;

const calisanNoktaStyle = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: "#1677ff",
  flexShrink: 0,
};

// Çalışan işte süre her saniye yeniden hesaplanır; her tetiklemede gerçek geçen süre kullanıldığı için
// sekme arka plandayken kaçırılan tetiklemeler süreyi kaydırmaz. Duran/bekleyen/tamamlanan işte toplam sabittir.
const SureSayaci = ({ kart, style }) => {
  const [simdi, setSimdi] = useState(() => dayjs().valueOf());
  const calisiyor = isSayacCalisiyor(kart);

  useEffect(() => {
    if (!calisiyor) return undefined;

    setSimdi(dayjs().valueOf());
    const timer = setInterval(() => setSimdi(dayjs().valueOf()), SAYAC_YENILEME_ARALIGI_MS);
    return () => clearInterval(timer);
  }, [calisiyor, kart]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontVariantNumeric: "tabular-nums", ...style }}>
      {calisiyor && <span style={calisanNoktaStyle} />}
      {formatSureSaniye(getSayacSaniyesi(kart, simdi))}
    </span>
  );
};

SureSayaci.propTypes = {
  kart: PropTypes.shape({
    durum: PropTypes.number,
    toplamSaniye: PropTypes.number,
    sonBaslamaTarihiUtc: PropTypes.string,
    sayacAlinmaAni: PropTypes.number,
  }).isRequired,
  style: PropTypes.object,
};

export default SureSayaci;
