import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import customFontBase64 from "../../../dashboard/components/RobotoBase64.js";

const characterMap = {
  ç: "c",
  Ç: "C",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  İ: "I",
  ö: "o",
  Ö: "O",
  ş: "s",
  Ş: "S",
  ü: "u",
  Ü: "U",
};

export const normalizeExportFileName = (value = "export") =>
  String(value)
    .split("")
    .map((char) => characterMap[char] || char)
    .join("")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const createPdfDocument = (orientation = "landscape") => {
  const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });

  doc.addFileToVFS("Roboto-Regular.ttf", customFontBase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  return doc;
};

const sanitizeExportCellValue = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/_x000d_/gi, " ")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const downloadRowsAsPdf = ({ title, subtitle, columns, rows, orientation = "landscape" }) => {
  const doc = createPdfDocument(orientation);
  const safeRows = Array.isArray(rows) ? rows : [];

  doc.setFontSize(15);
  doc.text(title, 14, 16);

  let startY = 24;
  if (subtitle) {
    doc.setFontSize(10);
    doc.text(subtitle, 14, 22);
    startY = 28;
  }

  doc.autoTable({
    head: [columns],
    body: safeRows,
    startY,
    styles: {
      font: "Roboto",
      fontSize: 9,
      cellPadding: 2.5,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [22, 119, 255],
      textColor: [255, 255, 255],
      font: "Roboto",
      fontStyle: "normal",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { top: 14, right: 12, bottom: 14, left: 12 },
  });

  doc.save(`${normalizeExportFileName(title)}.pdf`);
};

export const downloadVehicleChartPdf = ({ title, subtitle, data, formatter }) => {
  const rows = (Array.isArray(data) ? data : []).slice(0, 10).map((item, index) => [
    String(index + 1),
    item.plate || "-",
    item.model || "-",
    formatter(item.value),
  ]);

  downloadRowsAsPdf({
    title,
    subtitle,
    columns: ["Sıra", "Plaka", "Araç Bilgisi", "Değer"],
    rows,
  });
};

export const downloadJsonAsXlsx = (rows, title) => {
  const sanitizedRows = (Array.isArray(rows) ? rows : []).map((row) =>
    Object.fromEntries(Object.entries(row).map(([key, value]) => [key, sanitizeExportCellValue(value)]))
  );
  const worksheet = XLSX.utils.json_to_sheet(sanitizedRows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${normalizeExportFileName(title)}.xlsx`);
};
