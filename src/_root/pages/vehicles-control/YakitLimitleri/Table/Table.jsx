import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from "react";
import ContextMenu from "../components/ContextMenu/ContextMenu";
import CreateDrawer from "../Insert/CreateDrawer";
import EditDrawer from "../Update/EditDrawer";
import Filters from "./filter/Filters";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../../api/http";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

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

const ResizableTitle = memo((props) => {
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
});
ResizableTitle.displayName = "ResizableTitle";
// Sütunların boyutlarını ayarlamak için kullanılan component sonu

// Sütunların sürüklenebilir olmasını sağlayan component

const DraggableRow = memo(({ id, text, index, style, ...restProps }) => {
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
});
DraggableRow.displayName = "DraggableRow";

// Sütunların sürüklenebilir olmasını sağlayan component sonu

const YakitLimitleri = () => {
  const formMethods = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [localeDateFormat, setLocaleDateFormat] = useState("MM/DD/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });

  const [selectedRows, setSelectedRows] = useState([]);

  const [body] = useState({
    keyword: "",
    filters: {},
  });

  const prevBodyRef = useRef(body);
  const hasFetchedRef = useRef(false);

  // Mevcut hafta/ay/yıl başlangıç-bitiş aralıklarını ISO formatında döndür
  const buildPeriodRanges = useCallback(() => {
    const now = new Date();

    // UTC bileşenlerini kullan
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const date = now.getUTCDate();

    // Yıl (UTC)
    const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
    const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));

    // Ay (UTC)
    const startOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

    // Çeyrek (3 aylık, UTC)
    const quarterStartMonth = Math.floor(month / 3) * 3;
    const startOfQuarter = new Date(Date.UTC(year, quarterStartMonth, 1, 0, 0, 0, 0));
    const endOfQuarter = new Date(Date.UTC(year, quarterStartMonth + 3, 0, 23, 59, 59, 999));

    // Yarım yıl (6 aylık, UTC)
    const halfYearStartMonth = month < 6 ? 0 : 6;
    const startOfHalfYear = new Date(Date.UTC(year, halfYearStartMonth, 1, 0, 0, 0, 0));
    const endOfHalfYear = new Date(Date.UTC(year, halfYearStartMonth + 6, 0, 23, 59, 59, 999));

    // Hafta (UTC, Pazartesi başlangıç)
    const dayOfWeekUTC = (now.getUTCDay() + 6) % 7; // Pazartesi=0
    const startOfWeek = new Date(Date.UTC(year, month, date - dayOfWeekUTC, 0, 0, 0, 0));
    const endOfWeek = new Date(Date.UTC(year, month, date - dayOfWeekUTC + 6, 23, 59, 59, 999));

    return {
      haftalikBaslangicTarih: startOfWeek.toISOString(),
      haftalikBitisTarih: endOfWeek.toISOString(),
      aylikBaslangicTarih: startOfMonth.toISOString(),
      aylikBitisTarih: endOfMonth.toISOString(),
      ucAylikBaslangicTarih: startOfQuarter.toISOString(),
      ucAylikBitisTarih: endOfQuarter.toISOString(),
      altiAylikBaslangicTarih: startOfHalfYear.toISOString(),
      altiAylikBitisTarih: endOfHalfYear.toISOString(),
      UcAylikBaslangicTarih: startOfQuarter.toISOString(),
      UcAylikBitisTarih: endOfQuarter.toISOString(),
      AltiAylikBaslangicTarih: startOfHalfYear.toISOString(),
      AltiAylikBitisTarih: endOfHalfYear.toISOString(),
      yillikBaslangicTarih: startOfYear.toISOString(),
      yillikBitisTarih: endOfYear.toISOString(),
    };
  }, []);

  // API call - memoized with useCallback to prevent recreation on every render
  const fetchData = useCallback(
    async (diff, targetPage) => {
      setLoading(true);
      try {
        let currentSetPointId = 0;

        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.siraNo || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.siraNo || 0;
        }

        const response = await AxiosInstance.post(`FuelLimit/GetFuelLimitList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`, {
          ...(body.filters?.customfilter || {}),
          ...buildPeriodRanges(),
        });

        const total = response.data.recordCount;
        setTotalCount(total);
        setCurrentPage(targetPage);

        const newData = response.data.list.map((item) => ({
          ...item,
          key: item.siraNo,
          brandModel: `${item.marka || ""} ${item.model || ""}`.trim(),
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
    },
    [searchTerm, body.filters, data, buildPeriodRanges]
  ); // Added data to dependencies

  // Initial data fetch - only run once on mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchData(0, 1);
    }
  }, [fetchData]);

  // Watch for body state changes
  useEffect(() => {
    if (JSON.stringify(body) !== JSON.stringify(prevBodyRef.current)) {
      fetchData(0, 1);
      prevBodyRef.current = { ...body };
    }
  }, [body, fetchData]);

  // Search handling
  // Define handleSearch function
  const handleSearch = useCallback(() => {
    fetchData(0, 1);
  }, [fetchData]);

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Find selected rows data
    const newSelectedRows = data.filter((row) => newSelectedRowKeys.includes(row.key));
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onRowClick = (record) => {
    setDrawer({ visible: true, data: record });
  };

  const refreshTableData = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    fetchData(0, 1);
  }, [fetchData]);

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Intl.DateTimeFormat kullanarak tarih formatlama
  const formatDate = useCallback((date) => {
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
  }, []);

  // ISO tarihlerin sadece tarih kısmını (YYYY-MM-DD) alıp yerel tarihe göre formatlar
  const formatDateFromISODateOnly = useCallback(
    (isoString) => {
      if (!isoString) return "";
      const datePart = typeof isoString === "string" ? isoString.slice(0, 10) : ""; // YYYY-MM-DD
      if (!datePart) return "";
      const [yearStr, monthStr, dayStr] = datePart.split("-");
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      const day = parseInt(dayStr, 10);
      if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return "";
      const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);
      return formatDate(localDate);
    },
    [formatDate]
  );

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  // Columns definition
  const initialColumns = useMemo(
    () => [
      {
        title: t("plaka"),
        dataIndex: "plaka",
        key: "plaka",
        width: 140,
        ellipsis: true,
        visible: true,
        render: (text, record) => (
          <div>
            <a onClick={() => onRowClick(record)} style={{ fontWeight: 500 }}>
              {text}
            </a>
            <div style={{ fontSize: "11px", color: "#9ca3af" }}>{record.brandModel || "-"}</div>
          </div>
        ),
        sorter: (a, b) => {
          if (a.plaka === null) return -1;
          if (b.plaka === null) return 1;
          return a.plaka.localeCompare(b.plaka);
        },
      },
      {
        title: t("surucu"),
        dataIndex: "surucuIsim",
        key: "surucuIsim",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,
        sorter: (a, b) => {
          if (a.surucuIsim === null) return -1;
          if (b.surucuIsim === null) return 1;
          return a.surucuIsim.localeCompare(b.surucuIsim);
        },
      },

      {
        title: t("limitTipi"),
        dataIndex: "limitTipi",
        key: "limitTipi",
        width: 120,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.limitTipi === null) return -1;
          if (b.limitTipi === null) return 1;
          return a.limitTipi.localeCompare(b.limitTipi);
        },
        render: (text) => {
          return t(text);
        },
      },

      {
        title: t("limitMiktariL"),
        dataIndex: "limit",
        key: "limit",
        width: 110,
        ellipsis: true,
        visible: true,
        render: (text) => <span>{formatNumberWithLocale(Number(text))}</span>,
        sorter: (a, b) => Number(a?.limit ?? 0) - Number(b?.limit ?? 0),
      },

      {
        title: t("tuketimL"),
        dataIndex: "toplamYakitMiktari",
        key: "toplamYakitMiktari",
        width: 110,
        ellipsis: true,
        visible: true,
        render: (text) => <span>{formatNumberWithLocale(Number(text))}</span>,
        sorter: (a, b) => Number(a?.toplamYakitMiktari ?? 0) - Number(b?.toplamYakitMiktari ?? 0),
      },

      {
        title: t("kalanL"),
        key: "kalan",
        width: 110,
        ellipsis: true,
        visible: true,
        render: (_, record) => {
          const limit = Number(record?.limit ?? 0);
          const toplam = Number(record?.toplamYakitMiktari ?? 0);
          return <span>{formatNumberWithLocale(limit - toplam)}</span>;
        },
        sorter: (a, b) => {
          const aVal = Number(a?.limit ?? 0) - Number(a?.toplamYakitMiktari ?? 0);
          const bVal = Number(b?.limit ?? 0) - Number(b?.toplamYakitMiktari ?? 0);
          return aVal - bVal;
        },
      },

      {
        title: t("kullanimYuzdesi"),
        key: "kullanimYuzdesi",
        width: 160,
        ellipsis: true,
        visible: true,
        render: (_, record) => {
          const limit = Number(record?.limit ?? 0);
          const used = Number(record?.toplamYakitMiktari ?? 0);
          const p = limit > 0 ? (used / limit) * 100 : 0;

          let color = "#10b981"; // emerald-500
          if (p >= 100)
            color = "#f43f5e"; // rose-500
          else if (p >= 70) color = "#f59e0b"; // amber-500

          return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ height: "8px", width: "100%", maxWidth: "80px", backgroundColor: "#f3f4f6", borderRadius: "4px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, p)}%`,
                    backgroundColor: color,
                    transition: "width 0.3s",
                  }}
                />
              </div>
              <span style={{ color: color, fontWeight: 500, fontSize: "12px" }}>{p.toFixed(0)}%</span>
            </div>
          );
        },
      },

      {
        title: t("donem"),
        dataIndex: "tarih",
        key: "donem",
        width: 180,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (!a.tarih) return -1;
          if (!b.tarih) return 1;
          return a.tarih.localeCompare(b.tarih);
        },
        render: (text, record) => {
          const ranges = buildPeriodRanges();
          const limitTipi = String(record?.limitTipi || "").toLowerCase();
          if (limitTipi === "haftalik") {
            return `${formatDateFromISODateOnly(ranges.haftalikBaslangicTarih)} - ${formatDateFromISODateOnly(ranges.haftalikBitisTarih)}`;
          }
          if (limitTipi === "aylik") {
            return `${formatDateFromISODateOnly(ranges.aylikBaslangicTarih)} - ${formatDateFromISODateOnly(ranges.aylikBitisTarih)}`;
          }
          if (limitTipi === "ucaylik") {
            return `${formatDateFromISODateOnly(ranges.ucAylikBaslangicTarih)} - ${formatDateFromISODateOnly(ranges.ucAylikBitisTarih)}`;
          }
          if (limitTipi === "altiaylik") {
            return `${formatDateFromISODateOnly(ranges.altiAylikBaslangicTarih)} - ${formatDateFromISODateOnly(ranges.altiAylikBitisTarih)}`;
          }
          if (limitTipi === "yillik") {
            return `${formatDateFromISODateOnly(ranges.yillikBaslangicTarih)} - ${formatDateFromISODateOnly(ranges.yillikBitisTarih)}`;
          }
          return formatDate(text);
        },
      },

      {
        title: t("sonIslem"),
        dataIndex: "sonIslemTarih",
        key: "sonIslemTarih",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (text) => formatDate(text),
      },

      {
        title: t("durum"),
        dataIndex: "durum",
        key: "durum",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (_, record) => {
          const limit = Number(record?.limit ?? 0);
          const used = Number(record?.toplamYakitMiktari ?? 0);
          const usagePercent = limit > 0 ? (used / limit) * 100 : used > 0 ? 101 : 0;

          let color = "green"; // Normal
          let label = t("normal");
          if (usagePercent > 100) {
            color = "red"; // Aşıldı
            label = t("asildi");
          } else if (usagePercent >= 70) {
            color = "orange"; // Riskte
            label = t("uyari");
          }

          return <Tag color={color}>{label}</Tag>;
        },
        sorter: (a, b) => {
          const limitA = Number(a?.limit ?? 0);
          const usedA = Number(a?.toplamYakitMiktari ?? 0);
          const limitB = Number(b?.limit ?? 0);
          const usedB = Number(b?.toplamYakitMiktari ?? 0);
          const pctA = limitA > 0 ? usedA / limitA : usedA > 0 ? Number.POSITIVE_INFINITY : 0;
          const pctB = limitB > 0 ? usedB / limitB : usedB > 0 ? Number.POSITIVE_INFINITY : 0;
          return pctA - pctB;
        },
      },
    ],
    [t, onRowClick, formatNumberWithLocale, buildPeriodRanges, formatDate, formatDateFromISODateOnly]
  );

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderYakitLimitleri");
    const savedVisibility = localStorage.getItem("columnVisibilityYakitLimitleri");
    const savedWidths = localStorage.getItem("columnWidthsYakitLimitleri");

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

    localStorage.setItem("columnOrderYakitLimitleri", JSON.stringify(order));
    localStorage.setItem("columnVisibilityYakitLimitleri", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsYakitLimitleri", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderYakitLimitleri", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityYakitLimitleri",
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
      "columnWidthsYakitLimitleri",
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
    localStorage.removeItem("columnOrderYakitLimitleri");
    localStorage.removeItem("columnVisibilityYakitLimitleri");
    localStorage.removeItem("columnWidthsYakitLimitleri");
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

  return (
    <div>
      <ConfigProvider locale={currentLocale}>
        <FormProvider {...formMethods}>
          {/* Modal for managing columns */}
          <Modal title="Sütunları Yönet" centered width={800} open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
            <Text style={{ marginBottom: "15px" }}>Aşağıdaki Ekranlardan Sütunları Göster / Gizle ve Sıralamalarını Ayarlayabilirsiniz.</Text>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button onClick={resetColumns} style={{ marginBottom: "15px" }}>
                Sütunları Sıfırla
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
                  <Text style={{ fontWeight: 600 }}>Sütunları Göster / Gizle</Text>
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
                    <Text style={{ fontWeight: 600 }}>Sütunların Sıralamasını Ayarla</Text>
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
                maxWidth: "935px",
                flexWrap: "wrap",
              }}
            >
              <StyledButton onClick={() => setIsModalVisible(true)}>
                <MenuOutlined />
              </StyledButton>
              <Input
                style={{ width: "250px" }}
                type="text"
                placeholder="Arama yap..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
              />

              {/* <Filters onChange={handleBodyChange} /> */}
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
              <CreateDrawer selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
            </div>
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
                  showTotal: (total, range) => `Toplam ${total}`,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: handleTableChange,
                }}
                scroll={{ y: "calc(100vh - 335px)" }}
              />
            </Spin>
            <EditDrawer selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
          </div>
        </FormProvider>
      </ConfigProvider>
    </div>
  );
};

export default memo(YakitLimitleri);
