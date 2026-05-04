import React, { useMemo } from "react";
import { Card, Space, Table, Tag, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import FormattedDate, { formatDateByLocale } from "../../../../components/FormattedDate";
import CardActionMenu from "./CardActionMenu";
import { cardBorder, mutedTextColor, vehicleColumnTitle } from "../utils/constants";
import { formatCurrency, formatNumber, getVehicleSubTitle, safeText } from "../utils/formatters";
import { normalizeArray } from "../utils/dataMappers";
import { downloadJsonAsXlsx } from "../utils/exporters";

const { Text } = Typography;

export default function AdvancedFailureTable({ data, onRefresh }) {
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
      { title: "Toplam Arıza", dataIndex: "toplamArizaSayisi", key: "toplamArizaSayisi", width: 120, render: (value) => <Tag color="red">{formatNumber(value)}</Tag> },
      { title: "Arıza Maliyeti", dataIndex: "toplamArizaTutar", key: "toplamArizaTutar", width: 140, render: formatCurrency },
      { title: "Arıza Sıklığı", dataIndex: "arizaSikligiAylik", key: "arizaSikligiAylik", width: 130, render: (value) => `${formatNumber(value)} / ay` },
      { title: "Kullanım (km)", dataIndex: "kullanimKm", key: "kullanimKm", width: 130, render: formatNumber },
      { title: "Ort. Tamir Süresi", dataIndex: "ortalamaTamirSuresi", key: "ortalamaTamirSuresi", width: 150, render: (value) => `${formatNumber(value)} saat` },
      { title: "Son Arıza Tarihi", dataIndex: "sonArizaTarih", key: "sonArizaTarih", width: 150, render: (value) => <FormattedDate date={value} /> },
      {
        title: "Lokasyon",
        dataIndex: "lokasyon",
        key: "lokasyon",
        width: 150,
        render: (value) => (
          <Tag color="blue">
            <Space size={4}>
              <EnvironmentOutlined />
              {safeText(value)}
            </Space>
          </Tag>
        ),
      },
    ],
    []
  );

  const renderTable = (scrollY) => (
    <Table rowKey={(_, index) => `failure-${index}`} columns={columns} dataSource={normalizeArray(data)} pagination={false} scroll={{ x: 1160, y: scrollY }} size="middle" />
  );

  const handleDownload = () => {
    const rows = normalizeArray(data).map((record) => ({
      [vehicleColumnTitle]: safeText(record.plaka),
      "Araç Bilgisi": getVehicleSubTitle(record),
      "Toplam Arıza": formatNumber(record.toplamArizaSayisi),
      "Arıza Maliyeti": formatCurrency(record.toplamArizaTutar),
      "Arıza Sıklığı": `${formatNumber(record.arizaSikligiAylik)} / ay`,
      "Kullanım (km)": formatNumber(record.kullanimKm),
      "Ort. Tamir Süresi": `${formatNumber(record.ortalamaTamirSuresi)} saat`,
      "Son Arıza Tarihi": formatDateByLocale(record.sonArizaTarih),
      Lokasyon: safeText(record.lokasyon),
    }));

    downloadJsonAsXlsx(rows, "En Çok Arıza Yapan Araçlar");
  };

  return (
    <Card bordered={false} style={{ borderRadius: 20, border: cardBorder }} title="En Çok Arıza Yapan Araçlar" extra={<CardActionMenu infoTitle="En Çok Arıza Yapan Araçlar" renderFullscreenContent={() => renderTable("62vh")} onRefresh={onRefresh} onDownload={handleDownload} />}>
      {renderTable(undefined)}
    </Card>
  );
}

AdvancedFailureTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ plaka: PropTypes.string })),
  onRefresh: PropTypes.func.isRequired,
};

AdvancedFailureTable.defaultProps = {
  data: [],
};
