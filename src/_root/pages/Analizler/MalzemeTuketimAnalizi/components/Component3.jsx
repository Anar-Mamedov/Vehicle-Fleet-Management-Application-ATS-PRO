import React, { useState, useEffect } from "react";
import bg from "/images/bg-card.png";
import { Spin, Typography } from "antd";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../api/http.jsx";
import { t } from "i18next";
import dayjs from "dayjs";

const { Text } = Typography;

function ComponentSingleCard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { watch } = useFormContext();

  // Form değerlerini izle
  const lokasyonId = watch("locationValues");
  const plakaValues = watch("plakaValues");
  const markaValues = watch("markaTipiValues");
  const toplamTutar = watch("toplamTutar");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  const fetchData = async () => {
    setIsLoading(true);

    const body = {
      plaka: plakaValues || "",
      marka: markaValues || "",
      lokasyon: lokasyonId || "",
      toplamTutar: toplamTutar || null,
      startDate: baslangicTarihi || null,
      endDate: bitisTarihi || null,
    };

    try {
      // Sadece type=1 ile tek bir istek
      const response = await AxiosInstance.post("/MaterialAnalysis/GetMaterialAnalysisInfoByType?type=3", body);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lokasyonId, plakaValues, markaValues, toplamTutar, baslangicTarihi, bitisTarihi]);

  const renderCard = (data, label, backgroundColor, loading) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: backgroundColor || `url(${bg}), linear-gradient(rgb(27 17 92), #007eff)`,
          backgroundPosition: "inherit",
          backgroundSize: "cover",
          borderRadius: "5px",
          padding: "10px 20px",
          marginBottom: "0px",
          filter: "drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.1))",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Spin size="large" style={{ color: "#fff" }} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
          <Text style={{ fontWeight: "bold", fontSize: "18px", color: "white" }}>
            {data?.plaka || "-"}
          </Text>
  
          <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#e0e0e0", marginTop: "5px" }}>
            {`${data?.marka || "0"} ${data?.model || ""}`}
          </Text>
  
          <Text style={{ fontSize: "16px", color: "#e0e0e0", marginTop: "5px" }}>
            Toplam Tutar: {data?.toplamTutar?.toLocaleString() || "0"} ₺
          </Text>
  
          {label && (
            <Text style={{ marginTop: "10px", fontSize: "14px", color: "white", opacity: 0.8 }}>
              {label}
            </Text>
          )}
          </div>
        )}
      </div>
    );
  
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {renderCard(
          data,
          t("enCokTuketimYapanArac"),
          "linear-gradient(to right, #6a11cb, #2575fc)",
          isLoading
        )}
      </div>
    );
}

export default ComponentSingleCard;
