import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Table, Button, Modal, Checkbox, Dropdown, Input, Pagination, Spin, Typography, message } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  ExportOutlined,
  EyeOutlined,
  FileTextOutlined,
  HolderOutlined,
  MenuOutlined,
  PieChartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
import KademeSelectbox from "../../../components/KademeSelectbox";
import PersonelMultiSelectbox from "../../../components/PersonelMultiSelectbox";
import { GetMaterialRequestListService, GetMaterialRequestStatisticsByTypeService, GetVehicleServiceByIdService } from "../../../../api/services/isEmri/services";
import { MALZEME_TALEP_DURUM, TUMU, getMalzemeTalepDurumTanimi, getSureOptions, getSureTarihSaatAraligi, toNullableId } from "../KademeIsEmirleri/constants";
import DurumTag from "../KademeIsEmirleri/components/DurumTag";
import UpdateModal from "../KademeIsEmirleri/update/UpdateModal";
import KullanimaAktarModal from "../KademeIsEmirleri/malzemeTalepleri/KullanimaAktarModal";
import TakipPaneliStatisticsCards from "../components/TakipPaneliStatisticsCards";
import PersonelBilgisi from "../components/PersonelBilgisi";
import { cerceveButonStyle, getDolguButonStyle, menuButonStyle } from "../components/islemButonStyles";
import GorunumSecici, { GORUNUM, getStoredGorunum } from "../components/GorunumSecici";
import { TakipKartIzgarasi } from "../components/TakipKarti";
import { MALZEME_TALEP_KPI, formatMiktar, getMalzemeTalepDurumFiltreOptions } from "./constants";
import MalzemeTalepDetayDrawer from "./components/MalzemeTalepDetayDrawer";
import MalzemeTalepKarti from "./components/MalzemeTalepKarti";

const { Text } = Typography;

const PAGE_SIZE_STORAGE_KEY = "malzemeTalepleriTakipPaneliPageSize";
const GORUNUM_STORAGE_KEY = "malzemeTalepleriTakipPaneliGorunum";
const COLUMN_ORDER_STORAGE_KEY = "columnOrderMalzemeTalepleriTakipPaneli";
const COLUMN_VISIBILITY_STORAGE_KEY = "columnVisibilityMalzemeTalepleriTakipPaneli";
const COLUMN_WIDTHS_STORAGE_KEY = "columnWidthsMalzemeTalepleriTakipPaneli";

// Panel tarih sınırı olmadan, devam eden (tamamlanmamış) taleplerle açılır
const DEFAULT_FILTER_VALUES = {
  sureFiltre: TUMU,
  personelFiltre: [],
  personelFiltreID: [],
  kademeFiltre: [],
  kademeFiltreID: [],
  durumFiltre: [MALZEME_TALEP_DURUM.BEKLIYOR, MALZEME_TALEP_DURUM.KISMI_KARSILANDI],
};

const ICON_STYLE = { fontSize: 22, color: "#6b7a8a" };
const KULLANIMA_AKTAR_RENGI = "#0f8a6c";
const altSatirStyle = { fontSize: "12px", color: "#8c8c8c" };

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

