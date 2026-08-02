import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import RoleCodeInput from "../RoleCodeInput";

const codeItemValidateMock = vi.hoisted(() => vi.fn());

vi.mock("../../../../../api/services/code/services", () => ({
  CodeItemValidateService: codeItemValidateMock,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const renderRoleCodeInput = ({ defaultValue = "", initialValue = "" } = {}) => {
  const onSubmit = vi.fn();

  const TestForm = () => {
    const methods = useForm({ defaultValues: { roleKodu: defaultValue } });

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RoleCodeInput initialValue={initialValue} open />
          <button type="submit">save</button>
        </form>
      </FormProvider>
    );
  };

  render(<TestForm />);
  return { onSubmit };
};

describe("role code uniqueness validation", () => {
  beforeEach(() => {
    codeItemValidateMock.mockReset();
    codeItemValidateMock.mockResolvedValue({ data: { status: false } });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("checks a new role code with the rol table name after the debounce", async () => {
    vi.useFakeTimers();
    renderRoleCodeInput();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "FILO_ADMIN" } });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(codeItemValidateMock).toHaveBeenCalledWith({ tableName: "rol", code: "FILO_ADMIN" });
    expect(screen.getByRole("textbox")).toHaveStyle({ borderColor: "#52c41a" });
    expect(screen.getByText("rolKoduBenzersiz")).toBeInTheDocument();
  });

  it("blocks save when the role code is already in use", async () => {
    codeItemValidateMock.mockResolvedValue({ data: { status: true } });
    const { onSubmit } = renderRoleCodeInput();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "USED_ROLE" } });
    fireEvent.click(screen.getByRole("button", { name: "save" }));

    expect(await screen.findByText("rolKoduZatenKullaniliyor")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveStyle({ borderColor: "#ff4d4f" });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("allows the unchanged role code during update without another uniqueness request", async () => {
    const { onSubmit } = renderRoleCodeInput({ defaultValue: "EXISTING_ROLE", initialValue: "EXISTING_ROLE" });

    fireEvent.click(screen.getByRole("button", { name: "save" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    expect(codeItemValidateMock).not.toHaveBeenCalled();
  });

  it("blocks save when role code uniqueness cannot be checked", async () => {
    codeItemValidateMock.mockRejectedValue(new Error("network error"));
    const { onSubmit } = renderRoleCodeInput();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "UNVERIFIED_ROLE" } });
    fireEvent.click(screen.getByRole("button", { name: "save" }));

    expect(await screen.findByText("rolKoduBenzersizligiKontrolEdilemedi")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("checks a changed role code during update before saving", async () => {
    const { onSubmit } = renderRoleCodeInput({ defaultValue: "EXISTING_ROLE", initialValue: "EXISTING_ROLE" });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "UPDATED_ROLE" } });
    fireEvent.click(screen.getByRole("button", { name: "save" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    expect(codeItemValidateMock).toHaveBeenCalledWith({ tableName: "rol", code: "UPDATED_ROLE" });
  });
});
