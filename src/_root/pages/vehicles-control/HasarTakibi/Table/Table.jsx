import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from "react";
import { useFormContext } from "react-hook-form";
import ContextMenu from "../components/ContextMenu/ContextMenu";
import CreateDrawer from "../Insert/CreateDrawer";
import EditDrawer from "../Update/EditDrawer";
import Filters from "./filter/Filters";
import BreadcrumbComp from "../../../../components/breadcrumb/Breadcrumb.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Progress, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
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

const HasarTakibi = () => {
  const formMethods = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [pageSize, setPageSize] = useState(10); // Page size
  const [localeDateFormat, setLocaleDateFormat] = useState("MM/DD/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  const prevBodyRef = useRef(body);

  // API call - memoized with useCallback to prevent recreation on every render
  const fetchData = useCallback(
    async (diff, targetPage) => {
      setLoading(true);
      try {
        let currentSetPointId = 0;

        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.tbHasarId || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.tbHasarId || 0;
        }

        const response = await AxiosInstance.get(
          `DamageTracking/GetDamageList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`,
          body.filters?.customfilter || {}
        );

        const total = response.data.recordCount;
        setTotalCount(total);
        setCurrentPage(targetPage);

        const newData = response.data.list.map((item) => ({
          ...item,
          key: item.tbHasarId,
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
    [searchTerm, body.filters, data]
  ); // Added data to dependencies

  // Initial data fetch - only run once on mount
  useEffect(() => {
    fetchData(0, 1);
  }, []); // Use empty dependency array for initial load only

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

  // Columns definition (adjust as needed)
  const initialColumns = useMemo(
    () => [
      {
        title: t("hasarNo"),
        dataIndex: "hasarNo",
        key: "hasarNo",
        width: 120,
        ellipsis: true,
        visible: true,
        render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,
        sorter: (a, b) => {
          if (a.hasarNo === null) return -1;
          if (b.hasarNo === null) return 1;
          return a.hasarNo.localeCompare(b.hasarNo);
        },
      },
      {
        title: t("tarih"),
        dataIndex: "tarih",
        key: "tarih",
        width: 110,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.tarih === null) return -1;
          if (b.tarih === null) return 1;
          return a.tarih.localeCompare(b.tarih);
        },
        render: (text) => formatDate(text),
      },
      {
        title: t("saat"),
        dataIndex: "saat",
        key: "saat",
        width: 100,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.saat === null) return -1;
          if (b.saat === null) return 1;
          return a.saat.localeCompare(b.saat);
        },
        render: (text) => formatTime(text),
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
        title: t("marka"),
        dataIndex: "marka",
        key: "marka",
        width: 180,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.marka === null) return -1;
          if (b.marka === null) return 1;
          return a.marka.localeCompare(b.marka);
        },
      },
      {
        title: t("model"),
        dataIndex: "model",
        key: "model",
        width: 250,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.model === null) return -1;
          if (b.model === null) return 1;
          return a.model.localeCompare(b.model);
        },
      },
      {
        title: t("surucuAdi"),
        dataIndex: "surucuAdi",
        key: "surucuAdi",
        width: 180,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.surucuAdi === null) return -1;
          if (b.surucuAdi === null) return 1;
          return a.surucuAdi.localeCompare(b.surucuAdi);
        },
      },
      {
        title: t("durum"),
        dataIndex: "durum",
        key: "durum",
        width: 180,
        ellipsis: true,
        visible: true,
        render: (text) => {
          const getStatusColor = (status) => {
            const trimmedStatus = status ? status.trim() : "";
            switch (trimmedStatus) {
              case "Yeni Kayıt":
                return "blue";
              case "İncelemede":
                return "orange";
              case "Ekspertize Yönlendirildi":
                return "purple";
              case "Ekspertiz Tamamlandı":
                return "cyan";
              case "Onarım Planlandı":
                return "geekblue";
              case "Onarımda":
                return "volcano";
              case "Sigorta Sürecinde":
                return "gold";
              case "Tahsilat Tamamlandı":
                return "lime";
              case "Kapatıldı":
                return "green";
              case "Reddedildi":
                return "red";
              default:
                return "default";
            }
          };

          const trimmedText = text ? text.trim() : "";
          return trimmedText ? (
            <Tag color={getStatusColor(trimmedText)} style={{ fontWeight: 500 }}>
              {trimmedText}
            </Tag>
          ) : (
            ""
          );
        },
        sorter: (a, b) => {
          if (a.durum === null) return -1;
          if (b.durum === null) return 1;
          return a.durum.localeCompare(b.durum);
        },
      },
      {
        title: t("olayYeri"),
        dataIndex: "olayYeri",
        key: "olayYeri",
        width: 150,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.olayYeri === null) return -1;
          if (b.olayYeri === null) return 1;
          return a.olayYeri.localeCompare(b.olayYeri);
        },
      },
      {
        title: t("hasarTipi"),
        dataIndex: "hasarTipi",
        key: "hasarTipi",
        width: 200,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.hasarTipi === null) return -1;
          if (b.hasarTipi === null) return 1;
          return a.hasarTipi.localeCompare(b.hasarTipi);
        },
      },
      {
        title: t("hasarliBolge"),
        dataIndex: "hasarBolge",
        key: "hasarBolge",
        width: 160,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.hasarBolge === null) return -1;
          if (b.hasarBolge === null) return 1;
          return a.hasarBolge.localeCompare(b.hasarBolge);
        },
      },
      {
        title: t("hasarBoyutu"),
        dataIndex: "hasarBoyut",
        key: "hasarBoyut",
        width: 190,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.hasarBoyut === null) return -1;
          if (b.hasarBoyut === null) return 1;
          return a.hasarBoyut.localeCompare(b.hasarBoyut);
        },
      },
      {
        title: t("lokasyon"),
        dataIndex: "lokasyon",
        key: "lokasyon",
        width: 170,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.lokasyon === null) return -1;
          if (b.lokasyon === null) return 1;
          return a.lokasyon.localeCompare(b.lokasyon);
        },
      },
      {
        title: t("policeNo"),
        dataIndex: "policeNo",
        key: "policeNo",
        width: 120,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.policeNo === null) return -1;
          if (b.policeNo === null) return 1;
          return a.policeNo.localeCompare(b.policeNo);
        },
      },
      {
        title: t("aracKullanilabilir"),
        dataIndex: "aracKullanilir",
        key: "aracKullanilir",
        width: 130,
        ellipsis: true,
        visible: true,
        render: (text) => <div style={{ textAlign: "center" }}>{text ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#ff4d4f" }} />}</div>,
        sorter: (a, b) => {
          if (a.aracKullanilir === null) return -1;
          if (b.aracKullanilir === null) return 1;
          return a.aracKullanilir - b.aracKullanilir;
        },
      },
      {
        title: t("kazayaKarisanBaskaAracVar"),
        dataIndex: "kazaYapanBaskaArac",
        key: "kazaYapanBaskaArac",
        width: 170,
        ellipsis: true,
        visible: true,
        render: (text) => <div style={{ textAlign: "center" }}>{text ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#ff4d4f" }} />}</div>,
        sorter: (a, b) => {
          if (a.kazaYapanBaskaArac === null) return -1;
          if (b.kazaYapanBaskaArac === null) return 1;
          return a.kazaYapanBaskaArac - b.kazaYapanBaskaArac;
        },
      },
      {
        title: t("polisRaporuVar"),
        dataIndex: "polisRaporuVar",
        key: "polisRaporuVar",
        width: 140,
        ellipsis: true,
        visible: true,
        render: (text) => <div style={{ textAlign: "center" }}>{text ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CloseOutlined style={{ color: "#ff4d4f" }} />}</div>,
        sorter: (a, b) => {
          if (a.polisRaporuVar === null) return -1;
          if (b.polisRaporuVar === null) return 1;
          return a.polisRaporuVar - b.polisRaporuVar;
        },
      },
    ],
    []
  );

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

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderHasarTakibi");
    const savedVisibility = localStorage.getItem("columnVisibilityHasarTakibi");
    const savedWidths = localStorage.getItem("columnWidthsHasarTakibi");

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

    localStorage.setItem("columnOrderHasarTakibi", JSON.stringify(order));
    localStorage.setItem("columnVisibilityHasarTakibi", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsHasarTakibi", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderHasarTakibi", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityHasarTakibi",
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
      "columnWidthsHasarTakibi",
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
    localStorage.removeItem("columnOrderHasarTakibi");
    localStorage.removeItem("columnVisibilityHasarTakibi");
    localStorage.removeItem("columnWidthsHasarTakibi");
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

              {/*  <Filters onChange={handleBodyChange} /> */}
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

export default memo(HasarTakibi);
