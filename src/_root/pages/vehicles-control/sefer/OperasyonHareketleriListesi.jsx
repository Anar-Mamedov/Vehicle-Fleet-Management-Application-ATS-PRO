import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Table, Button, Dropdown, Modal, Checkbox, Input, Spin, Typography, Tag, message } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, ExportOutlined, MoreOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import "./ResizeStyle.css";
import { formatDateByLocale } from "../../../components/FormattedDate";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import { compareDatesForSorter } from "../../../../utils/dateUtils";
import ExcelExportButton from "../../../components/ExcelExportButton";
import { DeleteExpeditionOperationItemsService, GetExpeditionOperationsListService, GetExpeditionOperationsReportService } from "../../../../api/services/vehicles/operations_services";
import ContextMenu from "./hareket/ContextMenu/ContextMenu";
import HareketFilters, { DEFAULT_HAREKET_FILTERS } from "./filter/HareketFilters";
import HareketModal from "./hareket/HareketModal";

const { Text } = Typography;

const PAGE_SIZE = 10;

// Excel raporu backend tarafında en fazla 180 günlük aralıkla üretilebiliyor
const MAX_REPORT_RANGE_DAYS = 180;

const SECONDARY_TEXT_COLOR = "#8c8c8c";
const PRIMARY_TEXT_COLOR = "#141414";

// Para birimi sembolü uygulama ayarlarından gelene kadar biçimlendirme katmanında tutulur
const CURRENCY_SYMBOL = "₺";

// Liste servisi metin alanlarını hareket detay servisiyle (GetExpeditionOperationItemById) aynı adlarla döndürür
const FIELDS = {
  hareketTip: "oprTip",
  firma: "firmaUnvan",
  guzergah: "guzergah",
};

const secondaryLineStyle = {
  fontSize: "12px",
  color: SECONDARY_TEXT_COLOR,
  lineHeight: "18px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const primaryLineStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const tagStyle = {
  borderRadius: "12px",
  margin: 0,
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

const toLowerTr = (value) => String(value || "").toLocaleLowerCase("tr");

// Hareket tipine göre etiket rengi; tanımsız tipler nötr gösterilir
const HAREKET_TIP_TAG_COLORS = {
  giriş: "green",
  çıkış: "blue",
  mesai: "purple",
  özel: "default",
};

// Durum etiketleri tasarımdaki gibi renkli noktayla gösterilir
const DURUM_COLORS = {
  planlandı: { tag: "processing", dot: "#1677ff" },
  "devam ediyor": { tag: "warning", dot: "#faad14" },
  tamamlandı: { tag: "success", dot: "#52c41a" },
  iptal: { tag: "error", dot: "#ff4d4f" },
};

const compareText = (a, b) => {
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  return String(a).localeCompare(String(b));
};

const compareNumber = (a, b) => (Number(a) || 0) - (Number(b) || 0);

// Kullanıcıya gösterilecek mesajı taşıyan hata; Excel bileşeni bu mesajı olduğu gibi gösterir
const createUserError = (userMessage) => Object.assign(new Error(userMessage), { userMessage });

const renderNumber = (value) => formatNumberWithLocale(value ?? 0);

const renderText = (value) => value || "-";

// Servisin gönderdiği ondalık basamak sayısı korunur (bkz. RULES.md 8)
const getDecimalDigits = (value) => {
  const parts = String(value ?? "").split(".");
  return parts.length > 1 ? Math.min(parts[1].length, 20) : 0;
};

const renderAmount = (value) => {
  const digits = getDecimalDigits(value);

  return <span style={{ fontWeight: 600, color: PRIMARY_TEXT_COLOR }}>{`${CURRENCY_SYMBOL}${formatNumberWithLocale(value ?? 0, digits, digits)}`}</span>;
};

const renderHareketTip = (value) =>
  value ? (
    <Tag color={HAREKET_TIP_TAG_COLORS[toLowerTr(value)] || "default"} style={tagStyle}>
      {value}
    </Tag>
  ) : (
    "-"
  );

const renderDurum = (value) => {
  if (!value) return "-";

  const colors = DURUM_COLORS[toLowerTr(value)] || { tag: "default", dot: "#bfbfbf" };

  return (
    <Tag color={colors.tag} style={{ ...tagStyle, display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.dot, display: "inline-block" }} />
      {value}
    </Tag>
  );
};

// Excel'de tabloda görünen değerler yazılır
const formatExcelCellValue = (value, row, column) => {
  if (column.key === "gerceklesenTarihExcel") {
    return formatDateByLocale(value, undefined, "");
  }

  if (column.key === "gerceklesenSaatExcel") {
    return formatDateByLocale(value, "HH:mm", "");
  }

  return value ?? "";
};

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

ResizableTitle.propTypes = {
  onResize: PropTypes.func,
  width: PropTypes.number,
};

// Sütunların boyutlarını ayarlamak için kullanılan component sonu

// Sütunların sürüklenebilir olmasını sağlayan component

const DraggableRow = ({ id, text, style, ...restProps }) => {
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
};

DraggableRow.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.node,
  style: PropTypes.object,
};

