import React, { useMemo } from "react";
import { Card, Empty, Space, Tooltip, Typography } from "antd";
import PropTypes from "prop-types";
import CardActionMenu from "./CardActionMenu";
import { cardBorder } from "../utils/constants";
import { downloadVehicleChartPdf } from "../utils/exporters";

const { Text, Title } = Typography;

export default function ScrollRankingCard({ title, icon, data, color, softColor, formatter, unitLabel, onRefresh }) {
  const Icon = icon;
  const maxValue = useMemo(() => Math.max(...data.map((item) => item.value), 1), [data]);

  const renderList = (height, scrollable = true) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, height, overflowY: scrollable ? "auto" : "visible", paddingRight: 4 }}>
      {data.slice(0, 10).map((item, index) => {
        const percent = Math.max((item.value / maxValue) * 100, 8);
        const isTop = index < 3;

        return (
          <Tooltip key={item.key} title={`${item.plate} • ${item.model} • ${formatter(item.value)}`}>
            <div style={{ padding: "10px 12px", borderRadius: 14, border: `1px solid ${isTop ? softColor : "#e5e7eb"}`, background: "#ffffff" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <div title={item.plate} style={{ minWidth: 0, fontSize: 13, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.plate}
                </div>
                <div style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color, whiteSpace: "nowrap" }}>{formatter(item.value)}</div>
              </div>
              <div style={{ height: 8, background: softColor, borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${percent}%`, height: "100%", background: color, borderRadius: 999 }} />
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
      bodyStyle={{ padding: 16 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Space align="center" size={8}>
          <Icon style={{ color }} />
          <Title level={5} style={{ margin: 0 }}>
            {title}
          </Title>
        </Space>
        <Space size={10}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {unitLabel}
          </Text>
          <CardActionMenu
            infoTitle={title}
            renderFullscreenContent={() => renderList(560)}
            onRefresh={onRefresh}
            onDownload={() => downloadVehicleChartPdf({ title, subtitle: unitLabel, data, formatter })}
          />
        </Space>
      </div>

      {data.length ? renderList(340) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Veri yok" />}
    </Card>
  );
}

ScrollRankingCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      plate: PropTypes.string,
      model: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  color: PropTypes.string.isRequired,
  softColor: PropTypes.string.isRequired,
  formatter: PropTypes.func.isRequired,
  unitLabel: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
