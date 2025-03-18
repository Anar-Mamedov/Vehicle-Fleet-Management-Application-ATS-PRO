import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Spin, Typography } from "antd";
import AxiosInstance from "../../../../../api/http.jsx";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";
import chroma from "chroma-js";

const { Text } = Typography;

function BolgelereGoreToplamMiktarDagilimi() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
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

      // Transform and sort data by toplamMiktar
      const transformedData = response.data
        .map((item) => ({
          name: item.lokasyon,
          miktar: item.toplamMiktar,
        }))
        .sort((a, b) => b.miktar - a.miktar);

      setData(transformedData);
      setActiveIndex(0);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lokasyonId, plakaValues, aracTipiValues, departmanValues, baslangicTarihi, bitisTarihi]);

  const handleClick = (entry, index) => {
    setActiveIndex(index);
  };

  const getBarColor = (index) => {
    return index === activeIndex ? "#82ca9d" : "#8884d8";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0 }}>{`${label}: ${Number(payload[0].value).toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}</p>
        </div>
      );
    }
    return null;
  };

  // Her bir bar için 40px genişlik ve minimum 1200px genişlik
  const chartWidth = Math.max(1200, data.length * 40);

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
            height: "calc(100vh - 200px)",
            padding: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "80%",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <div style={{ width: chartWidth, height: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="miktar" onClick={handleClick}>
                    {data.map((entry, index) => (
                      <Cell cursor="pointer" fill={getBarColor(index)} key={`cell-${index}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {data[activeIndex] && (
            <Text style={{ textAlign: "center", marginTop: "10px", fontSize: "16px", fontWeight: "500" }}>
              {`${data[activeIndex].name}: ${Number(data[activeIndex].miktar).toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}

export default BolgelereGoreToplamMiktarDagilimi;
