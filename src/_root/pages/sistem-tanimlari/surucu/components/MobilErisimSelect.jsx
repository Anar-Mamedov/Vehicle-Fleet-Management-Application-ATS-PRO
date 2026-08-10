import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { t } from "i18next";

// Sürücünün mobil uygulamaya erişimi API tarafında boolean tutulur: true = Açık, false = Kapalı
const MobilErisimSelect = ({ name, checked }) => {
  const { control } = useFormContext();

  const options = [
    { value: true, label: t("acik") },
    { value: false, label: t("kapali") },
  ];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} className="w-full" disabled={checked} options={options} value={field.value ?? false} onChange={(value) => field.onChange(value)} />
      )}
    />
  );
};

MobilErisimSelect.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
};

export default MobilErisimSelect;
