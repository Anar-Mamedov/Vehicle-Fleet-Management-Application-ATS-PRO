import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Input, Select, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { GetRolesService } from "../../../../api/services/roles/services";
import RoleFormModal from "./RoleFormModal";
import "./RolTanimlari.css";

const ALL_FILTER_VALUE = "all";

const normalizeSearchText = (value) => String(value ?? "").toLocaleLowerCase("tr-TR");

export const filterRoles = (roles, searchValue, statusFilter, managerFilter) => {
  const normalizedSearchValue = normalizeSearchText(searchValue.trim());

  return roles.filter((role) => {
    const matchesSearch =
      !normalizedSearchValue || normalizeSearchText(role.roleAdi).includes(normalizedSearchValue) || normalizeSearchText(role.roleKodu).includes(normalizedSearchValue);
    const matchesStatus = statusFilter === ALL_FILTER_VALUE || role.durum === (statusFilter === "active");
    const matchesManager = managerFilter === ALL_FILTER_VALUE || role.yonetici === (managerFilter === "manager");

    return matchesSearch && matchesStatus && matchesManager;
  });
};

const formatChangedAt = (value) => {
  if (!value) {
    return "-";
  }

  const date = dayjs(value);
  return date.isValid() ? date.format("DD.MM.YYYY HH:mm") : "-";
};

const getChangedAtSortValue = (value) => {
  const date = dayjs(value);
  return value && date.isValid() ? date.valueOf() : 0;
};

const RoleStatus = ({ active, activeText, passiveText }) => (
  <span className={`role-definitions-status ${active ? "role-definitions-status--active" : "role-definitions-status--passive"}`}>
    <span className="role-definitions-status__dot" />
    {active ? activeText : passiveText}
  </span>
);

const RoleManagerStatus = ({ manager, yesText, noText }) => (
  <span className={`role-definitions-manager ${manager ? "role-definitions-manager--yes" : "role-definitions-manager--no"}`}>{manager ? yesText : noText}</span>
);

RoleStatus.propTypes = {
  active: PropTypes.bool.isRequired,
  activeText: PropTypes.string.isRequired,
  passiveText: PropTypes.string.isRequired,
};

RoleManagerStatus.propTypes = {
  manager: PropTypes.bool.isRequired,
  yesText: PropTypes.string.isRequired,
  noText: PropTypes.string.isRequired,
};

