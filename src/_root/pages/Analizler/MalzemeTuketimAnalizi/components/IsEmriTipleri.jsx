import React, { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, Legend } from "recharts";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import http from "../../../../../api/http.jsx";
import { Spin, Typography, Tooltip, Popover, Button, Modal, Tour } from "antd";
import chroma from "chroma-js";
import styled from "styled-components";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import html2pdf from "html2pdf.js";

const { Text } = Typography;

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
  :focus {
    outline: none;
  }
`;

function IsEmriTipleri(props) {
  const navigate = useNavigate(); // Initialize navigate
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({});
  const [chartHeader, setChartHeader] = useState("İş Emri Tipleri");
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetIsEmriTipEnvanter?ID=2`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const transformedData = response.map((item) => ({
          name: item.ISEMRI_TIPI,
          value: Number(item.ISEMRI_SAYISI),
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

  const fetchData1 = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetIsEmriDurumEnvanter?ID=2`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        const transformedData = response.map((item) => ({
          name: item.ISEMRI_DURUMU,
          value: Number(item.ISEMRI_SAYISI),
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

  const downloadPDF = () => {
    const element = document.getElementById("is-emri-tipleri");
    const opt = {
      margin: 10,
      filename: "is_emri_tipleri.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Tooltip title={payload.name}>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} title={payload.name} style={{ fontSize: outerRadius * 0.1 }}>
            {payload.name.length > 20 ? `${payload.name.slice(0, 17)}...` : payload.name}
          </text>
        </Tooltip>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Sayısı: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`( ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
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
        // If no series are visible, set all to visible
        const newVisibility = Object.keys(visibleSeries).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});
        setVisibleSeries(newVisibility);
      } else {
        // Otherwise, toggle all based on the current state of allVisible
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

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          fetchData();
          setChartHeader("İş Emri Tipleri");
        }}
      >
        İş Emri Tipleri
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          fetchData1();
          setChartHeader("İş Emri Durumları");
        }}
      >
        İş Emri Durumları
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
          <p>
            Farklı tiplere ve durumlara sahip İş Emirlerinin <strong>SAYISI (SÜRESİ)</strong> gösterilir.
          </p>
          <p>
            <strong>Bilgi :</strong> Bu pasta grafikte, farklı iş emri tiplerinin / durumlarının toplam iş emirleri içindeki oranları gösterilmektedir. Her bir dilim, belirli bir
            iş emri tipinin / durumunun toplam iş emirleri içindeki oranını temsil etmektedir. Örneğin, pasta grafiğinde Arıza iş emri tipi için ayrılan dilim, toplam iş
            emirlerinin yüzde 40ını oluşturuyorsa, bu tip iş emirlerinin diğerlerine göre daha fazla olduğunu gösterir. Bu grafik, iş emirlerinin dağılımını hızlıca
            görselleştirerek analiz etmenize yardımcı olabilir.
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
              <PieChart width="100%" height="100%">
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
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
          <StyledResponsiveContainer id="is-emri-tipleri" width="100%" height="100%">
            <PieChart width="100%" height="100%">
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data.filter((entry) => visibleSeries[entry.name])}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="70%"
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data
                  .filter((entry) => visibleSeries[entry.name])
                  .map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </StyledResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}

export default IsEmriTipleri;
