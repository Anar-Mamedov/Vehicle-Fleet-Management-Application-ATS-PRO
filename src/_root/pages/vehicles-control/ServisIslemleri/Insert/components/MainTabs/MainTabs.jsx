import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import ServisKoduTablo from "./components/ServisKoduTablo.jsx";
import styled from "styled-components";
import PlakaSelectBox from "../../../../../../../_root/components/PlakaSelectbox";
import Surucu from "./components/Surucu.jsx";
import ServisNedeni from "./components/ServisNedeni.jsx";
import dayjs from "dayjs";
import HasarNoTablo from "./components/HasarNoTablo.jsx";
import Onay from "./components/Onay.jsx";
import Maliyetler from "./components/Maliyetler.jsx";
import SecondTabs from "../SecondTabs/SecondTabs.jsx";
import IslemYapanTablo from "./components/IslemYapanTablo.jsx";

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
  const [selectboxTitle, setSelectboxTitle] = useState("Yetkili Servis");

  const handleMinusClick = () => {
    setValue("servisKodu", "");
    setValue("servisKoduID", "");
    setValue("servisTanimi", "");
    setValue("servisTipi", "");
    setValue("servisTipiID", "");
  };

  const handleHasarNoMinusClick = () => {
    setValue("hasarNo", "");
    setValue("hasarNoID", "");
  };
  const handleIslemiYapan1MinusClick = () => {
    setValue("islemiYapan1", "");
    setValue("islemiYapan1ID", "");
  };

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

  return (
    <div style={{ display: "flex", marginBottom: "15px", flexDirection: "column", gap: "10px", width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "450px" }}>
          <div style={{ width: "100%", maxWidth: "450px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px", fontWeight: "600" }}>Plaka:</Text>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column wrap",
                  alignItems: "flex-start",
                  width: "100%",
                  maxWidth: "300px",
                }}
              >
                <PlakaSelectBox
                  name1="Plaka"
                  isRequired={true}
                  onChange={(value, option) => {
                    // Plaka seçildiğinde sürücü bilgilerini otomatik set et
                    if (option && option.data) {
                      setValue("Surucu", option.data.surucu);
                      setValue("SurucuID", option.data.surucuId);
                    } else {
                      // Plaka değeri silindiğinde marka ve model alanlarını temizle
                      setValue("Surucu", null);
                      setValue("SurucuID", null);
                    }
                  }}
                />
              </div>
            </StyledDivBottomLine>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px" }}>
            <Text style={{ fontSize: "14px", fontWeight: "600" }}>Servis Kodu:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="servisKodu"
                control={control}
                rules={{ required: "Alan Boş Bırakılamaz!" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    status={errors.servisKodu ? "error" : ""}
                    type="text" // Set the type to "text" for name input
                    style={{ width: "215px" }}
                    disabled
                  />
                )}
              />

              <Controller
                name="servisKoduID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />
              <ServisKoduTablo
                onSubmit={(selectedData) => {
                  setValue("servisKodu", selectedData.bakimKodu);
                  setValue("servisKoduID", selectedData.key);
                  setValue("servisTanimi", selectedData.tanim);
                  setValue("servisTipi", selectedData.servisTipi);
                  setValue("servisTipiID", selectedData.servisTipiKodId);
                  setValue("periyodikBilgisi", selectedData.periyodik);
                }}
              />
              <Button onClick={handleMinusClick}> - </Button>
              {errors.servisKodu && <div style={{ color: "red", marginTop: "5px" }}>{errors.servisKodu.message}</div>}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
            <Text style={{ fontSize: "14px" }}>Servis Tanımı:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller name="servisTanimi" control={control} render={({ field }) => <Input {...field} disabled style={{ flex: 1 }} />} />
            </div>
          </div>

          <div style={{ width: "100%", maxWidth: "450px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px" }}>Sürücü:</Text>
              <Surucu />
            </StyledDivBottomLine>
          </div>
          <div style={{ width: "100%", maxWidth: "450px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px" }}>Servis Nedeni:</Text>
              <ServisNedeni />
            </StyledDivBottomLine>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "450px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
            <Text style={{ fontSize: "14px" }}>{selectboxTitle}:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="islemiYapan1"
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
                name="islemiYapan1ID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />
              <IslemYapanTablo
                onSubmit={(selectedData) => {
                  setValue("islemiYapan1", selectedData.column1);
                  setValue("islemiYapan1ID", selectedData.key);
                }}
              />
              <Button onClick={handleIslemiYapan1MinusClick}> - </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
            <Text style={{ fontSize: "14px" }}>Fatura No:</Text>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                maxWidth: "300px",
                minWidth: "300px",
                gap: "10px",
                width: "100%",
              }}
            >
              <Controller name="faturaNo" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "450px", gap: "10px", width: "100%", justifyContent: "space-between" }}>
            <Text style={{ fontSize: "14px" }}>Fatura Tarihi:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "180px", gap: "10px", width: "100%" }}>
              <Controller
                name="faturaTarihi"
                control={control}
                render={({ field }) => <DatePicker {...field} style={{ width: "300px" }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
              />
            </div>
          </div>
          <div style={{ width: "100%", maxWidth: "450px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px" }}>Onay:</Text>
              <Onay />
            </StyledDivBottomLine>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "10px" }}></div>
    </div>
  );
}
