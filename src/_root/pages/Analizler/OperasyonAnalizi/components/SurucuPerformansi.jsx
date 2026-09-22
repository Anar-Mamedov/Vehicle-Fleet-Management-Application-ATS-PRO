import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { surucuOzetRows } from "../utils/exportMappers";

export default function SurucuPerformansi({ rows, onRefresh = undefined }) {
  // Kartta yalnizca ilk 5 satir gorundugu icin liste en cok operasyonu olan surucuden baslar;
  // "Buyut" penceresi ve Excel ciktisi da ayni siralamayi kullanir
  const siraliSatirlar = useMemo(() => [...rows].sort((first, second) => (Number(second.seferSayisi) || 0) - (Number(first.seferSayisi) || 0)), [rows]);

  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("surucu"), dataIndex: "isim", key: "isim", ellipsis: true, render: (value) => safeText(value) },
    { title: t("operasyon"), dataIndex: "seferSayisi", key: "seferSayisi", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("hareket"), dataIndex: "hareketSayisi", key: "hareketSayisi", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("miktar"), dataIndex: "gerceklesenMiktar", key: "gerceklesenMiktar", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("hareketBasinaOrt"), dataIndex: "hareketBasinaOrt", key: "hareketBasinaOrt", width: 150, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];

  return (
    <TabloBolumu
      title={t("surucuBazliOperasyonOzeti")}
      subtitle={t("surucuBazliOperasyonOzetiAciklama")}
      columns={columns}
      rows={siraliSatirlar}
      rowKey={(record, index) => `${record.isim}-${index}`}
      exportRows={surucuOzetRows}
      scrollX={630}
      onRefresh={onRefresh}
    />
  );
}

SurucuPerformansi.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};
