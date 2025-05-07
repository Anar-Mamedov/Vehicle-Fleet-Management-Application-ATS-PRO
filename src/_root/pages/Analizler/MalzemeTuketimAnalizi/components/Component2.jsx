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
  const tanimValues = watch("tanimValues");
  const birimValues = watch("birimValues");
  const toplamTutar = watch("toplamTutar");
  const baslangicTarihi = watch("baslangicTarihi") ? dayjs(watch("baslangicTarihi")).format("YYYY-MM-DD") : null;
  const bitisTarihi = watch("bitisTarihi") ? dayjs(watch("bitisTarihi")).format("YYYY-MM-DD") : null;

  const fetchData = async () => {
    setIsLoading(true);
  
    // Tarihleri formatlayın
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
  
    const formattedStartDate = baslangicTarihi ? baslangicTarihi : oneYearAgo.toISOString().split('T')[0];
    const formattedEndDate = bitisTarihi ? bitisTarihi : today.toISOString().split('T')[0];
  
    const body = {
      baslangicTarihi: formattedStartDate,
      bitisTarihi: formattedEndDate,
      // Burada diğer form alanlarını da parametre olarak ekleyebilirsiniz
    };
  
    try {
      const response = await AxiosInstance.post("/MaterialAnalysis/GetMaterialAnalysisInfoByType?type=2", body);
      setData(response.data); // Veriyi state'e set ediyoruz
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false); // Yükleme durumunu kapatıyoruz
    }
  };

  useEffect(() => {
    fetchData();
  }, [lokasyonId, baslangicTarihi, bitisTarihi]);

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
            alignItems: "flex-start",
            height: "100%",
            textAlign: "left",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: "18px", color: "white" }}>
            {data?.malzemeKod || "-"}
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: "18px", color: "white" }}>
            {data?.tanim || "-"}
          </Text>
  
          <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#e0e0e0", marginTop: "5px" }}>
            {`${data?.toplamMiktar || "0"} ${data?.birim || ""}`}
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
        t("enCokTuketilenMalzeme"),
        "linear-gradient(to right, #6a11cb, #2575fc)",
        isLoading
      )}
    </div>
  );
}

export default ComponentSingleCard;
