import React, { useCallback, useEffect, useState } from "react";
import Filters from "./filter/Filters.jsx";
// react-router-dom import removed as it's not used here
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, message, Tooltip, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, DashboardOutlined, CheckCircleFilled, WarningFilled, CloseCircleFilled } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../../api/http.jsx";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
// PropTypes import removed; not used in this file
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";
import LastikTakUpdate from "../../LastikIslemleri/Update/components/MainTabs/components/LastikTakUpdate.jsx";

const localeMap = {
  tr: trTR,
  en: enUS,
  ru: ruRU,
  az: azAZ,
};

// Define date format mapping based on language
const dateFormatMap = {
  tr: "DD.MM.YYYY",
  en: "MM/DD/YYYY",
  ru: "DD.MM.YYYY",
  az: "DD.MM.YYYY",
};

// Define time format mapping based on language
const timeFormatMap = {
  tr: "HH:mm",
  en: "hh:mm A",
  ru: "HH:mm",
  az: "HH:mm",
};

const { Text } = Typography;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

const StyledTable = styled(Table)``;

// Sütunların boyutlarını ayarlamak için kullanılan component

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  // tabloyu genişletmek için kullanılan alanın stil özellikleri
  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: "-5px",
    width: "20%",
    height: "100%", // this is the area that is draggable, you can adjust it
    zIndex: 2, // ensure it's above other elements
    cursor: "col-resize",
    padding: "0px",
    backgroundSize: "0px",
  };

  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={handleStyle}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
// Sütunların boyutlarını ayarlamak için kullanılan component sonu

// Sütunların sürüklenebilir olmasını sağlayan component

