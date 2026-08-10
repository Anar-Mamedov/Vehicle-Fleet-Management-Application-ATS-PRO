import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Input } from "antd";

const PasswordInput = ({ name, length, style, readonly, required, checked, placeholder = "" }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Input.Password
            {...field}
            value={field.value ?? ""}
            maxLength={length}
            placeholder={placeholder}
            style={{
              ...style,
            }}
            readOnly={readonly}
            disabled={checked}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string,
  length: PropTypes.number,
  style: PropTypes.object,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default PasswordInput;
