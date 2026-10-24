import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Select, Spin } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { GetStaffsByWorkShopIdService } from "../../api/services/kademe/services";

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 100%;
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

// Yalnızca verilen kademeye atanmış personeller arasından seçim yaptırır.
// name1 = personel adı, `${name1}ID` = personel id (servis yanıtındaki siraNo kademe atama kaydının id'sidir, personelin değil).
export default function KademePersonelSelectbox({ name1, kademeId, isRequired, placeholder, onChange }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!kademeId) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await GetStaffsByWorkShopIdService(kademeId);
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
            showSearch
            allowClear
            placeholder={placeholder || t("seciniz")}
            optionFilterProp="label"
            notFoundContent={kademeId ? undefined : t("onceIsEmrineKademeSeciniz")}
            onDropdownVisibleChange={(open) => {
              if (open) fetchData();
            }}
            dropdownRender={(menu) => <Spin spinning={loading}>{menu}</Spin>}
            options={options.map((item) => ({
              value: item.personelId,
              label: item.isim,
              unvan: item.unvan,
            }))}
            optionRender={(option) => (
              <div className="flex flex-col">
                <span>{option.data.label}</span>
                {option.data.unvan && <span style={{ fontSize: "12px", color: "#8c8c8c" }}>{option.data.unvan}</span>}
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

KademePersonelSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  kademeId: PropTypes.number,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
