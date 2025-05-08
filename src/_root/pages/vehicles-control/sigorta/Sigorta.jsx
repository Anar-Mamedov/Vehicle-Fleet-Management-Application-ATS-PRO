import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Progress, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Filters from "./filter/Filters";
import Status from "./filter/custom-filter/components/Status";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
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

const StyledTable = styled(Table)`
  .active-row {
    color: #23b545; // Green text color

    // This ensures links within active rows are also green
    a {
      color: #23b545;
    }
  }
`;

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

const Sigorta = () => {
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
    filters: { status: 1 },
  });

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
      const customFilters = body.filters.customfilters === "" ? null : body.filters.customfilters;

      const response = await AxiosInstance.post(`Insurance/GetInsuranceList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`, body.filters);

      const total = response.data.recordCount;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData = response.data.list.map((item) => ({
        ...item,
        key: item.siraNo, // Assign key directly from siraNo
      }));

      if (newData.length > 0) {
        setData(newData);
      } else {
        message.warning("No data found.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0, 1);
  }, []);

  useEffect(() => {
    if (body !== prevBodyRef.current) {
      fetchData(0, 1);
      prevBodyRef.current = body;
    }
  }, [body]);

  const prevBodyRef = useRef(body);

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
  }, []);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },
    {
      title: t("sigorta"),
      dataIndex: "sigorta",
      key: "sigorta",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.sigorta === null) return -1;
        if (b.sigorta === null) return 1;
        return a.sigorta.localeCompare(b.sigorta);
      },
    },
    {
      title: t("aktif"),
      dataIndex: "aktif",
      key: "aktif",
      width: 130,
      ellipsis: true,
      visible: true,
      render: (value) => (value ? <Tag color="success">{t("aktif")}</Tag> : <Tag color="error">{t("pasif")}</Tag>),
      sorter: (a, b) => {
        if (a.aktif === null) return -1;
        if (b.aktif === null) return 1;
        return a.aktif === b.aktif ? 0 : a.aktif ? -1 : 1;
      },
    },

    {
      title: t("baslangicTarih"),
      dataIndex: "baslangicTarih",
      key: "baslangicTarih",
      width: 110,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.baslangicTarih === null) return -1;
        if (b.baslangicTarih === null) return 1;
        return a.baslangicTarih.localeCompare(b.baslangicTarih);
      },
      render: (text) => formatDate(text),
    },

    {
      title: t("bitisTarih"),
      dataIndex: "bitisTarih",
      key: "bitisTarih",
      width: 110,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.bitisTarih === null) return -1;
        if (b.bitisTarih === null) return 1;
        return a.bitisTarih.localeCompare(b.bitisTarih);
      },
      render: (text) => formatDate(text),
    },

    {
      title: `${t("kalanSure")} (${t("gun")})`,
      dataIndex: "kalanSure",
      key: "kalanSure",
      width: 180,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.kalanSure === null) return -1;
        if (b.kalanSure === null) return 1;
        return a.kalanSure - b.kalanSure;
      },
      render: (text, record) => {
        const baslangicTarih = dayjs(record.baslangicTarih);
        const bitisTarih = dayjs(record.bitisTarih);
        const maxDays = bitisTarih.diff(baslangicTarih, "day");
        let percent = 0;
        if (text === 0) {
          percent = 0;
        } else if (text === maxDays) {
          percent = 100;
        } else {
          percent = (text / maxDays) * 100;
        }
        return <Progress percent={percent} steps={8} format={() => `${text}`} />;
      },
    },

    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 200,
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
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.policeNo === null) return -1;
        if (b.policeNo === null) return 1;
        return a.policeNo.localeCompare(b.policeNo);
      },
    },

    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: "tutar",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tutar === null) return -1;
        if (b.tutar === null) return 1;
        // Convert to numbers for numeric comparison
        const numA = parseFloat(a.tutar);
        const numB = parseFloat(b.tutar);
        return numA - numB;
      },
    },

    {
      title: t("acenta"),
      dataIndex: "acenta",
      key: "acenta",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.acenta === null) return -1;
        if (b.acenta === null) return 1;
        return a.acenta.localeCompare(b.acenta);
      },
    },

    {
      title: t("aracBedeli"),
      dataIndex: "aracBedeli",
      key: "aracBedeli",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tutar === null) return -1;
        if (b.tutar === null) return 1;
        // Convert to numbers for numeric comparison
        const numA = parseFloat(a.tutar);
        const numB = parseFloat(b.tutar);
        return numA - numB;
      },
    },

    {
      title: t("hasarsizlikIndirim"),
      dataIndex: "hasarsizlikIndirim",
      key: "hasarsizlikIndirim",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (!a.hasarsizlikIndirim && !b.hasarsizlikIndirim) return 0;
        if (!a.hasarsizlikIndirim) return -1;
        if (!b.hasarsizlikIndirim) return 1;
        return String(a.hasarsizlikIndirim).localeCompare(String(b.hasarsizlikIndirim));
      },
    },

    // Add other columns as needed
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

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderSigorta");
    const savedVisibility = localStorage.getItem("columnVisibilitySigorta");
    const savedWidths = localStorage.getItem("columnWidthsSigorta");

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

    localStorage.setItem("columnOrderSigorta", JSON.stringify(order));
    localStorage.setItem("columnVisibilitySigorta", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsSigorta", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderSigorta", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilitySigorta",
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
      "columnWidthsSigorta",
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
    localStorage.removeItem("columnOrderSigorta");
    localStorage.removeItem("columnVisibilitySigorta");
    localStorage.removeItem("columnWidthsSigorta");
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
            <div style={{ width: "100px" }}>
              <Status value={body?.filters?.status ?? 1} onChange={handleBodyChange} />
            </div>
            <Filters onChange={handleBodyChange} />
            {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
            {/* Other toolbar components */}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
            <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
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
          <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
        </div>
      </ConfigProvider>
    </>
  );
};

export default Sigorta;
