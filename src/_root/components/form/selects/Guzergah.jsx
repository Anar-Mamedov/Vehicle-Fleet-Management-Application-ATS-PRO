import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Guzergah = ({ placeholder = "" }) => {
  const [data, setData] = useState([]);
  const { setValue, watch, control } = useFormContext();

  const handleClick = () => {
    CodeControlByUrlService("FuelRoute/GetFuelRouteListForSelectInput").then((res) => {
      setData(res.data);
    });
  };

  return (
    <Controller
      name="guzergahId"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
          filterSort={(optionA, optionB) => (optionA?.label.toLowerCase() ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
          options={data.map((item) => ({
            label: item.guzergah,
            value: item.guzergahId,
          }))}
          value={watch("guzergah")}
          onClick={handleClick}
          onChange={(e) => {
            field.onChange(e);
            if (e === undefined) {
              const selectedOption = data.find((option) => option.guzergahId === e);
              if (!selectedOption) {
                // Temizlendiğinde boş string yazılırsa antd alanı dolu sayar ve placeholder görünmez; her zaman null yazılır
                setValue("guzergah", null);
              }
            } else {
              const selectedOption = data.find((option) => option.guzergahId === e);
              if (selectedOption) {
                setValue("guzergah", selectedOption.guzergah);
              }
            }
          }}
        />
      )}
    />
  );
};

Guzergah.propTypes = {
  placeholder: PropTypes.string,
};

export default Guzergah;
