import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { t } from "i18next";

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [20, 50, 100];

export const getStoredPageSize = (storageKey) => {
  const storedPageSize = Number(localStorage.getItem(storageKey));
  return PAGE_SIZE_OPTIONS.includes(storedPageSize) ? storedPageSize : DEFAULT_PAGE_SIZE;
};

const PageSizeSelect = ({ value, onChange }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <span style={{ marginRight: "8px", textTransform: "capitalize" }}>{`${t("kayit")}:`}</span>
    <Select
      value={value}
      onChange={onChange}
      options={PAGE_SIZE_OPTIONS.map((pageSize) => ({ label: pageSize, value: pageSize }))}
      style={{ width: 70 }}
      popupMatchSelectWidth={false}
    />
  </div>
);

PageSizeSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PageSizeSelect;
