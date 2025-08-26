import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Input } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import PropTypes from "prop-types";

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 300px;
  }

  .ant-select-dropdown {
    width: auto !important;
    min-width: 100px !important;
  }
`;

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    align-items: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default function DonemSelect({ name1, isRequired, onChange, inputWidth, dropdownWidth }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const staticOptions = [
    { value: "yillik", label: t("yillik") },
    { value: "aylik", label: t("aylik") },
    { value: "haftalik", label: t("haftalik") },
  ];

  return (
    <StyledDiv
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
        rowGap: "0px",
      }}
    >
      <Controller
        name={name1}
        control={control}
        rules={{ required: isRequired ? t("alanBosBirakilamaz") : false }}
        render={({ field }) => (
          <StyledSelect
            {...field}
            status={errors[name1] ? "error" : ""}
            showSearch
            allowClear
            placeholder={t("donemSeciniz")}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            options={staticOptions}
            onChange={(value, option) => {
              const selectedValue = value || null;
              const selectedLabel = option?.label || null;
              setValue(name1, selectedLabel);
              setValue(`${name1}ID`, selectedValue);
              field.onChange(selectedLabel);
              if (onChange) {
                onChange(selectedValue, option);
              }
            }}
            style={{ width: inputWidth }}
            dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
            popupMatchSelectWidth={false}
          />
        )}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller name={`${name1}ID`} control={control} render={({ field }) => <Input {...field} type="text" style={{ display: "none" }} />} />
    </StyledDiv>
  );
}

DonemSelect.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dropdownWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
