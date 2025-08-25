import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { InputNumber } from "antd";
import i18next from "i18next";

const NumberInput = ({ name, checked, required, placeholder = "", style, min, max, useThousandsSeparator = true }) => {
  const { control, setValue } = useFormContext();
  const [decimalSeparator, setDecimalSeparator] = useState(".");
  const [thousandsSeparator, setThousandsSeparator] = useState(",");

  useEffect(() => {
    const applyLocaleSeparators = (locale) => {
      const parts = new Intl.NumberFormat(locale).formatToParts(1000.5);
      const group = parts.find((p) => p.type === "group")?.value || ",";
      const decimal = parts.find((p) => p.type === "decimal")?.value || ".";
      setDecimalSeparator(decimal);
      setThousandsSeparator(group);
    };

    const currentLang = i18next.language || localStorage.getItem("i18nextLng") || "tr";
    applyLocaleSeparators(currentLang);

    const handleLanguageChanged = (lng) => {
      applyLocaleSeparators(lng);
    };

    i18next.on("languageChanged", handleLanguageChanged);
    return () => {
      i18next.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  // Formatter function for thousands separator
  const formatter = (value) => {
    if (!useThousandsSeparator || !value) return value;

    // Convert to string and handle decimal part
    const stringValue = value.toString();
    const parts = stringValue.split(".");

    // Add thousands separator to integer part without regex (linear-time)
    const insertThousandsSeparator = (digits, sep) => {
      if (!digits) return digits;
      const isNegative = digits.startsWith("-");
      const pureDigits = isNegative ? digits.slice(1) : digits;

      let grouped = "";
      let countFromRight = 0;
      for (let i = pureDigits.length - 1; i >= 0; i -= 1) {
        const char = pureDigits[i];
        grouped = char + grouped;
        countFromRight += 1;
        if (countFromRight === 3 && i > 0) {
          grouped = sep + grouped;
          countFromRight = 0;
        }
      }

      return isNegative ? `-${grouped}` : grouped;
    };

    parts[0] = insertThousandsSeparator(parts[0], thousandsSeparator);

    // Join with the correct decimal separator
    return parts.length > 1 ? parts[0] + decimalSeparator + parts[1] : parts[0];
  };

  // Parser function to remove thousands separator but keep decimal separator
  const parser = (value) => {
    if (!useThousandsSeparator || !value) return value;

    // Remove thousands separator and convert decimal separator to dot for processing
    let parsedValue = value.toString().split(thousandsSeparator).join("");

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
