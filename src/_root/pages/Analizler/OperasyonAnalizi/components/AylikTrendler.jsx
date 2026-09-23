import React, { useMemo, useState } from "react";
import { ConfigProvider, Empty, Modal } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import AnalizKarti from "./AnalizKarti";
import { GenislemisTablo } from "./TabloBolumu";
import DatePickerSelectYear from "../../../../components/form/inputs/DatePickerSelectYear";
import { getMonthsInRange, toDayjsOrNull } from "../../../../../utils/dateUtils";
import { colors, trendSeriesColors } from "../utils/constants";
import { formatMonthLabel, formatMonthNameLabel, formatNumber } from "../utils/formatters";
import { downloadRowsAsXlsx } from "../utils/exporters";
import { aylikTrendRows } from "../utils/exportMappers";

// Yıl seçimi sayfanın FormProvider'ı üzerinden taşınır
const YIL_ALANI = "operasyonAnaliziTrendYil";

// Grafik tasarımı: kenarlıksız, yuvarlatılmış ve gölgeli tooltip kutusu, seçili ayın arkasında gri bant
const TOOLTIP_CURSOR = { fill: colors.chartCursor };
const TOOLTIP_CONTENT_STYLE = { border: "none", borderRadius: 8, boxShadow: "0 6px 16px rgba(15, 23, 42, 0.12)", padding: "10px 12px" };
const TOOLTIP_LABEL_STYLE = { color: colors.title, fontWeight: 600, marginBottom: 6 };
const TOOLTIP_ITEM_STYLE = { padding: "2px 0" };
const EKSEN_YAZISI = { fontSize: 12, fill: colors.muted };

// Servis satırları ile boş olarak eklenen aylar aynı anahtarla eşleşir
const donemAnahtari = (yil, ay) => `${Number(yil)}-${Number(ay)}`;

// Operasyon adedi ile toplam miktar tek eksende, referans tasarımdaki gibi üst üste yığılmış çubuklarla gösterilir
export default function AylikTrendler({ rows, dateRange, yil = null, onYilChange, onRefresh = undefined }) {
  const { getValues, setValue } = useFormContext();
  const [yilModalAcik, setYilModalAcik] = useState(false);

  // Grafikte gösterilecek aylar: widget'ın kendi yılı seçiliyse o yılın 12 ayı, değilse genel filtrenin tarih aralığındaki aylar
  const aylar = useMemo(() => {
    const yilBasi = yil ? dayjs().year(yil).startOf("year") : null;
    const [baslangic, bitis] = yilBasi ? [yilBasi, yilBasi.endOf("year")] : dateRange;

    return getMonthsInRange(baslangic, bitis).map((tarih) => ({ yil: tarih.year(), ay: tarih.month() + 1 }));
  }, [yil, dateRange]);

  // Servis yalnızca kaydı olan ayları döndürür; aralıktaki diğer aylar boş çubuk olarak eklenir
  const data = useMemo(() => {
    if (!rows.length) {
      return [];
    }

    const donemler = new Map(aylar.map((item) => [donemAnahtari(item.yil, item.ay), item]));
    rows.forEach((item) => donemler.set(donemAnahtari(item.yil, item.ay), item));

    return [...donemler.values()]
      .sort((first, second) => first.yil - second.yil || first.ay - second.ay)
      .map((item) => ({
        etiket: formatMonthNameLabel(item.ay),
        donem: formatMonthLabel(item.yil, item.ay),
        seferSayisi: Number(item.seferSayisi) || 0,
        toplamGerceklesenMiktar: Number(item.toplamGerceklesenMiktar) || 0,
      }));
  }, [rows, aylar]);

  // Başlıktaki yıl bilgisi grafikteki aylardan gelir; aralık iki yıla yayılıyorsa ikisi birden yazılır
  const yillar = useMemo(() => [...new Set(aylar.map((item) => item.yil))].sort((first, second) => first - second), [aylar]);
  const aktifYil = yil || yillar[yillar.length - 1] || dayjs().year();
  const yilEtiketi = yillar.length ? yillar.join(" - ") : String(aktifYil);

  const handleYilAc = () => {
    setValue(YIL_ALANI, toDayjsOrNull(`${aktifYil}-01-01`));
    setYilModalAcik(true);
  };

  const handleYilOnayla = () => {
    const secilenTarih = toDayjsOrNull(getValues(YIL_ALANI));
    if (secilenTarih) {
      onYilChange(secilenTarih.year());
    }
    setYilModalAcik(false);
  };

  const handleDownload = () => downloadRowsAsXlsx(aylikTrendRows(rows), t("aylikOperasyonMiktarTrendleri"));

  const tabloKolonlari = [
    { title: t("donem"), dataIndex: "donem", key: "donem", ellipsis: true },
    { title: t("operasyon"), dataIndex: "seferSayisi", key: "seferSayisi", width: 150, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("miktar"), dataIndex: "toplamGerceklesenMiktar", key: "toplamGerceklesenMiktar", width: 170, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];

  const grafik =
    data.length === 0 ? (
      <Empty description={t("veriYok")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    ) : (
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke={colors.grid} vertical={false} />
          <XAxis dataKey="etiket" interval={0} height={64} angle={-40} textAnchor="end" tickMargin={8} tickLine={false} axisLine={false} tick={EKSEN_YAZISI} />
          <YAxis tickLine={false} axisLine={false} tick={EKSEN_YAZISI} tickFormatter={formatNumber} />
          <Tooltip
            cursor={TOOLTIP_CURSOR}
            contentStyle={TOOLTIP_CONTENT_STYLE}
            labelStyle={TOOLTIP_LABEL_STYLE}
            itemStyle={TOOLTIP_ITEM_STYLE}
            formatter={(value) => formatNumber(value)}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.donem || ""}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12, paddingBottom: 12 }} />
          <Bar dataKey="seferSayisi" stackId="trend" name={t("operasyon")} fill={trendSeriesColors.operasyon} isAnimationActive={false} />
          <Bar dataKey="toplamGerceklesenMiktar" stackId="trend" name={t("miktar")} fill={trendSeriesColors.miktar} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    );

  return (
    <>
      <AnalizKarti
        title={t("aylikOperasyonMiktarTrendleri")}
        subtitle={t("aylikOperasyonMiktarTrendleriAciklama", { yil: yilEtiketi })}
        leadingMenuItems={[{ key: "year", icon: <CalendarOutlined />, label: `${t("yilDegistir")} · ${yilEtiketi}`, onClick: handleYilAc }]}
        onRefresh={onRefresh}
        onDownload={handleDownload}
        dataContent={<GenislemisTablo columns={tabloKolonlari} rows={data} rowKey={(record, index) => `${record.donem}-${index}`} scrollX={480} />}
      >
        {grafik}
      </AnalizKarti>

      <Modal title={t("yilDegistir")} open={yilModalAcik} onOk={handleYilOnayla} onCancel={() => setYilModalAcik(false)} centered destroyOnClose>
        <ConfigProvider locale={tr_TR}>
          <DatePickerSelectYear name={YIL_ALANI} placeholder={t("yilSeciniz")} style={{ width: "160px" }} />
        </ConfigProvider>
      </Modal>
    </>
  );
}

AylikTrendler.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  // Genel filtrede uygulanmış tarih aralığı [başlangıç, bitiş]; grafikteki aylar buna göre tamamlanır
  dateRange: PropTypes.arrayOf(PropTypes.object).isRequired,
  // Widget'ın kendi yıl seçimi; boşsa üstteki genel filtrenin tarih aralığı geçerlidir
  yil: PropTypes.number,
  onYilChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
};
