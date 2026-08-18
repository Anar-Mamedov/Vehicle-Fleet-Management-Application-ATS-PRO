import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";

// Sabit (API'den gelmeyen) seçenek listeleri için global select bileşeni.
// Ekrana özel Controller + Select blokları yerine her zaman bu bileşen kullanılır.
const SelectInput = ({ name, options = [], style, allowClear = true, showSearch = false, required, checked, placeholder = "" }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            className="w-full"
            options={options}
            placeholder={placeholder}
            allowClear={allowClear}
            showSearch={showSearch}
            optionFilterProp="label"
            status={fieldState.error ? "error" : undefined}
            disabled={checked}
            style={{
              ...style,
            }}
            value={field.value ?? undefined}
            onChange={(value) => {
              field.onChange(value ?? null);
            }}
          />
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

SelectInput.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  style: PropTypes.object,
  allowClear: PropTypes.bool,
  showSearch: PropTypes.bool,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SelectInput;
