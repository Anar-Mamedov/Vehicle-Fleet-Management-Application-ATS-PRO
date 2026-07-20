import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  appendSheet: vi.fn(),
  bookNew: vi.fn(() => ({ SheetNames: [], Sheets: {} })),
  jsonToSheet: vi.fn(() => ({})),
  messageError: vi.fn(),
  writeFile: vi.fn(),
}));

vi.mock("antd", () => ({
  Button: Object.assign(
    ({ children, disabled, onClick }) => (
      <button type="button" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    ),
    {
      propTypes: {
        children: () => null,
        disabled: () => null,
        onClick: () => null,
      },
    }
  ),
  message: {
    error: mocks.messageError,
  },
}));

vi.mock("@ant-design/icons", () => ({
  FileExcelOutlined: () => <span>excel</span>,
}));

vi.mock("xlsx", () => ({
  utils: {
    book_append_sheet: mocks.appendSheet,
    book_new: mocks.bookNew,
    json_to_sheet: mocks.jsonToSheet,
  },
  writeFile: mocks.writeFile,
}));

vi.mock("i18next", () => ({
  t: (key) => key,
}));

import ExcelExportButton from "../ExcelExportButton";

describe("ExcelExportButton", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("exports report rows using visible columns and the supplied formatter", async () => {
    const request = vi.fn().mockResolvedValue({
      data: {
        list: [{ plaka: "10 AR 047", tutar: 1200 }],
      },
    });
    const columns = [
      { title: "Plaka", dataIndex: "plaka", width: 120 },
      { title: "Ceza Tutarı", dataIndex: "tutar", width: 100 },
    ];

    render(
      <ExcelExportButton
        request={request}
        columns={columns}
        fileName="Cezalar_Listesi.xlsx"
        sheetName="Cezalar"
        formatCellValue={(value, row, column) => (column.dataIndex === "tutar" ? `${row.tutar} TRY` : value)}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /indir/i }));

    await waitFor(() => expect(mocks.writeFile).toHaveBeenCalled());
    expect(request).toHaveBeenCalledTimes(1);
    expect(mocks.jsonToSheet).toHaveBeenCalledWith([{ Plaka: "10 AR 047", "Ceza Tutarı": "1200 TRY" }], {
      header: ["Plaka", "Ceza Tutarı"],
    });
    expect(mocks.appendSheet).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ "!cols": [{ wpx: 96 }, { wpx: 80 }] }), "Cezalar");
    expect(mocks.writeFile).toHaveBeenCalledWith(expect.any(Object), "Cezalar_Listesi.xlsx", { compression: true });
  });
});
