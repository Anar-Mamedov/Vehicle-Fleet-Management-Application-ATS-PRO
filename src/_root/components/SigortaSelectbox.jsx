import React, { useState } from "react";
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

export default function SigortaSelectbox({ name1, isRequired, onChange, inputWidth, dropdownWidth, vehicleIdField = "plakaID" }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const vehicleId = watch(vehicleIdField);
    if (!vehicleId) return;
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`Insurance/GetActiveInsuranceList?vehicleId=${vehicleId}&diff=0&setPointId=0&parameter=`);
      if (response && response.data) {
        if (response.data.list) {
          setOptions(response.data.list);
        } else if (Array.isArray(response.data)) {
          setOptions(response.data);
        } else {
          setOptions([]);
        }
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
            showSearch
            allowClear
            placeholder={t("seciniz")}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            onDropdownVisibleChange={(open) => {
              if (open) {
                fetchData();
              }
            }}
            options={options.map((item) => ({
              value: item.siraNo,
              label: item.policeNo || item.sigortaFirma || `#${item.siraNo}`,
            }))}
            onChange={(value, option) => {
              setValue(name1, option?.label || null);
              setValue(`${name1}ID`, value || null);
              field.onChange(option?.label || null);
              if (onChange) {
                onChange(value, option);
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
