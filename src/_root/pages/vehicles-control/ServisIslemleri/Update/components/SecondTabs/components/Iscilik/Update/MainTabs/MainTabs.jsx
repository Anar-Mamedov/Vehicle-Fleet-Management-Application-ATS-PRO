import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, DatePicker, TimePicker, Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import ServisKoduTablo from "../../../../../MainTabs/components/ServisKoduTablo.jsx";
import YapilanIsTable from "./components/YapilanIsTable.jsx";
import PersonelTable from "./components/PersonelTable.jsx";
import { SearchOutlined } from "@ant-design/icons";
import IsTipi from "./components/IsTipi.jsx";
import NumberInput from "../../../../../../../../../../components/form/inputs/NumberInput.jsx";

const { Text, Link } = Typography;
const { TextArea } = Input;

const StyledDivBottomLine = styled.div`
  @media (min-width: 600px) {
    align-items: center !important;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const onChange = (key) => {
  // console.log(key);
};

//styled components
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin: 0 !important;
    width: fit-content;
    padding: 10px 15px;
    justify-content: center;
    background-color: rgba(230, 230, 230, 0.3);
  }

  .ant-tabs-tab-active {
    background-color: #2bc77135;
  }

  .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:not(:first-child) {
    border-left: 1px solid #80808024;
  }

  .ant-tabs-ink-bar {
    background: #2bc770;
  }
`;

