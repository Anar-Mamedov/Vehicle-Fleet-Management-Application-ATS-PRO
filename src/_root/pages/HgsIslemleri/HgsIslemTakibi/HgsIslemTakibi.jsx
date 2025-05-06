import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip } from "antd";
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

  const [selectedRows, setSelectedRows] = useState([]);

  // API Data Fetching with diff and setPointId
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        // Moving forward
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        // Moving backward
        currentSetPointId = data[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      const response = await AxiosInstance.post(`HgsOperations/GetHgsOperationsList?setPointId=${currentSetPointId}&diff=${diff}&parameter=${searchTerm}`);

      const total = response.data.recordCount;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData = response.data.list.map((item) => ({
        ...item,
        key: item.siraNo, // Assign key directly from siraNo
      }));

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
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tarih === null) return -1;
        if (b.tarih === null) return 1;
        return new Date(a.tarih) - new Date(b.tarih);
      },
        render: (text) => {
        if (!text) return "-";
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },
    {
      title: t("surucuAdi"),
      dataIndex: "isim",
      key: "isim",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.isim === null) return -1;
        if (b.isim === null) return 1;
        return a.isim.localeCompare(b.isim);
      },
    },
    {
      title: t("otoyol"),
      dataIndex: "otoYol",
      key: "otoYol",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.otoYol === null) return -1;
        if (b.otoYol === null) return 1;
        return a.otoYol.localeCompare(b.otoYol);
      },
    },
    {
      title: t("girisYeri"),
      dataIndex: "girisYeri",
      key: "girisYeri",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.girisYeri === null) return -1;
        if (b.girisYeri === null) return 1;
        return a.girisYeri.localeCompare(b.girisYeri);
      },
    },
    {
      title: t("girisTarih"),
      dataIndex: "girisTarih",
      key: "girisTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.girisTarih === null) return -1;
        if (b.girisTarih === null) return 1;
        return new Date(a.girisTarih) - new Date(b.girisTarih);
      },
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

      sorter: (a, b) => {
        if (a.girisSaat === null) return -1;
        if (b.girisSaat === null) return 1;
        return a.girisSaat.localeCompare(b.girisSaat);
      },
    },
    {
      title: t("cikisYeri"),
      dataIndex: "cikisYeri",
      key: "cikisYeri",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.cikisYeri === null) return -1;
        if (b.cikisYeri === null) return 1;
        return a.cikisYeri - b.cikisYeri;
      },
    },
    {
      title: t("cikisTarih"),
      dataIndex: "cikisTarih",
      key: "cikisTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.cikisTarih === null) return -1;
        if (b.cikisTarih === null) return 1;
        return new Date(a.cikisTarih) - new Date(b.cikisTarih);
      },
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

      sorter: (a, b) => {
        if (a.cikisSaat === null) return -1;
        if (b.cikisSaat === null) return 1;
        return a.cikisSaat.localeCompare(b.cikisSaat);
      },
    },
    {
      title: t("odemeTuru"),
      dataIndex: "odemeTuru",
      key: "odemeTuru",
      width: 120,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.odemeTuru === null) return -1;
        if (b.odemeTuru === null) return 1;
        return a.odemeTuru - b.odemeTuru;
      },
    },
    {
      title: t("gecisUcreti"),
      dataIndex: "gecisUcreti",
      key: "gecisUcreti",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.gecisUcreti === null) return -1;
        if (b.gecisUcreti === null) return 1;
        return a.gecisUcreti - b.gecisUcreti;
      },
    },
    {
      title: t("odemeDurumu"),
      dataIndex: "odemeDurumu",
      key: "odemeDurumu",
      width: 120,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.odemeDurumu === null) return -1;
        if (b.odemeDurumu === null) return 1;
        return a.odemeDurumu - b.odemeDurumu;
      },
    },
    {
      title: t("fisNo"),
      dataIndex: "fisNo",
      key: "fisNo",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.fisNo === null) return -1;
        if (b.fisNo === null) return 1;
        return a.fisNo.localeCompare(b.fisNo);
      },
    },
    {
      title: t("gecisKategorisi"),
      dataIndex: "gecisKategorisi",
      key: "gecisKategorisi",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.gecisKategorisi === null) return -1;
        if (b.gecisKategorisi === null) return 1;
        return a.gecisKategorisi.localeCompare(b.gecisKategorisi);
      },
    },
    {
      title: t("guzergah"),
      dataIndex: "guzergah",
      key: "guzergah",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.guzergah === null) return -1;
        if (b.guzergah === null) return 1;
        return a.guzergah.localeCompare(b.guzergah);
      },
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },
    {
      title: t("ozelAlan1"),
      dataIndex: "ozelAlan1",
      key: "ozelAlan1",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan1 === null) return -1;
        if (b.ozelAlan1 === null) return 1;
        return a.ozelAlan1.localeCompare(b.ozelAlan1);
      },
    },
    {
      title: t("ozelAlan2"),
      dataIndex: "ozelAlan2",
      key: "ozelAlan2",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan2 === null) return -1;
        if (b.ozelAlan2 === null) return 1;
        return a.ozelAlan2.localeCompare(b.ozelAlan2);
      },
    },
    {
      title: t("ozelAlan3"),
      dataIndex: "ozelAlan3",
      key: "ozelAlan3",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan3 === null) return -1;
        if (b.ozelAlan3 === null) return 1;
        return a.ozelAlan3.localeCompare(b.ozelAlan3);
      },
    },
    {
      title: t("ozelAlan4"),
      dataIndex: "ozelAlan4",
      key: "ozelAlan4",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan4 === null) return -1;
        if (b.ozelAlan4 === null) return 1;
        return a.ozelAlan4.localeCompare(b.ozelAlan4);
      },
    },
    {
      title: t("ozelAlan5"),
      dataIndex: "ozelAlan5",
      key: "ozelAlan5",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan5 === null) return -1;
        if (b.ozelAlan5 === null) return 1;
        return a.ozelAlan5.localeCompare(b.ozelAlan5);
      },
    },
    {
      title: t("ozelAlan6"),
      dataIndex: "ozelAlan6",
      key: "ozelAlan6",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan6 === null) return -1;
        if (b.ozelAlan6 === null) return 1;
        return a.ozelAlan6.localeCompare(b.ozelAlan6);
      },
    },
    {
      title: t("ozelAlan7"),
      dataIndex: "ozelAlan7",
      key: "ozelAlan7",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan7 === null) return -1;
        if (b.ozelAlan7 === null) return 1;
        return a.ozelAlan7.localeCompare(b.ozelAlan7);
      },
    },
    {
      title: t("ozelAlan8"),
      dataIndex: "ozelAlan8",
      key: "ozelAlan8",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan8 === null) return -1;
        if (b.ozelAlan8 === null) return 1;
        return a.ozelAlan8.localeCompare(b.ozelAlan8);
      },
    },
    {
      title: t("ozelAlan9"),
      dataIndex: "ozelAlan9",
      key: "ozelAlan9",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan9 === null) return -1;
        if (b.ozelAlan9 === null) return 1;
        return a.ozelAlan9.localeCompare(b.ozelAlan9);
      },
    },
    {
      title: t("ozelAlan10"),
      dataIndex: "ozelAlan10",
      key: "ozelAlan10",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan10 === null) return -1;
        if (b.ozelAlan10 === null) return 1;
        return a.ozelAlan10.localeCompare(b.ozelAlan10);
      },
    },
    {
      title: t("ozelAlan11"),
      dataIndex: "ozelAlan11",
      key: "ozelAlan11",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan11 === null) return -1;
        if (b.ozelAlan11 === null) return 1;
        return a.ozelAlan11.localeCompare(b.ozelAlan11);
      },
    },
    {
      title: t("ozelAlan12"),
      dataIndex: "ozelAlan12",
      key: "ozelAlan12",
      width: 130,
      ellipsis: true,
      visible: false, // Varsayılan olarak kapalı

      sorter: (a, b) => {
        if (a.ozelAlan1 === null) return -1;
        if (b.ozelAlan1 === null) return 1;
        return a.ozelAlan1.localeCompare(b.ozelAlan1);
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
          <HgsEntegrasyon onRefresh={refreshTableData} />
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
            pagination={{
              current: currentPage,
              total: totalCount,
              pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: true,
              onChange: handleTableChange,
            }}
            scroll={{ y: "calc(100vh - 335px)" }}
          />
        </Spin>
        <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
      </div>
    </>
  );
};

export default Yakit;
