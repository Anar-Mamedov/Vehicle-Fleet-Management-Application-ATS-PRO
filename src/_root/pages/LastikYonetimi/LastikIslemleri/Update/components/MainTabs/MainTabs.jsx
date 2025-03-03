import React, { useEffect, useState, useCallback } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, Divider, Modal } from "antd";
import { PlusOutlined, LockOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import KodIDSelectbox from "../../../../../../components/KodIDSelectbox";
import AxleIslevi from "../../../../../../components/AxleIslevi";
import LastikTak from "./components/LastikTak";
import AxleTanimlamaHizliIslem from "../MainTabs/components/AxleTanimlamaHizliIslem/AxleTanimlamaHizliIslem";
import TakiliLastikListesi from "./components/Lastikler/TakiliLastikListesi";
import styled from "styled-components";
import ContextMenu from "./components/Lastikler/ContextMenu/ContextMenu1.jsx";
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

const TireImage = styled.img`
  height: 80px;
`;

const ContextMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  .ant-popover-inner {
    padding: 8px 0;
    min-width: 150px;
  }

  .ant-popover-arrow {
    display: none !important;
  }
`;

const ContextMenuWrapper = styled.div`
  .tire-context-menu {
    .ant-popover-inner {
      padding: 0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .ant-popover-arrow {
      display: none;
    }
  }
`;

export default function MainTabs({ onRefresh1, selectedRow, selectedAracDetay }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [selectedWheel, setSelectedWheel] = useState(null);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [axleList, setAxleList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [fetchInstalledTiresRef, setFetchInstalledTiresRef] = useState(null);
  const [tirePositionMapping, setTirePositionMapping] = useState({});
  const [groupedTiresApiResponse, setGroupedTiresApiResponse] = useState({});
  const [contextMenuVisible, setContextMenuVisible] = useState({});
  const [selectedTirePosition, setSelectedTirePosition] = useState(null);

  const aksSayisiValue = watch("aksSayisi");
  const aksSayisiNumber = parseInt(aksSayisiValue, 10);
  const dynamicCount = !isNaN(aksSayisiNumber) && aksSayisiNumber > 2 ? aksSayisiNumber - 2 : 0;
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");

  // Create a memoized array of watch values for middle axles based on actual dynamicCount
  const middleAxleValues = React.useMemo(() => {
    return Array.from({ length: dynamicCount }, (_, i) => watch(`${i + 1}`));
  }, [watch, dynamicCount]);

  // Add useEffect to update axleList and positionList based on axle configuration
  useEffect(() => {
    const newAxleList = [];
    const newPositionList = [];

    // Ön aks için tekerlek pozisyonlarını ekle
    const onAxleWheelCount = watch("onAxle") || 1;
    newAxleList.push("onAks");
    if (onAxleWheelCount === 1) {
      newPositionList.push(["LO", "RO"]); // 2 tekerli
    } else {
      newPositionList.push(["LO", "LI", "RI", "RO"]); // 4 tekerli
    }

    // Orta akslar için tekerlek pozisyonlarını ekle
    for (let i = 0; i < dynamicCount; i++) {
      const middleAxleWheelCount = middleAxleValues[i] || 1;
      newAxleList.push(`ortaAks${i + 1}`);
      if (middleAxleWheelCount === 1) {
        newPositionList.push(["LO", "RO"]); // 2 tekerli
      } else {
        newPositionList.push(["LO", "LI", "RI", "RO"]); // 4 tekerli
      }
    }

    // Arka aks için tekerlek pozisyonlarını ekle
    const arkaAxleWheelCount = watch("arkaAxle") || 1;
    newAxleList.push("arkaAks");
    if (arkaAxleWheelCount === 1) {
      newPositionList.push(["LO", "RO"]); // 2 tekerli
    } else {
      newPositionList.push(["LO", "LI", "RI", "RO"]); // 4 tekerli
    }

    setAxleList(newAxleList);
    setPositionList(newPositionList);
  }, [aksSayisiValue, dynamicCount, watch("onAxle"), watch("arkaAxle"), middleAxleValues]);

  const handleWheelClick = (position, axleIndex, side, isInnerWheel = false) => {
    let wheelPosition;

    // Determine axle position text
    const axlePosition = position === "on" ? "onAks" : position === "middle" ? `ortaAks${axleIndex + 1}` : "arkaAks";

    // Get the number of wheels for this axle based on its position
    let wheelCount;
    if (position === "on") {
      wheelCount = watch("onAxle") || 1;
    } else if (position === "middle") {
      wheelCount = watch(`${axleIndex + 1}`) || 1;
    } else {
      wheelCount = watch("arkaAxle") || 1;
    }

    // Her aks için 2 veya 4 tekerlek olabilir
    // 2 tekerli aks: LO, RO
    // 4 tekerli aks: LO, LI, RI, RO
    if (side === "left") {
      if (wheelCount === 1) {
        // 2 tekerli aks için sol taraf
        wheelPosition = "LO";
      } else {
        // 4 tekerli aks için sol taraf
        wheelPosition = isInnerWheel ? "LI" : "LO";
      }
    } else {
      if (wheelCount === 1) {
        // 2 tekerli aks için sağ taraf
        wheelPosition = "RO";
      } else {
        // 4 tekerli aks için sağ taraf
        wheelPosition = isInnerWheel ? "RI" : "RO";
      }
    }

    setSelectedWheel({
      position,
      axleIndex,
      side,
      axlePosition,
      wheelPosition,
      isInnerWheel,
    });

    // Set the selected tire position for highlighting in the list
    setSelectedTirePosition({
      axlePosition,
      wheelPosition,
    });

    setShouldOpenModal(true);
  };

  const renderWheel = (position, axleIndex, side, isInnerWheel = false) => {
    // Get wheel count for this axle
    let wheelCount;
    if (position === "on") {
      wheelCount = watch("onAxle") || 1;
    } else if (position === "middle") {
      wheelCount = watch(`${axleIndex + 1}`) || 1;
    } else {
      wheelCount = watch("arkaAxle") || 1;
    }

    // İç tekerlek sadece wheelCount > 1 olduğunda gösterilir
    if (isInnerWheel && wheelCount === 1) {
      return null;
    }

    // Determine axle position text
    const axlePosition = position === "on" ? "onAks" : position === "middle" ? `ortaAks${axleIndex + 1}` : "arkaAks";

    // Determine wheel position
    let wheelPosition;
    if (side === "left") {
      wheelPosition = wheelCount === 1 ? "LO" : isInnerWheel ? "LI" : "LO";
    } else {
      wheelPosition = wheelCount === 1 ? "RO" : isInnerWheel ? "RI" : "RO";
    }

    // Check if this position exists in tirePositionMapping
    const hasPosition = tirePositionMapping[axlePosition]?.includes(wheelPosition);
    const tireData = groupedTiresApiResponse?.[axlePosition]?.[wheelPosition];

    return hasPosition ? (
      <div
        key={`${side}-wheel-${isInnerWheel ? "inner" : "outer"}-${axleIndex}`}
        style={{
          minWidth: "42px",
          height: "67px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          marginLeft: isInnerWheel ? "5px" : "0",
          marginRight: isInnerWheel ? "5px" : "0",
          position: "relative",
        }}
        className="tire-element"
      >
        <ContextMenu
          tire={tireData}
          axleList={axleList}
          positionList={positionList}
          refreshList={fetchInstalledTiresRef}
          selectedAracDetay={selectedAracDetay}
          onClose={() => setContextMenuVisible((prev) => ({ ...prev, [`${axlePosition}-${wheelPosition}`]: false }))}
          anchorEl={
            <div
              onClick={(e) => {
                e.stopPropagation();
                const wheelId = `${axlePosition}-${wheelPosition}`;
                setContextMenuVisible((prev) => ({ [wheelId]: true }));
                // Set the selected tire position when clicking on a tire
                setSelectedTirePosition({
                  axlePosition,
                  wheelPosition,
                });
                /* console.log("Tıklanan Lastik Verisi:", tireData); */
              }}
            >
              <TireImage src="/images/lastik2.png" alt="Tire" />
            </div>
          }
        />
      </div>
    ) : (
      <div
        key={`${side}-wheel-${isInnerWheel ? "inner" : "outer"}-${axleIndex}`}
        style={{
          minWidth: "42px",
          height: "67px",
          backgroundColor: "#0078C2",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          marginLeft: isInnerWheel ? "5px" : "0",
          marginRight: isInnerWheel ? "5px" : "0",
        }}
        onClick={() => handleWheelClick(position, axleIndex, side, isInnerWheel)}
      >
        <PlusOutlined style={{ fontSize: "14px", color: "white" }} />
      </div>
    );
  };

  const renderWheels = (position, axleIndex, side) => {
    // Get wheel count for this axle
    let wheelCount;
    if (position === "on") {
      wheelCount = watch("onAxle") || 1;
    } else if (position === "middle") {
      wheelCount = watch(`${axleIndex + 1}`) || 1;
    } else {
      wheelCount = watch("arkaAxle") || 1;
    }

    // wheelCount > 1 ise 2 tekerlek (iç ve dış) göster
    return (
      <div style={{ display: "flex", gap: "5px" }}>
        {wheelCount > 1 ? (
          // 4 tekerli aks için 2 tekerlek göster
          side === "left" ? (
            // Sol taraf: Önce dış (LO), sonra iç (LI)
            <>
              {renderWheel(position, axleIndex, side, false)} {/* LO */}
              {renderWheel(position, axleIndex, side, true)} {/* LI */}
            </>
          ) : (
            // Sağ taraf: Önce iç (RI), sonra dış (RO)
            <>
              {renderWheel(position, axleIndex, side, true)} {/* RI */}
              {renderWheel(position, axleIndex, side, false)} {/* RO */}
            </>
          )
        ) : (
          // 2 tekerli aks için 1 tekerlek göster
          renderWheel(position, axleIndex, side, false)
        )}
      </div>
    );
  };

  // If aksId is 0, show a message component
  if (selectedRow?.aksId === 0) {
    const renderExampleAxle = (color) => (
      <div
        style={{
          width: "120px",
          height: "120px",
          border: `1px solid ${color === "green" ? "#E3F3E6" : "#F5F5F5"}`,
          borderRadius: "8px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: color === "green" ? "#E3F3E6" : "#F5F5F5",
        }}
      >
        {/* Üst tekerlekler */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              width: "20px",
              height: "32px",
              backgroundColor: color === "green" ? "#2BC770" : "#E0E0E0",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "20px",
              height: "32px",
              backgroundColor: color === "green" ? "#2BC770" : "#E0E0E0",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Alt tekerlekler */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              width: "20px",
              height: "32px",
              backgroundColor: color === "green" ? "#2BC770" : "#E0E0E0",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              width: "20px",
              height: "32px",
              backgroundColor: color === "green" ? "#2BC770" : "#E0E0E0",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    );

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          gap: "32px",
          padding: "40px 20px",
        }}
      >
        {/* Aks şemaları */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {renderExampleAxle("green")}
          {renderExampleAxle("grey")}
          {renderExampleAxle("green")}
          {renderExampleAxle("grey")}
          {renderExampleAxle("green")}
          {renderExampleAxle("grey")}
        </div>

        <Text style={{ fontSize: "16px", color: "#666" }}>{t("Set up this vehicle's axle configuration to begin managing tires.")}</Text>

        <AxleTanimlamaHizliIslem
          selectedRows={selectedRow}
          onRefresh1={onRefresh1}
          refreshTableData={() => {
            // Burada gerekirse sayfayı yenilemek için bir callback eklenebilir
          }}
          buttonStyle={{
            backgroundColor: "#0078C2",
            height: "40px",
            borderRadius: "6px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "14px",
          }}
          buttonText={t("Set up axle configuration")}
        />
      </div>
    );
  }

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
      // `hour12` seçeneğini belirtmeyerek Intl.DateTimeFormat'ın kullanıcının sistem ayarlarına göre otomatik seçim yapmasına izin ver
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

  // Add this function to update the ref
  const handleFetchInstalledTiresRef = useCallback((fetchFunction) => {
    setFetchInstalledTiresRef(() => fetchFunction);
  }, []);

  // Add useEffect to handle document click to clear selection
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Check if the click is outside of any tire element
      const isTireClick = e.target.closest(".tire-element") || e.target.closest(".selected") || e.target.closest(".ant-popover");

      if (!isTireClick && selectedTirePosition) {
        setSelectedTirePosition(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [selectedTirePosition]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "100%" }}>
        <div style={{ display: "none", flexDirection: "column", width: "370px", gap: "10px" }}>
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
              <Controller name="aksSayisi" control={control} render={({ field }) => <InputNumber {...field} min={2} style={{ flex: 1 }} />} />
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
                  <Controller
                    name={`${idx + 1}`}
                    control={control}
                    defaultValue={1}
                    render={({ field }) => <InputNumber {...field} min={1} max={2} style={{ width: "100px" }} />}
                  />
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
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            border: "1px solid #d2d2d2",
            width: "50%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px" }}>
            <Text style={{ fontSize: "14px" }}>{t("axleConfiguration")}</Text>
            {Object.keys(tirePositionMapping).length === 0 ? (
              <AxleTanimlamaHizliIslem
                selectedRows={selectedRow}
                onRefresh1={onRefresh1}
                refreshTableData={() => {
                  // Burada gerekirse sayfayı yenilemek için bir callback eklenebilir
                }}
                buttonStyle={{
                  height: "32px",
                  borderRadius: "6px",
                  padding: "0 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1677FF",
                  fontSize: "14px",
                }}
                buttonText={t("duzenle")}
              />
            ) : (
              <Button type="link" style={{ color: "#b2afaf", fontSize: "14px" }} icon={<LockOutlined />} disabled={true}>
                {t("duzenle")}
              </Button>
            )}
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: "14px", fontWeight: "600", textAlign: "center" }}>{watch("aksTanimi")}</Text>
              <Text style={{ fontSize: "11px", fontWeight: "400", textAlign: "center", color: "#00000079" }}>{watch("aciklama")}</Text>
            </div>
            <div style={{ minWidth: "280px", width: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: "0px",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div style={{ width: "7px", minHeight: "30px", backgroundColor: "rgba(255, 255, 255, 1)" }}></div>
                <div style={{ width: "7px", height: "100%", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>
                <div style={{ width: "7px", minHeight: "30px", backgroundColor: "rgba(255, 255, 255, 1)" }}></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0px 10px", marginBottom: "120px" }}>
                {/* Left side wheels */}
                {Array.from({ length: 1 }).map((_, idx) => (
                  <React.Fragment key={`left-wheels-${idx}`}>{renderWheels("on", idx, "left")}</React.Fragment>
                ))}

                <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>

                {/* Right side wheels */}
                {Array.from({ length: 1 }).map((_, idx) => (
                  <React.Fragment key={`right-wheels-${idx}`}>{renderWheels("on", idx, "right")}</React.Fragment>
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
                      {/* Left side wheels */}
                      {Array.from({ length: 1 }).map((_, idx) => (
                        <React.Fragment key={`left-wheels-middle-${idx}`}>{renderWheels("middle", rowIndex, "left")}</React.Fragment>
                      ))}

                      <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>

                      {/* Right side wheels */}
                      {Array.from({ length: 1 }).map((_, idx) => (
                        <React.Fragment key={`right-wheels-middle-${idx}`}>{renderWheels("middle", rowIndex, "right")}</React.Fragment>
                      ))}
                    </div>
                  ))}

                {/* Arka axle için */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0px 10px" }}>
                  {/* Left side wheels */}
                  {Array.from({ length: 1 }).map((_, idx) => (
                    <React.Fragment key={`left-wheels-rear-${idx}`}>{renderWheels("arka", idx, "left")}</React.Fragment>
                  ))}

                  <div style={{ width: "100%", height: "7px", backgroundColor: "rgba(215, 215, 215, 1)" }}></div>

                  {/* Right side wheels */}
                  {Array.from({ length: 1 }).map((_, idx) => (
                    <React.Fragment key={`right-wheels-rear-${idx}`}>{renderWheels("arka", idx, "right")}</React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            border: "1px solid #d2d2d2",
            width: "50%",
          }}
        >
          <TakiliLastikListesi
            setGroupedTiresApiResponse={setGroupedTiresApiResponse}
            selectedAracDetay={selectedAracDetay}
            aracId={selectedRow?.aracId}
            axleList={axleList}
            positionList={positionList}
            onInit={handleFetchInstalledTiresRef}
            setTirePositionMapping={setTirePositionMapping}
            tirePositionMapping={tirePositionMapping}
            selectedTirePosition={selectedTirePosition}
            setSelectedTirePosition={setSelectedTirePosition}
          />
        </div>
      </div>

      <LastikTak
        selectedAracDetay={selectedAracDetay}
        aracId={selectedRow?.aracId}
        wheelInfo={selectedWheel}
        axleList={axleList}
        positionList={positionList}
        shouldOpenModal={shouldOpenModal}
        onModalClose={() => {
          setShouldOpenModal(false);
          // Don't reset the selected tire position when closing the modal
          // to keep the highlight visible
        }}
        showAddButton={false}
        refreshList={fetchInstalledTiresRef}
      />
    </>
  );
}
