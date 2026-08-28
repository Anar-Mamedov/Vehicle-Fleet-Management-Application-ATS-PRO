import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Input } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import AxiosInstance from "../../api/http";

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    align-items: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Güzergah listesi; sefer modülündeki güzergah seçimleriyle aynı servisten beslenir
export default function GuzergahSelectbox({ name1, isRequired = false, onChange, placeholder, inputWidth, dropdownWidth, multiSelect = false }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`FuelRoute/GetFuelRouteListForSelectInput`);
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
          const normalizedValue = multiSelect ? (Array.isArray(value) ? value : []) : value ?? null;

          return (
            <Select
              {...restField}
              ref={ref}
              value={normalizedValue}
              mode={multiSelect ? "multiple" : undefined}
              status={errors[name1] ? "error" : ""}
              showSearch
              allowClear
              maxTagCount="responsive"
              loading={loading}
              placeholder={placeholder || t("guzergahSecin")}
              optionFilterProp="label"
              onDropdownVisibleChange={(open) => {
                if (open) {
                  fetchData();
                }
              }}
              options={options.map((item) => ({
                value: item.guzergahId,
                label: item.guzergah,
              }))}
              style={{ width: inputWidth }}
              dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
              popupMatchSelectWidth={false}
              onChange={(selectedValue, option) => {
                if (multiSelect) {
                  const numericValues = Array.isArray(selectedValue) ? selectedValue.map((item) => Number(item)) : [];
                  setValue(name1, numericValues);
                  setValue(`${name1}ID`, numericValues);
                  fieldOnChange(numericValues);
                  if (onChange) {
                    const labels = Array.isArray(option) ? option.map((item) => item?.label ?? null) : [];
                    onChange(numericValues, labels);
                  }
                } else {
                  // Temizlendiğinde null yazılır; boş string antd tarafında dolu sayılıp placeholder'ı gizler
                  const numericValue = selectedValue !== undefined && selectedValue !== null ? Number(selectedValue) : null;
                  setValue(name1, numericValue);
                  setValue(`${name1}ID`, numericValue);
                  fieldOnChange(numericValue);
                  if (onChange) {
                    onChange(numericValue, option?.label ?? null);
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

GuzergahSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputWidth: PropTypes.string,
  dropdownWidth: PropTypes.string,
  multiSelect: PropTypes.bool,
};
