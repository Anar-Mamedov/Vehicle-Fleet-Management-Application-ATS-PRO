import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { InputNumber } from "antd";

const NumberInput = ({ name, checked, required, placeholder = "", style, min, max }) => {
  const { control, setValue } = useFormContext();
  const [decimalSeparator, setDecimalSeparator] = useState(".");

  useEffect(() => {
    const userLanguage = localStorage.getItem("i18nextLng") || "en";
    // Set decimal separator based on language
    // Comma for Turkish, Azerbaijani and Russian, dot for English
    if (["tr", "az", "ru"].includes(userLanguage)) {
      setDecimalSeparator(",");
    } else {
      setDecimalSeparator(".");
    }
  }, []);

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
};

export default NumberInput;
