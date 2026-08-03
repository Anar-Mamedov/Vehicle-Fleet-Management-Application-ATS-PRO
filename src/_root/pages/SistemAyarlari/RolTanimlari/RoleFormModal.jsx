import React, { useEffect, useMemo, useState } from "react";
import { AppstoreOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Modal, Spin, Switch, message } from "antd";
import PropTypes from "prop-types";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GetClientModulesService } from "../../../../api/services/clientInfo/services";
import { GetRoleAuthItemsService, UpsertRoleService } from "../../../../api/services/roles/services";
import { buildRolePayload, createRolePermissionState, getVisibleRolePermissionGroups, updatePermission, updatePermissionGroup } from "./rolePermissions";
import RoleCodeInput from "./RoleCodeInput";
import RoleUsersTab from "./RoleUsersTab";

const DEFAULT_VALUES = {
  roleAdi: "",
  roleKodu: "",
  aciklama: "",
  durum: true,
  yonetici: false,
  varsayilan: false,
};

const MODULE_TRANSLATION_KEYS = {
  arac: "araclar",
  bakimServis: "bakim&ServisYonetimi",
  depoTanimlari: "malzemeDepoTanimlari",
  hgsGecisIslemleri: "hgs&gecisIslemleri",
  malzemeAnalizi: "malzemeTuketimAnalizi",
  maliyetAnalizi: "maliyetAnalizleri",
  markaModeller: "markaModelTanimlari",
  performansAnalizi: "performansAnalizleri",
  stokMalzeme: "stok&malzemeYonetimi",
  yakitAnalizi: "yakitTuketimAnalizleri",
};

const PERMISSION_TRANSLATION_KEYS = {
  goruntule: "rolYetkiGoruntule",
  ekle: "rolYetkiEkle",
  degistir: "rolYetkiDegistir",
  sil: "rolYetkiSil",
};

const ROLE_TABS = {
  permissions: "permissions",
  users: "users",
};

const humanizeModuleName = (value) =>
  String(value ?? "")
    .replace(/([a-zçğıöşü])([A-ZÇĞİÖŞÜ])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toLocaleUpperCase("tr-TR"));

const getResponseList = (response) => {
  const responseData = response?.data;
  return Array.isArray(responseData) ? responseData : responseData?.list;
};

const isSuccessfulResponse = (response) => {
  const statusCode = Number(response?.data?.statusCode);
  return !statusCode || [200, 201, 202].includes(statusCode);
};

