import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, Progress, message } from "antd";
import {
  HolderOutlined,
  SearchOutlined,
  MenuOutlined,
  CheckOutlined,
  CloseOutlined,
  HomeOutlined,
  FileTextOutlined,
  WarningOutlined,
  BellOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import "./TableStyle.css";
import AxiosInstance from "../../../../../api/http";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import ContextMenu from "../components/ContextMenu/ContextMenu";
import CreateDrawer from "../Insert/CreateDrawer";
import EditDrawer from "../Update/EditDrawer";
import Filters from "./filter/Filters";
import dayjs from "dayjs";
import BreadcrumbComp from "../../../../components/breadcrumb/Breadcrumb.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

import { t } from "i18next";

const { Text } = Typography;

// Hücrelerde ikincil (gri) alt başlık metni için ortak stil
const subTextStyle = { color: "#8c8c8c", fontSize: 12, lineHeight: "16px" };
const cellWrapperStyle = { display: "flex", flexDirection: "column", lineHeight: "18px" };

const getDurumDetails = (durum) => {
  const normalized = (durum || "").trim().toLowerCase();
  if (normalized === "kritik") {
    return {
      text: t("kritik"),
      color: "#ff4d4f",
      tagBg: "#fff1f0",
      tagBorder: "#ffa39e",
      tagTextColor: "#ff4d4f",
    };
  }
  if (normalized === "yaklaşıyor" || normalized === "yaklasıyor" || normalized === "yaklasiyor" || normalized === "yaklaşan" || normalized === "yaklasan") {
    return {
      text: t("yaklasiyor"),
      color: "#faad14",
      tagBg: "#fffbe6",
      tagBorder: "#ffe58f",
      tagTextColor: "#d46b08",
    };
  }
  if (normalized === "gecikmiş" || normalized === "gecikmis") {
    return {
      text: t("gecikmis"),
      color: "#ff4d4f",
      tagBg: "#fff1f0",
      tagBorder: "#ffa39e",
      tagTextColor: "#ff4d4f",
    };
  }
  // normal / noraml / others
  return {
    text: t("normal"),
    color: "#595959",
    tagBg: "#f0f2f5",
    tagBorder: "#d9d9d9",
    tagTextColor: "#595959",
  };
};

const renderYaklasanBakimCell = (remainingKm, remainingDays, durum) => {
  if (remainingKm === null && remainingDays === null) return "-";

  const normalized = (durum || "").trim().toLowerCase();

  // Get colors based on durum
  let textColor = "#595959";
  let lineColor = "#b0b7c3";

  if (normalized === "kritik") {
    textColor = "#ff4d4f";
    lineColor = "#ff4d4f";
  } else if (normalized === "yaklaşıyor" || normalized === "yaklasıyor" || normalized === "yaklasiyor" || normalized === "yaklaşan" || normalized === "yaklasan") {
    textColor = "#d46b08";
    lineColor = "#faad14";
  } else if (normalized === "gecikmiş" || normalized === "gecikmis") {
    textColor = "#ff4d4f";
    lineColor = "#ff4d4f";
  } else if (normalized === "normal" || normalized === "noraml") {
    textColor = "#595959";
    lineColor = "#b0b7c3";
  } else {
    // Fallback: If durum isn't mapped, use original calculations
    const isCritical = (remainingKm !== null && remainingKm < 1200) || (remainingDays !== null && remainingDays < 30);
    textColor = isCritical ? "#faad14" : "#595959";
    lineColor = isCritical ? "#faad14" : "#d9d9d9";
  }

  let displayText = "";

  if (remainingKm !== null && remainingDays !== null) {
    const kmVal = remainingKm < 0 ? `(${formatNumberWithLocale(Math.abs(remainingKm))})` : formatNumberWithLocale(remainingKm);
    const daysVal = remainingDays < 0 ? `(${Math.abs(remainingDays)})` : remainingDays;
    displayText = t("kmVeGunSonra", { km: kmVal, days: daysVal });
  } else if (remainingKm !== null) {
    const kmVal = remainingKm < 0 ? `(${formatNumberWithLocale(Math.abs(remainingKm))})` : formatNumberWithLocale(remainingKm);
    displayText = t("kmSonra", { count: kmVal });
  } else if (remainingDays !== null) {
    const daysVal = remainingDays < 0 ? `(${Math.abs(remainingDays)})` : remainingDays;
    displayText = t("gunSonra", { count: daysVal });
  } else {
    return "-";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ fontWeight: 600, color: textColor }}>{displayText}</span>
      <div style={{ height: "4px", width: "100%", maxWidth: "120px", backgroundColor: lineColor, borderRadius: "2px" }} />
    </div>
  );
};

