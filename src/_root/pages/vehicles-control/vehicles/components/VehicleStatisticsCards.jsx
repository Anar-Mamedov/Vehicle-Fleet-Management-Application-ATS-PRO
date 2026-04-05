import React, { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { CarOutlined, InfoCircleOutlined, ReloadOutlined, SafetyCertificateOutlined, ToolOutlined } from "@ant-design/icons";
import { t } from "i18next";
import AxiosInstance from "../../../../../api/http";

const buildStatisticsFilterPayload = (customFilters) => {
  if (!customFilters || typeof customFilters !== "object" || Object.keys(customFilters).length === 0) {
    return null;
  }

  const payload = { ...customFilters };

  // Kutularda durum filtresi kullanılmamalı
  if ("durumValue" in payload) {
    delete payload.durumValue;
  }

  // Tekli lokasyon değeri gelirse tabloyla uyumlu dizi anahtarına çevir
  if ("lokasyonId" in payload && !("lokasyonIds" in payload)) {
    const value = payload.lokasyonId;
    payload.lokasyonIds = Array.isArray(value) ? value : [value];
    delete payload.lokasyonId;
  }

  return payload;
};

const extractDetailNumber = (data, keys) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) return 0;

  for (const key of keys) {
    const value = Number(data[key]);
    if (Number.isFinite(value)) return value;
  }

  return 0;
};

const extractType1Counts = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      aktif: extractStatisticValue(data),
      pasif: 0,
      arsiv: 0,
    };
  }

  const aktif = extractDetailNumber(data, ["aktifAracSayisi", "aktif", "aktifArac", "active", "activeCount"]);
  const pasif = extractDetailNumber(data, ["pasifAracSayisi", "pasif", "pasifArac", "inactive", "inactiveCount", "passiveCount"]);
  const arsiv = extractDetailNumber(data, ["arsivAracSayisi", "arsiv", "arsivArac", "archive", "archiveCount", "archivedCount"]);

  return { aktif, pasif, arsiv };
};

const extractStatisticValue = (data) => {
  if (Array.isArray(data)) return data.length;

  if (data && typeof data === "object") {
    const knownKeys = ["value", "count", "total", "toplam", "result"];
    for (const key of knownKeys) {
      const value = Number(data[key]);
      if (Number.isFinite(value)) return value;
    }
    return 0;
  }

  const numericValue = Number(data);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const formatStatisticValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";

  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return "-";

  const strValue = String(value).trim();
  const parts = strValue.split(".");
  const decimalDigits = parts.length > 1 ? parts[1].length : 0;

  return parsedValue.toLocaleString(localStorage.getItem("i18nextLng"), {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  });
};

const VehicleStatisticsCards = ({ request }) => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    values: [0, 0, 0, 0],
    passive: 0,
    archive: 0,
  });

  const requestData = useMemo(
    () => ({
      searchTerm: request?.searchTerm || "",
      customFilters: request?.customFilters || null,
      requestId: request?.requestId ?? 0,
    }),
    [request]
  );

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const filterPayload = buildStatisticsFilterPayload(requestData.customFilters);

        const [type1, type2, type3, type4] = await Promise.all([
          AxiosInstance.post(`VehicleStatistics/GetInfoByType?type=1&parameter=${requestData.searchTerm}`, filterPayload),
          AxiosInstance.post(`VehicleStatistics/GetInfoByType?type=2&parameter=${requestData.searchTerm}`, filterPayload),
          AxiosInstance.post(`VehicleStatistics/GetInfoByType?type=3&parameter=${requestData.searchTerm}`, filterPayload),
          AxiosInstance.post(`VehicleStatistics/GetInfoByType?type=4&parameter=${requestData.searchTerm}`, filterPayload),
        ]);

        const type1Counts = extractType1Counts(type1.data);

        setStatistics({
          values: [type1Counts.aktif, extractStatisticValue(type2.data), extractStatisticValue(type3.data), extractStatisticValue(type4.data)],
          passive: type1Counts.pasif,
          archive: type1Counts.arsiv,
        });
      } catch {
        setStatistics({
          values: [0, 0, 0, 0],
          passive: 0,
          archive: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [requestData]);

  const cardConfigs = [
    {
      title: t("aktifAracKartBaslik"),
      subtitle: `${t("pasif")}: ${formatStatisticValue(statistics.passive)} | ${t("arsiv")}: ${formatStatisticValue(statistics.archive)}`,
      icon: <CarOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
      showInfo: false,
    },
    {
      title: t("kritikSureciOlan"),
      subtitle: t("sigortaMuayeneKiralamaBitisi"),
      icon: <SafetyCertificateOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
      showInfo: false,
    },
    {
      title: t("bakimdaIslemde"),
      subtitle: t("servisVeyaBakimDevam"),
      icon: <ToolOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
      showInfo: false,
    },
    {
      title: t("yenilemeAdayi"),
      subtitle: t("yasKmGiderSkoruOncelik"),
      icon: <ReloadOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
      showInfo: true,
    },
  ];

  return (
    <Spin spinning={loading} size="small">
      <div style={{ display: "flex", gap: "18px", marginBottom: "15px", flexWrap: "wrap" }}>
        {cardConfigs.map((card, index) => (
          <div
            key={`vehicle-stat-${index + 1}`}
            style={{
              backgroundColor: "white",
              padding: "18px 20px",
              borderRadius: "18px",
              flex: "1 1 260px",
              border: "1px solid #e4e8ed",
              boxShadow: "0 1px 3px rgba(16, 24, 40, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#5d6786", lineHeight: "20px" }}>{card.title}</span>
                {card.showInfo ? <InfoCircleOutlined style={{ color: "#8a94a8" }} /> : null}
              </div>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  border: "1px solid #e4e8ed",
                  backgroundColor: "#f9fbfd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "12px", lineHeight: "30px" }}>{formatStatisticValue(statistics.values[index])}</div>
            <div style={{ borderTop: "1px solid #eceff3", marginBottom: "14px" }} />
            <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: "18px" }}>
              {card.subtitle}
            </div>
          </div>
        ))}
      </div>
    </Spin>
  );
};

export default VehicleStatisticsCards;
