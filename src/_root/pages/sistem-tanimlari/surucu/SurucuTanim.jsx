import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, Avatar, message } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { t } from "i18next";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import DriverStatisticsCards from "./components/DriverStatisticsCards";
import Filters, { DEFAULT_DRIVER_FILTERS } from "./filter/Filters";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import ExcelExportButton from "../../../components/ExcelExportButton";
import { GetDriversReportService } from "../../../../api/services/sistem-tanimlari/surucu_services";

const { Text } = Typography;

const SECONDARY_TEXT_COLOR = "#8c8c8c";

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

const buildFilterPayload = (filters) => ({
  lokasyonIds: filters?.lokasyonIds || [],
  surucuTipIds: filters?.surucuTipIds || [],
  status: filters?.status || 0,
});

const getInitials = (name) => {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toLocaleUpperCase("tr-TR");
};

// Excel'de tabloda görünen değerler yazılır (boolean alanlar Aktif/Pasif, iletişimde ekrandaki telefon)
const formatExcelCellValue = (value, row, column) => {
  if (column.key === "mobilErisim" || column.key === "aktif") {
    return value ? t("aktif") : t("pasif");
  }

  if (column.key === "iletisim") {
    return row.telefon1 || row.gsm || row.telefon2 || "";
  }

  return value;
};

