import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Input, Modal, Table, Tag, message } from "antd";
import { AppstoreOutlined, CopyOutlined, DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { DeleteMaterialMovementsService } from "../../../../../api/services/isEmri/services";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import ExcelExportButton from "../../../../components/ExcelExportButton";
import { cardStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import MalzemeKullanimModal from "../kullanilanMalzemeler/MalzemeKullanimModal";
import { formatTarihSaatDegeri, isSuccessResponse } from "../constants";

const aramaAlanlari = ["malezemeKod", "malezemeTanim", "talepNo", "aciklama"];

const VARSAYILAN_SAYFA_BOYUTU = 10;

const KAPALI_MODAL = { open: false, kayitId: null, kopyalanacakId: null };

// Silme servisi servis ekranındaki gibi 204 de dönebilir
const isSilmeBasarili = (response) => isSuccessResponse(response) || response?.data?.statusCode === 204;

const formatExcelHucresi = (value, row, column) => (column.dataIndex === "tarih" ? formatTarihSaatDegeri(value) : value);

// İş emrinde fiilen kullanılan malzemeler; liste modal seviyesinde okunur (sekme etiketindeki sayı için) ve buraya verilir.
// Liste servisi sayfalanmadan döndüğü için arama ve sayfalama istemci tarafında yapılır.
const KullanilanMalzemeler = ({ isEmriId, aracId, malzemeler, loading, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: VARSAYILAN_SAYFA_BOYUTU });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modal, setModal] = useState(KAPALI_MODAL);

  const filtrelenmisMalzemeler = useMemo(() => {
    const aranan = searchTerm.trim().toLocaleLowerCase("tr-TR");
    if (!aranan) return malzemeler;
    return malzemeler.filter((malzeme) => aramaAlanlari.some((alan) => String(malzeme[alan] ?? "").toLocaleLowerCase("tr-TR").includes(aranan)));
  }, [malzemeler, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const openEkle = () => setModal({ open: true, kayitId: null, kopyalanacakId: null });
  const openGuncelle = (record) => setModal({ open: true, kayitId: record.siraNo, kopyalanacakId: null });
  const openKopyala = (record) => setModal({ open: true, kayitId: null, kopyalanacakId: record.siraNo });

  const confirmSil = (ids) => {
    Modal.confirm({
      title: t("kayitlariSilOnay", { adet: ids.length }),
      okText: t("evet"),
      cancelText: t("hayir"),
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          const response = await DeleteMaterialMovementsService(ids);
          if (isSilmeBasarili(response)) {
            message.success(t("islemBasarili"));
            setSelectedRowKeys((prev) => prev.filter((key) => !ids.includes(key)));
            onChange();
          } else {
            message.error(t("islemBasarisiz"));
          }
        } catch {
          message.error(t("islemBasarisiz"));
        }
      },
    });
  };

  const handleSatirIslemi = (record, key) => {
    if (key === "duzenle") openGuncelle(record);
    if (key === "kopyala") openKopyala(record);
    if (key === "sil") confirmSil([record.siraNo]);
  };

  const satirIslemleri = [
    { key: "duzenle", label: t("duzenle"), icon: <EditOutlined /> },
    { key: "kopyala", label: t("kopyala"), icon: <CopyOutlined /> },
    { key: "sil", label: t("sil"), icon: <DeleteOutlined />, danger: true },
  ];

  const columns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malezemeKod",
      key: "malezemeKod",
      width: 140,
      ellipsis: true,
      render: (text, record) => (
        <a role="link" tabIndex={0} onClick={() => openGuncelle(record)} onKeyDown={(e) => e.key === "Enter" && openGuncelle(record)}>
          {text || "-"}
        </a>
      ),
    },
    { title: t("malzemeTanimi"), dataIndex: "malezemeTanim", key: "malezemeTanim", width: 200, ellipsis: true, render: (text) => text || "-" },
    { title: t("miktar"), dataIndex: "miktar", key: "miktar", width: 90, render: (value) => formatNumberWithLocale(value || 0) },
    { title: t("birim"), dataIndex: "birim", key: "birim", width: 90, render: (text) => (text ? <Tag style={{ margin: 0 }}>{text}</Tag> : "-") },
    { title: t("birimFiyati"), dataIndex: "fiyat", key: "fiyat", width: 120, render: (value) => formatNumberWithLocale(value || 0) },
    {
      title: t("toplamTutar"),
      dataIndex: "toplam",
      key: "toplam",
      width: 130,
      render: (value) => <span style={{ fontWeight: 600 }}>{formatNumberWithLocale(value || 0)}</span>,
    },
    { title: t("bagliTalep"), dataIndex: "talepNo", key: "talepNo", width: 140, ellipsis: true, render: (text) => text || "-" },
    { title: t("kullanimTarihi"), dataIndex: "tarih", key: "tarih", width: 150, render: (tarih) => formatTarihSaatDegeri(tarih) },
    { title: t("aciklama"), dataIndex: "aciklama", key: "aciklama", width: 220, ellipsis: true, render: (text) => text || "-" },
    {
      title: t("islem"),
      key: "islem",
      width: 70,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Dropdown menu={{ items: satirIslemleri, onClick: ({ key }) => handleSatirIslemi(record, key) }} trigger={["click"]}>
          <Button type="text" size="small" icon={<MoreOutlined />} aria-label={t("islem")} />
        </Dropdown>
      ),
    },
  ];

  const topluIslemMenu = {
    items: [{ key: "sil", label: t("seciliKayitlariSil"), icon: <DeleteOutlined />, danger: true }],
    onClick: () => confirmSil(selectedRowKeys),
  };

  return (
    <div style={cardStyle}>
      <span style={sectionTitleStyle}>{t("kullanilanMalzemeler")}</span>

      <div className="flex" style={{ justifyContent: "space-between", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
        <Input
          style={{ width: "300px" }}
          placeholder={t("malzemeIcindeAra")}
          value={searchTerm}
          onChange={handleSearchChange}
          prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
          allowClear
        />
        <div className="flex" style={{ gap: "10px", flexWrap: "wrap" }}>
          <Dropdown menu={topluIslemMenu} disabled={selectedRowKeys.length === 0} trigger={["click"]}>
            <Button icon={<AppstoreOutlined />}>
              {t("topluIslem")} <DownOutlined />
            </Button>
          </Dropdown>
          <ExcelExportButton
            request={async () => ({ data: filtrelenmisMalzemeler })}
            columns={columns}
            fileName={`${t("kullanilanMalzemeler")}.xlsx`}
            sheetName={t("kullanilanMalzemeler")}
            formatCellValue={formatExcelHucresi}
            buttonProps={{ children: t("excelEAktar"), disabled: filtrelenmisMalzemeler.length === 0 }}
          />
          <Button className="btn primary-btn" icon={<PlusOutlined />} onClick={openEkle}>
            {t("malzemeKullanimiEkle")}
          </Button>
        </div>
      </div>

      <Table
        size="middle"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        columns={columns}
        dataSource={filtrelenmisMalzemeler}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          showTotal: (total, range) => t("toplamKayittanArasiGosteriliyor", { toplam: total, baslangic: range[0], bitis: range[1] }),
        }}
        onChange={(newPagination) => setPagination({ current: newPagination.current, pageSize: newPagination.pageSize })}
        scroll={{ x: columns.reduce((toplam, kolon) => toplam + kolon.width, 0) }}
      />

      <MalzemeKullanimModal
        open={modal.open}
        kayitId={modal.kayitId}
        kopyalanacakId={modal.kopyalanacakId}
        isEmriId={isEmriId}
        aracId={aracId}
        onClose={() => setModal(KAPALI_MODAL)}
        onSaved={onChange}
      />
    </div>
  );
};

KullanilanMalzemeler.propTypes = {
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  malzemeler: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default KullanilanMalzemeler;
