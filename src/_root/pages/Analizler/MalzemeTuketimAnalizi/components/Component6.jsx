import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, ConfigProvider, Popover } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined, DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../../api/http";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import trTR from "antd/lib/locale/tr_TR";
import { t } from "i18next";

const { Text } = Typography;

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

const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const twoMonthsLater = new Date();
twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

const Yakit = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [pageSize, setPageSize] = useState(10); // Page size
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const navigate = useNavigate();
  const {
      control,
      watch,
      setValue,
      reset,
      formState: { errors },
    } = useFormContext();
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const [popoverVisible, setPopoverVisible] = useState(false); // Popover için state
  const [tourVisible, setTourVisible] = useState(false); // Tour için state

  const [selectedRows, setSelectedRows] = useState([]);

    const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).toISOString() : null;
    const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).toISOString() : null;

  // API Data Fetching with diff and setPointId
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;
  
      if (diff > 0) {
        currentSetPointId = data[data.length - 1]?.malzemeId || 0;
      } else if (diff < 0) {
        currentSetPointId = data[0]?.malzemeId || 0;
      } else {
        currentSetPointId = 0;
      }
  
      // 🔥 Dinamik tarih hesaplama
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
  
      const body = {
        baslangicTarihi: oneYearAgo.toISOString(),
        bitisTarihi: today.toISOString(),
      };
  
      const response = await AxiosInstance.post(`/MaterialAnalysis/GetMaterialAnalysisInfoByType?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&type=5`, body);
      const total = response.data.recordCount;
      setTotalCount(total);
      setCurrentPage(targetPage);
  
      let newData = [];
  
      if (response.data.list && Array.isArray(response.data.list)) {
        newData = response.data.list.map((item) => ({
          ...item,
          key: item.malzemeId,
        }));
      } else {
        message.warning("Beklenen veri formatı gelmedi.");
      }
  
      if (newData.length > 0) {
        setData(newData);
      } else {
        message.warning("No data found.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search handling
  // Define handleSearch function
  const handleSearch = () => {
    fetchData(0, 1);
  };

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
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
      title: t("malzemeTanim"),
      dataIndex: "malzemeTanim",
      key: "malzemeTanim",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.malzemeTanim === null) return -1;
        if (b.malzemeTanim === null) return 1;
        return a.malzemeTanim.localeCompare(b.malzemeTanim);
      },
    },
    {
      title: t("malzemeKod"),
      dataIndex: "malzemeKod",
      key: "malzemeKod",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.malzemeKod === null) return -1;
        if (b.malzemeKod === null) return 1;
        return a.malzemeKod.localeCompare(b.malzemeKod);
      },
    },
    {
      title: t("malzemeTip"),
      dataIndex: "malzemeTip",
      key: "malzemeTip",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.malzemeTip === null) return -1;
        if (b.malzemeTip === null) return 1;
        return a.malzemeTip.localeCompare(b.malzemeTip);
      },
    },
    {
      title: t("malzemeBirim"),
      dataIndex: "malzemeBirim",
      key: "malzemeBirim",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.malzemeBirim === null) return -1;
        if (b.malzemeBirim === null) return 1;
        return a.malzemeBirim - b.malzemeBirim;
      },
    },
    {
      title: t("toplamKullanimMiktari"),
      dataIndex: "toplamKullanimMiktari",
      key: "toplamKullanimMiktari",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.toplamKullanimMiktari === null) return -1;
        if (b.toplamKullanimMiktari === null) return 1;
        return a.toplamKullanimMiktari - b.toplamKullanimMiktari;
      },
    },
    {
      title: t("toplamKullanimTutari"),
      dataIndex: "toplamKullanimTutari",
      key: "toplamKullanimTutari",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.toplamKullanimTutari === null) return -1;
        if (b.toplamKullanimTutari === null) return 1;
        return a.toplamKullanimTutari - b.toplamKullanimTutari;
      },
    },
    {
      title: t("kulanimSikligi"),
      dataIndex: "kulanimSikligi",
      key: "kulanimSikligi",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.kulanimSikligi === null) return -1;
        if (b.kulanimSikligi === null) return 1;
        return a.kulanimSikligi - b.kulanimSikligi;
      },
    },
    {
      title: t("stokMiktari"),
      dataIndex: "stokMiktari",
      key: "stokMiktari",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.stokMiktari === null) return -1;
        if (b.stokMiktari === null) return 1;
        return a.stokMiktari - b.stokMiktari;
      },
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: "fiyat",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.fiyat === null) return -1;
        if (b.fiyat === null) return 1;
        return a.fiyat - b.fiyat;
      },
    },
    {
      title: t("harcamaOrani"),
      dataIndex: "harcamaOrani",
      key: "harcamaOrani",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.harcamaOrani === null) return -1;
        if (b.harcamaOrani === null) return 1;
        return a.harcamaOrani - b.harcamaOrani;
      },
    },
    {
      title: t("sonKullanimTarihi"),
      dataIndex: "sonKullanimTarihi",
      key: "sonKullanimTarihi",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.sonKullanimTarihi === null) return -1;
        if (b.sonKullanimTarihi === null) return 1;
        return a.sonKullanimTarihi - b.sonKullanimTarihi;
      },
    },
    {
      title: t("ortalamaKullanimSuresi"),
      dataIndex: "ortalamaKullanimSuresi",
      key: "ortalamaKullanimSuresi",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.ortalamaKullanimSuresi === null) return -1;
        if (b.ortalamaKullanimSuresi === null) return 1;
        return a.ortalamaKullanimSuresi - b.ortalamaKullanimSuresi;
      },
    },
    {
      title: t("stokDurumu"),
      dataIndex: "stokDurumu",
      key: "stokDurumu",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.stokDurumu === null) return -1;
        if (b.stokDurumu === null) return 1;
        return a.stokDurumu - b.stokDurumu;
      },
    },
    {
      title: t("kiritikMiktar"),
      dataIndex: "kiritikMiktar",
      key: "kiritikMiktar",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.kiritikMiktar === null) return -1;
        if (b.kiritikMiktar === null) return 1;
        return a.kiritikMiktar - b.kiritikMiktar;
      },
    },
    {
      title: t("maliyet"),
      dataIndex: "maliyet",
      key: "maliyet",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık   
      sorter: (a, b) => {
        if (a.maliyet === null) return -1;
        if (b.maliyet === null) return 1;
        return a.maliyet - b.maliyet;
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
    const savedOrder = localStorage.getItem("columnOrderMalzemeTuketimTip9");
    const savedVisibility = localStorage.getItem("columnVisibilityMalzemeTuketimTip9");
    const savedWidths = localStorage.getItem("columnWidthsMalzemeTuketimTip9");

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

    localStorage.setItem("columnOrderMalzemeTuketimTip9", JSON.stringify(order));
    localStorage.setItem("columnVisibilityMalzemeTuketimTip9", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsMalzemeTuketimTip9", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderMalzemeTuketimTip9", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityMalzemeTuketimTip9",
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
      "columnWidthsMalzemeTuketimTip9",
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
    localStorage.removeItem("columnOrderMalzemeTuketimTip9");
    localStorage.removeItem("columnVisibilityMalzemeTuketimTip9");
    localStorage.removeItem("columnWidthsMalzemeTuketimTip9");
    window.location.reload();
  };

  const componentTitle = t("malzemeTuketimleri");

  // XLSX indirme fonksiyonunu ekleyin
    const handleXLSXDownload = () => {
      const formattedData = data.map((item) => {
        const row = {};
        columns.forEach((col) => {
          const key = col.dataIndex;
          row[col.title] = item[key];
        });
        return row;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      const workbookOut = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
  
      // Dosya adını bileşenin başlığından alın ve Türkçe karakterleri dönüştürün
      const fileName = `${normalizeText(componentTitle)}.xlsx`;
  
      saveAs(new Blob([workbookOut], { type: "application/octet-stream" }), fileName);
    };
  
    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 1000);
    };

    const handleModalOpen = () => {
      setIsExpandedModalVisible(true);
      setPopoverVisible(false); // Modal açıldığında popover'ı kapatır
    };

    const handleTourOpen = () => {
      setTourVisible(true); // Tour'u açar
      setPopoverVisible(false); // Popover'ı kapatır
    };

    const content = (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ cursor: "pointer" }} onClick={handleModalOpen}>
          Büyüt
        </div>
        <div style={{ cursor: "pointer" }} onClick={handleTourOpen}>
          Bilgi
        </div>
        <Button
            type="primary"
            icon={<DownloadOutlined />}
            loading={loading[1]}
            onClick={() => {
            enterLoading(1);
            handleXLSXDownload();
            }}
          >
            İndir
        </Button>
      </div>
    );

  return (
    <>
    <ConfigProvider locale={trTR}>
    <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "5px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          border: "1px solid #f0f0f0",
          filter: "drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1))",
        }}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
          {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
          {/* Other toolbar components */}
          <Text style={{ fontWeight: "500", fontSize: "17px" }}>
            {componentTitle} {`(${baslangicTarihi && bitisTarihi ? `${formatDateWithLocale(baslangicTarihi)} / ${formatDateWithLocale(bitisTarihi)}` : ""})`}
          </Text>
          </div>
          <Popover placement="bottom" content={content} trigger="click" open={popoverVisible} onOpenChange={(visible) => setPopoverVisible(visible)}>
            <Button
              type="text"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 5px",
                height: "32px",
                zIndex: 3,
              }}
            >
              <MoreOutlined style={{ cursor: "pointer", fontWeight: "500", fontSize: "16px" }} />
            </Button>
          </Popover>
        </div>
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

      {/* Table */}
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 200px)",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
          overflowY: "auto",
        }}
      >
        <Spin spinning={loading}>
          <Table
            components={components}
            rowSelection={rowSelection}
            columns={filteredColumns}
            dataSource={data}
            pagination={{
              current: currentPage,
              total: totalCount,
              pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: true,
              onChange: handleTableChange,
              showTotal: (total, range) => `Toplam ${totalCount} kayıt`,
            }}
            scroll={{ y: "calc(100vh - 335px)" }}
          />
        </Spin>

        {/* Expanded Modal */}
                <Modal
                  title={
                    <div>
                      <Text style={{ fontWeight: "500", fontSize: "17px" }}>
                        {componentTitle} {`(${baslangicTarihi && bitisTarihi ? `${formatDateWithLocale(baslangicTarihi)} / ${formatDateWithLocale(bitisTarihi)}` : ""})`}
                      </Text>
                    </div>
                  }
                  centered
                  open={isExpandedModalVisible}
                  onOk={() => setIsExpandedModalVisible(false)}
                  onCancel={() => setIsExpandedModalVisible(false)}
                  width="90%"
                  destroyOnClose
                >
                  <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Sol ve sağ tarafı ayırır
              marginBottom: "15px",
            }}
          >
            {/* Sol tarafta MenuOutlined ve Arama Kutusu */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
              />
            </div>
        
            {/* Sağ tarafta İndir butonu */}
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={loading[1]}
              onClick={() => {
                enterLoading(1);
                handleXLSXDownload();
              }}
            >
              İndir
            </Button>
          </div>
                    <Spin spinning={loading}>
                      <Table
                    components={components}
                    rowSelection={rowSelection}
                    columns={filteredColumns}
                    dataSource={data}
                    pagination={{
                      current: currentPage,
                      total: totalCount,
                      pageSize: 10,
                      showSizeChanger: false,
                      showQuickJumper: true,
                      onChange: handleTableChange,
                      showTotal: (total, range) => `Toplam ${totalCount} kayıt`,
                    }}
                    scroll={{ y: "calc(100vh - 335px)" }}
                  />
                    </Spin>
                  </div>
                </Modal>
      </div>
    </div>
    </ConfigProvider>
    </>
  );
};

export default Yakit;
