import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import EditDrawer from "../../../pages/BakimVeOnarim/PeriyodikBakimlar/Update/EditDrawer";
import FormattedNumber, { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";

const { Text } = Typography;

// Hücrelerde ikincil (gri) alt başlık metni için ortak stil
const subTextStyle = { color: "#8c8c8c", fontSize: 12, lineHeight: "16px" };
const cellWrapperStyle = { display: "flex", flexDirection: "column", lineHeight: "18px" };

const renderYaklasanBakimCell = (remainingKm, remainingDays) => {
  if (remainingKm === null && remainingDays === null) return "-";

  // 1. Gecikmiş (Overdue)
  if ((remainingKm !== null && remainingKm < 0) || (remainingDays !== null && remainingDays < 0)) {
    const kmText = remainingKm !== null && remainingKm < 0 ? `${formatNumberWithLocale(Math.abs(remainingKm))} km` : "";
    const dayText = remainingDays !== null && remainingDays < 0 ? `${Math.abs(remainingDays)} gün` : "";
    const detailText = [kmText, dayText].filter(Boolean).join(" / ");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontWeight: 600, color: "#ff4d4f" }}>
          Gecikmiş ({detailText})
        </span>
        <div style={{ height: "4px", width: "100%", maxWidth: "120px", backgroundColor: "#ff4d4f", borderRadius: "2px" }} />
      </div>
    );
  }

  // 2. Bugün (Today)
  if (remainingDays === 0 || remainingKm === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontWeight: 600, color: "#ff6b6b" }}>Bugün</span>
        <div style={{ height: "4px", width: "100%", maxWidth: "120px", backgroundColor: "#ff6b6b", borderRadius: "2px" }} />
      </div>
    );
  }

  // 3. Yaklaşan (Upcoming)
  const normalizedKmDays = remainingKm !== null ? remainingKm / 40 : Infinity;
  const normalizedDays = remainingDays !== null ? remainingDays : Infinity;

  if (normalizedKmDays < normalizedDays) {
    // KM bazında daha yakın
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontWeight: 600, color: "#faad14" }}>
          {formatNumberWithLocale(remainingKm)} km sonra
        </span>
        <div style={{ height: "4px", width: "100%", maxWidth: "120px", backgroundColor: "#faad14", borderRadius: "2px" }} />
      </div>
    );
  } else {
    // Gün bazında daha yakın
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ fontWeight: 600, color: "#595959" }}>
          {remainingDays} gün sonra
        </span>
        <div style={{ height: "4px", width: "100%", maxWidth: "120px", backgroundColor: "#d9d9d9", borderRadius: "2px" }} />
      </div>
    );
  }
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
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

