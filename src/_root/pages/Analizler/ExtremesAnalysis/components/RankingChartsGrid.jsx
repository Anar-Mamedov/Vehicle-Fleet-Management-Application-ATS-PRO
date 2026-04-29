import React from "react";
import { Col, Divider, Row } from "antd";
import { AlertOutlined, BarChartOutlined, ClockCircleOutlined, FireOutlined, ToolOutlined, WalletOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import AreaRankingCard from "./AreaRankingCard";
import RankingCard from "./RankingCard";
import RepeatedFaultsLineCard from "./RepeatedFaultsLineCard";
import ScrollRankingCard from "./ScrollRankingCard";
import { chartColors } from "../utils/constants";
import { formatCurrency, formatDecimalCurrency, formatNumber } from "../utils/formatters";

export default function RankingChartsGrid({ type6Data, type7Data, type8Data, type9Data, type10Data, type11Data, type12LineData }) {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} xl={12}>
          <ScrollRankingCard title="En Çok Yakıt Tüketen İlk 10 Araç" icon={FireOutlined} data={type6Data} color={chartColors.blue} softColor="#dbeafe" formatter={(value) => `${formatNumber(value)} L`} unitLabel="Toplam litre" />
        </Col>
        <Col xs={24} xl={12}>
          <ScrollRankingCard title="En Masraflı İlk 10 Araç" icon={WalletOutlined} data={type7Data} color={chartColors.purple} softColor="#ede9fe" formatter={formatCurrency} unitLabel="Toplam gider" />
        </Col>
        <Col xs={24} xl={12}>
          <AreaRankingCard title="En Çok Arızalanan İlk 10 Araç" icon={ToolOutlined} data={type8Data} color={chartColors.red} softColor="#fecaca" formatter={(value) => `${formatNumber(value)} arıza`} unitLabel="Toplam arıza sayısı" gradientId="grad-extreme-failure" />
        </Col>
        <Col xs={24} xl={12}>
          <ScrollRankingCard title="En Çok Kullanılan İlk 10 Araç" icon={BarChartOutlined} data={type9Data} color={chartColors.green} softColor="#dcfce7" formatter={(value) => `${formatNumber(value)} km`} unitLabel="Seçilen dönemde yapılan km" />
        </Col>
      </Row>

      <Divider orientation="left" style={{ marginTop: 28 }}>
        Ek Grafikler
      </Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <RankingCard title="En Yüksek Gider / km İlk 10 Araç" icon={AlertOutlined} data={type10Data} color={chartColors.orange} formatter={(value) => `${formatDecimalCurrency(value)} / km`} unitLabel="Verimsizlik göstergesi" />
        </Col>
        <Col xs={24} xl={8}>
          <AreaRankingCard title="En Uzun Süre Serviste Kalan Araçlar" icon={ClockCircleOutlined} data={type11Data} color={chartColors.teal} softColor="#ccfbf1" formatter={(value) => `${formatNumber(value)} saat`} unitLabel="Servis süresi" gradientId="grad-extreme-service" />
        </Col>
        <Col xs={24} xl={8}>
          <RepeatedFaultsLineCard data={type12LineData} />
        </Col>
      </Row>
    </>
  );
}

const chartItemShape = PropTypes.shape({
  plate: PropTypes.string,
  model: PropTypes.string,
  value: PropTypes.number,
});

RankingChartsGrid.propTypes = {
  type6Data: PropTypes.arrayOf(chartItemShape).isRequired,
  type7Data: PropTypes.arrayOf(chartItemShape).isRequired,
  type8Data: PropTypes.arrayOf(chartItemShape).isRequired,
  type9Data: PropTypes.arrayOf(chartItemShape).isRequired,
  type10Data: PropTypes.arrayOf(chartItemShape).isRequired,
  type11Data: PropTypes.arrayOf(chartItemShape).isRequired,
  type12LineData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      sira1: PropTypes.number,
      sira2: PropTypes.number,
      sira3: PropTypes.number,
    })
  ).isRequired,
};
