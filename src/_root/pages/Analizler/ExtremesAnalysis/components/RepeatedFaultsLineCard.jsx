import React from "react";
import { Card, Empty, Space, Tag, Typography } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import { cardBorder, chartColors } from "../utils/constants";

const { Text, Title } = Typography;

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload || {};

  return (
    <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)", padding: "10px 12px", minWidth: 220 }}>
      <Text strong>{label}</Text>
      {payload
        .filter((item) => Number(item.value) > 0)
        .map((item) => {
          const labelKey = `${item.dataKey}Tanim`;
          return (
            <div key={item.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 8 }}>
              <span style={{ color: item.color }}>{item.name}</span>
              <span style={{ fontWeight: 700 }}>{`${row[labelKey] || "-"} (${item.value})`}</span>
            </div>
          );
        })}
    </div>
  );
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      dataKey: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.number,
      payload: PropTypes.shape({}),
    })
  ),
};

CustomTooltip.defaultProps = {
  active: false,
  label: "",
  payload: [],
};

export default function RepeatedFaultsLineCard({ data }) {
  const labelByRank = {
    sira1: data.find((item) => item.sira1Tanim)?.sira1Tanim || "1. Sıra",
    sira2: data.find((item) => item.sira2Tanim)?.sira2Tanim || "2. Sıra",
    sira3: data.find((item) => item.sira3Tanim)?.sira3Tanim || "3. Sıra",
  };

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 20, border: cardBorder, minHeight: 420, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
      bodyStyle={{ padding: 20 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Space align="center" size={8}>
          <ThunderboltOutlined style={{ color: chartColors.blue }} />
          <Title level={5} style={{ margin: 0 }}>
            En Çok Tekrar Eden Arıza Türleri
          </Title>
        </Space>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Son 6 ay
        </Text>
      </div>

      {data.length ? (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={chartColors.grid} horizontal vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: "#0f172a" }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="sira1" name={labelByRank.sira1} stroke={chartColors.red} strokeWidth={3} dot={{ r: 3, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 5 }} connectNulls />
              <Line type="monotone" dataKey="sira2" name={labelByRank.sira2} stroke={chartColors.orange} strokeWidth={3} dot={{ r: 3, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 5 }} connectNulls />
              <Line type="monotone" dataKey="sira3" name={labelByRank.sira3} stroke={chartColors.blue} strokeWidth={3} dot={{ r: 3, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 5 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag color="red">{labelByRank.sira1}</Tag>
            <Tag color="gold">{labelByRank.sira2}</Tag>
            <Tag color="blue">{labelByRank.sira3}</Tag>
          </div>
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Veri yok" />
      )}
    </Card>
  );
}

RepeatedFaultsLineCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      sira1: PropTypes.number,
      sira2: PropTypes.number,
      sira3: PropTypes.number,
      sira1Tanim: PropTypes.string,
      sira2Tanim: PropTypes.string,
      sira3Tanim: PropTypes.string,
    })
  ).isRequired,
};
