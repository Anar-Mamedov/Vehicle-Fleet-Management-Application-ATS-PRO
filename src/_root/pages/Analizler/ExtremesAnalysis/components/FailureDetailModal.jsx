import React from "react";
import { Modal, Space, Typography } from "antd";
import PropTypes from "prop-types";
import { dividerBorder, flexDisplay, spaceBetween } from "../utils/constants";
import { formatCurrency, formatNumber, getVehicleSubTitle, getVehicleTitle } from "../utils/formatters";

const { Text } = Typography;

export default function FailureDetailModal({ open, onCancel, item }) {
  return (
    <Modal title="En Çok Arıza Maliyetli Araç Detayı" open={open} onCancel={onCancel} footer={null} width={460}>
      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        <Text strong>{`${getVehicleTitle(item)} • ${getVehicleSubTitle(item)}`}</Text>
        <div style={{ display: flexDisplay, justifyContent: spaceBetween, borderBottom: dividerBorder, paddingBottom: 8 }}>
          <Text type="secondary">Toplam Arıza Maliyeti</Text>
          <Text strong>{formatCurrency(item.toplamArizaTutar)}</Text>
        </div>
        <div style={{ display: flexDisplay, justifyContent: spaceBetween }}>
          <Text type="secondary">Toplam Arıza Sayısı</Text>
          <Text strong>{formatNumber(item.toplamArizaSayisi)}</Text>
        </div>
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
  }).isRequired,
};
