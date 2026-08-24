import React from "react";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";

const ACTIVE_COLOR = "#1677ff";
const DONE_COLOR = "#52c41a";
const IDLE_COLOR = "#8c8c8c";

const circleBaseStyle = {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: 600,
  flexShrink: 0,
};

// Tamamlanan adım yeşil onay, açık adım mavi dolgu, bekleyen adım gri çerçeve ile gösterilir
const getCircleStyle = (done, active) => {
  if (done) {
    return { ...circleBaseStyle, backgroundColor: "#f6ffed", border: `1px solid ${DONE_COLOR}`, color: DONE_COLOR };
  }

  if (active) {
    return { ...circleBaseStyle, backgroundColor: ACTIVE_COLOR, color: "white" };
  }

  return { ...circleBaseStyle, backgroundColor: "#f5f5f5", border: "1px solid #d9d9d9", color: IDLE_COLOR };
};

const getLabelStyle = (done, active) => ({
  fontSize: "13px",
  fontWeight: active ? 600 : 500,
  lineHeight: "18px",
  whiteSpace: "nowrap",
  color: active ? ACTIVE_COLOR : done ? "#141414" : IDLE_COLOR,
});

const AdimGostergesi = ({ steps, activeStep }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "24px", overflowX: "auto" }}>
    {steps.map((step) => {
      const done = step.no < activeStep;
      const active = step.no === activeStep;

      return (
        <div
          key={step.no}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 2px",
            borderBottom: `2px solid ${active ? ACTIVE_COLOR : "transparent"}`,
          }}
        >
          <span style={getCircleStyle(done, active)}>{done ? <CheckOutlined /> : step.no}</span>
          <span style={getLabelStyle(done, active)}>{step.label}</span>
        </div>
      );
    })}
  </div>
);

AdimGostergesi.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default AdimGostergesi;
