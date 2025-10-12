import React, { useEffect, useState } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, message } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import AxiosInstance from "../../../../../../api/http";
import PlakaSelectBox from "../../../../../../_root/components/PlakaSelectbox";
import SurucuSelectbox from "../../../../../../_root/components/SurucuSelectbox";
import TextInput from "../../../../../../_root/components/form/inputs/TextInput";
import CheckboxInput from "../../../../../../_root/components/form/checkbox/CheckboxInput";
import KodIDSelectbox from "../../../../../components/KodIDSelectbox";
import LokasyonTablo from "../../../../../components/form/LokasyonTable";
import ModalInput from "../../../../../components/form/inputs/ModalInput";
import { PlusOutlined } from "@ant-design/icons";
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

export default function MainTabs({ modalOpen, onHasarNoValidationChange }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [selectboxTitle, setSelectboxTitle] = useState("Yetkili Servis");
  const [initialFisNo, setInitialFisNo] = useState("");
  const [isFisNoModified, setIsFisNoModified] = useState(false);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  const [initialHasarNo, setInitialHasarNo] = useState("");
  const [isHasarNoModified, setIsHasarNoModified] = useState(false);
  const [hasarNoValidationStatus, setHasarNoValidationStatus] = useState(null); // null, 'valid', 'invalid'

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

  // Add validation function for hasarNo
  const validateHasarNo = async (value) => {
    if (!value) {
      setHasarNoValidationStatus(null);
      onHasarNoValidationChange && onHasarNoValidationChange(null);
      return;
    }
    try {
      const response = await AxiosInstance.post("TableCodeItem/IsCodeItemExist", {
        tableName: "HasarTakibi",
        code: value,
      });

      if (response.data.status === false) {
        setHasarNoValidationStatus("valid");
        onHasarNoValidationChange && onHasarNoValidationChange("valid");
      } else {
        setHasarNoValidationStatus("invalid");
        onHasarNoValidationChange && onHasarNoValidationChange("invalid");
        message.error("Hasar numarası geçerli değildir!");
      }
    } catch (error) {
      console.error("Error checking hasarNo validity:", error);
      setHasarNoValidationStatus("invalid");
      onHasarNoValidationChange && onHasarNoValidationChange("invalid");
      message.error("Hasar numarası kontrolü sırasında hata oluştu!");
    }
  };

  // Add validation function for fisNo
  const validateFisNo = async (value) => {
    if (!value) return;
    try {
      const response = await AxiosInstance.post("TableCodeItem/IsCodeItemExist", {
        tableName: "Fis",
        code: value,
      });

      if (response.data.status === true) {
        message.error("Fiş numarası benzersiz değildir!");
        setValue("fisNo", "");
      }
    } catch (error) {
      console.error("Error checking fisNo uniqueness:", error);
      message.error("Fiş numarası kontrolü sırasında hata oluştu!");
    }
  };

  const handleYeniLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };
  const handleYeniLokasyonMinusClick = () => {
    setValue("lokasyon", null);
    setValue("lokasyonID", null);
  };

  return (
    <div style={{ display: "flex", marginBottom: "20px", flexDirection: "row", gap: "10px", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "350px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>
            {t("hasarNo")}
            <div style={{ color: "red" }}>*</div>
          </Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <Controller
              name="hasarNo"
              control={control}
              rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors["hasarNo"] ? "error" : hasarNoValidationStatus === "invalid" ? "error" : ""}
                  style={{
                    flex: 1,
                    borderColor: hasarNoValidationStatus === "valid" ? "#52c41a" : hasarNoValidationStatus === "invalid" ? "#ff4d4f" : errors["hasarNo"] ? "#ff4d4f" : "",
                  }}
                  onFocus={(e) => {
                    setInitialHasarNo(e.target.value);
                    setIsHasarNoModified(false);
                    setHasarNoValidationStatus(null);
                    onHasarNoValidationChange && onHasarNoValidationChange(null);
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value !== initialHasarNo) {
                      setIsHasarNoModified(true);
                    }
                    setHasarNoValidationStatus(null);
                    onHasarNoValidationChange && onHasarNoValidationChange(null);
                  }}
                  onBlur={(e) => {
                    field.onBlur(e);
                    if (isHasarNoModified) {
                      validateHasarNo(e.target.value);
                    }
                  }}
                />
              )}
            />
            {errors["hasarNo"] && <div style={{ color: "red", marginTop: "5px" }}>{errors["hasarNo"].message}</div>}
            {hasarNoValidationStatus === "invalid" && <div style={{ color: "red", marginTop: "5px" }}>Hasar numarası geçerli değildir!</div>}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>
            {t("plaka")}
            <div style={{ color: "red" }}>*</div>
          </Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <PlakaSelectBox
              name1="plaka"
              isRequired={true}
              onChange={(value, option) => {
                // Plaka seçildiğinde sürücü bilgilerini otomatik set et
                if (option && option.data) {
                  setValue("surucu", option.data.surucu);
                  setValue("surucuID", option.data.surucuId);
                  setValue("marka", option.data.marka);
                  setValue("model", option.data.model);
                } else {
                  // Plaka değeri silindiğinde marka ve model alanlarını temizle
                  setValue("marka", null);
                  setValue("model", null);
                }
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("model")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <TextInput name="model" isRequired={false} readonly={true} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("hasarTipi")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <KodIDSelectbox name1="hasarTipi" kodID={907} isRequired={false} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("olayYeri")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <KodIDSelectbox name1="olayYeri" kodID={906} isRequired={false} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "350px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "400px",
              gap: "10px",
              flexDirection: "row",
            }}
          >
            <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>
              {t("tarih")}
              <div style={{ color: "red" }}>*</div>
            </Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                maxWidth: "220px",
                justifyContent: "space-between",
              }}
            >
              <Controller
                name="tarih"
                control={control}
                rules={{ required: t("alanBosBirakilamaz") }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    status={errors["tarih"] ? "error" : ""}
                    style={{ width: "100%", maxWidth: "130px" }}
                    format={localeDateFormat}
                    onChange={(date) => {
                      field.onChange(date);
                      setValue("tarih", date);
                    }}
                  />
                )}
              />
              <Controller
                name="saat"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    style={{ width: "100%", maxWidth: "85px" }}
                    format={localeTimeFormat}
                    onChange={(date) => {
                      field.onChange(date);
                      setValue("saat", date);
                    }}
                  />
                )}
              />
              {errors["tarih"] && <div style={{ color: "red", marginTop: "5px" }}>{errors["tarih"].message}</div>}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("marka")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <TextInput name="marka" isRequired={false} readonly={true} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("surucu")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <SurucuSelectbox name1="surucu" isRequired={false} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("hasarBoyutu")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <KodIDSelectbox name1="hasarBoyutu" kodID={909} isRequired={false} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("hasarliBolge")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <KodIDSelectbox name1="hasarliBolge" kodID={908} isRequired={false} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "330px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("lokasyon")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <ModalInput name="lokasyon" readonly={true} required={false} onPlusClick={handleYeniLokasyonPlusClick} onMinusClick={handleYeniLokasyonMinusClick} />
            <LokasyonTablo
              onSubmit={(selectedData) => {
                setValue("lokasyon", selectedData.location);
                setValue("lokasyonID", selectedData.key);
              }}
              isModalVisible={isLokasyonModalOpen}
              setIsModalVisible={setIsLokasyonModalOpen}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("policeNo")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "220px",
            }}
          >
            <TextInput name="policeNo" isRequired={false} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            height: "32px",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("aracKullanilabilir")}</Text>

          <CheckboxInput name="aracKullanilabilir" isRequired={false} />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            height: "32px",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("kazayaKarisanBaskaAracVar")}</Text>

          <CheckboxInput name="kazayaKarisanBaskaAracVar" isRequired={false} />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            height: "32px",
            width: "100%",
            maxWidth: "400px",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("polisRaporuVar")}</Text>

          <CheckboxInput name="polisRaporuVar" isRequired={false} />
        </div>
      </div>
    </div>
  );
}
