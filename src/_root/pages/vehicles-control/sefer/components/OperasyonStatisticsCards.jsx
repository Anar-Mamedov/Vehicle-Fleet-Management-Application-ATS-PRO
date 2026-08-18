import React, { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { CarOutlined, CreditCardOutlined, FileTextOutlined, InboxOutlined, SwapOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { GetExpeditionStatisticsByTypeService } from "../../../../../api/services/vehicles/operations_services";

const CARD_BORDER_COLOR = "#f0f0f0";
const ICON_STYLE = { fontSize: 22, color: "#6b7a8a" };

// Kutu sıralaması soldan sağa: 1 Toplam Operasyon, 2 Toplam Hareket, 3 Toplam Sefer, 4 Toplam Miktar, 5 Toplam Tutar
const STATISTIC_TYPES = [1, 2, 3, 4, 5];

const NUMERIC_KEYS = ["value", "count", "total", "toplam", "miktar", "deger", "tutar", "result"];
const UNIT_KEYS = ["birim", "birimAdi", "olcuBirimi", "unit"];

const getNumericValue = (item) => {
  for (const key of NUMERIC_KEYS) {
    const value = Number(item?.[key]);
    if (Number.isFinite(value)) return value;
  }
  return null;
};

const getUnitLabel = (item) => {
  for (const key of UNIT_KEYS) {
    const value = item?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const extractStatisticValue = (data) => {
  if (Array.isArray(data)) return data.length;

  if (data && typeof data === "object") {
    const value = getNumericValue(data);
    return value === null ? 0 : value;
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

// Toplam miktar birim bazında döndüğünde "37,5 m³ · 60 Ton" şeklinde bir kırılım satırı gösterilir
const extractMiktarBreakdown = (data) => {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      const miktar = getNumericValue(item);
      const birim = getUnitLabel(item);
      return miktar === null || !birim ? "" : `${formatStatisticValue(miktar)} ${birim}`;
    })
    .filter(Boolean);
};

const OperasyonStatisticsCards = ({ request }) => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  const requestData = useMemo(
    () => ({
      searchTerm: request?.searchTerm || "",
      filters: request?.filters || null,
      requestId: request?.requestId ?? 0,
    }),
    [request]
  );

  useEffect(() => {
    let ignore = false;

    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const result = await Promise.all(STATISTIC_TYPES.map((type) => GetExpeditionStatisticsByTypeService(type, requestData.searchTerm, requestData.filters)));

        if (!ignore) setResponses(result.map((response) => response.data));
      } catch {
        if (!ignore) setResponses([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchStatistics();

    return () => {
      ignore = true;
    };
  }, [requestData]);

  const values = STATISTIC_TYPES.map((_, index) => extractStatisticValue(responses[index]));
  const miktarBreakdown = extractMiktarBreakdown(responses[3]);

  const cardConfigs = [
    {
      title: t("toplamOperasyon"),
      value: formatStatisticValue(values[0]),
      subtitle: t("seciliDonemdekiToplamOperasyonSayisi"),
      icon: <FileTextOutlined style={ICON_STYLE} />,
    },
    {
      title: t("toplamHareket"),
      value: formatStatisticValue(values[1]),
      subtitle: t("operasyonlaraBagliToplamHareketSayisi"),
      icon: <SwapOutlined style={ICON_STYLE} />,
    },
    {
      title: t("toplamSefer"),
      value: formatStatisticValue(values[2]),
      subtitle: t("seciliDonemdekiToplamSeferSayisi"),
      icon: <CarOutlined style={ICON_STYLE} />,
    },
    {
      title: t("toplamMiktar"),
      value: miktarBreakdown.length > 0 ? `${miktarBreakdown.length} ${t("birim")}` : formatStatisticValue(values[3]),
      detail: miktarBreakdown.join(" · "),
      subtitle: t("seciliDonemdekiToplamOperasyonMiktari"),
      icon: <InboxOutlined style={ICON_STYLE} />,
    },
    {
      title: t("operasyonToplamTutar"),
      value: `₺${formatStatisticValue(values[4])}`,
      subtitle: t("seciliDonemdekiToplamOperasyonTutari"),
      icon: <CreditCardOutlined style={ICON_STYLE} />,
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
              minHeight: "112px",
              boxSizing: "border-box",
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
            {card.detail ? <div style={{ fontSize: "11px", color: "#8c8c8c", lineHeight: "16px", fontWeight: 400 }}>{card.detail}</div> : null}
            <div style={{ fontSize: "12px", color: "#8c8c8c", lineHeight: "18px", fontWeight: 400 }}>{card.subtitle}</div>
          </div>
        ))}
      </div>
    </Spin>
  );
};

OperasyonStatisticsCards.propTypes = {
  request: PropTypes.shape({
    searchTerm: PropTypes.string,
    filters: PropTypes.object,
    requestId: PropTypes.number,
  }),
};

export default OperasyonStatisticsCards;
