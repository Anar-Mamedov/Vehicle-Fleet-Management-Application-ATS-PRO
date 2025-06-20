import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { DatePicker } from "antd";

const DatePickerSelectYear = ({ name, checked, required, placeholder = "", style }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <DatePicker
            {...field}
            picker="year"
            placeholder={placeholder}
            className={fieldState.error ? "input-error w-full" : "w-full"}
            disabled={checked}
            style={{
              ...style,
            }}
            onChange={(date) => {
              field.onChange(date);
            }}
          />
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

DatePickerSelectYear.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

export default DatePickerSelectYear;
