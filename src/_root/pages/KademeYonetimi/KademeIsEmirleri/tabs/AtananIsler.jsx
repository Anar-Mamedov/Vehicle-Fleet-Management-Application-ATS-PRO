import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Dropdown, Input, Table, Tooltip, message } from "antd";
import { AppstoreOutlined, DownOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { UpdateServiceWorkCardStatusService } from "../../../../../api/services/isEmri/services";
import { formatTimeForDisplay } from "../../../../../utils/dateUtils";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { cardStyle, hintStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../components/DurumTag";
import IsAtaModal from "../atananIsler/IsAtaModal";
import IsDetayiModal from "../atananIsler/IsDetayiModal";
import MalzemeTalepEtModal from "../malzemeTalepleri/MalzemeTalepEtModal";
import { IS_DURUM, formatSureKisa, getIsDurumTanimi, isSuccessResponse } from "../constants";

// Toplu işlem menüsündeki her seçenek seçili işlere bu durumu gönderir
const TOPLU_DURUMLAR = {
  baslat: IS_DURUM.DEVAM_EDIYOR,
  durdur: IS_DURUM.DURDU,
  devamEttir: IS_DURUM.YENIDEN_BASLADI,
  tamamla: IS_DURUM.TAMAMLANDI,
};

const formatTarihSaat = (tarih, saat) => {
  if (!tarih) return "-";
  const saatMetni = formatTimeForDisplay(saat, "");
  return saatMetni ? `${formatDateByLocale(tarih)} ${saatMetni}` : formatDateByLocale(tarih);
};

const aramaAlanlari = ["isTanim", "isTip", "personelIsim", "aciklama"];

// İş emrine atanan işler; liste modal seviyesinde okunur (sekme etiketindeki sayı için) ve buraya verilir
const AtananIsler = ({ isEmriId, aracId, kademeId, isler, loading, onChange, onMalzemeTalebiChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isAtaOpen, setIsAtaOpen] = useState(false);
  const [detay, setDetay] = useState({ open: false, isId: null });
  // Satırdaki düğmeyle açılan malzeme talebinde o iş seçili gelir (isId = işin siraNo'su)
  const [malzemeTalebiIs, setMalzemeTalebiIs] = useState(null);
  const [topluIslemYapiliyor, setTopluIslemYapiliyor] = useState(false);

  const filtrelenmisIsler = useMemo(() => {
    const aranan = searchTerm.trim().toLocaleLowerCase("tr-TR");
    if (!aranan) return isler;
    return isler.filter((is) => aramaAlanlari.some((alan) => String(is[alan] ?? "").toLocaleLowerCase("tr-TR").includes(aranan)));
  }, [isler, searchTerm]);

  const handleTopluDurum = async ({ key }) => {
    const status = TOPLU_DURUMLAR[key];
    setTopluIslemYapiliyor(true);
    try {
      const sonuclar = await Promise.allSettled(selectedRowKeys.map((id) => UpdateServiceWorkCardStatusService(id, status)));
      const basarisizSayisi = sonuclar.filter((sonuc) => sonuc.status === "rejected" || !isSuccessResponse(sonuc.value)).length;

      if (basarisizSayisi === 0) {
        message.success(t("islemBasarili"));
      } else {
        message.warning(t("topluIslemKismenBasarisiz", { basarisiz: basarisizSayisi, toplam: sonuclar.length }));
      }
      setSelectedRowKeys([]);
      onChange();
    } finally {
      setTopluIslemYapiliyor(false);
    }
  };

  const openDetay = (record) => setDetay({ open: true, isId: record.siraNo });

  const columns = [
    {
      title: t("isTanimi"),
      dataIndex: "isTanim",
      key: "isTanim",
      width: 220,
      ellipsis: true,
      render: (text, record) => (
        <a role="link" tabIndex={0} onClick={() => openDetay(record)} onKeyDown={(e) => e.key === "Enter" && openDetay(record)}>
          {text || "-"}
        </a>
      ),
    },
    { title: t("isTuru"), dataIndex: "isTip", key: "isTip", width: 120, ellipsis: true, render: (text) => text || "-" },
    { title: t("atananPersonel"), dataIndex: "personelIsim", key: "personelIsim", width: 160, ellipsis: true, render: (text) => text || "-" },
    { title: t("baslama"), dataIndex: "baslamaTarih", key: "baslama", width: 150, render: (tarih, record) => formatTarihSaat(tarih, record.baslamaSaat) },
    { title: t("sure"), dataIndex: "sure", key: "sure", width: 80, render: (sure) => formatSureKisa(sure) },
    { title: t("bitis"), dataIndex: "bitisTarih", key: "bitis", width: 150, render: (tarih, record) => formatTarihSaat(tarih, record.bitisSaat) },
    { title: t("malzemeSayisi"), dataIndex: "malzemeSayisi", key: "malzemeSayisi", width: 120, render: (value) => formatNumberWithLocale(value || 0) },
    { title: t("durum"), dataIndex: "durum", key: "durum", width: 140, render: (durum) => <DurumTag durum={durum} getTanim={getIsDurumTanimi} /> },
    { title: t("aciklama"), dataIndex: "aciklama", key: "aciklama", width: 240, ellipsis: true, render: (text) => text || "-" },
    {
      title: "",
      key: "malzemeTalebi",
      width: 60,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Tooltip title={t("malzemeTalepEt")}>
          <Button size="small" icon={<ShoppingCartOutlined />} aria-label={t("malzemeTalepEt")} disabled={!kademeId} onClick={() => setMalzemeTalebiIs(record)} />
        </Tooltip>
      ),
    },
  ];

  const topluIslemMenu = {
    items: [
      { key: "baslat", label: t("baslat") },
      { key: "durdur", label: t("durdur") },
      { key: "devamEttir", label: t("devamEttir") },
      { key: "tamamla", label: t("tamamla") },
    ],
    onClick: handleTopluDurum,
  };

  return (
    <div style={cardStyle}>
      <span style={sectionTitleStyle}>{t("atananIsler")}</span>

      {!kademeId && <Alert type="info" showIcon message={t("isAtamakIcinKademeSecin")} style={{ marginBottom: "12px" }} />}

      <div className="flex" style={{ justifyContent: "space-between", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
        <Input
          style={{ width: "300px" }}
          placeholder={t("isIcindeAra")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
          allowClear
        />
        <div className="flex" style={{ gap: "10px" }}>
          <Dropdown menu={topluIslemMenu} disabled={selectedRowKeys.length === 0 || topluIslemYapiliyor} trigger={["click"]}>
            <Button icon={<AppstoreOutlined />} loading={topluIslemYapiliyor}>
              {t("topluIslem")} <DownOutlined />
            </Button>
          </Dropdown>
          <Button className="btn primary-btn" icon={<PlusOutlined />} disabled={!kademeId} onClick={() => setIsAtaOpen(true)}>
            {t("isAta")}
          </Button>
        </div>
      </div>

      <Table
        size="middle"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        columns={columns}
        dataSource={filtrelenmisIsler}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
        scroll={{ x: columns.reduce((toplam, kolon) => toplam + kolon.width, 0) }}
        footer={() => <span style={hintStyle}>{`${t("toplam")}: ${formatNumberWithLocale(isler.length)}`}</span>}
      />

      <IsAtaModal open={isAtaOpen} isEmriId={isEmriId} aracId={aracId} kademeId={kademeId} onClose={() => setIsAtaOpen(false)} onSaved={onChange} />
      <MalzemeTalepEtModal
        open={malzemeTalebiIs !== null}
        isEmriId={isEmriId}
        aracId={aracId}
        kademeId={kademeId}
        isId={malzemeTalebiIs?.siraNo || 0}
        isTanim={malzemeTalebiIs?.isTanim}
        onClose={() => setMalzemeTalebiIs(null)}
        onSaved={onMalzemeTalebiChange}
      />
      <IsDetayiModal open={detay.open} isId={detay.isId} kademeId={kademeId} onClose={() => setDetay({ open: false, isId: null })} onChange={onChange} />
    </div>
  );
};

AtananIsler.propTypes = {
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  kademeId: PropTypes.number,
  isler: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onMalzemeTalebiChange: PropTypes.func.isRequired,
};

export default AtananIsler;
