import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { GetWareHouseListByTipService } from "../../../../api/services/malzeme/services";

const Depo = ({ type, required }) => {
  const [data, setData] = useState([]);
  const { watch, setValue, control } = useFormContext();

  const handleClick = () => {
    GetWareHouseListByTipService(type).then((res) => {
      setData(res.data);
    });
  };

  return (
    <Controller
      name="girisDepoSiraNo"
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
              value: item.siraNo,
            }))}
            value={watch("depo")}
            onClick={handleClick}
            onChange={(e) => {
              field.onChange(e);
              if (e === undefined) {
                const selectedOption = data.find((option) => option.siraNo === e);
                if (!selectedOption) {
                  setValue("depo", "");
                  setValue("depoLokasyonId", "");
                  setValue("malzemeId", "");
                }
              } else {
                const selectedOption = data.find((option) => option.siraNo === e);
                if (selectedOption) {
                  setValue("depo", selectedOption.tanim);
                  setValue("depoLokasyonId", selectedOption.lokasyonId);
                  setValue("malzemeId", selectedOption.malzemeId);
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

Depo.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default Depo;
