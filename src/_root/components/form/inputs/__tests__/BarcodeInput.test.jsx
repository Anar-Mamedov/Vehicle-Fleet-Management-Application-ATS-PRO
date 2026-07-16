import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { generateBarcodeMock, printBarcodeMock, warningMock, errorMock } = vi.hoisted(() => ({
  generateBarcodeMock: vi.fn(),
  printBarcodeMock: vi.fn(),
  warningMock: vi.fn(),
  errorMock: vi.fn(),
}));

vi.mock("jsbarcode", () => ({ default: generateBarcodeMock }));
vi.mock("react-to-print", () => ({ useReactToPrint: () => printBarcodeMock }));
vi.mock("i18next", () => ({ t: (key) => key }));
vi.mock("@ant-design/icons", () => ({ BarcodeOutlined: () => <span /> }));
vi.mock("antd", () => ({
  Button: (props) => (
    <button type={props.htmlType ?? "button"} aria-label={props["aria-label"]} title={props.title} onMouseDown={props.onMouseDown} onClick={props.onClick}>
      {props.icon}
    </button>
  ),
  Input: ({ suffix, ...props }) => (
    <div>
      <input {...props} />
      {suffix}
    </div>
  ),
  message: {
    warning: warningMock,
    error: errorMock,
  },
}));

import BarcodeInput from "../BarcodeInput";

const BarcodeInputForm = () => {
  const methods = useForm({ defaultValues: { barKodNo: "" } });

  return (
    <FormProvider {...methods}>
      <BarcodeInput name="barKodNo" />
    </FormProvider>
  );
};

describe("BarcodeInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates and prints a CODE128 barcode from the entered value", () => {
    render(<BarcodeInputForm />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "ABC-123" } });
    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    expect(generateBarcodeMock).toHaveBeenCalledWith(expect.any(SVGElement), "ABC-123", expect.objectContaining({ format: "CODE128" }));
    expect(printBarcodeMock).toHaveBeenCalledOnce();
  });

  it("warns instead of printing when the value is empty", () => {
    render(<BarcodeInputForm />);

    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    expect(warningMock).toHaveBeenCalledWith("barkodDegeriGerekli");
    expect(generateBarcodeMock).not.toHaveBeenCalled();
    expect(printBarcodeMock).not.toHaveBeenCalled();
  });

  it("shows an error when the value cannot be encoded", () => {
    generateBarcodeMock.mockImplementationOnce(() => {
      throw new Error("Invalid barcode value");
    });
    render(<BarcodeInputForm />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Ğ" } });
    fireEvent.click(screen.getByRole("button", { name: "barkodOlusturVeYazdir" }));

    expect(errorMock).toHaveBeenCalledWith("barkodOlusturulamadi");
    expect(printBarcodeMock).not.toHaveBeenCalled();
  });
});
