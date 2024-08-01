import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { TreeSelect } from "antd";
import { CarryOutOutlined } from "@ant-design/icons";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const convertToLocationFormat = (data, parentId = 0) => {
  const result = [];

  data.forEach((item) => {
    if (item.anaLokasyonId === parentId) {
      const newItem = {
        value: item.lokasyonId,
        id: item.lokasyonId,
        title: item.lokasyonTanim,
        icon: <CarryOutOutlined />,
        children: convertToLocationFormat(data, item.lokasyonId),
      };
      result.push(newItem);
    }
  });

  return result;
};

const Location = ({ name, codeName, required }) => {
  const [data, setData] = useState([]);
  const { watch, setValue, control } = useFormContext();

  const handleClickTree = () => {
    CodeControlByUrlService("Location/GetLocationList").then((res) =>
      setData(res.data)
    );
  };

  return (
    <Controller
      name={codeName ? codeName : "lokasyonId"}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <TreeSelect
            {...field}
            showSearch
            allowClear
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            className={`w-full ${fieldState.error && !watch("lokasyonId") ? 'input-error' : ''}`}
            treeLine={true}
            treeData={convertToLocationFormat(data)}
            value={name ? watch(name) : watch("lokasyon")}
            onClick={handleClickTree}
            onChange={(e) => {
              field.onChange(e);
              if (e === undefined) {
                const selectedOption = data.find(
                  (option) => option.lokasyonId === e
                );
                if (!selectedOption) {
                  name ? setValue(name, "") : setValue("lokasyon", null);
                  codeName
                    ? setValue(codeName, 0)
                    : setValue("lokasyonId", null);
                }
              } else {
                const selectedOption = data.find(
                  (option) => option.lokasyonId === e
                );

                if (selectedOption) {
                  name
                    ? setValue(name, selectedOption.lokasyonTanim)
                    : setValue("lokasyon", selectedOption.lokasyonTanim);
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

Location.propTypes = {
  required: PropTypes.bool
};

export default Location;
