import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";

// Sabit (API'den gelmeyen) seçenek listeleri için global çoklu seçim bileşeni.
// Form alanına seçilen değerlerin dizisi yazılır; seçim yoksa boş dizi tutulur.
const MultiSelectInput = ({ name, options = [], style, placeholder = "", onChange }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          mode="multiple"
          className="w-full"
          options={options}
          placeholder={placeholder}
          allowClear
          maxTagCount="responsive"
          optionFilterProp="label"
          style={{
            ...style,
          }}
          value={field.value ?? []}
          onChange={(values) => {
            const selectedValues = values ?? [];
            field.onChange(selectedValues);
            if (onChange) {
              onChange(selectedValues);
            }
          }}
        />
      )}
    />
  );
};

MultiSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  style: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default MultiSelectInput;
