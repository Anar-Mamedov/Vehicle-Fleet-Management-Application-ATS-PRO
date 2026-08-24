import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, message, Pagination, Popconfirm, Spin, Table, Tag } from "antd";
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { DeleteExpeditionOperationItemsService, GetExpeditionOperationsListByExpIdService } from "../../../../../api/services/vehicles/operations_services";
import OperasyonOzeti from "../components/OperasyonOzeti";
import { BORDER_COLOR, cardStyle } from "../components/uiStyles";
import HareketModal from "../hareket/HareketModal";

const PAGE_SIZE = 10;

// Tablo sütunlarını GetExpeditionOperationsListByExpId response alanlarına bağlar
const FIELDS = {
  tarih: "gerceklesenTarih",
  hareketTip: "oprTip",
  firma: "firmaUnvan",
  guzergah: "guzergah",
  operasyonYeri: "oprYer",
  vardiya: "vardiya",
  miktar: "gerceklesenMiktar",
  birim: "yuklemeBirim",
  durum: "durum",
  hakedisTutar: "hakedisTutar",
};

const singleLineStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const secondaryLineStyle = {
  fontSize: "12px",
  color: "#8c8c8c",
  lineHeight: "18px",
};

// Durum etiketleri tasarımdaki gibi noktalı ve yuvarlak köşeli gösterilir
const DURUM_COLORS = {
  planlandı: { tag: "processing", dot: "#1677ff" },
  "devam ediyor": { tag: "warning", dot: "#faad14" },
  tamamlandı: { tag: "success", dot: "#52c41a" },
  iptal: { tag: "default", dot: "#bfbfbf" },
};

const getDurumColors = (durum) => DURUM_COLORS[String(durum || "").toLocaleLowerCase("tr")] || DURUM_COLORS.iptal;

const renderDurum = (durum) => {
  if (!durum) return "-";
  const colors = getDurumColors(durum);

  return (
    <Tag color={colors.tag} style={{ borderRadius: "12px", margin: 0, display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.dot, display: "inline-block" }} />
      {durum}
    </Tag>
  );
};

