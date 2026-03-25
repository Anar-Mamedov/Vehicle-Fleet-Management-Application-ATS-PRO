import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Select, Pagination } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Filters from "./filter/Filters";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";
import HgsEntegrasyon from "../HgsEntegrasyonu/HgsEntegrasyon";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const { Text } = Typography;
const { Option } = Select;

const pageSizeHgsIslem = "hgsIslemTabloPageSize";
const infiniteScrollKey = "tabloInfiniteScroll";

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

const Yakit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(() => {
    const savedScrollMode = localStorage.getItem(infiniteScrollKey);
    return savedScrollMode !== null ? JSON.parse(savedScrollMode) : false;
  });

  const [pageSize, setPageSize] = useState(() => {
    const savedPageSize = localStorage.getItem(pageSizeHgsIslem);
    const initialSize = parseInt(savedPageSize, 10);
    return !isNaN(initialSize) && initialSize >= 20 ? initialSize : 20;
  });

  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const lastFetchIdRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  const [statistics, setStatistics] = useState({
    toplamGecis: null,
    toplamGerceklesenTutar: null,
    supheliKayit: null,
    enYogunGuzergah: null,
  });
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [timeRangeLabel, setTimeRangeLabel] = useState("Tümü");

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  const handleBodyChange = useCallback((type, newBody) => {
    setBody((prevBody) => {
      if (type === "filters") {
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

  const fetchStatistics = async (customfilterOverride) => {
    setStatisticsLoading(true);
    const customFilters = customfilterOverride ?? (body.filters?.customfilter && Object.keys(body.filters.customfilter).length > 0 ? body.filters.customfilter : {});

    try {
      const [res1, res2, res3, res4] = await Promise.all([
        AxiosInstance.post("HgsOperationsStatistics/GetInfoByType?type=1", customFilters),
        AxiosInstance.post("HgsOperationsStatistics/GetInfoByType?type=2", customFilters),
        AxiosInstance.post("HgsOperationsStatistics/GetInfoByType?type=3", customFilters),
        AxiosInstance.post("HgsOperationsStatistics/GetInfoByType?type=4", customFilters),
      ]);

      setStatistics({
        toplamGecis: res1.data,
        toplamGerceklesenTutar: res2.data,
        supheliKayit: res3.data,
        enYogunGuzergah: res4.data,
      });
    } catch (error) {
      console.error("İstatistik verisi çekme hatası:", error);
    } finally {
      setStatisticsLoading(false);
    }
  };

  // API Data Fetching with pagination, search, and sorting
  const fetchData = async (diff, targetPage, options = {}) => {
    const { currentSize = pageSize, customSortColumn = sortColumn, customSortDirection = sortDirection, customfilterOverride } = options;

    const currentFetchId = lastFetchIdRef.current + 1;
    lastFetchIdRef.current = currentFetchId;

    if (isLoadingPage && diff > 0) return;

    diff === 0 ? setLoading(true) : setIsLoadingMore(true);
    setIsLoadingPage(true);

    try {
      const directionStr = customSortDirection === "ascend" ? "asc" : customSortDirection === "descend" ? "desc" : "";

      const effectiveCustomfilter = customfilterOverride ?? (body.filters?.customfilter || {});
      const normalizedCustomfilter = {
        baslangicTarih: effectiveCustomfilter?.baslangicTarih === "" ? null : (effectiveCustomfilter?.baslangicTarih ?? null),
        bitisTarih: effectiveCustomfilter?.bitisTarih === "" ? null : (effectiveCustomfilter?.bitisTarih ?? null),
        supheli: effectiveCustomfilter?.supheli ?? false,
        lokasyonIds: Array.isArray(effectiveCustomfilter?.lokasyonIds) ? effectiveCustomfilter.lokasyonIds : [],
        otoyolKodIds: Array.isArray(effectiveCustomfilter?.otoyolKodIds) ? effectiveCustomfilter.otoyolKodIds : [],
        ...effectiveCustomfilter,
      };

      const payload = {
        ...normalizedCustomfilter,
        sortColumn: customSortColumn,
        sortDirection: directionStr,
      };

      const qSearch = searchTerm ? `&parameter=${encodeURIComponent(searchTerm)}` : "";

      const response = await AxiosInstance.post(`HgsOperations/GetHgsOperationsList?pageSize=${currentSize}&pageNumber=${targetPage}${qSearch}`, payload);

      if (currentFetchId !== lastFetchIdRef.current) {
        return;
      }

      const total = response.data.recordCount || 0;
      setTotalCount(total);

      if (targetPage !== undefined) {
        setCurrentPage(targetPage);
      }

      const listItems = response.data.list || [];
      const newItems = listItems.map((item) => ({
        ...item,
        key: item.siraNo,
      }));

      if (infiniteScrollEnabled) {
        if (diff > 0 && newItems.length > 0) {
          const existingIds = new Set(data.map((item) => item.siraNo));
          const uniqueNewItems = newItems.filter((item) => !existingIds.has(item.siraNo));

          if (uniqueNewItems.length > 0) {
            setData((prevData) => [...prevData, ...uniqueNewItems]);
          }
        } else if (diff === 0 || targetPage === 1) {
          setData(newItems);
        }
      } else {
        if (newItems.length > 0) {
          setData(newItems);
        } else {
          // message.warning("Veri bulunamadı.");
          if (targetPage === 1) {
            setData([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }
    fetchData(0, 1).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
    fetchStatistics();
  }, [infiniteScrollEnabled]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleSearch = (opts = {}) => {
    if (!infiniteScrollEnabled) setPaginationLoading(true);
    setCurrentPage(1);
    fetchData(0, 1, opts).finally(() => {
      if (!infiniteScrollEnabled) setPaginationLoading(false);
    });
    fetchStatistics(opts.customfilterOverride);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter) {
      const newSortColumn = sorter.field || "";
      const newSortDirection = sorter.order || "";
      setSortColumn(newSortColumn);
      setSortDirection(newSortDirection);

      if (!infiniteScrollEnabled) setPaginationLoading(true);
      setCurrentPage(1);
      fetchData(0, 1, { customSortColumn: newSortColumn, customSortDirection: newSortDirection }).finally(() => {
        if (!infiniteScrollEnabled) setPaginationLoading(false);
      });
      return;
    }

    const page = typeof pagination === "object" ? pagination.current || 1 : pagination;
    const diff = page - currentPage;
    if (!infiniteScrollEnabled) setPaginationLoading(true);
    fetchData(diff, page).finally(() => {
      if (!infiniteScrollEnabled) setPaginationLoading(false);
    });
  };

  const handlePageSizeChange = (value) => {
    if (!infiniteScrollEnabled) setPaginationLoading(true);
    localStorage.setItem(pageSizeHgsIslem, value.toString());
    setPageSize(value);
    fetchData(0, 1, { currentSize: value }).finally(() => {
      if (!infiniteScrollEnabled) setPaginationLoading(false);
    });
  };

  const handleTableScroll = (e) => {
    if (!infiniteScrollEnabled) return;

    const target = e.target;
    if (target.className !== "ant-table-body") return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const { scrollTop, scrollHeight, clientHeight } = target;
    const scrollBottom = scrollHeight - (scrollTop + clientHeight);

    if (scrollBottom <= clientHeight * 0.2 && !loading && !isLoadingMore && !isLoadingPage && data.length < totalCount) {
      scrollTimeoutRef.current = setTimeout(() => {
        fetchData(1, currentPage + 1);
      }, 200);
    }
  };

  const tableFooter = () => {
    if (isLoadingMore) {
      return <div style={{ textAlign: "center" }}>Daha fazla yükleniyor...</div>;
    }

    const displayCount = infiniteScrollEnabled ? Math.min(data.length, totalCount) : data.length;

    return (
      <div style={{}}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", alignItems: "center" }}>
          <div>
            Toplam Kayıt: {totalCount} | Görüntülenen: {displayCount}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {!infiniteScrollEnabled && (
              <Pagination
                simple={{ readOnly: true }}
                current={currentPage}
                total={totalCount}
                pageSize={pageSize}
                onChange={(page) => handleTableChange(page)}
                showSizeChanger={false}
                size="small"
              />
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>Kayıt:</span>
              <Select value={pageSize} onChange={handlePageSizeChange} style={{ width: 70 }} popupMatchSelectWidth={false}>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("plakaArac"),
      dataIndex: "plaka",
      key: "plaka",
      width: 150,
      ellipsis: true,
      visible: true,
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a onClick={() => onRowClick(record)} style={{ fontWeight: 600, color: "#1677ff", fontSize: "14px" }}>
            {text}
          </a>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {[record.marka, record.model].filter(Boolean).join(" ") || "-"}
          </Text>
        </div>
      ),
      sorter: true,
    },
    {
      title: t("surucu"),
      dataIndex: "isim",
      key: "isim",
      width: 150,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (text) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: 500, color: "#333", fontSize: "14px" }}>{text || "-"}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Sürücü
          </Text>
        </div>
      ),
    },
    {
      title: t("giris"),
      key: "giris",
      width: 180,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: 500, color: "#333", fontSize: "14px" }}>{record.girisYeri || "-"}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.girisTarih ? dayjs(record.girisTarih).format("DD.MM.YYYY") : "-"} {record.girisSaat ? record.girisSaat : ""}
          </Text>
        </div>
      ),
    },
    {
      title: t("cikis"),
      key: "cikis",
      width: 180,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: 500, color: "#333", fontSize: "14px" }}>{record.cikisYeri || "-"}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.cikisTarih ? dayjs(record.cikisTarih).format("DD.MM.YYYY") : "-"} {record.cikisSaat ? record.cikisSaat : ""}
          </Text>
        </div>
      ),
    },
    {
      title: t("gecisNoktasi"),
      dataIndex: "otoYol",
      key: "otoYol",
      width: 180,
      ellipsis: true,
      visible: true,
      sorter: true,
    },
    {
      title: t("gecisKategorisi"),
      dataIndex: "gecisKategorisi",
      key: "gecisKategorisi",
      width: 140,
      ellipsis: true,
      visible: true,
      sorter: true,
    },
    {
      title: t("gerceklesenTutar"),
      dataIndex: "gecisUcreti",
      key: "gecisUcreti",
      width: 150,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (value) => <Text style={{ fontWeight: 500, color: "#333" }}>{value != null ? `₺${formatNumberWithLocale(value)}` : "-"}</Text>,
    },
    {
      title: t("beklenenTutar"),
      dataIndex: "beklenenTutar",
      key: "beklenenTutar",
      width: 150,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (value, record) => <Text style={{ fontWeight: 500, color: "#333" }}>{value != null ? `₺${formatNumberWithLocale(value)}` : "-"}</Text>,
    },
    {
      title: t("fark"),
      dataIndex: "fark",
      key: "fark",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (value) => <Text style={{ fontWeight: 500, color: "#333" }}>{value != null ? `₺${formatNumberWithLocale(value)}` : "-"}</Text>,
    },
    {
      title: t("tarifeUyumu"),
      dataIndex: "kayitTipi",
      key: "tarifeUyumu",
      width: 140,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (value) => {
        if (value === 1) {
          return (
            <Tag style={{ display: "flex", alignItems: "center", gap: "4px", width: "max-content", backgroundColor: "#f6ffed", color: "#389e0d", borderColor: "#b7eb8f" }}>
              <CheckOutlined /> Uyumlu
            </Tag>
          );
        }
        if (value === 2) {
          return (
            <Tag style={{ display: "flex", alignItems: "center", gap: "4px", width: "max-content", backgroundColor: "#fffbe6", color: "#d48806", borderColor: "#ffe58f" }}>
              <CloseOutlined /> Şüpheli
            </Tag>
          );
        }
        return (
          <Tag style={{ display: "flex", alignItems: "center", gap: "4px", width: "max-content", backgroundColor: "#f5f5f5", color: "#8c8c8c", borderColor: "#d9d9d9" }}>
            - Bilgisiz
          </Tag>
        );
      },
    },
    {
      title: t("odeme"),
      dataIndex: "odemeDurumu",
      key: "odemeDurumu",
      width: 130,
      ellipsis: true,
      visible: true,
      sorter: true,
      render: (text) => {
        let color = "#1677ff"; // default blue
        if (text === "Tahsil edildi" || text?.toLowerCase() === "ödendi") color = "#52c41a"; // green
        return <Text style={{ color, fontWeight: 500 }}>{text || "Beklemede"}</Text>;
      },
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 180,
      ellipsis: true,
      visible: true,
      sorter: true,
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      width: 120,
      ellipsis: true,
      visible: false,
      sorter: true,
      render: (text) => {
        if (!text) return "-";
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("odemeTuru"),
      dataIndex: "odemeTuru",
      key: "odemeTuru",
      width: 120,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("guzergah"),
      dataIndex: "guzergah",
      key: "guzergah",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan1"),
      dataIndex: "ozelAlan1",
      key: "ozelAlan1",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan2"),
      dataIndex: "ozelAlan2",
      key: "ozelAlan2",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan3"),
      dataIndex: "ozelAlan3",
      key: "ozelAlan3",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan4"),
      dataIndex: "ozelAlan4",
      key: "ozelAlan4",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan5"),
      dataIndex: "ozelAlan5",
      key: "ozelAlan5",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan6"),
      dataIndex: "ozelAlan6",
      key: "ozelAlan6",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan7"),
      dataIndex: "ozelAlan7",
      key: "ozelAlan7",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan8"),
      dataIndex: "ozelAlan8",
      key: "ozelAlan8",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan9"),
      dataIndex: "ozelAlan9",
      key: "ozelAlan9",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan10"),
      dataIndex: "ozelAlan10",
      key: "ozelAlan10",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan11"),
      dataIndex: "ozelAlan11",
      key: "ozelAlan11",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
    },
    {
      title: t("ozelAlan12"),
      dataIndex: "ozelAlan12",
      key: "ozelAlan12",
      width: 130,
      ellipsis: true,
      visible: false,
      sorter: true,
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
    const savedOrder = localStorage.getItem("columnOrderHgsIslemTalebi");
    const savedVisibility = localStorage.getItem("columnVisibilityHgsIslemTalebi");
    const savedWidths = localStorage.getItem("columnWidthsHgsIslemTalebi");

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

    localStorage.setItem("columnOrderHgsIslemTalebi", JSON.stringify(order));
    localStorage.setItem("columnVisibilityHgsIslemTalebi", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsHgsIslemTalebi", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderHgsIslemTalebi", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityHgsIslemTalebi",
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
      "columnWidthsHgsIslemTalebi",
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
    localStorage.removeItem("columnOrderHgsIslemTalebi");
    localStorage.removeItem("columnVisibilityHgsIslemTalebi");
    localStorage.removeItem("columnWidthsHgsIslemTalebi");
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

      {/* Statistics Cards */}
      <Spin spinning={statisticsLoading} size="small">
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          {/* Toplam Geçiş */}
          <div
            style={{
              backgroundColor: "white",
              padding: "16px 20px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#8c8c8c" }}>{t("toplamGecis")}</span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px" }}>
              {statistics.toplamGecis != null ? formatNumberWithLocale(statistics.toplamGecis) : "-"}
            </div>
            <div style={{ fontSize: "12px", color: "#bfbfbf" }}>{timeRangeLabel}</div>
          </div>

          {/* Toplam Gerçekleşen Tutar */}
          <div
            style={{
              backgroundColor: "white",
              padding: "16px 20px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#8c8c8c" }}>{t("toplamGerceklesenTutar")}</span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px" }}>
              {statistics.toplamGerceklesenTutar != null ? `₺${formatNumberWithLocale(statistics.toplamGerceklesenTutar)}` : "-"}
            </div>
            <div style={{ fontSize: "12px", color: "#bfbfbf" }}>{timeRangeLabel}</div>
          </div>

          {/* Şüpheli Kayıt */}
          <div
            style={{
              backgroundColor: "white",
              padding: "16px 20px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#8c8c8c" }}>{t("supheliKayit")}</span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px" }}>
              {statistics.supheliKayit != null ? formatNumberWithLocale(statistics.supheliKayit) : "-"}
            </div>
            <div style={{ fontSize: "12px", color: "#bfbfbf" }}>{t("manuelIncelemeGerektiren")}</div>
          </div>

          {/* En Yoğun Güzergah */}
          <div
            style={{
              backgroundColor: "white",
              padding: "16px 20px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#8c8c8c" }}>{t("enYogunGuzergah")}</span>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px" }}>{statistics.enYogunGuzergah?.guzergahAdi ?? "-"}</div>
            <div style={{ fontSize: "12px", color: "#bfbfbf" }}>
              {timeRangeLabel} {statistics.enYogunGuzergah?.gecisSayisi != null && `| ${formatNumberWithLocale(statistics.enYogunGuzergah.gecisSayisi)} ${t("gecis")}`}
            </div>
          </div>
        </div>
      </Spin>

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
            style={{ width: "250px" }}
            type="text"
            placeholder="Arama yap..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
            suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
          />
          <Filters onChange={handleBodyChange} onApply={(customfilter) => handleSearch({ customfilterOverride: customfilter || {} })} onTimeRangeChange={setTimeRangeLabel} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <HgsEntegrasyon onRefresh={refreshTableData} /> */}
          <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
          <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 310px)",
          borderRadius: "8px 8px 8px 8px",
        }}
      >
        <Spin spinning={loading || (!infiniteScrollEnabled && paginationLoading)}>
          <Table
            components={components}
            rowSelection={rowSelection}
            columns={filteredColumns}
            dataSource={data}
            pagination={false}
            scroll={{ y: "calc(100vh - 445px)" }}
            onScroll={handleTableScroll}
            onChange={handleTableChange}
            footer={tableFooter}
          />
        </Spin>
        <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
      </div>
    </>
  );
};

export default Yakit;
