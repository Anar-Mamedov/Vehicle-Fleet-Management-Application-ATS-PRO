import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import { Button, Popover, Spin, Typography, Modal, DatePicker, Tour } from "antd";
import { useNavigate } from "react-router-dom";
import http from "../../../../api/http.jsx";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";

const { Text } = Typography;

function MarkaBazindaBakimMaliyetleri(props = {}) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [visibleSeries, setVisibleSeries] = useState({
    ARAC_SAYISI: true,
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const yilSecimiValue = watch("yilSecimiMarkaBakimMaliyet");
    if (!yilSecimiValue) {
      const currentYear = dayjs().format("YYYY");
      setBaslamaTarihi(currentYear);
    } else if (yilSecimiValue) {
      const yearOnly = yilSecimiValue.format("YYYY");
      setBaslamaTarihi(yearOnly);
    }
  }, [watch("yilSecimiMarkaBakimMaliyet")]);

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      startYear: baslamaTarihi || dayjs().year(),
    };
    try {
      const response = await http.post("Graphs/GetGraphInfoByType?type=14", body);

      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const apiResponse = response.data;

        const transformedData = apiResponse
          .filter((item) => item.aracMarka && item.aracMarka.trim() !== "")
          .map((item) => ({
            MARKA: item.aracMarka,
            ARAC_SAYISI: item.aracSayisi,
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
    if (baslamaTarihi) {
      fetchData();
    }
  }, [baslamaTarihi]);

  const downloadPDF = () => {
    const element = document.getElementById("marka-bakim-maliyet");
    const opt = {
      margin: 10,
      filename: "marka_bazinda_arac_sayilari.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`Marka: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>{`${entry.name}: ${entry.value.toLocaleString("tr-TR")}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  const CustomLabel = (props) => {
    const { x, y, width, value } = props;
    const formattedValue = value.toLocaleString("tr-TR");

    return (
      <text x={x + width / 2} y={y - 10} fill="gray" textAnchor="middle" dominantBaseline="middle">
        {formattedValue}
      </text>
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
      setValue("yilSecimiMarkaBakimMaliyet", null);
    }
  }, [isModalVisible]);

  const content1 = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          <p>
            Bu grafik ile marka bazında araç sayılarını analiz edebilirsiniz. Her bir marka için toplam araç sayılarını karşılaştırarak, filo dağılımını ve marka bazlı planlamayı
            yapabilirsiniz.
          </p>
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
          title={`Marka Bazında Araç Sayıları${baslamaTarihi ? ` (${baslamaTarihi})` : ""}`}
          style={{
            fontWeight: "500",
            fontSize: "17px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 50px)",
          }}
        >
          Marka Bazında Araç Sayıları
          {baslamaTarihi && ` (${baslamaTarihi})`}
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
              <BarChart
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
                <XAxis dataKey="MARKA" interval={0} angle={-90} textAnchor="end" height={120} tick={{ fontSize: 11 }} tickFormatter={(value) => (value && value.length > 10 ? `${value.slice(0, 10)}...` : value)} />
                <YAxis tickFormatter={(value) => value.toLocaleString("tr-TR")} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ARAC_SAYISI" fill="#36B37E" hide={!visibleSeries.ARAC_SAYISI} name="Araç Sayısı">
                  <LabelList content={<CustomLabel />} dataKey="ARAC_SAYISI" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <Modal title="Tarih Seçimi" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
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
              name="yilSecimiMarkaBakimMaliyet"
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
              title={`Marka Bazında Araç Sayıları${baslamaTarihi ? ` (${baslamaTarihi})` : ""}`}
              style={{
                fontWeight: "500",
                fontSize: "17px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 50px)",
              }}
            >
              Marka Bazında Araç Sayıları
              {baslamaTarihi && ` (${baslamaTarihi})`}
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
          <ResponsiveContainer id="marka-bakim-maliyet" width="100%" height="100%">
            <BarChart
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
              <XAxis dataKey="MARKA" interval={0} angle={-90} textAnchor="end" height={120} tick={{ fontSize: 11 }} tickFormatter={(value) => (value && value.length > 10 ? `${value.slice(0, 10)}...` : value)} />
              <YAxis tickFormatter={(value) => value.toLocaleString("tr-TR")} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="ARAC_SAYISI" fill="#36B37E" hide={!visibleSeries.ARAC_SAYISI} name="Araç Sayısı">
                <LabelList content={<CustomLabel />} dataKey="ARAC_SAYISI" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}

export default MarkaBazindaBakimMaliyetleri;
