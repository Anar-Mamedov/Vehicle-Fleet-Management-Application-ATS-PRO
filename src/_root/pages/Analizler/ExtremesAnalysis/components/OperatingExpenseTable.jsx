import React, { useMemo } from "react";
import { Card, Progress, Table, Typography } from "antd";
import PropTypes from "prop-types";
import { cardBorder, mutedTextColor, vehicleColumnTitle } from "../utils/constants";
import { formatCurrency, formatDecimalCurrency, formatNumber, getVehicleSubTitle, safeText } from "../utils/formatters";
import { normalizeArray } from "../utils/dataMappers";

const { Text } = Typography;

export default function OperatingExpenseTable({ data }) {
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
      { title: "Toplam Maliyet", dataIndex: "toplamMaliyet", key: "toplamMaliyet", width: 140, render: (value, record) => formatCurrency(value ?? record.toplamMaliyetTutar) },
      { title: "Yakıt", dataIndex: "toplamYakitTutar", key: "toplamYakitTutar", width: 120, render: formatCurrency },
      { title: "Bakım", dataIndex: "toplamBakimTutar", key: "toplamBakimTutar", width: 120, render: formatCurrency },
      { title: "Arıza", dataIndex: "toplamArizaTutar", key: "toplamArizaTutar", width: 120, render: formatCurrency },
      { title: "Sigorta", dataIndex: "toplamSigortaTutar", key: "toplamSigortaTutar", width: 120, render: formatCurrency },
      { title: "Harcama", dataIndex: "toplamHarcamaTutar", key: "toplamHarcamaTutar", width: 120, render: formatCurrency },
      { title: "Kullanım (km)", dataIndex: "toplamKm", key: "toplamKm", width: 130, render: formatNumber },
      {
        title: "Gider / km",
        dataIndex: "toplamGiderKm",
        key: "toplamGiderKm",
        width: 150,
        render: (value) => (
          <div>
            <Text strong>{formatDecimalCurrency(value)} / km</Text>
            <Progress percent={Math.min((Number(value) / 10) * 100, 100)} showInfo={false} size="small" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Card bordered={false} style={{ borderRadius: 20, border: cardBorder }} title="En Çok İşletme Gideri Olan Araçlar">
      <Table rowKey={(_, index) => `expense-${index}`} columns={columns} dataSource={normalizeArray(data)} pagination={false} scroll={{ x: 1180 }} size="middle" />
    </Card>
  );
}

OperatingExpenseTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ plaka: PropTypes.string })),
};

OperatingExpenseTable.defaultProps = {
  data: [],
};
