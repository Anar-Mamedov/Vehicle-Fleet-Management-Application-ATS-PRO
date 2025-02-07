import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import KodIDSelectbox from "../../../../../../components/KodIDSelectbox";
import AxleIslevi from "../../../../../../components/AxleIslevi";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";

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
  const aksSayisiValue = watch("aksSayisi");
  const aksSayisiNumber = parseInt(aksSayisiValue, 10);
  const dynamicCount = !isNaN(aksSayisiNumber) && aksSayisiNumber > 2 ? aksSayisiNumber - 2 : 0;
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format

  // duzenlenmeTarihi ve duzenlenmeSaati alanlarının boş ve ye sistem tarih ve saatinden büyük olup olmadığını kontrol etmek için bir fonksiyon

  const validateDateTime = (value) => {
    const date = watch("duzenlenmeTarihi");
    const time = watch("duzenlenmeSaati");
    if (!date || !time) {
      return "Alan Boş Bırakılamaz!";
    }
    const currentTime = dayjs();
    const inputDateTime = dayjs(`${dayjs(date).format("YYYY-MM-DD")} ${dayjs(time).format("HH:mm")}`);
    if (inputDateTime.isAfter(currentTime)) {
      return "Düzenlenme tarihi ve saati mevcut tarih ve saatten büyük olamaz";
    }
    return true;
  };

  // duzenlenmeTarihi ve duzenlenmeSaati alanlarının boş ve ye sistem tarih ve saatinden büyük olup olmadığını kontrol etmek için bir fonksiyon sonu

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

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "370px", gap: "10px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "370px", gap: "10px", rowGap: "0px" }}>
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>
            {t("aksTanimi")}
            <div style={{ color: "red" }}>*</div>
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "flex-start",
              maxWidth: "250px",
              minWidth: "250px",
              width: "100%",
            }}
          >
            <Controller
              name="aksTanimi"
              control={control}
              rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => <Input {...field} status={errors["aksTanimi"] ? "error" : ""} style={{ flex: 1 }} />}
            />
            {errors["aksTanimi"] && <div style={{ color: "red", marginTop: "5px" }}>{errors["aksTanimi"].message}</div>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            justifyContent: "space-between",
            gap: "8px",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: "14px", display: "flex" }}>{t("tip")}</Text>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "250px",
              flexDirection: "column",
            }}
          >
            <KodIDSelectbox name1="tip" isRequired={false} kodID="892" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "370px",
            gap: "10px",
            rowGap: "0px",
          }}
        >
          <Text style={{ fontSize: "14px" }}>{t("aksSayisi")}</Text>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "250px", minWidth: "250px", gap: "10px", width: "100%" }}>
            <Controller name="aksSayisi" control={control} render={({ field }) => <InputNumber {...field} min={2} max={6} style={{ flex: 1 }} />} />
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "370px",
            gap: "10px",
            rowGap: "0px",
          }}
        >
          <Text style={{ fontSize: "14px" }}>{t("onAxle")}</Text>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", maxWidth: "250px", minWidth: "250px", gap: "10px", width: "100%" }}>
            <Controller name="onAxle" control={control} render={({ field }) => <InputNumber {...field} min={1} max={2} style={{ width: "100px" }} />} />
            <AxleIslevi name1="onAxleIslevTipi" />
          </div>
        </div>

        {dynamicCount > 0 &&
          Array.from({ length: dynamicCount }).map((_, idx) => (
            <div
              key={`dynamic-axle-${idx}`}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "370px",
                gap: "10px",
                rowGap: "0px",
              }}
            >
              <Text style={{ fontSize: "14px" }}>
                {t("aks")} {idx + 1}
              </Text>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", maxWidth: "250px", minWidth: "250px", gap: "10px", width: "100%" }}>
                <Controller name={`${idx + 1}`} control={control} defaultValue={1} render={({ field }) => <InputNumber {...field} min={1} max={2} style={{ width: "100px" }} />} />
                <AxleIslevi name1={`${idx + 1}IslevTipi`} />
              </div>
            </div>
          ))}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "370px",
            gap: "10px",
            rowGap: "0px",
          }}
        >
          <Text style={{ fontSize: "14px" }}>{t("arkaAxle")}</Text>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", maxWidth: "250px", minWidth: "250px", gap: "10px", width: "100%" }}>
            <Controller name="arkaAxle" control={control} render={({ field }) => <InputNumber {...field} min={1} max={2} style={{ width: "100px" }} />} />
            <AxleIslevi name1="arkaAxleIslevTipi" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px", width: "100%" }}>
          <Text style={{ fontSize: "14px" }}>{t("aciklama")}</Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "flex-start",
              maxWidth: "250px",
              minWidth: "250px",
              width: "100%",
            }}
          >
            <Controller name="aciklama" control={control} render={({ field }) => <TextArea {...field} style={{ flex: 1 }} />} />
          </div>
        </div>
      </div>
      <div style={{ width: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
        <div style={{ display: "flex", position: "absolute", left: "140px", top: "0px", flexDirection: "column", alignItems: "center", height: "100%" }}>
          <div style={{ width: "7px", minHeight: "30px", backgroundColor: "rgba(255, 255, 255, 1)" }}></div>
          <div style={{ width: "7px", height: "100%", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>
          <div style={{ width: "7px", minHeight: "30px", backgroundColor: "rgba(255, 255, 255, 1)" }}></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0px 10px", marginBottom: "120px" }}>
          {/* Left side wheels based on onAxle value */}
          {Array.from({ length: watch("onAxle") || 1 }).map((_, idx) => (
            <div
              key={`left-wheel-${idx}`}
              style={{
                minWidth: "42px",
                height: "67px",
                backgroundColor: "#0078C2",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
            </div>
          ))}

          <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>

          {/* Right side wheels based on onAxle value */}
          {Array.from({ length: watch("onAxle") || 1 }).map((_, idx) => (
            <div
              key={`right-wheel-${idx}`}
              style={{
                minWidth: "42px",
                height: "67px",
                backgroundColor: "#0078C2",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Dynamic rows based on aksSayisi */}
          {dynamicCount > 0 &&
            Array.from({ length: dynamicCount }).map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0px 10px",
                }}
              >
                {/* Left side wheels based on rowIndex value */}
                {Array.from({ length: watch(`${rowIndex + 1}`) || 1 }).map((_, idx) => (
                  <div
                    key={`left-wheel-${idx}`}
                    style={{
                      minWidth: "42px",
                      height: "67px",
                      backgroundColor: "#0078C2",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
                  </div>
                ))}
                <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>
                {/* Right side wheels based on rowIndex value */}
                {Array.from({ length: watch(`${rowIndex + 1}`) || 1 }).map((_, idx) => (
                  <div
                    key={`right-wheel-${idx}`}
                    style={{
                      minWidth: "42px",
                      height: "67px",
                      backgroundColor: "#0078C2",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
                  </div>
                ))}
              </div>
            ))}
          {/* arka axle için */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0px 10px" }}>
            {/* Left side wheels based on arkaAxle value */}
            {Array.from({ length: watch("arkaAxle") || 1 }).map((_, idx) => (
              <div
                key={`left-wheel-${idx}`}
                style={{
                  minWidth: "42px",
                  height: "67px",
                  backgroundColor: "#0078C2",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
              </div>
            ))}

            <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>

            {/* Right side wheels based on arkaAxle value */}
            {Array.from({ length: watch("arkaAxle") || 1 }).map((_, idx) => (
              <div
                key={`right-wheel-${idx}`}
                style={{
                  minWidth: "42px",
                  height: "67px",
                  backgroundColor: "#0078C2",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
