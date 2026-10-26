import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Table, Button, Modal, Checkbox, Dropdown, Input, Pagination, Spin, Typography, message } from "antd";
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  EyeOutlined,
  HistoryOutlined,
  HolderOutlined,
  InboxOutlined,
  MenuOutlined,
  PauseCircleOutlined,
  PauseOutlined,
  PlusOutlined,
  ProfileOutlined,
  SearchOutlined,
  SyncOutlined,
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
import PageSizeSelect, { getStoredPageSize } from "../../../components/table/PageSizeSelect";
import SelectInput from "../../../components/form/selects/SelectInput";
import MultiSelectInput from "../../../components/form/selects/MultiSelectInput";
import KademeSelectbox from "../../../components/KademeSelectbox";
import PersonelMultiSelectbox from "../../../components/PersonelMultiSelectbox";
import {
  GetServiceWorkCardByIdService,
  GetServiceWorkCardListService,
  GetServiceWorkCardStatisticsByTypeService,
  GetVehicleServiceByIdService,
} from "../../../../api/services/isEmri/services";
import { IS_DURUM, TUMU, getIsDurumTanimi, getSureOptions, getSureTarihSaatAraligi, isSuccessResponse, normalizeIsDurumu, toNullableId } from "../KademeIsEmirleri/constants";
import DurumTag from "../KademeIsEmirleri/components/DurumTag";
import UpdateModal from "../KademeIsEmirleri/update/UpdateModal";
import IsDetayiModal from "../KademeIsEmirleri/atananIsler/IsDetayiModal";
import { updateIsDurumu } from "../KademeIsEmirleri/atananIsler/isDurumuGuncelle";
import MalzemeTalepEtModal from "../KademeIsEmirleri/malzemeTalepleri/MalzemeTalepEtModal";
import TakipPaneliStatisticsCards from "../components/TakipPaneliStatisticsCards";
import PersonelBilgisi from "../components/PersonelBilgisi";
import TarihSaat from "../components/TarihSaat";
import { cerceveButonStyle, getDolguButonStyle, menuButonStyle } from "../components/islemButonStyles";
import GorunumSecici, { GORUNUM, getStoredGorunum } from "../components/GorunumSecici";
import { TakipKartIzgarasi } from "../components/TakipKarti";
import { IS_TAKIP_KPI, formatPlanlananSure, getAnaDurumAksiyonu, getIsDurumFiltreOptions, withSayacAlinmaAni } from "./constants";
import SureSayaci from "./components/SureSayaci";
import AtananIsDetayDrawer from "./components/AtananIsDetayDrawer";
import IsDurumGecmisi from "./components/IsDurumGecmisi";
import AtananIsKarti from "./components/AtananIsKarti";

const { Text } = Typography;

const PAGE_SIZE_STORAGE_KEY = "kademeIsTakipPaneliPageSize";
const GORUNUM_STORAGE_KEY = "kademeIsTakipPaneliGorunum";
// Varsayılan sütun sırası değiştiği (Süre, Başlama ve Bitiş'ten sonra) için kayıtlı eski sıra okunmaz
const COLUMN_ORDER_STORAGE_KEY = "columnOrderKademeIsTakipPaneliV2";
const COLUMN_VISIBILITY_STORAGE_KEY = "columnVisibilityKademeIsTakipPaneli";
const COLUMN_WIDTHS_STORAGE_KEY = "columnWidthsKademeIsTakipPaneli";

// Panel tarih sınırı olmadan, tamamlanmamış işlerle açılır
const DEFAULT_FILTER_VALUES = {
  sureFiltre: TUMU,
  personelFiltre: [],
  personelFiltreID: [],
  kademeFiltre: [],
  kademeFiltreID: [],
  durumFiltre: [IS_DURUM.BEKLIYOR, IS_DURUM.DEVAM_EDIYOR, IS_DURUM.DURDU, IS_DURUM.YENIDEN_BASLADI],
};

const ICON_STYLE = { fontSize: 22, color: "#6b7a8a" };
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

