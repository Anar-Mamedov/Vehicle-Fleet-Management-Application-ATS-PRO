import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Firma = ({ name, codeName, checked, required }) => {
  const [data, setData] = useState([]);
  const { setValue, watch, control } = useFormContext();

  const handleClick = () => {
    CodeControlByUrlService("Company/GetCompanyListForSelectInput").then(
      (res) => {
        setData(res?.data);
      }
    );
  };

  return (
    <Controller
      name={codeName ? codeName : "firmaId"}
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
            disabled={checked}
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? "").localeCompare(
                optionB?.label.toLowerCase() ?? ""
              )
            }
            options={data.map((item) => ({
              label: item.unvan,
              value: item.firmaId,
            }))}
            value={name ? watch(name) : watch("unvan")}
            onClick={handleClick}
            onChange={(e) => {
              field.onChange(e);
              if (e === undefined) {
                setValue("tedarikciKod", "");
                setValue("unvan", "");
                const selectedOption = data.find(
                  (option) => option.firmaId === e
                );
                if (!selectedOption) {
                  name ? setValue(name, "") : setValue("unvan", "");
                }
              } else {
                const selectedOption = data.find(
                  (option) => option.firmaId === e
                );
                if (selectedOption) {
                  setValue("tedarikciKod", selectedOption.kod);
                  setValue("unvan", selectedOption.unvan);

                  name
                    ? setValue(name, selectedOption.unvan)
                    : setValue("unvan", selectedOption.unvan);
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

Firma.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  checked: PropTypes.bool,
  required: PropTypes.bool,
};

export default Firma;
