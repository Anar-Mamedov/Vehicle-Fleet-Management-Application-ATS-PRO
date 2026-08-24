import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Pagination, Popconfirm, Table, Tag, Typography } from "antd";
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { BORDER_COLOR, cardStyle } from "../components/uiStyles";
import HareketModal from "../hareket/HareketModal";

const { Text } = Typography;

const PAGE_SIZE = 10;

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

// Durum etiketleri operasyon hareketleri sekmesiyle aynı renklerle gösterilir
const DURUM_COLORS = {
  planlandı: { tag: "processing", dot: "#1677ff" },
  "devam ediyor": { tag: "warning", dot: "#faad14" },
  tamamlandı: { tag: "success", dot: "#52c41a" },
  iptal: { tag: "default", dot: "#bfbfbf" },
};

const getDurumColors = (durum) => DURUM_COLORS[String(durum || "").toLocaleLowerCase("tr")] || DURUM_COLORS.iptal;

const renderText = (value) => value || "-";

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

// Aramada satırın ekranda görünen metinleri taranır
const getSearchableText = (row) => {
  const { oprTip, firmaUnvan, guzergah, oprYer, vardiya, durum, yuklemeBirim } = row.values;
  return [oprTip, firmaUnvan, guzergah, oprYer, vardiya, durum, yuklemeBirim].join(" ").toLocaleLowerCase("tr");
};

// 3. adım: seçilen tüm araçların operasyonlarına eklenecek hareketler.
// Operasyon henüz oluşmadığı için hareketler servise gönderilmez, listede tutulup
// son adımda `expeditionOperations` olarak gönderilir.
const HareketlerAdimi = ({ hareketler, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ open: false, row: null });

  const filteredRows = useMemo(() => {
    const keyword = searchTerm.trim().toLocaleLowerCase("tr");
    if (!keyword) return hareketler;

    return hareketler.filter((row) => getSearchableText(row).includes(keyword));
  }, [hareketler, searchTerm]);

  const pagedRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSave = (body, values) => {
    const editedKey = modal.row?.key;

    if (editedKey) {
      onChange(hareketler.map((row) => (row.key === editedKey ? { ...row, body, values } : row)));
      return;
    }

    // Anahtar listedeki en büyük değerin bir fazlasıdır; satır silinse de tekrar etmez
    const nextKey = hareketler.reduce((maxKey, row) => Math.max(maxKey, row.key), 0) + 1;
    onChange([...hareketler, { key: nextKey, body, values }]);
  };

  const handleDelete = (record) => {
    const kalanlar = hareketler.filter((row) => row.key !== record.key);
    onChange(kalanlar);

    // Son sayfadaki tek kayıt silindiyse bir önceki sayfaya dönülür
    const sonSayfa = Math.max(1, Math.ceil(kalanlar.length / PAGE_SIZE));
    setCurrentPage((page) => Math.min(page, sonSayfa));
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
      key: "tarih",
      width: 120,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span style={{ ...singleLineStyle, fontWeight: 600 }}>{formatDateByLocale(record.body.gerceklesenTarih)}</span>
          <span style={{ ...secondaryLineStyle, ...singleLineStyle }}>{formatDateByLocale(record.body.gerceklesenTarih, "HH:mm", "")}</span>
        </div>
      ),
    },
    { title: t("hareketTipi"), dataIndex: ["values", "oprTip"], key: "oprTip", width: 150, ellipsis: true, render: renderText },
    { title: t("firma"), dataIndex: ["values", "firmaUnvan"], key: "firma", width: 150, ellipsis: true, render: renderText },
    { title: t("guzergah"), dataIndex: ["values", "guzergah"], key: "guzergah", width: 240, ellipsis: true, render: renderText },
    { title: t("operasyonYeri"), dataIndex: ["values", "oprYer"], key: "oprYer", width: 150, ellipsis: true, render: renderText },
    { title: t("vardiya"), dataIndex: ["values", "vardiya"], key: "vardiya", width: 110, ellipsis: true, render: renderText },
    {
      title: t("miktar"),
      dataIndex: ["body", "gerceklesenMiktar"],
      key: "miktar",
      width: 90,
      align: "right",
      render: (value) => formatNumberWithLocale(value ?? 0),
    },
    { title: t("birim"), dataIndex: ["values", "yuklemeBirim"], key: "birim", width: 100, ellipsis: true, render: renderText },
    { title: t("durum"), dataIndex: ["values", "durum"], key: "durum", width: 140, render: renderDurum },
    {
      title: t("hakedisTutari"),
      dataIndex: ["body", "hakedisTutar"],
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
          {/* Satıra tıklandığında düzenleme açıldığı için silme tıklaması yukarı taşınmaz */}
          <Button type="text" icon={<DeleteOutlined />} onClick={(event) => event.stopPropagation()} />
        </Popconfirm>
      ),
    },
  ];

  const tableScrollX = columns.reduce((total, column) => total + (column.width || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ fontSize: "18px", fontWeight: 600, color: "#141414", lineHeight: "26px" }}>{t("adimHareketler")}</div>
        <Text type="secondary">{t("hareketlerAdimiAciklama")}</Text>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
        <Input
          style={{ width: "320px" }}
          type="text"
          placeholder={t("hareketAra")}
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
          }}
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
        />
        <Button className="btn primary-btn" onClick={() => setModal({ open: true, row: null })}>
          <PlusOutlined /> {t("yeniHareket")}
        </Button>
      </div>

      {/* Özet bilgisi sihirbazın sol panelinde durduğu için bu adımda tekrarlanmaz */}
      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BORDER_COLOR}`, fontSize: "14px", fontWeight: 600, color: "#141414" }}>{t("operasyonHareketleri")}</div>

        <Table
          columns={columns}
          dataSource={pagedRows}
          pagination={false}
          scroll={{ x: tableScrollX, y: "calc(100vh - 560px)" }}
          onRow={(record) => ({
            style: { cursor: "pointer" },
            onClick: () => setModal({ open: true, row: record }),
          })}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", padding: "12px 20px", borderTop: `1px solid ${BORDER_COLOR}` }}>
          <span style={{ fontSize: "13px", color: "#5d6786" }}>{`${t("toplam")} ${formatNumberWithLocale(filteredRows.length)} ${t("kayit")}`}</span>
          <Pagination current={currentPage} total={filteredRows.length} pageSize={PAGE_SIZE} showSizeChanger={false} onChange={setCurrentPage} />
        </div>
      </div>

      <HareketModal open={modal.open} initialValues={modal.row?.values} onSave={handleSave} onClose={() => setModal({ open: false, row: null })} />
    </div>
  );
};

HareketlerAdimi.propTypes = {
  hareketler: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      body: PropTypes.object.isRequired,
      values: PropTypes.object.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HareketlerAdimi;
