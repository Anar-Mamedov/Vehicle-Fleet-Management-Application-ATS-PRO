import React from "react";
import { Empty, Modal, Space, Typography } from "antd";
import PropTypes from "prop-types";
import { dividerBorder, flexDisplay, spaceBetween } from "../utils/constants";
import { normalizeArray } from "../utils/dataMappers";
import { formatDecimalCurrency, formatNumber, getVehicleSubTitle, getVehicleTitle, safeText } from "../utils/formatters";

const { Text } = Typography;

export default function FailureDetailModal({ open, onCancel, item }) {
  const details = normalizeArray(item.type3Details);
  const vehicleText = `${getVehicleTitle(item)} • ${getVehicleSubTitle(item)}`;
  const totalCountText = `Toplam arıza: ${formatNumber(item.toplamArizaSayisi)} kayıt`;
  const totalAmountText = `Toplam maliyet: ${formatDecimalCurrency(item.toplamArizaTutar)}`;
  const formatDetailCurrency = (value) => {
    const amount = Number(value) || 0;
    return Number.isInteger(amount) ? `₺${formatNumber(amount)}` : formatDecimalCurrency(amount);
  };

  return (
    <Modal title="En Çok Arıza Yapan Araç • Arıza Özeti" open={open} onCancel={onCancel} footer={null} width={460} styles={{ body: { paddingTop: 10 } }}>
      <Space direction="vertical" size={22} style={{ width: "100%" }}>
        <Space direction="vertical" size={4} style={{ width: "100%" }}>
          <Text strong style={{ fontSize: 16, color: "#1f2937" }}>
            {vehicleText}
          </Text>
          <Text style={{ fontSize: 14, color: "#64748b" }}>{totalCountText}</Text>
          <Text style={{ fontSize: 14, color: "#64748b" }}>{totalAmountText}</Text>
        </Space>

        {details.length ? (
          <Space direction="vertical" size={0} style={{ width: "100%" }}>
            {details.map((detail, index) => (
              <div
                key={`${safeText(detail.tanim, "detay")}-${index}`}
                style={{
                  display: flexDisplay,
                  alignItems: "center",
                  justifyContent: spaceBetween,
                  gap: 12,
                  padding: "14px 0",
                  borderBottom: index === details.length - 1 ? "none" : dividerBorder,
                }}
              >
                <Text style={{ flex: 1, fontSize: 15, color: "#334155" }}>{safeText(detail.tanim)}</Text>
                <Text strong style={{ minWidth: 72, textAlign: "right", fontSize: 15, color: "#111827" }}>
                  {`${formatNumber(detail.adet)} adet`}
                </Text>
                <Text strong style={{ minWidth: 84, textAlign: "right", fontSize: 15, color: "#111827" }}>
                  {formatDetailCurrency(detail.tutar)}
                </Text>
              </div>
            ))}
          </Space>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Arıza detayı bulunamadı." />
        )}
      </Space>
    </Modal>
  );
}

FailureDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  item: PropTypes.shape({
    plaka: PropTypes.string,
    marka: PropTypes.string,
    model: PropTypes.string,
    yil: PropTypes.number,
    toplamArizaTutar: PropTypes.number,
    toplamArizaSayisi: PropTypes.number,
    type3Details: PropTypes.arrayOf(
      PropTypes.shape({
        tanim: PropTypes.string,
        adet: PropTypes.number,
        tutar: PropTypes.number,
      })
    ),
  }).isRequired,
};