export default function RoleFormModal({ open, role, onClose, onSaved }) {
  const { t } = useTranslation();
  const methods = useForm({ defaultValues: DEFAULT_VALUES });
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [preservedAuths, setPreservedAuths] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [permissionsError, setPermissionsError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(ROLE_TABS.permissions);
  const roleId = Number(role?.siraNo) || 0;
  const isUpdate = Boolean(roleId);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    let ignore = false;
    reset({
      roleAdi: role?.roleAdi ?? "",
      roleKodu: role?.roleKodu ?? "",
      aciklama: role?.aciklama ?? "",
      durum: role?.durum ?? true,
      yonetici: role?.yonetici ?? false,
      varsayilan: role?.varsayilan ?? false,
    });
    setPermissionGroups([]);
    setPreservedAuths([]);
    setPermissionsError(false);
    setPermissionsLoading(true);
    setActiveTab(ROLE_TABS.permissions);

    const roleAuthRequest = roleId ? GetRoleAuthItemsService(roleId) : Promise.resolve({ data: [] });

    Promise.all([GetClientModulesService(), roleAuthRequest])
      .then(([modulesResponse, roleAuthResponse]) => {
        if (ignore) {
          return;
        }

        const modules = getResponseList(modulesResponse);
        const roleAuths = getResponseList(roleAuthResponse);
        const permissionState = createRolePermissionState(Array.isArray(modules) ? modules : [], Array.isArray(roleAuths) ? roleAuths : []);
        setPermissionGroups(permissionState.groups);
        setPreservedAuths(permissionState.preservedAuths);
      })
      .catch(() => {
        if (!ignore) {
          setPermissionsError(true);
        }
      })
      .finally(() => {
        if (!ignore) {
          setPermissionsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [open, reset, role, roleId]);

  const modalTitle = useMemo(() => {
    if (isUpdate) {
      return t("rolGuncellemeBaslik", { roleName: role.roleAdi || t("rolTanimlari") });
    }

    return t("rolYeniRolBaslik");
  }, [isUpdate, role, t]);

  const visiblePermissionGroups = useMemo(() => getVisibleRolePermissionGroups(permissionGroups), [permissionGroups]);

  const getModuleLabel = (menuAdi) => {
    if (menuAdi === "rolDigerModuller") {
      return t("rolDigerModuller");
    }

    const translationKey = MODULE_TRANSLATION_KEYS[menuAdi] ?? menuAdi;
    return t(translationKey, { defaultValue: humanizeModuleName(menuAdi) });
  };

  const getGroupLabel = (menuAdi) => t(menuAdi, { defaultValue: humanizeModuleName(menuAdi) });

  const onSubmit = handleSubmit(async (values) => {
    if (permissionsLoading || permissionsError || permissionGroups.length === 0) {
      return;
    }

    setSaving(true);

    try {
      const roleId = Number(role?.siraNo) || 0;
      const response = await UpsertRoleService(buildRolePayload(values, roleId, permissionGroups, preservedAuths));

      if (!isSuccessfulResponse(response)) {
        throw new Error("ROLE_UPSERT_FAILED");
      }

      message.success(t("rolKaydedildi"));
      onSaved();
    } catch {
      message.error(t("rolKaydedilemedi"));
    } finally {
      setSaving(false);
    }
  });

  const saveDisabled = permissionsLoading || permissionsError || permissionGroups.length === 0;

  return (
    <FormProvider {...methods}>
      <Modal
        className="role-form-modal"
        footer={
          <div className="role-form-footer">
            <Button onClick={onClose}>{t("rolVazgec")}</Button>
            <Button type="primary" htmlType="submit" form="role-upsert-form" loading={saving} disabled={saveDisabled}>
              {t("rolKaydet")}
            </Button>
          </div>
        }
        maskClosable={false}
        onCancel={onClose}
        open={open}
        title={
          <div className="role-form-title">
            <strong>{modalTitle}</strong>
            <span>{t(isUpdate ? "rolGuncellemeAltBaslik" : "rolEklemeAltBaslik")}</span>
          </div>
        }
        width={1280}
      >
        <form id="role-upsert-form" onSubmit={onSubmit}>
          <div className="role-form-general">
            <div className="role-form-fields">
              <div className="role-form-field-grid">
                <Form.Item colon={false} label={t("rolAdi")} validateStatus={errors.roleAdi ? "error" : ""} help={errors.roleAdi?.message}>
                  <Controller
                    name="roleAdi"
                    control={control}
                    rules={{ required: t("rolAdiZorunlu") }}
                    render={({ field }) => <Input {...field} placeholder={t("rolAdiPlaceholder")} />}
                  />
                </Form.Item>
                <RoleCodeInput initialValue={role?.roleKodu ?? ""} open={open} />
              </div>
              <Form.Item colon={false} label={t("aciklama")}>
                <Controller
                  name="aciklama"
                  control={control}
                  render={({ field }) => <Input.TextArea {...field} autoSize={{ minRows: 2, maxRows: 4 }} placeholder={t("rolAciklamaPlaceholder")} />}
                />
              </Form.Item>
            </div>

            <div className="role-form-switches">
              <Controller
                name="durum"
                control={control}
                render={({ field }) => (
                  <label className="role-form-switch-row">
                    <span>{t("rolAktif")}</span>
                    <Switch checked={Boolean(field.value)} onChange={field.onChange} />
                  </label>
                )}
              />
              <Controller
                name="yonetici"
                control={control}
                render={({ field }) => (
                  <label className="role-form-switch-row">
                    <span className="role-form-switch-label">
                      {t("rolYoneticiRolu")}
                      <InfoCircleOutlined />
                    </span>
                    <Switch checked={Boolean(field.value)} onChange={field.onChange} />
                  </label>
                )}
              />
              <Controller
                name="varsayilan"
                control={control}
                render={({ field }) => (
                  <label className="role-form-switch-row">
                    <span>{t("rolVarsayilanRolu")}</span>
                    <Switch checked={Boolean(field.value)} onChange={field.onChange} />
                  </label>
                )}
              />
            </div>
          </div>

          <div aria-label={t("rolTanimlari")} className="role-form-tabs" role="tablist">
            <button
              aria-selected={activeTab === ROLE_TABS.permissions}
              className={`role-form-tab${activeTab === ROLE_TABS.permissions ? " role-form-tab--active" : ""}`}
              onClick={() => setActiveTab(ROLE_TABS.permissions)}
              role="tab"
              type="button"
            >
              {t("rolYetkiler")}
            </button>
            {isUpdate && (
              <button
                aria-selected={activeTab === ROLE_TABS.users}
                className={`role-form-tab${activeTab === ROLE_TABS.users ? " role-form-tab--active" : ""}`}
                onClick={() => setActiveTab(ROLE_TABS.users)}
                role="tab"
                type="button"
              >
                {t("rolKullanicilar")}
              </button>
            )}
          </div>

          {activeTab === ROLE_TABS.permissions && (
            <section className="role-permissions-section" role="tabpanel">
              <div className="role-permissions-heading">
                <h2>{t("rolYetkiler")}</h2>
                <p>{t("rolYetkilerAciklama")}</p>
              </div>

              {permissionsError && <Alert showIcon type="error" message={t("rolYetkileriYuklenemedi")} />}
              {!permissionsError && !permissionsLoading && permissionGroups.length === 0 && <Alert showIcon type="warning" message={t("rolYetkiKaydiBulunamadi")} />}

              <Spin spinning={permissionsLoading}>
                <div className="role-permissions-table-wrap">
                  <table className="role-permissions-table">
                    <thead>
                      <tr>
                        <th>{t("rolEkranModul")}</th>
                        <th>{t("rolYetkiGoruntule")}</th>
                        <th>{t("rolYetkiEkle")}</th>
                        <th>{t("rolYetkiDegistir")}</th>
                        <th>{t("rolYetkiSil")}</th>
                      </tr>
                    </thead>
                    {visiblePermissionGroups.map((group) => (
                      <tbody key={group.key}>
                        <tr className="role-permissions-group-row">
                          <th colSpan={5} scope="rowgroup">
                            <div className="role-permissions-group-content">
                              <span>{getGroupLabel(group.menuAdi)}</span>
                              <span className="role-permissions-group-actions">
                                <Button type="link" onClick={() => setPermissionGroups((groups) => updatePermissionGroup(groups, group.key, "all"))}>
                                  {t("rolTumunuSec")}
                                </Button>
                                <Button type="link" onClick={() => setPermissionGroups((groups) => updatePermissionGroup(groups, group.key, "view"))}>
                                  {t("rolSadeceGoruntule")}
                                </Button>
                                <Button type="link" onClick={() => setPermissionGroups((groups) => updatePermissionGroup(groups, group.key, "clear"))}>
                                  {t("rolYetkileriTemizle")}
                                </Button>
                              </span>
                            </div>
                          </th>
                        </tr>
                        {group.permissions.map((permission) => {
                          const permissionLabel = getModuleLabel(permission.menuAdi);

                          return (
                            <tr key={permission.key}>
                              <td>
                                <span className="role-permission-name">
                                  <AppstoreOutlined />
                                  {permissionLabel}
                                </span>
                              </td>
                              {["goruntule", "ekle", "degistir", "sil"].map((permissionField) => (
                                <td key={permissionField}>
                                  <Checkbox
                                    aria-label={`${permissionLabel} - ${t(PERMISSION_TRANSLATION_KEYS[permissionField])}`}
                                    checked={permission[permissionField]}
                                    onChange={(event) => setPermissionGroups((groups) => updatePermission(groups, permission.key, permissionField, event.target.checked))}
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    ))}
                  </table>
                </div>
              </Spin>
            </section>
          )}

          {isUpdate && <RoleUsersTab key={roleId} active={activeTab === ROLE_TABS.users} roleId={roleId} />}
        </form>
      </Modal>
    </FormProvider>
  );
}

RoleFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  role: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};
