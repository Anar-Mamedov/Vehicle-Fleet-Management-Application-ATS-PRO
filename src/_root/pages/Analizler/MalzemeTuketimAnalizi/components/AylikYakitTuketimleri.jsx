import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Spin, Typography, Select } from "antd";
import AxiosInstance from "../../../../../api/http.jsx";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";

const { Text } = Typography;
const { Option } = Select;

function AylikYakitTuketimleri() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parameterType, setParameterType] = useState(1);
  const { watch } = useFormContext();

  const lokasyonId = watch("locationValues");
  const plakaValues = watch("plakaValues");
  const aracTipiValues = watch("aracTipiValues");
  const departmanValues = watch("departmanValues");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  // startYear ve endYear değerlerini burada hesaplıyoruz
  const startYear = baslangicTarihi ? dayjs(baslangicTarihi).year() : dayjs().year();
  const endYear = bitisTarihi ? dayjs(bitisTarihi).year() : dayjs().year();

  const parameterOptions = [
    { label: t("miktar"), value: 1 },
    { label: t("tutar"), value: 2 },
    { label: t("ortalama"), value: 3 },
  ];

  const parameterTypeNameMap = {
    1: t("miktar"),
    2: t("tutar"),
    3: t("ortalama"),
  };

  // Ay numaralarını ay isimlerine eşleyen dizi
  const monthNames = [t("ocak"), t("subat"), t("mart"), t("nisan"), t("mayis"), t("haziran"), t("temmuz"), t("agustos"), t("eylul"), t("ekim"), t("kasim"), t("aralik")];

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      plaka: plakaValues || "",
      aracTipi: aracTipiValues || "",
      lokasyon: lokasyonId || "",
      departman: departmanValues || "",
      startDate: baslangicTarihi || null,
      endDate: bitisTarihi || null,
      startYear: startYear,
      endYear: endYear,
      parameterType,
    };
    try {
      const response = await AxiosInstance.post(`/PerformanceAnalysis/GetPerformanceAnalysisInfoByType?type=6`, body);
      // Veriyi dönüştürüyoruz: ay numaralarını ay isimlerine çeviriyoruz
      const transformedData = response.data.map((item) => ({
        ...item,
        ayAdi: monthNames[item.ay - 1], // Ay numaraları 1-12, dizinler 0-11
      }));
      setData(transformedData);
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
          {t("katEdilenKilometreGrafigi")} {startYear}
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
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
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* XAxis dataKey'i 'ayAdi' olarak güncellendi */}
                <XAxis dataKey="ayAdi" />
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
                <Bar dataKey="deger" fill="#8884d8" name={parameterTypeNameMap[parameterType]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default AylikYakitTuketimleri;
