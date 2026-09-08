import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import FormattedDate from "../../../../components/FormattedDate";
import { compareDatesForSorter } from "../../../../../utils/dateUtils";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { gunlukOzetRows } from "../utils/exportMappers";

// Not: type=6 yanıtında hareket sayısı alanı `hareketSaysi` olarak geliyor
export default function GunlukOperasyonOzeti({ rows, onRefresh }) {
  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("tarih"), dataIndex: "tarih", key: "tarih", width: 105, ellipsis: true, render: (value) => <FormattedDate date={value} />, sorter: (a, b) => compareDatesForSorter(a.tarih, b.tarih) },
    { title: t("operasyonNo"), dataIndex: "operasyonNo", key: "operasyonNo", ellipsis: true, render: (value) => safeText(value) },
    { title: t("hareket"), dataIndex: "hareketSaysi", key: "hareketSaysi", width: 90, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("planlanan"), dataIndex: "planlananMiktar", key: "planlananMiktar", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("gerceklesen"), dataIndex: "gerceklesenMiktar", key: "gerceklesenMiktar", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("tutar"), dataIndex: "hakedisTutar", key: "hakedisTutar", width: 90, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];


  return (
    <TabloBolumu
      title={t("gunlukOperasyonOzeti")}
      subtitle={t("gunlukOperasyonOzetiAciklama")}
      columns={columns}
      rows={rows}
      rowKey={(record, index) => `${record.operasyonNo}-${index}`}
      exportRows={gunlukOzetRows}
      scrollX={610}
      onRefresh={onRefresh}
    />
  );
}

GunlukOperasyonOzeti.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

GunlukOperasyonOzeti.defaultProps = { onRefresh: undefined };
