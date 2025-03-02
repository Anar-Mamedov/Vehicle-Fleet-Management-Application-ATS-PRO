import React, { useState, useEffect } from "react";
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

export default function LastikModel({ name1, isRequired, watchName }) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectKey, setSelectKey] = useState(0);

  // Watch the value of the brand ID field using watch function
  const brandId = watch(`${watchName}ID`);

  const fetchData = async () => {
    if (!brandId) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosInstance.get(`TyreModel/GetTyreModelList?id=${brandId}`);
      if (response && response.data) {
        setOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset the model selection when brand changes
  useEffect(() => {
    setValue(name1, null);
    setValue(`${name1}ID`, null);
    setSelectKey((prevKey) => prevKey + 1);
  }, [brandId, setValue, name1]);

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
        render={({ field }) => (
          <StyledSelect
            {...field}
            status={errors[name1] ? "error" : ""}
            key={selectKey}
            showSearch
            allowClear
            placeholder="Seçim Yapınız"
            optionFilterProp="children"
            filterOption={(input, option) => (option.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            onDropdownVisibleChange={(open) => {
              if (open) {
                fetchData(); // Fetch data when the dropdown is opened
              }
            }}
            loading={loading}
            options={options.map((item) => ({
              value: item.siraNo, // Use siraNo as the value
              label: item.model, // Display model in the dropdown instead of marka
            }))}
            onChange={(value) => {
              // Seçilen değerin ID'sini NedeniID alanına set et
              setValue(`${name1}ID`, value);

              // Store the label (model name) in a new field
              const selectedOption = options.find((item) => item.siraNo === value);
              if (selectedOption) {
                setValue(`${name1}Label`, selectedOption.model);
              } else {
                setValue(`${name1}Label`, null);
              }

              field.onChange(value);
            }}
            disabled={!brandId} // Disable selection if no brand is selected
          />
        )}
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
