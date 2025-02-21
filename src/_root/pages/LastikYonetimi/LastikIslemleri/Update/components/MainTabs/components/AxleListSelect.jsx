import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, Divider, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";

const { Text, Link } = Typography;
const { TextArea } = Input;

export default function AxleListSelect({ axleList }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        name="selectedAxle"
        control={control}
        rules={{ required: true, message: t("alanBoşBırakılamaz") }}
        render={({ field }) => (
          <Select
            {...field}
            status={errors.selectedAxle ? "error" : ""}
            style={{ width: "100%" }}
            placeholder={t("Aks Seçiniz")}
            options={axleList?.map((axle) => ({
              value: axle,
              label: t(axle),
            }))}
          />
        )}
      />
      {errors.selectedAxle && <Text style={{ color: "red" }}>{errors.selectedAxle.message}</Text>}
    </div>
  );
}
