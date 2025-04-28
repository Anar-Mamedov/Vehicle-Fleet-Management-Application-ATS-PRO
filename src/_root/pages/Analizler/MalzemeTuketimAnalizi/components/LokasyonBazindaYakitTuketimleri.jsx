import React, { useEffect, useState, useRef } from "react";
import { Table, Typography, Spin, Button, Popover, Modal, ConfigProvider, Tour, Input } from "antd";
import { DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../api/http.jsx";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import trTR from "antd/lib/locale/tr_TR";
import { t } from "i18next";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Text } = Typography;

// Türkçe karakterleri İngilizce karşılıkları ile değiştiren fonksiyon
const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
};

function LokasyonBazindaYakitTuketimleri(props) {
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [loadings, setLoadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [popoverVisible, setPopoverVisible] = useState(false); // Popover için state
  const [tourVisible, setTourVisible] = useState(false); // Tour için state
  const ref1 = useRef(null);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state

  // State'ler
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0); // Toplam kayıt sayısı

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  // sistemin locale'una göre tarih formatlamasını yapar
  const formatDateWithLocale = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(navigator.language).format(date);
  };

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın

  useEffect(() => {
    // Format the date based on the user's locale
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace("2021", "YYYY").replace("21", "DD").replace("11", "MM"));

    // Format the time based on the user's locale
    const timeFormatter = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
    });
    const sampleTime = new Date(2021, 10, 21, 13, 45); // Use a sample time, e.g., 13:45
    const formattedSampleTime = timeFormatter.format(sampleTime);

    // Check if the formatted time contains AM/PM, which implies a 12-hour format
    const is12HourFormat = /AM|PM/.test(formattedSampleTime);
    setLocaleTimeFormat(is12HourFormat ? "hh:mm A" : "HH:mm");
  }, []);

  const columns = [
    {
      title: t("Lokasyon"),
      dataIndex: "lokasyon",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.lokasyon === null && b.lokasyon === null) return 0;
        if (a.lokasyon === null) return 1;
        if (b.lokasyon === null) return -1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },
    {
      title: t("aracSayisi"),
      dataIndex: "toplamAracSayisi",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.toplamAracSayisi === null && b.toplamAracSayisi === null) return 0;
        if (a.toplamAracSayisi === null) return 1;
        if (b.toplamAracSayisi === null) return -1;
        return a.toplamAracSayisi - b.toplamAracSayisi;
      },
    },
    {
      title: t("toplamMiktar"),
      dataIndex: "toplamMiktar",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.toplamMiktar === null && b.toplamMiktar === null) return 0;
        if (a.toplamMiktar === null) return 1;
        if (b.toplamMiktar === null) return -1;
        return a.toplamMiktar - b.toplamMiktar;
      },
    },
    {
      title: t("toplamTutar"),
      dataIndex: "toplamTutar",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.toplamTutar === null && b.toplamTutar === null) return 0;
        if (a.toplamTutar === null) return 1;
        if (b.toplamTutar === null) return -1;
        return a.toplamTutar - b.toplamTutar;
      },
    },

    {
      title: t("toplamMesafe"),
      dataIndex: "toplamMesafe",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.toplamMesafe === null && b.toplamMesafe === null) return 0;
        if (a.toplamMesafe === null) return 1;
        if (b.toplamMesafe === null) return -1;
        return a.toplamMesafe - b.toplamMesafe;
      },
    },

    {
      title: t("ortalamaTuketim"),
      dataIndex: "toplamTuketim",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.toplamTuketim === null && b.toplamTuketim === null) return 0;
        if (a.toplamTuketim === null) return 1;
        if (b.toplamTuketim === null) return -1;
        return a.toplamTuketim - b.toplamTuketim;
      },
    },
  ];

  const lokasyonId = watch("locationValues");
  const plakaValues = watch("plakaValues");
  const aracTipiValues = watch("aracTipiValues");
  const departmanValues = watch("departmanValues");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  const startYear = baslangicTarihi ? dayjs(baslangicTarihi).year() : 0;
  const endYear = bitisTarihi ? dayjs(bitisTarihi).year() : 0;

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      plaka: plakaValues || "",
      aracTipi: aracTipiValues || "",
      lokasyon: lokasyonId || "",
      departman: departmanValues || "",
      startDate: baslangicTarihi || null,
      endDate: bitisTarihi || null,
      startYear: startYear,
      endYear: endYear,
      parameterType: 1,
      searchTerm: searchTerm || null,
    };
    try {
      const response = await AxiosInstance.post(`ModuleAnalysis/FuelAnalysis/GetFuelAnalysisInfoByType?type=8&page=${currentPage}&pageSize=${pageSize}`, body);
      const formattedData = response.data.list.map((item) => ({
        ...item,
        key: item.tbLokasyonId,
      }));
      setData(formattedData);
      setTotalRecords(response.data.recordCount); // Toplam kayıt sayısını set ediyoruz
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lokasyonId, plakaValues, aracTipiValues, departmanValues, baslangicTarihi, bitisTarihi, currentPage, pageSize, searchTerm]);

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
    </div>
  );

  const steps = [
    // ... adımlar ...
  ];

  // Arama işlevselliği için handleSearch fonksiyonu (sunucu tarafında arama)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Arama yapıldığında sayfayı 1'e sıfırla
  };

  // Bileşen başlığını bir değişkene atayın
  const componentTitle = t("lokasyonBazindaYakitTuketimleri");

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

  return (
    <ConfigProvider locale={trTR}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "5px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
          <Text style={{ fontWeight: "500", fontSize: "17px" }}>
            {componentTitle} {`(${baslangicTarihi && bitisTarihi ? `${formatDateWithLocale(baslangicTarihi)} / ${formatDateWithLocale(bitisTarihi)}` : ""})`}
          </Text>
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
        <div
          ref={ref1}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            overflow: "hidden",
            padding: "0px 10px 0 10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            {/*<Input placeholder="Arama..." value={searchTerm} onChange={handleSearch} style={{ width: "300px" }} />*/}

            {/* İndirme butonunu güncelleyin */}
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={loadings[1]}
              onClick={() => {
                enterLoading(1);
                handleXLSXDownload();
              }}
            >
              İndir
            </Button>
          </div>
          <div style={{ width: "100%", height: "calc(100% - 5px)", overflow: "auto" }}>
            <Spin spinning={isLoading}>
              <Table
                columns={columns}
                dataSource={data}
                size="small"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalRecords, // Toplam kayıt sayısı
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                  showTotal: (total, range) => `Toplam ${totalRecords} kayıt`,
                  showQuickJumper: true,
                  position: ["bottomRight"],
                }}
                scroll={{ y: "100vh" }}
              />
            </Spin>
          </div>
        </div>
        <Tour open={tourVisible} onClose={() => setTourVisible(false)} steps={steps} />

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
                justifyContent: "flex-end",
                marginBottom: "15px",
              }}
            >
              {/*<Input placeholder="Arama..." value={searchTerm} onChange={handleSearch} style={{ width: "300px" }} />*/}

              {/* İndirme butonunu güncelleyin */}
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                loading={loadings[1]}
                onClick={() => {
                  enterLoading(1);
                  handleXLSXDownload();
                }}
              >
                İndir
              </Button>
            </div>
            <Spin spinning={isLoading}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: totalRecords,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                  showTotal: (total, range) => `Toplam ${totalRecords} kayıt`,
                  showQuickJumper: true,
                  position: ["bottomRight"],
                }}
                scroll={{ y: "calc(100vh - 380px)" }}
              />
            </Spin>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default LokasyonBazindaYakitTuketimleri;