// Liste ve KPI kutuları aynı filtre gövdesini kullanır; personel filtresi talepEdenIds alanına gider,
// "Tümü" için diziler boş gider (null gönderilmez). Tarih filtresi talebin gerekli tarihi üzerinde çalışır.
const buildFilters = ({ sureFiltre, personelFiltreID, kademeFiltreID, durumFiltre }) => ({
  talepEdenIds: Array.isArray(personelFiltreID) ? personelFiltreID : [],
  kademeIds: Array.isArray(kademeFiltreID) ? kademeFiltreID : [],
  durumIds: Array.isArray(durumFiltre) ? durumFiltre : [],
  ...getSureTarihSaatAraligi(sureFiltre),
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

const MalzemeTalepleriTakipPaneli = () => {
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(PAGE_SIZE_STORAGE_KEY));
  const [gorunum, setGorunum] = useState(() => getStoredGorunum(GORUNUM_STORAGE_KEY));
  const [statisticsRequest, setStatisticsRequest] = useState(() => ({ searchTerm: "", filters: buildFilters(DEFAULT_FILTER_VALUES), requestId: 0 }));
  const [detay, setDetay] = useState({ open: false, satir: null });
  // Kullanıma aktarımdan sonra açık detay yeniden okunur
  const [detayYenilemeAnahtari, setDetayYenilemeAnahtari] = useState(0);
  const [isEmriModal, setIsEmriModal] = useState({ open: false, record: null });
  // Kullanıma aktarım için iş emri detayı okunan satırın siraNo'su; o satırın düğmesi yükleniyor görünür
  const [kullanimaAktarAcilanId, setKullanimaAktarAcilanId] = useState(null);
  const [kullanimaAktar, setKullanimaAktar] = useState(null);

  const methods = useForm({ defaultValues: DEFAULT_FILTER_VALUES });
  const { getValues } = methods;

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

      const response = await GetMaterialRequestListService(diff, currentSetPointId, searchTermRef.current, filtersRef.current, pageSizeOverride);

      if (requestId !== requestIdRef.current) return;

      // Hata halinde liste yerine { status: false, message } gövdesi döner
      if (!Array.isArray(response?.data?.list)) {
        message.error(response?.data?.message || t("islemBasarisiz"));
        return;
      }

      const newData = response.data.list.map((item) => ({
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

  const handleTableChange = (page) => {
    fetchData(page - currentPage, page);
  };

  const handlePageSizeChange = (value) => {
    localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(value));
    pageSizeRef.current = value;
    setPageSize(value);
    fetchData(0, 1, 0, value);
  };

  // Görünüm değişimi yalnızca gösterimi değiştirir; liste yeniden okunmaz
  const handleGorunumChange = (value) => {
    localStorage.setItem(GORUNUM_STORAGE_KEY, value);
    setGorunum(value);
  };

  // Güncelleme sonrası kullanıcı bulunduğu sayfada kalır; sayfayı üreten istek birebir tekrarlanır
  const refreshCurrentPageData = useCallback(() => {
    const { diff, setPointId, targetPage, pageSize: requestPageSize } = currentPageRequestRef.current;
    fetchData(diff, targetPage, setPointId, requestPageSize);
    refreshStatistics();
  }, [fetchData, refreshStatistics]);

  const handleKullanimaAktarildi = () => {
    refreshCurrentPageData();
    setDetayYenilemeAnahtari((prev) => prev + 1);
  };

  const openDetay = (satir) => setDetay({ open: true, satir });

  // İş emri detayı servisSiraNo ile açılır (ekrandaki servisNo metni veya talebin siraNo'su değil)
  const openIsEmri = (satir) => {
    if (!satir.servisSiraNo) return;
    setIsEmriModal({ open: true, record: { siraNo: satir.servisSiraNo, servisNo: satir.servisNo } });
  };

  // Kullanıma aktarımda malzeme hareketi iş emrinin aracına yazılır; araç liste yanıtında olmadığı için iş emri detayından okunur
  const openKullanimaAktar = async (satir) => {
    setKullanimaAktarAcilanId(satir.siraNo);
    try {
      const servisResponse = await GetVehicleServiceByIdService(satir.servisSiraNo);
      setKullanimaAktar({ isEmriId: satir.servisSiraNo, aracId: toNullableId(servisResponse?.data?.aracId), talepId: satir.siraNo });
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setKullanimaAktarAcilanId(null);
    }
  };

  // Açık detay, liste yenilendiğinde satırın güncel haliyle gösterilir
  const detaySatiri = data.find((satir) => satir.siraNo === detay.satir?.siraNo) || detay.satir;

  const initialColumns = [
    {
      title: t("talepNo"),
      dataIndex: "talepNo",
      key: "talepNo",
      width: 150,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.talepNo, b.talepNo),
      render: (text, record) => (
        <a role="link" tabIndex={0} onClick={() => openDetay(record)} onKeyDown={(e) => e.key === "Enter" && openDetay(record)}>
          {text || "—"}
        </a>
      ),
    },
    {
      title: t("talepTarihi"),
      dataIndex: "talepTarih",
      key: "talepTarih",
      width: 120,
      visible: true,
      sorter: (a, b) => compareDatesForSorter(a.talepTarih, b.talepTarih),
      render: (tarih) => formatDateByLocale(tarih, undefined, "—"),
    },
    {
      title: t("isEmriPlaka"),
      dataIndex: "servisNo",
      key: "servisNo",
      width: 160,
      visible: true,
      sorter: (a, b) => compareText(a.servisNo, b.servisNo),
      render: (servisNo, record) => (
        <div className="flex flex-col">
          {servisNo && record.servisSiraNo ? (
            <a role="link" tabIndex={0} onClick={() => openIsEmri(record)} onKeyDown={(e) => e.key === "Enter" && openIsEmri(record)}>
              {servisNo}
            </a>
          ) : (
            <span>{servisNo || "—"}</span>
          )}
          <span style={altSatirStyle}>{record.plaka}</span>
        </div>
      ),
    },
    {
      title: t("malzemeTekil"),
      dataIndex: "malzemeTanim",
      key: "malzemeTanim",
      width: 200,
      visible: true,
      sorter: (a, b) => compareText(a.malzemeTanim, b.malzemeTanim),
      render: (tanim, record) => (
        <div className="flex flex-col" style={{ minWidth: 0 }}>
          <span style={altSatirStyle}>{record.malzemeKod}</span>
          <Text strong ellipsis={{ tooltip: tanim }}>
            {tanim || "—"}
          </Text>
        </div>
      ),
    },
    {
      title: t("talepEden"),
      dataIndex: "talepEden",
      key: "talepEden",
      width: 190,
      visible: true,
      sorter: (a, b) => compareText(a.talepEden, b.talepEden),
      render: (isim, record) => <PersonelBilgisi isim={isim} unvan={record.unvan} resim={record.personelVarsayilanResim} />,
    },
    {
      title: t("talepMiktari"),
      dataIndex: "talepMiktar",
      key: "talepMiktar",
      width: 110,
      visible: true,
      sorter: (a, b) => (Number(a.talepMiktar) || 0) - (Number(b.talepMiktar) || 0),
      render: (miktar, record) => formatMiktar(miktar, record.malzemeBirim),
    },
    {
      title: t("kullanilan"),
      dataIndex: "kullanilanMiktar",
      key: "kullanilanMiktar",
      width: 110,
      visible: true,
      sorter: (a, b) => (Number(a.kullanilanMiktar) || 0) - (Number(b.kullanilanMiktar) || 0),
      render: (miktar, record) => formatMiktar(miktar, record.malzemeBirim),
    },
    {
      title: t("gerekliTarih"),
      dataIndex: "gerekliTarih",
      key: "gerekliTarih",
      width: 120,
      visible: true,
      sorter: (a, b) => compareDatesForSorter(a.gerekliTarih, b.gerekliTarih),
      render: (tarih) => formatDateByLocale(tarih, undefined, "—"),
    },
    {
      title: t("talepDurumu"),
      dataIndex: "durum",
      key: "durum",
      width: 150,
      visible: true,
      sorter: (a, b) => (Number(a.durum) || 0) - (Number(b.durum) || 0),
      render: (durum) => <DurumTag durum={durum} getTanim={getMalzemeTalepDurumTanimi} />,
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 220,
      visible: true,
      ellipsis: true,
      render: (text) => text || "—",
    },
  ];

  // Tablo satırı ve kart aynı işlem düğmelerini kullanır
  const renderIslemler = (record) => {
    const tamamlandi = record.durum === MALZEME_TALEP_DURUM.TAMAMLANDI;
    const kullanimaAktarAciliyor = kullanimaAktarAcilanId === record.siraNo;

    const menu = {
      items: [
        { key: "detay", icon: <EyeOutlined />, label: t("detay") },
        { key: "isEmrineGit", icon: <ExportOutlined />, label: t("isEmrineGit"), disabled: !record.servisSiraNo },
      ],
      onClick: ({ key }) => {
        if (key === "detay") openDetay(record);
        if (key === "isEmrineGit") openIsEmri(record);
      },
    };

    return (
      <div className="flex" style={{ gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
        {tamamlandi ? (
          <Button style={cerceveButonStyle} onClick={() => openDetay(record)}>
            {t("detay")}
          </Button>
        ) : (
          <Button
            loading={kullanimaAktarAciliyor}
            disabled={!record.servisSiraNo}
            style={getDolguButonStyle(KULLANIMA_AKTAR_RENGI, !record.servisSiraNo)}
            onClick={() => openKullanimaAktar(record)}
          >
            {t("kullanimaAktar")}
          </Button>
        )}
        <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
          <Button style={menuButonStyle} icon={<EllipsisOutlined />} aria-label={t("islemler")} />
        </Dropdown>
      </div>
    );
  };

  // İşlem sütunu sütun ayarlarına dahil değildir; her zaman sağda sabit durur
  const islemColumn = {
    title: t("islem"),
    key: "islem",
    width: 190,
    fixed: "right",
    align: "right",
    render: (_, record) => renderIslemler(record),
  };

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

  const filteredColumns = [...mergedColumns.filter((col) => col.visible), islemColumn];

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

  const statisticCards = [
    { type: MALZEME_TALEP_KPI.TOPLAM_TALEP, title: t("toplamTalep"), icon: <FileTextOutlined style={ICON_STYLE} /> },
    { type: MALZEME_TALEP_KPI.BEKLEYEN, title: t("bekleyen"), icon: <ClockCircleOutlined style={ICON_STYLE} /> },
    { type: MALZEME_TALEP_KPI.KISMI_KARSILANDI, title: t("kismiKarsilandi"), icon: <PieChartOutlined style={ICON_STYLE} /> },
    { type: MALZEME_TALEP_KPI.TAMAMLANAN, title: t("tamamlanan"), icon: <CheckCircleOutlined style={ICON_STYLE} /> },
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

      {/* KPI kutuları */}
      <TakipPaneliStatisticsCards request={statisticsRequest} cards={statisticCards} fetchStatistic={GetMaterialRequestStatisticsByTypeService} />

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
              style={{ width: "280px" }}
              type="text"
              placeholder={t("malzemeTalepTakipAramaPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <div style={{ width: "140px" }}>
              <SelectInput name="sureFiltre" options={getSureOptions()} allowClear={false} />
            </div>
            <div style={{ width: "200px" }}>
              <PersonelMultiSelectbox name1="personelFiltre" />
            </div>
            <div style={{ width: "200px" }}>
              <KademeSelectbox name1="kademeFiltre" multiSelect placeholder={t("kademeSeciniz")} />
            </div>
            <div style={{ width: "160px" }}>
              <MultiSelectInput name="durumFiltre" options={getMalzemeTalepDurumFiltreOptions()} placeholder={t("durumSeciniz")} />
            </div>
            <Button onClick={handleSearch} icon={<SearchOutlined />} style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", color: "#fff" }} />
          </div>
          <GorunumSecici value={gorunum} onChange={handleGorunumChange} />
        </div>
      </FormProvider>

      {gorunum === GORUNUM.KART ? (
        // Kartlar kendi alanında kayar; sayfalama alt bantta tablo görünümüyle aynı yerde kalır
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 303px)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
            <Spin spinning={loading}>
              <TakipKartIzgarasi bos={!loading && data.length === 0}>
                {data.map((satir) => (
                  <MalzemeTalepKarti key={satir.key} satir={satir} islemler={renderIslemler(satir)} onDetay={openDetay} onIsEmriAc={openIsEmri} />
                ))}
              </TakipKartIzgarasi>
            </Spin>
          </div>
          <div style={{ paddingTop: "10px", borderTop: "1px solid #f0f0f0" }}>{tableFooter()}</div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 303px)",
            borderRadius: "8px",
          }}
        >
          <Spin spinning={loading}>
            <Table components={components} columns={filteredColumns} dataSource={data} pagination={false} footer={tableFooter} scroll={{ y: "calc(100vh - 443px)", x: tableScrollX }} />
          </Spin>
        </div>
      )}

      <MalzemeTalepDetayDrawer
        open={detay.open}
        satir={detaySatiri}
        yenilemeAnahtari={detayYenilemeAnahtari}
        onClose={() => setDetay({ open: false, satir: null })}
        onIsEmriAc={openIsEmri}
        onKullanimaAktar={openKullanimaAktar}
      />

      <UpdateModal selectedRow={isEmriModal.record} open={isEmriModal.open} onClose={() => setIsEmriModal((prev) => ({ ...prev, open: false }))} onRefresh={refreshCurrentPageData} />

      <KullanimaAktarModal
        open={kullanimaAktar !== null}
        isEmriId={kullanimaAktar?.isEmriId}
        aracId={kullanimaAktar?.aracId}
        talepId={kullanimaAktar?.talepId}
        onClose={() => setKullanimaAktar(null)}
        onSaved={handleKullanimaAktarildi}
      />
    </>
  );
};

export default MalzemeTalepleriTakipPaneli;
