import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Select, Spin } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { GetWareHouseListByTipService } from "../../api/services/malzeme/services";

const MALZEME_DEPO_TIPI = "MALZEME";

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

// Malzeme depolarından seçim yaptırır (WareHouse tip=MALZEME).
// name1 = depo tanımı, `${name1}ID` = deponun siraNo'su.
export default function MalzemeDepoSelectbox({ name1, isRequired, disabled, placeholder, onChange }) {
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
      const response = await GetWareHouseListByTipService(MALZEME_DEPO_TIPI);
      setOptions(Array.isArray(response?.data) ? response.data : []);
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
            disabled={disabled}
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
              label: item.tanim,
            }))}
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

MalzemeDepoSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