const DraggableRow = ({ id, text, index, moveRow, className, style, visible, onVisibilityChange, ...restProps }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const styleWithTransform = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "#f0f0f0" : "",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <div ref={setNodeRef} style={styleWithTransform} {...restProps} {...attributes}>
      {/* <Checkbox
        checked={visible}
        onChange={(e) => onVisibilityChange(index, e.target.checked)}
        style={{ marginLeft: "auto" }}
      /> */}
      <div
        {...listeners}
        style={{
          cursor: "grab",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <HolderOutlined style={{ marginRight: 8 }} />
        {text}
      </div>
    </div>
  );
};

// Sütunların sürüklenebilir olmasını sağlayan component sonu

const LastikEnvanteri = () => {
  const formMethods = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [pageSize, setPageSize] = useState(10); // Page size
  const [localeDateFormat, setLocaleDateFormat] = useState("MM/DD/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTireData, setSelectedTireData] = useState(null);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  const statusTag = (statusId) => {
    switch (statusId) {
      case 1:
        return { color: "#ff9800", text: "Bekliyor" };
      case 2:
        return { color: "#2196f3", text: "Devam Ediyor" };
      case 3:
        return { color: "#ff0000", text: "İptal Edildi" };
      case 4:
        return { color: "#2bc770", text: "Tamamlandı" };
      default:
        return { color: "default", text: "" }; // Eğer farklı bir değer gelirse
    }
  };

  function hexToRGBA(hex, opacity) {
    // hex veya opacity null ise hata döndür
    if (hex === null || opacity === null) {
      // console.error("hex veya opacity null olamaz!");
      return; // veya uygun bir varsayılan değer döndürebilirsiniz
    }

    let r = 0,
      g = 0,
      b = 0;
    // 3 karakterli hex kodunu kontrol et
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 karakterli hex kodunu kontrol et
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // API Data Fetching with diff and setPointId
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        // Moving forward
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        // Moving backward
        currentSetPointId = data[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      // Determine what to send for customfilters
      const requestBody = body?.filters || {};

      const response = await AxiosInstance.post(`TyreInventory/GetTyreInventoryList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`, requestBody);

      // Handle the new response format with page, recordCount, and list properties
      const total = response.data.recordCount;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData = response.data.list.map((item) => ({
        ...item,
        key: item.siraNo, // Using siraNo as the key since it appears to be unique
      }));

      if (newData.length > 0) {
        setData(newData);
      } else {
        message.warning(t("kayitBulunamadi"));
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(t("hataOlustu"));
    } finally {
      setLoading(false);
    }
  };

  // Sayfa açılışında ilk veriyi çek
  useEffect(() => {
    fetchData(0, 1);
  }, []);

  // Search handling
  // Define handleSearch function
  const handleSearch = () => {
    fetchData(0, 1);
  };

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // onRowClick removed; using openUpdateModal instead

  const openUpdateModal = (record) => {
    setSelectedTireData({ siraNo: record?.siraNo, aracId: record?.aracId });
    setIsUpdateModalOpen(true);
  };

  const refreshTableData = useCallback(() => {
    setSelectedRowKeys([]);
    fetchData(0, 1);
  }, []);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("seriNo"),
      dataIndex: "seriNo",
      key: "seriNo",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => <a onClick={() => openUpdateModal(record)}>{text}</a>,
      sorter: (a, b) => {
        if (a.seriNo === null) return -1;
        if (b.seriNo === null) return 1;
        return a.seriNo.localeCompare(b.seriNo);
      },
    },

    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },

    {
      title: t("lastikMarka"),
      dataIndex: "lastikMarka",
      key: "lastikMarka",
      width: 140,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.lastikMarka === null) return -1;
        if (b.lastikMarka === null) return 1;
        return a.lastikMarka.localeCompare(b.lastikMarka);
      },
    },

    {
      title: t("lastikModel"),
      dataIndex: "lastikModel",
      key: "lastikModel",
      width: 252,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.lastikModel === null) return -1;
        if (b.lastikModel === null) return 1;
        return a.lastikModel.localeCompare(b.lastikModel);
      },
    },

    {
      title: t("tip"),
      dataIndex: "tip",
      key: "tip",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tip === null) return -1;
        if (b.tip === null) return 1;
        return a.tip.localeCompare(b.tip);
      },
    },

    {
      title: t("ebat"),
      dataIndex: "ebat",
      key: "ebat",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.ebat === null) return -1;
        if (b.ebat === null) return 1;
        return a.ebat.localeCompare(b.ebat);
      },
    },

    {
      title: t("lastikOmru"),
      dataIndex: "lastikOmru",
      key: "lastikOmru",
      width: 300,
      ellipsis: true,
      visible: true,
      render: (_, record) => {
        const percent = calculateTireUsagePercentage(record);
        const status = getTireStatus(percent);
        const used = (record?.guncelKm ?? 0) - (record?.takildigiKm ?? 0) + (record?.kullanimSuresi ?? 0);
        const total = record?.tahminiOmurKm ?? 0;
        const remaining = calculateRemainingLifespan(record);

        return (
          <div style={{ position: "relative" }}>
            <LifespanSection>
              <ProgressBackground $percent={percent} $status={status} />
              <LifespanHeader>
                <LifespanTitle>
                  <DashboardOutlined style={{ fontSize: "12px" }} />
                  {t("lastikOmru")}
                </LifespanTitle>
                <LifespanHeaderRight>
                  <LifespanValue $status={status}>
                    {percent > 40 ? (
                      <CheckCircleFilled style={{ fontSize: "12px" }} />
                    ) : percent > 15 ? (
                      <WarningFilled style={{ fontSize: "12px" }} />
                    ) : (
                      <CloseCircleFilled style={{ fontSize: "12px" }} />
                    )}
                    {Math.round(percent)}%
                  </LifespanValue>
                  {record?.tahminiOmurKm ? <StatusBadge $status={status}>{getTireStatusText(percent)}</StatusBadge> : null}
                </LifespanHeaderRight>
              </LifespanHeader>
              <Tooltip
                title={
                  <TooltipContent>
                    <TooltipRow>
                      <TooltipLabel>{t("kullanilan")}:</TooltipLabel>
                      <TooltipValue>{formatKm(used)} km</TooltipValue>
                    </TooltipRow>
                    <TooltipRow>
                      <TooltipLabel>{t("toplam")}:</TooltipLabel>
                      <TooltipValue>{formatKm(total)} km</TooltipValue>
                    </TooltipRow>
                    <TooltipRow $noBorder>
                      <TooltipLabel>{t("kalan")}:</TooltipLabel>
                      <TooltipHighlight $status={status}>{formatKm(remaining)} km</TooltipHighlight>
                    </TooltipRow>
                  </TooltipContent>
                }
                placement="top"
                color="#333"
              >
                <div style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 3 }} />
              </Tooltip>
            </LifespanSection>
          </div>
        );
      },
      sorter: (a, b) => calculateTireUsagePercentage(a) - calculateTireUsagePercentage(b),
    },

    {
      title: t("aksPozisyon"),
      dataIndex: "aksPozisyon",
      key: "aksPozisyon",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => (text ? t(text) : ""),
      sorter: (a, b) => {
        if (a.aksPozisyon === null) return -1;
        if (b.aksPozisyon === null) return 1;
        return a.aksPozisyon.localeCompare(b.aksPozisyon);
      },
    },

    {
      title: t("pozisyonNo"),
      dataIndex: "pozisyonNo",
      key: "pozisyonNo",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => (text ? t(text) : ""),
      sorter: (a, b) => {
        if (a.pozisyonNo === null) return -1;
        if (b.pozisyonNo === null) return 1;
        return a.pozisyonNo.localeCompare(b.pozisyonNo);
      },
    },

    {
      title: t("montajKm"),
      dataIndex: "takildigiKm",
      key: "takildigiKm",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => a.takildigiKm - b.takildigiKm,
    },

    {
      title: t("montajTarihi"),
      dataIndex: "takilmaTarih",
      key: "takilmaTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => (text ? formatDate(text) : ""),
      sorter: (a, b) => {
        if (!a.takilmaTarih) return -1;
        if (!b.takilmaTarih) return 1;
        return new Date(a.takilmaTarih) - new Date(b.takilmaTarih);
      },
    },

    {
      title: t("tahminiOmurKm"),
      dataIndex: "tahminiOmurKm",
      key: "tahminiOmurKm",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => a.tahminiOmurKm - b.tahminiOmurKm,
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
        // throw new Error("Invalid time format"); // hata fırlatır ve uygulamanın çalışmasını durdurur
        console.error("Invalid time format:", time);
        // return time; // Hatalı formatı olduğu gibi döndür
        return ""; // Hata durumunda boş bir string döndür
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
      // return time; // Hatalı formatı olduğu gibi döndür
    }
  };

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  // Lastik ömrü hesaplamaları (TakiliLastikListesi.jsx ile aynı mantık)
  const calculateTireUsagePercentage = (record) => {
    if (!record || !record.tahminiOmurKm) return 100;

    const currentKm = record.guncelKm ?? 0;
    const installedKm = record.takildigiKm ?? 0;
    const previousUsage = record.kullanimSuresi ?? 0;

    const usedLifespan = currentKm - installedKm + previousUsage;
    const remainingPercentage = 100 - (usedLifespan / record.tahminiOmurKm) * 100;
    return Math.min(Math.max(0, remainingPercentage), 100);
  };

  const calculateRemainingLifespan = (record) => {
    if (!record || !record.tahminiOmurKm) return 0;
    const currentKm = record.guncelKm ?? 0;
    const installedKm = record.takildigiKm ?? 0;
    const previousUsage = record.kullanimSuresi ?? 0;
    const usedLifespan = currentKm - installedKm + previousUsage;
    return Math.max(0, record.tahminiOmurKm - usedLifespan);
  };

  const getTireStatus = (percentage) => {
    if (percentage > 40) return "success";
    if (percentage > 15) return "warning";
    return "exception";
  };

  const getTireStatusText = (percentage) => {
    if (percentage > 40) return t("iyi");
    if (percentage > 15) return t("orta");
    return t("kritik");
  };

  const formatKm = (km) => {
    if (km === undefined || km === null) return "0";
    return km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // TakiliLastikListesi.jsx ile aynı görsel tasarım
  const LifespanSection = styled.div`
    width: 100%;
    padding: 6px 12px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.03);

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }
  `;

  const LifespanHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
  `;

  const LifespanHeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `;

  const LifespanTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: #666;
    font-weight: 500;
  `;

  const LifespanValue = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => (props.$status === "success" ? "#52c41a" : props.$status === "warning" ? "#faad14" : "#f5222d")};
    display: flex;
    align-items: center;
    gap: 4px;
  `;

  const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 6px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 500;
    color: white;
    background-color: ${(props) => (props.$status === "success" ? "#52c41a" : props.$status === "warning" ? "#faad14" : "#f5222d")};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  `;

  const ProgressBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.$percent}%;
    height: 100%;
    background: ${(props) =>
      props.$status === "success"
        ? "linear-gradient(90deg, rgba(82, 196, 26, 0.08), rgba(82, 196, 26, 0.15))"
        : props.$status === "warning"
          ? "linear-gradient(90deg, rgba(250, 173, 20, 0.08), rgba(250, 173, 20, 0.15))"
          : "linear-gradient(90deg, rgba(245, 34, 45, 0.08), rgba(245, 34, 45, 0.15))"};
    transition: width 0.5s ease;
    z-index: 1;
    border-radius: 0 5px 5px 0;
  `;

  const TooltipContent = styled.div`
    padding: 4px 0;
  `;

  const TooltipRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    border-bottom: ${(props) => (props.$noBorder ? "none" : "1px dashed rgba(255, 255, 255, 0.2)")};

    &:last-child {
      border-bottom: none;
    }
  `;

  const TooltipLabel = styled.span`
    margin-right: 12px;
    opacity: 0.8;
  `;

  const TooltipValue = styled.span`
    font-weight: 500;
  `;

  const TooltipHighlight = styled.span`
    color: ${(props) => (props.$status === "success" ? "#52c41a" : props.$status === "warning" ? "#faad14" : "#f5222d")};
    font-weight: 600;
  `;

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderLastikEnvanteri");
    const savedVisibility = localStorage.getItem("columnVisibilityLastikEnvanteri");
    const savedWidths = localStorage.getItem("columnWidthsLastikEnvanteri");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    initialColumns.forEach((col) => {
      if (!order.includes(col.key)) {
        order.push(col.key);
      }
      if (visibility[col.key] === undefined) {
        visibility[col.key] = col.visible;
      }
      if (widths[col.key] === undefined) {
        widths[col.key] = col.width;
      }
    });

    localStorage.setItem("columnOrderLastikEnvanteri", JSON.stringify(order));
    localStorage.setItem("columnVisibilityLastikEnvanteri", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsLastikEnvanteri", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderLastikEnvanteri", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityLastikEnvanteri",
      JSON.stringify(
        columns.reduce(
          (acc, col) => ({
            ...acc,
            [col.key]: col.visible,
          }),
          {}
        )
      )
    );
    localStorage.setItem(
      "columnWidthsLastikEnvanteri",
      JSON.stringify(
        columns.reduce(
          (acc, col) => ({
            ...acc,
            [col.key]: col.width,
          }),
          {}
        )
      )
    );
  }, [columns]);

  // Handle column resize
  const handleResize =
    (key) =>
    (_, { size }) => {
      setColumns((prev) => prev.map((col) => (col.key === key ? { ...col, width: size.width } : col)));
    };

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const mergedColumns = columns.map((col) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(column.key),
    }),
  }));

  // Filtered columns
  const filteredColumns = mergedColumns.filter((col) => col.visible);

  // Handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.key === active.id);
      const newIndex = columns.findIndex((column) => column.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((columns) => arrayMove(columns, oldIndex, newIndex));
      } else {
        console.error(`Column with key ${active.id} or ${over.id} does not exist.`);
      }
    }
  };

  // Toggle column visibility
  const toggleVisibility = (key, checked) => {
    const index = columns.findIndex((col) => col.key === key);
    if (index !== -1) {
      const newColumns = [...columns];
      newColumns[index].visible = checked;
      setColumns(newColumns);
    } else {
      console.error(`Column with key ${key} does not exist.`);
    }
  };

  // Reset columns
  const resetColumns = () => {
    localStorage.removeItem("columnOrderLastikEnvanteri");
    localStorage.removeItem("columnVisibilityLastikEnvanteri");
    localStorage.removeItem("columnWidthsLastikEnvanteri");
    window.location.reload();
  };

  // Kullanıcının dilini localStorage'den alın
  const currentLang = localStorage.getItem("i18nextLng") || "en";
  const currentLocale = localeMap[currentLang] || enUS;

  useEffect(() => {
    // Ay ve tarih formatını dil bazında ayarlayın
    setLocaleDateFormat(dateFormatMap[currentLang] || "MM/DD/YYYY");
    setLocaleTimeFormat(timeFormatMap[currentLang] || "HH:mm");
  }, [currentLang]);

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
    setBody((prevBody) => {
      if (type === "filters") {
        // If newBody is a function, call it with previous filters
        const updatedFilters =
          typeof newBody === "function"
            ? newBody(prevBody.filters)
            : {
                ...prevBody.filters,
                ...newBody,
              };

        return {
          ...prevBody,
          filters: updatedFilters,
        };
      }
      return {
        ...prevBody,
        [type]: newBody,
      };
    });
    setCurrentPage(1);
  }, []);
  // filtreleme işlemi için kullanılan useEffect son

  return (
    <>
      <ConfigProvider locale={currentLocale}>
        <FormProvider {...formMethods}>
          {/* Modal for managing columns */}
          <Modal title={t("sutunlarYonet")} centered width={800} open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
            <Text style={{ marginBottom: "15px" }}>{t("sutunlarYonetAciklama")}</Text>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button onClick={resetColumns} style={{ marginBottom: "15px" }}>
                {t("sutunlarSifirla")}
              </Button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "46%",
                  border: "1px solid #8080806e",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #80808051",
                    padding: "8px 8px 12px 8px",
                  }}
                >
                  <Text style={{ fontWeight: 600 }}>{t("sutunlarGosterGizle")}</Text>
                </div>
                <div style={{ height: "400px", overflow: "auto" }}>
                  {initialColumns.map((col) => (
                    <div style={{ display: "flex", gap: "10px" }} key={col.key}>
                      <Checkbox checked={columns.find((column) => column.key === col.key)?.visible || false} onChange={(e) => toggleVisibility(col.key, e.target.checked)} />
                      {col.title}
                    </div>
                  ))}
                </div>
              </div>

              <DndContext
                onDragEnd={handleDragEnd}
                sensors={useSensors(
                  useSensor(PointerSensor),
                  useSensor(KeyboardSensor, {
                    coordinateGetter: sortableKeyboardCoordinates,
                  })
                )}
              >
                <div
                  style={{
                    width: "46%",
                    border: "1px solid #8080806e",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "20px",
                      borderBottom: "1px solid #80808051",
                      padding: "8px 8px 12px 8px",
                    }}
                  >
                    <Text style={{ fontWeight: 600 }}>{t("sutunlarSiralamaAyarla")}</Text>
                  </div>
                  <div style={{ height: "400px", overflow: "auto" }}>
                    <SortableContext items={columns.filter((col) => col.visible).map((col) => col.key)} strategy={verticalListSortingStrategy}>
                      {columns
                        .filter((col) => col.visible)
                        .map((col, index) => (
                          <DraggableRow key={col.key} id={col.key} index={index} text={col.title} />
                        ))}
                    </SortableContext>
                  </div>
                </div>
              </DndContext>
            </div>
          </Modal>
          {/* Toolbar */}
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: "15px",
              gap: "10px",
              padding: "15px",
              borderRadius: "8px 8px 8px 8px",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <StyledButton onClick={() => setIsModalVisible(true)}>
                <MenuOutlined />
              </StyledButton>
              <Input
                style={{ width: "250px" }}
                type="text"
                placeholder={t("aramaYap")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
              />

              <Filters onChange={handleBodyChange} />
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}></Button>
            </div>
            {/* <div style={{ display: "flex", gap: "10px" }}>
              <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
              <CreateDrawer selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
            </div> */}
          </div>
          {/* Table */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              height: "calc(100vh - 200px)",
              borderRadius: "8px 8px 8px 8px",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            <Spin spinning={loading}>
              <StyledTable
                components={components}
                rowSelection={rowSelection}
                columns={filteredColumns}
                dataSource={data}
                pagination={{
                  current: currentPage,
                  total: totalCount,
                  pageSize: 10,
                  showTotal: (total, range) => `${t("toplam")} ${total}`,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: handleTableChange,
                }}
                scroll={{ y: "calc(100vh - 335px)" }}
              />
            </Spin>
            {/* <EditDrawer selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} /> */}
          </div>
        </FormProvider>
        <LastikTakUpdate
          aracId={selectedTireData?.aracId}
          fromLastikEnvanteri={true}
          wheelInfo={null}
          axleList={[]}
          positionList={[]}
          shouldOpenModal={isUpdateModalOpen}
          onModalClose={() => setIsUpdateModalOpen(false)}
          showAddButton={false}
          refreshList={refreshTableData}
          tireData={selectedTireData}
        />
      </ConfigProvider>
    </>
  );
};

export default LastikEnvanteri;
