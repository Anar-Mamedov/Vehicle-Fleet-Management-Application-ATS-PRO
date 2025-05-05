import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { ConfigProvider, TimePicker } from "antd";

dayjs.locale("tr");

const ClockInput = ({ name, checked, readonly, required }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <ConfigProvider locale={tr_TR}>
            <TimePicker
              {...field}
              placeholder=""
              className={fieldState.error ? "input-error" : ""}
              disabled={checked}
              readOnly={readonly}
              format="HH:mm"
              style={{ height: "30px", fontSize: "16px", width: "100%" }}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          </ConfigProvider>
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

ClockInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
};

export default ClockInput;