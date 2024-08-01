import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Driver = ({ name, codeName, required }) => {
  const [data, setData] = useState([]);
  const { watch, setValue, control } = useFormContext();

  const handleClickSelect = () => {
    CodeControlByUrlService("Driver/GetDriverListForSelectInput").then(
      (res) => {
        setData(res.data);
      }
    );
  };

  return (
    <Controller
      name={codeName ? codeName : "surucuId"}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            showSearch
            allowClear
            optionFilterProp="children"
            className={fieldState.error ? "input-error" : ""}
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={data.map((item) => ({
              label: item.isim,
              value: item.surucuId,
            }))}
            value={name ? watch(name) : watch("surucu")}
            onClick={handleClickSelect}
            onChange={(e) => {
              field.onChange(e);
              if (e === undefined) {
                const selectedOption = data.find(
                  (option) => option.surucuId === e
                );
                if (!selectedOption) {
                  name ? setValue(name, "") : setValue("surucu", "");
                }
              } else {
                const selectedOption = data.find(
                  (option) => option.surucuId === e
                );
                if (selectedOption) {
                  name
                    ? setValue(name, selectedOption.isim)
                    : setValue("surucu", selectedOption.isim);
                }
              }
            }}
          />
          {fieldState.error && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </>
      )}
    />
  );
};

Driver.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  required: PropTypes.bool,
};

export default Driver;
