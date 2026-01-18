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
import { FcImageFile } from "react-icons/fc";
import { VscAttach } from "react-icons/vsc";
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

// Add a key for localStorage
const pageSizeAraclar = "araclarTabloPageSize";
const infiniteScrollKey = "tabloInfiniteScroll"; // Add new key for infinite scroll setting
const columnOrderKey = "columnOrderAraclar";
const columnVisibilityKey = "columnVisibilityAraclar";
const columnWidthsKey = "columnWidthsAraclar";
const visitedRowsSessionKey = "araclarVisitedRows";

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

// Utility functions for safely handling sessionStorage
const safeSessionStorage = {
  getItem: (key, defaultValue) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from sessionStorage:`, error);
      return defaultValue;
    }
  },
  setItem: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in sessionStorage:`, error);
      return false;
    }
  },
  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from sessionStorage:`, error);
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

// Add this component before the Yakit component
const KmCell = ({ record, text, refreshTableData }) => {
  const [inputValue, setInputValue] = useState(text || 0);
  const [error, setError] = useState(null);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  // Get locale from localStorage
  const getLocale = () => {
    try {
      const locale = localStorage.getItem("i18nextLng") || "tr";
      return locale;
    } catch (error) {
      console.error("Error getting locale from localStorage:", error);
      return "tr"; // Default to Turkish if there's an error
    }
  };

  // Format number based on locale
  const formatNumber = (value) => {
    if (value === null || value === undefined) return "";

    try {
      const locale = getLocale();
      return new Intl.NumberFormat(locale).format(value);
    } catch (error) {
      console.error("Error formatting number:", error);
      return value.toString();
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    // Remove validation during input
    setError(null);
  };

  const handleConfirm = async () => {
    // Validate input value when confirming
    if (inputValue === null || inputValue < (text || 0)) {
      message.error("Yeni kilometre değeri mevcut değerden küçük olamaz!");
      setError("Yeni kilometre değeri mevcut değerden küçük olamaz!");
      return Promise.reject(); // Reject the promise to prevent Popconfirm from closing
    }

    try {
      const payload = [
        {
          kmAracId: record.aracId,
          tarih: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          saat: dayjs().format("HH:mm"),
          eskiKm: text || 0,
          yeniKm: inputValue,
          kaynak: "GÜNCELLEME",
          lokasyonId: record.lokasyonId || 0,
          surucuId: record.surucuId || 0,
        },
      ];

      await AxiosInstance.post("KmLog/AddKmLog", payload);
      message.success("Kilometre başarıyla güncellendi");

      // Pass true to indicate that this is a KM update and should preserve filters
      refreshTableData(true);

      setPopconfirmOpen(false);
      return Promise.resolve(); // Explicitly resolve the promise when successful
    } catch (error) {
      console.error("Kilometre güncelleme hatası:", error);
      message.error("Kilometre güncellenirken bir hata oluştu");
      return Promise.reject(); // Reject the promise to prevent Popconfirm from closing on API error
    }
  };

  // Handle popconfirm visibility
  const handleOpenChange = (visible) => {
    // When opening, reset input value to current value
    if (visible) {
      setInputValue(text || 0);
      setError(null);
    }
    setPopconfirmOpen(visible);
  };

  // Format date for the popover
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = dayjs(dateString);
      return date.format("DD.MM.YYYY");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Popover content showing last update date
  const popoverContent = (
    <div>
      <p>
        Son Güncelleme: {formatDate(record.sonKmGuncellemeTarih)}
        {record.kmLogSaat ? ` ${record.kmLogSaat}` : ""}
      </p>
    </div>
  );

  return (
    <Popconfirm
      title="Kilometre Güncelleme"
      description={
        <div>
          <InputNumber value={inputValue} onChange={handleInputChange} style={{ width: "100%" }} status={error ? "error" : ""} />
          {error && <div style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>{error}</div>}
        </div>
      }
      onConfirm={handleConfirm}
      okText="Tamam"
      cancelText="İptal"
      okButtonProps={{ disabled: false }} // Allow clicking even with error
      trigger="click"
      open={popconfirmOpen}
      onOpenChange={handleOpenChange}
    >
      <Popover content={popoverContent} title="Kilometre Bilgisi" trigger="hover">
        <div style={{ cursor: "pointer", borderBottom: "1px dashed #1890ff", display: "inline-block" }}>{formatNumber(text)}</div>
      </Popover>
    </Popconfirm>
  );
};

const Yakit = ({ ayarlarData, customFields }) => {
  const { setPlaka } = useContext(PlakaContext);
  const [selectedDurum, setSelectedDurum] = useState(null);
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
  const [columnSearchTerm, setColumnSearchTerm] = useState("");
  const [columnSortOrder, setColumnSortOrder] = useState("asc"); // "asc" or "desc"

  console.log("arama işlemi", searchTerm);

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
    const savedPageSize = localStorage.getItem(pageSizeAraclar);
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
  const [selectedRows1, setSelectedRows1] = useState([]);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  // Add a state to track whether filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [openedRowIds, setOpenedRowIds] = useState(() => new Set(safeSessionStorage.getItem(visitedRowsSessionKey, [])));

  // Fixed page size options
  const pageSizeOptions = [20, 50, 100];

  const fetchDataWithDurum = async (diff, targetPage, currentSize = pageSize, durumValue, forcedCustomFilters = null, searchParam = searchTerm) => {
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
        currentSetPointId = data[data.length - 1]?.aracId || 0;
      } else if (diff < 0 && data.length > 0) {
        currentSetPointId = data[0]?.aracId || 0;
      } else {
        // diff is 0 (initial load, search, filter change, or size change)
        currentSetPointId = 0;
      }

      // If forcedCustomFilters is provided, use it directly
      // Otherwise, check if customfilters exists and is not empty in the body state
      const customFilters =
        forcedCustomFilters !== null ? forcedCustomFilters : body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

      // Use durumValue from filters if available, otherwise use the passed value or selectedDurum
      // Ensure we default to 0 if all values are null or undefined
      let durumParam = 0; // Default to 0

      if (body.filters.durumValue !== undefined) {
        durumParam = body.filters.durumValue;
      } else if (durumValue !== undefined) {
        // If durumValue is explicitly passed (even if null), use it or default to 0
        durumParam = durumValue !== null ? durumValue : 0;
      } else if (selectedDurum !== null) {
        durumParam = selectedDurum;
      }
      // If we reach here, durumParam remains 0

      // Final check to ensure durumParam is never undefined or null
      durumParam = durumParam === undefined || durumParam === null ? 0 : durumParam;

      // Debug log to show what filters are being passed to API
      console.log("Calling API with customFilters:", customFilters);

      const response = await AxiosInstance.post(
        `Vehicle/GetVehicles?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchParam}&type=${durumParam}&pageSize=${currentSize}`,
        customFilters
      );

      // Continue with the same processing logic as fetchData
      if (currentFetchId !== lastFetchIdRef.current) {
        console.log("Ignoring outdated fetch response");
        return;
      }

      const total = response.data.vehicleCount;
      setTotalCount(total);

      if (targetPage !== undefined) {
        setCurrentPage(targetPage);
      }

      const vehicleItems = response.data.vehicleList || [];
      const newItems = vehicleItems.map((item) => ({
        ...item,
        key: item.aracId,
      }));

      if (infiniteScrollEnabled) {
        if (diff > 0 && newItems.length > 0) {
          const existingIds = new Set(data.map((item) => item.aracId));
          const uniqueNewItems = newItems.filter((item) => !existingIds.has(item.aracId));

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
  const fetchData = async (diff, targetPage, currentSize = pageSize, forcedCustomFilters = null) => {
    return fetchDataWithDurum(diff, targetPage, currentSize, undefined, forcedCustomFilters);
  };

  // useEffect for initial fetch and when component mounts
  useEffect(() => {
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    // For initial load, no custom filters are needed
    const customFilters = null;

    // Fetch initial data using the current pageSize
    fetchData(0, 1, pageSize, customFilters).finally(() => {
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

      // Get custom filters from body state
      const customFilters = body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

      // Fetch data with the new filters
      fetchData(0, 1, pageSize, customFilters).finally(() => {
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

    // Get custom filters from body state
    const customFilters = body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

    setCurrentPage(1); // Reset to page 1 on new search
    // Eski veriyi tutuyoruz, yeni veri gelene kadar
    fetchData(0, 1, pageSize, customFilters, searchTerm).finally(() => {
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

    // Get custom filters from body state
    const customFilters = body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

    // Check if page size has changed
    if (size !== pageSize) {
      // Save the new page size to localStorage
      localStorage.setItem(pageSizeAraclar, size.toString());
      // Update the pageSize state
      setPageSize(size);
      // Fetch data for the *first page* with the *new size*
      // setData([]) çağrısını kaldırdık, eski veriyi tutuyoruz
      fetchData(0, 1, size, customFilters, searchTerm).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    } else {
      // Only the page number has changed
      const diff = page - currentPage;
      setCurrentPage(page);
      // setData([]) çağrısını kaldırdık, eski veriyi tutuyoruz
      fetchData(diff, page, pageSize, customFilters, searchTerm).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    }
  };

  const handleDurumChange = (value) => {
    // If value is undefined (when dropdown is cleared), set it to 0 for API call
    let apiValue = value === undefined || value === null ? 0 : value;

    // Ensure apiValue is always a number
    apiValue = Number(apiValue);

    // Update the selectedDurum state - keep as null for UI purposes when cleared
    setSelectedDurum(value);

    // Get custom filters from body state
    const customFilters = body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

    // Immediately trigger API call when durum changes
    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    // Reset to page 1 when durum filter changes
    setCurrentPage(1);

    // Fetch data with the new durum value and current filters
    fetchDataWithDurum(0, 1, pageSize, apiValue, customFilters, searchTerm).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
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

  useEffect(() => {
    safeSessionStorage.setItem(visitedRowsSessionKey, Array.from(openedRowIds));
  }, [openedRowIds]);

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onRowClick = (record) => {
    setDrawer({ visible: true, data: record });
  };

  const markRowVisited = useCallback((record) => {
    const id = record?.aracId;
    if (!id) {
      return;
    }

    setOpenedRowIds((prev) => {
      if (prev.has(id)) {
        return prev;
      }
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  }, []);

  const handleVehicleOpen = useCallback(
    (record) => {
      if (!record) return;
      markRowVisited(record);
      setSelectedVehicleId(record.aracId);
      setSelectedRows1([record]);
      setIsDetailModalOpen(true);
    },
    [markRowVisited, setIsDetailModalOpen, setSelectedRows1, setSelectedVehicleId]
  );

  const refreshTableData = useCallback(
    (isKmUpdate = false) => {
      // Show loading if infinite scroll is disabled
      if (!infiniteScrollEnabled) {
        setPaginationLoading(true);
      }

      setSelectedRowKeys([]);
      setSelectedRows([]);

      // No need to reset selectedDurum here, as it should be preserved during refresh

      // Get current filters from body state - for KM updates, force check for current active filters
      let customFilters = null;

      if (isKmUpdate) {
        // For KM updates, we need to manually check all sources to ensure we get the latest filters

        // First check if we have active filters in the body state
        if (body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0) {
          customFilters = body.filters.customfilters;
        }

        // If there are no filters in body, check if we previously had filters applied
        if (!customFilters && prevBodyRef.current?.filters?.customfilters && Object.keys(prevBodyRef.current.filters.customfilters).length > 0) {
          customFilters = prevBodyRef.current.filters.customfilters;
        }
      } else {
        // Normal refresh - use standard logic
        customFilters = body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;
      }

      // Log to confirm filters are being used
      console.log("Refreshing table with filters:", customFilters, "isKmUpdate:", isKmUpdate);

      // Get current durumParam value
      let durumParam = 0;
      if (selectedDurum !== null && selectedDurum !== undefined) {
        durumParam = selectedDurum;
      } else if (body.filters.durumValue !== undefined) {
        durumParam = body.filters.durumValue;
      }
      durumParam = durumParam === undefined || durumParam === null ? 0 : durumParam;

      // Eski veriyi tutuyoruz, yeni veri gelene kadar
      fetchDataWithDurum(0, 1, pageSize, durumParam, customFilters, searchTerm).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    },
    [infiniteScrollEnabled, body, selectedDurum, pageSize, searchTerm] // searchTerm eklendi
  );

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
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

  const keyArray = selectedRows.map((row) => row.key);

  // Update localStorage when totalCount changes if user had selected totalCount option
  useEffect(() => {
    if (totalCount > 0) {
      const savedPageSize = localStorage.getItem(pageSizeAraclar);
      const parsedValue = parseInt(savedPageSize, 10);

      // Check if the saved value is greater than 100 (indicating user selected totalCount option)
      // and if it's different from current totalCount
      if (!isNaN(parsedValue) && parsedValue > 100 && parsedValue !== totalCount) {
        // Update localStorage with new totalCount value
        localStorage.setItem(pageSizeAraclar, totalCount.toString());
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
            handleVehicleOpen(record);
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
      title: <FcImageFile />,
      dataIndex: "resimVar",
      key: "resimVar",
      width: 80,
      ellipsis: true,
      visible: false,
      align: "center",
      render: (value) =>
        value ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <FcImageFile size={24} />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }} />
        ),
    },

    {
      title: <VscAttach />,
      dataIndex: "dosyaVar",
      key: "dosyaVar",
      width: 80,
      ellipsis: true,
      visible: false,
      align: "center",
      render: (value) =>
        value ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <VscAttach size={24} />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }} />
        ),
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
      title: t("tumLokasyon"),
      dataIndex: "lokasyonTumYol",
      key: "lokasyonTumYol",
      width: 250,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.lokasyonTumYol === null) return -1;
        if (b.lokasyonTumYol === null) return 1;
        return a.lokasyonTumYol.localeCompare(b.lokasyonTumYol);
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
      render: (text, record) => <KmCell record={record} text={text} refreshTableData={refreshTableData} />,
      sorter: (a, b) => {
        if (a.guncelKm === null) return -1;
        if (b.guncelKm === null) return 1;
        return a.guncelKm - b.guncelKm;
      },
    },

    {
      title: t("modelYili"),
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
      render: (text) => {
        if (!ayarlarData) {
          return null; // Eğer ayarlarData henüz yüklenmediyse hiçbir şey render etme
        }

        const today = dayjs(); // Sistem tarihini al
        const date = dayjs(text); // Sütundaki tarihi al
        const difference = date.diff(today, "day"); // İki tarih arasındaki gün farkı

        // 3 id'li ayarı bul
        const ayar = ayarlarData.find((item) => item.hatirlaticiAyarId === 7);

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

    {
      title: t("anahtarKodu"),
      dataIndex: "anahtarKodu",
      key: "anahtarKodu",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.anahtarKodu === null) return -1;
        if (b.anahtarKodu === null) return 1;
        return a.anahtarKodu.localeCompare(b.anahtarKodu);
      },
    },

    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 200,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },

    {
      title: t("hgsNo"),
      dataIndex: "hgsNo",
      key: "hgsNo",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.hgsNo === null) return -1;
        if (b.hgsNo === null) return 1;
        return a.hgsNo.localeCompare(b.hgsNo);
      },
    },

    {
      title: t("ogsNo"),
      dataIndex: "ogsNo",
      key: "ogsNo",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ogsNo === null) return -1;
        if (b.ogsNo === null) return 1;
        return a.ogsNo.localeCompare(b.ogsNo);
      },
    },

    {
      title: t("sasiNo"),
      dataIndex: "sasiNo",
      key: "sasiNo",
      width: 150,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.sasiNo === null) return -1;
        if (b.sasiNo === null) return 1;
        return a.sasiNo.localeCompare(b.sasiNo);
      },
    },

    {
      title: t("motorNo"),
      dataIndex: "motorNo",
      key: "motorNo",
      width: 150,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.motorNo === null) return -1;
        if (b.motorNo === null) return 1;
        return a.motorNo.localeCompare(b.motorNo);
      },
    },

    {
      title: t("ruhsatSahibi"),
      dataIndex: "ruhsatSahibi",
      key: "ruhsatSahibi",
      width: 150,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.ruhsatSahibi === null) return -1;
        if (b.ruhsatSahibi === null) return 1;
        return a.ruhsatSahibi.localeCompare(b.ruhsatSahibi);
      },
    },

    {
      title: t("tts"),
      dataIndex: "tts",
      key: "tts",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.tts === null) return -1;
        if (b.tts === null) return 1;
        return a.tts.localeCompare(b.tts);
      },
    },

    {
      title: t("utts"),
      dataIndex: "utts",
      key: "utts",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.utts === null) return -1;
        if (b.utts === null) return 1;
        return a.utts.localeCompare(b.utts);
      },
    },

    {
      title: t("kiralamaYeri"),
      dataIndex: "kiralamaYeri",
      key: "kiralamaYeri",
      width: 150,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.kiralamaYeri === null) return -1;
        if (b.kiralamaYeri === null) return 1;
        return a.kiralamaYeri.localeCompare(b.kiralamaYeri);
      },
    },

    {
      title: t("vitesTipi"),
      dataIndex: "vitesTipi",
      key: "vitesTipi",
      width: 150,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.vitesTipi === null) return -1;
        if (b.vitesTipi === null) return 1;
        return a.vitesTipi.localeCompare(b.vitesTipi);
      },
    },

    {
      title: t("yedekAnahtar"),
      dataIndex: "yedekAnahtar",
      key: "yedekAnahtar",
      width: 150,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.yedekAnahtar === null) return -1;
        if (b.yedekAnahtar === null) return 1;
        return a.yedekAnahtar.localeCompare(b.yedekAnahtar);
      },
    },

    {
      title: t("aracMulkiyet"),
      dataIndex: "aracMulkiyet",
      key: "aracMulkiyet",
      width: 150,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.aracMulkiyet === null) return -1;
        if (b.aracMulkiyet === null) return 1;
        return a.aracMulkiyet.localeCompare(b.aracMulkiyet);
      },
    },

    {
      title: t("durum"),
      dataIndex: "durum",
      key: "durum",
      width: 150,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.durum === null) return -1;
        if (b.durum === null) return 1;
        return a.durum.localeCompare(b.durum);
      },
    },

    {
      title: t("kullanimAmaci"),
      dataIndex: "kullanimAmaci",
      key: "kullanimAmaci",
      width: 150,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.kullanimAmaci === null) return -1;
        if (b.kullanimAmaci === null) return 1;
        return a.kullanimAmaci.localeCompare(b.kullanimAmaci);
      },
    },

    {
      title: t("krediTutar"),
      dataIndex: "krediTutar",
      key: "krediTutar",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.krediTutar === null) return -1;
        if (b.krediTutar === null) return 1;
        // Check if values are numbers and sort numerically if they are
        if (!isNaN(Number(a.krediTutar)) && !isNaN(Number(b.krediTutar))) {
          return Number(a.krediTutar) - Number(b.krediTutar);
        }
        // Fall back to string comparison if not numbers
        return String(a.krediTutar).localeCompare(String(b.krediTutar));
      },
    },

    {
      title: t("takografTarih"),
      dataIndex: "takografTarih",
      key: "takografTarih",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text) => formatDate(text),
      sorter: (a, b) => {
        if (a.takografTarih === null) return -1;
        if (b.takografTarih === null) return 1;
        return a.takografTarih.localeCompare(b.takografTarih);
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
            Toplam Araç: {totalCount} | Görüntülenen: {displayCount}
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
    localStorage.setItem(pageSizeAraclar, value.toString());
    // Update the pageSize state
    setPageSize(value);
    // Reset data and fetch with new size
    fetchData(0, 1, value).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  };

  // Function to clear the selectedDurum state
  const handleClearDurum = () => {
    setSelectedDurum(null);

    // Update the body state to remove any previously set durumValue
    setBody((prevBody) => ({
      ...prevBody,
      filters: {
        ...prevBody.filters,
        durumValue: undefined, // Set to undefined so it will use the default 0 in the API call
      },
    }));

    // Set the flag to indicate filters have been explicitly applied
    setFiltersApplied(true);
  };

  // Filter and sort columns for the modal
  const getFilteredAndSortedColumns = () => {
    let filteredCols = initialColumns;

    // Filter by search term
    if (columnSearchTerm) {
      filteredCols = filteredCols.filter((col) => extractTextFromElement(col.title).toLowerCase().includes(columnSearchTerm.toLowerCase()));
    }

    // Sort alphabetically
    filteredCols = [...filteredCols].sort((a, b) => {
      const titleA = extractTextFromElement(a.title).toLowerCase();
      const titleB = extractTextFromElement(b.title).toLowerCase();

      if (columnSortOrder === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    return filteredCols;
  };

  // Function to handle CSV download
  const handleDownloadXLSX = async () => {
    try {
      // İndirme işlemi başlıyor
      setXlsxLoading(true);

      // API'den verileri çekiyoruz
      // Check if customfilters exists and is not empty
      const customFilters = body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : null;

      // Use durumValue from filters if available, otherwise use selectedDurum
      // Ensure we default to 0 if all values are null or undefined
      let durumParam = 0; // Default to 0

      // Önce selectedDurum'u kontrol et - bu kullanıcının seçtiği en güncel değerdir
      if (selectedDurum !== null && selectedDurum !== undefined) {
        durumParam = selectedDurum;
      }
      // Eğer selectedDurum yoksa, body.filters.durumValue'yi kontrol et
      else if (body.filters.durumValue !== undefined) {
        durumParam = body.filters.durumValue;
      }

      // Final check to ensure durumParam is never undefined or null
      durumParam = durumParam === undefined || durumParam === null ? 0 : durumParam;

      console.log("Excel indirme için kullanılan durum değeri:", durumParam);

      const response = await AxiosInstance.post(`Vehicle/GetVehiclesListReport?parameter=${searchTerm}&type=${durumParam}`, customFilters);
      if (response && response.data) {
        // Verileri işliyoruz
        const xlsxData = response.data.vehicleList.map((row) => {
          let xlsxRow = {};
          filteredColumns.forEach((col) => {
            const key = col.dataIndex;
            if (key) {
              let value = row[key];

              // Özel durumları ele alıyoruz
              if (col.render) {
                if (key === "muayeneTarih" || key === "egzosTarih" || key === "vergiTarih" || key === "sozlesmeTarih" || key === "sigortaBitisTarih" || key.endsWith("Tarih")) {
                  value = formatDate(value);
                } else if (key === "guncelKm") {
                  // Kilometre değeri için özel işlem
                  value = value !== null && value !== undefined ? value.toString() : "";
                } else if (key === "aracDurum") {
                  // Durum için özel işlem
                  if (row.arsiv) {
                    value = "Arşiv";
                  } else if (row.aktif) {
                    value = "Aktif";
                  } else {
                    value = "Pasif";
                  }
                } else {
                  // Diğer sütunlar için
                  try {
                    value = extractTextFromElement(value);
                  } catch (e) {
                    value = value !== null && value !== undefined ? value.toString() : "";
                  }
                }
              }

              xlsxRow[extractTextFromElement(col.title)] = value;
            }
          });
          return xlsxRow;
        });

        // XLSX dosyasını oluşturuyoruz
        const worksheet = XLSX.utils.json_to_sheet(xlsxData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Araçlar");

        // Sütun genişliklerini ayarlıyoruz
        const headers = filteredColumns
          .map((col) => {
            let label = extractTextFromElement(col.title);
            return {
              label: label,
              key: col.dataIndex,
              width: col.width, // Tablo sütun genişliği
            };
          })
          .filter((col) => col.key); // Geçerli dataIndex'e sahip sütunları dahil ediyoruz

        // Genişlikleri ölçeklendirme faktörü ile ayarlıyoruz
        const scalingFactor = 0.8; // Gerektiği gibi ayarlayın

        worksheet["!cols"] = headers.map((header) => ({
          wpx: header.width ? header.width * scalingFactor : 100, // Tablo sütun genişliğini kullanıyoruz
        }));

        // İndirme işlemini başlatıyoruz
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "Araçlar_Listesi.xlsx");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // İndirme işlemi bitti
        setXlsxLoading(false);
      } else {
        console.error("API yanıtı beklenen formatta değil");
        message.error("Excel indirme işlemi başarısız oldu: API yanıtı beklenen formatta değil");
        setXlsxLoading(false);
      }
    } catch (error) {
      setXlsxLoading(false);
      console.error("XLSX indirme hatası:", error);
      if (navigator.onLine) {
        message.error("Excel indirme hatası: " + (error.message || "Bilinmeyen hata"));
      } else {
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
    }
  };

  return (
    <>
      {/* Modal for managing columns */}
      <Modal
        title="Sütunları Yönet"
        centered
        width={800}
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        afterClose={() => {
          setColumnSearchTerm("");
          setColumnSortOrder("asc");
        }}
      >
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

            {/* Search and Sort Controls */}
            <div style={{ marginBottom: "15px", display: "flex", gap: "8px", alignItems: "center" }}>
              <Input
                placeholder="Sütun ara..."
                value={columnSearchTerm}
                onChange={(e) => setColumnSearchTerm(e.target.value)}
                style={{ flex: 1 }}
                prefix={<SearchOutlined />}
                allowClear
              />
              <Button
                size="small"
                onClick={() => setColumnSortOrder(columnSortOrder === "asc" ? "desc" : "asc")}
                icon={columnSortOrder === "asc" ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                title={columnSortOrder === "asc" ? "A-Z Sıralama" : "Z-A Sıralama"}
              />
            </div>

            <div style={{ height: "350px", overflow: "auto" }}>
              {getFilteredAndSortedColumns().map((col) => (
                <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }} key={col.key}>
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
              style={{ width: "130px" }}
              type="text"
              placeholder="Arama yap..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
            />
            <Filters onChange={handleBodyChange} durumValue={selectedDurum} onClearDurum={handleClearDurum} />
            {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
            {/* Other toolbar components */}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <DurumSelect value={selectedDurum} onChange={handleDurumChange} inputWidth="100px" dropdownWidth="250px" />
            <Button style={{ display: "flex", alignItems: "center" }} onClick={handleDownloadXLSX} loading={xlsxLoading} icon={<FileExcelOutlined />}>
              İndir
            </Button>
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
              rowClassName={(record) => (openedRowIds.has(record.aracId) ? "visited-row" : "")}
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
            setSelectedVehicleId(null);
          }}
          selectedId={selectedVehicleId}
          onSuccess={() => {
            refreshTableData();
            setIsDetailModalOpen(false);
            setSelectedVehicleId(null);
          }}
        />
      )}
    </>
  );
};

export default Yakit;
