import React, { useEffect, useMemo, useState } from "react";
import AxiosInstance from "../../../../../../../../../../../api/http";
import PropTypes from "prop-types";
import { Button, Input, Typography, Tabs, Checkbox, Alert, Modal, Table } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import YapilanIsTable from "./components/YapilanIsTable.jsx";
// import { SearchOutlined } from "@ant-design/icons";
import CikisDeposu from "./components/CikisDeposu.jsx";
import Birim from "./components/Birim.jsx";
import MalzemeTipi from "./components/MalzemeTipi.jsx";
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

const onChange = () => {
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
export default function MainTabs({ aracID, onBulkAdd }) {
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [latestUsageInfo, setLatestUsageInfo] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const currentMiktar = getValues("miktar");
    if (currentMiktar === undefined || currentMiktar === null) {
      setValue("miktar", 1);
    }
  }, []); // run once to ensure default miktar

  const handleYapilanIsMinusClick = () => {
    setValue("malzemeKodu", "");
    setValue("malzemeKoduID", "");
    setValue("iscilikUcreti", 0);

    setValue("malzemeTanimi", "");
    setValue("birim", null);
    setValue("birimID", "");

    setValue("isTipi", null);
    setValue("isTipiID", "");
    setValue("toplam", 0);

    // KDV, indirim ve toplam değerlerini sıfırla veya yeniden hesapla
    setValue("iscilikUcreti", 0);
    setValue("indirimOrani", 0);

    recalculateIndirimOrani();
    recalculateToplam();
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

  // formatTime helper kullanılmıyor
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

  // Malzemenin son kullanım tarihini çekmek için API çağrısı
  const watchedAracId = watch("aracID");
  const watchedMalzemeKoduId = watch("malzemeKoduID");
  const watchedMalzemeKodu = watch("malzemeKodu");
  const watchedMalzemeTanimi = watch("malzemeTanimi");

  useEffect(() => {
    const vehicleId = Number(aracID ?? watchedAracId);
    const materialId = Number(watchedMalzemeKoduId);

    if (!vehicleId || !materialId) {
      setLatestUsageInfo(null);
      return;
    }

    let isActive = true;

    AxiosInstance.get("MaterialMovements/GetLatestUsedMaterialUsageDate", {
      params: { vId: vehicleId, materialId },
    })
      .then((response) => {
        if (!isActive) return;
        setLatestUsageInfo(response?.data ?? null);
      })
      .catch(() => {
        if (!isActive) return;
        setLatestUsageInfo(null);
      });

    return () => {
      isActive = false;
    };
  }, [aracID, watchedAracId, watchedMalzemeKoduId]);

  // Malzemenin son kullanım tarihini çekmek için API çağrısı sonu

  // Modal açıldığında malzeme kullanım detaylarını çek
  useEffect(() => {
    if (!isHistoryModalOpen) return;
    const vehicleId = Number(aracID ?? watchedAracId);
    const materialId = Number(watchedMalzemeKoduId);
    if (!vehicleId || !materialId) return;

    let isActive = true;
    setHistoryLoading(true);
    AxiosInstance.get("MaterialMovements/GetTopUsedMaterialDetails", {
      params: { vId: vehicleId, materialId },
    })
      .then((res) => {
        if (!isActive) return;
        const rows = Array.isArray(res?.data) ? res.data : [];
        setHistoryData(rows);
      })
      .catch(() => {
        if (!isActive) return;
        setHistoryData([]);
      })
      .finally(() => {
        if (!isActive) return;
        setHistoryLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [isHistoryModalOpen, aracID, watchedAracId, watchedMalzemeKoduId]);

  const historyColumns = useMemo(
    () => [
      {
        title: "Sıra No",
        dataIndex: "siraNo",
        key: "siraNo",
        width: 100,
        sorter: (a, b) => (a.siraNo ?? 0) - (b.siraNo ?? 0),
      },
      /* {
        title: "Malzeme Kod",
        dataIndex: "malezemeKod",
        key: "malezemeKod",
        width: 140,
        sorter: (a, b) => (a.malezemeKod || "").localeCompare(b.malezemeKod || ""),
      },
      {
        title: "Malzeme Tanım",
        dataIndex: "malezemeTanim",
        key: "malezemeTanim",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => (a.malezemeTanim || "").localeCompare(b.malezemeTanim || ""),
      }, */
      {
        title: "Firma",
        dataIndex: "firma",
        key: "firma",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => (a.firma || "").localeCompare(b.firma || ""),
      },
      {
        title: "Tarih",
        dataIndex: "tarih",
        key: "tarih",
        render: (val) => (val ? formatDate(val) : "-"),
        width: 140,
        sorter: (a, b) => {
          const at = a.tarih ? new Date(a.tarih).getTime() : 0;
          const bt = b.tarih ? new Date(b.tarih).getTime() : 0;
          return at - bt;
        },
      },
      {
        title: "Garanti Bitiş",
        dataIndex: "garantiBitisTarih",
        key: "garantiBitisTarih",
        render: (val) => {
          const guaranteeDate = val ? dayjs(val) : null;
          if (!guaranteeDate || !guaranteeDate.isValid()) {
            return "Bitti";
          }

          const now = dayjs();
          const stillValid = guaranteeDate.isAfter(now, "day") || guaranteeDate.isSame(now, "day");
          return stillValid ? formatDate(val) : "Bitti";
        },
        width: 160,
        sorter: (a, b) => {
          const at = a.garantiBitisTarih ? new Date(a.garantiBitisTarih).getTime() : 0;
          const bt = b.garantiBitisTarih ? new Date(b.garantiBitisTarih).getTime() : 0;
          return at - bt;
        },
      },
      {
        title: "Plaka",
        dataIndex: "plaka",
        key: "plaka",
        width: 140,
        sorter: (a, b) => (a.plaka || "").localeCompare(b.plaka || ""),
      },

      { title: "Miktar", dataIndex: "miktar", key: "miktar", width: 100, sorter: (a, b) => (a.miktar ?? 0) - (b.miktar ?? 0) },
      { title: "Fiyat", dataIndex: "fiyat", key: "fiyat", width: 110, sorter: (a, b) => (a.fiyat ?? 0) - (b.fiyat ?? 0) },
      { title: "Toplam", dataIndex: "toplam", key: "toplam", width: 120, sorter: (a, b) => (a.toplam ?? 0) - (b.toplam ?? 0) },
    ],
    []
  );

  const alertDescription = useMemo(() => {
    if (!latestUsageInfo || !latestUsageInfo.latestUsageDate) return null;
    const latest = dayjs(latestUsageInfo.latestUsageDate);
    if (!latest.isValid()) return null;

    const latestStr = formatDate(latestUsageInfo.latestUsageDate);

    if (latestUsageInfo.guaranteeExpDate) {
      const guarantee = dayjs(latestUsageInfo.guaranteeExpDate);
      if (guarantee.isValid()) {
        const now = dayjs();
        const stillValid = guarantee.isAfter(now, "day") || guarantee.isSame(now, "day");
        const guaranteeStr = formatDate(latestUsageInfo.guaranteeExpDate);
        if (stillValid) {
          return (
            <span>
              {`Bu malzeme daha önce ${latestStr} tarihinde bu araçta kullanılmış ve garanti süresi ${guaranteeStr} kadar devam etmektedir. Lütfen tekrar kullanım gerekliliğini kontrol ediniz. `}
              <Link onClick={() => setIsHistoryModalOpen(true)}>Malzeme tarihçesi için tıklayınız.</Link>
            </span>
          );
        }
        return (
          <span>
            {`Bu malzeme daha önce ${latestStr} tarihinde bu araçta kullanılmış ve garanti süresi ${guaranteeStr} tarihinde bitmiştir. Lütfen tekrar kullanım gerekliliğini kontrol ediniz. `}
            <Link onClick={() => setIsHistoryModalOpen(true)}>Malzeme tarihçesi için tıklayınız.</Link>
          </span>
        );
      }
    }

    return (
      <span>
        {`Bu malzeme daha önce ${latestStr} tarihinde bu araçta kullanılmıştır. Lütfen tekrar kullanım gerekliliğini kontrol ediniz. `}
        <Link onClick={() => setIsHistoryModalOpen(true)}>Malzeme tarihçesi için tıklayınız.</Link>
      </span>
    );
  }, [latestUsageInfo]);

  const handleIscilikUcretiChange = (value) => {
    setValue("iscilikUcreti", value);

    recalculateIndirimOrani();
    recalculateToplam();
  };

  const handleMiktarChange = (value) => {
    const numericValue = typeof value === "number" && !Number.isNaN(value) ? value : 0;
    const normalizedValue = numericValue >= 1 ? numericValue : 1;

    setValue("miktar", normalizedValue);

    recalculateIndirimOrani();
    recalculateIndirimYuzde();
    recalculateToplam();
  };

  const handleIndirimYuzdeChange = (value) => {
    setValue("indirimYuzde", value);

    recalculateIndirimOrani();
    recalculateToplam();
  };

  const handleIndirimOraniChange = (value) => {
    setValue("indirimOrani", value);

    recalculateIndirimYuzde();
    recalculateToplam();
  };

  const historyModalTitle = useMemo(() => {
    const parts = [watchedMalzemeKodu, watchedMalzemeTanimi].filter((part) => Boolean(part && `${part}`.trim()));
    return parts.length > 0 ? parts.join(" - ") : "Malzeme Tarihçesi";
  }, [watchedMalzemeKodu, watchedMalzemeTanimi]);

  const handleKdvOraniChange = (value) => {
    const normalizedValue = typeof value === "number" && !Number.isNaN(value) ? value : 0;
    setValue("kdvOrani", normalizedValue);

    recalculateToplam({ kdvOrani: normalizedValue });
  };

  const handleKdvOraniFocus = () => {
    recalculateToplam();
  };

  const handleKdvDegeriChange = (value) => {
    const normalizedValue = typeof value === "number" && !Number.isNaN(value) ? value : 0;
    setValue("kdvDegeri", normalizedValue);

    recalculateKdvFromDegeri({ kdvDegeri: normalizedValue });
  };

  const handleKdvDegeriFocus = () => {
    recalculateKdvFromDegeri();
  };

  const recalculateIndirimOrani = () => {
    const values = getValues();

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimYuzde = values.indirimYuzde || 0;

    const calculatedIndirimOrani = (iscilikUcreti * indirimYuzde) / 100;
    setValue("indirimOrani", isNaN(calculatedIndirimOrani) ? 0 : calculatedIndirimOrani);
  };

  const recalculateIndirimYuzde = () => {
    const values = getValues();

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;

    const calculatedIndirimYuzde = (indirimOrani / iscilikUcreti) * 100;
    setValue("indirimYuzde", isNaN(calculatedIndirimYuzde) ? 0 : calculatedIndirimYuzde);
  };

  const recalculateKdvFromDegeri = (overrides = {}) => {
    const values = { ...getValues(), ...overrides };

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;
    const remainingAmount = iscilikUcreti - (indirimOrani || 0);
    const parsedKdvDegeri = Number(values.kdvDegeri);
    const kdvDegeri = Number.isFinite(parsedKdvDegeri) ? parsedKdvDegeri : 0;

    if (!iscilikUcreti || iscilikUcreti <= 0) {
      setValue("kdvOrani", 0);
      setValue("toplam", 0);
      return;
    }

    if (remainingAmount <= 0 || kdvDegeri <= 0) {
      setValue("kdvOrani", 0);
      const finalAmount = remainingAmount + kdvDegeri;
      setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
      return;
    }

    const newKdvOrani = (kdvDegeri / remainingAmount) * 100;
    const finalAmount = remainingAmount + kdvDegeri;

    setValue("kdvOrani", isNaN(newKdvOrani) ? 0 : newKdvOrani);
    setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
  };

  const recalculateToplam = (overrides = {}) => {
    const values = { ...getValues(), ...overrides };

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;
    const parsedKdvOrani = Number(values.kdvOrani);
    const kdvOrani = Number.isFinite(parsedKdvOrani) ? parsedKdvOrani : 0;

    if (!iscilikUcreti || iscilikUcreti <= 0) {
      setValue("kdvDegeri", 0);
      setValue("toplam", 0);
      return;
    }

    const remainingAmount = iscilikUcreti - (indirimOrani || 0);
    const kdv = remainingAmount * (kdvOrani / 100);
    const finalAmount = remainingAmount + kdv;

    setValue("kdvDegeri", isNaN(kdv) ? 0 : kdv);
    setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
  };

  return (
    <div>
      <div style={{ display: "flex", columnGap: "10px", flexWrap: "wrap" }}>
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ width: "100%", maxWidth: "450px", marginBottom: "10px", display: "flex" }}>
            <div style={{ width: "150px" }}></div>
            <Controller
              name="stokluMalzeme"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Stoklu Malzeme
                </Checkbox>
              )}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px", fontWeight: "600" }}>Çıkış Deposu:</Text>
              <CikisDeposu />
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
            </StyledDivBottomLine>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Malzeme Kodu:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="malzemeKodu"
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
                name="malzemeKoduID"
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
                wareHouseId={watch("depoID")}
                onSubmit={(selection, meta) => {
                  if (Array.isArray(selection) && meta?.isBulk) {
                    onBulkAdd?.(selection);
                    return;
                  }

                  const selectedData = Array.isArray(selection) ? selection[0] : selection;
                  if (!selectedData) return;

                  setValue("malzemeKodu", selectedData.malzemeKod);
                  setValue("malzemeKoduID", selectedData.key);
                  setValue("malzemeTanimi", selectedData.tanim);
                  setValue("iscilikUcreti", selectedData.fiyat);
                  setValue("isTipi", selectedData.malzemeTipKodText || null);
                  setValue("isTipiID", selectedData.malzemeTipKodId);
                  setValue("birim", selectedData.birim || null);
                  setValue("birimID", selectedData.birimKodId);

                  // Yeni değerleri güncelledikten sonra hesaplamaları tetikleyin

                  recalculateIndirimOrani();
                  recalculateToplam();
                }}
              />

              <Button onClick={handleYapilanIsMinusClick}> - </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px", fontWeight: 600 }}>Malzeme Tanımı:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="malzemeTanimi"
                control={control}
                rules={{ required: "Alan Boş Bırakılamaz!" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    status={errors.malzemeTanimi ? "error" : ""}
                    type="text" // Set the type to "text" for name input
                    style={{ width: "300px" }}
                  />
                )}
              />
              {errors.malzemeTanimi && <div style={{ color: "red", marginTop: "5px" }}>{errors.malzemeTanimi.message}</div>}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Tipi:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <MalzemeTipi />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Birim:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Birim />
            </div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Miktar:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="miktar" min={1} style={{ flex: 1 }} formatSection="stok" formatType="miktar" onChange={(value) => handleMiktarChange(value)} />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Birim Fiyatı:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="iscilikUcreti" style={{ flex: 1 }} min={0} formatSection="stok" formatType="tutar" onChange={(value) => handleIscilikUcretiChange(value)} />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>KDV Oranı %:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput
                name="kdvOrani"
                style={{ flex: 1 }}
                onChange={(value) => handleKdvOraniChange(value)}
                onFocus={handleKdvOraniFocus}
                formatSection="stok"
                formatType="tutar"
                prefix={true}
                min={0}
                max={100}
              />
              <NumberInput
                name="kdvDegeri"
                style={{ flex: 1 }}
                onChange={(value) => handleKdvDegeriChange(value)}
                onFocus={handleKdvDegeriFocus}
                formatSection="stok"
                formatType="tutar"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>İndirim %:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <NumberInput name="indirimYuzde" formatSection="stok" formatType="tutar" style={{ flex: 1 }} prefix={true} onChange={(value) => handleIndirimYuzdeChange(value)} />
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
        {alertDescription && <Alert style={{ width: "100%", marginBottom: "10px" }} type="warning" message="Uyarı" description={alertDescription} showIcon />}
      </div>
      <StyledTabs defaultActiveKey="1" items={items} onChange={onChange} />

      <Modal title={historyModalTitle} open={isHistoryModalOpen} onCancel={() => setIsHistoryModalOpen(false)} onOk={() => setIsHistoryModalOpen(false)} width={900}>
        <Table
          rowKey={(row) => row.siraNo}
          loading={historyLoading}
          columns={historyColumns}
          dataSource={historyData}
          size="small"
          pagination={{ pageSize: 10 }}
          scroll={{ y: "calc(100vh - 380px)" }}
        />
      </Modal>
    </div>
  );
}

MainTabs.propTypes = {
  aracID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBulkAdd: PropTypes.func,
};