// Ceza puanı arttıkça uyarı rengi koyulaşır
const getCezaPuaniColor = (cezaPuani) => {
  const puan = Number(cezaPuani) || 0;

  if (puan >= 30) return "error";
  if (puan >= 15) return "warning";
  return "default";
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

const Yakit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const [statisticsRequest, setStatisticsRequest] = useState({
    searchTerm: "",
    filters: buildFilterPayload(DEFAULT_DRIVER_FILTERS),
    requestId: 0,
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const methods = useForm();

  // İstekler her zaman güncel arama/filtre değerleriyle çalışsın diye ref üzerinde tutuluyor
  const searchTermRef = useRef("");
  const filtersRef = useRef(DEFAULT_DRIVER_FILTERS);
  const dataRef = useRef([]);
  const currentPageRequestRef = useRef({ diff: 0, setPointId: 0, targetPage: 1 });

  const triggerStatisticsRefresh = useCallback(() => {
    setStatisticsRequest((prev) => ({
      searchTerm: searchTermRef.current,
      filters: buildFilterPayload(filtersRef.current),
      requestId: prev.requestId + 1,
    }));
  }, []);

  // API Data Fetching with diff and setPointId
  const fetchData = useCallback(async (diff, targetPage) => {
    setLoading(true);
    try {
      const currentList = dataRef.current;
      let currentSetPointId = 0;

      if (diff > 0) {
        // Moving forward
        currentSetPointId = currentList[currentList.length - 1]?.surucuId || 0;
      } else if (diff < 0) {
        // Moving backward
        currentSetPointId = currentList[0]?.surucuId || 0;
      }

      const response = await AxiosInstance.post(
        `Driver/GetDriverList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${encodeURIComponent(searchTermRef.current)}`,
        buildFilterPayload(filtersRef.current)
      );

      setTotalCount(response.data.recordCount);
      setCurrentPage(targetPage);

      const newData = (response.data.list || []).map((item) => ({
        ...item,
        key: item.surucuId,
      }));

      currentPageRequestRef.current = {
        diff,
        setPointId: currentSetPointId,
        targetPage,
      };

      dataRef.current = newData;
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0, 1);
  }, [fetchData]);

  // Search handling
  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    fetchData(0, 1);
    triggerStatisticsRefresh();
  };

  // Filtreler yalnızca arama butonuna basıldığında uygulanır
  const handleFilterChange = (field, value) => {
    if (field !== "filters") return;

    filtersRef.current = value;
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

  const refreshCurrentPageData = useCallback(async () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setLoading(true);

    try {
      const { diff, setPointId, targetPage } = currentPageRequestRef.current;
      const response = await AxiosInstance.post(
        `Driver/GetDriverList?diff=${diff}&setPointId=${setPointId}&parameter=${encodeURIComponent(searchTermRef.current)}`,
        buildFilterPayload(filtersRef.current)
      );

      const newData = (response.data.list || []).map((item) => ({
        ...item,
        key: item.surucuId,
      }));

      setTotalCount(response.data.recordCount);
      setCurrentPage(targetPage);
      dataRef.current = newData;
      setData(newData);
      triggerStatisticsRefresh();
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [triggerStatisticsRefresh]);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("surucu"),
      dataIndex: "isim",
      key: "surucu",
      width: 270,
      visible: true,
      sorter: (a, b) => {
        if (a.isim === null) return -1;
        if (b.isim === null) return 1;
        return a.isim.localeCompare(b.isim);
      },
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar style={{ backgroundColor: "#f0f2f5", color: "#5d6786", flexShrink: 0 }}>{getInitials(record.isim)}</Avatar>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <a onClick={() => onRowClick(record)} style={{ ...primaryLineStyle, fontWeight: 600 }}>
              {record.isim}
            </a>
            <span style={secondaryLineStyle}>{record.surucuKod}</span>
            {record.gorev ? <span style={secondaryLineStyle}>{record.gorev}</span> : null}
          </div>
        </div>
      ),
    },

    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 170,
      visible: true,
      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={primaryLineStyle}>{record.lokasyon || "-"}</span>
          {record.departman ? <span style={secondaryLineStyle}>{record.departman}</span> : null}
        </div>
      ),
    },

    {
      title: t("iletisim"),
      dataIndex: "telefon1",
      key: "iletisim",
      width: 210,
      visible: true,
      render: (text, record) => {
        const telefon = record.telefon1 || record.gsm || record.telefon2;

        return (
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span style={primaryLineStyle}>{telefon || "-"}</span>
            {record.email ? <span style={secondaryLineStyle}>{record.email}</span> : null}
          </div>
        );
      },
    },

    {
      title: t("surucuTip"),
      dataIndex: "surucuTip",
      key: "surucuTip",
      width: 160,
      visible: true,
      sorter: (a, b) => {
        if (a.surucuTip === null) return -1;
        if (b.surucuTip === null) return 1;
        return a.surucuTip.localeCompare(b.surucuTip);
      },
      render: (text) => (text ? <Tag style={tagStyle}>{text}</Tag> : "-"),
    },

    {
      title: t("mobil"),
      dataIndex: "mobilErisim",
      key: "mobilErisim",
      width: 120,
      visible: true,
      sorter: (a, b) => Number(a.mobilErisim) - Number(b.mobilErisim),
      render: (mobilErisim) => (
        <Tag color={mobilErisim ? "processing" : "default"} style={tagStyle}>
          {mobilErisim ? t("aktif") : t("pasif")}
        </Tag>
      ),
    },

    {
      title: t("cezaPuani"),
      dataIndex: "cezaPuani",
      key: "cezaPuani",
      width: 160,
      visible: true,
      sorter: (a, b) => (Number(a.cezaPuani) || 0) - (Number(b.cezaPuani) || 0),
      render: (cezaPuani, record) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
          <Tag color={getCezaPuaniColor(cezaPuani)} style={tagStyle}>{`${t("puan")}: ${formatNumberWithLocale(cezaPuani ?? 0)}`}</Tag>
          <span style={secondaryLineStyle}>{`${t("riskSkoru")}: ${formatNumberWithLocale(record.risSkoru ?? 0)}`}</span>
        </div>
      ),
    },

    {
      title: t("durum"),
      dataIndex: "aktif",
      key: "aktif",
      width: 110,
      visible: true,
      sorter: (a, b) => Number(a.aktif) - Number(b.aktif),
      render: (aktif) => (
        <Tag color={aktif ? "success" : "error"} style={tagStyle}>
          {aktif ? t("aktif") : t("pasif")}
        </Tag>
      ),
    },
  ];

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderSurucuListesi");
    const savedVisibility = localStorage.getItem("columnVisibilitySurucuListesi");
    const savedWidths = localStorage.getItem("columnWidthsSurucuListesi");

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

    localStorage.setItem("columnOrderSurucuListesi", JSON.stringify(order));
    localStorage.setItem("columnVisibilitySurucuListesi", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsSurucuListesi", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderSurucuListesi", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilitySurucuListesi",
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
      "columnWidthsSurucuListesi",
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
    localStorage.removeItem("columnOrderSurucuListesi");
    localStorage.removeItem("columnVisibilitySurucuListesi");
    localStorage.removeItem("columnWidthsSurucuListesi");
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

      <FormProvider {...methods}>
        {/* KPI kutuları */}
        <DriverStatisticsCards request={statisticsRequest} />

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
              style={{ width: "300px" }}
              type="text"
              placeholder={t("surucuAramaPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <Filters onChange={handleFilterChange} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ExcelExportButton
              request={() => GetDriversReportService(searchTermRef.current, buildFilterPayload(filtersRef.current))}
              columns={filteredColumns}
              fileName="Suruculer_Listesi.xlsx"
              sheetName={t("suruculer")}
              formatCellValue={formatExcelCellValue}
            />
            <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
            <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 327px)",
            borderRadius: "8px 8px 8px 8px",
          }}
        >
          <Spin spinning={loading}>
            <Table
              className="surucu-listesi-tablo"
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
                showTotal: (total) => `Toplam ${total}`,
              }}
              scroll={{ y: "calc(100vh - 462px)" }}
            />
          </Spin>
          <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshCurrentPageData} />
        </div>
      </FormProvider>
    </>
  );
};

export default Yakit;
