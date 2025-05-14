import React from "react";
import { Select } from "antd";
import { t } from "i18next";
import styled from "styled-components";

const { Option } = Select;

const DURUM_OPTIONS = [
  { value: 1, label: t("aktifAraclar"), color: "green" },
  { value: 2, label: t("pasifAraclar"), color: "orange" },
  { value: 3, label: t("arsivdekiAraclar"), color: "red" },
  { value: 5, label: t("servisteOlanAraclar"), color: "blue" },
  { value: 7, label: t("seferdeOlanAraclar"), color: "purple" },
  { value: 4, label: t("periyodikBakimiGecenler"), color: "gold" },
  { value: 6, label: t("yenilemeSuresiYaklasanlar"), color: "grey" },
  { value: 8, label: t("tumAraclar"), color: "#000" },
];

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 300px;
  }

  // Custom styles for dropdown menu
  .ant-select-dropdown {
    width: auto !important;
    min-width: 100px !important;
  }
`;

const DurumSelect = ({ value, onChange, placeholder = "Durum Seçin", inputWidth, dropdownWidth }) => {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear
      style={{ width: inputWidth }}
      dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
      popupMatchSelectWidth={false}
    >
      {DURUM_OPTIONS.map((option) => (
        <Option key={option.value} value={option.value}>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: option.color,
              marginRight: 8,
            }}
          />
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default DurumSelect;
