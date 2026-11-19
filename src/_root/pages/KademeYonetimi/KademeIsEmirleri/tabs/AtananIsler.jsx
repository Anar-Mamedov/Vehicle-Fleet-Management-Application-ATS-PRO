import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Dropdown, Input, Table, Tooltip, message } from "antd";
import { AppstoreOutlined, DownOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatTimeForDisplay } from "../../../../../utils/dateUtils";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { cardStyle, hintStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../components/DurumTag";
import MalzemeTalebiOzet from "../components/MalzemeTalebiOzet";
import IsAtaModal from "../atananIsler/IsAtaModal";
import IsDetayiModal from "../atananIsler/IsDetayiModal";
import IsDurumIslemModal from "../atananIsler/IsDurumIslemModal";
import { updateIsDurumu } from "../atananIsler/isDurumuGuncelle";
import MalzemeTalepEtModal from "../malzemeTalepleri/MalzemeTalepEtModal";
import { ACIKLAMA_ZORUNLU_IS_ISLEMLERI, IS_ISLEMI, formatSureKisa, getIsDurumTanimi, getIsIslemleri, isIsKartiKapali } from "../constants";

// İşlem menüsünün seçenekleri; Durdur, Bitir ve İptal açıklama modalı açar, diğerleri doğrudan uygulanır
const ISLEM_MENUSU = [
  { islem: IS_ISLEMI.BASLAT, labelKey: "baslat" },
  { islem: IS_ISLEMI.DURDUR, labelKey: "durdur" },
  { islem: IS_ISLEMI.DEVAM_ET, labelKey: "devamEttir" },
  { islem: IS_ISLEMI.BITIR, labelKey: "bitir" },
  { islem: IS_ISLEMI.IPTAL_ET, labelKey: "iptalEt", danger: true },
];

const formatTarihSaat = (tarih, saat) => {
  if (!tarih) return "-";
  const saatMetni = formatTimeForDisplay(saat, "");
  return saatMetni ? `${formatDateByLocale(tarih)} ${saatMetni}` : formatDateByLocale(tarih);
};

const aramaAlanlari = ["isNo", "isTanim", "isTip", "personelIsim", "aciklama"];

// İş emrine atanan işler; liste modal seviyesinde okunur (sekme etiketindeki sayı için) ve buraya verilir.
// readOnly (kapalı/iptal iş emri) iş atamayı, işlem menüsünü, malzeme talebini ve iş detayındaki değişiklikleri kapatır.
// isIslemleriKilitli (iptal/tamamlanan/kapatılan iş emri) işlerin durumunu değiştirmeyi ve malzeme talebini kapatır.
const AtananIsler = ({ isEmriId, aracId, kademeId, isler, loading, readOnly = false, isIslemleriKilitli = false, onChange, onMalzemeTalebiChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Durum işlemleri (açıklama modalındaki iş bilgisi dahil) tek iş için yapılır
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isAtaOpen, setIsAtaOpen] = useState(false);
  const [detay, setDetay] = useState({ open: false, isId: null });
  // Satırdaki düğmeyle açılan malzeme talebinde o iş seçili gelir (isId = işin siraNo'su)
  const [malzemeTalebiIs, setMalzemeTalebiIs] = useState(null);
  const [durumIslemi, setDurumIslemi] = useState(null);
  const [islemYapiliyor, setIslemYapiliyor] = useState(false);

  const filtrelenmisIsler = useMemo(() => {
    const aranan = searchTerm.trim().toLocaleLowerCase("tr-TR");
    if (!aranan) return isler;
    return isler.filter((is) => aramaAlanlari.some((alan) => String(is[alan] ?? "").toLocaleLowerCase("tr-TR").includes(aranan)));
  }, [isler, searchTerm]);

  const seciliIs = isler.find((is) => is.siraNo === selectedRowKeys[0]) || null;
  const durumIslemleriKapali = readOnly || isIslemleriKilitli;

  const handleDurumIslemiTamamlandi = () => {
    setSelectedRowKeys([]);
    onChange();
  };

  const handleIslem = async ({ key: islem }) => {
    if (!seciliIs) return;

    if (ACIKLAMA_ZORUNLU_IS_ISLEMLERI.includes(islem)) {
      setDurumIslemi({ islem, isId: seciliIs.siraNo });
      return;
    }

    setIslemYapiliyor(true);
    try {
      const sonuc = await updateIsDurumu(seciliIs.siraNo, islem);
      if (sonuc.basarili) {
        message.success(t("islemBasarili"));
        handleDurumIslemiTamamlandi();
      } else {
        message.error(sonuc.mesaj);
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setIslemYapiliyor(false);
    }
  };

  const openDetay = (record) => setDetay({ open: true, isId: record.siraNo });

  const columns = [
    { title: t("isNo"), dataIndex: "isNo", key: "isNo", width: 120, ellipsis: true, render: (text) => text || "-" },
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
    { title: t("durum"), dataIndex: "durum", key: "durum", width: 140, render: (durum) => <DurumTag durum={durum} getTanim={getIsDurumTanimi} /> },
    { title: t("baslamaZamani"), dataIndex: "baslamaTarih", key: "baslama", width: 150, render: (tarih, record) => formatTarihSaat(tarih, record.baslamaSaat) },
    { title: t("bitisZamani"), dataIndex: "bitisTarih", key: "bitis", width: 150, render: (tarih, record) => formatTarihSaat(tarih, record.bitisSaat) },
    { title: t("sure"), dataIndex: "sure", key: "sure", width: 80, render: (sure) => formatSureKisa(sure) },
    { title: t("malzemeTalebi"), dataIndex: "malzemeSayisi", key: "malzemeSayisi", width: 120, render: (value) => <MalzemeTalebiOzet sayi={value} /> },
    { title: t("aciklama"), dataIndex: "aciklama", key: "aciklama", width: 240, ellipsis: true, render: (text) => text || "-" },
    {
      title: "",
      key: "malzemeTalebi",
      width: 60,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Tooltip title={t("malzemeTalepEt")}>
          <Button
            size="small"
            icon={<ShoppingCartOutlined />}
            aria-label={t("malzemeTalepEt")}
            disabled={durumIslemleriKapali || !kademeId || isIsKartiKapali(record.durum)}
            onClick={() => setMalzemeTalebiIs(record)}
          />
        </Tooltip>
      ),
    },
  ];

  // Seçenekler seçili işin güncel durumuna göre açılır (ör. tamamlama onayı bekleyen işte hiçbiri)
  const seciliIsIslemleri = seciliIs ? getIsIslemleri(seciliIs.durum) : {};
  const islemMenu = {
    items: ISLEM_MENUSU.map(({ islem, labelKey, danger }) => ({ key: islem, label: t(labelKey), danger, disabled: !seciliIsIslemleri[islem] })),
    onClick: handleIslem,
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
          <Dropdown menu={islemMenu} disabled={durumIslemleriKapali || !seciliIs || islemYapiliyor} trigger={["click"]}>
            <Button icon={<AppstoreOutlined />} loading={islemYapiliyor}>
              {t("islem")} <DownOutlined />
            </Button>
          </Dropdown>
          <Button className="btn primary-btn" icon={<PlusOutlined />} disabled={readOnly || !kademeId} onClick={() => setIsAtaOpen(true)}>
            {t("isAta")}
          </Button>
        </div>
      </div>

      <Table
        size="middle"
        rowSelection={durumIslemleriKapali ? undefined : { type: "radio", selectedRowKeys, onChange: setSelectedRowKeys }}
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
      <IsDetayiModal open={detay.open} isId={detay.isId} kademeId={kademeId} readOnly={readOnly} onClose={() => setDetay({ open: false, isId: null })} onChange={onChange} />
      <IsDurumIslemModal
        open={durumIslemi !== null}
        islem={durumIslemi?.islem}
        isId={durumIslemi?.isId}
        onClose={() => setDurumIslemi(null)}
        onSaved={handleDurumIslemiTamamlandi}
      />
    </div>
  );
};

AtananIsler.propTypes = {
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  kademeId: PropTypes.number,
  isler: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  readOnly: PropTypes.bool,
  isIslemleriKilitli: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onMalzemeTalebiChange: PropTypes.func.isRequired,
};

export default AtananIsler;