export default function RolTanimlari() {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL_FILTER_VALUE);
  const [managerFilter, setManagerFilter] = useState(ALL_FILTER_VALUE);
  const [refreshKey, setRefreshKey] = useState(0);
  const [roleModal, setRoleModal] = useState({ open: false, role: null });

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    GetRolesService()
      .then((response) => {
        if (ignore) {
          return;
        }

        const responseRoles = Array.isArray(response.data) ? response.data : response.data?.list;
        setRoles(Array.isArray(responseRoles) ? responseRoles : []);
        setLoadError(false);
      })
      .catch(() => {
        if (!ignore) {
          setRoles([]);
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
  }, [refreshKey]);

  const openUpdateModal = useCallback((selectedRole) => {
    setRoleModal({ open: true, role: selectedRole });
  }, []);

  const filteredRoles = useMemo(() => filterRoles(roles, searchValue, statusFilter, managerFilter), [managerFilter, roles, searchValue, statusFilter]);

  const columns = useMemo(
    () => [
      {
        title: t("rolAdi"),
        dataIndex: "roleAdi",
        key: "roleAdi",
        width: 220,
        sorter: (firstRole, secondRole) => String(firstRole.roleAdi ?? "").localeCompare(String(secondRole.roleAdi ?? ""), "tr"),
        render: (value, record) => (
          <a
            className="role-definitions-name"
            href={`/rol-tanimlari?roleId=${record.siraNo}`}
            onClick={(event) => {
              event.preventDefault();
              openUpdateModal(record);
            }}
          >
            {value || "-"}
          </a>
        ),
      },
      {
        title: t("rolKodu"),
        dataIndex: "roleKodu",
        key: "roleKodu",
        width: 190,
        sorter: (firstRole, secondRole) => String(firstRole.roleKodu ?? "").localeCompare(String(secondRole.roleKodu ?? ""), "tr"),
        render: (value) => <span className="role-definitions-code">{value || "-"}</span>,
      },
      {
        title: t("aciklama"),
        dataIndex: "aciklama",
        key: "aciklama",
        width: 360,
        ellipsis: true,
        render: (value) => value || "-",
      },
      {
        title: t("rolKullaniciSayisi"),
        dataIndex: "kullaniciSayisi",
        key: "kullaniciSayisi",
        width: 150,
        align: "center",
        sorter: (firstRole, secondRole) => Number(firstRole.kullaniciSayisi ?? 0) - Number(secondRole.kullaniciSayisi ?? 0),
        render: (value) => value ?? 0,
      },
      {
        title: t("rolYonetici"),
        dataIndex: "yonetici",
        key: "yonetici",
        width: 130,
        align: "center",
        sorter: (firstRole, secondRole) => Number(firstRole.yonetici) - Number(secondRole.yonetici),
        render: (value) => <RoleManagerStatus manager={Boolean(value)} yesText={t("rolYoneticiEvet")} noText={t("rolYoneticiHayir")} />,
      },
      {
        title: t("durum"),
        dataIndex: "durum",
        key: "durum",
        width: 130,
        sorter: (firstRole, secondRole) => Number(firstRole.durum) - Number(secondRole.durum),
        render: (value) => <RoleStatus active={Boolean(value)} activeText={t("rolDurumAktif")} passiveText={t("rolDurumPasif")} />,
      },
      {
        title: t("rolSonGuncelleme"),
        dataIndex: "degistirmeTarih",
        key: "degistirmeTarih",
        width: 180,
        sorter: (firstRole, secondRole) => getChangedAtSortValue(firstRole.degistirmeTarih) - getChangedAtSortValue(secondRole.degistirmeTarih),
        render: formatChangedAt,
      },
    ],
    [openUpdateModal, t]
  );

  const clearFilters = () => {
    setSearchValue("");
    setStatusFilter(ALL_FILTER_VALUE);
    setManagerFilter(ALL_FILTER_VALUE);
  };

  return (
    <section className="role-definitions-page">
      <header className="role-definitions-header">
        <div>
          <h1>{t("rolTanimlari")}</h1>
          <p>{t("rolTanimlariAltBaslik")}</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setRoleModal({ open: true, role: null })}>
          {t("rolYeniRol")}
        </Button>
      </header>

      <div className="role-definitions-toolbar">
        <Input
          allowClear
          className="role-definitions-search"
          prefix={<SearchOutlined />}
          placeholder={t("rolAraPlaceholder")}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <div className="role-definitions-filters">
          <Select
            aria-label={t("rolDurumFiltresi")}
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: ALL_FILTER_VALUE, label: `${t("durum")}: ${t("tumu")}` },
              { value: "active", label: `${t("durum")}: ${t("rolDurumAktif")}` },
              { value: "passive", label: `${t("durum")}: ${t("rolDurumPasif")}` },
            ]}
          />
          <Select
            aria-label={t("rolYoneticiFiltresi")}
            value={managerFilter}
            onChange={setManagerFilter}
            options={[
              { value: ALL_FILTER_VALUE, label: `${t("rolYonetici")}: ${t("tumu")}` },
              { value: "manager", label: `${t("rolYonetici")}: ${t("rolYoneticiEvet")}` },
              { value: "standard", label: `${t("rolYonetici")}: ${t("rolYoneticiHayir")}` },
            ]}
          />
          <Button type="link" onClick={clearFilters}>
            {t("rolFiltreleriTemizle")}
          </Button>
        </div>
      </div>

      <div className="role-definitions-table-card">
        {loadError && <Alert className="role-definitions-alert" type="error" showIcon message={t("rolListesiYuklenemedi")} />}
        <Table
          columns={columns}
          dataSource={filteredRoles}
          loading={loading}
          locale={{ emptyText: t("rolKaydiBulunamadi") }}
          rowKey={(record) => record.siraNo ?? `${record.roleKodu}-${record.roleAdi}`}
          scroll={{ x: 1160 }}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,
            showTotal: (total) => t("rolListeleniyor", { count: total }),
          }}
        />
      </div>

      <RoleFormModal
        open={roleModal.open}
        role={roleModal.role}
        onClose={() => setRoleModal({ open: false, role: null })}
        onSaved={() => {
          setRoleModal({ open: false, role: null });
          setRefreshKey((currentKey) => currentKey + 1);
        }}
      />
    </section>
  );
}
