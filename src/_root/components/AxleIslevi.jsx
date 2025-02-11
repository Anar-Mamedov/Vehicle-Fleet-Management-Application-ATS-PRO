import React from "react";
import { Select, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";

function AxleIslevi({ name1 }) {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const options = [
    { value: 1, label: t("tahrik") },
    { value: 2, label: t("yon") },
    { value: 3, label: t("serbest") },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Controller
        name={name1}
        control={control}
        render={({ field }) => <Select {...field} placeholder={t("secimYapiniz")} allowClear options={options} style={{ width: "100%" }} />}
      />
    </div>
  );
}

export default AxleIslevi;
