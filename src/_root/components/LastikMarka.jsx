import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Input } from "antd";
import AxiosInstance from "../../api/http";
import styled from "styled-components";

import { t } from "i18next";

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

export default function LastikMarka({ name1, isRequired, multiSelect = false, inputWidth, dropdownWidth, placeholder }) {
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
      const response = await AxiosInstance.get(`TyreMark/GetTyreMarkList`);
      if (response && response.data) {
        setOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // add new status to selectbox end
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
          let normalizedValue = field.value;
          if (multiSelect) {
            normalizedValue = Array.isArray(field.value) ? field.value : [];
          }

          const idToLabelMap = new Map(options.map((opt) => [opt.siraNo, opt.marka]));
          const getSelectedLabels = (vals) => {
            if (!Array.isArray(vals)) return [];
            const labels = [];
            for (const val of vals) {
              const label = idToLabelMap.get(val);
              if (label) labels.push(label);
            }
            return labels;
          };

          return (
            <StyledSelect
              {...field}
              status={errors[name1] ? "error" : ""}
              mode={multiSelect ? "multiple" : undefined}
              showSearch
              allowClear
              placeholder={placeholder || "Seçim Yapınız"}
              optionFilterProp="children"
              filterOption={(input, option) => {
                const label = option && option.label ? String(option.label) : "";
                if (!label) return false;
                return label.toLowerCase().includes(String(input).toLowerCase());
              }}
              onDropdownVisibleChange={(open) => {
                if (open) {
                  fetchData();
                }
              }}
              loading={loading}
              options={options.map((item) => ({
                value: item.siraNo,
                label: item.marka,
              }))}
              value={normalizedValue}
              onChange={(value) => {
                if (multiSelect) {
                  const selectedLabels = getSelectedLabels(value);
                  setValue(`${name1}ID`, value);
                  setValue(`${name1}Label`, selectedLabels);
                  field.onChange(value);
                  return;
                }

                setValue(`${name1}ID`, value);
                const singleLabel = idToLabelMap.get(value) || null;
                setValue(`${name1}Label`, singleLabel);
                field.onChange(value);
              }}
              style={{ width: inputWidth }}
              dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
              popupMatchSelectWidth={false}
            />
          );
        }}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller
        name={`${name1}ID`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text" // Set the type to "text" for name input
            style={{ display: "none" }}
          />
        )}
      />
    </StyledDiv>
  );
}

LastikMarka.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  multiSelect: PropTypes.bool,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dropdownWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
