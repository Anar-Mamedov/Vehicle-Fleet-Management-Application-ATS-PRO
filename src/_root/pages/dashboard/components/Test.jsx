import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { Button, Popover, Spin, Typography, Modal, DatePicker, Tour } from "antd";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";
import styled from "styled-components";

const { Text } = Typography;

const StyledResponsiveContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ToplamHarcananIsGucu = (props = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [bitisTarihi, setBitisTarihi] = useState();
  const [colors, setColors] = useState({});
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [visibleSeries, setVisibleSeries] = useState({});
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setVisibleSeries(data.reduce((acc, item) => ({ ...acc, [item.name]: true }), {}));
  }, [data]);

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatDate = (date) => {
    if (!date) return "";
    const sampleDate = new Date(2021, 0, 21);
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes("January")) {
      monthFormat = "long";
    } else if (sampleFormatted.includes("Jan")) {
      monthFormat = "short";
    } else {
      monthFormat = "2-digit";
    }

    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: monthFormat,
      day: "2-digit",
    });
    return formatter.format(new Date(date));
  };

  const formatTime = (time) => {
    if (!time || time.trim() === "") return "";

    try {
      const [hours, minutes] = time
        .trim()
        .split(":")
        .map((part) => part.trim());

      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      if (isNaN(hoursInt) || isNaN(minutesInt) || hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
        console.error("Invalid time format:", time);
        return "";
      }

      const date = new Date();
      date.setHours(hoursInt, minutesInt, 0);

      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "2-digit",
      });

      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };

  useEffect(() => {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace("2021", "YYYY").replace("21", "DD").replace("11", "MM"));

    const timeFormatter = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      minute: "numeric",
    });
    const sampleTime = new Date(2021, 10, 21, 13, 45);
    const formattedSampleTime = timeFormatter.format(sampleTime);

    const is12HourFormat = /AM|PM/.test(formattedSampleTime);
    setLocaleTimeFormat(is12HourFormat ? "hh:mm A" : "HH:mm");
  }, []);

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

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      startYear: startYear || dayjs().year(),
    };
    try {
      const response = await http.post("Graphs/GetGraphInfoByType?type=5", body);

      const transformedData = response.data.map((item) => ({
        name: item.aracTipi,
        value: Number(item.aracSayisi),
      }));

      setData(transformedData);

      // Assign colors
      const newColors = {};
      transformedData.forEach((item, index) => {
        newColors[item.name] = chroma.scale(["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#bd2400", "#131842"])[index % 6].hex();
      });
      setColors(newColors);
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
      filename: "toplam-is-gucu.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      let formattedValue = formatNumber(payload[0].value);

      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>{`${payload[0].name} : ${formattedValue} adet`}</p>
        </div>
      );
    }

    return null;
  };

  const handleLegendClick = (name) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const CustomLegend = ({ payload }) => {
    const handleToggleAll = () => {
      const allVisible = Object.values(visibleSeries).every((value) => value);
      const anyVisible = Object.values(visibleSeries).some((value) => value);

      if (!anyVisible) {
        const newVisibility = Object.keys(visibleSeries).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        setVisibleSeries(newVisibility);
      } else {
        const newVisibility = Object.keys(visibleSeries).reduce((acc, key) => {
          acc[key] = !allVisible;
          return acc;
        }, {});
        setVisibleSeries(newVisibility);
      }
    };

    return (
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: 0,
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
              color: visibleSeries[entry.value] ? entry.color : "gray",
            }}
            onClick={() => handleLegendClick(entry.value)}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: visibleSeries[entry.value] ? entry.color : "gray",
                marginRight: "5px",
              }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
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
  };

  useEffect(() => {
    if (isModalVisible === true) {
      setValue("baslamaTarihiToplamIsGucu", null);
      setValue("bitisTarihiToplamIsGucu", null);
      setValue("aySecimiToplamIsGucu", null);
      setValue("yilSecimiToplamIsGucu", null);
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
          <p>
            Belirli bir süre zarfında tüm çalışanlar tarafından harcanan iş gücü toplamının atölyelere dağılımını ifade eder. Bu kavram, genellikle aşağıdaki amaçlar için
            kullanılır:
          </p>
          <ol>
            <li>
              <strong>Genel Verimlilik Analizi</strong>: Organizasyonun genel verimliliğini değerlendirmek için.
            </li>
            <li>
              <strong>Proje ve Görev Takibi</strong>: Bir proje veya görev için harcanan toplam zamanı ve çabayı belirlemek için.
            </li>
            <li>
              <strong>Maliyet Kontrolü</strong>: İş gücü maliyetlerini kontrol etmek ve bütçelendirme yapmak için.
            </li>
            <li>
              <strong>Kaynak Yönetimi</strong>: Kaynakların etkin kullanımını planlamak ve optimize etmek için.
            </li>
            <li>
              <strong>İş Yükü Dağılımı</strong>: Çalışanlar arasındaki iş yükü dağılımını değerlendirmek ve dengelemek için.
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
          Araç Filosu (Araç Tipleri)
          {` ${startYear}`}
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
            <StyledResponsiveContainer ref={ref1} width="100%" height="100%">
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data.filter((entry) => visibleSeries[entry.name])}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="90%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={colors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
                <div style={{ marginLeft: "20px" }}>
                  <CustomLegend
                    payload={data.map((item) => ({
                      value: item.name,
                      type: "square",
                      id: item.name,
                      color: colors[item.name],
                    }))}
                  />
                </div>
              </div>
            </StyledResponsiveContainer>
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
              Araç Filosu (Araç Tipleri)
              {` ${startYear}`}
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
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            height: "calc(100vh - 180px)",
          }}
        >
          <StyledResponsiveContainer id="toplam-is-gucu" width="100%" height="100%">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <PieChart width={400} height={400}>
                <Pie
                  data={data.filter((entry) => visibleSeries[entry.name])}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="90%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={colors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
              <div style={{ marginLeft: "20px" }}>
                <CustomLegend
                  payload={data.map((item) => ({
                    value: item.name,
                    type: "square",
                    id: item.name,
                    color: colors[item.name],
                  }))}
                />
              </div>
            </div>
          </StyledResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default ToplamHarcananIsGucu;
