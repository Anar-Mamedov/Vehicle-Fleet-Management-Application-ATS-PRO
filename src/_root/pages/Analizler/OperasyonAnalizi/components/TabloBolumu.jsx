import React, { useState } from "react";
import { Pagination, Table } from "antd";
import PropTypes from "prop-types";
import { t } from "i18next";
import AnalizKarti from "./AnalizKarti";
import PageSizeSelect, { getStoredPageSize } from "../../../../components/table/PageSizeSelect";
import { EXPANDED_TABLE_SCROLL_Y, WIDGET_PAGE_SIZE_STORAGE_KEY, WIDGET_PREVIEW_ROW_COUNT } from "../utils/constants";
import { downloadRowsAsXlsx } from "../utils/exporters";

const tableShape = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  // Kolon genisliklerinin toplami; daha dar alanda tablo yatay kayar, genisde kabini doldurur
  scrollX: PropTypes.number.isRequired,
};

// "Büyüt" ve "Verileri Görüntüle" pencerelerinde kayıtların tamamı sayfalanarak listelenir
export function GenislemisTablo({ columns, rows, rowKey, scrollX }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(WIDGET_PAGE_SIZE_STORAGE_KEY));

  const handlePageSizeChange = (nextPageSize) => {
    localStorage.setItem(WIDGET_PAGE_SIZE_STORAGE_KEY, nextPageSize);
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const pageRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <Table columns={columns} dataSource={pageRows} rowKey={rowKey} size="small" pagination={false} locale={{ emptyText: t("veriYok") }} scroll={{ y: EXPANDED_TABLE_SCROLL_Y, x: scrollX }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "15px", marginTop: "12px" }}>
        <Pagination current={currentPage} total={rows.length} pageSize={pageSize} onChange={setCurrentPage} showSizeChanger={false} />
        <PageSizeSelect value={pageSize} onChange={handlePageSizeChange} />
      </div>
    </>
  );
}

GenislemisTablo.propTypes = tableShape;

// Analiz tablolarının ortak kabuğu: kartta ilk 5 kayıt, menüdeki "Büyüt" ile tüm kayıtlar gösterilir
export default function TabloBolumu({ title, subtitle, columns, rows, rowKey, exportRows, scrollX, onRefresh = undefined }) {
  const handleDownload = () => downloadRowsAsXlsx(exportRows(rows), title);

  return (
    <AnalizKarti
      title={title}
      subtitle={subtitle}
      onRefresh={onRefresh}
      onDownload={handleDownload}
      expandedContent={<GenislemisTablo columns={columns} rows={rows} rowKey={rowKey} scrollX={scrollX} />}
      expandedScrollable={false}
    >
      <Table columns={columns} dataSource={rows.slice(0, WIDGET_PREVIEW_ROW_COUNT)} rowKey={rowKey} size="small" pagination={false} locale={{ emptyText: t("veriYok") }} scroll={{ x: scrollX }} />
    </AnalizKarti>
  );
}

TabloBolumu.propTypes = {
  ...tableShape,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  exportRows: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
};
