import React from "react";
import { AlertOutlined, CarOutlined, DashboardOutlined, ToolOutlined, WalletOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import KpiCard from "./KpiCard";
import { chartColors } from "../utils/constants";
import { formatCurrency, formatDecimalCurrency, formatNumber, getVehicleSubTitle } from "../utils/formatters";

export default function KpiCardsGrid({ type1, type2, type3, type4, type5, onExpenseClick, onFailureClick }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <KpiCard title="En Yaşlı Araç" icon={CarOutlined} item={type1} color={chartColors.blue} softColor="#e6f4ff" value={`${formatNumber(type1.yas)} yıl`} subtitle={getVehicleSubTitle(type1)} />
      </div>
      <div style={{ minWidth: 0 }}>
        <KpiCard
          title="En Masraflı Araç"
          icon={WalletOutlined}
          item={type2}
          color={chartColors.purple}
          softColor="#f5f3ff"
          value={formatCurrency(type2.toplamMaliyetTutar)}
          subtitle="Detayı görmek için tıklayın"
          subtitleColor={chartColors.purple}
          onClick={onExpenseClick}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <KpiCard
          title="En Çok Arıza Yapan Araç"
          icon={ToolOutlined}
          item={type3}
          color={chartColors.red}
          softColor="#fef2f2"
          value={`${formatNumber(type3.toplamArizaSayisi)} Arıza`}
          subtitle="Detayı görmek için tıklayın"
          subtitleColor={chartColors.red}
          onClick={onFailureClick}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <KpiCard title="En Çok Kullanılan Araç" icon={DashboardOutlined} item={type4} color={chartColors.green} softColor="#f0fdf4" value={`${formatNumber(type4.toplamKm)} km`} subtitle={getVehicleSubTitle(type4)} />
      </div>
      <div style={{ minWidth: 0 }}>
        <KpiCard title="En Yüksek Gider / km" icon={AlertOutlined} item={type5} color={chartColors.orange} softColor="#fffbeb" value={`${formatDecimalCurrency(type5.maliyetPerKm)} / km`} subtitle={getVehicleSubTitle(type5)} />
      </div>
    </div>
  );
}

const kpiItemShape = PropTypes.shape({
  plaka: PropTypes.string,
  marka: PropTypes.string,
  model: PropTypes.string,
  yil: PropTypes.number,
  yas: PropTypes.number,
  toplamKm: PropTypes.number,
  toplamArizaTutar: PropTypes.number,
  toplamArizaSayisi: PropTypes.number,
  toplamMaliyetTutar: PropTypes.number,
  maliyetPerKm: PropTypes.number,
});

KpiCardsGrid.propTypes = {
  type1: kpiItemShape.isRequired,
  type2: kpiItemShape.isRequired,
  type3: kpiItemShape.isRequired,
  type4: kpiItemShape.isRequired,
  type5: kpiItemShape.isRequired,
  onExpenseClick: PropTypes.func.isRequired,
  onFailureClick: PropTypes.func.isRequired,
};