// Kalan gün ve kalan km hesaplama yardımcıları
const calculateRemainingDays = (targetDate) => {
  if (!targetDate) return null;
  try {
    const today = dayjs().startOf("day");
    const target = dayjs(targetDate).startOf("day");
    return target.diff(today, "day");
  } catch (error) {
    console.error("Error calculating remaining days:", error);
    return null;
  }
};

const calculateRemainingKm = (hedefKm, currentKm) => {
  if (hedefKm === null || hedefKm === undefined || currentKm === null || currentKm === undefined) return null;
  const diff = Number(hedefKm) - Number(currentKm);
  if (Number.isNaN(diff)) return null;
  return diff;
};

const breadcrumb = [{ href: "/", title: <HomeOutlined /> }, { title: t("periyodikBakimlar") }];

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important; /* Blue color */
  }
`;

const CustomTable = styled(Table)`
  .ant-pagination-item-ellipsis {
    display: flex !important;
  }
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

const Sigorta = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setValue } = useFormContext();
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı için state
  const [label, setLabel] = useState("Yükleniyor..."); // Başlangıç değeri özel alanlar için
  const [totalDataCount, setTotalDataCount] = useState(0); // Tüm veriyi tutan state
  const [pageSize, setPageSize] = useState(10); // Başlangıçta sayfa başına 10 kayıt göster
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    toplamTanim: null,
    kritikGecikmis: null,
    yaklasanBakim: null,
    sadeceKm: null,
  });

  const formatStatisticValue = (value) => {
    if (value === null || value === undefined) return "-";
    return formatNumberWithLocale(value);
  };

  const [editDrawer1Visible, setEditDrawer1Visible] = useState(false);
  const [editDrawer1Data, setEditDrawer1Data] = useState(null);

  // edit drawer için
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  // edit drawer için son

  const [selectedRows, setSelectedRows] = useState([]);

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

  // Özel Alanların nameleri backend çekmek için api isteği

  // useEffect(() => {
  //   // API'den veri çekme işlemi
  //   const fetchData = async () => {
  //     try {
  //       const response = await AxiosInstance.get("OzelAlan?form=ISEMRI"); // API URL'niz
  //       localStorage.setItem("ozelAlanlarPeryodikBakim", JSON.stringify(response));
  //       setLabel(response); // Örneğin, API'den dönen yanıt doğrudan etiket olacak
  //     } catch (error) {
  //       console.error("API isteğinde hata oluştu:", error);
  //       setLabel("Hata! Veri yüklenemedi."); // Hata durumunda kullanıcıya bilgi verme
  //     }
  //   };
  //
  //   fetchData();
  // }, [drawer.visible]);

  const ozelAlanlar = JSON.parse(localStorage.getItem("ozelAlanlarPeryodikBakim"));

  // Özel Alanların nameleri backend çekmek için api isteği sonu
  const initialColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 190,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const altBilgi = [record.marka, record.model].filter(Boolean).join(" ");
        return (
          <div style={cellWrapperStyle}>
            <a onClick={() => onRowClick(record)} style={{ fontWeight: 600 }}>
              {text || "-"}
            </a>
            {altBilgi && <span style={subTextStyle}>{altBilgi}</span>}
          </div>
        );
      },
      sorter: (a, b) => {
        if (a.plaka === null) return -1;
        if (b.plaka === null) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },

    {
      title: t("bakimTanimi"),
      dataIndex: "bakimTanimi",
      key: "bakimTanimi",
      width: 240,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div style={cellWrapperStyle}>
          <span style={{ fontWeight: 600 }}>{text || "-"}</span>
          {record.bakimKodu && <span style={subTextStyle}>{record.bakimKodu}</span>}
        </div>
      ),
      sorter: (a, b) => {
        if (a.bakimTanimi === null) return -1;
        if (b.bakimTanimi === null) return 1;
        return a.bakimTanimi.localeCompare(b.bakimTanimi);
      },
    },

    {
      title: t("periyot"),
      key: "periyot",
      width: 180,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (_, record) => {
        const parcalar = [];
        if (record.isHerKm === true && record.herKm) parcalar.push(`${formatNumberWithLocale(record.herKm)} ${t("km").toLocaleLowerCase()}`);
        if (record.isHerTarih === true && record.herGun) parcalar.push(`${formatNumberWithLocale(record.herGun)} ${t("gun").toLocaleLowerCase()}`);
        return parcalar.length ? parcalar.join(" / ") : "-";
      },
      sorter: (a, b) => (a.herKm ?? 0) - (b.herKm ?? 0),
    },

    {
      title: t("sonUygulama"),
      key: "sonUygulama",
      width: 160,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (_, record) => (
        <div style={cellWrapperStyle}>
          <span>{`${t("km").toLocaleUpperCase()}: ${formatNumberWithLocale(record.sonKm)}`}</span>
          {record.sonTarih && <span style={subTextStyle}>{formatDate(record.sonTarih)}</span>}
        </div>
      ),
      sorter: (a, b) => (a.sonKm ?? 0) - (b.sonKm ?? 0),
    },

    {
      title: t("sonrakiHedef"),
      key: "sonrakiHedef",
      width: 160,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (_, record) => {
        const showKm = record.isHerKm === true;
        const showDate = record.isHerTarih === true;
        if (!showKm && !showDate) return "-";
        return (
          <div style={cellWrapperStyle}>
            {showKm && <span>{`${t("km").toLocaleUpperCase()}: ${formatNumberWithLocale(record.hedefKm)}`}</span>}
            {showDate && record.hedefTarih && <span style={subTextStyle}>{formatDate(record.hedefTarih)}</span>}
          </div>
        );
      },
      sorter: (a, b) => (a.hedefKm ?? 0) - (b.hedefKm ?? 0),
    },

    {
      title: t("yaklasanBakim") || "Yaklaşan Bakım",
      key: "yaklasanBakim",
      width: 200,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (_, record) => {
        const remainingKm = record.isHerKm === true ? record.kalanKm : null;
        const remainingDays = record.isHerTarih === true ? record.kalanSure : null;
        return renderYaklasanBakimCell(remainingKm, remainingDays, record.durum);
      },
      sorter: (a, b) => {
        const aVal = a.isHerKm === true ? a.kalanKm : null;
        const bVal = b.isHerKm === true ? b.kalanKm : null;
        if (aVal === null) return -1;
        if (bVal === null) return 1;
        return aVal - bVal;
      },
    },

    {
      title: t("durum") || "Durum",
      dataIndex: "durum",
      key: "durum",
      width: 130,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text) => {
        const details = getDurumDetails(text);
        return (
          <Tag
            style={{
              backgroundColor: details.tagBg,
              borderColor: details.tagBorder,
              color: details.tagTextColor,
              fontWeight: 600,
              borderRadius: "6px",
              padding: "2px 8px",
            }}
          >
            {details.text}
          </Tag>
        );
      },
      sorter: (a, b) => {
        if (a.durum === null) return -1;
        if (b.durum === null) return 1;
        return a.durum.localeCompare(b.durum);
      },
    },

    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 240,
      ellipsis: true,
      visible: false,
      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },

    {
      title: t("aktif"),
      dataIndex: "aktif",
      key: "aktif",
      width: 83,
      ellipsis: true,
      visible: false,
      sorter: (a, b) => {
        if (a.aktif === null) return -1;
        if (b.aktif === null) return 1;
        return a.aktif.localeCompare(b.aktif);
      },
      render: (value) => {
        return value ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />;
      },
    },

    // Diğer kolonlarınız...
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

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  // ana tablo api isteği için kullanılan useEffect
  useEffect(() => {
    fetchEquipmentData(0, 1);
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (body !== prevBodyRef.current) {
      fetchEquipmentData(0, 1);
      fetchStatistics();
      prevBodyRef.current = body;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  const prevBodyRef = useRef(body);

  // arama işlemi için kullanılan useEffect
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Arama terimi değiştiğinde ve boş olduğunda API isteğini tetikle
    const timeout = setTimeout(() => {
      if (searchTerm !== body.keyword) {
        handleBodyChange("keyword", searchTerm);
        setCurrentPage(1); // Arama yapıldığında veya arama sıfırlandığında sayfa numarasını 1'e ayarla
        // setDrawer({ ...drawer, visible: false }); // Arama yapıldığında veya arama sıfırlandığında Drawer'ı kapat
      }
    }, 2000);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // arama işlemi için kullanılan useEffect son

  const fetchEquipmentData = async (diff, targetPage) => {
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

      // API isteğinde keyword ve currentPage kullanılıyor
      const response = await AxiosInstance.post(
        `PeriodicMaintenance/GetPeriodicMaintenanceList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`,
        body.filters?.customfilter || {}
      );

      if (response.data.statusCode == 401) {
        navigate("/unauthorized");
      } else if (response.data) {
        // Toplam sayfa sayısını ayarla
        setTotalPages(response.data.page);
        setTotalDataCount(response.data.recordCount);

        // Gelen veriyi formatla ve state'e ata
        const formattedData = response.data.list.map((item) => ({
          ...item,
          key: item.siraNo,
        }));

        if (formattedData.length > 0) {
          setData(formattedData);
          setCurrentPage(targetPage);
        } else {
          // message.warning(t("kayitBulunamadi"));
          setData([]);
        }
      } else {
        console.error("API response is not in expected format");
      }
    } catch (error) {
      console.error("Error in API request:", error);
      if (navigator.onLine) {
        // İnternet bağlantısı var
        message.error("Hata Mesajı: " + error.message);
      } else {
        // İnternet bağlantısı yok
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    setStatisticsLoading(true);
    try {
      const customFilters = body.filters?.customfilter || {};
      const [res1, res2, res3, res4] = await Promise.all([
        AxiosInstance.post(`PeriodicMaintenanceStatistics/GetInfoByType?type=1&parameter=${searchTerm}`, customFilters),
        AxiosInstance.post(`PeriodicMaintenanceStatistics/GetInfoByType?type=2&parameter=${searchTerm}`, customFilters),
        AxiosInstance.post(`PeriodicMaintenanceStatistics/GetInfoByType?type=3&parameter=${searchTerm}`, customFilters),
        AxiosInstance.post(`PeriodicMaintenanceStatistics/GetInfoByType?type=4&parameter=${searchTerm}`, customFilters),
      ]);

      setStatistics({
        toplamTanim: res1.data,
        kritikGecikmis: res2.data,
        yaklasanBakim: res3.data,
        sadeceKm: res4.data,
      });
    } catch (error) {
      console.error("İstatistik verisi çekme hatası:", error);
    } finally {
      setStatisticsLoading(false);
    }
  };

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
    setBody((state) => ({
      ...state,
      [type]: newBody,
    }));
    setCurrentPage(1); // Filtreleme yapıldığında sayfa numarasını 1'e ayarla
  }, []);
  // filtreleme işlemi için kullanılan useEffect son

  // sayfalama için kullanılan useEffect
  const handleTableChange = (page) => {
    if (page) {
      const diff = page - currentPage;
      fetchEquipmentData(diff, page);
    }
  };
  // sayfalama için kullanılan useEffect son

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length > 0) {
      setValue("selectedLokasyonId", newSelectedRowKeys[0]);
    } else {
      setValue("selectedLokasyonId", null);
    }
    // Seçilen satırların verisini bul
    const newSelectedRows = data.filter((row) => newSelectedRowKeys.includes(row.key));
    setSelectedRows(newSelectedRows); // Seçilen satırların verilerini state'e ata
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const onRowClick = (record) => {
  //   return {
  //     onClick: () => {
  //       setDrawer({ visible: true, data: record });
  //     },
  //   };
  // };

  const onRowClick = (record) => {
    setDrawer({ visible: true, data: record });
  };

  const refreshTableData = useCallback(() => {
    // Tablodan seçilen kayıtların checkbox işaretini kaldır
    setSelectedRowKeys([]);
    setSelectedRows([]);

    // Verileri yeniden çekmek için `fetchEquipmentData` fonksiyonunu çağır
    fetchEquipmentData(0, 1);
    fetchStatistics();
  }, [body, searchTerm]); // Remove body and currentPage from dependencies

  // filtrelenmiş sütunları local storage'dan alıp state'e atıyoruz
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderPeryodikBakimV2");
    const savedVisibility = localStorage.getItem("columnVisibilityPeryodikBakimV2");
    const savedWidths = localStorage.getItem("columnWidthsPeryodikBakimV2");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    // Artık var olmayan (eski) sütun anahtarlarını ayıkla
    const validKeys = initialColumns.map((col) => col.key);
    order = order.filter((key) => validKeys.includes(key));

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

    localStorage.setItem("columnOrderPeryodikBakimV2", JSON.stringify(order));
    localStorage.setItem("columnVisibilityPeryodikBakimV2", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsPeryodikBakimV2", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });
  // filtrelenmiş sütunları local storage'dan alıp state'e atıyoruz sonu

  // sütunları local storage'a kaydediyoruz
  useEffect(() => {
    localStorage.setItem("columnOrderPeryodikBakimV2", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityPeryodikBakimV2",
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
      "columnWidthsPeryodikBakimV2",
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
  // sütunları local storage'a kaydediyoruz sonu

  // sütunların boyutlarını ayarlamak için kullanılan fonksiyon
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

  // fitrelenmiş sütunları birleştiriyoruz ve sadece görünür olanları alıyoruz ve tabloya gönderiyoruz

  const filteredColumns = mergedColumns.filter((col) => col.visible);

  // fitrelenmiş sütunları birleştiriyoruz ve sadece görünür olanları alıyoruz ve tabloya gönderiyoruz sonu

  // sütunların sıralamasını değiştirmek için kullanılan fonksiyon

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

  // sütunların sıralamasını değiştirmek için kullanılan fonksiyon sonu

  // sütunların görünürlüğünü değiştirmek için kullanılan fonksiyon

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

  // sütunların görünürlüğünü değiştirmek için kullanılan fonksiyon sonu

  // sütunları sıfırlamak için kullanılan fonksiyon

  function resetColumns() {
    localStorage.removeItem("columnOrderPeryodikBakimV2");
    localStorage.removeItem("columnVisibilityPeryodikBakimV2");
    localStorage.removeItem("columnWidthsPeryodikBakimV2");
    localStorage.removeItem("ozelAlanlarPeryodikBakim");
    window.location.reload();
  }

  // sütunları sıfırlamak için kullanılan fonksiyon sonu

  return (
    <>
      {/* <div
        style={{
          backgroundColor: "white",
          marginBottom: "15px",
          padding: "15px",
          borderRadius: "8px 8px 8px 8px",
          
        }}
      >
        <BreadcrumbComp items={breadcrumb} />
      </div> */}
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
      <Spin spinning={statisticsLoading} size="small">
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          {/* Toplam Tanım */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
              height: "112px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#5d6786", lineHeight: "20px" }}>Toplam Tanım</span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileTextOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px", lineHeight: "28px" }}>{formatStatisticValue(statistics.toplamTanim)}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "18px", fontWeight: 400 }}>Aktif bakım planı sayısı</div>
          </div>

          {/* Kritik / Gecikmiş */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
              height: "112px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#5d6786", lineHeight: "20px" }}>Kritik / Gecikmiş</span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WarningOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px", lineHeight: "28px" }}>{formatStatisticValue(statistics.kritikGecikmis)}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "18px", fontWeight: 400 }}>Hemen planlanması gerekenler</div>
          </div>

          {/* Yaklaşan Bakım */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
              height: "112px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#5d6786", lineHeight: "20px" }}>Yaklaşan Bakım</span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BellOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px", lineHeight: "28px" }}>{formatStatisticValue(statistics.yaklasanBakim)}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "18px", fontWeight: 400 }}>Uyarı eşiğine giren kayıtlar</div>
          </div>

          {/* Sadece KM Planı */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              flex: "1",
              border: "1px solid #f0f0f0",
              height: "112px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#5d6786", lineHeight: "20px" }}>Sadece KM Planı</span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DashboardOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px", lineHeight: "28px" }}>{formatStatisticValue(statistics.sadeceKm)}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "18px", fontWeight: 400 }}>Tarih kontrolü olmayan tanımlar</div>
          </div>
        </div>
      </Spin>
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
            prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
          />
          <Filters onChange={handleBodyChange} />
          {/* <TeknisyenSubmit selectedRows={selectedRows} refreshTableData={refreshTableData} />
          <AtolyeSubmit selectedRows={selectedRows} refreshTableData={refreshTableData} /> */}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
          <CreateDrawer selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 330px)",
          borderRadius: "8px 8px 8px 8px",
        }}
      >
        <Spin spinning={loading}>
          <CustomTable
            components={components}
            rowSelection={rowSelection}
            columns={filteredColumns}
            bordered
            dataSource={data}
            pagination={{
              current: currentPage,
              total: totalDataCount,
              pageSize: 10,
              showTotal: (total, range) => `Toplam ${total}`,
              showSizeChanger: false,
              showQuickJumper: true,
              onChange: (page) => handleTableChange(page),
            }}
            scroll={{ y: "calc(100vh - 470px)" }}
            rowClassName={(record) => (record.IST_DURUM_ID === 0 ? "boldRow" : "")}
          />
        </Spin>
        <EditDrawer selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
      </div>
    </>
  );
};

export default Sigorta;
