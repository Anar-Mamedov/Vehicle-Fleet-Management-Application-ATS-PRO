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

export default function TakiliLastikListesi({ axleList, positionList }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px" }}>
        <Text style={{ fontSize: "14px" }}>{t("installedTires")}</Text>
        <Button type="link" onClick={handleOpenModal}>
          {t("add")}
        </Button>
      </div>
      <div style={{ padding: "20px" }}></div>

      <Modal title={t("lastikTak")} open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800}>
        <LastikTak axleList={axleList} positionList={positionList} />
      </Modal>
    </div>
  );
}
