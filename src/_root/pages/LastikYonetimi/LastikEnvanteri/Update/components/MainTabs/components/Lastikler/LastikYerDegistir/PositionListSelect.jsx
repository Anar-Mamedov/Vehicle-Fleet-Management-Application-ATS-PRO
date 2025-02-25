import React from "react";
import { Typography, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";

const { Text } = Typography;

export default function PositionListSelect({ positionList, name = "selectedPosition", onPositionChange }) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const axleFieldName = name.replace("selectedPosition", "selectedAxle");
  const selectedAxle = watch(axleFieldName);

  const getPositionsByAxle = () => {
    if (!selectedAxle || !positionList) return [];

    if (selectedAxle === "onAks") {
      return positionList[0];
    }

    if (selectedAxle === "arkaAks") {
      return positionList[positionList.length - 1];
    }

    const axleNumber = parseInt(selectedAxle.replace("ortaAks", ""));
    if (!isNaN(axleNumber)) {
      return positionList[axleNumber] || [];
    }

    return [];
  };

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
            disabled={!selectedAxle}
            status={errors[name] ? "error" : ""}
            style={{ width: "100%" }}
            placeholder={t("pozisyonSeciniz")}
            options={getPositionsByAxle()?.map((position) => ({
              value: position,
              label: t(position),
            }))}
          />
        )}
      />
      {errors[name] && <Text style={{ color: "red" }}>{errors[name].message}</Text>}
    </div>
  );
}
