import React, { useCallback, useEffect, useState, useRef, useContext, isValidElement } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Select, Pagination, Switch, Popconfirm, InputNumber, Popover } from "antd";
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
  FileExcelOutlined,
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
import Filters from "./filter/Filters";
import dayjs from "dayjs";
import { PlakaContext } from "../../../../context/plakaSlice";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import UpdateModal from "./update/UpdateModal";
import * as XLSX from "xlsx";

const { Text } = Typography;
const { Option } = Select;

function extractTextFromElement(element) {
  let text = "";
  if (typeof element === "string") {
    text = element;
  } else if (Array.isArray(element)) {
    text = element.map((child) => extractTextFromElement(child)).join("");
  } else if (isValidElement(element)) {
    text = extractTextFromElement(element.props.children);
  } else if (element !== null && element !== undefined) {
    text = element.toString();
  }
  return text;
}

const getSafeFractionDigits = (value, fallback = 2) => {
  const digits = Number(value);
  if (!Number.isFinite(digits)) {
    return fallback;
  }
  return Math.min(20, Math.max(0, Math.trunc(digits)));
};

// Add a key for localStorage
const tabloPageSize = "tabloPageSizeYakit";
const infiniteScrollKey = "tabloInfiniteScroll"; // Add new key for infinite scroll setting
const columnOrderKey = "columnOrderYakit";
const columnVisibilityKey = "columnVisibilityYakit";
const columnWidthsKey = "columnWidthsYakit";

// Utility functions for safely handling localStorage
const safeLocalStorage = {
  getItem: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  },
};

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

