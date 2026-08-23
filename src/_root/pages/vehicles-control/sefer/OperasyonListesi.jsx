import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, ExportOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import "./ResizeStyle.css";
import { formatDateByLocale } from "../../../components/FormattedDate";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import ExcelExportButton from "../../../components/ExcelExportButton";
import { GetExpeditionReportService, GetExpeditionsListService } from "../../../../api/services/vehicles/operations_services";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import OperasyonFilters, { DEFAULT_OPERASYON_FILTERS } from "./filter/OperasyonFilters";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const { Text } = Typography;

// Excel raporu backend tarafında en fazla 180 günlük aralıkla üretilebiliyor
const MAX_REPORT_RANGE_DAYS = 180;

const SECONDARY_TEXT_COLOR = "#8c8c8c";
const PRIMARY_TEXT_COLOR = "#141414";

// Hakediş/net gelir yeşil, masraf ve negatif net kırmızı gösterilir
const POSITIVE_AMOUNT_COLOR = "#52c41a";
const NEGATIVE_AMOUNT_COLOR = "#ff4d4f";

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

// Sefer durumuna göre etiket rengi; tanımsız durumlar nötr gösterilir
const DURUM_TAG_COLORS = {
  planlandı: "processing",
  "devam ediyor": "warning",
  tamamlandı: "success",
  iptal: "default",
};

const getDurumTagColor = (durum) => DURUM_TAG_COLORS[String(durum || "").toLocaleLowerCase("tr")] || "default";

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

const renderAmount = (value, color) => <span style={{ color }}>{formatNumberWithLocale(value ?? 0)}</span>;

// Dakika cinsinden süre "1s 45dk" biçiminde gösterilir
const formatSure = (dakika) => {
  const totalMinutes = Number(dakika) || 0;

  return `${Math.floor(totalMinutes / 60)}${t("saatKisa")} ${totalMinutes % 60}${t("dakikaKisa")}`;
};

// Km hücresindeki "Çıkış KM: 120.450" satırı
const renderKmLine = (label, value) => (
  <span style={secondaryLineStyle}>
    {`${label}: `}
    <span style={{ color: PRIMARY_TEXT_COLOR, fontWeight: 600 }}>{formatNumberWithLocale(value ?? 0)}</span>
  </span>
);

// Net tutar servisten gelmezse hakediş - masraf olarak hesaplanır
const getNetTutar = (record) => {
  const rawNet = record?.toplamNetTutar;
  const net = Number(rawNet);

  if (rawNet !== null && rawNet !== undefined && rawNet !== "" && Number.isFinite(net)) {
    return net;
  }

  return (Number(record?.toplamHakedisTutar) || 0) - (Number(record?.toplamMasrafTutar) || 0);
};

