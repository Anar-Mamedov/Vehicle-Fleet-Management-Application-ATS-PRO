import React, { useEffect } from "react";
import { Input, Select, Space } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export default function Onay() {
  const { control, watch, setValue } = useFormContext();

  const onayID = watch("onayID");

  const options = [
    { value: "1", label: "Bekliyor" },
    { value: "2", label: "Onaylandı" },
    { value: "3", label: "Onaylanmadı" },
  ];

  // onayID değiştiğinde bu fonksiyon çalışır
  useEffect(() => {
    const onayIDString = String(onayID);
    const selectedOption = options.find((option) => option.value === onayIDString);
    if (selectedOption) {
      setValue("onay", selectedOption.value, { shouldValidate: true });
      setValue("onayLabel", selectedOption.label);
    }
  }, [onayID, setValue]);

  const handleChange = (value) => {
    setValue("onay", value);
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setValue("onayID", selectedOption.value);
      setValue("onayLabel", selectedOption.label);
    } else {
      setValue("onayID", "");
      setValue("onayLabel", "");
    }
  };

  return (
    <>
      <Controller
        name="onay"
        control={control}
        render={({ field }) => <Select {...field} allowClear placeholder="Seçim Yapınız" style={{ width: "100%", maxWidth: "300px" }} onChange={handleChange} options={options} />}
      />
      <Controller
        name="onayID"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text" // Set the type to "text" for name input
            style={{ display: "none" }}
          />
        )}
      />
      <Controller
        name="onayLabel"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text" // Set the type to "text" for name input
            style={{ display: "none" }}
          />
        )}
      />
    </>
  );
}
