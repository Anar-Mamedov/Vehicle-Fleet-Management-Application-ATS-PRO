import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import MalzemeDepoDagilimi from "./components/ContextMenu/components/MalzemeDepoDagilimi";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Filters from "./filter/Filters";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

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

const Malzemeler = ({ isSelectionMode = false, onRowSelect, wareHouseId, isCikisTransfer = false }) => {
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
  const [customFields, setCustomFields] = useState([]); // State to store custom field definitions
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  useEffect(() => {
    if (body !== prevBodyRef.current) {
      fetchData(0, 1);
      prevBodyRef.current = body;
    }
  }, [body]);

  const prevBodyRef = useRef(body);

  // API Data Fetching with diff and setPointId
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (isCikisTransfer) {
        // For isCikisTransfer = true, use siraNo
        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.siraNo || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.siraNo || 0;
        } else {
          currentSetPointId = 0;
        }
      } else {
        // For isCikisTransfer = false, use malzemeId (original logic)
        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.malzemeId || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.malzemeId || 0;
        } else {
          currentSetPointId = 0;
        }
      }

      const endpoint = isCikisTransfer
        ? `WareHouseManagement/GetMaterialListByWareHouseId?setPointId=${currentSetPointId}&diff=${diff}&parameter=${searchTerm}&wareHouseId=${wareHouseId || 0}`
        : `Material/GetMaterialList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&wareHouseId=${wareHouseId || 0}`;

      const response = await AxiosInstance.post(endpoint, body.filters?.customfilter || {});

      const total = response.data.total_count;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData = response.data.materialList.map((item) => ({
        ...item,
        key: item.malzemeId,
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

  // Fetch custom field definitions from the backend
  const fetchCustomFields = async () => {
    try {
      const response = await AxiosInstance.get("CustomField/GetCustomFields?form=MALZEME");
      if (response.data) {
        // API returns a single object with field names directly as properties
        // Store it directly as is
        setCustomFields(response.data);
      }
    } catch (error) {
      console.error("Error fetching custom fields:", error);
      message.error("Özel alanlar yüklenirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchData(0, 1);
    fetchCustomFields(); // Fetch custom fields when component mounts
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

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    if (isSelectionMode && onRowSelect) {
      onRowSelect(newSelectedRows);
    }
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
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
      key: "malzemeKod",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text, record) => <a onClick={() => onRowClick(record)}>{text}</a>,
      sorter: (a, b) => {
        if (a.malzemeKod === null) return -1;
        if (b.malzemeKod === null) return 1;
        return a.malzemeKod.localeCompare(b.malzemeKod);
      },
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "tanim",
      key: "tanim",
      width: 130,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tanim === null) return -1;
        if (b.tanim === null) return 1;
        return a.tanim.localeCompare(b.tanim);
      },
    },
    {
      title: t("malzemeTipi"),
      dataIndex: "malzemeTipKodText",
      key: "malzemeTipKodText",
      width: 130,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.malzemeTipKodText === null) return -1;
        if (b.malzemeTipKodText === null) return 1;
        return a.malzemeTipKodText.localeCompare(b.malzemeTipKodText);
      },
    },
    {
      title: t("stokMiktar"),
      dataIndex: "stokMiktar",
      key: "stokMiktar",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (text, record) => (
        <a
          onClick={() => {
            // Create a temporary div to render MalzemeDepoDagilimi
            const tempDiv = document.createElement("div");
            document.body.appendChild(tempDiv);

            // Create the root
            const root = createRoot(tempDiv);

            // Create a custom React component to handle auto-clicking
            const AutoClickModal = () => {
              const containerRef = React.useRef(null);

              React.useEffect(() => {
                // Auto-click on the div inside MalzemeDepoDagilimi
                if (containerRef.current) {
                  const clickableDiv = containerRef.current.querySelector('div[style*="cursor: pointer"]');
                  if (clickableDiv) {
                    clickableDiv.click();
                  }
                }
              }, []);

              // When modal closes, remove the temporary div
              const handleHidePopover = () => {
                root.unmount();
                document.body.removeChild(tempDiv);
              };

              return (
                <div ref={containerRef}>
                  <MalzemeDepoDagilimi selectedRows={[record]} fromTableCell={true} refreshTableData={refreshTableData} hidePopover={handleHidePopover} />
                </div>
              );
            };

            // Render the custom component
            root.render(<AutoClickModal />);
          }}
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        if (a.stokMiktar === null) return -1;
        if (b.stokMiktar === null) return 1;
        return a.stokMiktar - b.stokMiktar;
      },
    },
    {
      title: t("birim"),
      dataIndex: "birim",
      key: "birim",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.birim === null) return -1;
        if (b.birim === null) return 1;
        return a.birim.localeCompare(b.birim);
      },
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: "fiyat",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.fiyat === null) return -1;
        if (b.fiyat === null) return 1;
        return a.fiyat - b.fiyat;
      },
    },
    {
      title: t("tedarikci"),
      dataIndex: "tedarikci",
      key: "tedarikci",
      width: 150,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tedarikci === null) return -1;
        if (b.tedarikci === null) return 1;
        return a.tedarikci.localeCompare(b.tedarikci);
      },
    },
    {
      title: t("seriNo"),
      dataIndex: "seriNo",
      key: "seriNo",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.seriNo === null) return -1;
        if (b.seriNo === null) return 1;
        return a.seriNo - b.seriNo;
      },
    },
    {
      title: t("barkodNo"),
      dataIndex: "barkodNo",
      key: "barkodNo",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.barkodNo === null) return -1;
        if (b.barkodNo === null) return 1;
        return a.barkodNo - b.barkodNo;
      },
    },
    {
      title: t("depo"),
      dataIndex: "depo",
      key: "depo",
      width: 150,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.depo === null) return -1;
        if (b.depo === null) return 1;
        return a.depo.localeCompare(b.depo);
      },
    },
    {
      title: t("bolum"),
      dataIndex: "bolum",
      key: "bolum",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.bolum === null) return -1;
        if (b.bolum === null) return 1;
        return a.bolum.localeCompare(b.bolum);
      },
    },
    {
      title: t("raf"),
      dataIndex: "raf",
      key: "raf",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.raf === null) return -1;
        if (b.raf === null) return 1;
        return a.raf.localeCompare(b.raf);
      },
    },
    {
      title: t("kritikMiktar"),
      dataIndex: "kritikMiktar",
      key: "kritikMiktar",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.kritikMiktar === null) return -1;
        if (b.kritikMiktar === null) return 1;
        return a.kritikMiktar - b.kritikMiktar;
      },
    },
    {
      title: t("sonAlisTarihi"),
      dataIndex: "sonAlisTarih",
      key: "sonAlisTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
      sorter: (a, b) => {
        if (a.sonAlisTarih === null) return -1;
        if (b.sonAlisTarih === null) return 1;
        return new Date(a.sonAlisTarih) - new Date(b.sonAlisTarih);
      },
    },
    {
      title: t("sonAlinanFirma"),
      dataIndex: "sonAlinanFirma",
      key: "sonAlinanFirma",
      width: 150,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.sonAlinanFirma === null) return -1;
        if (b.sonAlinanFirma === null) return 1;
        return a.sonAlinanFirma.localeCompare(b.sonAlinanFirma);
      },
    },
    {
      title: t("sonAlinanFiyat"),
      dataIndex: "sonFiyat",
      key: "sonFiyat",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.sonFiyat === null) return -1;
        if (b.sonFiyat === null) return 1;
        return a.sonFiyat - b.sonFiyat;
      },
    },
    {
      title: t("aktif"),
      dataIndex: "aktif",
      key: "aktif",
      width: 80,
      ellipsis: true,
      visible: true,
      render: (text, record) => <Checkbox checked={record.aktif} readOnly />,
    },
    {
      title: t("kdvOrani"),
      dataIndex: "kdvOran",
      key: "kdvOran",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.kdvOran === null) return -1;
        if (b.kdvOran === null) return 1;
        return a.kdvOran - b.kdvOran;
      },
    },
    {
      title: t("girenMiktar"),
      dataIndex: "girenMiktar",
      key: "girenMiktar",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.girenMiktar === null) return -1;
        if (b.girenMiktar === null) return 1;
        return a.girenMiktar - b.girenMiktar;
      },
    },
    {
      title: t("cikanMiktar"),
      dataIndex: "cikanMiktar",
      key: "cikanMiktar",
      width: 100,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.cikanMiktar === null) return -1;
        if (b.cikanMiktar === null) return 1;
        return a.cikanMiktar - b.cikanMiktar;
      },
    },
    {
      title: t("yedekParca"),
      dataIndex: "yedekParca",
      key: "yedekParca",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (text, record) => <Checkbox checked={record.yedekParca} readOnly />,
    },
    {
      title: t("sarfMalz"),
      dataIndex: "sarfMlz",
      key: "sarfMlz",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (text, record) => <Checkbox checked={record.sarfMlz} readOnly />,
    },
    {
      title: t("demirbas"),
      dataIndex: "demirBas",
      key: "demirBas",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (text, record) => <Checkbox checked={record.demirBas} readOnly />,
    },
    /* {
      title: t("degistirme"),
      dataIndex: "degistirme",
      key: "degistirme",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => <p className="text-secondary">{text}</p>,
    },
    {
      title: t("olusturma"),
      dataIndex: "olusturma",
      key: "olusturma",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => <p className="text-success">{text}</p>,
    }, */
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 200,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },
  ];

  // Create combined columns with custom fields
  const getCombinedColumns = useCallback(() => {
    const combinedColumns = [...initialColumns];

    // Add custom field columns if available
    if (customFields) {
      // Process custom fields 1-8 (string fields)
      for (let i = 1; i <= 8; i++) {
        const fieldName = customFields[`ozelAlan${i}`];

        // Add column regardless of whether field name is empty or not
        combinedColumns.push({
          title: fieldName || "",
          dataIndex: `ozelAlan${i}`,
          key: `ozelAlan${i}`,
          width: 120,
          ellipsis: true,
          visible: true,
          sorter: (a, b) => {
            if (a[`ozelAlan${i}`] === null) return -1;
            if (b[`ozelAlan${i}`] === null) return 1;
            return String(a[`ozelAlan${i}`]).localeCompare(String(b[`ozelAlan${i}`]));
          },
        });
      }

      // Process custom fields 9-10 (reference fields)
      for (let i = 9; i <= 10; i++) {
        const fieldName = customFields[`ozelAlan${i}`];

        // Add column regardless of whether field name is empty or not
        combinedColumns.push({
          title: fieldName || "",
          dataIndex: `ozelAlan${i}`,
          key: `ozelAlan${i}`,
          width: 120,
          ellipsis: true,
          visible: true,
          sorter: (a, b) => {
            if (a[`ozelAlan${i}`] === null) return -1;
            if (b[`ozelAlan${i}`] === null) return 1;
            return String(a[`ozelAlan${i}`]).localeCompare(String(b[`ozelAlan${i}`]));
          },
        });
      }

      // Process custom fields 11-12 (numeric fields)
      for (let i = 11; i <= 12; i++) {
        const fieldName = customFields[`ozelAlan${i}`];

        // Add column regardless of whether field name is empty or not
        combinedColumns.push({
          title: fieldName || "",
          dataIndex: `ozelAlan${i}`,
          key: `ozelAlan${i}`,
          width: 120,
          ellipsis: true,
          visible: true,
          sorter: (a, b) => {
            if (a[`ozelAlan${i}`] === null) return -1;
            if (b[`ozelAlan${i}`] === null) return 1;
            return Number(a[`ozelAlan${i}`]) - Number(b[`ozelAlan${i}`]);
          },
        });
      }
    }

    return combinedColumns;
  }, [customFields, t]);

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
    const savedOrder = localStorage.getItem("columnOrderMalzemeDepo");
    const savedVisibility = localStorage.getItem("columnVisibilityMalzemeDepo");
    const savedWidths = localStorage.getItem("columnWidthsMalzemeDepo");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    const combinedCols = getCombinedColumns();

    combinedCols.forEach((col) => {
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

    localStorage.setItem("columnOrderMalzemeDepo", JSON.stringify(order));
    localStorage.setItem("columnVisibilityMalzemeDepo", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsMalzemeDepo", JSON.stringify(widths));

    return order
      .map((key) => {
        const column = combinedCols.find((col) => col.key === key);
        return column ? { ...column, visible: visibility[key], width: widths[key] } : null;
      })
      .filter(Boolean);
  });

  // Update columns when custom fields change
  useEffect(() => {
    const combinedCols = getCombinedColumns();
    const savedOrder = localStorage.getItem("columnOrderMalzemeDepo");
    const savedVisibility = localStorage.getItem("columnVisibilityMalzemeDepo");
    const savedWidths = localStorage.getItem("columnWidthsMalzemeDepo");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    // Add any new columns to the saved order
    combinedCols.forEach((col) => {
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

    localStorage.setItem("columnOrderMalzemeDepo", JSON.stringify(order));
    localStorage.setItem("columnVisibilityMalzemeDepo", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsMalzemeDepo", JSON.stringify(widths));

    const updatedColumns = order
      .map((key) => {
        const column = combinedCols.find((col) => col.key === key);
        return column ? { ...column, visible: visibility[key], width: widths[key] } : null;
      })
      .filter(Boolean);

    setColumns(updatedColumns);
  }, [customFields, getCombinedColumns]);

  // Save columns to localStorage when they change
  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem("columnOrderMalzemeDepo", JSON.stringify(columns.map((col) => col.key)));
      localStorage.setItem(
        "columnVisibilityMalzemeDepo",
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
        "columnWidthsMalzemeDepo",
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
    }
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
    localStorage.removeItem("columnOrderMalzemeDepo");
    localStorage.removeItem("columnVisibilityMalzemeDepo");
    localStorage.removeItem("columnWidthsMalzemeDepo");
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
    setBody((state) => ({
      ...state,
      [type]: newBody,
    }));
    setCurrentPage(1); // Filtreleme yapıldığında sayfa numarasını 1'e ayarla
  }, []);
  // filtreleme işlemi için kullanılan useEffect son

  return (
    <div>
      <ConfigProvider locale={currentLocale}>
        <FormProvider {...formMethods}>
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
                  {columns.map((col) => (
                    <div style={{ display: "flex", gap: "10px" }} key={col.key}>
                      <Checkbox checked={col.visible || false} onChange={(e) => toggleVisibility(col.key, e.target.checked)} />
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
              <Filters onChange={handleBodyChange} />
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
            </div>
            {!isSelectionMode && (
              <div style={{ display: "flex", gap: "10px" }}>
                <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
                <AddModal selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              height: isSelectionMode ? "calc(100vh - 250px)" : "calc(100vh - 200px)",
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
                  showTotal: (total) => `Toplam ${total}`,
                }}
                scroll={{ y: isSelectionMode ? "calc(100vh - 385px)" : "calc(100vh - 335px)" }}
              />
            </Spin>
            {!isSelectionMode && (
              <UpdateModal selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
            )}
          </div>
        </FormProvider>
      </ConfigProvider>
    </div>
  );
};

export default Malzemeler;
