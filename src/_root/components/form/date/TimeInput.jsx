import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { TimePicker } from "antd";

const TimeInput = ({ name, readonly, style, placeholder = "" }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TimePicker
          {...field}
          changeOnScroll
          needConfirm={false}
          placeholder={placeholder}
          format="HH:mm"
          disabled={readonly}
          style={{
            ...style,
          }}
        />
      )}
    />
  );
};

TimeInput.propTypes = {
  name: PropTypes.string,
  readonly: PropTypes.bool,
};

export default TimeInput;
