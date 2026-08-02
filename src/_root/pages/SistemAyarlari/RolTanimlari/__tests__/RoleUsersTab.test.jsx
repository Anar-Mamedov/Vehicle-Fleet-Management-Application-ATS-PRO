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
    expect(screen.queryByRole("button", { name: "rolKullaniciEkle" })).not.toBeInTheDocument();
    expect(screen.getByText("loreal@example.com")).toBeInTheDocument();
    expect(screen.getByText("loreal.pentest")).toBeInTheDocument();
    expect(getUsersByRoleIdMock).toHaveBeenCalledWith(8);
  });

  it("does not request users before the tab becomes active", () => {
    render(<RoleUsersTab active={false} roleId={8} />);

    expect(getUsersByRoleIdMock).not.toHaveBeenCalled();
  });

  it("refetches users every time the users tab becomes active", async () => {
    getUsersByRoleIdMock
      .mockResolvedValueOnce({ data: [{ siraNo: 1, kullaniciKod: "first", isim: "First", aktif: true }] })
      .mockResolvedValueOnce({ data: [{ siraNo: 2, kullaniciKod: "second", isim: "Second", aktif: true }] });

    const { rerender } = render(<RoleUsersTab active roleId={8} />);

    expect(await screen.findByText("First")).toBeInTheDocument();

    rerender(<RoleUsersTab active={false} roleId={8} />);
    rerender(<RoleUsersTab active roleId={8} />);

    expect(await screen.findByText("Second")).toBeInTheDocument();
    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(getUsersByRoleIdMock).toHaveBeenCalledTimes(2);
    expect(getUsersByRoleIdMock).toHaveBeenNthCalledWith(1, 8);
    expect(getUsersByRoleIdMock).toHaveBeenNthCalledWith(2, 8);
  });

  it("derives the user type from admin and driver flags", () => {
    expect(getRoleUserType({ admin: true, isDriver: true }).translationKey).toBe("rolKullaniciYonetici");
    expect(getRoleUserType({ admin: false, isDriver: true }).translationKey).toBe("rolKullaniciSurucu");
    expect(getRoleUserType({ admin: false, isDriver: false }).translationKey).toBe("rolKullaniciStandart");
  });
});
