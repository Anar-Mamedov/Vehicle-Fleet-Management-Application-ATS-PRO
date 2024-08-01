import { useContext, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { GetMaterialListByType } from "../../../../api/services/code/services";
import { SelectContext } from "../../../../context/selectSlice";

const MaterialType = ({ name, codeName, type, required }) => {
  const [data, setData] = useState([]);
  const { setValue, watch, control } = useFormContext();
  const { setFuelTankId } = useContext(SelectContext);

  const handleClickSelect = () => {
    GetMaterialListByType(type).then((res) => setData(res.data));
  };

  return (
    <Controller
      name={codeName}
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
              label: item.tanim,
              value: item.malzemeId,
            }))}
            value={watch(name)}
            onClick={handleClickSelect}
            onChange={(e) => {
              field.onChange(e);
              setFuelTankId(e);
              if (e === undefined) {
                field.onChange("");
                const selectedOption = data.find(
                  (option) => option.siraNo === e
                );
                if (!selectedOption) {
                  setValue(name, "");
                }
              } else {
                const selectedOption = data.find(
                  (option) => option.malzemeId === e
                );
                if (selectedOption) {
                  setValue(name, selectedOption.tanim);
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

MaterialType.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default MaterialType;
