import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Table, Button, Modal, Checkbox, Input, Pagination, Progress, Spin, Typography, message } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { t } from "i18next";
import "../KademeTanimlari/ResizeStyle.css";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import { compareDatesForSorter } from "../../../../utils/dateUtils";
import { formatDateByLocale } from "../../../components/FormattedDate";
import PageSizeSelect, { getStoredPageSize } from "../../../components/table/PageSizeSelect";
import SelectInput from "../../../components/form/selects/SelectInput";
import MultiSelectInput from "../../../components/form/selects/MultiSelectInput";
import DateRangeInput from "../../../components/form/date/DateRangeInput";
import KademeSelectbox from "../../../components/KademeSelectbox";
import { GetVehicleServiceOrdersService } from "../../../../api/services/isEmri/services";
import { VARSAYILAN_SURE, getDurumOptions, getFiltreTarihAraligi, getSureOptions } from "./constants";
import IsEmriStatisticsCards from "./components/IsEmriStatisticsCards";
import IsEmriTopluIslem from "./components/IsEmriTopluIslem";
import DurumTag from "./components/DurumTag";
import MalzemeTalebiOzet from "./components/MalzemeTalebiOzet";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";
import DurumIslemModal from "./durumIslemleri/DurumIslemModal";

const { Text } = Typography;

const PAGE_SIZE_STORAGE_KEY = "kademeIsEmirleriPageSize";
const COLUMN_ORDER_STORAGE_KEY = "columnOrderKademeIsEmirleri";
const COLUMN_VISIBILITY_STORAGE_KEY = "columnVisibilityKademeIsEmirleri";
const COLUMN_WIDTHS_STORAGE_KEY = "columnWidthsKademeIsEmirleri";

// Liste tasarımdaki gibi bu ayın iş emirleriyle açılır
const DEFAULT_FILTER_VALUES = {
  sureFiltre: VARSAYILAN_SURE,
  tarihAraligi: null,
  kademeFiltre: [],
  kademeFiltreID: [],
  durumFiltre: [],
};

const altSatirStyle = { fontSize: "12px", color: "#8c8c8c" };

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

const KAPALI_DURUM_ISLEMI = { open: false, islem: null, kayitlar: [] };

const compareText = (a, b) => {
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  return String(a).localeCompare(String(b));
};

// Liste, KPI kutuları ve sonraki sayfa istekleri aynı filtre gövdesini kullanır
const buildFilters = ({ sureFiltre, tarihAraligi, kademeFiltreID, durumFiltre }) => ({
  ...getFiltreTarihAraligi(sureFiltre, tarihAraligi),
  kademeIds: Array.isArray(kademeFiltreID) ? kademeFiltreID : [],
  durumIds: Array.isArray(durumFiltre) ? durumFiltre : [],
});

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

