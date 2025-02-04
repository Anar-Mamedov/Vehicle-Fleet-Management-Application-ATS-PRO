import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Typography, message, InputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../../../../../api/http.jsx";
import OzelAlan9 from "./components/OzelAlan9.jsx";
import OzelAlan10 from "./components/OzelAlan10.jsx";

const { Text } = Typography;

function OzelAlanlar(props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedField, setClickedField] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [customFieldNames, setCustomFieldNames] = useState([]);

  const showModal = (field) => {
    setClickedField(field);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await AxiosInstance.post(`/CustomField/AddCustomFieldTopic?form=SERVİS&topic=${inputValue}&field=${clickedField}`);
      setIsModalVisible(false);
      setInputValue("");
      if (response.data.statusCode === 200) {
        message.success("Ekleme Başarılı");
        nameOfField();
      }
    } catch (error) {
      console.error("API request failed: ", error);
      message.error("Ekleme Başarısız");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setInputValue("");
  };

  const nameOfField = async () => {
    try {
      const response = await AxiosInstance.get(`CustomField/GetCustomFields?form=SERVİS`);
      setCustomFieldNames(response.data);
    } catch (error) {
      console.error("API request failed: ", error);
    }
  };

  useEffect(() => {
    nameOfField();
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_1")}>
            {customFieldNames?.ozelAlan1}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan1" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_2")}>
            {customFieldNames?.ozelAlan2}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan2" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_3")}>
            {customFieldNames?.ozelAlan3}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan3" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_4")}>
            {customFieldNames?.ozelAlan4}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan4" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_5")}>
            {customFieldNames?.ozelAlan5}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan5" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_6")}>
            {customFieldNames?.ozelAlan6}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan6" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_7")}>
            {customFieldNames?.ozelAlan7}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan7" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_8")}>
            {customFieldNames?.ozelAlan8}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan8" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_9")}>
            {customFieldNames?.ozelAlan9}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <OzelAlan9 />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_10")}>
            {customFieldNames?.ozelAlan10}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <OzelAlan10 />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_11")}>
            {customFieldNames?.ozelAlan11}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan11" control={control} render={({ field }) => <InputNumber {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => showModal("OZELALAN_12")}>
            {customFieldNames?.ozelAlan12}:
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
            <Controller name="ozelAlan12" control={control} render={({ field }) => <InputNumber {...field} style={{ flex: 1 }} />} />
          </div>
        </div>
      </div>
      <Modal title="Özel Alan Girişi" open={isModalVisible} centered onOk={handleOk} onCancel={handleCancel}>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Değer giriniz" />
      </Modal>
    </div>
  );
}

export default OzelAlanlar;
