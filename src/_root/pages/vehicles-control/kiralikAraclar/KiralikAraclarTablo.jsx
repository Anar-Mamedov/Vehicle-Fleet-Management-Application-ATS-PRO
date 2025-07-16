import React, { useCallback, useEffect, useState, useRef, useContext, isValidElement } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Select, Pagination, Switch, Popconfirm, InputNumber, Popover, Progress } from "antd";
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
import AddModal from "./AddModal";
import Filters from "./filter/Filters";
import dayjs from "dayjs";
import { PlakaContext } from "../../../../context/plakaSlice";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import UpdateModal from "./UpdateModal";
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
const tabloPageSize = "tabloPageSizeSigorta";
const infiniteScrollKey = "tabloInfiniteScroll"; // Add new key for infinite scroll setting
const columnOrderKey = "columnOrderSigorta";
const columnVisibilityKey = "columnVisibilitySigorta";
const columnWidthsKey = "columnWidthsSigorta";

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

const KiralikAraclarTablo = ({ customFields }) => {
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
    filters: {
      customfilters: {
        status: 1,
      },
    },
  });

  // Add a state to track whether filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(true);

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
      let customFilters = body.filters && body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : { status: 1 }; // Default to status: 1 if no filters

      // Ensure status is always included if not already present
      if (!Object.prototype.hasOwnProperty.call(customFilters, "status")) {
        customFilters = { ...customFilters, status: 1 };
      }

      const response = await AxiosInstance.post(
        `RentalVehicle/GetRentalVehiclesList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&pageSize=${currentSize}`,
        customFilters
      );

      // Continue with the same processing logic as fetchData
      if (currentFetchId !== lastFetchIdRef.current) {
        console.log("Ignoring outdated fetch response");
        return;
      }

      const total = response.data.recordCount;
      setTotalCount(total);

      if (targetPage !== undefined) {
        setCurrentPage(targetPage);
      }

      const vehicleItems = response.data.list || [];
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

    // Set filtersApplied to true to ensure initial filters are applied
    setFiltersApplied(true);

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

  // Ensure localStorage has valid page size value
  useEffect(() => {
    const savedPageSize = localStorage.getItem(tabloPageSize);
    const parsedValue = parseInt(savedPageSize, 10);

    // If the value in localStorage is invalid, reset it to 20
    if (isNaN(parsedValue) || ![20, 50, 100].includes(parsedValue)) {
      localStorage.setItem(tabloPageSize, "20");
      setPageSize(20);
    }
  }, []);

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
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      /*render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,*/
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },

    {
      title: t("kiraBaslangic"),
      dataIndex: "kiraBaslangic",
      key: "kiraBaslangic",
      width: 110,
      ellipsis: true,
      visible: true,
      render: (value) => value ? dayjs(value).format("DD.MM.YYYY") : "-",
      sorter: (a, b) => {
        const dateA = a.kiraBaslangic ? new Date(a.kiraBaslangic) : null;
        const dateB = b.kiraBaslangic ? new Date(b.kiraBaslangic) : null;
        if (!dateA) return -1;
        if (!dateB) return 1;
        return dateA.getTime() - dateB.getTime();
      },
    },

    {
      title: t("krediIlkOdTarih"),
      dataIndex: "krediIlkOdTarih",
      key: "krediIlkOdTarih",
      width: 110,
      ellipsis: true,
      visible: true,
      render: (value) => value ? dayjs(value).format("DD.MM.YYYY") : "-",
      sorter: (a, b) => {
        const dateA = a.krediIlkOdTarih ? new Date(a.krediIlkOdTarih) : null;
        const dateB = b.krediIlkOdTarih ? new Date(b.krediIlkOdTarih) : null;
        if (!dateA) return -1;
        if (!dateB) return 1;
        return dateA.getTime() - dateB.getTime();
      },
    },

    {
      title: t("krediTutar"),
      dataIndex: "krediTutar",
      key: "krediTutar",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.krediTutar === null) return -1;
        if (b.krediTutar === null) return 1;
        // Convert to numbers for numeric comparison
        const numA = parseFloat(a.krediTutar);
        const numB = parseFloat(b.krediTutar);
        return numA - numB;
      },
    },

    {
      title: t("krediAylikOdeme"),
      dataIndex: "krediAylikOdeme",
      key: "krediAylikOdeme",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.krediAylikOdeme === null) return -1;
        if (b.krediAylikOdeme === null) return 1;
        // Convert to numbers for numeric comparison
        const numA = parseFloat(a.krediAylikOdeme);
        const numB = parseFloat(b.krediAylikOdeme);
        return numA - numB;
      },
    },

    {
      title: t("krediSure"),
      dataIndex: "krediSure",
      key: "krediSure",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.krediSure === null) return -1;
        if (b.krediSure === null) return 1;
        // Convert to numbers for numeric comparison
        const numA = parseFloat(a.krediSure);
        const numB = parseFloat(b.krediSure);
        return numA - numB;
      },
    },

    {
      title: t("kiralamaFirma"),
      dataIndex: "kiralamaFirma",
      key: "kiralamaFirma",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.kiralamaFirma === null) return -1;
        if (b.kiralamaFirma === null) return 1;
        return a.kiralamaFirma.localeCompare(b.kiralamaFirma);
      },
    },

    {
      title: t("krediHesapNo"),
      dataIndex: "krediHesapNo",
      key: "krediHesapNo",
      width: 110,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.krediHesapNo === null) return -1;
        if (b.krediHesapNo === null) return 1;
        // Convert to numbers for numeric comparison
        const numA = parseFloat(a.krediHesapNo);
        const numB = parseFloat(b.krediHesapNo);
        return numA - numB;
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
              <Select value={[20, 50, 100].includes(pageSize) ? pageSize : 20} onChange={handlePageSizeChange} style={{ width: 70 }} popupMatchSelectWidth={false}>
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

  const handlePageSizeChange = (value) => {
    // Ensure value is one of the allowed options
    const validValue = [20, 50, 100].includes(value) ? value : 20;

    // Show loading if infinite scroll is disabled
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }

    // Save the new page size to localStorage
    localStorage.setItem(tabloPageSize, validValue.toString());
    // Update the pageSize state
    setPageSize(validValue);
    // Reset data and fetch with new size
    fetchData(0, 1, validValue).finally(() => {
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

      const response = await AxiosInstance.post(`Insurance/GetInsuranceReportList?parameter=${searchTerm}`, exportCustomFilters);

      if (response?.data?.list) {
        const xlsxData = response.data.list.map((row) => {
          const xlsxRow = {};

          // Only process visible columns
          filteredColumns.forEach((col) => {
            const key = col.dataIndex;
            if (!key) return;

            let value = row[key];

            // Format special values
            if (key === "tarih") {
              value = formatDate(value);
            } else if (key === "aktif") {
              value = value ? "Evet" : "Hayır";
            } else if (key === "baslangicTarih" || key === "bitisTarih") {
              value = formatDate(value);
            } else if (key === "tutar" || key === "aracBedeli") {
              try {
                // Ensure format is a valid number between 0 and 20
                const format = row.tutarFormat ? Math.min(Math.max(Number(row.tutarFormat), 0), 20) : 2;

                value =
                  value !== null && value !== undefined
                    ? Number(value).toLocaleString(localStorage.getItem("i18nextLng") || "tr-TR", {
                        minimumFractionDigits: format,
                        maximumFractionDigits: format,
                      })
                    : "";
              } catch (error) {
                console.error(`Error formatting value for ${key}:`, error);
                value = value !== null && value !== undefined ? value.toString() : "";
              }
            }

            // Extract title text from column title (which might be a React element)
            xlsxRow[extractTextFromElement(col.title)] = value !== null && value !== undefined ? value.toString() : "";
          });

          return xlsxRow;
        });

        // Create and download Excel file
        const worksheet = XLSX.utils.json_to_sheet(xlsxData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sigorta Listesi");

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
        link.download = "Sigorta_Listesi.xlsx";
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
              scroll={{ y: "calc(100vh - 335px)" }}
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

export default KiralikAraclarTablo;