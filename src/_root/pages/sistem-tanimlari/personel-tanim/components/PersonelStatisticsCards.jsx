import React, { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";
import { MobileOutlined, TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { GetEmployeeStatisticsByTypeService } from "../../../../../api/services/personel_services";

const CARD_BORDER_COLOR = "#f0f0f0";
const ICON_STYLE = { fontSize: 22, color: "#6b7a8a" };

// Kutu sıralaması soldan sağa: 1 Toplam Personel, 2 Aktif Personel, 3 Mobil Kullanım Oranı
const STATISTIC_TYPES = [1, 2, 3];

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

const PersonelStatisticsCards = ({ request }) => {
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
    let ignore = false;

    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(STATISTIC_TYPES.map((type) => GetEmployeeStatisticsByTypeService(type, requestData.searchTerm, requestData.filters)));

        if (!ignore) setValues(responses.map((response) => extractStatisticValue(response.data)));
      } catch {
        if (!ignore) setValues([0, 0, 0]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchStatistics();

    return () => {
      ignore = true;
    };
  }, [requestData]);

  const cardConfigs = [
    {
      title: t("toplamPersonel"),
      value: formatStatisticValue(values[0]),
      subtitle: t("listelenenToplamPersonelKaydi"),
      icon: <TeamOutlined style={ICON_STYLE} />,
    },
    {
      title: t("aktifPersonel"),
      value: formatStatisticValue(values[1]),
      subtitle: t("sistemdeAktifOlanPersonelKayitlari"),
      icon: <UsergroupAddOutlined style={ICON_STYLE} />,
    },
    {
      title: t("mobilKullanimOrani"),
      value: `%${formatStatisticValue(values[2])}`,
      subtitle: t("mobilErisimiAcikPersonelOrani"),
      icon: <MobileOutlined style={ICON_STYLE} />,
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

PersonelStatisticsCards.propTypes = {
  request: PropTypes.shape({
    searchTerm: PropTypes.string,
    filters: PropTypes.object,
    requestId: PropTypes.number,
  }),
};

export default PersonelStatisticsCards;
