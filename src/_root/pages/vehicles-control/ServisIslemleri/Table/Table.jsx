import React, { useCallback, useEffect, useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import ContextMenu from "../components/ContextMenu/ContextMenu";
import CreateDrawer from "../Insert/CreateDrawer";
import EditDrawer from "../Update/EditDrawer";
import Filters from "./filter/Filters";
import BreadcrumbComp from "../../../../components/breadcrumb/Breadcrumb.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Progress, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../../api/http";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";

const localeMap = {
  tr: trTR,
  en: enUS,
  ru: ruRU,
  az: azAZ,
};

// Define date format mapping based on language
const dateFormatMap = {
  tr: "DD.MM.YYYY",
  en: "MM/DD/YYYY",
  ru: "DD.MM.YYYY",
  az: "DD.MM.YYYY",
};

// Define time format mapping based on language
const timeFormatMap = {
  tr: "HH:mm",
  en: "hh:mm A",
  ru: "HH:mm",
  az: "HH:mm",
};

const { Text } = Typography;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

const StyledTable = styled(Table)``;

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

const Ceza = ({ statusId1 }) => {
  const formMethods = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [pageSize, setPageSize] = useState(10); // Page size
  const [localeDateFormat, setLocaleDateFormat] = useState("MM/DD/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  const statusTag = (statusId) => {
    switch (statusId) {
      case 1:
        return { color: "#ff9800", text: "Bekliyor" };
      case 2:
        return { color: "#2196f3", text: "Devam Ediyor" };
      case 3:
        return { color: "#ff0000", text: "İptal Edildi" };
      case 4:
        return { color: "#2bc770", text: "Tamamlandı" };
      default:
        return { color: "default", text: "" }; // Eğer farklı bir değer gelirse
    }
  };

  function hexToRGBA(hex, opacity) {
    // hex veya opacity null ise hata döndür
    if (hex === null || opacity === null) {
      // console.error("hex veya opacity null olamaz!");
      return; // veya uygun bir varsayılan değer döndürebilirsiniz
    }

    let r = 0,
      g = 0,
      b = 0;
    // 3 karakterli hex kodunu kontrol et
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 karakterli hex kodunu kontrol et
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const prevBodyRef = useRef(body);

  // API Data Fetching with diff and setPointId
  const fetchData = useCallback(
    async (diff, targetPage, customfilterOverride) => {
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

        // Determine what to send for customfilters

        const response = await AxiosInstance.post(
          `VehicleServices/GetVehicleServices?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&statusId=${statusId1 !== undefined && statusId1 !== null ? statusId1 : 0}`,
          customfilterOverride || body.filters?.customfilter || {}
        );

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
          message.warning(t("kayitBulunamadi"));
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(t("hataOlustu"));
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, body.filters, data]
  );

  useEffect(() => {
    fetchData(0, 1);
  }, []);

  useEffect(() => {
    if (body !== prevBodyRef.current) {
      prevBodyRef.current = body;
    }
  }, [body]);

  // Search handling
  // Define handleSearch function
  const handleSearch = useCallback(
    (customfilterOverride) => {
      fetchData(0, 1, customfilterOverride);
    },
    [fetchData]
  );

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
  }, []);

  // Columns definition (adjust as needed)
  const initialColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <a onClick={() => onRowClick(record)}>{text}</a> // Updated this line
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
      render: (text) => formatDate(text),
    },
    {
      title: t("saat"),
      dataIndex: "saat",
      key: "saat",
      width: 90,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.saat === null) return -1;
        if (b.saat === null) return 1;
        return a.saat.localeCompare(b.saat);
      },

      visible: true, // Varsayılan olarak açık
      render: (text) => formatTime(text),
    },
    {
      title: t("servisTanim"),
      dataIndex: "servisTanimi",
      key: "servisTanimi",
      width: 190,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.servisTanimi === null) return -1;
        if (b.servisTanimi === null) return 1;
        return a.servisTanimi.localeCompare(b.servisTanimi);
      },
    },

    {
      title: t("durum"),
      dataIndex: "durumBilgisi",
      key: "durumBilgisi",
      width: 150,
      ellipsis: true,
      visible: true,
      render: (_, record) => {
        const { color, text } = statusTag(record.durumBilgisi);
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tag
              style={{
                textAlign: "center",
                backgroundColor: hexToRGBA(color, 0.2),
                border: `1.2px solid ${hexToRGBA(color, 0.7)}`,
                color: color,
              }}
            >
              {text}
            </Tag>
          </div>
        );
      },
      sorter: (a, b) => (a.durumBilgisi || 0) - (b.durumBilgisi || 0),
    },

    {
      title: t("aracTipi"),
      dataIndex: "aracTipi",
      key: "aracTipi",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.aracTipi === null) return -1;
        if (b.aracTipi === null) return 1;
        return a.aracTipi.localeCompare(b.aracTipi);
      },
    },

    {
      title: t("servisNedeni"),
      dataIndex: "servisNedeni",
      key: "servisNedeni",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.servisNedeni === null) return -1;
        if (b.servisNedeni === null) return 1;
        return a.servisNedeni.localeCompare(b.servisNedeni);
      },
    },

    {
      title: t("firma"),
      dataIndex: "islemiYapanText",
      key: "islemiYapanText",
      width: 190,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.islemiYapanText === null) return -1;
        if (b.islemiYapanText === null) return 1;
        return a.islemiYapanText.localeCompare(b.islemiYapanText);
      },
    },

    {
      title: t("servisTipi"),
      dataIndex: "servisTipi",
      key: "servisTipi",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.servisTipi === null) return -1;
        if (b.servisTipi === null) return 1;
        return a.servisTipi.localeCompare(b.servisTipi);
      },
    },
    {
      title: t("surucu"),
      dataIndex: "surucuIsim",
      key: "surucuIsim",
      width: 160,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.surucuIsim === null) return -1;
        if (b.surucuIsim === null) return 1;
        return a.surucuIsim.localeCompare(b.surucuIsim);
      },
    },

    {
      title: t("baslamaTarihi"),
      dataIndex: "baslamaTarih",
      key: "baslamaTarih",
      width: 110,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.baslamaTarih === null) return -1;
        if (b.baslamaTarih === null) return 1;
        return a.baslamaTarih.localeCompare(b.baslamaTarih);
      },

      visible: true, // Varsayılan olarak açık
      render: (text) => formatDate(text),
    },

    {
      title: t("bitisTarihi"),
      dataIndex: "bitisTarih",
      key: "bitisTarih",
      width: 110,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.bitisTarih === null) return -1;
        if (b.bitisTarih === null) return 1;
        return a.bitisTarih.localeCompare(b.bitisTarih);
      },

      visible: true, // Varsayılan olarak açık
      render: (text) => formatDate(text),
    },

    {
      title: t("servisKm."),
      dataIndex: "km",
      key: "km",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.km === null) return -1;
        if (b.km === null) return 1;
        return a.km - b.km;
      },
      render: (text) => formatNumberWithLocale(text),
    },

    {
      title: t("iscilikUcreti"),
      dataIndex: "iscilik",
      key: "iscilik",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.iscilik === null) return -1;
        if (b.iscilik === null) return 1;
        return a.iscilik - b.iscilik;
      },
      render: (text) => formatNumberWithLocale(text),
    },

    {
      title: t("malzemeMaliyeti"),
      dataIndex: "malzeme",
      key: "malzeme",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.malzeme === null) return -1;
        if (b.malzeme === null) return 1;
        return a.malzeme - b.malzeme;
      },
      render: (text) => formatNumberWithLocale(text),
    },

    {
      title: t("digerGiderler"),
      dataIndex: "diger",
      key: "diger",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.diger === null) return -1;
        if (b.diger === null) return 1;
        return a.diger - b.diger;
      },
      render: (text) => formatNumberWithLocale(text),
    },
    {
      title: t("KDV"),
      dataIndex: "kdv",
      key: "kdv",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.kdv === null) return -1;
        if (b.kdv === null) return 1;
        return a.kdv - b.kdv;
      },
      render: (text) => formatNumberWithLocale(text),
    },
    {
      title: t("indirim"),
      dataIndex: "indirim",
      key: "indirim",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.indirim === null) return -1;
        if (b.indirim === null) return 1;
        return a.indirim - b.indirim;
      },
      render: (text) => formatNumberWithLocale(text),
    },

    {
      title: t("toplamMaliyet"),
      dataIndex: "toplam",
      key: "toplam",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.toplam === null) return -1;
        if (b.toplam === null) return 1;
        return a.toplam - b.toplam;
      },
      render: (text) => formatNumberWithLocale(text),
    },

    {
      title: t("faturaTarihi"),
      dataIndex: "faturaTarih",
      key: "faturaTarih",
      width: 110,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.faturaTarih === null) return -1;
        if (b.faturaTarih === null) return 1;
        return a.faturaTarih.localeCompare(b.faturaTarih);
      },

      visible: true, // Varsayılan olarak açık
      render: (text) => formatDate(text),
    },

    {
      title: t("faturaNo"),
      dataIndex: "faturaNo",
      key: "faturaNo",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.faturaNo === null) return -1;
        if (b.faturaNo === null) return 1;
        return a.faturaNo - b.faturaNo;
      },
    },

    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },

    {
      title: t("sikayetler"),
      dataIndex: "sikayetler",
      key: "sikayetler",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.sikayetler === null) return -1;
        if (b.sikayetler === null) return 1;
        return a.sikayetler.localeCompare(b.sikayetler);
      },
    },

    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },

    {
      title: t("talepNo"),
      dataIndex: "talepNo",
      key: "talepNo",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.talepNo === null) return -1;
        if (b.talepNo === null) return 1;
        return a.talepNo - b.talepNo;
      },
    },

    {
      title: t("talepEden"),
      dataIndex: "talepEden",
      key: "talepEden",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.talepEden === null) return -1;
        if (b.talepEden === null) return 1;
        return a.talepEden.localeCompare(b.talepEden);
      },
    },

    {
      title: t("onay"),
      dataIndex: "onay",
      key: "onay",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.onay === null) return -1;
        if (b.onay === null) return 1;
        return a.onay.localeCompare(b.onay);
      },
    },

    // Diğer kolonlarınız...
  ];

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Sayıları formatlamak için fonksiyon

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
    const savedOrder = localStorage.getItem("columnOrderServisIslemleri");
    const savedVisibility = localStorage.getItem("columnVisibilityServisIslemleri");
    const savedWidths = localStorage.getItem("columnWidthsServisIslemleri");

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

    localStorage.setItem("columnOrderServisIslemleri", JSON.stringify(order));
    localStorage.setItem("columnVisibilityServisIslemleri", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsServisIslemleri", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderServisIslemleri", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityServisIslemleri",
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
      "columnWidthsServisIslemleri",
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
    localStorage.removeItem("columnOrderServisIslemleri");
    localStorage.removeItem("columnVisibilityServisIslemleri");
    localStorage.removeItem("columnWidthsServisIslemleri");
    window.location.reload();
  };

  // Kullanıcının dilini localStorage'den alın
  const currentLang = localStorage.getItem("i18nextLng") || "en";
  const currentLocale = localeMap[currentLang] || enUS;

  useEffect(() => {
    // Ay ve tarih formatını dil bazında ayarlayın
    setLocaleDateFormat(dateFormatMap[currentLang] || "MM/DD/YYYY");
    setLocaleTimeFormat(timeFormatMap[currentLang] || "HH:mm");
  }, [currentLang]);

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
    setBody((prevBody) => {
      if (type === "filters") {
        // If newBody is a function, call it with previous filters
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
  // filtreleme işlemi için kullanılan useEffect son

  return (
    <>
      <ConfigProvider locale={currentLocale}>
        <FormProvider {...formMethods}>
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
                maxWidth: "1093px",
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
                onPressEnter={() => handleSearch()}
                // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={() => handleSearch()} />}
              />

              <Filters onChange={handleBodyChange} onApply={handleSearch} />
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
              <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearch()}></Button>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
              <CreateDrawer selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
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
              <StyledTable
                components={components}
                rowSelection={rowSelection}
                columns={filteredColumns}
                dataSource={data}
                onRow={(record) => ({
                  style: record.isRecordSeen === true ? { fontWeight: 600 } : {},
                })}
                pagination={{
                  current: currentPage,
                  total: totalCount,
                  pageSize: 10,
                  showTotal: (total, range) => `Toplam ${total}`,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: handleTableChange,
                }}
                scroll={{ y: "calc(100vh - 335px)" }}
              />
            </Spin>
            <EditDrawer selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
          </div>
        </FormProvider>
      </ConfigProvider>
    </>
  );
};

export default Ceza;
