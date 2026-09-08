import React, { useMemo } from "react";
import { Empty } from "antd";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import { t } from "i18next";
import AnalizKarti from "./AnalizKarti";
import { barColorRamp, colors } from "../utils/constants";
import { formatNumber, safeText } from "../utils/formatters";
import { downloadRowsAsXlsx } from "../utils/exporters";
import { firmaTutarRows } from "../utils/exportMappers";

const ROW_HEIGHT = 34;
const MIN_CHART_HEIGHT = 220;

// Firma bazlı hakediş tutarları; en yüksek tutar en koyu tonla en üstte gösterilir
export default function FirmaTutarOzeti({ rows, onRefresh }) {
  const data = useMemo(
    () =>
      [...rows]
        .map((item) => ({ firma: safeText(item.firma), tutar: Number(item.tutar) || 0 }))
        .sort((first, second) => second.tutar - first.tutar),
    [rows]
  );

  const handleDownload = () => downloadRowsAsXlsx(firmaTutarRows(data), t("firmaBazliTutarOzeti"));

  return (
    <AnalizKarti title={t("firmaBazliTutarOzeti")} subtitle={t("firmaBazliTutarOzetiAciklama")} onRefresh={onRefresh} onDownload={handleDownload}>
      {data.length === 0 ? (
        <Empty description={t("veriYok")} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          <ResponsiveContainer width="100%" height={Math.max(MIN_CHART_HEIGHT, data.length * ROW_HEIGHT)}>
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 96, bottom: 4, left: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="firma" width={140} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: colors.muted }} />
              <Tooltip cursor={{ fill: "transparent" }} formatter={(value) => [formatNumber(value), t("tutar")]} />
              <Bar dataKey="tutar" barSize={14} radius={[0, 4, 4, 0]} background={{ fill: "#eef2f7", radius: 4 }} isAnimationActive={false}>
                {data.map((item, index) => (
                  <Cell key={item.firma} fill={barColorRamp[Math.min(index, barColorRamp.length - 1)]} />
                ))}
                <LabelList dataKey="tutar" position="right" formatter={formatNumber} style={{ fontSize: 12, fontWeight: 600, fill: colors.title }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </AnalizKarti>
  );
}

FirmaTutarOzeti.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

FirmaTutarOzeti.defaultProps = {
  onRefresh: undefined,
};
