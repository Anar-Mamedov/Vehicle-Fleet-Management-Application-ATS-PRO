import React from "react";
import { Card, Empty, Space, Typography } from "antd";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import CardActionMenu from "./CardActionMenu";
import { cardBorder, chartColors } from "../utils/constants";

const { Text, Title } = Typography;

function CustomAreaTooltip({ active, payload, formatter }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)", padding: "12px 14px", minWidth: 220 }}>
      <Text strong style={{ display: "block", color: "#0f172a" }}>
        {item.plate}
      </Text>
      <Text style={{ display: "block", color: "#475569", marginTop: 6 }}>{item.model || "-"}</Text>
      {item.original?.yil ? (
        <Text style={{ display: "block", color: "#64748b", marginTop: 4 }}>
          Yıl: {item.original.yil}
        </Text>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, borderTop: "1px solid #f1f5f9", marginTop: 10, paddingTop: 10 }}>
        <Text type="secondary">Değer</Text>
        <Text strong>{formatter(item.value)}</Text>
      </div>
    </div>
  );
}

CustomAreaTooltip.propTypes = {
  active: PropTypes.bool,
  formatter: PropTypes.func.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        model: PropTypes.string,
        original: PropTypes.shape({
          yil: PropTypes.number,
        }),
        plate: PropTypes.string,
        value: PropTypes.number,
      }),
    })
  ),
};

CustomAreaTooltip.defaultProps = {
  active: false,
  payload: [],
};

export default function AreaRankingCard({ title, icon, data, color, softColor, formatter, unitLabel, gradientId, onRefresh }) {
  const Icon = icon;

  const renderChart = (height) => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.32} />
            <stop offset="100%" stopColor={softColor} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={chartColors.grid} horizontal vertical={false} />
        <XAxis dataKey="plate" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: "#0f172a" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
        <RechartsTooltip content={<CustomAreaTooltip formatter={formatter} />} />
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`url(#${gradientId})`} dot={{ r: 3, strokeWidth: 2, fill: color, stroke: "#fff" }} activeDot={{ r: 5, strokeWidth: 2, fill: color, stroke: "#fff" }} />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 20, border: cardBorder, minHeight: 420, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
      bodyStyle={{ padding: 20 }}
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
          <CardActionMenu infoTitle={title} renderFullscreenContent={() => renderChart(560)} onRefresh={onRefresh} />
        </Space>
      </div>

      {data.length ? (
        renderChart(292)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Veri yok" />
      )}
    </Card>
  );
}

AreaRankingCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      plate: PropTypes.string,
      model: PropTypes.string,
      original: PropTypes.shape({}),
      value: PropTypes.number,
    })
  ).isRequired,
  color: PropTypes.string.isRequired,
  softColor: PropTypes.string.isRequired,
  formatter: PropTypes.func.isRequired,
  unitLabel: PropTypes.string.isRequired,
  gradientId: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