const OperasyonHareketleri = ({ selectedRow, isActive }) => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hareketModal, setHareketModal] = useState({ open: false, seferOprId: null });

  const searchTermRef = useRef("");
  const dataRef = useRef([]);
  const requestIdRef = useRef(0);

  const expId = selectedRow?.key || 0;

  const fetchData = useCallback(
    async (diff, targetPage) => {
      if (!expId) return;

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setLoading(true);

      try {
        const currentList = dataRef.current;
        let setPointId = 0;

        if (diff > 0) {
          setPointId = currentList[currentList.length - 1]?.key || 0;
        } else if (diff < 0) {
          setPointId = currentList[0]?.key || 0;
        }

        const response = await GetExpeditionOperationsListByExpIdService(diff, setPointId, expId, searchTermRef.current);

        if (requestId !== requestIdRef.current) return;

        const newData = (response.data.list || []).map((item) => ({
          ...item,
          key: item.seferOprId ?? item.siraNo,
        }));

        dataRef.current = newData;
        setData(newData);
        setSummary(response.data.expeditionOperationSummary || null);
        setTotalCount(response.data.recordCount || 0);
        setCurrentPage(targetPage);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;
        console.error("Error fetching data:", error);
        message.error(t("islemBasarisiz"));
      } finally {
        if (requestId === requestIdRef.current) setLoading(false);
      }
    },
    [expId]
  );

  useEffect(() => {
    if (isActive) {
      fetchData(0, 1);
    }
  }, [isActive, fetchData]);

  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    fetchData(0, 1);
  };

  const handlePageChange = (page) => {
    fetchData(page - currentPage, page);
  };

  const refreshTable = () => fetchData(0, 1);

  const handleDelete = async (record) => {
    try {
      const response = await DeleteExpeditionOperationItemsService([record.key]);
      const statusCode = response?.data?.statusCode;

      if ([200, 201, 202, 204].includes(statusCode)) {
        message.success(t("islemBasarili"));
        refreshTable();
      } else if (statusCode === 401) {
        message.error(t("buIslemiYapmayaYetkinizYok"));
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error(t("islemBasarisiz"));
    }
  };

  const columns = [
    {
      title: t("sira"),
      key: "sira",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: t("tarih"),
      dataIndex: FIELDS.tarih,
      key: "tarih",
      width: 120,
      render: (value, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ ...singleLineStyle, fontWeight: 600 }}>{formatDateByLocale(value)}</span>
          <span style={{ ...secondaryLineStyle, ...singleLineStyle }}>{formatDateByLocale(record[FIELDS.tarih], "HH:mm", "")}</span>
        </div>
      ),
    },
    { title: t("hareketTipi"), dataIndex: FIELDS.hareketTip, key: "hareketTip", width: 150, ellipsis: true, render: (value) => value || "-" },
    { title: t("firma"), dataIndex: FIELDS.firma, key: "firma", width: 150, ellipsis: true, render: (value) => value || "-" },
    { title: t("guzergah"), dataIndex: FIELDS.guzergah, key: "guzergah", width: 260, ellipsis: true, render: (value) => value || "-" },
    { title: t("operasyonYeri"), dataIndex: FIELDS.operasyonYeri, key: "operasyonYeri", width: 150, ellipsis: true, render: (value) => value || "-" },
    { title: t("vardiya"), dataIndex: FIELDS.vardiya, key: "vardiya", width: 110, ellipsis: true, render: (value) => value || "-" },
    {
      title: t("miktar"),
      dataIndex: FIELDS.miktar,
      key: "miktar",
      width: 90,
      align: "right",
      render: (value) => formatNumberWithLocale(value ?? 0),
    },
    { title: t("birim"), dataIndex: FIELDS.birim, key: "birim", width: 100, ellipsis: true, render: (value) => value || "-" },
    { title: t("durum"), dataIndex: FIELDS.durum, key: "durum", width: 140, render: renderDurum },
    {
      title: t("hakedisTutari"),
      dataIndex: FIELDS.hakedisTutar,
      key: "hakedisTutar",
      width: 140,
      align: "right",
      render: (value) => `₺${formatNumberWithLocale(value ?? 0, 2, 2)}`,
    },
    {
      title: t("islemler"),
      key: "islemler",
      width: 90,
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title={t("kaydiSilmekIstediginizdenEminMisiniz")}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okText={t("evet")}
          cancelText={t("hayir")}
          onConfirm={() => handleDelete(record)}
        >
          <Button type="text" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const tableScrollX = columns.reduce((total, column) => total + (column.width || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Arama ve ekleme */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
        <Input
          style={{ width: "320px" }}
          type="text"
          placeholder={t("hareketAra")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} onClick={handleSearch} />}
        />
        <Button className="btn primary-btn" onClick={() => setHareketModal({ open: true, seferOprId: null })}>
          <PlusOutlined /> {t("yeniHareket")}
        </Button>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Hareket listesi */}
        <div style={{ ...cardStyle, padding: 0, flex: "1 1 720px", minWidth: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BORDER_COLOR}`, fontSize: "14px", fontWeight: 600, color: "#141414" }}>{t("operasyonHareketleri")}</div>

          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ x: tableScrollX, y: "calc(100vh - 520px)" }}
              onRow={(record) => ({
                style: { cursor: "pointer" },
                onClick: () => setHareketModal({ open: true, seferOprId: record.key }),
              })}
            />
          </Spin>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", padding: "12px 20px", borderTop: `1px solid ${BORDER_COLOR}` }}>
            <span style={{ fontSize: "13px", color: "#5d6786" }}>{`${t("toplam")} ${formatNumberWithLocale(totalCount)} ${t("kayit")}`}</span>
            <Pagination current={currentPage} total={totalCount} pageSize={PAGE_SIZE} showSizeChanger={false} onChange={handlePageChange} />
          </div>
        </div>

        <HareketModal
          open={hareketModal.open}
          seferOprId={hareketModal.seferOprId}
          expId={expId}
          onClose={() => setHareketModal({ open: false, seferOprId: null })}
          onRefresh={refreshTable}
        />

        {/* Özet kutusu */}
        <div style={{ flex: "0 1 300px", minWidth: "260px" }}>
          <OperasyonOzeti summary={summary} />
        </div>
      </div>
    </div>
  );
};

OperasyonHareketleri.propTypes = {
  selectedRow: PropTypes.object,
  isActive: PropTypes.bool,
};

export default OperasyonHareketleri;
