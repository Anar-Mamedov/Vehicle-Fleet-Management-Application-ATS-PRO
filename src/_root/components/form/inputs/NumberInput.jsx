import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { InputNumber, Typography } from "antd";
import i18next from "i18next";
import AxiosInstance from "../../../../api/http";

const { Text } = Typography;

const NumberInput = ({
  name,
  checked,
  required,
  placeholder = "",
  style,
  min,
  max,
  useThousandsSeparator = true,
  formatSection,
  formatType,
  prefix = false,
  onChange,
  onFocus,
  onBlur,
}) => {
  const { control, setValue, watch } = useFormContext();
  const [decimalSeparator, setDecimalSeparator] = useState(".");
  const [thousandsSeparator, setThousandsSeparator] = useState(",");
  const [precision, setPrecision] = useState(undefined);
  const fieldValue = watch(name);
  const [isFocused, setIsFocused] = useState(false);

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

  // Fetch format settings based on formatSection and formatType
  useEffect(() => {
    if (!formatSection || !formatType) {
      setPrecision(undefined);
      return;
    }

    let endpoint = "";
    let formatFieldName = "";

    if (formatSection === "yakit") {
      endpoint = "CommonSettings/GetSettingByType?type=4";
      if (formatType === "miktar") {
        formatFieldName = "yakitMiktarFormat";
      } else if (formatType === "ortalama") {
        formatFieldName = "yakitOrtalamaFormat";
      } else if (formatType === "tutar") {
        formatFieldName = "yakitTutarFormat";
      }
    } else if (formatSection === "stok") {
      endpoint = "CommonSettings/GetSettingByType?type=3";
      if (formatType === "miktar") {
        formatFieldName = "stokMiktarFormat";
      } else if (formatType === "tutar") {
        formatFieldName = "stokTutarFormat";
      } else if (formatType === "ortalama") {
        formatFieldName = "stokOrtalamaFormat";
      }
    }

    if (!endpoint || !formatFieldName) {
      setPrecision(undefined);
      return;
    }

    let isActive = true;

    AxiosInstance.get(endpoint)
      .then((response) => {
        if (!isActive) return;
        const formatValue = response?.data?.[formatFieldName];
        if (formatValue !== undefined && formatValue !== null) {
          const parsedValue = parseInt(formatValue, 10);
          setPrecision(isNaN(parsedValue) ? undefined : parsedValue);
        } else {
          setPrecision(undefined);
        }
      })
      .catch(() => {
        if (!isActive) return;
        setPrecision(undefined);
      });

    return () => {
      isActive = false;
    };
  }, [formatSection, formatType]);

  // Apply precision formatting when field value changes
  useEffect(() => {
    if (isFocused) return;
    if (precision === undefined || fieldValue === undefined || fieldValue === null) return;

    const currentValue = typeof fieldValue === "number" ? fieldValue : parseFloat(fieldValue);
    if (isNaN(currentValue)) return;

    // Round the value to the specified precision
    const factor = Math.pow(10, precision);
    const roundedValue = Math.round(currentValue * factor) / factor;

    // Only update if the rounded value is different from current value
    if (roundedValue !== currentValue) {
      setValue(name, roundedValue, { shouldValidate: false, shouldDirty: false });
    }
  }, [fieldValue, precision, name, setValue, isFocused]);

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
    if (value === undefined || value === null) return value;

    let parsedValue = value.toString();

    if (useThousandsSeparator && thousandsSeparator) {
      parsedValue = parsedValue.split(thousandsSeparator).join("");
    }

    if (decimalSeparator && decimalSeparator !== ".") {
      parsedValue = parsedValue.replace(decimalSeparator, ".");
    }

    if (precision !== undefined && precision !== null) {
      const dotIndex = parsedValue.indexOf(".");
      if (dotIndex !== -1) {
        const fractional = parsedValue.slice(dotIndex + 1);
        if (fractional.length > precision) {
          parsedValue = `${parsedValue.slice(0, dotIndex + 1)}${fractional.slice(0, precision)}`;
        }
      }
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
            {...(precision !== undefined && { precision })}
            {...(prefix && { prefix: <Text style={{ color: "#0091ff" }}>%</Text> })}
            placeholder={placeholder}
            className={fieldState.error ? "input-error w-full" : "w-full"}
            disabled={checked}
            style={{
              ...style,
            }}
            decimalSeparator={decimalSeparator}
            formatter={useThousandsSeparator ? formatter : undefined}
            parser={useThousandsSeparator ? parser : undefined}
            onFocus={(event) => {
              setIsFocused(true);
              if (typeof onFocus === "function") {
                onFocus(event);
              }
            }}
            onBlur={(event) => {
              setIsFocused(false);
              if (typeof onBlur === "function") {
                onBlur(event);
              }
            }}
            onChange={(e) => {
              field.onChange(e);
              if (e === null) {
                setValue(name, 0);
              }
              if (typeof onChange === "function") {
                onChange(e);
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
  formatSection: PropTypes.oneOf(["yakit", "stok"]),
  formatType: PropTypes.oneOf(["miktar", "ortalama", "tutar"]),
  prefix: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default NumberInput;
