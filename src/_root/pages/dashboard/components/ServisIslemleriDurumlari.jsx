import React, { useState, useEffect, useRef } from "react";
import { Button, Popover, Spin, Typography, Modal, DatePicker, Tour } from "antd";
import http from "../../../../api/http.jsx";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";
import ServisIslemleriDurumlariTable from "../../vehicles-control/ServisIslemleri/Table/Table.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const STATUS_CONFIG = {
  1: { labelKey: "bekliyor", color: "#ff9800", order: 3 },
  2: { labelKey: "devamEdiyor", color: "#2196f3", order: 2 },
  3: { labelKey: "iptalEdildi", color: "#ff0000", order: 4 },
  4: { labelKey: "tamamlandi", color: "#2bc770", order: 1 },
};

function ServisIslemleriDurumlari(props = {}) {
  const navigate = useNavigate(); // Initialize navigate
  const { t } = useTranslation();
  const [data, setData] = useState([]);
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
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();
  // Add new state for pie slice modal
  const [isPieSliceModalVisible, setIsPieSliceModalVisible] = useState(false);
  const [selectedDurumBilgisi, setSelectedDurumBilgisi] = useState(null);

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
    const baslamaTarihiValue = watch("baslamaTarihiToplamIsGucu");
    const bitisTarihiValue = watch("bitisTarihiToplamIsGucu");
    const aySecimiValue = watch("aySecimiToplamIsGucu");
    const yilSecimiValue = watch("yilSecimiToplamIsGucu");

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
  }, [watch("baslamaTarihiToplamIsGucu"), watch("bitisTarihiToplamIsGucu"), watch("aySecimiToplamIsGucu"), watch("yilSecimiToplamIsGucu")]);

  const yilSecimiValue = watch("yilSecimiToplamIsGucu");
  const startYear = dayjs(yilSecimiValue).year();
  const chartTitle = `Servis İşlemleri (Durumlar) ${startYear || dayjs().year()}`;

  const getStatusName = (statusId) => {
    const labelKey = STATUS_CONFIG[statusId]?.labelKey;
    return labelKey ? t(labelKey) : `${t("durum")} ${statusId}`;
  };

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      startYear: startYear || dayjs().year(),
    };
    try {
      const response = await http.post("Graphs/GetGraphInfoByType?type=13", body);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const statusMap = new Map();

        (response.data || []).forEach((item) => {
          const statusId = Number(item.durumBilgisi);
          const statusConfig = STATUS_CONFIG[statusId];

          // Some responses carry count as "adet", while others use "aracSayisi".
          const rawValue = item.adet ?? item.aracSayisi ?? item.sayi ?? item.toplam ?? item.count ?? item.deger ?? 0;
          const parsedValue = Number(rawValue);
          const value = Number.isFinite(parsedValue) ? parsedValue : 0;

          if (!statusMap.has(statusId)) {
            statusMap.set(statusId, {
              statusId,
              value,
              color: statusConfig?.color || "#7f8c8d",
              order: statusConfig?.order || 99,
            });
          } else {
            const existing = statusMap.get(statusId);
            existing.value += value;
          }
        });

        const transformedData = Object.entries(STATUS_CONFIG)
          .map(([statusId, config]) => {
            const found = statusMap.get(Number(statusId));
            return {
              statusId: Number(statusId),
              labelKey: config.labelKey,
              color: config.color,
              order: config.order,
              value: found?.value || 0,
            };
          })
          .sort((a, b) => a.order - b.order);

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
    const element = document.getElementById("toplam-is-gucu");
    const opt = {
      margin: 10,
      filename: `${chartTitle}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  // Sayıyı formata dönüştüren fonksiyon
  function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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
      setValue("baslamaTarihiToplamIsGucu", null);
      setValue("bitisTarihiToplamIsGucu", null);
      setValue("aySecimiToplamIsGucu", null);
      setValue("yilSecimiToplamIsGucu", null);
      // reset({
      //   baslamaTarihiToplamIsGucu: undefined,
      //   bitisTarihiToplamIsGucu: undefined,
      //   aySecimiToplamIsGucu: undefined,
      //   yilSecimiToplamIsGucu: undefined,
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
            maxHeight: "200px",
          }}
        >
          <p>Bu alan, seçilen süre ve filtrelere göre servis işlemlerinin durum bazlı dağılımını gösterir.</p>
          <p>Kayıtların kaç adet ve yüzde olarak Tamamlandı, Devam Ediyor, Bekliyor ve İptal Edildi durumlarında olduğunu özetler.</p>
          <p>Bu görünüm aşağıdaki amaçlarla kullanılır:</p>
          <ul>
            <li>
              <strong>Operasyon Takibi:</strong> Servis süreçlerinin mevcut durumunu hızlıca izlemek için.
            </li>
            <li>
              <strong>İş Yükü Görünürlüğü:</strong> Devam eden ve bekleyen kayıt yoğunluğunu görmek için.
            </li>
            <li>
              <strong>Süreç Performansı:</strong> Tamamlanan işlem oranını değerlendirmek için.
            </li>
            <li>
              <strong>Kontrol ve Müdahale:</strong> Bekleyen veya iptal edilen kayıtları fark ederek aksiyon almak için.
            </li>
          </ul>
          <p>
            <strong>Durum Tanımları:</strong>
          </p>
          <ul>
            <li>
              <strong>Tamamlandı:</strong> İşlemi tamamlanmış servis kayıtları
            </li>
            <li>
              <strong>Devam Ediyor:</strong> Süreci halen devam eden servis kayıtları
            </li>
            <li>
              <strong>Bekliyor:</strong> Onay, parça, planlama veya işlem sırası bekleyen kayıtlar
            </li>
            <li>
              <strong>İptal Edildi:</strong> İşleme alınmadan sonlandırılmış servis kayıtları
            </li>
          </ul>
        </div>
      ),

      target: () => ref1.current,
    },
  ];

  const handleStatusRowClick = (statusId) => {
    if (statusId) {
      setSelectedDurumBilgisi(statusId);
      setIsPieSliceModalVisible(true);
    }
  };

  const totalCountForRatio = data.reduce((sum, row) => sum + Number(row.value || 0), 0);
  const tableRows = data.map((row) => ({
    ...row,
    ratio: totalCountForRatio > 0 ? Math.round((Number(row.value || 0) / totalCountForRatio) * 100) : 0,
  }));

  const renderStatusTable = (containerId) => (
    <div id={containerId} ref={containerId ? undefined : ref1} style={{ height: "100%", overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d9d9d9" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "15px", fontWeight: 600 }}>Durum</th>
            <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "15px", fontWeight: 600 }}>Adet</th>
            <th style={{ textAlign: "left", padding: "8px 12px", fontSize: "15px", fontWeight: 600 }}>Oran</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <tr
              key={row.statusId}
              style={{ borderBottom: "1px solid #ececec", cursor: "pointer" }}
              onClick={() => handleStatusRowClick(row.statusId)}
              title={`${getStatusName(row.statusId)} detayını aç`}
            >
              <td style={{ padding: "12px", fontSize: "15px", fontWeight: 500 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor: row.color,
                    border: "1px solid #222",
                    marginRight: "10px",
                    verticalAlign: "middle",
                  }}
                />
                {getStatusName(row.statusId)}
              </td>
              <td style={{ padding: "12px", fontSize: "15px", fontWeight: 600 }}>{formatNumber(row.value)}</td>
              <td style={{ padding: "12px", fontSize: "15px", fontWeight: 500 }}>%{row.ratio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
        // className="widget-header"
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          title={`Toplam Harcanan İş Gücü (${baslamaTarihi ? formatDate(baslamaTarihi) : ""} - ${bitisTarihi ? formatDate(bitisTarihi) : ""})`}
          style={{
            fontWeight: "500",
            fontSize: "17px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 50px)",
          }}
        >
          {chartTitle}
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
            padding: "0 10px 10px 10px",
            overflow: "auto",
            height: "100%",
          }}
        >
          {renderStatusTable("")}
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
              name="baslamaTarihiToplamIsGucu"
              control={control}
              render={({ field }) => <DatePicker {...field} style={{ width: "130px" }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
            />
            {" - "}
            <Controller
              name="bitisTarihiToplamIsGucu"
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
              name="aySecimiToplamIsGucu"
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
              name="yilSecimiToplamIsGucu"
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
            <div
              style={{
                fontWeight: "500",
                fontSize: "17px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 50px)",
              }}
              title={`Toplam Harcanan İş Gücü (${baslamaTarihi ? formatDate(baslamaTarihi) : ""} - ${bitisTarihi ? formatDate(bitisTarihi) : ""})`}
            >
              {chartTitle}
            </div>
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
            height: "calc(100vh - 180px)",
            padding: "0 10px 10px 10px",
          }}
        >
          {renderStatusTable("toplam-is-gucu")}
        </div>
      </Modal>
      {/* Add new modal for pie slice click */}
      <Modal
        title={`${getStatusName(selectedDurumBilgisi)} Servis İşlemleri`}
        centered
        open={isPieSliceModalVisible}
        onOk={() => setIsPieSliceModalVisible(false)}
        onCancel={() => setIsPieSliceModalVisible(false)}
        width="90%"
        destroyOnClose
      >
        <div style={{ height: "calc(100vh - 180px)" }}>{selectedDurumBilgisi && <ServisIslemleriDurumlariTable statusId1={selectedDurumBilgisi} />}</div>
      </Modal>
    </div>
  );
}

export default ServisIslemleriDurumlari;
