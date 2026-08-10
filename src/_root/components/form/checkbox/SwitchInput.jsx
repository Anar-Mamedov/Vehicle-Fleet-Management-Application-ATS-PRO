import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Switch } from "antd";

// Diğer form alanlarıyla aynı satır yüksekliğinde dursun diye 32px'lik bir kapsayıcı içinde hizalanır
const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  height: "32px",
};

const SwitchInput = ({ name, checked, checkedLabel, uncheckedLabel }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div style={wrapperStyle}>
          <Switch {...field} disabled={checked} checked={!!field.value} onChange={(value) => field.onChange(value)} />
          {(checkedLabel || uncheckedLabel) && <span>{field.value ? checkedLabel : uncheckedLabel}</span>}
        </div>
      )}
    />
  );
};

SwitchInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  checkedLabel: PropTypes.string,
  uncheckedLabel: PropTypes.string,
};

export default SwitchInput;
