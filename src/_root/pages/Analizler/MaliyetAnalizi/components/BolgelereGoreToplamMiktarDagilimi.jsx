import React, { useState, useEffect, useRef, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Spin, Typography, Button, Popover, Tour, Modal } from "antd";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../api/http.jsx";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";
import chroma from "chroma-js";
import styled from "styled-components";
import html2pdf from "html2pdf.js";
import PropTypes from "prop-types";

const { Text } = Typography;

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  &:focus {
    outline: none !important;
  }
  .recharts-wrapper path:focus {
    outline: none;
  }
`;

function BolgelereGoreToplamMiktarDagilimi() {
  const [data, setData] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state

  const lokasyonId = watch("locationValues");
  const plakaValues = watch("plakaValues");
  const aracTipiValues = watch("aracTipiValues");
  const departmanValues = watch("departmanValues");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  const startYear = baslangicTarihi ? dayjs(baslangicTarihi).year() : null;
  const endYear = bitisTarihi ? dayjs(bitisTarihi).year() : null;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const body = {
      plaka: plakaValues || "",
      aracTipi: aracTipiValues || "",
      lokasyon: lokasyonId || "",
      departman: departmanValues || "",
      startDate: baslangicTarihi || null,
      endDate: bitisTarihi || null,
      startYear: startYear || 0,
      endYear: endYear || 0,
      parameterType: 1,
    };
    try {
      const response = await AxiosInstance.post(`/CostAnalysis/GetCostAnalysisInfoByType?type=6`, body);

      // Transform the data to include color
      const transformedData = [
        { name: t("satinAlmaMaliyeti"), value: response.data.satinAlmaMaliyeti },
        { name: t("yakitMaliyeti"), value: response.data.yakitMaliyeti },
        { name: t("sigortaMaliyeti"), value: response.data.sigortaMaliyeti },
        { name: t("harcamaMaliyeti"), value: response.data.harcamaMaliyeti },
        { name: t("bakimOnarimMaliyeti"), value: response.data.bakimOnarimMaliyeti },
        { name: t("lastikMaliyeti"), value: response.data.lastikMaliyeti },
      ];

      // Generate colors
      const colors = generateColors(transformedData.length);

      // Add colors to the data
      const dataWithColors = transformedData.map((item, index) => ({
        ...item,
        color: colors[index],
      }));

      setData(dataWithColors);

      // Set visibleSeries
      setVisibleSeries(dataWithColors.reduce((acc, item) => ({ ...acc, [item.name]: true }), {}));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [plakaValues, aracTipiValues, lokasyonId, departmanValues, baslangicTarihi, bitisTarihi, startYear, endYear]);

  // Generate colors using chroma.js
  const generateColors = (dataLength) => {
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#bd2400", "#131842"];
    return chroma.scale(colors).mode("lch").colors(dataLength);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setVisibleSeries(data.reduce((acc, item) => ({ ...acc, [item.name]: true }), {}));
  }, [data]);

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
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <li>
          <button
            type="button"
            onClick={handleToggleAll}
            style={{
              cursor: "pointer",
              color: Object.values(visibleSeries).every((value) => value) ? "black" : "gray",
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            Tümü
          </button>
        </li>
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <button
              type="button"
              onClick={() => handleLegendClick(entry.value)}
              style={{
                cursor: "pointer",
                color: visibleSeries[entry.value] ? entry.color : "gray",
                background: "transparent",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
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
            </button>
          </li>
        ))}
      </ul>
    );
  };

  CustomLegend.propTypes = {
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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

  // Custom Tooltip function
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      // Formatlanmış sayıyı almak
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

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
      })
    ),
  };

  // Sayıyı formata dönüştüren fonksiyon
  function formatNumber(value) {
    return Number(value).toLocaleString("tr-TR");
  }

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

  // Removed unused modal visibility effect

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <button type="button" style={{ cursor: "pointer", background: "transparent", border: "none", padding: 0, textAlign: "left" }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </button>
      <button type="button" style={{ cursor: "pointer", background: "transparent", border: "none", padding: 0, textAlign: "left" }} onClick={() => setOpen(true)}>
        Bilgi
      </button>
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
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: "17px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {t("toplamSahipOlmaMaliyeti")} {startYear} - {endYear}
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
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            overflow: "auto",
            height: "100vh",
            padding: "10px",
          }}
        >
          <div style={{ width: "100%", height: "calc(100% - 5px)" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.filter((entry) => visibleSeries[entry.name])}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="90%"
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data
                    .filter((entry) => visibleSeries[entry.name])
                    .map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    Number(value).toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Legend content={<CustomLegend payload={data.map((entry) => ({ value: entry.name, color: entry.color }))} />} />
              </PieChart>
            </ResponsiveContainer>
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
              title={`Toplam Harcanan İş Gücü (${startYear ?? ""} - ${endYear ?? ""})`}
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
            <PieChart width="100%" height="100%">
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend payload={data.map((entry) => ({ value: entry.name, color: entry.color }))} />} />
            </PieChart>
          </StyledResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}

export default BolgelereGoreToplamMiktarDagilimi;
