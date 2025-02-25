import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, Divider, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";

const { Text, Link } = Typography;
const { TextArea } = Input;

export default function PositionListSelect({ positionList, disabled }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedAxle = watch("selectedAxle");

  const getPositionsByAxle = () => {
    if (!selectedAxle || !positionList) return [];

    if (selectedAxle === "onAks") {
      return positionList[0];
    }

    if (selectedAxle === "arkaAks") {
      return positionList[positionList.length - 1];
    }

    // ortaAks1, ortaAks2, etc. cases
    const axleNumber = parseInt(selectedAxle.replace("ortaAks", ""));
    if (!isNaN(axleNumber)) {
      return positionList[axleNumber] || [];
    }

    return [];
  };

  return (
    <div>
      <Controller
        name="selectedPosition"
        control={control}
        rules={{ required: true, message: t("alanBosBirakilamaz") }}
        render={({ field }) => (
          <Select
            {...field}
            disabled={disabled || !selectedAxle}
            status={errors.selectedPosition ? "error" : ""}
            style={{ width: "100%" }}
            placeholder={t("pozisyonSeciniz")}
            options={getPositionsByAxle()?.map((position) => ({
              value: position,
              label: t(position),
            }))}
          />
        )}
      />
      {errors.selectedPosition && <Text style={{ color: "red" }}>{errors.selectedPosition.message}</Text>}
    </div>
  );
}
