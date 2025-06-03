import React from "react";
import { Select } from "antd";
import { t } from "i18next";

function Status({ value, onSubmit }) {
  const options = [
    { value: 0, label: t("tumu") },
    { value: 1, label: t("aktif") },
    { value: 2, label: t("pasif") },
  ];

  const handleChange = (selectedValue) => {
    if (onSubmit) {
      onSubmit(selectedValue);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Select value={value} defaultValue={1} onChange={handleChange} placeholder={t("secimYapiniz")} options={options} style={{ width: "100%" }} />
    </div>
  );
}

export default Status;
