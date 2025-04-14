import React, { useCallback, useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Select, Pagination } from "antd";
import {
  HolderOutlined,
  SearchOutlined,
  MenuOutlined,
  HomeOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { FaExclamation, FaCheck, FaTimes } from "react-icons/fa";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import AddModal from "./add/AddModal";
import OperationsInfo from "./operations/OperationsInfo";
import Filters from "./filter/Filters";
import dayjs from "dayjs";
import DurumSelect from "./components/Durum/DurumSelectbox";
import { PlakaContext } from "../../../../context/plakaSlice";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import DetailUpdate from "../vehicle-detail/DetailUpdate";

const { Text } = Typography;
const { Option } = Select;

// Add a key for localStorage
const pageSizeAraclar = "araclarTabloPageSize";
const infiniteScrollKey = "araclarTabloInfiniteScroll"; // Add new key for infinite scroll setting

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

const Yakit = ({ ayarlarData }) => {
  const { setPlaka } = useContext(PlakaContext);
  const [selectedDurum, setSelectedDurum] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Added for infinite scrolling
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(() => {
    const savedScrollMode = localStorage.getItem(infiniteScrollKey);
    return savedScrollMode !== null ? JSON.parse(savedScrollMode) : true;
  });

  // Initialize pageSize from localStorage or default to 10
  const [pageSize, setPageSize] = useState(() => {
    const savedPageSize = localStorage.getItem(pageSizeAraclar);
    // Ensure the saved value is a positive number, otherwise default to 10
    const initialSize = parseInt(savedPageSize, 10);
    return !isNaN(initialSize) && initialSize > 0 ? initialSize : 10;
  });

  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      durum: null,
      // ... Tüm default değerleriniz
    },
  });

  const { setValue, reset, watch } = methods;

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const basePageSizeOptions = ["10", "20", "50", "100"];

  const dynamicPageSizeOptions = [...basePageSizeOptions];
  if (totalCount > 0 && !basePageSizeOptions.includes(String(totalCount))) {
    dynamicPageSizeOptions.push(String(totalCount));
  }
  dynamicPageSizeOptions.sort((a, b) => Number(a) - Number(b));

  const fetchData = async (diff, targetPage, currentSize = pageSize) => {
    // Pass currentSize
    diff === 0 ? setLoading(true) : setIsLoadingMore(true);
    try {
      let currentSetPointId = 0;

      // Adjust setPointId logic based on diff and data
      if (diff > 0 && data.length > 0) {
        currentSetPointId = data[data.length - 1]?.aracId || 0;
      } else if (diff < 0 && data.length > 0) {
        currentSetPointId = data[0]?.aracId || 0;
      } else {
        // diff is 0 (initial load, search, filter change, or size change)
        currentSetPointId = 0;
      }

      const customFilters = body.filters.customfilters === "" ? null : body.filters.customfilters;

      const response = await AxiosInstance.post(
        `Vehicle/GetVehicles?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&type=${selectedDurum || 0}&pageSize=${currentSize}`, // Use currentSize
        customFilters
      );

      const total = response.data.vehicleCount;
      setTotalCount(total);

      // Only update currentPage if targetPage is provided (meaning it's a pagination change)
      if (targetPage !== undefined) {
        setCurrentPage(targetPage);
      }

      const newData = response.data.vehicleList.map((item) => ({
        ...item,
        key: item.aracId,
      }));

      // For infinite scrolling, append new data rather than replacing
      if (diff > 0 && newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
      } else if (newData.length > 0 || targetPage === 1) {
        // For first load or refresh, replace data
        setData(newData);
      } else if (newData.length === 0 && data.length > 0 && diff !== 0) {
        // If no more data, just keep current data
        console.log("Fetched page has no data, staying on current data set.");
      } else {
        // Initial load or filter resulted in no data
        message.warning("Veri bulunamadı.");
        setData([]);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      message.error("Veri çekerken bir hata oluştu.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // useEffect for initial fetch and when selectedDurum changes (pageSize change is handled separately)
  useEffect(() => {
    // Fetch initial data or when selectedDurum changes, using the current (possibly persisted) pageSize
    fetchData(0, 1, pageSize);
  }, [selectedDurum]); // Removed pageSize dependency here

  // useEffect for body (filters/search) changes
  useEffect(() => {
    // Check if body actually changed before fetching
    if (JSON.stringify(body) !== JSON.stringify(prevBodyRef.current)) {
      fetchData(0, 1, pageSize); // Fetch page 1 with current pageSize
      prevBodyRef.current = body; // Update ref after fetch starts
    }
  }, [body, pageSize]); // Include pageSize here if search/filter should respect current size

  const prevBodyRef = useRef(body);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on new search
    fetchData(0, 1, pageSize); // Pass current pageSize
  };

  // Updated handleTableChange for pagination
  const handleTableChange = (page, size) => {
    // Check if page size has changed
    if (size !== pageSize) {
      // Save the new page size to localStorage
      localStorage.setItem(pageSizeAraclar, size.toString());
      // Update the pageSize state
      setPageSize(size);
      // Fetch data for the *first page* with the *new size*
      setData([]);
      fetchData(0, 1, size); // Pass the new size directly
    } else {
      // Only the page number has changed
      const diff = page - currentPage;
      setData([]);
      setCurrentPage(page);
      fetchData(diff, page, pageSize); // Use existing pageSize
    }
  };

  const handleDurumChange = (value) => {
    setSelectedDurum(value);
    console.log("handleDurumChange seçilen durum:", value);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Find selected rows data
    const newSelectedRows = data.filter((row) => newSelectedRowKeys.includes(row.key));
    setSelectedRows(newSelectedRows);
  };

  useEffect(() => {
    const newPlakaEntries = selectedRows.map((vehicle) => ({
      id: vehicle.aracId,
      plaka: vehicle.plaka,
      lokasyonId: vehicle.lokasyonId,
      lokasyon: vehicle.lokasyon,
    }));
    setPlaka(newPlakaEntries);
  }, [selectedRows]);

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
  }, [selectedDurum]);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("aracPlaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => (
        <a
          onClick={() => {
            setSelectedVehicleId(record.aracId);
            setSelectedRows1([record]);
            setIsDetailModalOpen(true);
          }}
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },

    {
      title: t("aracTip"),
      dataIndex: "aracTip",
      key: "aracTip",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.aracTip === null) return -1;
        if (b.aracTip === null) return 1;
        return a.aracTip.localeCompare(b.aracTip);
      },
    },

    {
      title: t("marka"),
      dataIndex: "marka",
      key: "marka",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.marka === null) return -1;
        if (b.marka === null) return 1;
        return a.marka.localeCompare(b.marka);
      },
    },

    {
      title: t("model"),
      dataIndex: "model",
      key: "model",
      width: 250,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.model === null) return -1;
        if (b.model === null) return 1;
        return a.model.localeCompare(b.model);
      },
    },
    {
      title: t("aracLokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 250,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },

    {
      title: t("aracDurum"),
      dataIndex: "aracDurum",
      key: "aracDurum",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      align: "center",
      render: (text, record) => {
        let durumIcon;

        if (record.arsiv) {
          durumIcon = <Tag color="error">{t("arsiv")}</Tag>; // 1) record.arsiv true => gri arşiv
        } else if (record.aktif) {
          durumIcon = <Tag color="success">{t("aktif")}</Tag>; // 2) record.arsiv false, record.aktif true => yeşil aktif
        } else {
          durumIcon = <Tag color="warning">{t("pasif")}</Tag>; // 3) record.arsiv false, record.aktif false => sarı passif
        }
        return <div>{durumIcon}</div>;
      },
    },

    {
      title: t("guncelKm"),
      dataIndex: "guncelKm",
      key: "guncelKm",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.guncelKm === null) return -1;
        if (b.guncelKm === null) return 1;
        return a.guncelKm - b.guncelKm;
      },
    },

    {
      title: t("yil"),
      dataIndex: "yil",
      key: "yil",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.yil === null) return -1;
        if (b.yil === null) return 1;
        return a.yil - b.yil;
      },
    },

    {
      title: t("yakitTipi"),
      dataIndex: "yakitTip",
      key: "yakitTip",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.yakitTip === null) return -1;
        if (b.yakitTip === null) return 1;
        return a.yakitTip.localeCompare(b.yakitTip);
      },
    },

    {
      title: t("yakitTuketimi"),
      dataIndex: "ortalamaTuketim",
      key: "ortalamaTuketim",
      width: 100,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const { onGorulen, onGorulenMin, gerceklesen } = record;

        // Eğer gerceklesen değeri 0 veya undefined ise hiçbir şey gösterme
        if (gerceklesen === 0 || gerceklesen === undefined) {
          return null;
        }

        // Ondalıklı sayıyı 2 basamağa yuvarla ve 2 basamaklı hale getir
        const formattedGerceklesen = gerceklesen.toFixed(Number(record?.ortalamaFormat));

        let icon = null;
        if (onGorulenMin !== null && onGorulenMin !== 0) {
          if (gerceklesen < onGorulenMin) {
            icon = <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
          } else if (gerceklesen > onGorulen) {
            icon = <ArrowUpOutlined style={{ color: "red", marginLeft: 4 }} />;
          } else if (gerceklesen >= onGorulenMin && gerceklesen <= onGorulen) {
            icon = <span style={{ marginLeft: 4 }}>~</span>;
          }
        } else if (onGorulen !== null && onGorulen !== 0) {
          if (gerceklesen < onGorulen) {
            icon = <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
          }
        }

        return (
          <Tooltip title={`Gerçekleşen: ${formattedGerceklesen}`}>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              {formattedGerceklesen}
              {icon}
            </span>
          </Tooltip>
        );
      },
    },

    {
      title: t("aracGrup"),
      dataIndex: "grup",
      key: "grup",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.grup === null) return -1;
        if (b.grup === null) return 1;
        return a.grup.localeCompare(b.grup);
      },
    },

    {
      title: t("surucu"),
      dataIndex: "surucu",
      key: "surucu",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.surucu === null) return -1;
        if (b.surucu === null) return 1;
        return a.surucu.localeCompare(b.surucu);
      },
    },
    {
      title: t("departman"),
      dataIndex: "departman",
      key: "departman",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.departman === null) return -1;
        if (b.departman === null) return 1;
        return a.departman.localeCompare(b.departman);
      },
    },

    {
      title: t("muayeneTarihi"),
      dataIndex: "muayeneTarih",
      key: "muayeneTarih",
      width: 110,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.muayeneTarih === null) return -1;
        if (b.muayeneTarih === null) return 1;
        return a.muayeneTarih.localeCompare(b.muayeneTarih);
      },

      visible: true, // Varsayılan olarak açık
      render: (text) => formatDate(text),
    },

    {
      title: t("aracEgzoz"),
      dataIndex: "egzosTarih",
      key: "egzosTarih",
      ellipsis: true,
      width: 160,
      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.egzosTarih === null) return -1;
        if (b.egzosTarih === null) return 1;
        return a.egzosTarih.localeCompare(b.egzosTarih);
      },
      render: (text) => {
        if (!ayarlarData) {
          return null; // Eğer ayarlarData henüz yüklenmediyse hiçbir şey render etme
        }

        const today = dayjs(); // Sistem tarihini al
        const date = dayjs(text); // Sütundaki tarihi al
        const difference = date.diff(today, "day"); // İki tarih arasındaki gün farkı

        // 3 id'li ayarı bul
        const ayar = ayarlarData.find((item) => item.hatirlaticiAyarId === 3);

        let backgroundColor = "";

        if (ayar) {
          // Eğer ayar bulunduysa
          if (difference > ayar.uyariSuresi) {
            backgroundColor = "";
          } else if (difference <= ayar.uyariSuresi && difference >= ayar.kritikSure) {
            backgroundColor = "#31c637";
          } else if (difference < ayar.kritikSure && difference >= 0) {
            backgroundColor = "yellow";
          } else if (difference < 0) {
            backgroundColor = "#ff4646";
          }
        }

        return <div style={{ backgroundColor, padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{formatDate(text)}</div>;
      },
    },
    {
      title: t("aracVergi"),
      dataIndex: "vergiTarih",
      key: "vergiTarih",
      ellipsis: true,
      width: 160,
      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.vergiTarih === null) return -1;
        if (b.vergiTarih === null) return 1;
        return a.vergiTarih.localeCompare(b.vergiTarih);
      },
      render: (text) => {
        if (!ayarlarData) {
          return null; // Eğer ayarlarData henüz yüklenmediyse hiçbir şey render etme
        }

        const today = dayjs(); // Sistem tarihini al
        const date = dayjs(text); // Sütundaki tarihi al
        const difference = date.diff(today, "day"); // İki tarih arasındaki gün farkı

        // 3 id'li ayarı bul
        const ayar = ayarlarData.find((item) => item.hatirlaticiAyarId === 1);

        let backgroundColor = "";

        if (ayar) {
          // Eğer ayar bulunduysa
          if (difference > ayar.uyariSuresi) {
            backgroundColor = ""; // Yeşil
          } else if (difference <= ayar.uyariSuresi && difference >= ayar.kritikSure) {
            backgroundColor = "#31c637"; // Sarı
          } else if (difference < ayar.kritikSure && difference >= 0) {
            backgroundColor = "yellow"; // Kırmızı
          } else if (difference < 0) {
            backgroundColor = "#ff4646"; // Mor
          }
        }

        return <div style={{ backgroundColor, padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{formatDate(text)}</div>;
      },
    },
    {
      title: t("sozlesmeTarih"),
      dataIndex: "sozlesmeTarih",
      key: "sozlesmeTarih",
      ellipsis: true,
      width: 160,
      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.sozlesmeTarih === null) return -1;
        if (b.sozlesmeTarih === null) return 1;
        return a.sozlesmeTarih.localeCompare(b.sozlesmeTarih);
      },
      render: (text) => {
        if (!ayarlarData) {
          return null; // Eğer ayarlarData henüz yüklenmediyse hiçbir şey render etme
        }

        const today = dayjs(); // Sistem tarihini al
        const date = dayjs(text); // Sütundaki tarihi al
        const difference = date.diff(today, "day"); // İki tarih arasındaki gün farkı

        // 3 id'li ayarı bul
        const ayar = ayarlarData.find((item) => item.hatirlaticiAyarId === 8);

        let backgroundColor = "";

        if (ayar) {
          // Eğer ayar bulunduysa
          if (difference > ayar.uyariSuresi) {
            backgroundColor = ""; // Yeşil
          } else if (difference <= ayar.uyariSuresi && difference >= ayar.kritikSure) {
            backgroundColor = "#31c637"; // Sarı
          } else if (difference < ayar.kritikSure && difference >= 0) {
            backgroundColor = "yellow"; // Kırmızı
          } else if (difference < 0) {
            backgroundColor = "#ff4646"; // Mor
          }
        }

        return <div style={{ backgroundColor, padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{formatDate(text)}</div>;
      },
    },

    {
      title: t("sigortaTarih"),
      dataIndex: "sigortaBitisTarih",
      key: "sigortaBitisTarih",
      ellipsis: true,
      width: 160,
      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.sigortaBitisTarih === null) return -1;
        if (b.sigortaBitisTarih === null) return 1;
        return a.sigortaBitisTarih.localeCompare(b.sigortaBitisTarih);
      },
      render: (text) => {
        if (!ayarlarData) {
          return null; // Eğer ayarlarData henüz yüklenmediyse hiçbir şey render etme
        }

        const today = dayjs(); // Sistem tarihini al
        const date = dayjs(text); // Sütundaki tarihi al
        const difference = date.diff(today, "day"); // İki tarih arasındaki gün farkı

        // 3 id'li ayarı bul
        const ayar = ayarlarData.find((item) => item.hatirlaticiAyarId === 6);

        let backgroundColor = "";

        if (ayar) {
          // Eğer ayar bulunduysa
          if (difference > ayar.uyariSuresi) {
            backgroundColor = ""; // Yeşil
          } else if (difference <= ayar.uyariSuresi && difference >= ayar.kritikSure) {
            backgroundColor = "#31c637"; // Sarı
          } else if (difference < ayar.kritikSure && difference >= 0) {
            backgroundColor = "yellow"; // Kırmızı
          } else if (difference < 0) {
            backgroundColor = "#ff4646"; // Mor
          }
        }

        return <div style={{ backgroundColor, padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>{formatDate(text)}</div>;
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
      // `hour12` seçeneğini belirtmeyerek Intl.DateTimeFormat'ın kullanıcının sistem ayarlarına göre otomatik seçim yapmasına izin ver
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
    const savedOrder = localStorage.getItem("columnOrderAraclar");
    const savedVisibility = localStorage.getItem("columnVisibilityAraclar");
    const savedWidths = localStorage.getItem("columnWidthsAraclar");

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

    localStorage.setItem("columnOrderAraclar", JSON.stringify(order));
    localStorage.setItem("columnVisibilityAraclar", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsAraclar", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderAraclar", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityAraclar",
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
      "columnWidthsAraclar",
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
    localStorage.removeItem("columnOrderAraclar");
    localStorage.removeItem("columnVisibilityAraclar");
    localStorage.removeItem("columnWidthsAraclar");
    window.location.reload();
  };

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
    setSelectedDurum(null);
    setBody((state) => ({
      ...state,
      [type]: newBody,
    }));
    setCurrentPage(1); // Filtreleme yapıldığında sayfa numarasını 1'e ayarla
  }, []);
  // filtreleme işlemi için kullanılan useEffect son

  const keyArray = selectedRows.map((row) => row.key);

  // Handle table scroll for infinite loading
  const handleTableScroll = (e) => {
    if (!infiniteScrollEnabled) return; // Skip if infinite scroll is disabled

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Load more when user scrolls to 80% of the way down
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    if (scrollBottom <= clientHeight * 0.2 && !loading && !isLoadingMore && data.length < totalCount) {
      console.log("Loading more data...");
      fetchData(1, undefined, pageSize);
    }
  };

  // Add a footer component to show loading and total count
  const tableFooter = () => {
    if (isLoadingMore) {
      return <div style={{ textAlign: "center" }}>Daha fazla yükleniyor...</div>;
    }

    const handlePageSizeChange = (value) => {
      // Save the new page size to localStorage
      localStorage.setItem(pageSizeAraclar, value.toString());
      // Update the pageSize state
      setPageSize(value);
      // Reset data and fetch with new size
      setData([]);
      fetchData(0, 1, value);
    };

    const toggleScrollMode = () => {
      const newState = !infiniteScrollEnabled;
      setInfiniteScrollEnabled(newState);
      localStorage.setItem(infiniteScrollKey, JSON.stringify(newState));
    };

    return (
      <div style={{}}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", alignItems: "center" }}>
          <div>
            Toplam Araç: {totalCount} | Görüntülenen: {data.length}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Checkbox checked={infiniteScrollEnabled} onChange={toggleScrollMode}>
              Sonsuz Kaydırma
            </Checkbox>

            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>Kayıt:</span>
              <Select value={pageSize} onChange={handlePageSizeChange} style={{ width: 70 }} dropdownMatchSelectWidth={false}>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </div>

            {!infiniteScrollEnabled && (
              <Pagination current={currentPage} total={totalCount} pageSize={pageSize} onChange={handleTableChange} showSizeChanger={false} simple size="small" />
            )}
          </div>
        </div>
      </div>
    );
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
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              // width: "100%",
              // maxWidth: "935px",
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
            <Filters onChange={handleBodyChange} />
            <DurumSelect value={selectedDurum} onChange={handleDurumChange} />
            {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
            {/* Other toolbar components */}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <OperationsInfo ids={keyArray} selectedRowsData={selectedRows} onRefresh={refreshTableData} />
            <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
            <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
          </div>
        </div>
        {/* Table */}
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 200px)",
            borderRadius: "8px 8px 8px 8px",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          <Spin spinning={loading}>
            <Table
              components={components}
              rowSelection={rowSelection}
              columns={filteredColumns}
              dataSource={data}
              pagination={false} // Always disable pagination, we use custom pagination in footer
              scroll={{ y: "calc(100vh - 335px)" }}
              onScroll={handleTableScroll}
              footer={tableFooter}
            />
          </Spin>
        </div>
      </FormProvider>

      {/* Only render DetailUpdate when we have a selectedVehicleId */}
      {selectedVehicleId && (
        <DetailUpdate
          isOpen={isDetailModalOpen}
          selectedRows1={selectedRows1}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedVehicleId(null); // Clear the selected ID when closing
          }}
          selectedId={selectedVehicleId}
          onSuccess={() => {
            refreshTableData();
            setIsDetailModalOpen(false);
            setSelectedVehicleId(null); // Clear the selected ID after success
          }}
        />
      )}
    </>
  );
};

export default Yakit;
