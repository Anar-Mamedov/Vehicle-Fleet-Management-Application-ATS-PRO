import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Select, Spin } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { GetWorkShopDefListService } from "../../api/services/kademe/services";

// Kademe için seçim listesi endpoint'i olmadığından aktif kademeler liste servisinden tek sayfada alınır
const KADEME_SECIM_LISTE_BOYUTU = 1000;
const AKTIF_KADEME_FILTRESI = { status: 1 };

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

// Tekli seçimde name1 = kademe adı, `${name1}ID` = kademe id.
// Çoklu seçimde (filtreler) her iki alan da seçilen kademe id dizisini tutar.
export default function KademeSelectbox({ name1, isRequired, onChange, placeholder, multiSelect = false }) {
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
      const response = await GetWorkShopDefListService(0, 0, "", AKTIF_KADEME_FILTRESI, KADEME_SECIM_LISTE_BOYUTU);
      setOptions(response?.data?.list || []);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value, option) => {
    if (multiSelect) {
      const ids = Array.isArray(value) ? value : [];
      setValue(`${name1}ID`, ids);
      field.onChange(ids);
      onChange?.(ids, option);
      return;
    }

    setValue(`${name1}ID`, value ?? null);
    field.onChange(option?.label ?? null);
    onChange?.(value ?? null, option);
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
            mode={multiSelect ? "multiple" : undefined}
            showSearch
            allowClear
            maxTagCount="responsive"
            placeholder={placeholder || t("seciniz")}
            optionFilterProp="label"
            onDropdownVisibleChange={(open) => {
              if (open) fetchData();
            }}
            dropdownRender={(menu) => <Spin spinning={loading}>{menu}</Spin>}
            options={options.map((item) => ({
              value: item.siraNo,
              label: item.kademeAdi,
            }))}
            onChange={(value, option) => handleChange(field, value, option)}
          />
        )}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller
        name={`${name1}ID`}
        control={control}
        render={({ field }) => <Input {...field} value={Array.isArray(field.value) ? field.value.join(",") : field.value ?? ""} type="text" style={{ display: "none" }} readOnly />}
      />
    </StyledDiv>
  );
}

KademeSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  multiSelect: PropTypes.bool,
};
