import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
import { formatTimeForDisplay } from "../../../../utils/dateUtils";
import PageSizeSelect, { getStoredPageSize } from "../../../components/table/PageSizeSelect";
import SelectInput from "../../../components/form/selects/SelectInput";
import { GetWorkShopDefListService } from "../../../../api/services/kademe/services";
import { getCalismaGunuLabel } from "./constants";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const { Text } = Typography;

const PAGE_SIZE_STORAGE_KEY = "kademeListesiPageSize";
const COLUMN_ORDER_STORAGE_KEY = "columnOrderKademeListesi";
const COLUMN_VISIBILITY_STORAGE_KEY = "columnVisibilityKademeListesi";
const COLUMN_WIDTHS_STORAGE_KEY = "columnWidthsKademeListesi";

// Liste aktif kademelerle açılır; status değerleri: 0 = Tümü, 1 = Aktif, 2 = Pasif
const DEFAULT_STATUS = 1;

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

const compareText = (a, b) => {
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  return String(a).localeCompare(String(b));
};

// 7/24 çalışan kademede saat aralığı yerine "7/24" gösterilir
const getCalismaSaatleri = (record) => {
  if (record.yediYirmiDort) return t("yediYirmiDort");
  if (!record.baslamaSaat && !record.bitisSaat) return "-";
  return `${formatTimeForDisplay(record.baslamaSaat)} – ${formatTimeForDisplay(record.bitisSaat)}`;
};

const getCalismaGunleri = (record) => {
  const gunler = Array.isArray(record.calismaGunleri) ? record.calismaGunleri : [];
  return gunler.length > 0 ? gunler.map(getCalismaGunuLabel).join(", ") : "-";
};

// Sütunların boyutlarını ayarlamak için kullanılan component
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: "-5px",
    width: "20%",
    height: "100%",
    zIndex: 2,
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
          aria-hidden="true"
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
      <div {...listeners} style={{ cursor: "grab", flexGrow: 1, display: "flex", alignItems: "center" }}>
        <HolderOutlined style={{ marginRight: 8 }} />
        {text}
      </div>
    </div>
  );
};

DraggableRow.propTypes = {
  id: PropTypes.string,
  text: PropTypes.node,
  style: PropTypes.object,
};

