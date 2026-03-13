import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Select, Pagination } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import ContextMenu from "./components/ContextMenu/ContextMenu";
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

  // API Data Fetching with pagination, search, and sorting
  const fetchData = async (diff, targetPage, currentSize = pageSize, customSortColumn = sortColumn, customSortDirection = sortDirection) => {
    const currentFetchId = lastFetchIdRef.current + 1;
    lastFetchIdRef.current = currentFetchId;

    if (isLoadingPage && diff > 0) return;

    diff === 0 ? setLoading(true) : setIsLoadingMore(true);
    setIsLoadingPage(true);

    try {
      const directionStr = customSortDirection === "ascend" ? "asc" : customSortDirection === "descend" ? "desc" : "";
      
      const payload = {
        sortColumn: customSortColumn,
        sortDirection: directionStr
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
          message.warning("Veri bulunamadı.");
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
    fetchData(0, 1, pageSize).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  }, [infiniteScrollEnabled]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleSearch = () => {
    if (!infiniteScrollEnabled) setPaginationLoading(true);
    setCurrentPage(1);
    fetchData(0, 1, pageSize).finally(() => {
      if (!infiniteScrollEnabled) setPaginationLoading(false);
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter) {
      const newSortColumn = sorter.field || "";
      const newSortDirection = sorter.order || "";
      setSortColumn(newSortColumn);
      setSortDirection(newSortDirection);
      
      if (!infiniteScrollEnabled) setPaginationLoading(true);
      setCurrentPage(1);
      fetchData(0, 1, pageSize, newSortColumn, newSortDirection).finally(() => {
        if (!infiniteScrollEnabled) setPaginationLoading(false);
      });
      return;
    }

    const page = typeof pagination === "object" ? (pagination.current || 1) : pagination;
    const diff = page - currentPage;
    if (!infiniteScrollEnabled) setPaginationLoading(true);
    fetchData(diff, page, pageSize).finally(() => {
      if (!infiniteScrollEnabled) setPaginationLoading(false);
    });
  };

  const handlePageSizeChange = (value) => {
    if (!infiniteScrollEnabled) setPaginationLoading(true);
    localStorage.setItem(pageSizeHgsIslem, value.toString());
    setPageSize(value);
    fetchData(0, 1, value).finally(() => {
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
        fetchData(1, currentPage + 1, pageSize);
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
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,
      sorter: true,
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: true,
        render: (text) => {
        if (!text) return "-";
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("surucuAdi"),
      dataIndex: "isim",
      key: "isim",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: true,
    },
    {
      title: t("otoyol"),
      dataIndex: "otoYol",
      key: "otoYol",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("girisYeri"),
      dataIndex: "girisYeri",
      key: "girisYeri",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("girisTarih"),
      dataIndex: "girisTarih",
      key: "girisTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: true,
        render: (text) => {
        if (!text) return "-";
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("girisSaat"),
      dataIndex: "girisSaat",
      key: "girisSaat",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("cikisYeri"),
      dataIndex: "cikisYeri",
      key: "cikisYeri",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("cikisTarih"),
      dataIndex: "cikisTarih",
      key: "cikisTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: true,
        render: (text) => {
        if (!text) return "-";
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("cikisSaat"),
      dataIndex: "cikisSaat",
      key: "cikisSaat",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("odemeTuru"),
      dataIndex: "odemeTuru",
      key: "odemeTuru",
      width: 120,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("gecisUcreti"),
      dataIndex: "gecisUcreti",
      key: "gecisUcreti",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
    
      sorter: true,
      render: (value) => {
        // Ondalık sayıyı 2 haneli olarak formatlıyoruz
        return value !== null ? value.toFixed(2) : "-";
      },
    },
    {
      title: t("odemeDurumu"),
      dataIndex: "odemeDurumu",
      key: "odemeDurumu",
      width: 120,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("fisNo"),
      dataIndex: "fisNo",
      key: "fisNo",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("gecisKategorisi"),
      dataIndex: "gecisKategorisi",
      key: "gecisKategorisi",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("guzergah"),
      dataIndex: "guzergah",
      key: "guzergah",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: true,
    },
    {
      title: t("ozelAlan1"),
      dataIndex: "ozelAlan1",
      key: "ozelAlan1",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan2"),
      dataIndex: "ozelAlan2",
      key: "ozelAlan2",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan3"),
      dataIndex: "ozelAlan3",
      key: "ozelAlan3",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan4"),
      dataIndex: "ozelAlan4",
      key: "ozelAlan4",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan5"),
      dataIndex: "ozelAlan5",
      key: "ozelAlan5",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan6"),
      dataIndex: "ozelAlan6",
      key: "ozelAlan6",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan7"),
      dataIndex: "ozelAlan7",
      key: "ozelAlan7",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan8"),
      dataIndex: "ozelAlan8",
      key: "ozelAlan8",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan9"),
      dataIndex: "ozelAlan9",
      key: "ozelAlan9",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan10"),
      dataIndex: "ozelAlan10",
      key: "ozelAlan10",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan11"),
      dataIndex: "ozelAlan11",
      key: "ozelAlan11",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: true,
    },
    {
      title: t("ozelAlan12"),
      dataIndex: "ozelAlan12",
      key: "ozelAlan12",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

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
            width: "100%",
            maxWidth: "935px",
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
          {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
          {/* Other toolbar components */}
        </div>
        <div style={{ display: "flex", gap: "25px" }}>
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
          height: "calc(100vh - 200px)",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
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
