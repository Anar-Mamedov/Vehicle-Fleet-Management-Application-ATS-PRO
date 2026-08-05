import React, { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { MobileOutlined, SafetyOutlined, TeamOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import AxiosInstance from "../../../../../api/http";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

const CARD_BORDER_COLOR = "#f0f0f0";

// Kutu sıralaması soldan sağa 1, 3, 4 şeklindedir. type=2 (Zimmetli Sürücü) backend tarafında henüz hazır değil.
const STATISTIC_TYPES = [1, 3, 4];

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

// Backend'in gönderdiği ondalık hane sayısı korunarak formatlanır
const formatStatisticValue = (value) => {
  const decimalPart = String(value).split(".")[1];
  const decimalDigits = decimalPart ? decimalPart.length : 0;

  return formatNumberWithLocale(value, decimalDigits, decimalDigits);
};

const DriverStatisticsCards = ({ request }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([0, 0, 0]);

  const requestData = useMemo(
    () => ({
      searchTerm: request?.searchTerm || "",
      filters: request?.filters || null,
      requestId: request?.requestId ?? 0,
    }),
    [request]
  );

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          STATISTIC_TYPES.map((type) =>
            AxiosInstance.post(`DriverStatistics/GetInfoByType?type=${type}&parameter=${encodeURIComponent(requestData.searchTerm)}`, requestData.filters)
          )
        );

        setValues(responses.map((response) => extractStatisticValue(response.data)));
      } catch {
        setValues([0, 0, 0]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [requestData]);

  const cardConfigs = [
    {
      title: t("toplamSurucu"),
      value: formatStatisticValue(values[0]),
      subtitle: t("listelenenToplamSurucuKaydi"),
      icon: <TeamOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
    },
    {
      title: t("mobilKullanimOrani"),
      value: `%${formatStatisticValue(values[1])}`,
      subtitle: t("mobilErisimiAktifSuruculer"),
      icon: <MobileOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
    },
    {
      title: t("cezaPuaniBulunan"),
      value: formatStatisticValue(values[2]),
      subtitle: t("cezaPuaniSifirdanBuyukSuruculer"),
      icon: <SafetyOutlined style={{ fontSize: 22, color: "#6b7a8a" }} />,
    },
  ];

  return (
    <Spin spinning={loading} size="small">
      <div style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
        {cardConfigs.map((card) => (
          <div
            key={card.title}
            style={{
              backgroundColor: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              flex: "1 1 260px",
              border: `1px solid ${CARD_BORDER_COLOR}`,
              height: "112px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#5d6786", lineHeight: "20px" }}>{card.title}</span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: `1px solid ${CARD_BORDER_COLOR}`,
                  backgroundColor: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", marginBottom: "4px", lineHeight: "28px" }}>{card.value}</div>
            <div style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "18px", fontWeight: 400 }}>{card.subtitle}</div>
          </div>
        ))}
      </div>
    </Spin>
  );
};

DriverStatisticsCards.propTypes = {
  request: PropTypes.shape({
    searchTerm: PropTypes.string,
    filters: PropTypes.object,
    requestId: PropTypes.number,
  }),
};

export default DriverStatisticsCards;
