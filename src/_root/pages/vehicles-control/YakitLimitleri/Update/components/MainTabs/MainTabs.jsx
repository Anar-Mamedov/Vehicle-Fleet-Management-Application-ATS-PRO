import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, message } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import AxiosInstance from "../../../../../../../api/http";
import PlakaSelectBox from "../../../../../../../_root/components/PlakaSelectbox";
import SurucuSelectbox from "../../../../../../../_root/components/SurucuSelectbox";
import DonemSelect from "../../../../../../../_root/components/DonemSelect";
import NumberInput from "../../../../../../../_root/components/form/inputs/NumberInput";

const { Text, Link } = Typography;
const { TextArea } = Input;

const StyledInput = styled(Input)`
  @media (min-width: 600px) {
    max-width: 720px;
  }
  @media (max-width: 600px) {
    max-width: 300px;
  }
`;

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    width: 100%;
    max-width: 720px;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
`;

const StyledDivBottomLine = styled.div`
  @media (min-width: 600px) {
    alignitems: "center";
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledDivMedia = styled.div`
  .anar {
    @media (min-width: 600px) {
      max-width: 720px;
      width: 100%;
    }
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function MainTabs({ modalOpen }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Intl.DateTimeFormat kullanarak tarih formatlama
  const formatDate = (date) => {
    if (!date) return "";

    // Örnek bir tarih formatla ve ay formatını belirle
    const sampleDate = new Date(2021, 0, 21); // Ocak ayı için örnek bir tarih
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes("January")) {
      monthFormat = "long"; // Tam ad ("January")
    } else if (sampleFormatted.includes("Jan")) {
      monthFormat = "short"; // Üç harfli kısaltma ("Jan")
    } else {
      monthFormat = "2-digit"; // Sayısal gösterim ("01")
    }

    // Kullanıcı için tarihi formatla
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: monthFormat,
      day: "2-digit",
    });
    return formatter.format(new Date(date));
  };

  const formatTime = (time) => {
    if (!time || time.trim() === "") return ""; // `trim` metodu ile baştaki ve sondaki boşlukları temizle

    try {
      // Saati ve dakikayı parçalara ayır, boşlukları temizle
      const [hours, minutes] = time
        .trim()
        .split(":")
        .map((part) => part.trim());

      // Saat ve dakika değerlerinin geçerliliğini kontrol et
      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      if (isNaN(hoursInt) || isNaN(minutesInt) || hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
        throw new Error("Invalid time format");
      }

      // Geçerli tarih ile birlikte bir Date nesnesi oluştur ve sadece saat ve dakika bilgilerini ayarla
      const date = new Date();
      date.setHours(hoursInt, minutesInt, 0);

      // Kullanıcının lokal ayarlarına uygun olarak saat ve dakikayı formatla
      // `hour12` seçeneğini belirtmeyerek Intl.DateTimeFormat'ın kullanıcının yerel ayarlarına göre otomatik seçim yapmasına izin ver
      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "2-digit",
        // hour12 seçeneği burada belirtilmiyor; böylece otomatik olarak kullanıcının sistem ayarlarına göre belirleniyor
      });

      // Formatlanmış saati döndür
      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return ""; // Hata durumunda boş bir string döndür
    }
  };

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın

  useEffect(() => {
    // Format the date based on the user's locale
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace("2021", "YYYY").replace("21", "DD").replace("11", "MM"));

    // Format the time based on the user's locale
    const timeFormatter = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
    });
    const sampleTime = new Date(2021, 10, 21, 13, 45); // Use a sample time, e.g., 13:45
    const formattedSampleTime = timeFormatter.format(sampleTime);

    // Check if the formatted time contains AM/PM, which implies a 12-hour format
    const is12HourFormat = /AM|PM/.test(formattedSampleTime);
    setLocaleTimeFormat(is12HourFormat ? "hh:mm A" : "HH:mm");
  }, []);

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın sonu

  const watchedPlaka = watch("plaka");
  const watchedSurucu = watch("surucu");
  const hasPlaka = !!watchedPlaka;
  const hasSurucu = !!watchedSurucu;
  const isPlakaRequired = !hasSurucu;
  const isSurucuRequired = !hasPlaka;

  return (
    <div style={{ display: "flex", marginBottom: "20px", flexDirection: "column", gap: "10px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          gap: "10px",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("plaka")}</Text>
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <PlakaSelectBox name1="plaka" isRequired={isPlakaRequired} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          gap: "10px",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("surucu")}</Text>
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <SurucuSelectbox name1="surucu" isRequired={isSurucuRequired} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexFlow: "wrap",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("donem")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <DonemSelect name1="donem" isRequired={true} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "wrap",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("yakitLimiti")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <NumberInput name="limit" isRequired={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
