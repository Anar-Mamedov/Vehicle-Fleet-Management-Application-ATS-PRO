import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, Divider, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import LastikTak from "../../components/LastikTak";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";

const { Text, Link } = Typography;
const { TextArea } = Input;

export default function TakiliLastikListesi() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px" }}>
        <Text style={{ fontSize: "14px" }}>{t("installedTires")}</Text>
        <Button type="link">{t("add")}</Button>
      </div>
      <div style={{ padding: "20px" }}></div>
    </div>
  );
}
