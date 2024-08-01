import { useContext, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetFuelCardContentByIdService } from "../../../../api/services/vehicles/yakit/services";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Plaka = ({ name, codeName, required }) => {
  const { plaka, setData } = useContext(PlakaContext);
  const { setValue, control, watch } = useFormContext();
  const [plateList, setPlateList] = useState([]);

  useEffect(() => {
    if (plaka.length === 1) {
      GetFuelCardContentByIdService(plaka[0].id).then((res) => {
        setData(res.data);
      });
    }
  }, [plaka]);

  const handleChange = (e) => {
    GetFuelCardContentByIdService(e).then((res) => setData(res.data));
  };

  const handleClick = async () => {
    if (plaka.length === 0) {
      const res = await CodeControlByUrlService("Vehicle/GetVehiclePlates");
      const updatedData = res.data.map((item) => {
        if ("aracId" in item && "plaka" in item) {
          return {
            ...item,
            id: item.aracId,
          };
        }
        return item;
      });
      setPlateList(updatedData);
    }
  };

  return (
    <Controller
      name={codeName ? codeName : "plaka"}
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
            value={name ? watch(name) : watch("plaka")}
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label.toLowerCase() ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={
              plaka.length === 0
                ? plateList.map((item) => ({
                    label: item.plaka,
                    value: item.id,
                  }))
                : plaka.map((item) => ({
                    label: item.plaka,
                    value: item.id,
                  }))
            }
            onClick={handleClick}
            onChange={(e) => {
              field.onChange(e);
              handleChange(e);
              if (e === undefined) {
                const selectedOption = plaka.find((option) => option.id === e);
                if (!selectedOption) {
                  name ? setValue(name, "") : setValue("plaka", "");
                  setData([]);
                }
              } else {
                const selectedOption = plaka.find((option) => option.id === e);
                if (selectedOption) {
                  name
                    ? setValue(name, selectedOption.plaka)
                    : setValue("plaka", selectedOption.plaka);
                }
              }
            }}
            disabled={plaka.length === 1}
          />
          {fieldState.error && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </>
      )}
    />
  );
};

Plaka.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  required: PropTypes.bool,
};

export default Plaka;
