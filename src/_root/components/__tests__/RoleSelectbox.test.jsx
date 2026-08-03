import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import RoleSelectbox from "../RoleSelectbox";

const getRolesMock = vi.hoisted(() => vi.fn());
const FLEET_MANAGER_ROLE = "Filo Yöneticisi";
const SERVICE_MANAGER_ROLE = "Servis Sorumlusu";

vi.mock("../../../api/services/roles/services", () => ({
  GetRolesService: getRolesMock,
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

const renderRoleSelectbox = (defaultValues = { role: [], roleID: [] }, selectboxProps = {}) => {
  const onSubmit = vi.fn();

  const TestForm = () => {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <RoleSelectbox name1="role" isRequired {...selectboxProps} />
          <button type="submit">save</button>
        </form>
      </FormProvider>
    );
  };

  render(<TestForm />);
  return { onSubmit };
};

describe("RoleSelectbox", () => {
  beforeEach(() => {
    getRolesMock.mockReset();
    getRolesMock.mockResolvedValue({
      data: [
        { siraNo: 8, roleAdi: FLEET_MANAGER_ROLE },
        { siraNo: 9, roleAdi: SERVICE_MANAGER_ROLE },
      ],
    });
  });

  it("loads roles and stores selected role names and IDs as arrays", async () => {
    const { onSubmit } = renderRoleSelectbox();
    const select = screen.getByRole("combobox");

    fireEvent.mouseDown(select);
    fireEvent.click(await screen.findByText(FLEET_MANAGER_ROLE));
    fireEvent.click(await screen.findByText(SERVICE_MANAGER_ROLE));
    fireEvent.click(screen.getByRole("button", { name: "save" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    expect(getRolesMock).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith({ role: [FLEET_MANAGER_ROLE, SERVICE_MANAGER_ROLE], roleID: [8, 9] }, expect.anything());
  });

  it("prevents submission when no role is selected", async () => {
    const { onSubmit } = renderRoleSelectbox();

    fireEvent.click(screen.getByRole("button", { name: "save" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("alanBosBirakilamaz");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("reloads the role list every time the dropdown is opened", async () => {
    renderRoleSelectbox();
    const select = screen.getByRole("combobox");

    fireEvent.mouseDown(select);
    await screen.findByText(FLEET_MANAGER_ROLE);
    fireEvent.click(screen.getByText(FLEET_MANAGER_ROLE));
    fireEvent.mouseDown(document.body);
    fireEvent.click(document.body);
    await waitFor(() => expect(select).toHaveAttribute("aria-expanded", "false"));
    fireEvent.mouseDown(select);

    await waitFor(() => expect(getRolesMock).toHaveBeenCalledTimes(2));
  });

  it("resolves the role name from an existing role ID on update", async () => {
    const { onSubmit } = renderRoleSelectbox({ role: [], roleID: [8, 9] });

    await waitFor(() => expect(getRolesMock).toHaveBeenCalledOnce());
    fireEvent.click(screen.getByRole("button", { name: "save" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    expect(onSubmit).toHaveBeenCalledWith({ role: [FLEET_MANAGER_ROLE, SERVICE_MANAGER_ROLE], roleID: [8, 9] }, expect.anything());
  });

  it("selects the default role automatically when the create form opens", async () => {
    getRolesMock.mockResolvedValue({
      data: [
        { siraNo: 7, roleAdi: "Standart Kullanıcı" },
        { siraNo: 8, roleAdi: "Varsayılan Rol" },
      ],
    });
    const { onSubmit } = renderRoleSelectbox({ role: [], roleID: [] }, { autoSelectDefault: true });

    await waitFor(() => expect(getRolesMock).toHaveBeenCalledOnce());
    fireEvent.click(screen.getByRole("button", { name: "save" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    expect(onSubmit).toHaveBeenCalledWith({ role: ["Varsayılan Rol"], roleID: [8] }, expect.anything());
  });
});
