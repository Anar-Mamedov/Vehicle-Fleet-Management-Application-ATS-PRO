import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { personelOzetRows } from "../utils/exportMappers";

export default function PersonelOzeti({ rows, onRefresh }) {
  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("personelTekil"), dataIndex: "isim", key: "isim", ellipsis: true, render: (value) => safeText(value) },
    { title: t("tip"), dataIndex: "tip", key: "tip", width: 140, ellipsis: true, render: (value) => safeText(value) },
    { title: t("hareket"), dataIndex: "hareketSayisi", key: "hareketSayisi", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];


  return (
    <TabloBolumu
      title={t("personelOzeti")}
      subtitle={t("personelOzetiAciklama")}
      columns={columns}
      rows={rows}
      rowKey={(record, index) => `${record.isim}-${index}`}
      exportRows={personelOzetRows}
      scrollX={420}
      onRefresh={onRefresh}
    />
  );
}

PersonelOzeti.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

PersonelOzeti.defaultProps = { onRefresh: undefined };
