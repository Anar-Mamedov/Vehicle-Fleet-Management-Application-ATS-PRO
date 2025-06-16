import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { InputNumber } from "antd";

const NumberInput = ({ name, checked, required, placeholder = "", style, min, max, useThousandsSeparator = true }) => {
  const { control, setValue } = useFormContext();
  const [decimalSeparator, setDecimalSeparator] = useState(".");
  const [thousandsSeparator, setThousandsSeparator] = useState(",");

  useEffect(() => {
    const userLanguage = localStorage.getItem("i18nextLng") || "en";
    // Set decimal separator based on language
    // Comma for Turkish, Azerbaijani and Russian, dot for English
    if (["tr", "az", "ru"].includes(userLanguage)) {
      setDecimalSeparator(",");
      setThousandsSeparator(".");
    } else {
      setDecimalSeparator(".");
      setThousandsSeparator(",");
    }
  }, []);

  // Formatter function for thousands separator
  const formatter = (value) => {
    if (!useThousandsSeparator || !value) return value;

    // Convert to string and handle decimal part
    const stringValue = value.toString();
    const parts = stringValue.split(".");

    // Add thousands separator to integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    // Join with the correct decimal separator
    return parts.length > 1 ? parts[0] + decimalSeparator + parts[1] : parts[0];
  };

  // Parser function to remove thousands separator but keep decimal separator
  const parser = (value) => {
    if (!useThousandsSeparator || !value) return value;

    // Remove thousands separator and convert decimal separator to dot for processing
    let parsedValue = value.toString().replace(new RegExp(`\\${thousandsSeparator}`, "g"), "");

    // If decimal separator is comma, convert it to dot for internal processing
    if (decimalSeparator === ",") {
      parsedValue = parsedValue.replace(",", ".");
    }

    return parsedValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <InputNumber
            {...field}
            {...(min !== undefined && min !== null && { min })}
            {...(max !== undefined && max !== null && { max })}
            placeholder={placeholder}
            className={fieldState.error ? "input-error w-full" : "w-full"}
            disabled={checked}
            style={{
              ...style,
            }}
            decimalSeparator={decimalSeparator}
            formatter={useThousandsSeparator ? formatter : undefined}
            parser={useThousandsSeparator ? parser : undefined}
            onChange={(e) => {
              field.onChange(e);
              if (e === null) {
                setValue(name, 0);
              }
            }}
          />
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

NumberInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  useThousandsSeparator: PropTypes.bool,
};

export default NumberInput;
