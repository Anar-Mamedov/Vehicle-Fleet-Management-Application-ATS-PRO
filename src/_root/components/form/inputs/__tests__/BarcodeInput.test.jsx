import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { codeItemValidateMock, generateBarcodeMock, printBarcodeMock, useReactToPrintMock, errorMock } = vi.hoisted(() => {
  const printBarcodeMock = vi.fn();

  return {
    codeItemValidateMock: vi.fn(),
    generateBarcodeMock: vi.fn(),
    printBarcodeMock,
    useReactToPrintMock: vi.fn(() => printBarcodeMock),
    errorMock: vi.fn(),
  };
});

vi.mock("../../../../../api/services/code/services", () => ({ CodeItemValidateService: codeItemValidateMock }));
vi.mock("jsbarcode", () => ({ default: generateBarcodeMock }));
vi.mock("react-to-print", () => ({ useReactToPrint: useReactToPrintMock }));
vi.mock("i18next", () => ({ t: (key) => key }));
vi.mock("@ant-design/icons", () => ({ BarcodeOutlined: () => <span /> }));
vi.mock("antd", () => ({
  Button: (props) => (
    <button type={props.htmlType ?? "button"} aria-label={props["aria-label"]} title={props.title} onMouseDown={props.onMouseDown} onClick={props.onClick}>
      {props.icon}
    </button>
  ),
  Input: ({ suffix, status, ...props }) => (
    <div>
      <input {...props} data-status={status} />
      {suffix}
    </div>
  ),
  message: {
    error: errorMock,
  },
}));

import BarcodeInput from "../BarcodeInput";

const renderBarcodeInput = ({ defaultValue = "", onSave, onFormSubmit } = {}) => {
  const BarcodeInputForm = () => {
    const methods = useForm({ defaultValues: { barKodNo: defaultValue } });

    return (
      <FormProvider {...methods}>
        <form onSubmit={onFormSubmit ? methods.handleSubmit(onFormSubmit) : undefined}>
          <BarcodeInput name="barKodNo" onSave={onSave} />
          {onFormSubmit && (
            <button type="submit" aria-label="formKaydet">
              Kaydet
            </button>
          )}
        </form>
      </FormProvider>
    );
  };

  return render(<BarcodeInputForm />);
};

