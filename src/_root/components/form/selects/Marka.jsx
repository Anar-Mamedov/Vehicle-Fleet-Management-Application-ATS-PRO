import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Marka = ({ required }) => {
  const [data, setData] = useState([]);
  const { setValue, watch, control } = useFormContext();

  const handleClickSelect = () => {
    CodeControlByUrlService("Mark/GetMarkList").then((res) => {
      setData(res.data);
    });
  };

  return (
    <Controller
      name="markaId"
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
              label: item.marka,
              value: item.siraNo,
            }))}
            value={watch("marka")}
            onClick={handleClickSelect}
            onChange={(e) => {
              field.onChange(e);
              if (e === undefined) {
                field.onChange("");
                const selectedOption = data.find(
                  (option) => option.siraNo === e
                );
                if (!selectedOption) {
                  setValue("marka", "");
                }
              } else {
                const selectedOption = data.find(
                  (option) => option.siraNo === e
                );
                if (selectedOption) {
                  setValue("marka", selectedOption.marka);
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

Marka.propTypes = {
  required: PropTypes.bool,
};

export default Marka;
