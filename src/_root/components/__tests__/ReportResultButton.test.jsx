import React from "react";
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

vi.mock("antd", () => {
  const mockMessageFn = vi.fn();
  return {
    Button: ({ children, ...rest }) => (
      <button type={rest.type ?? "button"} {...rest}>
        {children}
      </button>
    ),
    message: {
      warning: mockMessageFn,
    },
  };
});

import ReportResultButton from "../ReportResultButton";

const baseProps = {
  moduleFormName: "TEST",
  selectedRows: [
    { siraNo: "1001" },
    { siraNo: "1002" },
  ],
};

const setBodyFocusMocks = () => {
  document.body.focus = vi.fn();
  document.body.blur = vi.fn();
};

describe("ReportResultButton", () => {
  const originalVisibilityDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
  let visibilityStateValue = "visible";

  beforeAll(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => visibilityStateValue,
    });
  });

  afterAll(() => {
    if (originalVisibilityDescriptor) {
      Object.defineProperty(document, "visibilityState", originalVisibilityDescriptor);
    }
  });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, "open").mockImplementation(() => ({ closed: false }));
    vi.spyOn(window, "focus").mockImplementation(() => {});
    visibilityStateValue = "visible";
    setBodyFocusMocks();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("opens report URLs without leaving the current tab", () => {
    render(<ReportResultButton {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /raporu aç/i }));
    vi.runOnlyPendingTimers();

    expect(window.open).toHaveBeenCalledTimes(2);
    expect(window.focus).toHaveBeenCalled();
  });

  it("retries refocusing when the document becomes hidden", () => {
    visibilityStateValue = "hidden";
    render(<ReportResultButton {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /raporu aç/i }));
    vi.runOnlyPendingTimers();

    expect(window.focus).toHaveBeenCalled();
    const callsBeforeVisibilityChange = window.focus.mock.calls.length;

    document.dispatchEvent(new Event("visibilitychange"));
    vi.runOnlyPendingTimers();

    expect(window.focus.mock.calls.length).toBeGreaterThan(callsBeforeVisibilityChange);
  });
});
