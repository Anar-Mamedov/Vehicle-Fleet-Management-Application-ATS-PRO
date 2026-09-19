import React from "react";
import { Card, Col, Progress, Row, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, EnvironmentOutlined, PieChartOutlined, ProfileOutlined, SwapOutlined, WalletOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import { colors } from "../utils/constants";
import { calculateChangeRatio, formatNumber, formatPercent, safeText, toPercentValue } from "../utils/formatters";

const { Text } = Typography;

const ICON_COLORS = {
  operasyon: "#2f6fbd",
  hareket: "#f97316",
  miktar: "#7c3aed",
  tutar: "#d97706",
  guzergah: "#0f9b8e",
};

function KpiKarti({ icon, iconColor, title, children }) {
  return (
    <Card bordered={false} style={{ borderRadius: 12, border: `1px solid ${colors.cardBorder}`, height: "100%" }} styles={{ body: { padding: 16 } }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: iconColor, fontSize: 14, display: "flex" }}>{icon}</span>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {title}
        </Text>
      </div>
      {children}
    </Card>
  );
}

KpiKarti.propTypes = {
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function BuyukDeger({ value }) {
  return (
    <div style={{ marginTop: 6, fontSize: 26, fontWeight: 700, color: colors.title, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={value}>
      {value}
    </div>
  );
}

BuyukDeger.propTypes = { value: PropTypes.string.isRequired };

// Önceki döneme göre değişim; negatifse aşağı ok ve kırmızı ile gösterilir
function DegisimSatiri({ oran }) {
  if (oran === null || oran === undefined || Number.isNaN(Number(oran))) {
    return null;
  }

  const isNegative = Number(oran) < 0;
  const DegisimIcon = isNegative ? ArrowDownOutlined : ArrowUpOutlined;

  return (
    <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: isNegative ? colors.negative : colors.positive }}>
      <DegisimIcon style={{ fontSize: 11 }} /> {formatPercent(Math.abs(Number(oran)))} {t("oncekiDonemeGore")}
    </div>
  );
}

DegisimSatiri.propTypes = { oran: PropTypes.number };

function MiktarSutunu({ label, value }) {
  return (
    <div style={{ minWidth: 0 }}>
      <Text type="secondary" style={{ fontSize: 11 }}>
        {label}
      </Text>
      <div style={{ fontSize: 22, fontWeight: 700, color: colors.title, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
}

MiktarSutunu.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default function KpiKartlari({ toplamOperasyon, toplamHareket, miktar, toplamTutar, enYogunGuzergah }) {
  const hareketDegisimi = calculateChangeRatio(toplamHareket.toplamSayisi, toplamHareket.toplamOncekiDonemSayisi);

  return (
    <Row gutter={[16, 16]}>
      <Col flex="1 1 200px">
        <KpiKarti icon={<ProfileOutlined />} iconColor={ICON_COLORS.operasyon} title={t("toplamOperasyon")}>
          <BuyukDeger value={formatNumber(toplamOperasyon.toplamSayisi)} />
          <DegisimSatiri oran={toplamOperasyon.oran} />
        </KpiKarti>
      </Col>

      <Col flex="1 1 200px">
        <KpiKarti icon={<SwapOutlined />} iconColor={ICON_COLORS.hareket} title={t("toplamHareket")}>
          <BuyukDeger value={formatNumber(toplamHareket.toplamSayisi)} />
          <div style={{ marginTop: 4, fontSize: 11, color: colors.muted }}>{t("operasyonBasinaHareket", { sayi: formatNumber(toplamHareket.operasyonBasinaHareketSayisi) })}</div>
          <DegisimSatiri oran={hareketDegisimi} />
        </KpiKarti>
      </Col>

      <Col flex="1 1 240px">
        <KpiKarti icon={<PieChartOutlined />} iconColor={ICON_COLORS.miktar} title={t("planlananGerceklesen")}>
          <div style={{ display: "flex", gap: 24, marginTop: 6 }}>
            <MiktarSutunu label={t("planlanan")} value={formatNumber(miktar.planlananMiktar)} />
            <MiktarSutunu label={t("gerceklesen")} value={formatNumber(miktar.gerceklesenMiktar)} />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: colors.muted }}>{t("farkVeGerceklesme", { fark: formatNumber(miktar.fark), oran: formatPercent(miktar.gerceklesmeOrani) })}</div>
          <Progress percent={toPercentValue(miktar.gerceklesmeOrani)} showInfo={false} size="small" strokeColor={colors.navy} trailColor={colors.track} />
        </KpiKarti>
      </Col>

      <Col flex="1 1 200px">
        <KpiKarti icon={<WalletOutlined />} iconColor={ICON_COLORS.tutar} title={t("toplamTutar")}>
          <BuyukDeger value={formatNumber(toplamTutar.toplamSayisi)} />
          <DegisimSatiri oran={toplamTutar.oran} />
        </KpiKarti>
      </Col>

      <Col flex="1 1 220px">
        <KpiKarti icon={<EnvironmentOutlined />} iconColor={ICON_COLORS.guzergah} title={t("enYogunGuzergah")}>
          <div style={{ marginTop: 6, fontSize: 18, fontWeight: 700, color: colors.title, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={safeText(enYogunGuzergah.guzergah)}>
            {safeText(enYogunGuzergah.guzergah)}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: colors.muted }}>{t("enYogunGuzergahOzeti", { sayi: formatNumber(enYogunGuzergah.seferSayisi), oran: formatPercent(enYogunGuzergah.oran) })}</div>
          <Progress percent={toPercentValue(enYogunGuzergah.oran)} showInfo={false} size="small" strokeColor={colors.teal} trailColor={colors.track} />
        </KpiKarti>
      </Col>
    </Row>
  );
}

KpiKartlari.propTypes = {
  toplamOperasyon: PropTypes.shape({ toplamSayisi: PropTypes.number, toplamOncekiDonemSayisi: PropTypes.number, oran: PropTypes.number }).isRequired,
  toplamHareket: PropTypes.shape({ toplamSayisi: PropTypes.number, toplamOncekiDonemSayisi: PropTypes.number, operasyonBasinaHareketSayisi: PropTypes.number }).isRequired,
  miktar: PropTypes.shape({ planlananMiktar: PropTypes.number, gerceklesenMiktar: PropTypes.number, fark: PropTypes.number, gerceklesmeOrani: PropTypes.number }).isRequired,
  toplamTutar: PropTypes.shape({ toplamSayisi: PropTypes.number, toplamOncekiDonemSayisi: PropTypes.number, oran: PropTypes.number }).isRequired,
  enYogunGuzergah: PropTypes.shape({ guzergah: PropTypes.string, seferSayisi: PropTypes.number, oran: PropTypes.number }).isRequired,
};
