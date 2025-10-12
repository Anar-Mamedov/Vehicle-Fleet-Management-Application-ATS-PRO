import React from "react";
import { Select } from "antd";
import { t } from "i18next";

function StatusSelect({ value, onChange }) {
  const options = [
    { value: 1, label: t("Bekliyor") },
    { value: 2, label: t("Devam Ediyor") },
    { value: 3, label: t("İptal Edildi") },
    { value: 4, label: t("Tamamlandı") },
  ];

  const handleChange = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <div style={{ width: "100%" }}>
      <Select value={value} onChange={handleChange} placeholder={t("secimYapiniz")} options={options} style={{ width: "100%" }} />
    </div>
  );
}

export default StatusSelect;
