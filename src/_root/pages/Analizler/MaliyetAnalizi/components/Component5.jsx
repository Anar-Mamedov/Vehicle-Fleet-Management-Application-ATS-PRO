import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Spin, Typography, Select } from "antd";
import AxiosInstance from "../../../../../api/http.jsx";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";

const { Text } = Typography;
const { Option } = Select;

function YillikYakitTuketimleri() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parameterType, setParameterType] = useState("Miktar");
  const { watch } = useFormContext();

  const lokasyonId = watch("locationValues");
  const plakaValues = watch("plakaValues");
  const aracTipiValues = watch("aracTipiValues");
  const departmanValues = watch("departmanValues");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  // startYear ve endYear değerlerini burada hesaplıyoruz
  const startYear = baslangicTarihi ? dayjs(baslangicTarihi).year() : dayjs().year() - 5;
  const endYear = bitisTarihi ? dayjs(bitisTarihi).year() : dayjs().year();

  const parameterOptions = [
    { label: t("satinAlmaMaliyeti"), value: 1 },
    { label: t("yakitMaliyeti"), value: 2 },
    { label: t("sigortaMaliyeti"), value: 3 },
    { label: t("harcamaMaliyeti"), value: 4 },
    { label: t("bakimOnarimMaliyeti"), value: 5 },
    { label: t("lastikMaliyeti"), value: 6 },
  ];

  const parameterTypeNameMap = {
    1: t("satinAlmaMaliyeti"),
    2: t("yakitMaliyeti"),
    3: t("sigortaMaliyeti"),
    4: t("harcamaMaliyeti"),
    5: t("bakimOnarimMaliyeti"),
    6: t("lastikMaliyeti"),
  };

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      plaka: plakaValues || "",
      aracTipi: aracTipiValues || "",
      lokasyon: lokasyonId || "",
      departman: departmanValues || "",
      startDate: baslangicTarihi || null,
      endDate: bitisTarihi || null,
      startYear: startYear, // startYear değerini kullanıyoruz
      endYear: endYear, // endYear değerini kullanıyoruz
      parameterType,
    };
    try {
      const response = await AxiosInstance.post(`/CostAnalysis/GetCostAnalysisInfoByType?type=8`, body);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // parameterType veya diğer bağımlılıklar değiştiğinde verileri yeniden getiriyoruz
  useEffect(() => {
    fetchData();
  }, [lokasyonId, plakaValues, aracTipiValues, departmanValues, baslangicTarihi, bitisTarihi, parameterType]);

  const chartData = [
    { name: t("satinAlmaMaliyeti"), Miktar: data.satinAlmaMaliyeti },
    { name: t("yakitMaliyeti"), Miktar: data.yakitMaliyeti },
    { name: t("sigortaMaliyeti"), Miktar: data.sigortaMaliyeti },
    { name: t("harcamaMaliyeti"), Miktar: data.harcamaMaliyeti },
    { name: t("bakimOnarimMaliyeti"), Miktar: data.bakimOnarimMaliyeti },
    { name: t("lastikMaliyeti"), Miktar: data.lastikMaliyeti },
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
          justifyContent: "space-between",
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
          {t("maliyetGrafigi")} {startYear} - {endYear}
        </Text>
        <Select value={parameterType} onChange={(value) => setParameterType(value)} style={{ width: 120 }}>
          {parameterOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
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
            padding: "10px",
          }}
        >
          <div style={{ width: "100%", height: "calc(100% - 5px)" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    Number(value).toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }
                />
                <Legend />
                <Bar dataKey="Miktar" fill="#00b7ce" name={parameterTypeNameMap[parameterType]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default YillikYakitTuketimleri;
