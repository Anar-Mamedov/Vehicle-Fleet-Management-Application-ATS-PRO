import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { surucuPerformansRows } from "../utils/exportMappers";

export default function SurucuPerformansi({ rows, onRefresh }) {
  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("surucu"), dataIndex: "isim", key: "isim", ellipsis: true, render: (value) => safeText(value) },
    { title: t("hareket"), dataIndex: "hareketSayisi", key: "hareketSayisi", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("gerceklesen"), dataIndex: "gerceklesenMiktar", key: "gerceklesenMiktar", width: 120, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("tutar"), dataIndex: "hakedisTutar", key: "hakedisTutar", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];


  return (
    <TabloBolumu
      title={t("surucuPerformansi")}
      subtitle={t("surucuPerformansiAciklama")}
      columns={columns}
      rows={rows}
      rowKey={(record, index) => `${record.isim}-${index}`}
      exportRows={surucuPerformansRows}
      scrollX={480}
      onRefresh={onRefresh}
    />
  );
}

SurucuPerformansi.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

SurucuPerformansi.defaultProps = { onRefresh: undefined };