// Sütunların sürüklenebilir olmasını sağlayan component sonu

const OperasyonHareketleriListesi = ({ onTotalCountChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });

  const formMethods = useForm();

  // İstekler her zaman güncel arama/filtre değerleriyle çalışsın diye ref üzerinde tutuluyor
  const searchTermRef = useRef("");
  const filtersRef = useRef(DEFAULT_HAREKET_FILTERS);
  const dataRef = useRef([]);
  const currentPageRequestRef = useRef({ diff: 0, setPointId: 0, targetPage: 1 });
  // Filtreler hızlı değiştiğinde geç dönen isteğin listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  // API Data Fetching with diff and setPointId
  const fetchData = useCallback(
    async (diff, targetPage) => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setLoading(true);

      try {
        const currentList = dataRef.current;
        let currentSetPointId = 0;

        if (diff > 0) {
          // Moving forward
          currentSetPointId = currentList[currentList.length - 1]?.key || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = currentList[0]?.key || 0;
        }

        const response = await GetExpeditionOperationsListService(diff, currentSetPointId, searchTermRef.current, filtersRef.current);

        if (requestId !== requestIdRef.current) return;

        const newData = (response.data.list || []).map((item) => ({
          ...item,
          key: item.seferOprId,
        }));

        currentPageRequestRef.current = {
          diff,
          setPointId: currentSetPointId,
          targetPage,
        };

        dataRef.current = newData;
        setData(newData);
        setTotalCount(response.data.recordCount);
        onTotalCountChange(response.data.recordCount || 0);
        setCurrentPage(targetPage);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;
        console.error("Error fetching data:", error);
        message.error(t("islemBasarisiz"));
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    },
    [onTotalCountChange]
  );

  useEffect(() => {
    fetchData(0, 1);
  }, [fetchData]);

  // Search handling
  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    fetchData(0, 1);
  };

  const handleFilterChange = (filters) => {
    filtersRef.current = filters;
    searchTermRef.current = searchTerm;
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
  }, [fetchData]);

  const refreshCurrentPageData = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    const { diff, targetPage } = currentPageRequestRef.current;
    fetchData(diff, targetPage);
  }, [fetchData]);

  // Satır menüsünden tek kayıt silme; toolbar'daki toplu silme menüsünden bağımsız çalışır
  const handleDelete = useCallback(
    async (record) => {
      try {
        const response = await DeleteExpeditionOperationItemsService([record.key]);
        const statusCode = response?.data?.statusCode;

        if ([200, 201, 202, 204].includes(statusCode)) {
          message.success(t("islemBasarili"));
          refreshCurrentPageData();
        } else if (statusCode === 401) {
          message.error(t("buIslemiYapmayaYetkinizYok"));
        } else {
          message.error(t("islemBasarisiz"));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        message.error(t("islemBasarisiz"));
      }
    },
    [refreshCurrentPageData]
  );

  const confirmDelete = (record) => {
    Modal.confirm({
      title: t("kaydiSilmekIstediginizdenEminMisiniz"),
      icon: <QuestionCircleOutlined style={{ color: "red" }} />,
      okText: t("evet"),
      cancelText: t("hayir"),
      onOk: () => handleDelete(record),
    });
  };

  // Excel raporu tarih aralığı zorunlu ve en fazla 180 gün olabilir
  const requestExcelReport = async () => {
    const { baslangicTarih, bitisTarih } = filtersRef.current;

    if (!baslangicTarih || !bitisTarih) {
      throw createUserError(t("raporIcinTarihAraligiSecmelisiniz"));
    }

    if (dayjs(bitisTarih).diff(dayjs(baslangicTarih), "day") > MAX_REPORT_RANGE_DAYS) {
      throw createUserError(t("raporTarihAraligiEnFazla180Gun"));
    }

    const response = await GetExpeditionOperationsReportService(searchTermRef.current, filtersRef.current);

    if (response?.data?.status === false) {
      throw createUserError(response.data.message);
    }

    return response;
  };

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("tarih"),
      dataIndex: "gerceklesenTarih",
      key: "gerceklesenTarih",
      width: 130,
      visible: true,
      // Hücrede tarih ve saat birlikte gösterildiği için Excel'de iki ayrı sütuna açılır
      excelColumns: [
        { title: t("tarih"), dataIndex: "gerceklesenTarih", key: "gerceklesenTarihExcel", width: 130 },
        { title: t("saat"), dataIndex: "gerceklesenTarih", key: "gerceklesenSaatExcel", width: 100 },
      ],
      sorter: (a, b) => compareDatesForSorter(a.gerceklesenTarih, b.gerceklesenTarih),
      render: (text) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ ...primaryLineStyle, fontWeight: 600 }}>{formatDateByLocale(text)}</span>
          <span style={secondaryLineStyle}>{formatDateByLocale(text, "HH:mm", "")}</span>
        </div>
      ),
    },
    {
      title: t("operasyonNo"),
      dataIndex: "seferNo",
      key: "seferNo",
      width: 140,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.seferNo, b.seferNo),
      render: (text, record) => (
        <a onClick={() => onRowClick(record)} style={{ ...primaryLineStyle, fontWeight: 600 }}>
          {text || "-"}
        </a>
      ),
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 140,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.plaka, b.plaka),
      render: renderText,
    },
    {
      title: t("hareketTipi"),
      dataIndex: FIELDS.hareketTip,
      key: "oprTip",
      width: 140,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a[FIELDS.hareketTip], b[FIELDS.hareketTip]),
      render: renderHareketTip,
    },
    {
      title: t("firma"),
      dataIndex: FIELDS.firma,
      key: "firma",
      width: 180,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a[FIELDS.firma], b[FIELDS.firma]),
      render: renderText,
    },
    {
      title: t("guzergah"),
      dataIndex: FIELDS.guzergah,
      key: "guzergah",
      width: 220,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a[FIELDS.guzergah], b[FIELDS.guzergah]),
      render: renderText,
    },
    {
      title: t("operasyonYeri"),
      dataIndex: "oprYer",
      key: "oprYer",
      width: 170,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.oprYer, b.oprYer),
      render: renderText,
    },
    {
      title: t("vardiya"),
      dataIndex: "vardiya",
      key: "vardiya",
      width: 120,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.vardiya, b.vardiya),
      render: renderText,
    },
    {
      title: t("planlanan"),
      dataIndex: "planlananMiktar",
      key: "planlananMiktar",
      width: 130,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.planlananMiktar, b.planlananMiktar),
      render: renderNumber,
    },
    {
      title: t("gerceklesen"),
      dataIndex: "gerceklesenMiktar",
      key: "gerceklesenMiktar",
      width: 140,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.gerceklesenMiktar, b.gerceklesenMiktar),
      render: renderNumber,
    },
    {
      title: t("birim"),
      dataIndex: "yuklemeBirim",
      key: "yuklemeBirim",
      width: 110,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.yuklemeBirim, b.yuklemeBirim),
      render: renderText,
    },
    {
      title: t("hakedisTutari"),
      dataIndex: "hakedisTutar",
      key: "hakedisTutar",
      width: 150,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.hakedisTutar, b.hakedisTutar),
      render: renderAmount,
    },
    {
      title: t("durum"),
      dataIndex: "durum",
      key: "durum",
      width: 140,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.durum, b.durum),
      render: renderDurum,
    },

    // Tasarımda yer almayan, "Sütunları Yönet" ekranından açılabilen sütun
    {
      title: t("birimFiyat"),
      dataIndex: "birimFiyat",
      key: "birimFiyat",
      width: 130,
      visible: false,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.birimFiyat, b.birimFiyat),
      render: renderAmount,
    },
  ];

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderOperasyonHareketleri");
    const savedVisibility = localStorage.getItem("columnVisibilityOperasyonHareketleri");
    const savedWidths = localStorage.getItem("columnWidthsOperasyonHareketleri");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    // Tanımı kaldırılmış sütunlar kayıtlı ayarlardan temizlenir
    order = order.filter((key) => initialColumns.some((col) => col.key === key));

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

    localStorage.setItem("columnOrderOperasyonHareketleri", JSON.stringify(order));
    localStorage.setItem("columnVisibilityOperasyonHareketleri", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsOperasyonHareketleri", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderOperasyonHareketleri", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityOperasyonHareketleri",
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
      "columnWidthsOperasyonHareketleri",
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

  // Tasarımdaki satır işlem menüsü; sütun yönetiminde yer almaz ve sağa sabitlenir
  const islemlerColumn = {
    title: t("islemler"),
    key: "islemler",
    width: 90,
    align: "center",
    fixed: "right",
    render: (_, record) => (
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            { key: "duzenle", icon: <EditOutlined />, label: t("duzenle") },
            { key: "sil", icon: <DeleteOutlined />, label: t("sil"), danger: true },
          ],
          onClick: ({ key }) => (key === "duzenle" ? onRowClick(record) : confirmDelete(record)),
        }}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  };

  const tableColumns = [...filteredColumns, islemlerColumn];

  // Seçim ve işlem sütunları dahil toplam genişlik; tablo bu genişlikten sonra yatay kayar
  const tableScrollX = tableColumns.reduce((total, col) => total + (col.width || 0), 60);

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
    setColumns((prev) => prev.map((col) => (col.key === key ? { ...col, visible: checked } : col)));
  };

  // Reset columns
  const resetColumns = () => {
    localStorage.removeItem("columnOrderOperasyonHareketleri");
    localStorage.removeItem("columnVisibilityOperasyonHareketleri");
    localStorage.removeItem("columnWidthsOperasyonHareketleri");
    window.location.reload();
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      {/* Modal for managing columns */}
      <Modal title={t("sutunlariYonet")} centered width={800} open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
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
            {t("sutunlariSifirla")}
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
              <Text style={{ fontWeight: 600 }}>{t("sutunlariGosterGizle")}</Text>
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

          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
                <Text style={{ fontWeight: 600 }}>{t("sutunlarinSiralamasiniAyarla")}</Text>
              </div>
              <div style={{ height: "400px", overflow: "auto" }}>
                <SortableContext items={columns.filter((col) => col.visible).map((col) => col.key)} strategy={verticalListSortingStrategy}>
                  {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                      <DraggableRow key={col.key} id={col.key} text={col.title} />
                    ))}
                </SortableContext>
              </div>
            </div>
          </DndContext>
        </div>
      </Modal>

      <FormProvider {...formMethods}>
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
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <StyledButton onClick={() => setIsModalVisible(true)}>
              <MenuOutlined />
            </StyledButton>
            <Input
              style={{ width: "130px" }}
              type="text"
              placeholder={t("aramaYap")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <HareketFilters onChange={handleFilterChange} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ExcelExportButton
              request={requestExcelReport}
              columns={filteredColumns}
              fileName="Operasyon_Hareketleri.xlsx"
              sheetName={t("operasyonHareketleri")}
              formatCellValue={formatExcelCellValue}
              buttonProps={{ icon: <ExportOutlined />, children: t("disariAktar") }}
            />
            <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 410px)",
            borderRadius: "8px 8px 8px 8px",
          }}
        >
          <Spin spinning={loading}>
            <Table
              components={components}
              rowSelection={rowSelection}
              columns={tableColumns}
              dataSource={data}
              pagination={{
                current: currentPage,
                total: totalCount,
                pageSize: PAGE_SIZE,
                showSizeChanger: false,
                onChange: handleTableChange,
              }}
              scroll={{ y: "calc(100vh - 565px)", x: tableScrollX }}
            />
          </Spin>
          <HareketModal open={drawer.visible} seferOprId={drawer.data?.key} onClose={() => setDrawer({ ...drawer, visible: false })} onRefresh={refreshCurrentPageData} />
        </div>
      </FormProvider>
    </>
  );
};

OperasyonHareketleriListesi.propTypes = {
  onTotalCountChange: PropTypes.func.isRequired,
};

export default OperasyonHareketleriListesi;
