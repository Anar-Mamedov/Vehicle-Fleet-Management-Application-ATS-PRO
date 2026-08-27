import React from "react";
import PropTypes from "prop-types";
import AraclarTablo from "../../vehicles/AraclarTablo";

const AracSecimi = ({ selectedRowKeys, onSelectionChange }) => (
  <AraclarTablo selectionMode selectedRowKeys={selectedRowKeys} onSelectionChange={onSelectionChange} />
);

AracSecimi.propTypes = {
  selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default AracSecimi;
