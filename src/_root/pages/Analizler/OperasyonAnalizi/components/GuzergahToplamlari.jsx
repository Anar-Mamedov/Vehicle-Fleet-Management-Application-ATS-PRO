import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import KolonBasligi from "./KolonBasligi";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { guzergahOzetRows } from "../utils/exportMappers";

export default function GuzergahToplamlari({ rows, onRefresh = undefined }) {
  // Kartta yalnizca ilk 5 satir gorundugu icin liste en cok operasyonu olan guzergahtan baslar;
  // "Buyut" penceresi ve Excel ciktisi da ayni siralamayi kullanir
  const siraliSatirlar = useMemo(() => [...rows].sort((first, second) => (Number(second.seferSayisi) || 0) - (Number(first.seferSayisi) || 0)), [rows]);

  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("guzergah"), dataIndex: "guzergah", key: "guzergah", ellipsis: true, render: (value) => safeText(value) },
    { title: t("operasyon"), dataIndex: "seferSayisi", key: "seferSayisi", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("hareket"), dataIndex: "hareketSayisi", key: "hareketSayisi", width: 95, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("miktar"), dataIndex: "gerceklesenMiktar", key: "gerceklesenMiktar", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: <KolonBasligi label={t("ortalamaMiktar")} aciklama={t("ortalamaMiktarAciklama")} />, dataIndex: "ortalamaMiktar", key: "ortalamaMiktar", width: 125, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("tutar"), dataIndex: "hakedisTutar", key: "hakedisTutar", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];

  return (
    <TabloBolumu
      title={t("guzergahBazliOperasyonOzeti")}
      subtitle={t("guzergahBazliOperasyonOzetiAciklama")}
      columns={columns}
      rows={siraliSatirlar}
      rowKey={(record, index) => `${record.guzergah}-${index}`}
      exportRows={guzergahOzetRows}
      scrollX={710}
      onRefresh={onRefresh}
    />
  );
}

GuzergahToplamlari.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};
