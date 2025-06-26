import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, DatePicker, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import IptalNedeni from "./IptalNedeni";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { Text, Link } = Typography;

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

export default function Forms({ isModalOpen, selectedRows, iptalDisabled }) {
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const { control, watch, setValue } = useFormContext();

  // Sil düğmesini gizlemek için koşullu stil
  const buttonStyle = iptalDisabled ? { display: "none" } : {};

  // sistemin o anki tarih ve saatini almak için

  useEffect(() => {
    if (isModalOpen) {
      const currentDate = dayjs(); // Şu anki tarih için dayjs nesnesi
      const currentTime = dayjs(); // Şu anki saat için dayjs nesnesi

      // Tarih ve saat alanlarını güncelle
      setValue("iptalTarihi", currentDate);
      setValue("iptalSaati", currentTime);

      // Tablodan seçilen kayıtların IST_KOD değerlerini birleştir
      const istKodlar = selectedRows.map((row) => row.IST_KOD).join(", ");
      setValue("fisNo", istKodlar); // "fisNo" alanını güncelle
    }
  }, [isModalOpen, setValue, selectedRows]);

  // sistemin o anki tarih ve saatini almak sonu

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın

  useEffect(() => {
    // Format the date based on the user's locale
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace("2021", "YYYY").replace("21", "DD").replace("11", "MM"));

    // Format the time based on the user's locale
    const timeFormatter = new Intl.DateTimeFormat(navigator.language, { hour: "numeric", minute: "numeric" });
    const sampleTime = new Date(2021, 10, 21, 13, 45); // Use a sample time, e.g., 13:45
    const formattedSampleTime = timeFormatter.format(sampleTime);

    // Check if the formatted time contains AM/PM, which implies a 12-hour format
    const is12HourFormat = /AM|PM/.test(formattedSampleTime);
    setLocaleTimeFormat(is12HourFormat ? "hh:mm A" : "HH:mm");
  }, []);

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın sonu

  return (
    <div style={buttonStyle}>
      <div style={{ marginBottom: "10px" }}>
        <Controller
          name="fisNo"
          control={control}
          render={({ field }) => (
            <Text {...field} style={{ fontSize: "14px", fontWeight: "600" }}>
              Fiş No: {field.value}
            </Text>
          )}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          maxWidth: "422px",
          gap: "10px",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}>
        <Text style={{ fontSize: "14px" }}>Kapatma Tarihi:</Text>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: "300px",
            minWidth: "300px",
            gap: "10px",
            width: "100%",
          }}>
          <Controller
            name="iptalTarihi"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "180px" }}
                disabled
                format={localeDateFormat}
                placeholder="Tarih seçiniz"
              />
            )}
          />
          <Controller
            name="iptalSaati"
            control={control}
            render={({ field }) => (
              <TimePicker
                {...field}
                changeOnScroll needConfirm={false}
                style={{ width: "110px" }}
                disabled
                format={localeTimeFormat}
                placeholder="Saat seçiniz"
              />
            )}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        <Text>Sonuç:</Text>
        <Controller
          name="iptalNeden"
          control={control}
          render={({ field }) => (
            <TextArea {...field} style={{ width: "100%", maxWidth: "350px" }} rows={4} placeholder="Sonuç Ekle" />
          )}
        />
      </div>
    </div>
  );
}
