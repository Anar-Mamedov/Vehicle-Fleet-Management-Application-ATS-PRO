import React, { useMemo } from "react";
import { Card, Table, Typography } from "antd";
import PropTypes from "prop-types";
import { cardBorder, mutedTextColor, vehicleColumnTitle } from "../utils/constants";
import { formatNumber, getVehicleSubTitle, safeText } from "../utils/formatters";
import { normalizeArray } from "../utils/dataMappers";

const { Text } = Typography;

export default function ServiceDurationTable({ data }) {
  const columns = useMemo(
    () => [
      {
        title: vehicleColumnTitle,
        dataIndex: "plaka",
        key: "plaka",
        fixed: "left",
        width: 220,
        render: (_, record) => (
          <div>
            <Text strong>{safeText(record.plaka)}</Text>
            <div style={{ fontSize: 12, color: mutedTextColor }}>{getVehicleSubTitle(record)}</div>
          </div>
        ),
      },
      { title: "Başlama", dataIndex: "baslamaTarih", key: "baslamaTarih", width: 170, render: (value, record) => `${safeText(value)} ${safeText(record.baslamaSaat, "")}`.trim() },
      { title: "Bitiş", dataIndex: "bitisTarih", key: "bitisTarih", width: 170, render: (value, record) => `${safeText(value)} ${safeText(record.bitisSaat, "")}`.trim() },
      { title: "Servis Süresi", dataIndex: "servisSuresiDk", key: "servisSuresiDk", width: 140, render: (value) => `${formatNumber(value)} dk` },
    ],
    []
  );

  return (
    <Card bordered={false} style={{ borderRadius: 8, border: cardBorder }} title="En Uzun Serviste Kalan Araçlar">
      <Table rowKey={(_, index) => `service-${index}`} columns={columns} dataSource={normalizeArray(data)} pagination={false} scroll={{ x: 720 }} size="middle" />
    </Card>
  );
}

ServiceDurationTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ plaka: PropTypes.string })),
};

ServiceDurationTable.defaultProps = {
  data: [],
};
