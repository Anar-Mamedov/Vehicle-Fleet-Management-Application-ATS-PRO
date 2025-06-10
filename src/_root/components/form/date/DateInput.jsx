import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { ConfigProvider, DatePicker } from "antd";

dayjs.locale("tr");

const DateInput = ({ name, checked, readonly, required, style, placeholder = "" }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <ConfigProvider locale={tr_TR}>
            <DatePicker
              {...field}
              placeholder={placeholder}
              className={fieldState.error ? "input-error" : ""}
              disabled={checked}
              style={{
                ...style,
              }}
              readOnly={readonly}
              locale={dayjs.locale("tr")}
              format="DD.MM.YYYY"
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          </ConfigProvider>
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

DateInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
};

export default DateInput;
