import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Tag } from "antd";

const UNCHECKED_BORDER_COLOR = "#d9d9d9";

const tagStyle = {
  minWidth: "48px",
  margin: 0,
  padding: "4px 10px",
  textAlign: "center",
  border: "1px solid transparent",
  borderRadius: "6px",
};

// Birden fazla sabit seçeneğin buton görünümünde aç/kapa yapıldığı global alan (ör. çalışma günleri).
// Form değeri seçili seçeneklerin value dizisidir.
const CheckableTagGroupInput = ({ name, options = [], readonly }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : [];

        const handleChange = (optionValue, checked) => {
          if (readonly) return;

          const nextValues = checked ? [...selectedValues, optionValue] : selectedValues.filter((value) => value !== optionValue);
          // Seçim sırası değil, seçeneklerin tanım sırası korunur
          field.onChange(options.map((option) => option.value).filter((value) => nextValues.includes(value)));
        };

        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", opacity: readonly ? 0.6 : 1 }}>
            {options.map((option) => {
              const checked = selectedValues.includes(option.value);

              return (
                <Tag.CheckableTag
                  key={option.value}
                  checked={checked}
                  onChange={(nextChecked) => handleChange(option.value, nextChecked)}
                  style={{ ...tagStyle, borderColor: checked ? "transparent" : UNCHECKED_BORDER_COLOR, cursor: readonly ? "not-allowed" : "pointer" }}
                >
                  {option.label}
                </Tag.CheckableTag>
              );
            })}
          </div>
        );
      }}
    />
  );
};

CheckableTagGroupInput.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  readonly: PropTypes.bool,
};

export default CheckableTagGroupInput;
