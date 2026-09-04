import React from "react";
import { Select } from "antd";
import PropTypes from "prop-types";
import { t } from "i18next";

// Personel listesi filtresinde gönderilen status değerleri: 0 = Tümü, 1 = Aktif, 2 = Pasif
const DurumSelect = ({ value, onChange, inputWidth, dropdownWidth }) => {
  const options = [
    { value: 0, label: t("tumu") },
    { value: 1, label: t("aktif") },
    { value: 2, label: t("pasif") },
  ];

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={t("tumu")}
      style={{ width: inputWidth }}
      dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
      popupMatchSelectWidth={false}
    />
  );
};

DurumSelect.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  inputWidth: PropTypes.string,
  dropdownWidth: PropTypes.string,
};

export default DurumSelect;
