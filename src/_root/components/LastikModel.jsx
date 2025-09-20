import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Input } from "antd";
import AxiosInstance from "../../api/http";
import styled from "styled-components";
import PropTypes from "prop-types";

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

export default function LastikModel({ name1, isRequired, watchName, lastikMarkaId, multiSelect = false, onChange, inputWidth, dropdownWidth, placeholder }) {
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
  const brandId = watch(`${watchName}ID`) || lastikMarkaId;

  const isBrandIdValid = () => {
    if (Array.isArray(brandId)) {
      return brandId.length > 0 && brandId.some((id) => id != null && id !== "");
    }
    return brandId != null && brandId !== "";
  };

  const getLabelsByIds = (ids) => {
    if (!Array.isArray(ids)) return [];
    const idToLabel = new Map(options.map((opt) => [opt.siraNo, opt.model]));
    return ids.map((id) => idToLabel.get(id)).filter((label) => Boolean(label));
  };

  const fetchData = async () => {
    if (!brandId) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const markId = Array.isArray(brandId) ? brandId : [brandId];
      const response = await AxiosInstance.get(`TyreModel/GetTyreModelList?id=${markId}`);
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
        render={({ field }) => {
          let normalizedValue = field.value;
          if (multiSelect) {
            normalizedValue = Array.isArray(field.value) ? field.value : [];
          }

          return (
            <StyledSelect
              {...field}
              status={errors[name1] ? "error" : ""}
              key={selectKey}
              mode={multiSelect ? "multiple" : undefined}
              disabled={!isBrandIdValid()}
              showSearch
              allowClear
              placeholder={placeholder || "Seçim Yapınız"}
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
              onDropdownVisibleChange={(open) => {
                if (open) {
                  fetchData();
                }
              }}
              loading={loading}
              options={options.map((item) => ({
                value: item.siraNo,
                label: item.model,
              }))}
              value={normalizedValue}
              onChange={(value) => {
                if (multiSelect) {
                  const selectedLabels = getLabelsByIds(value);

                  setValue(name1, selectedLabels);
                  setValue(`${name1}ID`, value);
                  field.onChange(value);
                  if (typeof onChange === "function") {
                    onChange(value);
                  }
                } else {
                  const selectedOption = options.find((item) => item.siraNo === value);
                  const singleLabel = selectedOption ? selectedOption.model : null;
                  setValue(name1, singleLabel);
                  setValue(`${name1}ID`, value);
                  field.onChange(value);
                  if (typeof onChange === "function") {
                    onChange(value != null ? [value] : []);
                  }
                }
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

LastikModel.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  watchName: PropTypes.string.isRequired,
  lastikMarkaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  multiSelect: PropTypes.bool,
  onChange: PropTypes.func,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dropdownWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

LastikModel.defaultProps = {
  isRequired: false,
  lastikMarkaId: undefined,
};
