import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { guzergahToplamRows } from "../utils/exportMappers";

export default function GuzergahToplamlari({ rows, onRefresh }) {
  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("guzergah"), dataIndex: "guzergah", key: "guzergah", ellipsis: true, render: (value) => safeText(value) },
    { title: t("hareket"), dataIndex: "hareketSayisi", key: "hareketSayisi", width: 95, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("miktar"), dataIndex: "gerceklesenMiktar", key: "gerceklesenMiktar", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("ortalamaMiktar"), dataIndex: "ortalamaMiktar", key: "ortalamaMiktar", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("tutar"), dataIndex: "hakedisTutar", key: "hakedisTutar", width: 95, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];


  return (
    <TabloBolumu
      title={t("guzergahBazliToplamlar")}
      subtitle={t("guzergahBazliToplamlarAciklama")}
      columns={columns}
      rows={rows}
      rowKey={(record, index) => `${record.guzergah}-${index}`}
      exportRows={guzergahToplamRows}
      scrollX={560}
      onRefresh={onRefresh}
    />
  );
}

GuzergahToplamlari.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

GuzergahToplamlari.defaultProps = { onRefresh: undefined };