describe("BarcodeInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    codeItemValidateMock.mockReset();
    codeItemValidateMock.mockResolvedValue({ data: { status: false } });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("saves and prints a CODE128 barcode from the entered value", async () => {
    const onSave = vi.fn().mockResolvedValue(true);
    renderBarcodeInput({ onSave });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ABC-123" } });
    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(printBarcodeMock).toHaveBeenCalledOnce());

    expect(onSave).toHaveBeenCalledWith("ABC-123");
    expect(generateBarcodeMock).toHaveBeenCalledWith(expect.any(SVGElement), "ABC-123", expect.objectContaining({ format: "CODE128" }));
    expect(codeItemValidateMock).toHaveBeenCalledWith({ tableName: "Barkod", code: "ABC-123" });
    expect(codeItemValidateMock.mock.invocationCallOrder[0]).toBeLessThan(onSave.mock.invocationCallOrder[0]);
    expect(onSave.mock.invocationCallOrder[0]).toBeLessThan(generateBarcodeMock.mock.invocationCallOrder[0]);
  });

  it("checks only the final manually entered barcode after the debounce delay and marks a unique value green", async () => {
    vi.useFakeTimers();
    const onFormSubmit = vi.fn();
    renderBarcodeInput({ onFormSubmit });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "A" } });
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "AB" } });
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ABC-123" } });

    expect(codeItemValidateMock).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(codeItemValidateMock).toHaveBeenCalledOnce();
    expect(codeItemValidateMock).toHaveBeenCalledWith({ tableName: "Barkod", code: "ABC-123" });
    expect(screen.getByRole("textbox")).toHaveStyle({ borderColor: "#52c41a" });
    expect(screen.getByText("barkodBenzersiz")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "formKaydet" }));
    });

    expect(onFormSubmit).toHaveBeenCalledWith({ barKodNo: "ABC-123" }, expect.anything());
  });

  it("marks a duplicate manual barcode red and prevents the regular form save", async () => {
    vi.useFakeTimers();
    codeItemValidateMock.mockResolvedValue({ data: { status: true } });
    const onFormSubmit = vi.fn();
    renderBarcodeInput({ onFormSubmit });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "USED-123" } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(screen.getByRole("textbox")).toHaveAttribute("data-status", "error");
    expect(screen.getByRole("textbox")).toHaveStyle({ borderColor: "#ff4d4f" });
    expect(screen.getByRole("alert")).toHaveTextContent("barkodZatenKullaniliyor");

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "formKaydet" }));
    });

    expect(onFormSubmit).not.toHaveBeenCalled();
  });

  it("does not save or print when the manually entered barcode is already in use", async () => {
    codeItemValidateMock.mockResolvedValue({ data: { status: true } });
    const onSave = vi.fn().mockResolvedValue(true);
    renderBarcodeInput({ onSave });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "USED-456" } });
    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(errorMock).toHaveBeenCalledWith("barkodZatenKullaniliyor"));
    expect(onSave).not.toHaveBeenCalled();
    expect(generateBarcodeMock).not.toHaveBeenCalled();
    expect(printBarcodeMock).not.toHaveBeenCalled();
  });

  it("allows the unchanged saved barcode without treating the current record as a duplicate", async () => {
    const onSave = vi.fn().mockResolvedValue(true);
    renderBarcodeInput({ defaultValue: "SAVED-123", onSave });

    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(printBarcodeMock).toHaveBeenCalledOnce());
    expect(codeItemValidateMock).not.toHaveBeenCalled();
    expect(onSave).toHaveBeenCalledWith("SAVED-123");
  });

  it("prints the barcode on a 60 mm by 30 mm label", () => {
    renderBarcodeInput();

    const { pageStyle } = useReactToPrintMock.mock.calls[0][0];

    expect(pageStyle).toContain("size: 60mm 30mm");
    expect(pageStyle).toContain("width: 60mm !important");
    expect(pageStyle).toContain("height: 30mm !important");
  });

  it("generates, validates, saves, and prints a unique timestamp barcode when the input is empty", async () => {
    const onSave = vi.fn().mockResolvedValue(true);
    renderBarcodeInput({ onSave });

    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(printBarcodeMock).toHaveBeenCalledOnce());

    const generatedBarcodeValue = codeItemValidateMock.mock.calls[0][0].code;
    expect(generatedBarcodeValue).toMatch(/^\d{14}$/);
    expect(codeItemValidateMock).toHaveBeenCalledWith({ tableName: "Barkod", code: generatedBarcodeValue });
    expect(onSave).toHaveBeenCalledWith(generatedBarcodeValue);
    expect(screen.getByRole("textbox")).toHaveValue(generatedBarcodeValue);
    expect(generateBarcodeMock).toHaveBeenCalledWith(expect.any(SVGElement), generatedBarcodeValue, expect.objectContaining({ format: "CODE128" }));
  });

  it("retries with the next second when the generated barcode already exists", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 24, 10, 20, 30));
    codeItemValidateMock.mockResolvedValueOnce({ data: { status: true } }).mockResolvedValueOnce({ data: { status: false } });
    renderBarcodeInput({ onSave: vi.fn().mockResolvedValue(true) });

    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1010);
    });

    expect(codeItemValidateMock).toHaveBeenNthCalledWith(1, { tableName: "Barkod", code: "20260724102030" });
    expect(codeItemValidateMock).toHaveBeenNthCalledWith(2, { tableName: "Barkod", code: "20260724102031" });
    expect(generateBarcodeMock).toHaveBeenCalledWith(expect.any(SVGElement), "20260724102031", expect.objectContaining({ format: "CODE128" }));
    expect(printBarcodeMock).toHaveBeenCalledOnce();
  });

  it("does not print an automatically generated barcode when the record cannot be saved", async () => {
    renderBarcodeInput({ onSave: vi.fn().mockResolvedValue(false) });

    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(errorMock).toHaveBeenCalledWith("barkodKaydedilemedi"));
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(generateBarcodeMock).not.toHaveBeenCalled();
    expect(printBarcodeMock).not.toHaveBeenCalled();
  });

  it("preserves a manually entered barcode and does not print when the record cannot be saved", async () => {
    renderBarcodeInput({ onSave: vi.fn().mockResolvedValue(false) });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "MANUAL-123" } });
    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(errorMock).toHaveBeenCalledWith("barkodKaydedilemedi"));
    expect(screen.getByRole("textbox")).toHaveValue("MANUAL-123");
    expect(generateBarcodeMock).not.toHaveBeenCalled();
    expect(printBarcodeMock).not.toHaveBeenCalled();
  });

  it("shows an error when the value cannot be encoded", async () => {
    generateBarcodeMock.mockImplementationOnce(() => {
      throw new Error("Invalid barcode value");
    });
    renderBarcodeInput();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Ğ" } });
    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    await waitFor(() => expect(errorMock).toHaveBeenCalledWith("barkodOlusturulamadi"));
    expect(printBarcodeMock).not.toHaveBeenCalled();
  });
});
