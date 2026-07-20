import React, { isValidElement, useState } from "react";
import PropTypes from "prop-types";
import { FileExcelOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { t } from "i18next";
import * as XLSX from "xlsx";

const extractText = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(extractText).join("");
  }

  if (isValidElement(value)) {
    return extractText(value.props.children);
  }

  return "";
};

const getColumnTitle = (column) => {
  const excelTitle = typeof column.excelTitle === "string" ? column.excelTitle.trim() : "";
  if (excelTitle) {
    return excelTitle;
  }

  const title = extractText(column.title).trim();
  if (title) {
    return title;
  }

  if (Array.isArray(column.dataIndex)) {
    return column.dataIndex.join(".");
  }

  return column.dataIndex || column.key || "";
};

const getCellValue = (row, dataIndex) => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce((value, key) => value?.[key], row);
  }

  return row?.[dataIndex];
};

const getDefaultRows = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return response?.data?.list;
};

export default function ExcelExportButton({ request, columns, fileName, sheetName, formatCellValue, getRows = getDefaultRows, buttonProps = {} }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await request();
      const rows = getRows(response);

      if (!Array.isArray(rows)) {
        throw new TypeError("Excel export response must contain an array of rows.");
      }

      const exportColumns = columns.filter((column) => column.dataIndex);
      const headers = exportColumns.map(getColumnTitle);
      const exportRows = rows.map((row) =>
        exportColumns.reduce((exportRow, column) => {
          const rawValue = getCellValue(row, column.dataIndex);
          const value = formatCellValue ? formatCellValue(rawValue, row, column) : rawValue;

          exportRow[getColumnTitle(column)] = value ?? "";
          return exportRow;
        }, {})
      );

      const worksheet = XLSX.utils.json_to_sheet(exportRows, { header: headers });
      worksheet["!cols"] = exportColumns.map((column) => ({
        wpx: column.width ? column.width * 0.8 : 100,
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));
      XLSX.writeFile(workbook, fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`, { compression: true });
    } catch {
      message.error(t("excelIndirmeHatasi"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      {...buttonProps}
      style={{ display: "flex", alignItems: "center", ...buttonProps.style }}
      icon={buttonProps.icon || <FileExcelOutlined />}
      loading={loading || Boolean(buttonProps.loading)}
      onClick={handleDownload}
    >
      {buttonProps.children || t("indir")}
    </Button>
  );
}

ExcelExportButton.propTypes = {
  request: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      excelTitle: PropTypes.string,
      key: PropTypes.string,
      title: PropTypes.node,
      width: PropTypes.number,
    })
  ).isRequired,
  fileName: PropTypes.string.isRequired,
  sheetName: PropTypes.string.isRequired,
  formatCellValue: PropTypes.func,
  getRows: PropTypes.func,
  buttonProps: PropTypes.object,
};
