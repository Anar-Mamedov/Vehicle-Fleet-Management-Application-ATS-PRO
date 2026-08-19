import React, { useContext, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetFuelCardContentByIdService } from "../../../../api/services/vehicles/yakit/services";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Plaka = ({ name, codeName, required, onSubmit, placeholder = "" }) => {
  const { plaka, setData } = useContext(PlakaContext);
  const { setValue, control, watch } = useFormContext();
  const [plateList, setPlateList] = useState([]);

  useEffect(() => {
    const aracId = watch("aracId");
    if (aracId) {
      GetFuelCardContentByIdService(aracId).then((res) => {
        setData(res.data);
      });
    }
  }, [watch("aracId"), setData]);

  const handleChange = (e) => {
    const aracId = watch("aracId");
    if (aracId) {
      GetFuelCardContentByIdService(aracId).then((res) => {
        setData(res.data);
        // If onSubmit is provided, call it with the response data
        if (onSubmit && typeof onSubmit === "function") {
          onSubmit(res.data);
        }
      });
    }
    setValue("aracId", e);
  };

  const handleClick = async () => {
    // Yine plaka'nın array olup olmadığını kontrol edelim
    if (Array.isArray(plaka) && plaka.length === 0) {
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
      render={({ field, fieldState }) => {
        // Seçili değeri FormContext'ten izliyoruz
        const selectedValue = name ? watch(name) : watch("plaka");

        // plaka bir array mi? Değilse boş array olarak kullanalım
        const plakaArray = Array.isArray(plaka) ? plaka : [];

        // Seçenekleri oluştururken koşullu şekilde plaka veya plateList'i gösteriyoruz
        const options =
          plakaArray.length === 0
            ? plateList.map((item) => ({
                label: item.plaka,
                value: item.id,
              }))
            : plakaArray.map((item) => ({
                label: item.plaka,
                value: item.id,
              }));

        return (
          <>
            <Select
              {...field}
              showSearch
              allowClear
              placeholder={placeholder}
              optionFilterProp="children"
              className={fieldState.error ? "input-error" : ""}
              value={selectedValue}
              filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
              filterSort={(optionA, optionB) => (optionA?.label.toLowerCase() ?? "").localeCompare(optionB?.label.toLowerCase() ?? "")}
              options={options}
              onClick={handleClick}
              onChange={(value) => {
                field.onChange(value);
                handleChange(value);

                if (value === undefined) {
                  // Seçim temizlenmişse
                  const selectedOption = plakaArray.find((option) => option.id === value);
                  if (!selectedOption) {
                    // Temizlendiğinde boş string yazılırsa antd alanı dolu sayar ve placeholder görünmez; her zaman null yazılır
                    name ? setValue(name, null) : setValue("plaka", null);
                    setData([]);
                    // If onSubmit is provided, call it with null to clear data
                    if (onSubmit && typeof onSubmit === "function") {
                      onSubmit(null);
                    }
                  }
                } else {
                  // Seçilen plakaya göre form value güncelle
                  const selectedOption = plakaArray.find((option) => option.id === value);
                  if (selectedOption) {
                    name ? setValue(name, selectedOption.plaka) : setValue("plaka", selectedOption.plaka);
                  }
                  // Seçilen plaka ek veriye sahipse (lokasyonId vb.) kaydet
                  const selectedPlate = plateList.find((option) => option.id === value);
                  if (selectedPlate) {
                    if ("lokasyonId" in selectedPlate) {
                      setValue("lokasyonIdFromPlaka", selectedPlate.lokasyonId);
                    }
                    // If onSubmit is provided, call it with the selected plate data
                    if (onSubmit && typeof onSubmit === "function") {
                      onSubmit(selectedPlate);
                    }
                  }
                }
              }}
              // plaka tek elemanlı bir array ise disabled olsun
              disabled={Array.isArray(plaka) && plakaArray.length === 1}
            />
            {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
          </>
        );
      }}
    />
  );
};

Plaka.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  codeName: PropTypes.string,
  required: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default Plaka;
