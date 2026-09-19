import React from "react";
import { Progress } from "antd";
import PropTypes from "prop-types";
import { t } from "i18next";
import FormattedDate from "../../../../components/FormattedDate";
import { compareDatesForSorter } from "../../../../../utils/dateUtils";
import TabloBolumu from "./TabloBolumu";
import { colors } from "../utils/constants";
import { formatNumber, formatPercent, toPercentValue } from "../utils/formatters";
import { gunlukOzetRows } from "../utils/exportMappers";

// Gerçekleşme oranı hem yüzde metni hem de ince bir çubukla gösterilir
const renderGerceklesmeOrani = (value) => (
  <div>
    <div style={{ fontSize: 12, fontWeight: 600, color: colors.title }}>{formatPercent(value)}</div>
    <Progress percent={toPercentValue(value)} showInfo={false} size="small" strokeColor={colors.navy} trailColor={colors.track} />
  </div>
);

// Not: type=6 yanıtında hareket sayısı alanı `hareketSaysi` olarak geliyor
export default function GunlukOperasyonOzeti({ rows, onRefresh = undefined }) {
  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("tarih"), dataIndex: "tarih", key: "tarih", width: 105, ellipsis: true, render: (value) => <FormattedDate date={value} />, sorter: (a, b) => compareDatesForSorter(a.tarih, b.tarih) },
    { title: t("operasyon"), dataIndex: "seferSayisi", key: "seferSayisi", width: 95, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("hareket"), dataIndex: "hareketSaysi", key: "hareketSaysi", width: 90, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("planlanan"), dataIndex: "planlananMiktar", key: "planlananMiktar", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("gerceklesen"), dataIndex: "gerceklesenMiktar", key: "gerceklesenMiktar", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("gerceklesmeOrani"), dataIndex: "dolulukOrani", key: "dolulukOrani", width: 130, align: "right", render: renderGerceklesmeOrani },
    { title: t("tutar"), dataIndex: "hakedisTutar", key: "hakedisTutar", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];

  return (
    <TabloBolumu
      title={t("gunlukOperasyonOzeti")}
      subtitle={t("gunlukOperasyonOzetiAciklama")}
      columns={columns}
      rows={rows}
      rowKey={(record, index) => `${record.tarih}-${index}`}
      exportRows={gunlukOzetRows}
      scrollX={740}
      onRefresh={onRefresh}
    />
  );
}

GunlukOperasyonOzeti.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};