const KademeIsEmirleri = () => {
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(PAGE_SIZE_STORAGE_KEY));
  const [updateModal, setUpdateModal] = useState({ open: false, record: null });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [durumIslemi, setDurumIslemi] = useState(KAPALI_DURUM_ISLEMI);
  const [statisticsRequest, setStatisticsRequest] = useState(() => ({ searchTerm: "", filters: buildFilters(DEFAULT_FILTER_VALUES), requestId: 0 }));

  const methods = useForm({ defaultValues: DEFAULT_FILTER_VALUES });
  const { getValues, setValue, watch } = methods;

  // Hazır dönem ile özel tarih aralığından yalnızca biri uygulanır: biri seçilince diğeri temizlenir,
  // aralık temizlenince tarih filtresiz kalmamak için varsayılan döneme dönülür
  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (type !== "change") return;
      if (name === "sureFiltre" && values.sureFiltre) setValue("tarihAraligi", null);
      if (name === "tarihAraligi") setValue("sureFiltre", values.tarihAraligi ? null : VARSAYILAN_SURE);
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // İstekler her zaman güncel arama/filtre değerleriyle çalışsın diye ref üzerinde tutuluyor
  const searchTermRef = useRef("");
  const filtersRef = useRef(statisticsRequest.filters);
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

      const response = await GetVehicleServiceOrdersService(diff, currentSetPointId, searchTermRef.current, filtersRef.current, pageSizeOverride);

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
      // Seçim yalnızca ekrandaki sayfa için geçerlidir; sayfa, arama veya yenileme sonrası temizlenir
      setSelectedRowKeys([]);
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

  // KPI kutuları listeyle aynı arama ve filtrelerle yeniden hesaplanır
  const refreshStatistics = useCallback(() => {
    setStatisticsRequest((prev) => ({ searchTerm: searchTermRef.current, filters: filtersRef.current, requestId: prev.requestId + 1 }));
  }, []);

  // Arama ve filtreler yalnızca arama butonuna/Enter'a basıldığında uygulanır
  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    filtersRef.current = buildFilters(getValues());
    fetchData(0, 1, 0);
    refreshStatistics();
  };

  // KPI kutusuna tıklanınca kutunun durumları durum filtresine yazılır ve liste diğer filtrelerle birlikte yeniden okunur
  const handleKpiFiltre = (durumIds) => {
    setValue("durumFiltre", durumIds);
    handleSearch();
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
    refreshStatistics();
  }, [fetchData, refreshStatistics]);

  // Güncelleme sonrası kullanıcı bulunduğu sayfada kalır; sayfayı üreten istek birebir tekrarlanır
  const refreshCurrentPageData = useCallback(() => {
    const { diff, setPointId, targetPage, pageSize: requestPageSize } = currentPageRequestRef.current;
    fetchData(diff, targetPage, setPointId, requestPageSize);
    refreshStatistics();
  }, [fetchData, refreshStatistics]);

  const seciliKayitlar = data.filter((kayit) => selectedRowKeys.includes(kayit.key));

  const handleDurumIslemiSec = (islem) => {
    setDurumIslemi({ open: true, islem, kayitlar: seciliKayitlar });
  };

  const initialColumns = [
    {
      title: t("isEmriNo"),
      dataIndex: "servisNo",
      key: "servisNo",
      width: 150,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.servisNo, b.servisNo),
      render: (text, record) => (
        <a role="link" tabIndex={0} onClick={() => onRowClick(record)} onKeyDown={(e) => e.key === "Enter" && onRowClick(record)}>
          {text || "-"}
        </a>
      ),
    },
    {
      title: t("arac"),
      dataIndex: "plaka",
      key: "plaka",
      width: 170,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.plaka, b.plaka),
      render: (plaka, record) => (
        <div className="flex flex-col">
          <Text strong>{plaka || "-"}</Text>
          <span style={altSatirStyle}>{[record.marka, record.model].filter(Boolean).join(" ")}</span>
        </div>
      ),
    },
    {
      title: t("kademe"),
      dataIndex: "kademe",
      key: "kademe",
      width: 170,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.kademe, b.kademe),
      render: (kademe, record) => (
        <div className="flex flex-col">
          <span>{kademe || "-"}</span>
          <span style={altSatirStyle}>{record.kademeTip}</span>
        </div>
      ),
    },
    {
      title: t("isEmriTanimi"),
      dataIndex: "servisTanimi",
      key: "servisTanimi",
      width: 220,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.servisTanimi, b.servisTanimi),
      render: (text) => text || "-",
    },
    {
      title: t("atananIsler"),
      dataIndex: "totalIsler",
      key: "atananIsler",
      width: 170,
      visible: true,
      sorter: (a, b) => Number(a.totalIsler) - Number(b.totalIsler),
      render: (totalIsler, record) => {
        const toplam = Number(totalIsler) || 0;
        const tamamlanan = Number(record.tamamlananIsler) || 0;
        return (
          <div className="flex flex-col">
            <span style={{ fontSize: "12px" }}>{t("atananIsDurumu", { toplam: formatNumberWithLocale(toplam), tamamlanan: formatNumberWithLocale(tamamlanan) })}</span>
            <Progress percent={toplam > 0 ? Math.round((tamamlanan / toplam) * 100) : 0} showInfo={false} size="small" strokeColor="#16a34a" />
          </div>
        );
      },
    },
    {
      title: t("malzemeTalebi"),
      dataIndex: "malzemeSayisi",
      key: "malzemeSayisi",
      width: 130,
      visible: true,
      sorter: (a, b) => Number(a.malzemeSayisi) - Number(b.malzemeSayisi),
      render: (value) => <MalzemeTalebiOzet sayi={value} />,
    },
    {
      title: t("durum"),
      dataIndex: "durumBilgisi",
      key: "durumBilgisi",
      width: 130,
      visible: true,
      sorter: (a, b) => Number(a.durumBilgisi) - Number(b.durumBilgisi),
      render: (durum) => <DurumTag durum={durum} />,
    },
    {
      title: t("acilisTarihi"),
      dataIndex: "baslamaTarih",
      key: "baslamaTarih",
      width: 130,
      visible: true,
      sorter: (a, b) => compareDatesForSorter(a.baslamaTarih, b.baslamaTarih),
      render: (date) => formatDateByLocale(date),
    },
    {
      title: t("kapanisTarihi"),
      dataIndex: "bitisTarih",
      key: "bitisTarih",
      width: 130,
      visible: true,
      sorter: (a, b) => compareDatesForSorter(a.bitisTarih, b.bitisTarih),
      render: (date) => formatDateByLocale(date),
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

      {/* KPI kutuları */}
      <IsEmriStatisticsCards request={statisticsRequest} onFiltreSec={handleKpiFiltre} />

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
              placeholder={t("isEmriAramaPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <div style={{ width: "140px" }}>
              <SelectInput name="sureFiltre" options={getSureOptions()} allowClear={false} placeholder={t("donem")} />
            </div>
            <DateRangeInput name="tarihAraligi" style={{ width: "230px" }} />
            <div style={{ width: "220px" }}>
              <KademeSelectbox name1="kademeFiltre" multiSelect placeholder={t("kademeSeciniz")} />
            </div>
            <div style={{ width: "150px" }}>
              <MultiSelectInput name="durumFiltre" options={getDurumOptions()} placeholder={t("durumSeciniz")} />
            </div>
            <Button onClick={handleSearch} icon={<SearchOutlined />} style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", color: "#fff" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <IsEmriTopluIslem seciliKayitlar={seciliKayitlar} onIslemSec={handleDurumIslemiSec} />
            <AddModal onRefresh={refreshTableData} />
          </div>
        </div>
      </FormProvider>

      {/* Table */}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 303px)",
          borderRadius: "8px",
        }}
      >
        <Spin spinning={loading}>
          <Table
            components={components}
            rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
            columns={filteredColumns}
            dataSource={data}
            pagination={false}
            footer={tableFooter}
            scroll={{ y: "calc(100vh - 443px)", x: tableScrollX }}
          />
        </Spin>
      </div>

      <UpdateModal selectedRow={updateModal.record} open={updateModal.open} onClose={() => setUpdateModal((prev) => ({ ...prev, open: false }))} onRefresh={refreshCurrentPageData} />
      {/* Durum işleminden sonra kullanıcı bulunduğu sayfada kalır; liste yenilenince seçim de temizlenir */}
      <DurumIslemModal
        open={durumIslemi.open}
        islem={durumIslemi.islem}
        kayitlar={durumIslemi.kayitlar}
        onClose={() => setDurumIslemi((prev) => ({ ...prev, open: false }))}
        onSaved={refreshCurrentPageData}
      />
    </>
  );
};

export default KademeIsEmirleri;
