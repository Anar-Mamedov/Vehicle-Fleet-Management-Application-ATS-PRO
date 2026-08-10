import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";

// API tarafında düz metin tutulan alanlar için sabit seçenek listesi sunar.
// Kayıttaki değer listede yoksa kaybolmasın diye seçeneklere eklenir.
const StaticOptionSelect = ({ name, options, checked }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const allOptions = [...new Set([...options, ...(field.value ? [field.value] : [])])].map((item) => ({ label: item, value: item }));

        return (
          <Select
            className="w-full"
            showSearch
            allowClear
            disabled={checked}
            options={allOptions}
            value={field.value || undefined}
            onChange={(value) => field.onChange(value || null)}
            onBlur={field.onBlur}
          />
        );
      }}
    />
  );
};

StaticOptionSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  checked: PropTypes.bool,
};

export default StaticOptionSelect;
