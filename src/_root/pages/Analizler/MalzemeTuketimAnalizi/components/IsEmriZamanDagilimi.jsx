import React, { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button, Popover, Spin, Typography, Modal, DatePicker, Tour } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import http from "../../../../../api/http.jsx";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";

const { Text } = Typography;

const monthNames = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function IsEmriZamanDagilimi(props = {}) {
  const navigate = useNavigate(); // Initialize navigate
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY"); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default time format
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [bitisTarihi, setBitisTarihi] = useState();
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [visibleSeries, setVisibleSeries] = useState({
    AYLIK_BAKIM_ISEMRI_MALIYET: true,
  });
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
    const baslamaTarihiValue = watch("baslamaTarihiIsEmriZaman");
    const bitisTarihiValue = watch("bitisTarihiIsEmriZaman");
    const aySecimiValue = watch("aySecimiIsEmriZaman");
    const yilSecimiValue = watch("yilSecimiIsEmriZaman");

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
  }, [watch("baslamaTarihiIsEmriZaman"), watch("bitisTarihiIsEmriZaman"), watch("aySecimiIsEmriZaman"), watch("yilSecimiIsEmriZaman")]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetIsEmirleriByTarih?startDate=${baslamaTarihi}&endDate=${bitisTarihi}`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        // Transform the data
        const transformedData = response.map((item) => ({
          AY: formatDate(item.TARIH),
          GUN: dayjs(item.TARIH).format("dddd"), // Day of the week in Turkish
          AYLIK_BAKIM_ISEMRI_MALIYET: Number(item.DEGER),
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
    const element = document.getElementById("is-emri-zaman-dagilimi");
    const opt = {
      margin: 10,
      filename: "is_emri_zaman_dagilimi.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleLegendClick = (dataKey) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  const CustomLegend = ({ payload }) => {
    const customNames = {
      AYLIK_BAKIM_ISEMRI_MALIYET: "İş Emri Sayısı",
    };

    const handleToggleAll = () => {
      const allVisible = Object.values(visibleSeries).every((value) => value);
      setVisibleSeries({
        AYLIK_BAKIM_ISEMRI_MALIYET: !allVisible,
      });
    };

    return (
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          margin: 0,
          marginTop: "10px",
        }}
      >
        <li
          style={{
            cursor: "pointer",
            color: Object.values(visibleSeries).every((value) => value) ? "black" : "gray",
          }}
          onClick={handleToggleAll}
        >
          Tümü
        </li>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              cursor: "pointer",
              color: visibleSeries[entry.dataKey] ? entry.color : "gray",
            }}
            onClick={() => handleLegendClick(entry.dataKey)}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: visibleSeries[entry.dataKey] ? entry.color : "gray",
                marginRight: "5px",
              }}
            ></span>
            {customNames[entry.dataKey] || entry.value}
          </li>
        ))}
      </ul>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { AY, GUN, AYLIK_BAKIM_ISEMRI_MALIYET } = payload[0].payload;
      const stroke = payload[0].color; // Grafikteki verinin rengini alır

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: `1px solid ${stroke}`,
          }}
        >
          <p className="label">{`${AY} ${GUN}`}</p>
          <p className="intro" style={{ color: stroke }}>{`İş Emri Sayısı: ${AYLIK_BAKIM_ISEMRI_MALIYET}`}</p>
        </div>
      );
    }

    return null;
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
      setValue("baslamaTarihiIsEmriZaman", null);
      setValue("bitisTarihiIsEmriZaman", null);
      setValue("aySecimiIsEmriZaman", null);
      setValue("yilSecimiIsEmriZaman", null);
      // reset({
      //   baslamaTarihiIsEmriZaman: undefined,
      //   bitisTarihiIsEmriZaman: undefined,
      //   aySecimiIsEmriZaman: undefined,
      //   yilSecimiIsEmriZaman: undefined,
      // });
    }
  }, [isModalVisible]);

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
            maxHeight: "400px",
          }}
        >
          <p>İşlemlerinin zaman içerisindeki dağılımının grafiği, iş emri verilerini daha iyi anlamak ve analiz etmek için çeşitli avantajlar sunar:</p>
          <ol>
            <li>
              <strong>Trendlerin Belirlenmesi</strong>: İşlemlerin zaman içindeki değişimini görsel olarak analiz ederek, belirli dönemlerde artış veya azalış gösteren trendleri
              kolayca tespit edebilirsiniz.
            </li>
            <li>
              <strong>Mevsimsellik ve Döngüsellik</strong>: Yılın belirli dönemlerinde (örneğin, tatil sezonları veya belirli aylarda) artan veya azalan işlem hacimlerini görerek
              mevsimsel veya döngüsel paternleri belirleyebilirsiniz.
            </li>
            <li>
              <strong>Anormalliklerin Tespiti</strong>: Beklenen trendlerden sapma gösteren anormallikleri (örneğin, ani artışlar veya düşüşler) tespit ederek, potansiyel sorunlara
              veya fırsatlara dikkat çekebilirsiniz.
            </li>
            <li>
              <strong>Performans İzleme</strong>: İşlemlerin zaman içindeki performansını izleyerek, belirli dönemlerdeki performans değişikliklerini değerlendirebilirsiniz. Bu,
              işletme süreçlerini iyileştirme fırsatları sunar.
            </li>
            <li>
              <strong>Karar Verme</strong>: Görsel veriler, yöneticilerin ve karar vericilerin daha bilinçli ve veriye dayalı kararlar almasına yardımcı olabilir. İşlem hacmindeki
              değişiklikler, stratejik planlamada önemli rol oynayabilir.
            </li>
            <li>
              <strong>Kaynak Tahsisi</strong>: İşlem yoğunluğunun yüksek olduğu dönemleri belirleyerek, bu dönemlerde daha fazla kaynak tahsis edebilir ve hizmet kalitesini
              artırabilirsiniz.
            </li>
            <li>
              <strong>Tahmin ve Planlama</strong>: Geçmiş verilerden elde edilen trendler ve paternler, gelecekteki işlem hacmini tahmin etmek için kullanılabilir. Bu da stok
              yönetimi, personel planlaması ve bütçe hazırlama gibi konularda fayda sağlar
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
          title={`İş Emirlerinin Zaman Dağılımı (${baslamaTarihi ? formatDate(baslamaTarihi) : ""} - ${bitisTarihi ? formatDate(bitisTarihi) : ""})`}
          style={{
            fontWeight: "500",
            fontSize: "17px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 50px)",
          }}
        >
          İş Emirlerinin Zaman Dağılımı
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
            gap: "7px",
            overflow: "auto",
            height: "100vh",
          }}
        >
          <div style={{ width: "100%", height: "calc(100% - 5px)" }}>
            <ResponsiveContainer ref={ref1} width="100%" height="100%">
              <LineChart
                width="100%"
                height="100%"
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="AY" hide={true} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Line
                  type="monotone"
                  dataKey="AYLIK_BAKIM_ISEMRI_MALIYET"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  hide={!visibleSeries.AYLIK_BAKIM_ISEMRI_MALIYET}
                  name="İş Emri Sayısı"
                />
              </LineChart>
            </ResponsiveContainer>
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
              name="baslamaTarihiIsEmriZaman"
              control={control}
              render={({ field }) => <DatePicker {...field} style={{ width: "130px" }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
            />
            {" - "}
            <Controller
              name="bitisTarihiIsEmriZaman"
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
              name="aySecimiIsEmriZaman"
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
              name="yilSecimiIsEmriZaman"
              control={control}
              render={({ field }) => <DatePicker {...field} picker="year" style={{ width: "130px" }} placeholder="Tarih seçiniz" />}
            />
          </div>
        )}
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
              title={`İş Emirlerinin Zaman Dağılımı (${baslamaTarihi ? formatDate(baslamaTarihi) : ""} - ${bitisTarihi ? formatDate(bitisTarihi) : ""})`}
              style={{
                fontWeight: "500",
                fontSize: "17px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 50px)",
              }}
            >
              İş Emirlerinin Zaman Dağılımı
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
            gap: "7px",
            overflow: "auto",
            height: "calc(100vh - 180px)",
          }}
        >
          <ResponsiveContainer id="is-emri-zaman-dagilimi" width="100%" height="100%">
            <LineChart
              width="100%"
              height="100%"
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="AY"
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
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Line
                type="monotone"
                dataKey="AYLIK_BAKIM_ISEMRI_MALIYET"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                hide={!visibleSeries.AYLIK_BAKIM_ISEMRI_MALIYET}
                name="İş Emri Sayısı"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}

export default IsEmriZamanDagilimi;
