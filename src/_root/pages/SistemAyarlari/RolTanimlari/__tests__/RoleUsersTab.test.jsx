import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RoleUsersTab, { getRoleUserType } from "../RoleUsersTab";

const getUsersByRoleIdMock = vi.hoisted(() => vi.fn());

vi.mock("../../../../../api/services/roles/services", () => ({
  GetUsersByRoleIdService: getUsersByRoleIdMock,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("role users tab", () => {
  beforeEach(() => {
    getUsersByRoleIdMock.mockReset();
  });

  it("loads and renders users for the selected role", async () => {
    getUsersByRoleIdMock.mockResolvedValue({
      data: [
        {
          siraNo: 14,
          kullaniciKod: "loreal.pentest",
          isim: "Loreal",
          soyAd: "test",
          aktif: true,
          email: "loreal@example.com",
          telefon: "5551234567",
          admin: true,
        },
      ],
    });

    render(<RoleUsersTab active roleId={8} />);

    expect(await screen.findByText("Loreal test")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "rolKullaniciEkle" })).toBeDisabled();
    expect(screen.getByText("loreal@example.com")).toBeInTheDocument();
    expect(screen.getByText("loreal.pentest")).toBeInTheDocument();
    expect(getUsersByRoleIdMock).toHaveBeenCalledWith(8);
  });

  it("does not request users before the tab becomes active", () => {
    render(<RoleUsersTab active={false} roleId={8} />);

    expect(getUsersByRoleIdMock).not.toHaveBeenCalled();
  });

  it("derives the user type from admin and driver flags", () => {
    expect(getRoleUserType({ admin: true, isDriver: true }).translationKey).toBe("rolKullaniciYonetici");
    expect(getRoleUserType({ admin: false, isDriver: true }).translationKey).toBe("rolKullaniciSurucu");
    expect(getRoleUserType({ admin: false, isDriver: false }).translationKey).toBe("rolKullaniciStandart");
  });
});
