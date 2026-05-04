import React, { useMemo } from "react";
import { Card, Empty, Space, Typography } from "antd";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import CardActionMenu from "./CardActionMenu";
import { cardBorder, chartColors, dividerBorder, flexDisplay, mutedTextColor, spaceBetween, titleTextColor } from "../utils/constants";

const { Text } = Typography;

export default function RankingCard({ title, icon, data, color, formatter, unitLabel, onRefresh }) {
  const Icon = icon;
  const chartData = useMemo(() => data.slice(0, 10), [data]);

  const renderChart = (height) => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 18, left: 4, bottom: 0 }}>
        <CartesianGrid stroke={chartColors.grid} horizontal vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: mutedTextColor }} />
        <YAxis dataKey="plate" type="category" width={108} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: titleTextColor }} />
        <RechartsTooltip
          cursor={{ fill: "rgba(15,23,42,0.04)" }}
          content={({ active, payload }) => {
            const item = payload?.[0]?.payload;
            if (!active || !item) return null;
            return (
              <div style={{ background: "#fff", border: cardBorder, borderRadius: 8, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)", padding: 10, minWidth: 220 }}>
                <Text strong>{item.plate}</Text>
                <div style={{ color: mutedTextColor, fontSize: 12, marginTop: 4 }}>{item.model}</div>
                <div style={{ display: flexDisplay, justifyContent: spaceBetween, gap: 12, borderTop: dividerBorder, marginTop: 8, paddingTop: 8 }}>
                  <Text type="secondary">Değer</Text>
                  <Text strong>{formatter(item.value)}</Text>
                </div>
              </div>
            );
          }}
        />
        <Bar dataKey="value" fill={color} radius={[0, 8, 8, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 20, border: cardBorder, minHeight: 420, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
      bodyStyle={{ padding: 18 }}
      title={
        <Space size={8}>
          <Icon style={{ color }} />
          <span>{title}</span>
        </Space>
      }
      extra={
        <Space size={10}>
          <Text type="secondary">{unitLabel}</Text>
          <CardActionMenu infoTitle={title} renderFullscreenContent={() => renderChart(560)} onRefresh={onRefresh} />
        </Space>
      }
    >
      {chartData.length ? (
        renderChart(300)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Veri yok" />
      )}
    </Card>
  );
}

RankingCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      plate: PropTypes.string,
      model: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  color: PropTypes.string.isRequired,
  formatter: PropTypes.func.isRequired,
  unitLabel: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
