import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import { colors } from "../utils/constants";
import { formatChangeRatio, formatNumber } from "../utils/formatters";

const { Text } = Typography;

const kpiShape = PropTypes.shape({
  toplamSayisi: PropTypes.number,
  toplamOncekiDonemSayisi: PropTypes.number,
  oran: PropTypes.number,
});

function KpiKarti({ title, value, unit, degisim }) {
  const hasDegisim = degisim !== null && degisim !== undefined && !Number.isNaN(Number(degisim));
  const isNegative = hasDegisim && Number(degisim) < 0;
  const DegisimIcon = isNegative ? ArrowDownOutlined : ArrowUpOutlined;

  return (
    <Card bordered={false} style={{ borderRadius: 12, border: `1px solid ${colors.cardBorder}`, height: "100%" }} styles={{ body: { padding: 16 } }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        {title}
      </Text>
      <div style={{ marginTop: 6, fontSize: 26, fontWeight: 700, color: colors.title, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={value}>
        {value}
      </div>
      {unit ? (
        <div style={{ marginTop: 4, fontSize: 11, color: colors.muted }}>{unit}</div>
      ) : null}
      {hasDegisim ? (
        <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: isNegative ? colors.negative : colors.positive }}>
          <DegisimIcon style={{ fontSize: 11 }} /> {formatChangeRatio(Math.abs(Number(degisim)))} {t("oncekiDonemeGore")}
        </div>
      ) : null}
    </Card>
  );
}

KpiKarti.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  unit: PropTypes.string,
  degisim: PropTypes.number,
};

KpiKarti.defaultProps = {
  unit: undefined,
  degisim: undefined,
};

export default function KpiKartlari({ toplamOperasyon, toplamHareket, planlananMiktar, gerceklesenMiktar, toplamTutar }) {
  const cards = [
    { key: "toplamOperasyon", title: t("toplamOperasyon"), value: formatNumber(toplamOperasyon.toplamSayisi), degisim: toplamOperasyon.oran },
    { key: "toplamHareket", title: t("toplamHareket"), value: formatNumber(toplamHareket.toplamSayisi), degisim: toplamHareket.oran },
    { key: "planlananMiktar", title: t("planlananMiktar"), value: formatNumber(planlananMiktar.toplamSayisi), unit: t("miktarBirimleri"), degisim: planlananMiktar.oran },
    { key: "gerceklesenMiktar", title: t("gerceklesenMiktar"), value: formatNumber(gerceklesenMiktar.toplamSayisi), unit: t("miktarBirimleri"), degisim: gerceklesenMiktar.oran },
    { key: "toplamTutar", title: t("toplamTutar"), value: formatNumber(toplamTutar.toplamSayisi), degisim: toplamTutar.oran },
  ];

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col key={card.key} flex="1 1 200px">
          <KpiKarti title={card.title} value={card.value} unit={card.unit} degisim={card.degisim} />
        </Col>
      ))}
    </Row>
  );
}

KpiKartlari.propTypes = {
  toplamOperasyon: kpiShape.isRequired,
  toplamHareket: kpiShape.isRequired,
  planlananMiktar: kpiShape.isRequired,
  gerceklesenMiktar: kpiShape.isRequired,
  toplamTutar: kpiShape.isRequired,
};