// Excel'de tabloda görünen değerler yazılır
const formatExcelCellValue = (value, row, column) => {
  if (column.key === "cikisTarih" || column.key === "varisTarih") {
    return formatDateByLocale(value, undefined, "");
  }

  if (column.key === "sureDakika") {
    return formatSure(value);
  }

  if (column.key === "toplamNetTutar") {
    return getNetTutar(row);
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

const OperasyonListesi = ({ onStatisticsRefresh, onTotalCountChange }) => {
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
  const filtersRef = useRef(DEFAULT_OPERASYON_FILTERS);
  const dataRef = useRef([]);
  const currentPageRequestRef = useRef({ diff: 0, setPointId: 0, targetPage: 1 });
  // Filtreler hızlı değiştiğinde geç dönen isteğin listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  const triggerStatisticsRefresh = useCallback(() => {
    onStatisticsRefresh((prev) => ({
      searchTerm: searchTermRef.current,
      filters: filtersRef.current,
      requestId: prev.requestId + 1,
    }));
  }, [onStatisticsRefresh]);

  // API Data Fetching with diff and setPointId
  const fetchData = useCallback(async (diff, targetPage) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const currentList = dataRef.current;
      let currentSetPointId = 0;

      if (diff > 0) {
        // Moving forward
        currentSetPointId = currentList[currentList.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        // Moving backward
        currentSetPointId = currentList[0]?.siraNo || 0;
      }

      const response = await GetExpeditionsListService(diff, currentSetPointId, searchTermRef.current, filtersRef.current);

      if (requestId !== requestIdRef.current) return;

      const newData = (response.data.list || []).map((item) => ({
        ...item,
        key: item.siraNo,
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
  }, [onTotalCountChange]);

  useEffect(() => {
    fetchData(0, 1);
  }, [fetchData]);

  // Search handling
  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    fetchData(0, 1);
    triggerStatisticsRefresh();
  };

  const handleFilterChange = (filters) => {
    filtersRef.current = filters;
    searchTermRef.current = searchTerm;
    fetchData(0, 1);
    triggerStatisticsRefresh();
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
    triggerStatisticsRefresh();
  }, [fetchData, triggerStatisticsRefresh]);

  const refreshCurrentPageData = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    const { diff, targetPage } = currentPageRequestRef.current;
    fetchData(diff, targetPage);
    triggerStatisticsRefresh();
  }, [fetchData, triggerStatisticsRefresh]);

  // Excel raporu tarih aralığı zorunlu ve en fazla 180 gün olabilir
  const requestExcelReport = async () => {
    const { baslangicTarih, bitisTarih } = filtersRef.current;

    if (!baslangicTarih || !bitisTarih) {
      throw createUserError(t("raporIcinTarihAraligiSecmelisiniz"));
    }

    if (dayjs(bitisTarih).diff(dayjs(baslangicTarih), "day") > MAX_REPORT_RANGE_DAYS) {
      throw createUserError(t("raporTarihAraligiEnFazla180Gun"));
    }

    const response = await GetExpeditionReportService(searchTermRef.current, filtersRef.current);

    if (response?.data?.status === false) {
      throw createUserError(response.data.message);
    }

    return response;
  };

  // Columns definition (adjust as needed)
  const initialColumns = [
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
          {text}
        </a>
      ),
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 180,
      visible: true,
      // Hücrede plaka + marka + model gösterildiği için Excel'de üç ayrı sütuna açılır
      excelColumns: [
        { title: t("plaka"), dataIndex: "plaka", key: "plakaNo", width: 130 },
        { title: t("marka"), dataIndex: "marka", key: "plakaMarka", width: 160 },
        { title: t("model"), dataIndex: "model", key: "plakaModel", width: 200 },
      ],
      sorter: (a, b) => compareText(a.plaka, b.plaka),
      render: (text, record) => {
        const markaModel = [record.marka, record.model].filter(Boolean).join(" ");

        return (
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={{ ...primaryLineStyle, fontWeight: 600 }}>{text || "-"}</span>
            {markaModel ? <span style={secondaryLineStyle}>{markaModel}</span> : null}
          </div>
        );
      },
    },
    {
      title: t("firma"),
      dataIndex: "firma",
      key: "firma",
      width: 160,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.firma, b.firma),
      render: renderText,
    },
    {
      title: t("surucu"),
      dataIndex: "surucuIsim1",
      key: "surucuIsim1",
      width: 180,
      visible: true,
      // Hücrede sürücü + görevi gösterildiği için Excel'de iki ayrı sütuna açılır
      excelColumns: [
        { title: t("surucu"), dataIndex: "surucuIsim1", key: "surucuIsim", width: 180 },
        { title: t("gorev"), dataIndex: "surucuGorev1", key: "surucuGorev", width: 160 },
      ],
      sorter: (a, b) => compareText(a.surucuIsim1, b.surucuIsim1),
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ ...primaryLineStyle, fontWeight: 600 }}>{text || "-"}</span>
          {record.surucuGorev1 ? <span style={secondaryLineStyle}>{record.surucuGorev1}</span> : null}
        </div>
      ),
    },
    {
      title: t("durum"),
      dataIndex: "seferDurum",
      key: "seferDurum",
      width: 140,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.seferDurum, b.seferDurum),
      render: (text) =>
        text ? (
          <Tag color={getDurumTagColor(text)} style={tagStyle}>
            {text}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: t("tarih"),
      dataIndex: "cikisTarih",
      key: "cikisTarih",
      width: 130,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.cikisTarih, b.cikisTarih),
      render: (text) => formatDateByLocale(text),
    },
    {
      title: t("operasyonTipi"),
      dataIndex: "seferTip",
      key: "seferTip",
      width: 160,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.seferTip, b.seferTip),
      render: renderText,
    },
    {
      title: t("operasyonYeri"),
      dataIndex: "seferYeri",
      key: "seferYeri",
      width: 160,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.seferYeri, b.seferYeri),
      render: renderText,
    },
    {
      title: t("guzergah"),
      dataIndex: "guzergah",
      key: "guzergah",
      width: 180,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.guzergah, b.guzergah),
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
      title: t("sure"),
      dataIndex: "sureDakika",
      key: "sureDakika",
      width: 110,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareNumber(a.sureDakika, b.sureDakika),
      render: (value) => <span style={{ fontWeight: 600 }}>{formatSure(value)}</span>,
    },
    {
      title: t("kmBaslik"),
      dataIndex: "cikisKm",
      key: "km",
      width: 190,
      visible: true,
      // Hücrede çıkış ve varış km birlikte gösterildiği için Excel'de iki ayrı sütuna açılır
      excelColumns: [
        { title: t("kmCikis"), dataIndex: "cikisKm", key: "cikisKm", width: 130 },
        { title: t("kmVaris"), dataIndex: "varisKm", key: "varisKm", width: 130 },
      ],
      sorter: (a, b) => compareNumber(a.cikisKm, b.cikisKm),
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          {renderKmLine(t("kmCikis"), record.cikisKm)}
          {renderKmLine(t("kmVaris"), record.varisKm)}
        </div>
      ),
    },
    {
      title: t("mesafeKm"),
      dataIndex: "farkKm",
      key: "farkKm",
      width: 130,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.farkKm, b.farkKm),
      render: renderNumber,
    },
    {
      title: t("sefer"),
      dataIndex: "seferAdedi",
      key: "seferAdedi",
      width: 100,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.seferAdedi, b.seferAdedi),
      render: renderNumber,
    },
    {
      title: t("toplamHareket"),
      dataIndex: "toplamHareket",
      key: "toplamHareket",
      width: 150,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareNumber(a.toplamHareket, b.toplamHareket),
      render: renderNumber,
    },
    {
      title: t("planlananMiktar"),
      dataIndex: "toplamPlanlananMiktar",
      key: "toplamPlanlananMiktar",
      width: 160,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.toplamPlanlananMiktar, b.toplamPlanlananMiktar),
      render: renderNumber,
    },
    {
      title: t("gerceklesenMiktar"),
      dataIndex: "toplamGerceklesenMiktar",
      key: "toplamGerceklesenMiktar",
      width: 175,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.toplamGerceklesenMiktar, b.toplamGerceklesenMiktar),
      render: renderNumber,
    },
    {
      title: t("dolulukOrani"),
      dataIndex: "dolulukOrani",
      key: "dolulukOrani",
      width: 140,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.dolulukOrani, b.dolulukOrani),
      render: (value) => <span style={{ fontWeight: 600 }}>{`%${formatNumberWithLocale(value ?? 0)}`}</span>,
    },
    {
      title: t("hakedis"),
      dataIndex: "toplamHakedisTutar",
      key: "toplamHakedisTutar",
      width: 130,
      visible: true,
      ellipsis: true,
      align: "right",
      sorter: (a, b) => compareNumber(a.toplamHakedisTutar, b.toplamHakedisTutar),
      render: (value) => renderAmount(value, POSITIVE_AMOUNT_COLOR),
    },

    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 200,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.aciklama, b.aciklama),
      render: renderText,
    },

    // Tasarımda yer almayan, "Sütunları Yönet" ekranından açılabilen sütun
    {
      title: t("varisTarih"),
      dataIndex: "varisTarih",
      key: "varisTarih",
      width: 130,
      visible: false,
      ellipsis: true,
      sorter: (a, b) => compareText(a.varisTarih, b.varisTarih),
      render: (text) => formatDateByLocale(text),
    },
  ];

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderOperasyonListesiV2");
    const savedVisibility = localStorage.getItem("columnVisibilityOperasyonListesiV2");
    const savedWidths = localStorage.getItem("columnWidthsOperasyonListesiV2");

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

    localStorage.setItem("columnOrderOperasyonListesiV2", JSON.stringify(order));
    localStorage.setItem("columnVisibilityOperasyonListesiV2", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsOperasyonListesiV2", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderOperasyonListesiV2", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityOperasyonListesiV2",
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
      "columnWidthsOperasyonListesiV2",
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

  // Seçim sütunu dahil toplam genişlik; tablo bu genişlikten sonra yatay kayar
  const tableScrollX = filteredColumns.reduce((total, col) => total + (col.width || 0), 60);

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
    localStorage.removeItem("columnOrderOperasyonListesiV2");
    localStorage.removeItem("columnVisibilityOperasyonListesiV2");
    localStorage.removeItem("columnWidthsOperasyonListesiV2");
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
            <OperasyonFilters onChange={handleFilterChange} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ExcelExportButton
              request={requestExcelReport}
              columns={filteredColumns}
              fileName="Operasyon_Listesi.xlsx"
              sheetName={t("operasyonListesi")}
              formatCellValue={formatExcelCellValue}
              buttonProps={{ icon: <ExportOutlined />, children: t("disariAktar") }}
            />
            <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
            <AddModal onRefresh={refreshTableData} />
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 380px)",
            borderRadius: "8px 8px 8px 8px",
          }}
        >
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
                onChange: handleTableChange,
              }}
              scroll={{ y: "calc(100vh - 520px)", x: tableScrollX }}
            />
          </Spin>
          <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshCurrentPageData} />
        </div>
      </FormProvider>
    </>
  );
};

OperasyonListesi.propTypes = {
  onStatisticsRefresh: PropTypes.func.isRequired,
  onTotalCountChange: PropTypes.func.isRequired,
};

export default OperasyonListesi;
