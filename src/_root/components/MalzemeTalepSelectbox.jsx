import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Select, Spin } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { GetMaterialRequestListByServiceIdService } from "../../api/services/isEmri/services";

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

// Yalnızca verilen iş emrinin malzeme talepleri arasından seçim yaptırır.
// name1 = talep no, `${name1}ID` = talebin siraNo'su.
export default function MalzemeTalepSelectbox({ name1, isEmriId, isRequired, placeholder, onChange }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!isEmriId) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await GetMaterialRequestListByServiceIdService(isEmriId);
      const list = Array.isArray(response?.data) ? response.data : response?.data?.list || [];
      setOptions(list);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDiv style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%", flexWrap: "wrap", rowGap: "0px" }}>
      <Controller
        name={name1}
        control={control}
        rules={{ required: isRequired ? t("alanBosBirakilamaz") : false }}
        render={({ field }) => (
          <StyledSelect
            {...field}
            value={field.value ?? undefined}
            status={errors[name1] ? "error" : ""}
            showSearch
            allowClear
            placeholder={placeholder || t("seciniz")}
            optionFilterProp="label"
            onDropdownVisibleChange={(open) => {
              if (open) fetchData();
            }}
            dropdownRender={(menu) => <Spin spinning={loading}>{menu}</Spin>}
            options={options.map((item) => ({
              value: item.siraNo,
              label: item.talepNo,
              malzemeTanim: item.malzemeTanim,
            }))}
            optionRender={(option) => (
              <div className="flex flex-col">
                <span>{option.data.label}</span>
                {option.data.malzemeTanim && <span style={{ fontSize: "12px", color: "#8c8c8c" }}>{option.data.malzemeTanim}</span>}
              </div>
            )}
            onChange={(value, option) => {
              setValue(`${name1}ID`, value ?? null);
              field.onChange(option?.label ?? null);
              onChange?.(value ?? null, option);
            }}
          />
        )}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller name={`${name1}ID`} control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} type="text" style={{ display: "none" }} readOnly />} />
    </StyledDiv>
  );
}

MalzemeTalepSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  isEmriId: PropTypes.number,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
