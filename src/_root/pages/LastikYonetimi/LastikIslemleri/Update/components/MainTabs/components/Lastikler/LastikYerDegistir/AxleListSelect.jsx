import React from "react";
import { Typography, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";

const { Text } = Typography;

export default function AxleListSelect({ axleList, name = "selectedAxle", onPositionChange }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: true, message: t("alanBosBirakilamaz") }}
        render={({ field }) => (
          <Select
            {...field}
            onChange={(value) => {
              field.onChange(value);
              if (onPositionChange) {
                onPositionChange(value);
              }
            }}
            status={errors[name] ? "error" : ""}
            style={{ width: "100%" }}
            placeholder={t("aksSeciniz")}
            options={axleList?.map((axle) => ({
              value: axle,
              label: t(axle),
            }))}
          />
        )}
      />
      {errors[name] && <Text style={{ color: "red" }}>{errors[name].message}</Text>}
    </div>
  );
}
