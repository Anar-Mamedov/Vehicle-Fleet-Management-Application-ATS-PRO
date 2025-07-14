import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

const CheckboxInput = ({ name, checked }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Checkbox {...field} style={{ width: 16 }} disabled={checked} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
    />
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
};

export default CheckboxInput;
