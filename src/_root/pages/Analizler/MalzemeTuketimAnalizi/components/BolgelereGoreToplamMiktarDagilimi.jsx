import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Spin, Typography } from "antd";
import AxiosInstance from "../../../../../api/http.jsx";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";
import chroma from "chroma-js";

const { Text } = Typography;

function BolgelereGoreToplamMiktarDagilimi() {
  const [data, setData] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { watch } = useFormContext();

  const lokasyonId = watch("locationValues");
  const plakaValues = watch("plakaValues");
  const aracTipiValues = watch("aracTipiValues");
  const departmanValues = watch("departmanValues");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  const startYear = baslangicTarihi ? dayjs(baslangicTarihi).year() : null;
  const endYear = bitisTarihi ? dayjs(bitisTarihi).year() : null;

  const fetchData = async () => {
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
      const response = await AxiosInstance.post(`/ModuleAnalysis/FuelAnalysis/GetFuelAnalysisInfoByType?type=7`, body);

      // Transform the data to include color
      const transformedData = response.data.map((item) => ({
        ...item,
      }));

      // Generate colors
      const colors = generateColors(transformedData.length);

      // Add colors to the data
      const dataWithColors = transformedData.map((item, index) => ({
        ...item,
        color: colors[index],
      }));

      setData(dataWithColors);

      // Set visibleSeries
      setVisibleSeries(dataWithColors.reduce((acc, item) => ({ ...acc, [item.lokasyon]: true }), {}));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate colors using chroma.js
  const generateColors = (dataLength) => {
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#bd2400", "#131842"];
    return chroma.scale(colors).mode("lch").colors(dataLength);
  };

  useEffect(() => {
    fetchData();
  }, [lokasyonId, plakaValues, aracTipiValues, departmanValues, baslangicTarihi, bitisTarihi]);

  useEffect(() => {
    setVisibleSeries(data.reduce((acc, item) => ({ ...acc, [item.lokasyon]: true }), {}));
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
          {t("BolgelereGoreToplamMiktarDagilimi")} {startYear} - {endYear}
        </Text>
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
                  data={data.filter((entry) => visibleSeries[entry.lokasyon])}
                  dataKey="toplamMiktar"
                  nameKey="lokasyon"
                  cx="50%"
                  cy="50%"
                  outerRadius="90%"
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data
                    .filter((entry) => visibleSeries[entry.lokasyon])
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
                <Legend content={<CustomLegend payload={data.map((entry) => ({ value: entry.lokasyon, color: entry.color }))} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default BolgelereGoreToplamMiktarDagilimi;