const PeriyodikBakim = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [pageSize, setPageSize] = useState(10); // Page size
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [selectedRowForEdit, setSelectedRowForEdit] = useState(null);

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

      const response = await AxiosInstance.get(`VehiclePeriodicReminder/GetVehiclePeriodicReminderList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`);

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
        // message.warning("No data found.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

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
    setSelectedRowForEdit(record);
    setEditDrawerVisible(true);
  };

  const handleEditDrawerClose = () => {
    setEditDrawerVisible(false);
    setSelectedRowForEdit(null);
  };

  const handleRefresh = () => {
    refreshTableData();
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
      width: 190,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const altBilgi = [record.marka, record.model].filter(Boolean).join(" ");
        return (
          <div style={cellWrapperStyle}>
            <a onClick={() => onRowClick(record)} style={{ fontWeight: 600 }}>
              {text || "-"}
            </a>
            {altBilgi && <span style={subTextStyle}>{altBilgi}</span>}
          </div>
        );
      },
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },

    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },

    {
      title: t("surucu"),
      dataIndex: "surucu",
      key: "surucu",
      width: 190,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.surucu === null) return -1;
        if (b.surucu === null) return 1;
        return a.surucu.localeCompare(b.surucu);
      },
    },

    {
      title: t("sonrakiHedef"),
      key: "sonrakiHedef",
      width: 160,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (_, record) => (
        <div style={cellWrapperStyle}>
          <span>{`${t("km").toLocaleUpperCase()}: ${formatNumberWithLocale(record.hedefKm)}`}</span>
          {record.hedefTarih && <span style={subTextStyle}>{formatDate(record.hedefTarih)}</span>}
        </div>
      ),
      sorter: (a, b) => (a.hedefKm ?? 0) - (b.hedefKm ?? 0),
    },

    {
      title: t("guncelKm"),
      dataIndex: "currentKm",
      key: "currentKm",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (value) => <FormattedNumber num={value} minimumFractionDigits={0} maximumFractionDigits={0} />,
      sorter: (a, b) => {
        if (a.currentKm === null) return -1;
        if (b.currentKm === null) return 1;
        return a.currentKm - b.currentKm;
      },
    },

    {
      title: t("kalan") || "Kalan",
      key: "periyot",
      width: 140,
      ellipsis: true,
      visible: true,
      render: (_, record) => {
        const remainingKm = calculateRemainingKm(record.hedefKm, record.currentKm);
        const remainingDays = calculateRemainingDays(record.hedefTarih);
        return (
          <div style={cellWrapperStyle}>
            <span>
              {remainingKm !== null ? (
                <>
                  {t("km").toLocaleUpperCase()}: {renderRemainingValue(remainingKm)}
                </>
              ) : (
                "-"
              )}
            </span>
            {remainingDays !== null && (
              <span style={subTextStyle}>
                {renderRemainingValue(remainingDays)} Gün
              </span>
            )}
          </div>
        );
      },
      sorter: (a, b) => {
        const aVal = calculateRemainingKm(a.hedefKm, a.currentKm);
        const bVal = calculateRemainingKm(b.hedefKm, b.currentKm);
        if (aVal === null) return -1;
        if (bVal === null) return 1;
        return aVal - bVal;
      },
    },

    {
      title: t("yaklasanBakim") || "Yaklaşan Bakım",
      key: "yaklasanBakim",
      width: 200,
      ellipsis: true,
      visible: true,
      render: (_, record) => {
        const remainingKm = calculateRemainingKm(record.hedefKm, record.currentKm);
        const remainingDays = calculateRemainingDays(record.hedefTarih);
        return renderYaklasanBakimCell(remainingKm, remainingDays);
      },
      sorter: (a, b) => {
        const aVal = calculateRemainingKm(a.hedefKm, a.currentKm);
        const bVal = calculateRemainingKm(b.hedefKm, b.currentKm);
        if (aVal === null) return -1;
        if (bVal === null) return 1;
        return aVal - bVal;
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

  // Kalan gün ve kalan km hesaplama yardımcıları
  const calculateRemainingDays = (targetDate) => {
    if (!targetDate) return null;
    try {
      const today = dayjs().startOf("day");
      const target = dayjs(targetDate).startOf("day");
      return target.diff(today, "day");
    } catch (error) {
      console.error("Error calculating remaining days:", error);
      return null;
    }
  };

  const calculateRemainingKm = (hedefKm, currentKm) => {
    if (hedefKm === null || hedefKm === undefined || currentKm === null || currentKm === undefined) return null;
    const diff = Number(hedefKm) - Number(currentKm);
    if (Number.isNaN(diff)) return null;
    return diff;
  };

  const renderRemainingValue = (value) => {
    if (value === null || value === undefined) return "";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return "";
    if (numeric < 0) {
      const formattedAbs = formatNumberWithLocale(Math.abs(numeric), 0, 0);
      return <Text style={{ color: "red" }}>({formattedAbs})</Text>;
    }
    return formatNumberWithLocale(numeric, 0, 0);
  };

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderPeriyodikBakim");
    const savedVisibility = localStorage.getItem("columnVisibilityPeriyodikBakim");
    const savedWidths = localStorage.getItem("columnWidthsPeriyodikBakim");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    // Artık var olmayan (eski) sütun anahtarlarını ayıkla
    const validKeys = initialColumns.map((col) => col.key);
    order = order.filter((key) => validKeys.includes(key));

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

    localStorage.setItem("columnOrderPeriyodikBakim", JSON.stringify(order));
    localStorage.setItem("columnVisibilityPeriyodikBakim", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsPeriyodikBakim", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderPeriyodikBakim", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityPeriyodikBakim",
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
      "columnWidthsPeriyodikBakim",
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
    localStorage.removeItem("columnOrderPeriyodikBakim");
    localStorage.removeItem("columnVisibilityPeriyodikBakim");
    localStorage.removeItem("columnWidthsPeriyodikBakim");
    window.location.reload();
  };

  return (
    <>
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
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "10px",
          gap: "10px",
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
          {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
          {/* Other toolbar components */}
        </div>
      </div>

      {/* Table */}

      <Spin spinning={loading}>
        <Table
          components={components}
          rowSelection={rowSelection}
          columns={filteredColumns}
          dataSource={data}
          pagination={{
            current: currentPage,
            total: totalCount,
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: handleTableChange,
          }}
          scroll={{ y: "calc(100vh - 335px)" }}
        />
      </Spin>

      <EditDrawer selectedRow={selectedRowForEdit} onDrawerClose={handleEditDrawerClose} drawerVisible={editDrawerVisible} onRefresh={handleRefresh} />
    </>
  );
};

export default PeriyodikBakim;
