import React, { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, LabelList, Bar } from "recharts";
import { Button, Popover, Spin, Typography, Modal, DatePicker, Checkbox, Tour } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import http from "../../../../../api/http.jsx";
import { FilterOutlined, MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";

const { Text } = Typography;

const monthNames = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function PersonelBazindaIsGucu(props = {}) {
  const navigate = useNavigate(); // Initialize navigate
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [bitisTarihi, setBitisTarihi] = useState();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [checkedNames, setCheckedNames] = useState({});
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [allChecked, setAllChecked] = useState(true);
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

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

  // datepicker için tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın

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

  useEffect(() => {
    const baslamaTarihiValue = watch("baslamaTarihiPersonelIsGucu");
    const bitisTarihiValue = watch("bitisTarihiPersonelIsGucu");
    const aySecimiValue = watch("aySecimiPersonelIsGucu");
    const yilSecimiValue = watch("yilSecimiPersonelIsGucu");

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
  }, [watch("baslamaTarihiPersonelIsGucu"), watch("bitisTarihiPersonelIsGucu"), watch("aySecimiPersonelIsGucu"), watch("yilSecimiPersonelIsGucu")]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetPersonelBazindaHarcananGuc?startDate=${baslamaTarihi}&endDate=${bitisTarihi}`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        // Transform the data
        const transformedData = response.map((item) => ({
          ISIM: item.ISIM,
          DAKIKA: Number(item.DAKIKA),
        }));

        setData(transformedData);
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

  const downloadPDF = () => {
    const element = document.getElementById("personel-bazinda-is-gucu");
    const opt = {
      margin: 10,
      filename: "personel_is_gucu.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // reset();
  };

  useEffect(() => {
    if (isModalVisible === true) {
      setValue("baslamaTarihiPersonelIsGucu", null);
      setValue("bitisTarihiPersonelIsGucu", null);
      setValue("aySecimiPersonelIsGucu", null);
      setValue("yilSecimiPersonelIsGucu", null);

      // reset({
      //   baslamaTarihiPersonelIsGucu: undefined,
      //   bitisTarihiPersonelIsGucu: undefined,
      //   aySecimiPersonelIsGucu: undefined,
      //   yilSecimiPersonelIsGucu: undefined,
      // });
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (data.length > 0) {
      const initialCheckedNames = data.reduce((acc, item) => {
        acc[item.ISIM] = true;
        return acc;
      }, {});
      setCheckedNames(initialCheckedNames);
      setAllChecked(true);
      setFilteredData(data);
    } else {
      // When data is empty, also set filteredData to an empty array
      setFilteredData([]);
    }
  }, [data]);

  const handleFilterModalOpen = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalVisible(false);
  };

  const handleCheckboxChange = (name) => {
    if (name === "all") {
      const newAllChecked = !allChecked;
      setAllChecked(newAllChecked);
      const newCheckedNames = Object.keys(checkedNames).reduce((acc, key) => {
        acc[key] = newAllChecked;
        return acc;
      }, {});
      setCheckedNames(newCheckedNames);
    } else {
      setCheckedNames((prev) => {
        const newCheckedNames = { ...prev, [name]: !prev[name] };
        setAllChecked(Object.values(newCheckedNames).every(Boolean));
        return newCheckedNames;
      });
    }
  };

  const applyFilter = () => {
    const newFilteredData = data.filter((item) => checkedNames[item.ISIM]);
    setFilteredData(newFilteredData);
    setIsFilterModalVisible(false);
  };

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
          <p>
            Personel Bazında Harcanan İş Gücü, bir işletmede belirli bir çalışan veya çalışan grubu tarafından ve belirli bir süre zarfında harcanan toplam iş gücünü ifade eder. Bu
            grafik genellikle şu amaçlar için kullanılır:
          </p>
          <ol>
            <li>
              <strong>Verimlilik Analizi</strong>: Her bir çalışanın veya ekiplerin ne kadar verimli çalıştığını ölçmek için.
            </li>
            <li>
              <strong>Proje Yönetimi</strong>: Belirli projelerde hangi personelin ne kadar zaman harcadığını takip etmek için.
            </li>
            <li>
              <strong>Maliyet Hesaplama</strong>: İş gücü maliyetlerini hesaplamak ve bütçelendirme yapmak için.
            </li>
            <li>
              <strong>Performans Değerlendirme</strong>: Çalışanların performansını değerlendirmek ve gerekli iyileştirmeleri belirlemek için.
            </li>
            <li>
              <strong>Kaynak Planlaması</strong>: Gelecek projeler veya işler için gerekli iş gücünü planlamak ve tahmin etmek için.
            </li>
          </ol>
        </div>
      ),

      target: () => ref1.current,
    },
  ];

  return (
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
        <Text
          title={`Personel Bazında Harcanan İş Gücü (${baslamaTarihi ? formatDate(baslamaTarihi) : ""} - ${bitisTarihi ? formatDate(bitisTarihi) : ""})`}
          style={{
            fontWeight: "500",
            fontSize: "17px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 50px)",
          }}
        >
          Personel Bazında Harcanan İş Gücü
          {` (${baslamaTarihi && bitisTarihi ? `${formatDate(baslamaTarihi)} / ${formatDate(bitisTarihi)}` : ""})`}
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
            <MoreOutlined style={{ cursor: "pointer", fontWeight: "500", fontSize: "16px" }} />
          </Button>
        </Popover>
      </div>
      {isLoading ? (
        <Spin />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            height: "100vh",
          }}
        >
          <div style={{ width: "100%", height: "calc(100% - 43px)" }}>
            <ResponsiveContainer ref={ref1} width="100%" height="100%">
              <BarChart
                width="100%"
                height="100%"
                data={filteredData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ISIM" hide={true} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="DAKIKA" stackId="a" fill="#8884d8" name="Harcanan Süre (dk.)"></Bar>
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button style={{ marginBottom: "10px" }} type="text" onClick={handleFilterModalOpen} icon={<FilterOutlined />}>
                Personel Filtrele
              </Button>
            </div>
          </div>
        </div>
      )}
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
              name="baslamaTarihiPersonelIsGucu"
              control={control}
              render={({ field }) => <DatePicker {...field} style={{ width: "130px" }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
            />
            {" - "}
            <Controller
              name="bitisTarihiPersonelIsGucu"
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
              name="aySecimiPersonelIsGucu"
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
              name="yilSecimiPersonelIsGucu"
              control={control}
              render={({ field }) => <DatePicker {...field} picker="year" style={{ width: "130px" }} placeholder="Tarih seçiniz" />}
            />
          </div>
        )}
      </Modal>
      {/* Filter Modal */}
      <Modal title="Personelleri Filtrele" width={800} centered destroyOnClose open={isFilterModalVisible} onOk={applyFilter} onCancel={handleFilterModalClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "10px",
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              marginBottom: "5px",
              borderBottom: "1px solid gray",
              paddingBottom: "5px",
              width: "70px",
            }}
          >
            <Checkbox checked={allChecked} onChange={() => handleCheckboxChange("all")}>
              Tümü
            </Checkbox>
          </div>
          {data.map((item) => (
            <div key={item.ISIM}>
              <Checkbox checked={checkedNames[item.ISIM]} onChange={() => handleCheckboxChange(item.ISIM)}>
                {item.ISIM}
              </Checkbox>
            </div>
          ))}
        </div>
      </Modal>

      {/* Expanded Modal */}
      <Modal
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "98%",
            }}
          >
            <Text
              title={`Personel Bazında Harcanan İş Gücü (${baslamaTarihi ? formatDate(baslamaTarihi) : ""} - ${bitisTarihi ? formatDate(bitisTarihi) : ""})`}
              style={{
                fontWeight: "500",
                fontSize: "17px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 50px)",
              }}
            >
              Personel Bazında Harcanan İş Gücü
              {` (${baslamaTarihi && bitisTarihi ? `${formatDate(baslamaTarihi)} / ${formatDate(bitisTarihi)}` : ""})`}
            </Text>
            <PrinterOutlined style={{ cursor: "pointer", fontSize: "20px" }} onClick={downloadPDF} />
          </div>
        }
        centered
        open={isExpandedModalVisible}
        onOk={() => setIsExpandedModalVisible(false)}
        onCancel={() => setIsExpandedModalVisible(false)}
        width="90%"
        destroyOnClose
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            height: "calc(100vh - 180px)",
          }}
        >
          <ResponsiveContainer id="personel-bazinda-is-gucu" width="100%" height="100%">
            <BarChart
              width="100%"
              height="100%"
              data={filteredData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="ISIM"
                angle={-45}
                textAnchor="end"
                height={100}
                interval="preserveStartEnd"
                tick={{
                  fontSize: 12,
                  dy: 10,
                }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="DAKIKA" stackId="a" fill="#8884d8" name="Harcanan Süre (dk.)"></Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button type="text" onClick={handleFilterModalOpen} icon={<FilterOutlined />}>
              Personel Filtrele
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PersonelBazindaIsGucu;
