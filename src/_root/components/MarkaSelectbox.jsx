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

  // Custom styles for dropdown menu
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

export default function MarkaSelectbox({ name1, isRequired, onChange, inputWidth, dropdownWidth, multiSelect = false }) {
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
      const response = await AxiosInstance.get(`Mark/GetMarkList`);
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
        render={({ field }) => (
          <StyledSelect
            {...field}
            status={errors[name1] ? "error" : ""}
            mode={multiSelect ? "multiple" : undefined}
            showSearch
            allowClear
            placeholder="Marka Seçiniz"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            onDropdownVisibleChange={(open) => {
              if (open) {
                fetchData();
              }
            }}
            options={options.map((item) => ({
              value: item.siraNo,
              label: item.marka,
            }))}
            value={multiSelect ? (Array.isArray(field.value) ? field.value : []) : field.value}
            onChange={(value, option) => {
              if (multiSelect) {
                // Multi-select için array değerlerini handle et
                const selectedLabels = Array.isArray(value)
                  ? value
                      .map((val) => {
                        const selectedOption = options.find((opt) => opt.siraNo === val);
                        return selectedOption ? selectedOption.marka : null;
                      })
                      .filter(Boolean)
                  : [];

                setValue(name1, selectedLabels);
                setValue(`${name1}ID`, value);
                field.onChange(value); // Multi-select'te value array olarak gelir

                if (onChange) {
                  onChange(value, option);
                }
              } else {
                // Single select için mevcut mantık
                setValue(name1, option?.label || null);
                setValue(`${name1}ID`, value);
                field.onChange(option?.label || null);

                if (onChange) {
                  onChange(value, option);
                }
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
