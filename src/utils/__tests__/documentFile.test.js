import { beforeEach, describe, expect, it, vi } from "vitest";
import { DownloadDocumentByIdService } from "../../api/services/upload/services";
import { downloadDocumentBlob, getDocumentExtension, isPdfDocument } from "../documentFile";

vi.mock("../../api/services/upload/services", () => ({
  DownloadDocumentByIdService: vi.fn(),
}));

describe("documentFile", () => {
  beforeEach(() => {
    DownloadDocumentByIdService.mockReset();
  });

  it("reads the extension from dosyaUzanti and falls back to the file name", () => {
    expect(getDocumentExtension({ dosyaUzanti: "PDF", dosyaAd: "rapor.docx" })).toBe(".pdf");
    expect(getDocumentExtension({ dosyaUzanti: " .Xlsx ", dosyaAd: "liste" })).toBe(".xlsx");
    expect(getDocumentExtension({ dosyaUzanti: "", dosyaAd: "Ruhsat.JPG" })).toBe(".jpg");
    expect(getDocumentExtension({ dosyaAd: "uzantisiz" })).toBe("");
    expect(getDocumentExtension(null)).toBe("");
  });

  it("detects pdf documents", () => {
    expect(isPdfDocument({ dosyaUzanti: ".pdf" })).toBe(true);
    expect(isPdfDocument({ dosyaAd: "sozlesme.PDF" })).toBe(true);
    expect(isPdfDocument({ dosyaUzanti: ".png", dosyaAd: "a.pdf" })).toBe(false);
  });

  it("retries the download with fewer fields and returns the first successful blob", async () => {
    const blob = new Blob(["data"]);
    DownloadDocumentByIdService.mockRejectedValueOnce(new Error("first")).mockResolvedValueOnce({ data: blob });

    await expect(downloadDocumentBlob({ tbDosyaId: 7, dosyaAd: "a.pdf", dosyaUzanti: ".pdf" })).resolves.toBe(blob);
    expect(DownloadDocumentByIdService.mock.calls).toEqual([[{ fileId: 7, extension: ".pdf", fileName: "a.pdf" }], [{ fileId: 7, extension: ".pdf" }]]);
  });

  it("throws the last error when every request fails", async () => {
    DownloadDocumentByIdService.mockRejectedValueOnce(new Error("1")).mockRejectedValueOnce(new Error("2")).mockRejectedValueOnce(new Error("3"));

    await expect(downloadDocumentBlob({ tbDosyaId: 7, dosyaAd: "a.pdf" })).rejects.toThrow("3");
    expect(DownloadDocumentByIdService).toHaveBeenLastCalledWith({ fileId: 7 });
  });
});
