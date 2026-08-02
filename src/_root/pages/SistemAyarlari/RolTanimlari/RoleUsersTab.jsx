import React, { useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { GetUsersByRoleIdService } from "../../../../api/services/roles/services";

const getResponseList = (response) => {
  const responseData = response?.data;

  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.list)) {
    return responseData.list;
  }

  return Array.isArray(responseData?.data) ? responseData.data : [];
};

export const getRoleUserDisplayName = (user) => {
  const fullName = [user?.isim, user?.soyAd]
    .map((value) => String(value ?? "").trim())
    .filter(Boolean)
    .join(" ");

  return fullName || String(user?.kullaniciKod ?? "").trim() || "-";
};

export const getRoleUserType = (user) => {
  if (user?.admin) {
    return { className: "manager", translationKey: "rolKullaniciYonetici" };
  }

  if (user?.isDriver) {
    return { className: "driver", translationKey: "rolKullaniciSurucu" };
  }

  return { className: "standard", translationKey: "rolKullaniciStandart" };
};

const getDisplayValue = (value) => String(value ?? "").trim() || "-";

export default function RoleUsersTab({ active, roleId }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!active || !roleId || loaded) {
      return undefined;
    }

    let ignore = false;
    setLoading(true);
    setLoadError(false);

    GetUsersByRoleIdService(roleId)
      .then((response) => {
        if (!ignore) {
          setUsers(getResponseList(response));
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!ignore) {
          setLoadError(true);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [active, loaded, roleId]);

  if (!active) {
    return null;
  }

  return (
    <section aria-labelledby="role-users-heading" className="role-users-section" role="tabpanel">
      <div className="role-users-heading">
        <h2 id="role-users-heading">{t("rolKullanicilarBaslik")}</h2>
        <p>{t("rolKullanicilarAciklama")}</p>
      </div>

      {loadError && <Alert showIcon type="error" message={t("rolKullanicilariYuklenemedi")} />}
      {!loadError && !loading && loaded && users.length === 0 && <Alert showIcon type="info" message={t("rolKullaniciKaydiBulunamadi")} />}

      <Spin spinning={loading}>
        <div className="role-users-table-wrap">
          <table className="role-users-table">
            <thead>
              <tr>
                <th>{t("rolKullaniciAdSoyad")}</th>
                <th>{t("rolKullaniciKodu")}</th>
                <th>{t("rolKullaniciEmail")}</th>
                <th>{t("rolKullaniciTuru")}</th>
                <th>{t("durum")}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const userType = getRoleUserType(user);

                return (
                  <tr key={user.siraNo ?? user.kullaniciKod}>
                    <td className="role-user-full-name">{getRoleUserDisplayName(user)}</td>
                    <td>{getDisplayValue(user.kullaniciKod)}</td>
                    <td>{getDisplayValue(user.email)}</td>
                    <td>
                      <span className={`role-user-type role-user-type--${userType.className}`}>{t(userType.translationKey)}</span>
                    </td>
                    <td>
                      <span className={`role-definitions-status role-definitions-status--${user.aktif ? "active" : "passive"}`}>
                        <span className="role-definitions-status__dot" />
                        {t(user.aktif ? "rolDurumAktif" : "rolDurumPasif")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Spin>
    </section>
  );
}

RoleUsersTab.propTypes = {
  active: PropTypes.bool.isRequired,
  roleId: PropTypes.number.isRequired,
};
