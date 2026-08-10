import React from "react";
import PropTypes from "prop-types";
import { labelStyle } from "./uiStyles";

// Etiket + alan ikilisi tüm satırlarda aynı hizada dursun diye tek yerden üretilir
const FormField = ({ span, label, required, disabled, children }) => (
  <div className={`col-span-${span}`}>
    <div className="flex flex-col gap-1">
      <label style={{ ...labelStyle, color: disabled ? "#bfbfbf" : labelStyle.color }}>
        {label}
        {required && <span style={{ color: "#ff4d4f" }}> *</span>}
      </label>
      {children}
    </div>
  </div>
);

FormField.propTypes = {
  span: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default FormField;
