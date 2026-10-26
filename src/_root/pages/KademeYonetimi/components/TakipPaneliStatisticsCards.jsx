import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import { getTiklamaOzellikleri } from "./kpiKartTiklama";

const CARD_BORDER_COLOR = "#f0f0f0";

// Başarılı yanıt doğrudan sayıdır; hata gövdesi ({ status: false, statusCode, message }) değer olarak gösterilmez
const extractStatisticValue = (data) => (typeof data === "number" && Number.isFinite(data) ? data : null);

// Backend'in gönderdiği ondalık hane sayısı korunarak formatlanır
const formatStatisticValue = (value) => {
  if (value === null) return "-";

  const decimalPart = String(value).split(".")[1];
  const decimalDigits = decimalPart ? decimalPart.length : 0;

  return formatNumberWithLocale(value, decimalDigits, decimalDigits);
};

// Takip panellerinin KPI kutuları: her kutu için servis ayrı type ile, liste ile aynı arama ve filtre gövdesiyle çağrılır.
// onFiltreSec verilirse durumIds tanımlı kutular tıklanabilir olur ve tıklanınca o durumlar filtre olarak bildirilir.
const TakipPaneliStatisticsCards = ({ request, cards, fetchStatistic, onFiltreSec }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  const requestData = useMemo(
    () => ({
      searchTerm: request?.searchTerm || "",
      filters: request?.filters || null,
      requestId: request?.requestId ?? 0,
    }),
    [request]
  );

  // Kutu tanımları her render'da yeniden oluşabildiği için istekler yalnızca type listesi değişince tekrarlanır
  const statisticTypesKey = cards.map((card) => card.type).join(",");
  const statisticTypes = useMemo(() => statisticTypesKey.split(",").map(Number), [statisticTypesKey]);

  useEffect(() => {
    let ignore = false;

    const fetchStatistics = async () => {
      setLoading(true);
      try {
        // Bir kutunun hatası diğer kutuların değerini etkilemesin diye istekler ayrı ayrı değerlendirilir
        const results = await Promise.allSettled(statisticTypes.map((type) => fetchStatistic(type, requestData.searchTerm, requestData.filters)));
        if (ignore) return;

        setValues(
          statisticTypes.reduce((acc, type, index) => {
            const result = results[index];
            return { ...acc, [type]: result.status === "fulfilled" ? extractStatisticValue(result.value?.data) : null };
          }, {})
        );
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchStatistics();

    return () => {
      ignore = true;
    };
  }, [requestData, statisticTypes, fetchStatistic]);

  return (
    <Spin spinning={loading} size="small">
      <div style={{ display: "flex", gap: "15px", marginBottom: "15px", flexWrap: "wrap" }}>
        {cards.map((card) => {
          const tiklanabilir = Boolean(card.durumIds && onFiltreSec);

          return (
            <div
              key={card.type}
              {...(tiklanabilir ? getTiklamaOzellikleri(() => onFiltreSec(card.durumIds)) : {})}
              style={{
                backgroundColor: "white",
                padding: "10px 16px",
                borderRadius: "8px",
                flex: "1 1 180px",
                border: `1px solid ${CARD_BORDER_COLOR}`,
                height: "88px",
                boxSizing: "border-box",
                overflow: "hidden",
                cursor: tiklanabilir ? "pointer" : "default",
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
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#141414", lineHeight: "28px" }}>{formatStatisticValue(values[card.type] ?? null)}</div>
            </div>
          );
        })}
      </div>
    </Spin>
  );
};

TakipPaneliStatisticsCards.propTypes = {
  request: PropTypes.shape({
    searchTerm: PropTypes.string,
    filters: PropTypes.object,
    requestId: PropTypes.number,
  }),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.node,
      durumIds: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  fetchStatistic: PropTypes.func.isRequired,
  onFiltreSec: PropTypes.func,
};

export default TakipPaneliStatisticsCards;
