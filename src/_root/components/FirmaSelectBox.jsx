import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Typography, Spin, Input } from "antd";
import AxiosInstance from "../../api/http";
import styled from "styled-components";

import { t } from "i18next";

const { Text, Link } = Typography;
const { Option } = Select;

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 300px;
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

export default function FirmaSelectBox({ name1, isRequired, onChange, multiSelect = false }) {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`Company/GetCompanyListForSelectInput`);
      if (response && response.data) {
        setOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        render={({ field }) => {
          const { value, onChange: fieldOnChange, ref, ...restField } = field;
          const normalizedValue = multiSelect
            ? Array.isArray(value)
              ? value
              : value !== undefined && value !== null
                ? [value]
                : []
            : value ?? null;

          return (
            <StyledSelect
              {...restField}
              ref={ref}
              value={normalizedValue}
              mode={multiSelect ? "multiple" : undefined}
              status={errors[name1] ? "error" : ""}
              showSearch
              allowClear
              placeholder="Firma Seçiniz"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
              onDropdownVisibleChange={(open) => {
                if (open) {
                  fetchData();
                }
              }}
              options={options.map((item) => ({
                value: item.firmaId,
                label: item.unvan,
              }))}
              onChange={(selectedValue, option) => {
                if (multiSelect) {
                  const numericValues = Array.isArray(selectedValue)
                    ? selectedValue.map((val) => (typeof val === "number" ? val : Number(val)))
                    : [];
                  setValue(name1, numericValues);
                  setValue(`${name1}ID`, numericValues);
                  fieldOnChange(numericValues);
                  if (onChange) {
                    const labels = Array.isArray(option) ? option.map((opt) => (opt?.label ?? null)) : [];
                    onChange(numericValues, labels);
                  }
                } else {
                  const numericValue = selectedValue !== undefined && selectedValue !== null ? Number(selectedValue) : null;
                  setValue(name1, numericValue);
                  setValue(`${name1}ID`, numericValue);
                  fieldOnChange(numericValue);
                  if (onChange) {
                    onChange(numericValue, option?.label);
                  }
                }
              }}
            />
          );
        }}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller
        name={`${name1}ID`}
        control={control}
        render={({ field }) => {
          const { value, ...restField } = field;
          const hiddenValue = multiSelect && Array.isArray(value) ? value.join(",") : value ?? "";
          return <Input {...restField} value={hiddenValue} type="text" style={{ display: "none" }} readOnly />;
        }}
      />
    </StyledDiv>
  );
}
