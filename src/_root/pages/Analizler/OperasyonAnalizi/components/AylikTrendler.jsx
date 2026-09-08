import React, { useMemo } from "react";
import { Empty } from "antd";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import { t } from "i18next";
import AnalizKarti from "./AnalizKarti";
import { colors } from "../utils/constants";
import { formatMonthLabel, formatNumber } from "../utils/formatters";
import { downloadRowsAsXlsx } from "../utils/exporters";
import { aylikTrendRows } from "../utils/exportMappers";

// Operasyon adedi ile toplam miktar farklı büyüklüklerde olduğu için iki ayrı eksende gösterilir
export default function AylikTrendler({ rows, onRefresh }) {
  const data = useMemo(
    () =>
      [...rows]
        .sort((first, second) => first.yil - second.yil || first.ay - second.ay)
        .map((item) => ({
          etiket: formatMonthLabel(item.yil, item.ay),
          operasyonSayisi: Number(item.operasyonSayisi) || 0,
          toplamGerceklesenMiktar: Number(item.toplamGerceklesenMiktar) || 0,
        })),
    [rows]
  );

  const handleDownload = () => downloadRowsAsXlsx(aylikTrendRows(rows), t("aylikOperasyonMiktarTrendleri"));

  return (
    <AnalizKarti title={t("aylikOperasyonMiktarTrendleri")} subtitle={t("aylikOperasyonMiktarTrendleriAciklama")} onRefresh={onRefresh} onDownload={handleDownload}>
      {data.length === 0 ? (
        <Empty description={t("veriYok")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
            <CartesianGrid stroke={colors.grid} vertical={false} />
            <XAxis dataKey="etiket" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: colors.muted }} />
            <YAxis yAxisId="operasyon" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: colors.muted }} tickFormatter={formatNumber} />
            <YAxis yAxisId="miktar" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: colors.muted }} tickFormatter={formatNumber} />
            <Tooltip formatter={(value) => formatNumber(value)} />
            <Legend verticalAlign="top" align="right" iconType="square" wrapperStyle={{ fontSize: 12, paddingBottom: 8 }} />
            <Bar yAxisId="operasyon" dataKey="operasyonSayisi" name={t("operasyon")} fill={colors.navy} radius={[3, 3, 0, 0]} isAnimationActive={false} />
            <Bar yAxisId="miktar" dataKey="toplamGerceklesenMiktar" name={t("miktar")} fill={colors.teal} radius={[3, 3, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </AnalizKarti>
  );
}

AylikTrendler.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

AylikTrendler.defaultProps = {
  onRefresh: undefined,
};
