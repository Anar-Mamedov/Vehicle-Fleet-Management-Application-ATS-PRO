import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { TimePicker } from "antd";
import { t } from "i18next";

const TimeInput = ({ name, readonly, required, requiredMessage, style, placeholder = "", disabledTime }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? requiredMessage || t("alanBosBirakilamaz") : false }}
      render={({ field, fieldState }) => (
        <>
          <TimePicker
            {...field}
            changeOnScroll
            needConfirm={false}
            placeholder={placeholder}
            format="HH:mm"
            disabledTime={disabledTime}
            disabled={readonly}
            className={fieldState.error ? "input-error" : undefined}
            style={{
              ...style,
            }}
          />
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

TimeInput.propTypes = {
  name: PropTypes.string,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  requiredMessage: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  disabledTime: PropTypes.func,
};

export default TimeInput;
