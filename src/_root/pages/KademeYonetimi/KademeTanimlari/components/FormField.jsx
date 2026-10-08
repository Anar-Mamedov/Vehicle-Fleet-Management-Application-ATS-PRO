import React from "react";
import PropTypes from "prop-types";
import { hintStyle, labelStyle } from "./uiStyles";

// Etiket + alan (+ isteğe bağlı açıklama) ikilisi tüm satırlarda aynı hizada dursun diye tek yerden üretilir
const FormField = ({ span, label, required, hint, children }) => (
  <div className={`col-span-${span}`}>
    <div className="flex flex-col gap-1">
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#ff4d4f" }}> *</span>}
      </label>
      {children}
      {hint && <span style={hintStyle}>{hint}</span>}
    </div>
  </div>
);

FormField.propTypes = {
  span: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  hint: PropTypes.string,
  children: PropTypes.node,
};

export default FormField;
