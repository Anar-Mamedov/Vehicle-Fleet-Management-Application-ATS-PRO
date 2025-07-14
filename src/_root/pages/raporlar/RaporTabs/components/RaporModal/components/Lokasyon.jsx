import React, { useState, useEffect } from "react";
import { Select, Spin, Input, Divider, Space, Button } from "antd";
import AxiosInstance from "../../../../../../../api/http";
import { useFormContext, Controller } from "react-hook-form";

const { Option } = Select;

const LocationFilter = ({ filtersLabel, setLokasyonID1, lokasyonID1 }) => {
  const [options, setOptions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  // Önce options'ları yükle
  useEffect(() => {
    setLoading(true);
    AxiosInstance.get("Location/GetLocationList")
      .then((response) => {
        setOptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("API Error:", error);
        setLoading(false);
      });
  }, []);

  // Options yüklendikten sonra filtersLabel değerlerini set et
  useEffect(() => {
    if (filtersLabel?.LokasyonName && filtersLabel?.LokasyonID && options.length > 0) {
      const lokasyonIDs = filtersLabel.LokasyonID.split(",");
      console.log("Lokasyon.jsx - Setting lokasyon IDs from filtersLabel:", lokasyonIDs);
      console.log("Lokasyon.jsx - Original filtersLabel.LokasyonID:", filtersLabel.LokasyonID);

      setSelectedIds(lokasyonIDs);

      // Ensure lokasyonID form value is set
      setValue("lokasyonID", lokasyonIDs);
    }
  }, [filtersLabel, options, setValue]);

  return (
    <>
      <Controller
        name="lokasyon"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            mode="multiple"
            style={{ width: "250px" }}
            showSearch
            allowClear
            loading={loading}
            placeholder="Lokasyon Seçiniz"
            optionFilterProp="children"
            filterOption={(input, option) => (option.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            options={options.map((item) => ({
              value: item.lokasyonId.toString(),
              label: item.lokasyonTanim,
            }))}
            value={loading ? [] : selectedIds}
            onChange={(value) => {
              console.log("Lokasyon.jsx - Select onChange, new value:", value);

              // Önce form değerlerini güncelle
              setValue("lokasyonID", value);
              setSelectedIds(value);
              field.onChange(value);

              // Seçilen lokasyonların isimlerini de güncelle
              const selectedNames = value
                .map((id) => {
                  const option = options.find((opt) => opt.lokasyonId.toString() === id);
                  return option ? option.lokasyonTanim : "";
                })
                .filter((name) => name);

              setValue("lokasyon", selectedNames);

              // Log current form values after update
              setTimeout(() => {
                console.log("Lokasyon.jsx - Current form values after update:", {
                  lokasyon: getValues("lokasyon"),
                  lokasyonID: getValues("lokasyonID"),
                });
              }, 0);
            }}
          />
        )}
      />
      <Controller name="lokasyonID" control={control} render={({ field }) => <Input {...field} type="text" style={{ display: "none" }} />} />
    </>
  );
};

export default LocationFilter;