// Liste ve KPI kutuları aynı filtre gövdesini kullanır; "Tümü" için diziler boş gider (null gönderilmez)
const buildFilters = ({ sureFiltre, personelFiltreID, kademeFiltreID, durumFiltre }) => ({
  personelIds: Array.isArray(personelFiltreID) ? personelFiltreID : [],
  kademeIds: Array.isArray(kademeFiltreID) ? kademeFiltreID : [],
  durumIds: Array.isArray(durumFiltre) ? durumFiltre : [],
  ...getSureTarihSaatAraligi(sureFiltre),
});

const ANA_AKSIYON_IKONLARI = {
  baslat: <CaretRightOutlined />,
  durdur: <PauseOutlined />,
  devamEt: <CaretRightOutlined />,
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

// İş kartının bağlı olduğu iş emri id'si (servisSiraNo) liste yanıtında yer almadığı için iş kartı detayından okunur
const getServisSiraNo = async (kart) => {
  const response = await GetServiceWorkCardByIdService(kart.siraNo);
  return response?.data?.servisSiraNo || null;
};

const KademeIsTakipPaneli = () => {
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(PAGE_SIZE_STORAGE_KEY));
  const [gorunum, setGorunum] = useState(() => getStoredGorunum(GORUNUM_STORAGE_KEY));
  const [statisticsRequest, setStatisticsRequest] = useState(() => ({ searchTerm: "", filters: buildFilters(DEFAULT_FILTER_VALUES), requestId: 0 }));
  // Durumu değiştirilen / iş emri bilgisi okunan satırın siraNo'su; o satırın düğmesi yükleniyor görünür
  const [durumDegisenIsId, setDurumDegisenIsId] = useState(null);
  const [isEmriAcilanIsId, setIsEmriAcilanIsId] = useState(null);
  const [detay, setDetay] = useState({ open: false, kart: null });
  const [durumGecmisiKarti, setDurumGecmisiKarti] = useState(null);
  // Durum değişince açık detaydaki iş kartı ve tarihçe yeniden okunur
  const [detayYenilemeAnahtari, setDetayYenilemeAnahtari] = useState(0);
  const [isEmriModal, setIsEmriModal] = useState({ open: false, record: null, sekme: undefined });
  const [talepEt, setTalepEt] = useState(null);
  // İsme tıklanınca açılan düzenlenebilir İş Detayı (başlama/bitiş zamanı elle düzeltilebilir)
  const [isDetayi, setIsDetayi] = useState(null);

  const methods = useForm({ defaultValues: DEFAULT_FILTER_VALUES });
  const { getValues, setValue } = methods;

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

      const response = await GetServiceWorkCardListService(diff, currentSetPointId, searchTermRef.current, filtersRef.current, pageSizeOverride);

      if (requestId !== requestIdRef.current) return;

      // Hata halinde liste yerine { status: false, message } gövdesi döner
      if (!Array.isArray(response?.data?.list)) {
        message.error(response?.data?.message || t("islemBasarisiz"));
        return;
      }

      // Süre sayacının referansı yanıtın alındığı andır
      const newData = withSayacAlinmaAni(response.data.list).map((item) => ({
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

  // Sekmeye geri dönüldüğünde sayaç referansı güncel veriyle yeniden kurulur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") refreshCurrentPageData();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [refreshCurrentPageData]);

  const changeDurum = async (kart, status) => {
    setDurumDegisenIsId(kart.siraNo);
    try {
      // Başlat/Bitir boş başlama/bitiş zamanını sistem zamanıyla doldurur
      const response = await updateIsDurumu(kart.siraNo, status);
      if (!isSuccessResponse(response)) {
        message.error(response?.data?.message || t("islemBasarisiz"));
        return;
      }

      message.success(t("islemBasarili"));
      refreshCurrentPageData();
      setDetayYenilemeAnahtari((prev) => prev + 1);
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setDurumDegisenIsId(null);
    }
  };

  const confirmIsiBitir = (kart) => {
    Modal.confirm({
      title: t("isiBitir"),
      content: t("isiBitirOnay", { isTanim: kart.isTanim || kart.servisNo || "" }),
      okText: t("evet"),
      cancelText: t("hayir"),
      onOk: () => changeDurum(kart, IS_DURUM.TAMAMLANDI),
    });
  };

  // sekme verilirse iş emri o sekmeyle açılır (ör. talep düğmesinden Malzeme Talepleri)
  const openIsEmri = async (kart, sekme) => {
    setIsEmriAcilanIsId(kart.siraNo);
    try {
      const servisSiraNo = await getServisSiraNo(kart);
      if (!servisSiraNo) {
        message.error(t("islemBasarisiz"));
        return;
      }
      setIsEmriModal({ open: true, record: { siraNo: servisSiraNo, servisNo: kart.servisNo }, sekme });
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setIsEmriAcilanIsId(null);
    }
  };

  // Malzeme talebi iş emrine bağlı oluşturulur; araç ve kademe iş emri detayından okunur, talepte bu iş seçili gelir
  const openTalepEt = async (kart) => {
    setIsEmriAcilanIsId(kart.siraNo);
    try {
      const servisSiraNo = await getServisSiraNo(kart);
      if (!servisSiraNo) {
        message.error(t("islemBasarisiz"));
        return;
      }
      const servisResponse = await GetVehicleServiceByIdService(servisSiraNo);
      setTalepEt({
        isEmriId: servisSiraNo,
        aracId: toNullableId(servisResponse?.data?.aracId),
        kademeId: toNullableId(servisResponse?.data?.kademeId),
        isId: kart.siraNo,
        isTanim: kart.isTanim,
      });
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setIsEmriAcilanIsId(null);
    }
  };

  // İş Detayı'ndaki personel seçimi iş emrinin kademesine göre yapılır; kademe iş emri detayından okunur
  const openIsDetayi = async (kart) => {
    try {
      const servisSiraNo = await getServisSiraNo(kart);
      const servisResponse = servisSiraNo ? await GetVehicleServiceByIdService(servisSiraNo) : null;
      setIsDetayi({ isId: kart.siraNo, kademeId: toNullableId(servisResponse?.data?.kademeId) });
    } catch {
      message.error(t("islemBasarisiz"));
    }
  };

  const openDetay = (kart) => setDetay({ open: true, kart });

  // Açık detay, liste yenilendiğinde satırın güncel haliyle (durum, sayaç) gösterilir
  const detayKarti = data.find((kart) => kart.siraNo === detay.kart?.siraNo) || detay.kart;

  const renderMalzeme = (malzemeSayisi, record) => {
    const sayi = Number(malzemeSayisi) || 0;
    const yukleniyor = isEmriAcilanIsId === record.siraNo;

    if (sayi > 0) {
      return (
        <Button size="small" icon={<InboxOutlined />} loading={yukleniyor} onClick={() => openIsEmri(record, "malzemeTalepleri")}>
          {t("talepSayisi", { sayi: formatNumberWithLocale(sayi) })}
        </Button>
      );
    }

    if (normalizeIsDurumu(record.durum) === IS_DURUM.TAMAMLANDI) return "—";

    return (
      <Button size="small" type="dashed" icon={<PlusOutlined />} loading={yukleniyor} onClick={() => openTalepEt(record)}>
        {t("talepEt")}
      </Button>
    );
  };

  const initialColumns = [
    {
      title: t("personelTekil"),
      dataIndex: "personelIsim",
      key: "personelIsim",
      width: 200,
      visible: true,
      sorter: (a, b) => compareText(a.personelIsim, b.personelIsim),
      render: (isim, record) => (
        <a role="link" tabIndex={0} onClick={() => openIsDetayi(record)} onKeyDown={(e) => e.key === "Enter" && openIsDetayi(record)}>
          <PersonelBilgisi isim={isim} unvan={record.unvan} resim={record.personelVarsayilanResim} />
        </a>
      ),
    },
    {
      title: t("isEmriNo"),
      dataIndex: "servisNo",
      key: "servisNo",
      width: 150,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.servisNo, b.servisNo),
      render: (text, record) =>
        text ? (
          <a role="link" tabIndex={0} onClick={() => openIsEmri(record)} onKeyDown={(e) => e.key === "Enter" && openIsEmri(record)}>
            {text}
          </a>
        ) : (
          "—"
        ),
    },
    {
      title: t("isTanimi"),
      dataIndex: "isTanim",
      key: "isTanim",
      width: 200,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.isTanim, b.isTanim),
      render: (text) => <Text strong>{text || "—"}</Text>,
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 160,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.plaka, b.plaka),
      render: (plaka, record) => (
        <div className="flex flex-col">
          <Text strong>{plaka || "—"}</Text>
          <span style={altSatirStyle}>{[record.marka, record.model].filter(Boolean).join(" ")}</span>
        </div>
      ),
    },
    {
      title: t("durum"),
      dataIndex: "durum",
      key: "durum",
      width: 140,
      visible: true,
      sorter: (a, b) => normalizeIsDurumu(a.durum) - normalizeIsDurumu(b.durum),
      render: (durum) => <DurumTag durum={durum} getTanim={getIsDurumTanimi} />,
    },
    {
      title: t("baslama"),
      dataIndex: "baslamaTarih",
      key: "baslamaTarih",
      width: 120,
      visible: true,
      sorter: (a, b) => compareDatesForSorter(a.baslamaTarih, b.baslamaTarih),
      render: (tarih, record) => <TarihSaat tarih={tarih} saat={record.baslamaSaat} />,
    },
    {
      title: t("bitis"),
      dataIndex: "bitisTarih",
      key: "bitisTarih",
      width: 120,
      visible: true,
      sorter: (a, b) => compareDatesForSorter(a.bitisTarih, b.bitisTarih),
      render: (tarih, record) => <TarihSaat tarih={tarih} saat={record.bitisSaat} />,
    },
    {
      title: t("sure"),
      dataIndex: "toplamSaniye",
      key: "toplamSaniye",
      width: 140,
      visible: true,
      sorter: (a, b) => (Number(a.toplamSaniye) || 0) - (Number(b.toplamSaniye) || 0),
      render: (_, record) => (
        <div className="flex flex-col">
          <SureSayaci kart={record} style={{ fontWeight: 600 }} />
          <span style={altSatirStyle}>{t("planSure", { sure: formatPlanlananSure(record.sure) })}</span>
        </div>
      ),
    },
    {
      title: t("kademe"),
      dataIndex: "kademeAdi",
      key: "kademeAdi",
      width: 150,
      visible: true,
      ellipsis: true,
      sorter: (a, b) => compareText(a.kademeAdi, b.kademeAdi),
      render: (text) => text || "—",
    },
    {
      title: t("malzemeTalepleri"),
      dataIndex: "malzemeSayisi",
      key: "malzemeSayisi",
      width: 140,
      visible: true,
      sorter: (a, b) => (Number(a.malzemeSayisi) || 0) - (Number(b.malzemeSayisi) || 0),
      render: renderMalzeme,
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
    const anaAksiyon = getAnaDurumAksiyonu(record.durum);
    const tamamlandi = normalizeIsDurumu(record.durum) === IS_DURUM.TAMAMLANDI;
    const durumDegisiyor = durumDegisenIsId === record.siraNo;

    const menu = {
      items: [
        { key: "isiBitir", icon: <CheckCircleOutlined />, label: t("isiBitir"), disabled: tamamlandi || durumDegisiyor },
        { key: "detay", icon: <EyeOutlined />, label: t("detay") },
        { key: "durumGecmisi", icon: <HistoryOutlined />, label: t("durumGecmisi") },
      ],
      onClick: ({ key }) => {
        if (key === "isiBitir") confirmIsiBitir(record);
        if (key === "detay") openDetay(record);
        if (key === "durumGecmisi") setDurumGecmisiKarti(record);
      },
    };

    return (
      <div className="flex" style={{ gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
        {anaAksiyon ? (
          <Button icon={ANA_AKSIYON_IKONLARI[anaAksiyon.key]} loading={durumDegisiyor} style={getDolguButonStyle(anaAksiyon.color)} onClick={() => changeDurum(record, anaAksiyon.status)}>
            {t(anaAksiyon.labelKey)}
          </Button>
        ) : (
          <Button style={cerceveButonStyle} onClick={() => openDetay(record)}>
            {t("detay")}
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
    width: 170,
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

  // durumIds tanımlı kutuya tıklanınca durum filtresi o değerlerle uygulanır (Toplam İş tüm durumları gösterir).
  // Malzeme Talebi kutusunun iş listesinde karşılığı olan bir filtre yoktur.
  const statisticCards = [
    { type: IS_TAKIP_KPI.TOPLAM_IS, title: t("toplamIs"), icon: <ProfileOutlined style={ICON_STYLE} />, durumIds: [] },
    { type: IS_TAKIP_KPI.BEKLEYEN, title: t("bekleyen"), icon: <ClockCircleOutlined style={ICON_STYLE} />, durumIds: [IS_DURUM.BEKLIYOR] },
    { type: IS_TAKIP_KPI.DEVAM_EDEN, title: t("devamEden"), icon: <SyncOutlined style={ICON_STYLE} />, durumIds: [IS_DURUM.DEVAM_EDIYOR, IS_DURUM.YENIDEN_BASLADI] },
    { type: IS_TAKIP_KPI.DURDU, title: t("durdu"), icon: <PauseCircleOutlined style={ICON_STYLE} />, durumIds: [IS_DURUM.DURDU] },
    { type: IS_TAKIP_KPI.TAMAMLANAN, title: t("tamamlanan"), icon: <CheckCircleOutlined style={ICON_STYLE} />, durumIds: [IS_DURUM.TAMAMLANDI] },
    { type: IS_TAKIP_KPI.MALZEME_TALEBI, title: t("malzemeTalebi"), icon: <InboxOutlined style={ICON_STYLE} /> },
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
      <TakipPaneliStatisticsCards request={statisticsRequest} cards={statisticCards} fetchStatistic={GetServiceWorkCardStatisticsByTypeService} onFiltreSec={handleKpiFiltre} />

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
              placeholder={t("isTakipAramaPlaceholder")}
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
              <MultiSelectInput name="durumFiltre" options={getIsDurumFiltreOptions()} placeholder={t("durumSeciniz")} />
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
                {data.map((kart) => (
                  <AtananIsKarti key={kart.key} kart={kart} malzeme={renderMalzeme(kart.malzemeSayisi, kart)} islemler={renderIslemler(kart)} onIsEmriAc={openIsEmri} />
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

      <AtananIsDetayDrawer
        open={detay.open}
        kart={detayKarti}
        yenilemeAnahtari={detayYenilemeAnahtari}
        durumDegisiyor={durumDegisenIsId !== null && durumDegisenIsId === detayKarti?.siraNo}
        onClose={() => setDetay({ open: false, kart: null })}
        onDurumDegistir={changeDurum}
        onIsEmriAc={openIsEmri}
      />

      <Modal
        title={[t("durumGecmisi"), durumGecmisiKarti?.isTanim].filter(Boolean).join(" · ")}
        open={durumGecmisiKarti !== null}
        onCancel={() => setDurumGecmisiKarti(null)}
        footer={
          <Button className="btn btn-min cancel-btn" onClick={() => setDurumGecmisiKarti(null)}>
            {t("kapat")}
          </Button>
        }
        destroyOnClose
      >
        <IsDurumGecmisi isId={durumGecmisiKarti?.siraNo} yenilemeAnahtari={detayYenilemeAnahtari} />
      </Modal>

      <UpdateModal
        selectedRow={isEmriModal.record}
        open={isEmriModal.open}
        baslangicSekmesi={isEmriModal.sekme}
        onClose={() => setIsEmriModal((prev) => ({ ...prev, open: false }))}
        onRefresh={refreshCurrentPageData}
      />

      <IsDetayiModal open={isDetayi !== null} isId={isDetayi?.isId} kademeId={isDetayi?.kademeId} onClose={() => setIsDetayi(null)} onChange={refreshCurrentPageData} />

      <MalzemeTalepEtModal
        open={talepEt !== null}
        isEmriId={talepEt?.isEmriId}
        aracId={talepEt?.aracId}
        kademeId={talepEt?.kademeId}
        isId={talepEt?.isId || 0}
        isTanim={talepEt?.isTanim}
        onClose={() => setTalepEt(null)}
        onSaved={refreshCurrentPageData}
      />
    </>
  );
};

export default KademeIsTakipPaneli;
