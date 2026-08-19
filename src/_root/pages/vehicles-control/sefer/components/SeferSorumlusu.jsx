import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { t } from "i18next";
import { CodeControlByUrlService } from "../../../../../api/services/code/services";

// Operasyon sorumlusu servise metin olarak gönderildiği için seçilen personelin adı forma yazılır
const SeferSorumlusu = ({ name = "seferSorumlusu" }) => {
  const [data, setData] = useState([]);
  const { control } = useFormContext();

  const handleClick = () => {
    CodeControlByUrlService("Employee/GetEmployeeListForSelectBox").then((res) => {
      setData(res?.data || []);
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          showSearch
          allowClear
          placeholder={t("personelSeciniz")}
          optionFilterProp="label"
          options={data.map((item) => ({ label: item.isim, value: item.isim }))}
          value={field.value || undefined}
          onClick={handleClick}
          onChange={(value) => field.onChange(value || "")}
        />
      )}
    />
  );
};

SeferSorumlusu.propTypes = {
  name: PropTypes.string,
};

export default SeferSorumlusu;
