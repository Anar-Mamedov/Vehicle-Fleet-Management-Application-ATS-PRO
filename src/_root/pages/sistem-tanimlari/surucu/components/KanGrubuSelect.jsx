import React from "react";
import PropTypes from "prop-types";
import StaticOptionSelect from "./StaticOptionSelect";

const BLOOD_TYPES = ["A Rh+", "A Rh-", "B Rh+", "B Rh-", "AB Rh+", "AB Rh-", "0 Rh+", "0 Rh-"];

const KanGrubuSelect = ({ name, checked }) => <StaticOptionSelect name={name} options={BLOOD_TYPES} checked={checked} />;

KanGrubuSelect.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
};

export default KanGrubuSelect;