//styled components end
export default function MainTabs({ isApiUpdate }) {
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const { control, watch, setValue, getValues } = useFormContext();

  const handleYapilanIsMinusClick = () => {
    setValue("yapilanIs", "");
    setValue("yapilanIsID", "");
    setValue("iscilikUcreti", 0);
    setValue("saat", "");
    setValue("dakika", "");
    setValue("isTipi", null);
    setValue("isTipiID", "");
    setValue("toplam", 0);

    // KDV, indirim ve toplam değerlerini sıfırla veya yeniden hesapla
    recalculateIndirimOrani(0, indirimYuzde);
    recalculateToplam(0, 0, kdvOrani);
  };

  const handlePersonelMinusClick = () => {
    setValue("personel", "");
    setValue("personelID", "");
  };

  const items = [
    {
      key: "1",
      label: "Açıklama",
      children: <Controller name="aciklama" control={control} render={({ field }) => <TextArea {...field} rows={4} />} />,
    },
  ];

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
    const timeFormatter = new Intl.DateTimeFormat(navigator.language, { hour: "numeric", minute: "numeric" });
    const sampleTime = new Date(2021, 10, 21, 13, 45); // Use a sample time, e.g., 13:45
    const formattedSampleTime = timeFormatter.format(sampleTime);

    // Check if the formatted time contains AM/PM, which implies a 12-hour format
    const is12HourFormat = /AM|PM/.test(formattedSampleTime);
    setLocaleTimeFormat(is12HourFormat ? "hh:mm A" : "HH:mm");
  }, []);

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın sonu

  // iki tarih ve saat arasında geçen süreyi hesaplamak için

  const watchFields = watch(["baslangicTarihi", "baslangicSaati", "bitisTarihi", "bitisSaati"]);

  useEffect(() => {
    const [baslangicTarihi, baslangicSaati, bitisTarihi, bitisSaati] = watchFields;
    if (baslangicTarihi && baslangicSaati && bitisTarihi && bitisSaati) {
      const baslangicZamani = dayjs(baslangicTarihi).hour(baslangicSaati.hour()).minute(baslangicSaati.minute());
      const bitisZamani = dayjs(bitisTarihi).hour(bitisSaati.hour()).minute(bitisSaati.minute());

      const sure = bitisZamani.diff(baslangicZamani, "minute");
      setValue("sure", sure > 0 ? sure : 0);
    }
  }, [watchFields, setValue]);

  // iki tarih ve saat arasında geçen süreyi hesaplamak için sonu

  const iscilikUcreti = watch("iscilikUcreti") || 0;
  const indirimYuzde = watch("indirimYuzde") || 0;
  const indirimOrani = watch("indirimOrani") || 0;
  const kdvOrani = watch("kdvOrani") || 0;

  const handleIscilikUcretiChange = (value) => {
    setValue("iscilikUcreti", value);
    const updatedIndirimOrani = recalculateIndirimOrani(value, indirimYuzde);
    recalculateToplam(value, updatedIndirimOrani, kdvOrani);
  };

  const handleIndirimYuzdeChange = (value) => {
    setValue("indirimYuzde", value);
    const updatedIndirimOrani = recalculateIndirimOrani(iscilikUcreti, value);
    recalculateToplam(iscilikUcreti, updatedIndirimOrani, kdvOrani);
  };

  const handleIndirimOraniChange = (value) => {
    setValue("indirimOrani", value);
    recalculateIndirimYuzde(iscilikUcreti, value);
    recalculateToplam(iscilikUcreti, value, kdvOrani);
  };

  const handleKdvOraniChange = (value) => {
    setValue("kdvOrani", value);
    recalculateToplam(iscilikUcreti, indirimOrani, value);
  };

  const handleKdvDegeriChange = (value) => {
    setValue("kdvDegeri", value);

    // Recalculate KDV oranı based on the new KDV değeri
    const values = getValues();
    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;
    const remainingAmount = iscilikUcreti - (indirimOrani || 0);

    if (remainingAmount > 0 && value > 0) {
      const newKdvOrani = (value / remainingAmount) * 100;
      setValue("kdvOrani", newKdvOrani);
    }

    // Update final total
    const kdvDegeri = value || 0;
    const finalAmount = remainingAmount + kdvDegeri;
    setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
  };

  const recalculateIndirimOrani = (iscilikUcreti, indirimYuzde) => {
    const calculatedIndirimOrani = (iscilikUcreti * indirimYuzde) / 100;
    const safeValue = isNaN(calculatedIndirimOrani) ? 0 : calculatedIndirimOrani;
    if (!isApiUpdate) {
      setValue("indirimOrani", safeValue);
    }
    return safeValue;
  };

  const recalculateIndirimYuzde = (iscilikUcreti, indirimOrani) => {
    const calculatedIndirimYuzde = (indirimOrani / iscilikUcreti) * 100;
    const safeValue = isNaN(calculatedIndirimYuzde) ? 0 : calculatedIndirimYuzde;
    if (!isApiUpdate) {
      setValue("indirimYuzde", safeValue);
    }
    return safeValue;
  };

  const recalculateToplam = (iscilikUcreti, indirimOrani, kdvOrani) => {
    if (!iscilikUcreti || iscilikUcreti <= 0) {
      setValue("kdvDegeri", 0);
      setValue("toplam", 0);
    } else {
      const remainingAmount = iscilikUcreti - (indirimOrani || 0);
      const kdv = remainingAmount * (kdvOrani / 100);
      const finalAmount = remainingAmount + kdv;

      setValue("kdvDegeri", isNaN(kdv) ? 0 : kdv);
      setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", columnGap: "10px", flexWrap: "wrap" }}>
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "450px",
              gap: "10px",
              rowGap: "0px",
              marginBottom: "10px",
            }}
          >
            <Text style={{ fontSize: "14px", fontWeight: "600" }}>Plaka:</Text>
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
              <Controller
                name="plaka"
                control={control}
                rules={{ required: "Alan Boş Bırakılamaz!" }}
                render={({ field, fieldState: { error } }) => (
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
                    <Input {...field} status={error ? "error" : ""} disabled style={{ flex: 1 }} />
                    {error && <div style={{ color: "red" }}>{error.message}</div>}
                  </div>
                )}
              />
              <Controller
                name="aracID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px", fontWeight: "600" }}>Yapılan İş:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="yapilanIs"
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
                name="yapilanIsID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />
              <YapilanIsTable
                onSubmit={(selectedData) => {
                  setValue("yapilanIs", selectedData.tanim);
                  setValue("yapilanIsID", selectedData.key);
                  setValue("iscilikUcreti", selectedData.ucret);
                  setValue("saat", selectedData.saat);
                  setValue("dakika", selectedData.dakika);
                  setValue("isTipi", selectedData.isTip);
                  setValue("isTipiID", selectedData.isTipKodId);

                  // Yeni değerleri güncelledikten sonra hesaplamaları tetikleyin
                  recalculateIndirimOrani(selectedData.ucret, indirimYuzde);
                  recalculateToplam(selectedData.ucret, indirimOrani, kdvOrani);
                }}
              />
              <Button onClick={handleYapilanIsMinusClick}> - </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Personel:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="personel"
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
                name="personelID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />
              <PersonelTable
                onSubmit={(selectedData) => {
                  setValue("personel", selectedData.isim);
                  setValue("personelID", selectedData.key);
                }}
              />
              <Button onClick={handlePersonelMinusClick}> - </Button>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>İş Tipi:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <IsTipi />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Saat-Dakika:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="saat" style={{ flex: 1 }} min={0} />
              <NumberInput name="dakika" style={{ flex: 1 }} min={0} />
            </div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>İşçilik Ücreti:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="iscilikUcreti" style={{ flex: 1 }} min={0} formatSection="stok" formatType="tutar" onChange={(value) => handleIscilikUcretiChange(value)} />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>KDV Oranı %:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="kdvOrani" style={{ flex: 1 }} prefix={true} min={0} max={100} formatSection="stok" formatType="tutar" onChange={(value) => handleKdvOraniChange(value)} />
              <NumberInput name="kdvDegeri" style={{ flex: 1 }} formatSection="stok" formatType="tutar" onChange={(value) => handleKdvDegeriChange(value)} />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>İndirim %:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="indirimYuzde" style={{ flex: 1 }} prefix={true} min={0} formatSection="stok" formatType="tutar" onChange={(value) => handleIndirimYuzdeChange(value)} />
              <NumberInput name="indirimOrani" style={{ flex: 1 }} formatSection="stok" formatType="tutar" onChange={(value) => handleIndirimOraniChange(value)} />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Toplam:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="toplam" style={{ flex: 1 }} checked={true} formatSection="stok" formatType="tutar" />
            </div>
          </div>
        </div>
      </div>
      <StyledTabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
