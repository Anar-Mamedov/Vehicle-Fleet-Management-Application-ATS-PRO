import React, { useState, useCallback } from "react";
import { Modal, Table, message, Spin, Typography } from "antd";
import AxiosInstance from "../../../../../../../../api/http";
import dayjs from "dayjs";
import { t } from "i18next";
import { HistoryOutlined } from "@ant-design/icons";
import { formatNumberWithLocale } from "../../../../../../../../hooks/FormattedNumber";
import DetailUpdate from "../../../../../../vehicles-control/vehicle-detail/DetailUpdate";

const { Text } = Typography;

const Tarihce = ({ selectedRow, hidePopover }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    total_quantity: 0,
    total_cost: 0,
    avg_consumption: 0,
    avg_cost: 0,
  });

  // Vehicle Detail Modal States
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const buildPeriodRanges = useCallback(() => {
    const now = new Date();

    // UTC bileşenlerini kullan
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const date = now.getUTCDate();

    // Yıl (UTC)
    const startOfYear = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
    const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));

    // Ay (UTC)
    const startOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

    // Hafta (UTC, Pazartesi başlangıç)
    const dayOfWeekUTC = (now.getUTCDay() + 6) % 7; // Pazartesi=0
    const startOfWeek = new Date(Date.UTC(year, month, date - dayOfWeekUTC, 0, 0, 0, 0));
    const endOfWeek = new Date(Date.UTC(year, month, date - dayOfWeekUTC + 6, 23, 59, 59, 999));

    return {
      haftalikBaslangicTarih: startOfWeek.toISOString(),
      haftalikBitisTarih: endOfWeek.toISOString(),
      aylikBaslangicTarih: startOfMonth.toISOString(),
      aylikBitisTarih: endOfMonth.toISOString(),
      yillikBaslangicTarih: startOfYear.toISOString(),
      yillikBitisTarih: endOfYear.toISOString(),
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!selectedRow) return;

    setLoading(true);
    try {
      const dates = buildPeriodRanges();

      const payload = {
        siraNo: selectedRow.siraNo,
        type: selectedRow.limitTipi,
        limitType: {
          haftalikBaslangicTarih: dates.haftalikBaslangicTarih,
          haftalikBitisTarih: dates.haftalikBitisTarih,
          aylikBaslangicTarih: dates.aylikBaslangicTarih,
          aylikBitisTarih: dates.aylikBitisTarih,
          yillikBaslangicTarih: dates.yillikBaslangicTarih,
          yillikBitisTarih: dates.yillikBitisTarih,
        },
      };

      const response = await AxiosInstance.post(`FuelLimit/GetFuelListByLimitPeriod?setPointId=0&diff=0&parameter=`, payload);

      if (response.data) {
        setData(response.data.fuel_list || []);
        setStatistics({
          total_quantity: response.data.total_quantity || 0,
          total_cost: response.data.total_cost || 0,
          avg_consumption: response.data.avg_consumption || 0,
          avg_cost: response.data.avg_cost || 0,
        });
      } else {
        setData([]);
        setStatistics({
          total_quantity: 0,
          total_cost: 0,
          avg_consumption: 0,
          avg_cost: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching history data:", error);
      message.error(t("hataOlustu"));
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedRow, buildPeriodRanges]);

  const showModal = () => {
    setVisible(true);
    fetchData();
    if (hidePopover) hidePopover();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOpenDetail = (record) => {
    setSelectedVehicleId(record.aracId);
    setDetailModalOpen(true);
  };

  const columns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => handleOpenDetail(record)} style={{ color: "#1890ff", cursor: "pointer" }}>
          {text}
        </a>
      ),
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      width: 120,
      render: (text) => (text ? dayjs(text).format("DD.MM.YYYY") : ""),
    },
    {
      title: t("saat"),
      dataIndex: "saat",
      key: "saat",
      width: 100,
    },
    {
      title: t("yakitTipi"),
      dataIndex: "yakitTip",
      key: "yakitTip",
      width: 120,
      ellipsis: true,
    },
    {
      title: t("miktar"),
      dataIndex: "miktar",
      key: "miktar",
      width: 100,
      render: (val) => formatNumberWithLocale(val),
      align: "right",
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: "tutar",
      width: 100,
      render: (val) => formatNumberWithLocale(val),
      align: "right",
    },
    {
      title: t("birimFiyat"),
      dataIndex: "litreFiyat",
      key: "litreFiyat",
      width: 100,
      render: (val) => formatNumberWithLocale(val),
      align: "right",
    },
    {
      title: t("surucu"),
      dataIndex: "surucuAdi",
      key: "surucuAdi",
      width: 150,
      ellipsis: true,
    },
    {
      title: t("istasyon"),
      dataIndex: "istasyon",
      key: "istasyon",
      width: 150,
      ellipsis: true,
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 200,
      ellipsis: true,
    },
    {
      title: t("marka"),
      dataIndex: "marka",
      key: "marka",
      width: 120,
      ellipsis: true,
    },
    {
      title: t("model"),
      dataIndex: "model",
      key: "model",
      width: 120,
      ellipsis: true,
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 150,
      ellipsis: true,
    },
  ];

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px", cursor: "pointer" }} onClick={showModal}>
        <HistoryOutlined />
        <span style={{ fontSize: "14px" }}>{t("tarihce")}</span>
      </div>

      <Modal title={t("yakitHareketleri")} open={visible} onCancel={handleCancel} footer={null} width={1200} destroyOnClose centered>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="siraNo"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1500, y: 500 }}
            size="small"
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={4}>
                    <Text strong>{t("toplam")}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="right">
                    <Text strong>{formatNumberWithLocale(statistics.total_quantity)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <Text strong>{formatNumberWithLocale(statistics.total_cost)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={7} />
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </Spin>
      </Modal>

      {/* Vehicle Detail Modal */}
      {detailModalOpen && (
        <DetailUpdate
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          selectedId={selectedVehicleId}
          onSuccess={() => {
            // Optional: refresh logic if needed when returning from detail
          }}
          selectedRows1={[]} // Pass empty or relevant context if needed by DetailUpdate
        />
      )}
    </>
  );
};

export default Tarihce;
