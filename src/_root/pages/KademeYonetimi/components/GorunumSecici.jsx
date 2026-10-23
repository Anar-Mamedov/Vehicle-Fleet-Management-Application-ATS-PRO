import React from "react";
import PropTypes from "prop-types";
import { Segmented } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { t } from "i18next";

export const GORUNUM = {
  LISTE: "liste",
  KART: "kart",
};

// Seçilen görünüm modüle özel anahtarla saklanır; bilinmeyen değer liste görünümüne düşer
export const getStoredGorunum = (storageKey) => (localStorage.getItem(storageKey) === GORUNUM.KART ? GORUNUM.KART : GORUNUM.LISTE);

// Takip panellerinde liste (tablo) ile kart görünümü arasında geçiş
const GorunumSecici = ({ value, onChange }) => (
  <Segmented
    value={value}
    onChange={onChange}
    options={[
      { value: GORUNUM.LISTE, icon: <UnorderedListOutlined />, title: t("listeGorunumu") },
      { value: GORUNUM.KART, icon: <AppstoreOutlined />, title: t("kartGorunumu") },
    ]}
  />
);

GorunumSecici.propTypes = {
  value: PropTypes.oneOf(Object.values(GORUNUM)).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GorunumSecici;
