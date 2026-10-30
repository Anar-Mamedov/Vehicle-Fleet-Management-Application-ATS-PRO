import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Input, Table, Tooltip } from "antd";
import { ExportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { cardStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../components/DurumTag";
import MalzemeTalepEtModal from "../malzemeTalepleri/MalzemeTalepEtModal";
import MalzemeTalepDetayiModal from "../malzemeTalepleri/MalzemeTalepDetayiModal";
import KullanimaAktarModal from "../malzemeTalepleri/KullanimaAktarModal";
import { MALZEME_TALEP_DURUM, formatTarihSaatDegeri, getMalzemeTalepDurumTanimi } from "../constants";

const aramaAlanlari = ["talepNo", "malzemeKod", "malzemeTanim", "aciklama"];

const VARSAYILAN_SAYFA_BOYUTU = 10;

// İş emrine bağlı malzeme talepleri; liste modal seviyesinde okunur (sekme etiketindeki sayı için) ve buraya verilir.
// Liste servisi sayfalanmadan döndüğü için arama ve sayfalama istemci tarafında yapılır.
// readOnly (kapalı/iptal iş emri) yeni talebi, kullanıma aktarmayı ve talep güncellemeyi kapatır.
const MalzemeTalepleri = ({ isEmriId, aracId, kademeId, talepler, loading, readOnly = false, onChange, onKullanimChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: VARSAYILAN_SAYFA_BOYUTU });
  const [talepEtOpen, setTalepEtOpen] = useState(false);
  const [detay, setDetay] = useState({ open: false, talepId: null, durum: null });
  // Satırdaki düğmeyle kullanıma aktarılan talebin siraNo'su
  const [kullanimaAktarilanTalepId, setKullanimaAktarilanTalepId] = useState(null);

  const filtrelenmisTalepler = useMemo(() => {
    const aranan = searchTerm.trim().toLocaleLowerCase("tr-TR");
    if (!aranan) return talepler;
    return talepler.filter((talep) => aramaAlanlari.some((alan) => String(talep[alan] ?? "").toLocaleLowerCase("tr-TR").includes(aranan)));
  }, [talepler, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const openDetay = (record) => setDetay({ open: true, talepId: record.siraNo, durum: record.durum });

  // Karşılanan miktar servis yanıtında olmadığı için tasarımdaki "Karşılanan" kolonu yer almaz
  const columns = [
    {
      title: t("talepNo"),
      dataIndex: "talepNo",
      key: "talepNo",
      width: 150,
      ellipsis: true,
      render: (text, record) => (
        <a role="link" tabIndex={0} onClick={() => openDetay(record)} onKeyDown={(e) => e.key === "Enter" && openDetay(record)}>
          {text || "-"}
        </a>
      ),
    },
    { title: t("malzemeKodu"), dataIndex: "malzemeKod", key: "malzemeKod", width: 130, ellipsis: true, render: (text) => text || "-" },
    { title: t("malzemeAdi"), dataIndex: "malzemeTanim", key: "malzemeTanim", width: 200, ellipsis: true, render: (text) => text || "-" },
    { title: t("talepMiktari"), dataIndex: "talepMiktar", key: "talepMiktar", width: 120, render: (value) => formatNumberWithLocale(value || 0) },
    { title: t("kullanilan"), dataIndex: "kullanilanMiktar", key: "kullanilanMiktar", width: 110, render: (value) => formatNumberWithLocale(value || 0) },
    { title: t("birim"), dataIndex: "malzemeBirim", key: "malzemeBirim", width: 90, ellipsis: true, render: (text) => text || "-" },
    { title: t("durum"), dataIndex: "durum", key: "durum", width: 150, render: (durum) => <DurumTag durum={durum} getTanim={getMalzemeTalepDurumTanimi} /> },
    { title: t("talepEden"), dataIndex: "talepEden", key: "talepEden", width: 150, ellipsis: true, render: (text) => text || "-" },
    { title: t("gerekliTarih"), dataIndex: "gerekliTarih", key: "gerekliTarih", width: 120, render: (tarih) => formatDateByLocale(tarih) },
    { title: t("talepTarihi"), dataIndex: "talepTarih", key: "talepTarih", width: 150, render: (tarih) => formatTarihSaatDegeri(tarih) },
    { title: t("aciklama"), dataIndex: "aciklama", key: "aciklama", width: 220, ellipsis: true, render: (text) => text || "-" },
    {
      title: "",
      key: "kullanimaAktar",
      width: 60,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Tooltip title={t("kullanimaAktar")}>
          <Button
            size="small"
            icon={<ExportOutlined />}
            aria-label={t("kullanimaAktar")}
            disabled={readOnly || record.durum === MALZEME_TALEP_DURUM.TAMAMLANDI}
            onClick={() => setKullanimaAktarilanTalepId(record.siraNo)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={cardStyle}>
      <span style={sectionTitleStyle}>{t("malzemeTalepleri")}</span>

      {!kademeId && <Alert type="info" showIcon message={t("malzemeTalepEtmekIcinKademeSecin")} style={{ marginBottom: "12px" }} />}

      <div className="flex" style={{ justifyContent: "space-between", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
        <Input
          style={{ width: "300px" }}
          placeholder={t("malzemeTalepAramaPlaceholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
          allowClear
        />
        <Button className="btn primary-btn" icon={<PlusOutlined />} disabled={readOnly || !kademeId} onClick={() => setTalepEtOpen(true)}>
          {t("malzemeTalepEt")}
        </Button>
      </div>

      <Table
        size="middle"
        columns={columns}
        dataSource={filtrelenmisTalepler}
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

      <MalzemeTalepEtModal open={talepEtOpen} isEmriId={isEmriId} aracId={aracId} kademeId={kademeId} onClose={() => setTalepEtOpen(false)} onSaved={onChange} />
      <MalzemeTalepDetayiModal
        open={detay.open}
        isEmriId={isEmriId}
        talepId={detay.talepId}
        durum={detay.durum}
        readOnly={readOnly}
        onClose={() => setDetay({ open: false, talepId: null, durum: null })}
        onChange={onChange}
      />
      <KullanimaAktarModal
        open={kullanimaAktarilanTalepId !== null}
        isEmriId={isEmriId}
        aracId={aracId}
        talepId={kullanimaAktarilanTalepId}
        onClose={() => setKullanimaAktarilanTalepId(null)}
        onSaved={onKullanimChange}
      />
    </div>
  );
};

MalzemeTalepleri.propTypes = {
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  kademeId: PropTypes.number,
  talepler: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onKullanimChange: PropTypes.func.isRequired,
};

export default MalzemeTalepleri;
