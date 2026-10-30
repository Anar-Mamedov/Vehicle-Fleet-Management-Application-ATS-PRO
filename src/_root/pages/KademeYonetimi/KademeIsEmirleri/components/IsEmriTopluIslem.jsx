import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown } from "antd";
import { AppstoreOutlined, DownOutlined, LockOutlined, StopOutlined, UndoOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { DURUM_ISLEMI } from "../constants";
import { isKayitSaltOkunur } from "../durumIslemleri/durumIslemHelpers";

// Listede seçili iş emirlerinin durum işlemleri.
// Kapatma ve iptal seçili kayıtların hepsi açıkken, yeniden açma hepsi kapalı/iptal iken kullanılabilir.
const IsEmriTopluIslem = ({ seciliKayitlar, onIslemSec }) => {
  const saltOkunurSayisi = seciliKayitlar.filter(isKayitSaltOkunur).length;
  const hepsiAcik = saltOkunurSayisi === 0;
  const hepsiKapali = seciliKayitlar.length > 0 && saltOkunurSayisi === seciliKayitlar.length;

  const menu = {
    items: [
      { key: DURUM_ISLEMI.KAPAT, label: t("isEmriniKapat"), icon: <LockOutlined />, disabled: !hepsiAcik },
      { key: DURUM_ISLEMI.IPTAL_ET, label: t("isEmriniIptalEt"), icon: <StopOutlined />, danger: true, disabled: !hepsiAcik },
      { key: DURUM_ISLEMI.YENIDEN_AC, label: t("isEmriniYenidenAc"), icon: <UndoOutlined />, disabled: !hepsiKapali },
    ],
    onClick: ({ key }) => onIslemSec(Number(key)),
  };

  return (
    <Dropdown menu={menu} disabled={seciliKayitlar.length === 0} trigger={["click"]}>
      <Button icon={<AppstoreOutlined />}>
        {t("topluIslem")} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

IsEmriTopluIslem.propTypes = {
  seciliKayitlar: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIslemSec: PropTypes.func.isRequired,
};

export default IsEmriTopluIslem;
