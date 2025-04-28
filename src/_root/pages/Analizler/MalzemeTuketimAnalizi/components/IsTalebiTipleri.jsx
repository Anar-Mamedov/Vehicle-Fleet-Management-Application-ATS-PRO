import React, { useEffect, useState, useRef } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import http from "../../../../../api/http.jsx";
import { Spin, Typography, Popover, Button, Modal, Tour } from "antd";
import chroma from "chroma-js";
import styled from "styled-components";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";

const { Text } = Typography;

// Generate colors for the pie chart
const generateColors = (dataLength) => {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#bd2400", "#131842"];
  return chroma.scale(colors).mode("lch").colors(dataLength);
};

// Styled component for the pie chart container
const StyledResponsiveContainer = styled(ResponsiveContainer)`
  &:focus {
    outline: none !important;
  }
  .recharts-wrapper path:focus {
    outline: none;
  }
`;

const IsTalebiTipleri = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({});
  const [chartHeader, setChartHeader] = useState("İş Talebi Tipleri");
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);

  // Fetch data for the first chart
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetIsTalepTipEnvanter?ID=2`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const transformedData = response.map((item) => ({
          name: item.TALEP_TIPI,
          value: Number(item.TALEP_SAYISI),
        }));
        setData(transformedData);
        setColors(generateColors(transformedData.length));
        const initialVisibleSeries = transformedData.reduce((acc, item) => {
          acc[item.name] = true;
          return acc;
        }, {});
        setVisibleSeries(initialVisibleSeries);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusTag = (statusId) => {
    switch (statusId) {
      case 0:
        return { text: "Açık" };
      case 1:
        return { text: "Bekliyor" };
      case 2:
        return { text: "Planlandı" };
      case 3:
        return { text: "Devam Ediyor" };
      case 4:
        return { text: "Kapandı" };
      case 5:
        return { text: "İptal Edildi" };
      default:
        return { text: "" };
    }
  };

  // Fetch data for the second chart
  const fetchData1 = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetIsTalepDurumEnvanter?ID=2`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const transformedData = response.map((item) => ({
          name: statusTag(item.IST_DURUM_ID).text,
          value: Number(item.IS_TALEP_SAYISI),
        }));
        setData(transformedData);
        setColors(generateColors(transformedData.length));
        const initialVisibleSeries = transformedData.reduce((acc, item) => {
          acc[item.name] = true;
          return acc;
        }, {});
        setVisibleSeries(initialVisibleSeries);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle PDF download
  const downloadPDF = () => {
    const element = document.getElementById("is-talebi-tipleri");
    const opt = {
      margin: 10,
      filename: "is_talebi_tipleri.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // Render custom label for the pie chart
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

  // Format numbers with dots
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Custom Tooltip function
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
          <p>{`${payload[0].name} : ${formattedValue}`}</p>
        </div>
      );
    }
    return null;
  };

  // Handle legend item click
  const handleLegendClick = (name) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Custom Legend component
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
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
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
              color: visibleSeries[entry.value] ? colors[index % colors.length] : "gray",
            }}
            onClick={() => handleLegendClick(entry.value)}
          >
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: visibleSeries[entry.value] ? colors[index % colors.length] : "gray",
                marginRight: "5px",
              }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  // Content for the popover menu
  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          fetchData();
          setChartHeader("İş Talebi Tipleri");
        }}
      >
        İş Talebi Tipleri
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          fetchData1();
          setChartHeader("İş Talebi Durumları");
        }}
      >
        İş Talebi Durumları
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        Bilgi
      </div>
    </div>
  );

  const steps = [
    {
      title: "Bilgi",
      description: (
        <div>
          <p>İş Taleplerinin Tiplerinine/Durumlarına göre sayılarını gösterir.</p>
          <p>
            <strong>Bilgi :</strong> İş taleplerinin farklı tiplerini/durumlarını (örneğin, tamamlandı, devam ediyor, beklemede, iptal edildi vs…) adet cinsinden gösteren bir
            grafiktir. Bu grafik, farklı tiplerdeki/durumlardaki iş bildirimlerinin oransal dağılımını da hızlıca göstermek için kullanılır. İş taleplerinin durumlarını belirli bir
            zaman aralığında karşılaştırmak için kullanılabilir. Bu grafik ile İş taleplerinin durumunu etkili bir şekilde görselleştirebilirsiniz.
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
          title={`Toplam Harcanan İş Gücü`}
          style={{
            fontWeight: "500",
            fontSize: "17px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 50px)",
          }}
        >
          {chartHeader}
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
                  {data
                    .filter((entry) => visibleSeries[entry.name])
                    .map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </StyledResponsiveContainer>
          </div>
        </div>
      )}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
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
              title={`Toplam Harcanan İş Gücü `}
            >
              {chartHeader}
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
          <StyledResponsiveContainer id="is-talebi-tipleri" width="100%" height="100%">
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
                {data
                  .filter((entry) => visibleSeries[entry.name])
                  .map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </StyledResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
};

export default IsTalebiTipleri;