const Yakit = ({ customFields, seferId = null, isSefer = false, tableHeight = null, selectedRow = null }) => {
  const { setPlaka } = useContext(PlakaContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false); // New state for pagination loading
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Added for infinite scrolling
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(() => {
    const savedScrollMode = localStorage.getItem(infiniteScrollKey);
    return savedScrollMode !== null ? JSON.parse(savedScrollMode) : false;
  });
  const [xlsxLoading, setXlsxLoading] = useState(false);

  // Add this state to prevent duplicate requests
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  // Add ref to track last fetch ID for deduplication
  const lastFetchIdRef = useRef(0);
  // Add scroll timeout ref for throttling
  const scrollTimeoutRef = useRef(null);
  // Add set to track already loaded IDs to prevent duplicates
  const [loadedIds, setLoadedIds] = useState(new Set());

  // Initialize pageSize from localStorage or default to 20
  const [pageSize, setPageSize] = useState(() => {
    const savedPageSize = localStorage.getItem(tabloPageSize);
    // Ensure the saved value is a positive number, otherwise default to 20
    const initialSize = parseInt(savedPageSize, 10);
    return !isNaN(initialSize) && initialSize > 0 ? initialSize : 20;
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

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  // Add a state to track whether filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const fetchDataWithDurum = async (diff, targetPage, currentSize = pageSize) => {
    // Increment fetch ID to track this specific request
    const currentFetchId = lastFetchIdRef.current + 1;
    lastFetchIdRef.current = currentFetchId;

    // If already loading page and this is an infinite scroll request, skip
    if (isLoadingPage && diff > 0) {
      return;
    }

    diff === 0 ? setLoading(true) : setIsLoadingMore(true);
    setIsLoadingPage(true);

    try {
      let currentSetPointId = 0;

      // Adjust setPointId logic based on diff and data
      if (diff > 0 && data.length > 0) {
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0 && data.length > 0) {
        currentSetPointId = data[0]?.siraNo || 0;
      } else {
        // diff is 0 (initial load, search, filter change, or size change)
        currentSetPointId = 0;
      }

      // Properly prepare filters for API request
      // Make sure we extract custom filters from the correct property path
      const customFilters = body.filters && body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

      console.log("API request with filters:", customFilters);

      let response;
      if (isSefer) {
        response = await AxiosInstance.post(
          `Fuel/GetFuelList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&pageSize=${currentSize}&expeditionId=${seferId}`,
          customFilters
        );
      } else {
        response = await AxiosInstance.post(`Fuel/GetFuelList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&pageSize=${currentSize}`, customFilters);
      }

      // Continue with the same processing logic as fetchData
      if (currentFetchId !== lastFetchIdRef.current) {
        console.log("Ignoring outdated fetch response");
        return;
      }

      const total = response.data.total_count;
      setTotalCount(total);

      if (targetPage !== undefined) {
        setCurrentPage(targetPage);
      }

      const vehicleItems = response.data.fuel_list || [];
      const newItems = vehicleItems.map((item) => ({
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
        } else if (newItems.length === 0 && data.length > 0 && diff !== 0) {
          console.log("Fetched page has no data, staying on current data set.");
        }
      } else {
        if (newItems.length > 0) {
          setData(newItems);
        } else {
          message.warning("Veri bulunamadı.");
          if (targetPage === 1) {
            setData([]);
          }
        }
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      message.error("Veri çekerken bir hata oluştu.");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      setIsLoadingPage(false);
    }
  };

  // The original fetchData function now uses the helper
  const fetchData = async (diff, targetPage, currentSize = pageSize) => {
    return fetchDataWithDurum(diff, targetPage, currentSize, undefined);
  };

  // useEffect for initial fetch and when component mounts
  useEffect(() => {
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    // Fetch initial data using the current pageSize
    fetchData(0, 1, pageSize).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
    // We removed selectedDurum from dependencies since handleDurumChange handles that separately
  }, []); // Empty dependency array means this runs only on mount

  // Modify the useEffect for body (filters/search) changes to only fetch when filtersApplied is true
  useEffect(() => {
    // Only fetch data when filters are explicitly applied via the search button
    if (filtersApplied) {
      // Reset the flag
      setFiltersApplied(false);

      // Show loading if infinite scroll is disabled
      if (!infiniteScrollEnabled) {
        setPaginationLoading(true);
      }

      // Fetch data with the new filters
      fetchData(0, 1, pageSize).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
      prevBodyRef.current = body; // Update ref after fetch starts
    }
  }, [body, filtersApplied, pageSize, infiniteScrollEnabled]);

  const prevBodyRef = useRef(body);

  const handleSearch = () => {
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    setCurrentPage(1); // Reset to page 1 on new search
    // Eski veriyi tutuyoruz, yeni veri gelene kadar
    fetchData(0, 1, pageSize) // Pass current pageSize
      .finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
  };

  // Updated handleTableChange for pagination
  const handleTableChange = (page, size) => {
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    // Check if page size has changed
    if (size !== pageSize) {
      // Save the new page size to localStorage
      localStorage.setItem(tabloPageSize, size.toString());
      // Update the pageSize state
      setPageSize(size);
      // Fetch data for the *first page* with the *new size*
      // setData([]) çağrısını kaldırdık, eski veriyi tutuyoruz
      fetchData(0, 1, size).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    } else {
      // Only the page number has changed
      const diff = page - currentPage;
      setCurrentPage(page);
      // setData([]) çağrısını kaldırdık, eski veriyi tutuyoruz
      fetchData(diff, page, pageSize).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    }
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
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    setSelectedRowKeys([]);
    setSelectedRows([]);

    // Get current filters from body state
    const customFilters = body.filters && body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

    // Fetch data with current filters
    fetchData(0, 1, pageSize).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  }, [infiniteScrollEnabled, body, pageSize]);

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
    console.log(`Updating ${type} with:`, newBody);

    // Update the body state
    setBody((state) => ({
      ...state,
      [type]: newBody,
    }));

    // Set the flag to indicate filters have been explicitly applied
    setFiltersApplied(true);

    // Reset to page 1 when filters are applied
    setCurrentPage(1);
  }, []);
  // filtreleme işlemi için kullanılan useEffect son

  // Update localStorage when totalCount changes if user had selected totalCount option
  useEffect(() => {
    if (totalCount > 0) {
      const savedPageSize = localStorage.getItem(tabloPageSize);
      const parsedValue = parseInt(savedPageSize, 10);

      // Check if the saved value is greater than 100 (indicating user selected totalCount option)
      // and if it's different from current totalCount
      if (!isNaN(parsedValue) && parsedValue > 100 && parsedValue !== totalCount) {
        // Update localStorage with new totalCount value
        localStorage.setItem(tabloPageSize, totalCount.toString());
        // Update pageSize state
        setPageSize(totalCount);
      }
    }
  }, [totalCount]);

  // Add cleanup for the scroll timeout ref in a useEffect
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Reset columns
  const resetColumns = () => {
    safeLocalStorage.removeItem(columnOrderKey);
    safeLocalStorage.removeItem(columnVisibilityKey);
    safeLocalStorage.removeItem(columnWidthsKey);
    window.location.reload();
  };

  // Columns definition (adjust as needed)
  const getFuelTypeColor = (fuelType) => {
    const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    if (!fuelType) return "geekblue";
    let hash = 0;
    for (let i = 0; i < fuelType.length; i++) {
      hash = fuelType.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initialColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a onClick={() => onRowClick(record)}>{text}</a>
          <span style={{ fontSize: "12px", color: "gray" }}>
            {record.marka} - {record.model}
          </span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      width: 110,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.tarih === null) return -1;
        if (b.tarih === null) return 1;
        return a.tarih.localeCompare(b.tarih);
      },

      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{formatDate(text)}</span>
          <span style={{ fontSize: "12px", color: "gray" }}>{formatTime(record.saat)}</span>
        </div>
      ),
    },
    {
      title: t("yakitTipi"),
      dataIndex: "yakitTip",
      key: "yakitTip",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text) => <Tag color={getFuelTypeColor(text)}>{text}</Tag>,

      sorter: (a, b) => {
        if (a.yakitTip === null) return -1;
        if (b.yakitTip === null) return 1;
        return a.yakitTip.localeCompare(b.yakitTip);
      },
    },
    {
      title: t("alinanKm"),
      dataIndex: "sonAlinanKm",
      key: "sonAlinanKm",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div>
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"))}</span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.sonAlinanKm === null) return -1;
        if (b.sonAlinanKm === null) return 1;
        return a.sonAlinanKm - b.sonAlinanKm;
      },
    },
    {
      title: t("miktar"),
      dataIndex: "miktar",
      key: "miktar",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div className="">
          <span>
            {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
              minimumFractionDigits: Number(record?.miktarFormat),
              maximumFractionDigits: Number(record?.miktarFormat),
            })}
          </span>
          <span style={{ fontSize: "14px", color: "rgb(147 147 147)" }}>{record.birim === "LITRE" && "lt"}</span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.miktar === null) return -1;
        if (b.miktar === null) return 1;
        return a.miktar - b.miktar;
      },
    },

    {
      title: t("kmBasinaMaliyet"),
      dataIndex: "kmBasinaMaliyet",
      key: "kmBasinaMaliyet",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div className="">
          <span>
            {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
              minimumFractionDigits: Number(record?.tutarFormat),
              maximumFractionDigits: Number(record?.tutarFormat),
            })}
          </span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.kmBasinaMaliyet === null) return -1;
        if (b.kmBasinaMaliyet === null) return 1;
        return a.kmBasinaMaliyet - b.kmBasinaMaliyet;
      },
    },

    {
      title: t("farkKm"),
      dataIndex: "farkKm",
      key: "farkKm",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      /* render: (text, record) => (
        <div className="">
          <span>
            {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
              minimumFractionDigits: Number(record?.tutarFormat),
              maximumFractionDigits: Number(record?.tutarFormat),
            })}
          </span>
        </div>
      ), */
      sorter: (a, b) => {
        if (a.farkKm === null) return -1;
        if (b.farkKm === null) return 1;
        return a.farkKm - b.farkKm;
      },
    },

    {
      title: t("fiyat"),
      dataIndex: "litreFiyat",
      key: "litreFiyat",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => {
        const litreFiyatDigits = getSafeFractionDigits(record?.litreFiyatFormat ?? record?.tutarFormat);

        return (
          <div className="">
            <span>
              {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
                minimumFractionDigits: litreFiyatDigits,
                maximumFractionDigits: litreFiyatDigits,
              })}
            </span>
          </div>
        );
      },
      sorter: (a, b) => {
        if (a.litreFiyat === null) return -1;
        if (b.litreFiyat === null) return 1;
        return a.litreFiyat - b.litreFiyat;
      },
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: "tutar",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div className="">
          <span>
            {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
              minimumFractionDigits: Number(record?.tutarFormat),
              maximumFractionDigits: Number(record?.tutarFormat),
            })}
          </span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.tutar === null) return -1;
        if (b.tutar === null) return 1;
        return a.tutar - b.tutar;
      },
    },
    {
      title: t("ortalamaTuketim"),
      dataIndex: "ortalamaTuketim",
      key: "ortalamaTuketim",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const { aracOnGorulenYakit, aracOnGorulenMinYakit, tuketim } = record;

        // Eğer tuketim değeri 0 veya undefined ise hiçbir şey gösterme
        if (tuketim === 0 || tuketim === undefined) {
          return null;
        }

        // Ondalıklı sayıyı 2 basamağa yuvarla ve 2 basamaklı hale getir
        // const formattedGerceklesen = tuketim.toFixed(Number(record?.ortalamaFormat));

        const formattedGerceklesen = Number(tuketim).toLocaleString(localStorage.getItem("i18nextLng"), {
          minimumFractionDigits: Number(record?.ortalamaFormat),
          maximumFractionDigits: Number(record?.ortalamaFormat),
        });

        let icon = null;
        if (aracOnGorulenMinYakit !== null && aracOnGorulenMinYakit !== 0) {
          if (tuketim < aracOnGorulenMinYakit) {
            icon = <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
          } else if (tuketim > aracOnGorulenYakit) {
            icon = <ArrowUpOutlined style={{ color: "red", marginLeft: 4 }} />;
          } else if (tuketim >= aracOnGorulenMinYakit && tuketim <= aracOnGorulenYakit) {
            icon = <span style={{ marginLeft: 4 }}>~</span>;
          }
        } else if (aracOnGorulenYakit !== null && aracOnGorulenYakit !== 0) {
          if (tuketim < aracOnGorulenYakit) {
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
      sorter: (a, b) => {
        if (a.tuketim === null || a.tuketim === undefined) return -1;
        if (b.tuketim === null || b.tuketim === undefined) return 1;
        return a.tuketim - b.tuketim;
      },
    },
    {
      title: t("fullDepo"),
      dataIndex: "fullDepo",
      key: "fullDepo",
      width: 130,
      ellipsis: false,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        return (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Tag color={record.fullDepo ? "green" : "default"} style={{ display: "flex", alignItems: "center", width: "fit-content" }}>
              <span style={{ fontSize: "8px", marginRight: "5px", lineHeight: "1", color: record.fullDepo ? "" : "gray" }}>●</span>
              {record.fullDepo ? "Full" : "Kısmi"}
            </Tag>
          </div>
        );
      },
      sorter: (a, b) => {
        const aValue = a.fullDepo === true ? 1 : 0;
        const bValue = b.fullDepo === true ? 1 : 0;
        return bValue - aValue;
      },
    },

    {
      title: t("stoktanKullanim"),
      dataIndex: "stokKullanimi",
      key: "stokKullanimi",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        return record.stokKullanimi ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />;
      },
      sorter: (a, b) => {
        const aValue = a.stokKullanimi === true ? 1 : 0;
        const bValue = b.stokKullanimi === true ? 1 : 0;
        return bValue - aValue;
      },
    },

    {
      title: t("surucu"),
      dataIndex: "surucuAdi",
      key: "surucuAdi",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.surucuAdi === null) return -1;
        if (b.surucuAdi === null) return 1;
        return a.surucuAdi.localeCompare(b.surucuAdi);
      },
    },

    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },

    {
      title: t("istasyon"),
      dataIndex: "istasyon",
      key: "istasyon",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.istasyon === null) return -1;
        if (b.istasyon === null) return 1;
        return a.istasyon.localeCompare(b.istasyon);
      },
    },

    {
      title: t("marka"),
      dataIndex: "marka",
      key: "marka",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak gizli

      sorter: (a, b) => {
        if (a.marka === null || a.marka === undefined) return -1;
        if (b.marka === null || b.marka === undefined) return 1;
        return String(a.marka).localeCompare(String(b.marka));
      },
    },

    {
      title: t("model"),
      dataIndex: "model",
      key: "model",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak gizli

      sorter: (a, b) => {
        if (a.model === null || a.model === undefined) return -1;
        if (b.model === null || b.model === undefined) return 1;
        return String(a.model).localeCompare(String(b.model));
      },
    },

    {
      title: t("aracTip"),
      dataIndex: "aracTip",
      key: "aracTip",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak gizli

      sorter: (a, b) => {
        if (a.aracTip === null || a.aracTip === undefined) return -1;
        if (b.aracTip === null || b.aracTip === undefined) return 1;
        return String(a.aracTip).localeCompare(String(b.aracTip));
      },
    },

    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 180,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },

    {
      title: customFields.ozelAlan1 || t("ozelAlan1"),
      dataIndex: "ozelAlan1",
      key: "ozelAlan1",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan1 === null) return -1;
        if (b.ozelAlan1 === null) return 1;
        return a.ozelAlan1.localeCompare(b.ozelAlan1);
      },
    },

    {
      title: customFields.ozelAlan2 || t("ozelAlan2"),
      dataIndex: "ozelAlan2",
      key: "ozelAlan2",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan2 === null) return -1;
        if (b.ozelAlan2 === null) return 1;
        return a.ozelAlan2.localeCompare(b.ozelAlan2);
      },
    },
    {
      title: customFields.ozelAlan3 || t("ozelAlan3"),
      dataIndex: "ozelAlan3",
      key: "ozelAlan3",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan3 === null) return -1;
        if (b.ozelAlan3 === null) return 1;
        return a.ozelAlan3.localeCompare(b.ozelAlan3);
      },
    },

    {
      title: customFields.ozelAlan4 || t("ozelAlan4"),
      dataIndex: "ozelAlan4",
      key: "ozelAlan4",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan4 === null) return -1;
        if (b.ozelAlan4 === null) return 1;
        return a.ozelAlan4.localeCompare(b.ozelAlan4);
      },
    },

    {
      title: customFields.ozelAlan5 || t("ozelAlan5"),
      dataIndex: "ozelAlan5",
      key: "ozelAlan5",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan5 === null) return -1;
        if (b.ozelAlan5 === null) return 1;
        return a.ozelAlan5.localeCompare(b.ozelAlan5);
      },
    },

    {
      title: customFields.ozelAlan6 || t("ozelAlan6"),
      dataIndex: "ozelAlan6",
      key: "ozelAlan6",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan6 === null) return -1;
        if (b.ozelAlan6 === null) return 1;
        return a.ozelAlan6.localeCompare(b.ozelAlan6);
      },
    },

    {
      title: customFields.ozelAlan7 || t("ozelAlan7"),
      dataIndex: "ozelAlan7",
      key: "ozelAlan7",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan7 === null) return -1;
        if (b.ozelAlan7 === null) return 1;
        return a.ozelAlan7.localeCompare(b.ozelAlan7);
      },
    },

    {
      title: customFields.ozelAlan8 || t("ozelAlan8"),
      dataIndex: "ozelAlan8",
      key: "ozelAlan8",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan8 === null) return -1;
        if (b.ozelAlan8 === null) return 1;
        return a.ozelAlan8.localeCompare(b.ozelAlan8);
      },
    },

    {
      title: customFields.ozelAlan9 || t("ozelAlan9"),
      dataIndex: "ozelAlan9",
      key: "ozelAlan9",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan9 === null) return -1;
        if (b.ozelAlan9 === null) return 1;
        return a.ozelAlan9.localeCompare(b.ozelAlan9);
      },
    },

    {
      title: customFields.ozelAlan10 || t("ozelAlan10"),
      dataIndex: "ozelAlan10",
      key: "ozelAlan10",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan10 === null) return -1;
        if (b.ozelAlan10 === null) return 1;
        return a.ozelAlan10.localeCompare(b.ozelAlan10);
      },
    },

    {
      title: customFields.ozelAlan11 || t("ozelAlan11"),
      dataIndex: "ozelAlan11",
      key: "ozelAlan11",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan11 === null) return -1;
        if (b.ozelAlan11 === null) return 1;
        // Check if values are numbers and sort numerically if they are
        if (!isNaN(Number(a.ozelAlan11)) && !isNaN(Number(b.ozelAlan11))) {
          return Number(a.ozelAlan11) - Number(b.ozelAlan11);
        }
        // Fall back to string comparison if not numbers
        return String(a.ozelAlan11).localeCompare(String(b.ozelAlan11));
      },
    },

    {
      title: customFields.ozelAlan12 || t("ozelAlan12"),
      dataIndex: "ozelAlan12",
      key: "ozelAlan12",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ozelAlan12 === null) return -1;
        if (b.ozelAlan12 === null) return 1;
        // Check if values are numbers and sort numerically if they are
        if (!isNaN(Number(a.ozelAlan12)) && !isNaN(Number(b.ozelAlan12))) {
          return Number(a.ozelAlan12) - Number(b.ozelAlan12);
        }
        // Fall back to string comparison if not numbers
        return String(a.ozelAlan12).localeCompare(String(b.ozelAlan12));
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

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = safeLocalStorage.getItem(columnOrderKey, []);
    const savedVisibility = safeLocalStorage.getItem(columnVisibilityKey, {});
    const savedWidths = safeLocalStorage.getItem(columnWidthsKey, {});

    let order = savedOrder;
    let visibility = savedVisibility;
    let widths = savedWidths;

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

    safeLocalStorage.setItem(columnOrderKey, order);
    safeLocalStorage.setItem(columnVisibilityKey, visibility);
    safeLocalStorage.setItem(columnWidthsKey, widths);

    return order
      .map((key) => {
        const column = initialColumns.find((col) => col.key === key);
        return column ? { ...column, visible: visibility[key], width: widths[key] } : null;
      })
      .filter(Boolean);
  });

  // Toggle column visibility
  const toggleVisibility = (key, checked) => {
    const index = columns.findIndex((col) => col.key === key);
    if (index !== -1) {
      const newColumns = [...columns];
      newColumns[index].visible = checked;
      setColumns(newColumns);

      // Save the updated column visibility to localStorage
      const visibility = {};
      newColumns.forEach((col) => {
        visibility[col.key] = col.visible;
      });
      safeLocalStorage.setItem(columnVisibilityKey, visibility);
    } else {
      console.error(`Column with key ${key} does not exist.`);
    }
  };

  // Handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.key === active.id);
      const newIndex = columns.findIndex((column) => column.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((columns) => {
          const newColumns = arrayMove(columns, oldIndex, newIndex);
          // Save the updated column order to localStorage
          const order = newColumns.map((col) => col.key);
          safeLocalStorage.setItem(columnOrderKey, order);

          // Save column visibility and widths
          const visibility = {};
          const widths = {};
          newColumns.forEach((col) => {
            visibility[col.key] = col.visible;
            widths[col.key] = col.width;
          });
          safeLocalStorage.setItem(columnVisibilityKey, visibility);
          safeLocalStorage.setItem(columnWidthsKey, widths);

          return newColumns;
        });
      } else {
        console.error(`Column with key ${active.id} or ${over.id} does not exist.`);
      }
    }
  };

  // Handle column resize
  const handleResize =
    (key) =>
    (_, { size }) => {
      setColumns((prev) => {
        const newColumns = prev.map((col) => (col.key === key ? { ...col, width: size.width } : col));

        // Save the updated column widths to localStorage
        const widths = {};
        newColumns.forEach((col) => {
          widths[col.key] = col.width;
        });
        safeLocalStorage.setItem(columnWidthsKey, widths);

        return newColumns;
      });
    };

  // Update scroll handler with throttle using setTimeout
  const handleTableScroll = (e) => {
    if (!infiniteScrollEnabled) return; // Skip if infinite scroll is disabled

    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Load more when user scrolls to 80% of the way down
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    // Clear any pending scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (scrollBottom <= clientHeight * 0.2 && !loading && !isLoadingMore && !isLoadingPage && data.length < totalCount) {
      // Use setTimeout to throttle scroll events (200ms delay)
      scrollTimeoutRef.current = setTimeout(() => {
        console.log("Loading more data...");
        fetchData(1, undefined, pageSize);
      }, 200);
    }
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

  // Update the footer component to enforce data count <= totalCount
  const tableFooter = () => {
    if (isLoadingMore) {
      return <div style={{ textAlign: "center" }}>Daha fazla yükleniyor...</div>;
    }

    // Ensure displayed count never exceeds total count
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
                onChange={handleTableChange}
                showSizeChanger={false}
                // showQuickJumper
                size="small"
              />
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>Kayıt:</span>
              <Select value={pageSize} onChange={handlePageSizeChange} style={{ width: 70 }} popupMatchSelectWidth={false}>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
                {/* {totalCount > 100 && <Option value={totalCount}>{totalCount}</Option>} */}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlePageSizeChange = (value) => {
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    // Save the new page size to localStorage
    localStorage.setItem(tabloPageSize, value.toString());
    // Update the pageSize state
    setPageSize(value);
    // Reset data and fetch with new size
    fetchData(0, 1, value).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  };

  // Function to handle CSV download
  const handleDownloadXLSX = async () => {
    try {
      setXlsxLoading(true);

      // Get custom filters if they exist
      const exportCustomFilters = body.filters && body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

      const response = await AxiosInstance.post(`Fuel/GetFuelReportList?parameter=${searchTerm}`, exportCustomFilters);

      if (response?.data?.fuel_list) {
        const xlsxData = response.data.fuel_list.map((row) => {
          const xlsxRow = {};

          // Only process visible columns
          filteredColumns.forEach((col) => {
            const key = col.dataIndex;
            if (!key) return;

            let value = row[key];

            // Format special values
            if (key === "tarih") {
              value = formatDate(value);
            } else if (key === "fullDepo" || key === "stokKullanimi") {
              value = value ? "Evet" : "Hayır";
            } else if (key === "sonAlinanKm" || key === "farkKm") {
              value = value !== null ? Number(value).toLocaleString(localStorage.getItem("i18nextLng")) : "";
            } else if (key === "miktar" || key === "tutar" || key === "kmBasinaMaliyet") {
              const format = key === "miktar" ? row.miktarFormat : row.tutarFormat;
              value =
                value !== null
                  ? Number(value).toLocaleString(localStorage.getItem("i18nextLng"), {
                      minimumFractionDigits: Number(format),
                      maximumFractionDigits: Number(format),
                    })
                  : "";
              if (key === "miktar" && row.birim === "LITRE") value += " lt";
            } else if (key === "ortalamaTuketim" && row.tuketim) {
              value = Number(row.tuketim).toLocaleString(localStorage.getItem("i18nextLng"), {
                minimumFractionDigits: Number(row.ortalamaFormat),
                maximumFractionDigits: Number(row.ortalamaFormat),
              });
            }

            // Extract title text from column title (which might be a React element)
            xlsxRow[extractTextFromElement(col.title)] = value !== null && value !== undefined ? value.toString() : "";
          });

          return xlsxRow;
        });

        // Create and download Excel file
        const worksheet = XLSX.utils.json_to_sheet(xlsxData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Yakıt Listesi");

        // Set column widths
        worksheet["!cols"] = filteredColumns
          .filter((col) => col.dataIndex)
          .map((col) => ({
            wpx: col.width ? col.width * 0.8 : 100,
          }));

        // Download the file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Yakıt_Listesi.xlsx";
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setXlsxLoading(false);
      } else {
        console.error("API yanıtı beklenen formatta değil");
        message.error("Excel indirme işlemi başarısız oldu: API yanıtı beklenen formatta değil");
        setXlsxLoading(false);
      }
    } catch (error) {
      setXlsxLoading(false);
      console.error("XLSX indirme hatası:", error);
      message.error(navigator.onLine ? "Excel indirme hatası: " + (error.message || "Bilinmeyen hata") : "Internet Bağlantısı Mevcut Değil.");
    }
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
        {isSefer ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "10px",
              padding: "0px 10px 0 10px",
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
                style={{ width: "130px" }}
                type="text"
                placeholder="Arama yap..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
              />
              {/* <Filters onChange={handleBodyChange} /> */}
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* <Button style={{ display: "flex", alignItems: "center" }} onClick={handleDownloadXLSX} loading={xlsxLoading} icon={<FileExcelOutlined />}>
                İndir
              </Button> */}
              <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
              <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} seferId={seferId} selectedRow={selectedRow} />
            </div>
          </div>
        ) : (
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
                style={{ width: "130px" }}
                type="text"
                placeholder="Arama yap..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
              />
              <Filters onChange={handleBodyChange} />
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button style={{ display: "flex", alignItems: "center" }} onClick={handleDownloadXLSX} loading={xlsxLoading} icon={<FileExcelOutlined />}>
                İndir
              </Button>
              <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
              <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
            </div>
          </div>
        )}
        {/* Table */}
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: isSefer ? undefined : "calc(100vh - 200px)",
            borderRadius: "8px 8px 8px 8px",
            // filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          <Spin spinning={loading || (!infiniteScrollEnabled && paginationLoading)}>
            <Table
              components={components}
              rowSelection={rowSelection}
              columns={filteredColumns}
              dataSource={data}
              pagination={false}
              scroll={{ y: tableHeight ? tableHeight : "calc(100vh - 335px)" }}
              onScroll={handleTableScroll}
              footer={tableFooter}
            />
          </Spin>
        </div>
      </FormProvider>

      {/* Only render DetailUpdate when we have a selectedVehicleId */}
      <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
    </>
  );
};

export default Yakit;
