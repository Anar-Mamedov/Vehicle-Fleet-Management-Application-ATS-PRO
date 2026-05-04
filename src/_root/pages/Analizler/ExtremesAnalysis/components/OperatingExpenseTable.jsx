import React, { useMemo } from "react";
import { Card, Progress, Table, Typography } from "antd";
import PropTypes from "prop-types";
import CardActionMenu from "./CardActionMenu";
import { cardBorder, mutedTextColor, vehicleColumnTitle } from "../utils/constants";
import { formatCurrency, formatDecimalCurrency, formatNumber, getVehicleSubTitle, safeText } from "../utils/formatters";
import { normalizeArray } from "../utils/dataMappers";
import { downloadJsonAsXlsx } from "../utils/exporters";

const { Text } = Typography;

export default function OperatingExpenseTable({ data, onRefresh }) {
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
      { title: "Toplam Gider", dataIndex: "toplamMaliyet", key: "toplamMaliyet", width: 140, render: (value, record) => formatCurrency(value ?? record.toplamMaliyetTutar) },
      { title: "Yakıt", dataIndex: "toplamYakitTutar", key: "toplamYakitTutar", width: 120, render: formatCurrency },
      { title: "Servis Gideri", dataIndex: "toplamServisTutar", key: "toplamServisTutar", width: 140, render: formatCurrency },
      { title: "HGS", dataIndex: "toplamHgsTutar", key: "toplamHgsTutar", width: 120, render: formatCurrency },
      { title: "Sigorta / Vergi", dataIndex: "toplamSigortaTutar", key: "toplamSigortaTutar", width: 150, render: formatCurrency },
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

  const renderTable = (scrollY) => (
    <Table rowKey={(_, index) => `expense-${index}`} columns={columns} dataSource={normalizeArray(data)} pagination={false} scroll={{ x: 1180, y: scrollY }} size="middle" />
  );

  const handleDownload = () => {
    const rows = normalizeArray(data).map((record) => ({
      [vehicleColumnTitle]: safeText(record.plaka),
      "Araç Bilgisi": getVehicleSubTitle(record),
      "Toplam Gider": formatCurrency(record.toplamMaliyet ?? record.toplamMaliyetTutar),
      Yakıt: formatCurrency(record.toplamYakitTutar),
      "Servis Gideri": formatCurrency(record.toplamServisTutar),
      HGS: formatCurrency(record.toplamHgsTutar),
      "Sigorta / Vergi": formatCurrency(record.toplamSigortaTutar),
      "Kullanım (km)": formatNumber(record.toplamKm),
      "Gider / km": `${formatDecimalCurrency(record.toplamGiderKm)} / km`,
    }));

    downloadJsonAsXlsx(rows, "En Çok İşletme Gideri Olan Araçlar");
  };

  return (
    <Card bordered={false} style={{ borderRadius: 20, border: cardBorder }} title="En Çok İşletme Gideri Olan Araçlar" extra={<CardActionMenu infoTitle="En Çok İşletme Gideri Olan Araçlar" renderFullscreenContent={() => renderTable("62vh")} onRefresh={onRefresh} onDownload={handleDownload} />}>
      {renderTable(undefined)}
    </Card>
  );
}

OperatingExpenseTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ plaka: PropTypes.string })),
  onRefresh: PropTypes.func.isRequired,
};

OperatingExpenseTable.defaultProps = {
  data: [],
};
