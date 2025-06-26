import React, { useState, useEffect } from "react";
import { Select, Spin, Input, Divider, Space, Button } from "antd";
import AxiosInstance from "../../../../../../../api/http";
import { useFormContext, Controller } from "react-hook-form";

const { Option } = Select;

const PlakaSelect = ({ filtersLabel }) => {
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
    AxiosInstance.get("Vehicle/GetVehiclePlates")
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
    if (filtersLabel?.plakaName && filtersLabel?.plakaID && options.length > 0) {
      const plakaIDs = filtersLabel.plakaID.split(",");
      console.log("PlakaSelect.jsx - Setting plaka IDs from filtersLabel:", plakaIDs);
      console.log("PlakaSelect.jsx - Original filtersLabel.plakaID:", filtersLabel.plakaID);

      setSelectedIds(plakaIDs);

      // Ensure plakaID form value is set
      setValue("plakaID", plakaIDs);
    }
  }, [filtersLabel, options, setValue]);

  return (
    <>
      <Controller
        name="plaka"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            mode="multiple"
            style={{ width: "250px" }}
            showSearch
            allowClear
            loading={loading}
            placeholder="Plaka Seçiniz"
            optionFilterProp="children"
            filterOption={(input, option) => (option.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
            options={options.map((item) => ({
              value: item.aracId.toString(),
              label: `${item.plaka} - ${item.lokasyon}${item.surucu ? ` (${item.surucu})` : ""}`,
            }))}
            value={loading ? [] : selectedIds}
            onChange={(value) => {
              console.log("PlakaSelect.jsx - Select onChange, new value:", value);
              setValue("plakaID", value);
              setSelectedIds(value);
              field.onChange(value);

              // Log current form values after update
              setTimeout(() => {
                console.log("PlakaSelect.jsx - Current form values after update:", {
                  plaka: getValues("plaka"),
                  plakaID: getValues("plakaID"),
                });
              }, 0);
            }}
          />
        )}
      />
      <Controller name="plakaID" control={control} render={({ field }) => <Input {...field} type="text" style={{ display: "none" }} />} />
    </>
  );
};

export default PlakaSelect;
