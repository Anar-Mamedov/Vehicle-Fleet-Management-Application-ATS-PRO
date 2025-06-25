import React, { useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  Button,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Checkbox,
  ColorPicker,
} from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import IsEmriTipi from "./components/IsEmriTipi";
import IsTalepTipi from "./components/IsTalepTipi";
import OncelikTablo from "./components/OncelikTablo";
dayjs.extend(customParseFormat);

const { Text, Link } = Typography;
const { TextArea } = Input;

const StyledInput = styled(Input)`
  @media (min-width: 600px) {
    max-width: 300px;
  }
  @media (max-width: 600px) {
    max-width: 300px;
  }
`;

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
`;

const StyledDivBottomLine = styled.div`
  @media (min-width: 600px) {
    align-items: center !important;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledDivMedia = styled.div`
  .anar {
    @media (min-width: 600px) {
      max-width: 300px;
      width: 100%;
    }
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function Ayarlar() {
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const { control, watch, setValue } = useFormContext();

  const handleOncelikMinusClick = () => {
    setValue("oncelikTanim", "");
    setValue("oncelikID", "");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <StyledDivBottomLine
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "500px",
          }}>
          <Text style={{ fontSize: "14px" }}>Varsayılan Öncelik:</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "300px",
            }}>
            <Controller
              name="oncelikTanim"
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
              name="oncelikID"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text" // Set the type to "text" for name input
                  style={{ display: "none" }}
                />
              )}
            />
            <OncelikTablo
              onSubmit={(selectedData) => {
                setValue("oncelikTanim", selectedData.subject);
                setValue("oncelikID", selectedData.key);
              }}
            />
            <Button onClick={handleOncelikMinusClick}> - </Button>
          </div>
        </StyledDivBottomLine>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "500px",
          gap: "10px",
          rowGap: "0px",
        }}>
        <Text style={{ fontSize: "14px" }}>Varsayılan İş Emri Tipi:</Text>
        <IsEmriTipi />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "500px",
          gap: "10px",
          rowGap: "0px",
        }}>
        <Text style={{ fontSize: "14px" }}>Varsayılan İş Talep Tipi:</Text>
        <IsTalepTipi />
      </div>
      <div style={{ display: "flex", width: "100%", maxWidth: "500px", justifyContent: "space-between" }}>
        <Text style={{ fontSize: "14px" }}>Talep Tarihi Değiştirile Bilsin:</Text>
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <Controller
            name="talepTarihiDegistirilebilir"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}></Checkbox>
            )}
          />
        </div>
      </div>
    </div>
  );
}
