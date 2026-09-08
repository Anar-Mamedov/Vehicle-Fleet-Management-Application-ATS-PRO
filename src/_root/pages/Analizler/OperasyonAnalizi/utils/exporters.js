import * as XLSX from "xlsx";

const characterMap = { ç: "c", Ç: "C", ğ: "g", Ğ: "G", ı: "i", İ: "I", ö: "o", Ö: "O", ş: "s", Ş: "S", ü: "u", Ü: "U" };

export const normalizeExportFileName = (value = "export") =>
  String(value)
    .split("")
    .map((char) => characterMap[char] || char)
    .join("")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

// Sayfa adları Excel tarafında 31 karakterle sınırlıdır ve bazı işaretleri kabul etmez
const toSheetName = (value) => String(value).replace(/[\\/?*[\]:]/g, " ").slice(0, 31) || "Sheet1";

// { baslik, satirlar } listesini tek çalışma kitabında ayrı sayfalara yazar
export const downloadSheetsAsXlsx = (sheets, fileName) => {
  const workbook = XLSX.utils.book_new();
  let hasSheet = false;

  sheets.forEach(({ baslik, satirlar }) => {
    if (!Array.isArray(satirlar) || satirlar.length === 0) {
      return;
    }

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(satirlar), toSheetName(baslik));
    hasSheet = true;
  });

  if (!hasSheet) {
    return false;
  }

  XLSX.writeFile(workbook, `${normalizeExportFileName(fileName)}.xlsx`);
  return true;
};

export const downloadRowsAsXlsx = (rows, fileName) => downloadSheetsAsXlsx([{ baslik: fileName, satirlar: rows }], fileName);
