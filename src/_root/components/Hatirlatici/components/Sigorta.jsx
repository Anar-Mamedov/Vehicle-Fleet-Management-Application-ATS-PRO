import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, Progress, message } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import UpdateModal from "../../../pages/vehicles-control/sigorta/UpdateModal";
import { PlakaProvider } from "../../../../context/plakaSlice";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";

const { Text } = Typography;

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setValue } = useFormContext();
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [editDrawer1Visible, setEditDrawer1Visible] = useState(false);
  const [editDrawer1Data, setEditDrawer1Data] = useState(null);

  // edit drawer için
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });
  // edit drawer için son

  const [selectedRows, setSelectedRows] = useState([]);

  // UpdateModal için state'ler
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedRowForUpdate, setSelectedRowForUpdate] = useState(null);

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
  //       localStorage.setItem("ozelAlanlar", JSON.stringify(response));
  //       setLabel(response); // Örneğin, API'den dönen yanıt doğrudan etiket olacak
  //     } catch (error) {
  //       console.error("API isteğinde hata oluştu:", error);
  //       setLabel("Hata! Veri yüklenemedi."); // Hata durumunda kullanıcıya bilgi verme
  //     }
  //   };
  //
  //   fetchData();
  // }, [drawer.visible]);

  const ozelAlanlar = JSON.parse(localStorage.getItem("ozelAlanlar"));

  // Özel Alanların nameleri backend çekmek için api isteği sonu
  const initialColumns = [
    {
      title: "Plaka",
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
      title: "Sigorta",
      dataIndex: "sigorta",
      key: "sigorta",
      width: 190,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık

      sorter: (a, b) => {
        if (a.sigorta === null) return -1;
        if (b.sigorta === null) return 1;
        return a.sigorta.localeCompare(b.sigorta);
      },
    },

    {
      title: "Durum",
      dataIndex: "aktif",
      key: "aktif",
      width: 100,
      ellipsis: true,

      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.aktif === null && b.aktif === null) return 0;
        if (a.aktif === null) return -1;
        if (b.aktif === null) return 1;
        return a.aktif === b.aktif ? 0 : a.aktif ? -1 : 1;
      },
      render: (text, record) => {
        const circleStyle = {
          backgroundColor: record.aktif ? "green" : "red", // KAPALI true ise kırmızı, değilse yeşil
          borderRadius: "50%",
          display: "inline-block",
          width: "10px",
          height: "10px",
        };
        return (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={circleStyle}></span>
            {/*<span style={{ marginLeft: "5px" }}>{text}</span>*/}
          </div>
        );
      },
    },
    {
      title: "Başlangıç Tarihi",
      dataIndex: "baslangicTarih",
      key: "baslangicTarih",
      width: 110,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.baslangicTarih === null) return -1;
        if (b.baslangicTarih === null) return 1;
        return a.baslangicTarih.localeCompare(b.baslangicTarih);
      },

      visible: true, // Varsayılan olarak açık
      render: (text) => formatDate(text),
    },
    {
      title: "Bitiş Tarihi",
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
      title: "Kalan Süre (Gün)",
      dataIndex: "kalanSure",
      key: "kalanSure",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.kalanSure === null) return -1;
        if (b.kalanSure === null) return 1;
        return a.kalanSure - b.kalanSure;
      },
      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const baslangicTarih = dayjs(record.baslangicTarih);
        const bitisTarih = dayjs(record.bitisTarih);
        const maxDays = baslangicTarih.isValid() && bitisTarih.isValid() ? bitisTarih.diff(baslangicTarih, "day") : 0;
        const numericValue = typeof text === "number" ? text : Number(text);
        const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
        const clampedValue = Math.max(safeValue, 0);
        const percent = maxDays > 0 ? Math.min((clampedValue / maxDays) * 100, 100) : 0;

        return <Progress percent={percent} steps={8} format={() => `${clampedValue}`} />;
      },
    },
    {
      title: "Poliçe No",
      dataIndex: "policeNo",
      key: "policeNo",
      width: 200,
      ellipsis: true,

      visible: true, // Varsayılan olarak açık
      sorter: (a, b) => {
        if (a.policeNo === null && b.policeNo === null) return 0;
        if (a.policeNo === null) return 1;
        if (b.policeNo === null) return -1;
        return a.policeNo.localeCompare(b.policeNo);
      },
    },
    {
      title: "Tutar",
      dataIndex: "tutar",
      key: "tutar",
      width: 150,
      sorter: (a, b) => {
        if (a.tutar === null) return -1;
        if (b.tutar === null) return 1;
        return a.tutar - b.tutar;
      },
      ellipsis: true,

      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const format = record?.tutarFormat ? Math.min(Math.max(Number(record.tutarFormat), 0), 20) : undefined;
        return <span>{formatNumberWithLocale(text, format, format)}</span>;
      },
    },
    {
      title: "Acenta",
      dataIndex: "acenta",
      key: "acenta",
      width: 300,
      sorter: (a, b) => {
        if (a.acenta === null && b.acenta === null) return 0;
        if (a.acenta === null) return -1;
        if (b.acenta === null) return 1;
        return a.acenta.localeCompare(b.acenta);
      },
      ellipsis: true,

      visible: true, // Varsayılan olarak açık
    },

    {
      title: "Araç Bedeli",
      dataIndex: "aracBedeli",
      key: "aracBedeli",
      width: 150,
      sorter: (a, b) => {
        if (a.aracBedeli === null) return -1;
        if (b.aracBedeli === null) return 1;
        return a.aracBedeli - b.aracBedeli;
      },
      ellipsis: true,

      visible: true, // Varsayılan olarak açık
      render: (text, record) => {
        const format = record?.tutarFormat ? Math.min(Math.max(Number(record.tutarFormat), 0), 20) : undefined;
        return <span>{formatNumberWithLocale(text, format, format)}</span>;
      },
    },

    {
      title: "Hasarsızlık İndirimi",
      dataIndex: "hasarIndirimi",
      key: "hasarIndirimi",
      width: 150,
      sorter: (a, b) => {
        if (a.hasarIndirimi === null) return -1;
        if (b.hasarIndirimi === null) return 1;
        return a.hasarIndirimi - b.hasarIndirimi;
      },
      ellipsis: true,

      visible: true, // Varsayılan olarak açık
      render: (text) => <span>{formatNumberWithLocale(text)}</span>,
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

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  // API Data Fetching with diff and setPointId
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff !== 0) {
        // Only calculate setPointId if not initial load
        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.siraNo || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.siraNo || 0;
        }
      }

      const response = await AxiosInstance.get(`Insurance/GetInsuranceReminderItems?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`);

      if (response.data) {
        setTotalPages(response.data.page);
        setTotalDataCount(response.data.recordCount);

        const formattedData = response.data.list.map((item) => ({
          ...item,
          key: item.siraNo,
        }));

        if (formattedData.length > 0) {
          setData(formattedData);
          setCurrentPage(targetPage);
        } else {
          message.warning("No data found.");
          setData([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (navigator.onLine) {
        message.error("Hata Mesajı: " + error.message);
      } else {
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData(0, 1); // Initial load with diff=0 and page=1
  }, []);

  // Search handling
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (searchTerm !== body.keyword) {
        setBody((prev) => ({ ...prev, keyword: searchTerm }));
        fetchData(0, 1);
      }
    }, 2000);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Handle table change for pagination
  const handleTableChange = (pagination) => {
    if (!pagination || typeof pagination.current !== "number") return;

    const newPage = pagination.current;
    const diff = newPage - currentPage;

    if (diff !== 0) {
      // Only fetch if actually changing pages
      fetchData(diff, newPage);
    }
  };

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
    setSelectedRowForUpdate(record);
    setUpdateModalVisible(true);
  };

  const refreshTableData = useCallback(() => {
    // Sayfa numarasını 1 yap
    // setCurrentPage(1);

    // `body` içerisindeki filtreleri ve arama terimini sıfırla
    // setBody({
    //   keyword: "",
    //   filters: {},
    // });
    // setSearchTerm("");

    // Tablodan seçilen kayıtların checkbox işaretini kaldır
    setSelectedRowKeys([]);
    setSelectedRows([]);

    // Verileri yeniden çekmek için `fetchEquipmentData` fonksiyonunu çağır
    fetchData(0, 1);
    // Burada `body` ve `currentPage`'i güncellediğimiz için, bu değerlerin en güncel hallerini kullanarak veri çekme işlemi yapılır.
    // Ancak, `fetchEquipmentData` içinde `body` ve `currentPage`'e bağlı olarak veri çekiliyorsa, bu değerlerin güncellenmesi yeterli olacaktır.
    // Bu nedenle, doğrudan `fetchEquipmentData` fonksiyonunu çağırmak yerine, bu değerlerin güncellenmesini bekleyebiliriz.
  }, []);

  // filtrelenmiş sütunları local storage'dan alıp state'e atıyoruz
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrder");
    const savedVisibility = localStorage.getItem("columnVisibility");
    const savedWidths = localStorage.getItem("columnWidths");

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

    localStorage.setItem("columnOrder", JSON.stringify(order));
    localStorage.setItem("columnVisibility", JSON.stringify(visibility));
    localStorage.setItem("columnWidths", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });
  // filtrelenmiş sütunları local storage'dan alıp state'e atıyoruz sonu

  // sütunları local storage'a kaydediyoruz
  useEffect(() => {
    localStorage.setItem("columnOrder", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibility",
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
      "columnWidths",
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
    localStorage.removeItem("columnOrder");
    localStorage.removeItem("columnVisibility");
    localStorage.removeItem("columnWidths");
    localStorage.removeItem("ozelAlanlar");
    window.location.reload();
  }

  // sütunları sıfırlamak için kullanılan fonksiyon sonu

  return (
    <>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "10px",
          padding: "0 5px",
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
          {/* <TeknisyenSubmit selectedRows={selectedRows} refreshTableData={refreshTableData} />
          <AtolyeSubmit selectedRows={selectedRows} refreshTableData={refreshTableData} /> */}
        </div>
        <div style={{ display: "flex", gap: "10px" }}></div>
      </div>
      <Spin spinning={loading}>
        <CustomTable
          components={components}
          rowSelection={rowSelection}
          columns={filteredColumns}
          dataSource={data}
          onChange={handleTableChange}
          pagination={{
            current: currentPage,
            total: totalDataCount,
            pageSize: 10,
            showSizeChanger: false,
            position: ["bottomRight"],
            showTotal: (total) => `Toplam ${total}`,
            showQuickJumper: true,
          }}
          scroll={{ y: "calc(100vh - 370px)" }}
          rowClassName={(record) => (record.IST_DURUM_ID === 0 ? "boldRow" : "")}
        />
      </Spin>

      {/* UpdateModal bileşeni */}
      <PlakaProvider>
        <UpdateModal
          updateModal={updateModalVisible}
          setUpdateModal={setUpdateModalVisible}
          id={selectedRowForUpdate?.siraNo}
          setStatus={() => {}}
          selectedRow={selectedRowForUpdate ? { ...selectedRowForUpdate, key: selectedRowForUpdate.siraNo } : null}
          onDrawerClose={() => {
            setUpdateModalVisible(false);
            setSelectedRowForUpdate(null);
            refreshTableData();
          }}
          drawerVisible={updateModalVisible}
          onRefresh={refreshTableData}
        />
      </PlakaProvider>
    </>
  );
};

export default Sigorta;
