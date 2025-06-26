import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, ColorPicker, Switch } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import RolSelectBox from "./components/RolSelectBox";
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
    getValues,
    formState: { errors },
  } = useFormContext();
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [isimValue, setIsimValue] = useState("");
  const [soyisimValue, setSoyisimValue] = useState("");

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

  // sistemin o anki tarih ve saatini almak için

  useEffect(() => {
    if (modalOpen) {
      const currentDate = dayjs(); // Şu anki tarih için dayjs nesnesi
      const currentTime = dayjs(); // Şu anki saat için dayjs nesnesi

      // Tarih ve saat alanlarını güncelle
      setTimeout(() => {
        setValue("duzenlenmeTarihi", currentDate);
        setValue("duzenlenmeSaati", currentTime);
      }, 50);
    }
  }, [modalOpen, setValue]);

  // sistemin o anki tarih ve saatini almak sonu

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

  const updateParaf = (isim, soyisim) => {
    const paraf = `${isim?.[0] || ""}${soyisim?.[0] || ""}`;
    setValue("paraf", paraf);
  };

  // console.log(watch("color")?.toHexString?.());

  return (
    <div style={{ display: "flex", marginBottom: "15px", flexDirection: "column", gap: "10px", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("hesabinDurumunuAktifVeYaPasifYap")}</Text>
        <Controller name="aktif" control={control} render={({ field }) => <Switch {...field} />} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("rolTanimi")}</Text>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            minWidth: "300px",
            gap: "10px",
            width: "100%",
          }}
        >
          <RolSelectBox />
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px", width: "100%", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4", display: "flex" }}>
            {t("kullaniciKodu")}
            <div style={{ color: "red" }}>*</div>
          </Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Controller
              name="kullaniciKod"
              control={control}
              rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => <Input {...field} status={errors.kullaniciKod ? "error" : ""} style={{ flex: 1 }} />}
            />
            {errors.kullaniciKod && <div style={{ color: "red", marginTop: "5px" }}>{errors.kullaniciKod.message}</div>}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4", display: "flex" }}>
            {t("sifre")}
            <div style={{ color: "red" }}>*</div>
          </Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Controller
              name="sifre"
              control={control}
              // rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => <Input {...field} status={errors.sifre ? "error" : ""} style={{ flex: 1 }} />}
            />
            {errors.sifre && <div style={{ color: "red", marginTop: "5px" }}>{errors.sifre.message}</div>}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px", width: "100%", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4", display: "flex" }}>
            {t("isim")}
            <div style={{ color: "red" }}>*</div>
          </Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Controller
              name="isim"
              control={control}
              rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    const value = e.target.value;
                    setIsimValue(value);
                    updateParaf(value, soyisimValue);
                  }}
                  status={errors.isim ? "error" : ""}
                  style={{ flex: 1 }}
                />
              )}
            />
            {errors.isim && <div style={{ color: "red", marginTop: "5px" }}>{errors.isim.message}</div>}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("soyisim")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller
              name="soyisim"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    const value = e.target.value;
                    setSoyisimValue(value);
                    updateParaf(isimValue, value);
                  }}
                  style={{ flex: 1 }}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px", width: "100%", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("telefon")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="telefonNo" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("mail")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="mail" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px", width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("paraf")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="paraf" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("kullaniciRengi")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller
              name="color"
              control={control}
              render={({ field }) => {
                const { ref, ...rest } = field;
                return <ColorPicker {...rest} showText allowClear />;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
