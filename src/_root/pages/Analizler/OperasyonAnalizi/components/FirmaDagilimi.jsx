import React, { useMemo } from "react";
import { Empty, Select } from "antd";
import PropTypes from "prop-types";
import { t } from "i18next";
import AnalizKarti from "./AnalizKarti";
import { GenislemisTablo } from "./TabloBolumu";
import { FIRMA_DAGILIM_INFO, FIRMA_DAGILIM_INFO_LABEL_KEYS, WIDGET_PREVIEW_ROW_COUNT, barColorRamp, colors } from "../utils/constants";
import { formatNumber, formatPercent, safeText } from "../utils/formatters";
import { downloadRowsAsXlsx } from "../utils/exporters";
import { firmaDagilimRows } from "../utils/exportMappers";

const NAME_COLUMN_WIDTH = 150;
const VALUE_COLUMN_WIDTH = 145;

// Çubuklar recharts yerine düz HTML ile çiziliyor: SVG etiketi dar çubuklarda iki satıra bölünüyordu
// ve değerler çubuk boyuna göre kayıyordu. Burada değer sütunu her satırda aynı yerde ve tek satır.
function FirmaDagilimListesi({ data }) {
  if (data.length === 0) {
    return <Empty description={t("veriYok")} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((item) => (
        <div key={item.firma} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: NAME_COLUMN_WIDTH, flexShrink: 0, fontSize: 12, color: colors.muted, textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={item.firma}>
            {item.firma}
          </div>
          <div style={{ flex: 1, minWidth: 40, height: 14, borderRadius: 4, background: colors.track, overflow: "hidden" }}>
            <div style={{ width: `${item.doluluk}%`, height: "100%", borderRadius: 4, background: item.renk }} />
          </div>
          <div style={{ width: VALUE_COLUMN_WIDTH, flexShrink: 0, fontSize: 12, fontWeight: 600, color: colors.title, textAlign: "right", whiteSpace: "nowrap" }}>{item.etiket}</div>
        </div>
      ))}
    </div>
  );
}

FirmaDagilimListesi.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Firma bazlı dağılım; gösterge seçimi servise "info" parametresi olarak gönderilir
export default function FirmaDagilimi({ rows, info, onInfoChange, onRefresh = undefined }) {
  const degerBasligi = t(FIRMA_DAGILIM_INFO_LABEL_KEYS[info] || "deger");

  const data = useMemo(() => {
    const sirali = [...rows].map((item) => ({ firma: safeText(item.firma), deger: Number(item.deger) || 0, oran: item.oran })).sort((first, second) => second.deger - first.deger);

    // Çubuk boyu en yüksek değere göre ölçeklenir; en büyük firma tam dolu görünür
    const enYuksekDeger = sirali.reduce((enYuksek, item) => Math.max(enYuksek, item.deger), 0);

    return sirali.map((item, index) => ({
      ...item,
      doluluk: enYuksekDeger ? (item.deger / enYuksekDeger) * 100 : 0,
      renk: barColorRamp[Math.min(index, barColorRamp.length - 1)],
      etiket: `${formatNumber(item.deger)} (${formatPercent(item.oran)})`,
    }));
  }, [rows]);

  const handleDownload = () => downloadRowsAsXlsx(firmaDagilimRows(data, degerBasligi), t("firmaBazliDagilim"));

  // Değer kolonunun başlığı seçilen göstergeyle birlikte değişir
  const tabloKolonlari = [
    { title: t("firma"), dataIndex: "firma", key: "firma", ellipsis: true },
    { title: degerBasligi, dataIndex: "deger", key: "deger", width: 170, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("oran"), dataIndex: "oran", key: "oran", width: 140, align: "right", ellipsis: true, render: (value) => formatPercent(value) },
  ];

  const gostergeSecimi = (
    <Select
      value={info}
      onChange={onInfoChange}
      options={Object.values(FIRMA_DAGILIM_INFO).map((option) => ({ value: option, label: t(FIRMA_DAGILIM_INFO_LABEL_KEYS[option]) }))}
      style={{ width: 150 }}
      popupMatchSelectWidth={false}
    />
  );

  return (
    <AnalizKarti
      title={t("firmaBazliDagilim")}
      subtitle={t("firmaBazliDagilimAciklama")}
      extra={gostergeSecimi}
      onRefresh={onRefresh}
      onDownload={handleDownload}
      expandedContent={<FirmaDagilimListesi data={data} />}
      dataContent={<GenislemisTablo columns={tabloKolonlari} rows={data} rowKey={(record, index) => `${record.firma}-${index}`} scrollX={520} />}
    >
      <FirmaDagilimListesi data={data.slice(0, WIDGET_PREVIEW_ROW_COUNT)} />
    </AnalizKarti>
  );
}

FirmaDagilimi.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  info: PropTypes.string.isRequired,
  onInfoChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
};
