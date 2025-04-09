import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import ServisKoduTablo from "./components/ServisKoduTablo.jsx";
import styled from "styled-components";
import Plaka from "./components/Plaka.jsx";
import dayjs from "dayjs";

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
  const [selectboxTitle, setSelectboxTitle] = useState("");
  const [sum, setSum] = useState("0 km");
  const [sum1, setSum1] = useState("");

  const islemiYapan = watch("islemiYapan");

  useEffect(() => {
    if (islemiYapan === "1") {
      setSelectboxTitle("Yetkili Servis");
    } else if (islemiYapan === "2") {
      setSelectboxTitle("Bakım Departmanı");
    }
  }, [islemiYapan]);

  const herGunInput = watch("herGunInput");
  const herTarihi = watch("herTarihi");

  useEffect(() => {
    if (herGunInput && herTarihi) {
      const targetDate = dayjs(herTarihi).add(herGunInput, "day");
      setSum1(targetDate.format("DD/MM/YYYY"));
      setValue("hedefTarih", targetDate.format("YYYY-MM-DD"));
    }
  }, [herGunInput, herTarihi]);

  useEffect(() => {
    setValue("islemiYapan1", "");
    setValue("islemiYapan1ID", "");
  }, [islemiYapan, setValue]);

  const handleMinusClick = () => {
    setValue("servisKodu", "");
    setValue("servisKoduID", "");
    setValue("servisTanimi", "");
    setValue("servisTipi", "");
    setValue("servisTipiID", "");
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

  const herKmInput = watch("herKmInput");
  const herKmInput2 = watch("herKmInput2");

  useEffect(() => {
    const calculateSum = () => {
      // Check if either input is null, undefined, or empty
      if (herKmInput === undefined || herKmInput === null || herKmInput === "" || herKmInput2 === undefined || herKmInput2 === null || herKmInput2 === "") {
        setSum("");
        setValue("hedefKm", "");
      } else {
        const value1 = Number(herKmInput) || 0;
        const value2 = Number(herKmInput2) || 0;
        setSum(`${value1 + value2} km`);
        setValue("hedefKm", `${value1 + value2}`);
      }
    };

    calculateSum();
  }, [herKmInput, herKmInput2]);

  const herKm = watch("herKm");
  const herGun = watch("herGun");

  return (
    <div style={{ display: "flex", marginBottom: "15px", flexDirection: "column", gap: "10px", width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "450px" }}>
          <div style={{ display: "flex", width: "100%", maxWidth: "400px", alignItems: "center", gap: "10px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px", fontWeight: "600" }}>Plaka:</Text>
              <Plaka />
            </StyledDivBottomLine>
            <Controller
              name="aktif"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Aktif
                </Checkbox>
              )}
            />
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
                  setValue("herKmInput", selectedData.km);
                  setValue("herGunInput", selectedData.gun);

                  // Set herKm to true if selectedData.km has a value
                  if (selectedData.km != null && selectedData.km !== "") {
                    setValue("herKm", true);
                  } else {
                    // Optionally, set herKm to false if km is null or empty
                    setValue("herKm", false);
                  }

                  // Set herGun to true if selectedData.gun has a value
                  if (selectedData.gun != null && selectedData.gun !== "") {
                    setValue("herGun", true);
                  } else {
                    // Optionally, set herGun to false if gun is null or empty
                    setValue("herGun", false);
                  }
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
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", gap: "10px", rowGap: "0px" }}>
            <Text style={{ fontSize: "14px" }}>Servis Tipi:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller name="servisTipi" control={control} render={({ field }) => <Input {...field} disabled style={{ flex: 1 }} />} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", border: "1px solid #00000024", borderRadius: "5px", padding: "5px", width: "100%", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Controller
                name="herKm"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                    Her
                  </Checkbox>
                )}
              />
              <Controller
                name="herKmInput"
                control={control}
                rules={{
                  validate: (value) => {
                    if (herKm && (value === undefined || value === null || value === "")) {
                      return "Bu alan boş bırakılamaz!";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <InputNumber {...field} disabled={!herKm} style={{ flex: 1, maxWidth: "150px" }} addonAfter="km" status={error ? "error" : ""} />
                  </>
                )}
              />

              <Text>Son Uygulama</Text>
              <Controller
                name="herKmInput2"
                control={control}
                rules={{
                  validate: (value) => {
                    if (herKm && (value === undefined || value === null || value === "")) {
                      return "Bu alan boş bırakılamaz!";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <InputNumber {...field} disabled={!herKm} style={{ flex: 1, maxWidth: "150px" }} status={error ? "error" : ""} />
                  </>
                )}
              />

              <Text>Hedef</Text>
              <Text>{sum}</Text>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Controller
                name="herGun"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                    Her
                  </Checkbox>
                )}
              />
              <Controller
                name="herGunInput"
                control={control}
                rules={{
                  validate: (value) => {
                    if (herGun && (value === undefined || value === null || value === "")) {
                      return "Bu alan boş bırakılamaz!";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <InputNumber {...field} disabled={!herGun} style={{ flex: 1, maxWidth: "150px" }} status={error ? "error" : ""} addonAfter="gün" />
                  </>
                )}
              />
              <Text>Son Uygulama</Text>
              <Controller
                name="herTarihi"
                control={control}
                rules={{
                  validate: (value) => {
                    if (herGun && (value === undefined || value === null || value === "")) {
                      return "Bu alan boş bırakılamaz!";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker {...field} disabled={!herGun} style={{ width: "150px" }} status={error ? "error" : ""} format={localeDateFormat} placeholder="Tarih seçiniz" />
                  </>
                )}
              />
              <Text>Hedef</Text>
              <Text>{sum1}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
