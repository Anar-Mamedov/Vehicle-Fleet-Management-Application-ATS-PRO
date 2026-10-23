import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Select, Spin } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { GetEmployeeListForSelectBoxService } from "../../api/services/personel_services";

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

// Liste filtreleri için çoklu personel seçimi.
// name1 ve `${name1}ID` alanlarının ikisi de seçilen personel id (personelId) dizisini tutar; seçim yoksa boş dizi.
export default function PersonelMultiSelectbox({ name1, onChange, placeholder }) {
  const { control, setValue } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetEmployeeListForSelectBoxService();
      setOptions(Array.isArray(response?.data) ? response.data : []);
    } catch {
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value, option) => {
    const ids = Array.isArray(value) ? value : [];
    setValue(`${name1}ID`, ids);
    field.onChange(ids);
    onChange?.(ids, option);
  };

  return (
    <StyledDiv style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%", flexWrap: "wrap", rowGap: "0px" }}>
      <Controller
        name={name1}
        control={control}
        render={({ field }) => (
          <StyledSelect
            {...field}
            value={field.value ?? []}
            mode="multiple"
            showSearch
            allowClear
            maxTagCount="responsive"
            placeholder={placeholder || t("personelSeciniz")}
            optionFilterProp="label"
            onDropdownVisibleChange={(open) => {
              if (open) fetchData();
            }}
            dropdownRender={(menu) => <Spin spinning={loading}>{menu}</Spin>}
            options={options.map((item) => ({
              value: item.personelId,
              label: item.isim,
            }))}
            onChange={(value, option) => handleChange(field, value, option)}
          />
        )}
      />
      <Controller
        name={`${name1}ID`}
        control={control}
        render={({ field }) => <Input {...field} value={Array.isArray(field.value) ? field.value.join(",") : ""} type="text" style={{ display: "none" }} readOnly />}
      />
    </StyledDiv>
  );
}

PersonelMultiSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
