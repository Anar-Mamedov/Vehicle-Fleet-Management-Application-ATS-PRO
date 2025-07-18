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

export function YerlerSehirSelectBox({ name1, isRequired, onChange, towerID = null, inputWidth, dropdownWidth }) {
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
      let response;
      if (towerID) {
        response = await AxiosInstance.get(`TownRegion/GetTownRegionListByTownId?id=${towerID}`);
      } else {
        response = await AxiosInstance.get(`TownRegion/GetTownRegionList`);
      }
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
            showSearch
            allowClear
            placeholder={t("sehir")}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            onDropdownVisibleChange={(open) => {
              if (open) {
                setOptions([]);
                fetchData();
              }
            }}
            dropdownRender={(menu) => <Spin spinning={loading}>{menu}</Spin>}
            options={options.map((item) => ({
              value: item.sehirYerId,
              label: item.tanim,
            }))}
            onChange={(value, option) => {
              const numericValue = value ? Number(value) : null;
              setValue(name1, numericValue);
              setValue(`${name1}ID`, numericValue);
              field.onChange(numericValue);
              if (onChange) {
                onChange(numericValue, option?.label);
              }
            }}
            style={{ width: inputWidth }}
            dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
          />
        )}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller name={`${name1}ID`} control={control} render={({ field }) => <Input {...field} type="text" style={{ display: "none" }} />} />
    </StyledDiv>
  );
}
