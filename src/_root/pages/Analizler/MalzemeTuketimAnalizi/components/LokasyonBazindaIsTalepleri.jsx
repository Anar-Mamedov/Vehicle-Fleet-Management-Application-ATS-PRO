import React, { useEffect, useState, useRef } from "react";
import { Table, Typography, Spin, Button, Popover, Modal, DatePicker, ConfigProvider, Tour, Input } from "antd";
import { DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import http from "../../../../../api/http.jsx";
import { Controller, useFormContext } from "react-hook-form";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import customFontBase64 from "./RobotoBase64.js";
import trTR from "antd/lib/locale/tr_TR";
import { CSVLink } from "react-csv";

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

function LokasyonBazindaIsTalepleri(props) {
  const navigate = useNavigate(); // Initialize navigate
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [bitisTarihi, setBitisTarihi] = useState();
  const [loadings, setLoadings] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [filteredData1, setFilteredData1] = useState([]);
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  const downloadPDF = () => {
    const doc = new jsPDF();

    // jsPDF içinde kullanım
    doc.addFileToVFS("Roboto-Regular.ttf", customFontBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

    doc.setFont("Roboto");

    const columns = ["Lokasyon", "Toplam İş Talebi", "Toplam İş Emri"];
    const tableData = data.map((item) => [item.LOKASYON, item.TOPLAM_IS_TALEBI, item.TOPLAM_IS_EMRI]);

    doc.autoTable({
      head: [columns],
      body: tableData,
    });

    doc.save("lokasyon_bazinda_is_talepleri.pdf");
  };

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

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın sonu

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const baslamaTarihiValue = watch("baslamaTarihi");
    const bitisTarihiValue = watch("bitisTarihi");
    const aySecimiValue = watch("aySecimi");
    const yilSecimiValue = watch("yilSecimi");

    if (!baslamaTarihiValue && !bitisTarihiValue && !aySecimiValue && !yilSecimiValue) {
      const currentYear = dayjs().year();
      const firstDayOfYear = dayjs().year(currentYear).startOf("year").format("YYYY-MM-DD");
      const lastDayOfYear = dayjs().year(currentYear).endOf("year").format("YYYY-MM-DD");
      setBaslamaTarihi(firstDayOfYear);
      setBitisTarihi(lastDayOfYear);
    } else if (baslamaTarihiValue && bitisTarihiValue) {
      setBaslamaTarihi(formatDateWithDayjs(baslamaTarihiValue));
      setBitisTarihi(formatDateWithDayjs(bitisTarihiValue));
    } else if (aySecimiValue) {
      const startOfMonth = dayjs(aySecimiValue).startOf("month");
      const endOfMonth = dayjs(aySecimiValue).endOf("month");
      setBaslamaTarihi(formatDateWithDayjs(startOfMonth));
      setBitisTarihi(formatDateWithDayjs(endOfMonth));
    } else if (yilSecimiValue) {
      const startOfYear = dayjs(yilSecimiValue).startOf("year");
      const endOfYear = dayjs(yilSecimiValue).endOf("year");
      setBaslamaTarihi(formatDateWithDayjs(startOfYear));
      setBitisTarihi(formatDateWithDayjs(endOfYear));
    }
  }, [watch("baslamaTarihi"), watch("bitisTarihi"), watch("aySecimi"), watch("yilSecimi")]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // reset();
  };

  useEffect(() => {
    if (isModalVisible === true) {
      setValue("baslamaTarihi", null);
      setValue("bitisTarihi", null);
      setValue("aySecimi", null);
      setValue("yilSecimi", null);
      // reset({
      //   baslamaTarihi: undefined,
      //   bitisTarihi: undefined,
      //   aySecimi: undefined,
      //   yilSecimi: undefined,
      // });
    }
  }, [isModalVisible]);

  const columns = [
    {
      title: "Lokasyon",
      dataIndex: "LOKASYON",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Toplam İş Talebi",
      dataIndex: "TOPLAM_IS_TALEBI",
      // width: 100,
      ellipsis: true,
    },
    {
      title: "Toplam İş Emri",
      dataIndex: "TOPLAM_IS_EMRI",
      // width: 100,
      ellipsis: true,
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetLokasyonBazindaIsEmriTalebi?startDate=${baslamaTarihi}&endDate=${bitisTarihi}`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const formattedData = response.map((item) => {
          return {
            ...item,
            key: item.ID,
          };
        });
        setData(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (baslamaTarihi && bitisTarihi) {
      fetchData();
    }
  }, [baslamaTarihi, bitisTarihi]);

  const content1 = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => showModal("Tarih Aralığı Seç")}>
        Tarih Aralığı Seç
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => showModal("Ay Seç")}>
        Ay Seç
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => showModal("Yıl Seç")}>
        Yıl Seç
      </div>
    </div>
  );

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </div>
      <Popover placement="right" content={content1} trigger="click">
        <div style={{ cursor: "pointer" }}>Süre Seçimi</div>
      </Popover>
      {/*<div style={{ cursor: "pointer" }} onClick={downloadPDF}>*/}
      {/*  İndir*/}
      {/*</div>*/}
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        Bilgi
      </div>
    </div>
  );

  const steps = [
    {
      title: "Bilgi",
      description: (
        <div
          style={{
            overflow: "auto",
            height: "100%",
            maxHeight: "200px",
          }}
        >
          <p>Belirli lokasyonlardaki ya da Atölyelerdeki iş yükünü veya taleplerin dağılımını daha iyi anlayabilmek ve buna göre kararlar alabilmek için kullanılır.</p>
        </div>
      ),

      target: () => ref1.current,
    },
  ];

  // Arama işlevselliği için handleSearch fonksiyonları
  const handleSearch1 = (e) => {
    const value = e.target.value;
    setSearchTerm1(value);
    const normalizedSearchTerm = normalizeText(value);
    if (value) {
      const filtered = data.filter((item) =>
        Object.keys(item).some((key) => item[key] && normalizeText(item[key].toString()).toLowerCase().includes(normalizedSearchTerm.toLowerCase()))
      );
      setFilteredData1(filtered);
    } else {
      setFilteredData1(data);
    }
  };

  // csv dosyası için tablo başlık oluştur

  const csvHeaders = columns.map((col) => ({
    label: col.title,
    key: col.dataIndex,
  }));

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
            Lokasyon Bazında İş talepleri / İş Emirleri Dağılımı{" "}
            {`(${baslamaTarihi && bitisTarihi ? `${formatDateWithLocale(baslamaTarihi)} / ${formatDateWithLocale(bitisTarihi)}` : ""})`}
          </Text>
          <Popover placement="bottom" content={content} trigger="click">
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
              <MoreOutlined
                style={{
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              />
            </Button>
          </Popover>
        </div>
        <div
          ref={ref1}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            overflow: "auto",
            height: "100vh",
            padding: "0px 10px 0 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input placeholder="Arama..." value={searchTerm1} onChange={handleSearch1} style={{ width: "300px" }} />

            {/*csv indirme butonu*/}
            <CSVLink data={data} headers={csvHeaders} filename={`lokasyon_bazinda_is_talebi.csv`} className="ant-btn ant-btn-primary">
              <Button type="primary" icon={<DownloadOutlined />} loading={loadings[1]} onClick={() => enterLoading(1)}>
                İndir
              </Button>
            </CSVLink>
          </div>
          <Spin spinning={isLoading}>
            <Table
              columns={columns}
              dataSource={filteredData1.length > 0 || searchTerm1 ? filteredData1 : data}
              size="small"
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                position: ["bottomRight"],
                showTotal: (total, range) => `Toplam ${total}`,
                showQuickJumper: true,
              }}
            />
          </Spin>
        </div>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        <Modal title="Tarih Seçimi" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
          {modalContent === "Tarih Aralığı Seç" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>Tarih Aralığı Seç:</div>
              <Controller
                name="baslamaTarihi"
                control={control}
                render={({ field }) => <DatePicker {...field} style={{ width: "130px" }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
              />
              {" - "}
              <Controller
                name="bitisTarihi"
                control={control}
                render={({ field }) => <DatePicker {...field} style={{ width: "130px" }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
          {modalContent === "Ay Seç" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>Ay Seç:</div>
              <Controller
                name="aySecimi"
                control={control}
                render={({ field }) => <DatePicker {...field} picker="month" style={{ width: "130px" }} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
          {modalContent === "Yıl Seç" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>Yıl Seç:</div>
              <Controller
                name="yilSecimi"
                control={control}
                render={({ field }) => <DatePicker {...field} picker="year" style={{ width: "130px" }} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
        </Modal>
        {/* Expanded Modal */}
        <Modal
          title={
            <div>
              <Text style={{ fontWeight: "500", fontSize: "17px" }}>
                Lokasyon Bazında İş talepleri / İş Emirleri Dağılımı{" "}
                {`(${baslamaTarihi && bitisTarihi ? `${formatDateWithLocale(baslamaTarihi)} / ${formatDateWithLocale(bitisTarihi)}` : ""})`}
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
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <Input placeholder="Arama..." value={searchTerm1} onChange={handleSearch1} style={{ width: "300px" }} />

              {/*csv indirme butonu*/}
              <CSVLink data={data} headers={csvHeaders} filename={`lkasyon_bazinda_is_talepleri.csv`} className="ant-btn ant-btn-primary">
                <Button type="primary" icon={<DownloadOutlined />} loading={loadings[1]} onClick={() => enterLoading(1)}>
                  İndir
                </Button>
              </CSVLink>
            </div>
            <Spin spinning={isLoading}>
              <Table
                columns={columns}
                dataSource={filteredData1.length > 0 || searchTerm1 ? filteredData1 : data}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  position: ["bottomRight"],
                  showTotal: (total, range) => `Toplam ${total}`,
                  showQuickJumper: true,
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

export default LokasyonBazindaIsTalepleri;
