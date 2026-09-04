import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Pagination, Spin, Typography, Tag, message } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { t } from "i18next";
import "./ResizeStyle.css";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import ExcelExportButton from "../../../components/ExcelExportButton";
import PageSizeSelect, { getStoredPageSize } from "../../../components/table/PageSizeSelect";
import { GetEmployeeListService, GetEmployeesReportService } from "../../../../api/services/personel_services";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import PersonelAvatar from "./components/PersonelAvatar";
import PersonelStatisticsCards from "./components/PersonelStatisticsCards";
import Filters, { DEFAULT_PERSONEL_FILTERS } from "./filter/Filters";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const { Text } = Typography;

const PAGE_SIZE_STORAGE_KEY = "personelListesiPageSize";

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
  personelTipKodIds: filters?.personelTipKodIds || [],
  lokasyonIds: filters?.lokasyonIds || [],
  status: filters?.status || 0,
});

const compareText = (a, b) => {
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  return String(a).localeCompare(String(b));
};

// Personel hücresinde telefon alanı sırayla tel1, tel2 olarak gösterilir
const getTelefon = (record) => record.tel1 || record.tel2 || "";

// Excel'de tabloda görünen değerler yazılır (boolean alanlar Aktif/Pasif, iletişimde ekrandaki telefon)
const formatExcelCellValue = (value, row, column) => {
  if (column.key === "mobilErisim" || column.key === "aktif") {
    return value ? t("aktif") : t("pasif");
  }

  if (column.key === "iletisimTelefon") {
    return getTelefon(row);
  }

  return value;
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

const PersonelTanim = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(PAGE_SIZE_STORAGE_KEY));
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const [statisticsRequest, setStatisticsRequest] = useState({
    searchTerm: "",
    filters: buildFilterPayload(DEFAULT_PERSONEL_FILTERS),
    requestId: 0,
  });

  const methods = useForm();

  // İstekler her zaman güncel arama/filtre değerleriyle çalışsın diye ref üzerinde tutuluyor
  const searchTermRef = useRef("");
  const filtersRef = useRef(DEFAULT_PERSONEL_FILTERS);
  const dataRef = useRef([]);
  const pageSizeRef = useRef(pageSize);
  const currentPageRequestRef = useRef({ diff: 0, setPointId: 0, targetPage: 1, pageSize });
  // Filtreler hızlı değiştiğinde geç dönen isteğin listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  const triggerStatisticsRefresh = useCallback(() => {
    setStatisticsRequest((prev) => ({
      searchTerm: searchTermRef.current,
      filters: buildFilterPayload(filtersRef.current),
      requestId: prev.requestId + 1,
    }));
  }, []);

  // API Data Fetching with diff and setPointId
  const fetchData = useCallback(async (diff, targetPage, setPointIdOverride, pageSizeOverride = pageSizeRef.current) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const currentList = dataRef.current;
      let currentSetPointId = setPointIdOverride ?? 0;

      if (setPointIdOverride === undefined && diff > 0) {
        // Moving forward
        currentSetPointId = currentList[currentList.length - 1]?.personelId || 0;
      } else if (setPointIdOverride === undefined && diff < 0) {
        // Moving backward
        currentSetPointId = currentList[0]?.personelId || 0;
      }

      const response = await GetEmployeeListService(diff, currentSetPointId, searchTermRef.current, buildFilterPayload(filtersRef.current), pageSizeOverride);

      if (requestId !== requestIdRef.current) return;

      const newData = (response.data.list || []).map((item) => ({
        ...item,
        key: item.personelId,
      }));

      currentPageRequestRef.current = {
        diff,
        setPointId: currentSetPointId,
        targetPage,
        pageSize: pageSizeOverride,
      };

      dataRef.current = newData;
      setData(newData);
      setTotalCount(response.data.recordCount);
      setCurrentPage(targetPage);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      console.error("Error fetching data:", error);
      message.error(t("islemBasarisiz"));
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
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

  const handlePageSizeChange = (value) => {
    localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(value));
    pageSizeRef.current = value;
    setPageSize(value);
    fetchData(0, 1, 0, value);
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

  // Güncelleme sonrası kullanıcı bulunduğu sayfada kalır; sayfayı üreten istek birebir tekrarlanır
  const refreshCurrentPageData = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    const { diff, setPointId, targetPage, pageSize: requestPageSize } = currentPageRequestRef.current;
    fetchData(diff, targetPage, setPointId, requestPageSize);
    triggerStatisticsRefresh();
  }, [fetchData, triggerStatisticsRefresh]);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("personelTekil"),
      dataIndex: "isim",
      key: "personel",
      width: 280,
      visible: true,
      // Hücrede isim + kod + sicil + ünvan gösterildiği için Excel'de dört ayrı sütuna açılır
      excelColumns: [
        { title: t("personelTekil"), dataIndex: "isim", key: "personelIsim", width: 200 },
        { title: t("personelKod"), dataIndex: "personelKod", key: "personelKod", width: 140 },
        { title: t("sicilNo"), dataIndex: "sicilNo", key: "sicilNo", width: 120 },
        { title: t("unvan"), dataIndex: "unvan", key: "personelUnvan", width: 160 },
      ],
      sorter: (a, b) => compareText(a.isim, b.isim),
      render: (text, record) => {
        const kodSatiri = [record.personelKod, record.sicilNo ? `${t("sicilNo")}: ${record.sicilNo}` : ""].filter(Boolean).join(" • ");

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <PersonelAvatar personelId={record.personelId} isim={record.isim} />
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <a onClick={() => onRowClick(record)} style={{ ...primaryLineStyle, fontWeight: 600 }}>
                {record.isim}
              </a>
              {kodSatiri ? <span style={secondaryLineStyle}>{kodSatiri}</span> : null}
              {record.unvan ? <span style={secondaryLineStyle}>{record.unvan}</span> : null}
            </div>
          </div>
        );
      },
    },

    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 190,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.lokasyon, b.lokasyon),
      render: (text) => text || "-",
    },

    {
      title: t("iletisim"),
      dataIndex: "tel1",
      key: "iletisim",
      width: 230,
      visible: true,
      // Hücrede telefon + e-posta gösterildiği için Excel'de iki ayrı sütuna açılır
      excelColumns: [
        { title: t("telefon"), dataIndex: "tel1", key: "iletisimTelefon", width: 150 },
        { title: t("email"), dataIndex: "email", key: "iletisimEmail", width: 200 },
      ],
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={primaryLineStyle}>{getTelefon(record) || "-"}</span>
          {record.email ? <span style={secondaryLineStyle}>{record.email}</span> : null}
        </div>
      ),
    },

    {
      title: t("personelTipi"),
      dataIndex: "personelTipi",
      key: "personelTipi",
      width: 170,
      visible: true,
      sorter: (a, b) => compareText(a.personelTipi, b.personelTipi),
      render: (text) => (text ? <Tag style={tagStyle}>{text}</Tag> : "-"),
    },

    {
      // API'de "kademe" adında bir alan yok; kademe satırında personelin bağlı olduğu departman gösterilir
      title: t("kademeGorev"),
      dataIndex: "departman",
      key: "kademeGorev",
      width: 190,
      visible: true,
      // Hücrede departman + görev gösterildiği için Excel'de iki ayrı sütuna açılır
      excelColumns: [
        { title: t("departman"), dataIndex: "departman", key: "kademeGorevDepartman", width: 160 },
        { title: t("gorev"), dataIndex: "gorev", key: "kademeGorevGorev", width: 160 },
      ],
      sorter: (a, b) => compareText(a.departman, b.departman),
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={primaryLineStyle}>{record.departman || "-"}</span>
          {record.gorev ? <span style={secondaryLineStyle}>{record.gorev}</span> : null}
        </div>
      ),
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
    const savedOrder = localStorage.getItem("columnOrderPersonelListesi");
    const savedVisibility = localStorage.getItem("columnVisibilityPersonelListesi");
    const savedWidths = localStorage.getItem("columnWidthsPersonelListesi");

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

    localStorage.setItem("columnOrderPersonelListesi", JSON.stringify(order));
    localStorage.setItem("columnVisibilityPersonelListesi", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsPersonelListesi", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderPersonelListesi", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityPersonelListesi",
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
      "columnWidthsPersonelListesi",
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
    localStorage.removeItem("columnOrderPersonelListesi");
    localStorage.removeItem("columnVisibilityPersonelListesi");
    localStorage.removeItem("columnWidthsPersonelListesi");
    window.location.reload();
  };

  const tableFooter = () => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", alignItems: "center" }}>
      <div>{`${t("toplam")}: ${formatNumberWithLocale(totalCount)} | ${t("goruntulenen")}: ${formatNumberWithLocale(data.length)}`}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Pagination simple={{ readOnly: true }} current={currentPage} total={totalCount} pageSize={pageSize} onChange={handleTableChange} showSizeChanger={false} size="small" />
        <PageSizeSelect value={pageSize} onChange={handlePageSizeChange} />
      </div>
    </div>
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
                <Text style={{ fontWeight: 600 }}>{t("sutunlarinSiralamasiniAyarla")}</Text>
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
        <PersonelStatisticsCards request={statisticsRequest} />

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
              placeholder={t("personelAramaPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <Filters onChange={handleFilterChange} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ExcelExportButton
              request={() => GetEmployeesReportService(searchTermRef.current, buildFilterPayload(filtersRef.current))}
              columns={filteredColumns}
              fileName="Personel_Listesi.xlsx"
              sheetName={t("personelListesi")}
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
              components={components}
              rowSelection={rowSelection}
              columns={filteredColumns}
              dataSource={data}
              pagination={false}
              footer={tableFooter}
              scroll={{ y: "calc(100vh - 467px)", x: tableScrollX }}
            />
          </Spin>
          <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshCurrentPageData} />
        </div>
      </FormProvider>
    </>
  );
};

export default PersonelTanim;
