import React, { useMemo } from "react";
import { StockOutlined } from "@ant-design/icons";
import { Card, Empty, Space, Tooltip, Typography } from "antd";
import { t } from "i18next";
import PropTypes from "prop-types";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import CardActionMenu from "./CardActionMenu";
import { cardBorder } from "../utils/constants";

const { Text, Title } = Typography;

export default function RepeatedFaultsLineCard({ data, onRefresh }) {
  const maxValue = useMemo(() => Math.max(...data.map((item) => item.value), 1), [data]);

  const formatCurrency = (value) => `₺${formatNumberWithLocale(value)}`;
  const renderList = (height) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, height, overflowY: "auto", paddingRight: 6 }}>
      {data.slice(0, 10).map((item) => {
        const percent = Math.max((item.value / maxValue) * 100, 12);

        return (
          <Tooltip key={item.key} title={`${item.plate} • ${item.model} • ${formatCurrency(item.value)}`}>
            <div
              style={{
                borderRadius: 18,
                border: "1px solid #8cecf4",
                background: "linear-gradient(180deg, #f8feff 0%, #f1fcff 100%)",
                boxShadow: "0 8px 18px rgba(32, 197, 207, 0.06)",
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                <div style={{ minWidth: 0, fontSize: 13, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.plate}
                </div>
                <div style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#20c5cf", whiteSpace: "nowrap" }}>{formatCurrency(item.value)}</div>
              </div>

              <div style={{ height: 10, borderRadius: 999, background: "#c8f1f5", overflow: "hidden" }}>
                <div style={{ width: `${percent}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #20c5cf 0%, #28c5c8 100%)" }} />
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 20, border: cardBorder, minHeight: 420, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
      styles={{ body: { padding: 16 } }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <Space align="center" size={8}>
          <StockOutlined style={{ color: "#20c5cf" }} />
          <Title level={5} style={{ margin: 0 }}>
            {t("enYuksekHgsMaliyetiOlanAraclar")}
          </Title>
        </Space>
        <Space size={10}>
          <Text type="secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
            {t("toplamHgsTutari")}
          </Text>
          <CardActionMenu infoTitle={t("enYuksekHgsMaliyetiOlanAraclar")} renderFullscreenContent={() => renderList(560)} onRefresh={onRefresh} />
        </Space>
      </div>

      {data.length ? (
        renderList(340)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("veriYok")} />
      )}
    </Card>
  );
}

RepeatedFaultsLineCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      model: PropTypes.string,
      plate: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  onRefresh: PropTypes.func.isRequired,
};
