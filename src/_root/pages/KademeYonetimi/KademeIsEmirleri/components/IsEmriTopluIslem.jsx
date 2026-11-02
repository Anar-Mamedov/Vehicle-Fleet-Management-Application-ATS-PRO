import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "antd";
import { LockOutlined, StopOutlined, UndoOutlined } from "@ant-design/icons";
import { t } from "i18next";
import TopluIslemButonu from "../../../../components/table/TopluIslemButonu";
import { DURUM_ISLEMI } from "../constants";
import { isKayitSaltOkunur } from "../durumIslemleri/durumIslemHelpers";

// Listede seçili iş emirlerinin durum işlemleri.
// Kapatma ve iptal seçili kayıtların hepsi açıkken, yeniden açma hepsi kapalı/iptal iken kullanılabilir.
// Seçim yokken menü açılır ama öğeleri pasif kalır.
const IsEmriTopluIslem = ({ seciliKayitlar, onIslemSec }) => {
  const seciliVar = seciliKayitlar.length > 0;
  const saltOkunurSayisi = seciliKayitlar.filter(isKayitSaltOkunur).length;
  const hepsiAcik = seciliVar && saltOkunurSayisi === 0;
  const hepsiKapali = seciliVar && saltOkunurSayisi === seciliKayitlar.length;

  const menu = {
    items: [
      { key: DURUM_ISLEMI.KAPAT, label: t("isEmriniKapat"), icon: <LockOutlined />, disabled: !hepsiAcik },
      { key: DURUM_ISLEMI.IPTAL_ET, label: t("isEmriniIptalEt"), icon: <StopOutlined />, danger: true, disabled: !hepsiAcik },
      { key: DURUM_ISLEMI.YENIDEN_AC, label: t("isEmriniYenidenAc"), icon: <UndoOutlined />, disabled: !hepsiKapali },
    ],
    onClick: ({ key }) => onIslemSec(Number(key)),
  };

  return (
    <Dropdown menu={menu} placement="bottom" trigger={["click"]}>
      <TopluIslemButonu seciliSayisi={seciliKayitlar.length} aria-label={t("topluIslem")} />
    </Dropdown>
  );
};

IsEmriTopluIslem.propTypes = {
  seciliKayitlar: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIslemSec: PropTypes.func.isRequired,
};

export default IsEmriTopluIslem;
