import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";

// Karayolları Trafik Yönetmeliği'ndeki sürücü belgesi sınıfları
const LICENCE_CLASSES = ["M", "A1", "A2", "A", "B1", "B", "BE", "C1", "C1E", "C", "CE", "D1", "D1E", "D", "DE", "F", "G"];

// API tarafında tek bir metin tutulduğu için sınıflar virgülle ayrılarak saklanır
const toList = (value) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const EhliyetSinifiSelect = ({ name, checked }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = toList(field.value);
        // Kayıtta listede olmayan bir sınıf varsa kaybolmasın diye seçeneklere eklenir
        const options = [...new Set([...LICENCE_CLASSES, ...selected])].map((item) => ({ label: item, value: item }));

        return (
          <Select
            mode="multiple"
            className="w-full"
            allowClear
            disabled={checked}
            options={options}
            value={selected}
            onChange={(values) => field.onChange(values.join(", "))}
            onBlur={field.onBlur}
          />
        );
      }}
    />
  );
};

EhliyetSinifiSelect.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
};

export default EhliyetSinifiSelect;
