import React, { useEffect } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import SigortaPolicesi from "./components/SigortaPolicesi.jsx";

const { Text, Link } = Typography;
const { TextArea } = Input;

function Sigorta(props) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleSigortaPolicesiMinusClick = () => {
    setValue("sigorta", "");
    setValue("sigortaID", "");
    setValue("policeNo", "");
    setValue("firma", "");
  };

  const policeNo = watch("policeNo");
  const firma = watch("firma");

  useEffect(() => {
    if (watch("sigortaBilgileri") === false) {
      setValue("sigorta", "");
      setValue("sigortaID", "");
      setValue("policeNo", "");
      setValue("firma", "");
    }
  }, [watch("sigortaBilgileri")]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Controller
        name="sigortaBilgileri"
        control={control}
        render={({ field }) => (
          <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
            Sigorta Bilgileri
          </Checkbox>
        )}
      />
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px" }}>
        <Text style={{ fontSize: "14px" }}>Sigorta Poliçesi:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
          <Controller
            name="sigorta"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text" // Set the type to "text" for name input
                style={{ width: "215px" }}
                disabled
              />
            )}
          />
          <Controller
            name="sigortaID"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text" // Set the type to "text" for name input
                style={{ display: "none" }}
              />
            )}
          />
          <SigortaPolicesi
            onSubmit={(selectedData) => {
              setValue("sigorta", selectedData.sigorta);
              setValue("sigortaID", selectedData.key);
              setValue("policeNo", selectedData.policeNo);
              setValue("firma", selectedData.firma);
            }}
          />
          <Button onClick={handleSigortaPolicesiMinusClick}> - </Button>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px" }}>
        <Text style={{ fontSize: "14px" }}>Poliçe No:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
          <Text style={{ fontSize: "14px" }}>{policeNo}</Text>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px" }}>
        <Text style={{ fontSize: "14px" }}>Firma:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
          <Text style={{ fontSize: "14px" }}>{firma}</Text>
        </div>
      </div>
    </div>
  );
}

export default Sigorta;
