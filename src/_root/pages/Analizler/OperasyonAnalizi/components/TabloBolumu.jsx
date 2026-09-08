import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import { t } from "i18next";
import AnalizKarti from "./AnalizKarti";
import { downloadRowsAsXlsx } from "../utils/exporters";

// Analiz tablolarının ortak kabuğu: kart başlığı, indirme ve yenileme işlemleri aynı davranır
export default function TabloBolumu({ title, subtitle, columns, rows, rowKey, exportRows, onRefresh, scrollX }) {
  const handleDownload = () => downloadRowsAsXlsx(exportRows(rows), title);

  return (
    <AnalizKarti title={title} subtitle={subtitle} onRefresh={onRefresh} onDownload={handleDownload}>
      <Table
        columns={columns}
        dataSource={rows}
        rowKey={rowKey}
        size="small"
        pagination={false}
        locale={{ emptyText: t("veriYok") }}
        scroll={{ y: 260, x: scrollX }}
      />
    </AnalizKarti>
  );
}

TabloBolumu.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  exportRows: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  // Kolon genisliklerinin toplami; daha dar alanda tablo yatay kayar, genisde kabini doldurur
  scrollX: PropTypes.number.isRequired,
};

TabloBolumu.defaultProps = {
  subtitle: undefined,
  onRefresh: undefined,
};