const KademeTanimlari = () => {
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(PAGE_SIZE_STORAGE_KEY));
  const [updateModal, setUpdateModal] = useState({ open: false, record: null });

  const methods = useForm({ defaultValues: { durumFiltre: DEFAULT_STATUS } });
  const { getValues } = methods;

  // İstekler her zaman güncel arama/filtre değerleriyle çalışsın diye ref üzerinde tutuluyor
  const searchTermRef = useRef("");
  const filtersRef = useRef({ status: DEFAULT_STATUS });
  const dataRef = useRef([]);
  const pageSizeRef = useRef(pageSize);
  const currentPageRequestRef = useRef({ diff: 0, setPointId: 0, targetPage: 1, pageSize });
  // Hızlı arama/filtre değişiminde geç dönen isteğin listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async (diff, targetPage, setPointIdOverride, pageSizeOverride = pageSizeRef.current) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const currentList = dataRef.current;
      let currentSetPointId = setPointIdOverride ?? 0;

      if (setPointIdOverride === undefined && diff > 0) {
        currentSetPointId = currentList[currentList.length - 1]?.siraNo || 0;
      } else if (setPointIdOverride === undefined && diff < 0) {
        currentSetPointId = currentList[0]?.siraNo || 0;
      }

      const response = await GetWorkShopDefListService(diff, currentSetPointId, searchTermRef.current, filtersRef.current, pageSizeOverride);

      if (requestId !== requestIdRef.current) return;

      const newData = (response.data.list || []).map((item) => ({
        ...item,
        key: item.siraNo,
      }));

      currentPageRequestRef.current = {
        diff,
        setPointId: currentSetPointId,
        targetPage,
        pageSize: pageSizeOverride,
      };

      dataRef.current = newData;
      setData(newData);
      setTotalCount(response.data.recordCount || 0);
      setCurrentPage(targetPage);
    } catch {
      if (requestId !== requestIdRef.current) return;
      message.error(t("islemBasarisiz"));
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0, 1);
  }, [fetchData]);

  // Arama ve durum filtresi yalnızca arama butonuna/Enter'a basıldığında uygulanır
  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    filtersRef.current = { status: getValues("durumFiltre") ?? 0 };
    fetchData(0, 1, 0);
  };

  const handleTableChange = (page) => {
    fetchData(page - currentPage, page);
  };

  const handlePageSizeChange = (value) => {
    localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(value));
    pageSizeRef.current = value;
    setPageSize(value);
    fetchData(0, 1, 0, value);
  };

  const onRowClick = (record) => {
    setUpdateModal({ open: true, record });
  };

  // Yeni kayıt ilk sayfadan okunur
  const refreshTableData = useCallback(() => {
    fetchData(0, 1, 0);
  }, [fetchData]);

  // Güncelleme sonrası kullanıcı bulunduğu sayfada kalır; sayfayı üreten istek birebir tekrarlanır
  const refreshCurrentPageData = useCallback(() => {
    const { diff, setPointId, targetPage, pageSize: requestPageSize } = currentPageRequestRef.current;
    fetchData(diff, targetPage, setPointId, requestPageSize);
  }, [fetchData]);

  const initialColumns = [
    {
      title: t("kademeKodu"),
      dataIndex: "kademeKod",
      key: "kademeKod",
      width: 140,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.kademeKod, b.kademeKod),
    },
    {
      title: t("kademeAdi"),
      dataIndex: "kademeAdi",
      key: "kademeAdi",
      width: 220,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.kademeAdi, b.kademeAdi),
      render: (text, record) => (
        <a role="link" tabIndex={0} onClick={() => onRowClick(record)} onKeyDown={(e) => e.key === "Enter" && onRowClick(record)}>
          {text}
        </a>
      ),
    },
    {
      title: t("kademeTipi"),
      dataIndex: "kademeTip",
      key: "kademeTip",
      width: 160,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.kademeTip, b.kademeTip),
      render: (text) => text || "-",
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 180,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.lokasyon, b.lokasyon),
      render: (text) => text || "-",
    },
    {
      title: t("sorumlu"),
      dataIndex: "kademeSorumlusu",
      key: "kademeSorumlusu",
      width: 170,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.kademeSorumlusu, b.kademeSorumlusu),
      render: (text) => text || "-",
    },
    {
      title: t("calismaSaatleri"),
      dataIndex: "baslamaSaat",
      key: "calismaSaatleri",
      width: 150,
      visible: true,
      ellipsis: true,
      render: (text, record) => getCalismaSaatleri(record),
    },
    {
      title: t("calismaGunleri"),
      dataIndex: "calismaGunleri",
      key: "calismaGunleri",
      width: 220,
      visible: false,
      ellipsis: true,
      render: (text, record) => getCalismaGunleri(record),
    },
    {
      title: t("durum"),
      dataIndex: "durum",
      key: "durum",
      width: 110,
      visible: true,
      sorter: (a, b) => Number(a.durum) - Number(b.durum),
      render: (durum) => (
        <Tag color={durum ? "success" : "error"} style={tagStyle}>
          {durum ? t("aktif") : t("pasif")}
        </Tag>
      ),
    },
  ];

  // Sütun sırası/görünürlüğü/genişliği localStorage'dan okunur; tanımı kaldırılmış sütunlar temizlenir
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem(COLUMN_ORDER_STORAGE_KEY);
    const savedVisibility = localStorage.getItem(COLUMN_VISIBILITY_STORAGE_KEY);
    const savedWidths = localStorage.getItem(COLUMN_WIDTHS_STORAGE_KEY);

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    const visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    const widths = savedWidths ? JSON.parse(savedWidths) : {};

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

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  useEffect(() => {
    localStorage.setItem(COLUMN_ORDER_STORAGE_KEY, JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(COLUMN_VISIBILITY_STORAGE_KEY, JSON.stringify(columns.reduce((acc, col) => ({ ...acc, [col.key]: col.visible }), {})));
    localStorage.setItem(COLUMN_WIDTHS_STORAGE_KEY, JSON.stringify(columns.reduce((acc, col) => ({ ...acc, [col.key]: col.width }), {})));
  }, [columns]);

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

  // render fonksiyonları her render'da güncel kalsın diye sütun tanımı initialColumns'tan alınır
  const mergedColumns = columns.map((col) => ({
    ...initialColumns.find((initialCol) => initialCol.key === col.key),
    visible: col.visible,
    width: col.width,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(column.key),
    }),
  }));

  const filteredColumns = mergedColumns.filter((col) => col.visible);

  // Toplam sütun genişliği; tablo bu genişlikten sonra yatay kayar
  const tableScrollX = filteredColumns.reduce((total, col) => total + (col.width || 0), 0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((column) => column.key === active.id);
    const newIndex = columns.findIndex((column) => column.key === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const toggleVisibility = (key, checked) => {
    setColumns((prev) => prev.map((col) => (col.key === key ? { ...col, visible: checked } : col)));
  };

  const resetColumns = () => {
    localStorage.removeItem(COLUMN_ORDER_STORAGE_KEY);
    localStorage.removeItem(COLUMN_VISIBILITY_STORAGE_KEY);
    localStorage.removeItem(COLUMN_WIDTHS_STORAGE_KEY);
    window.location.reload();
  };

  const durumOptions = [
    { value: 0, label: t("tumu") },
    { value: 1, label: t("aktif") },
    { value: 2, label: t("pasif") },
  ];

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
      {/* Sütun yönetimi modalı */}
      <Modal title={t("sutunlariYonet")} centered width={800} open={isColumnModalVisible} onOk={() => setIsColumnModalVisible(false)} onCancel={() => setIsColumnModalVisible(false)}>
        <Text style={{ marginBottom: "15px" }}>{t("sutunlarYonetAciklama")}</Text>
        <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "10px" }}>
          <Button onClick={resetColumns} style={{ marginBottom: "15px" }}>
            {t("sutunlariSifirla")}
          </Button>
        </div>

        <div className="flex justify-between">
          <div style={{ width: "46%", border: "1px solid #8080806e", borderRadius: "8px", padding: "10px" }}>
            <div style={{ marginBottom: "20px", borderBottom: "1px solid #80808051", padding: "8px 8px 12px 8px" }}>
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
            <div style={{ width: "46%", border: "1px solid #8080806e", borderRadius: "8px", padding: "10px" }}>
              <div style={{ marginBottom: "20px", borderBottom: "1px solid #80808051", padding: "8px 8px 12px 8px" }}>
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

      <FormProvider {...methods}>
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
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <StyledButton onClick={() => setIsColumnModalVisible(true)}>
              <MenuOutlined />
            </StyledButton>
            <Input
              style={{ width: "300px" }}
              type="text"
              placeholder={t("kademeAramaPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <div style={{ width: "140px" }}>
              <SelectInput name="durumFiltre" options={durumOptions} allowClear={false} />
            </div>
            <Button onClick={handleSearch} icon={<SearchOutlined />} style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", color: "#fff" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <AddModal onRefresh={refreshTableData} />
          </div>
        </div>
      </FormProvider>

      {/* Table */}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 200px)",
          borderRadius: "8px",
        }}
      >
        <Spin spinning={loading}>
          <Table components={components} columns={filteredColumns} dataSource={data} pagination={false} footer={tableFooter} scroll={{ y: "calc(100vh - 340px)", x: tableScrollX }} />
        </Spin>
      </div>

      <UpdateModal selectedRow={updateModal.record} open={updateModal.open} onClose={() => setUpdateModal((prev) => ({ ...prev, open: false }))} onRefresh={refreshCurrentPageData} />
    </>
  );
};

export default KademeTanimlari;
