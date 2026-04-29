import React from "react";
import { Modal, Space, Tooltip, Typography } from "antd";
import PropTypes from "prop-types";
import { dividerBorder, flexDisplay, spaceBetween } from "../utils/constants";
import { formatCurrency, getVehicleSubTitle, getVehicleTitle } from "../utils/formatters";

const { Text } = Typography;

export default function ExpenseDetailModal({ open, onCancel, item }) {
  const rows = [
    ["Yakıt", item.toplamYakitTutar],
    ["Bakım", item.toplamBakimTutar],
    ["Arıza", item.toplamArizaTutar],
    ["Sigorta", item.toplamSigortaTutar],
    ["Harcama", item.toplamHarcamaTutar],
    ["Toplam Maliyet", item.toplamMaliyetTutar],
  ];

  return (
    <Modal title="En Masraflı Araç Detayı" open={open} onCancel={onCancel} footer={null} width={520}>
      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        <Text strong>{`${getVehicleTitle(item)} • ${getVehicleSubTitle(item)}`}</Text>
        {rows.map(([label, value]) => (
          <Tooltip title={formatCurrency(value)} key={label}>
            <div style={{ display: flexDisplay, justifyContent: spaceBetween, borderBottom: dividerBorder, paddingBottom: 8 }}>
              <Text type="secondary">{label}</Text>
              <Text strong>{formatCurrency(value)}</Text>
            </div>
          </Tooltip>
        ))}
      </Space>
    </Modal>
  );
}

ExpenseDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  item: PropTypes.shape({
    plaka: PropTypes.string,
    marka: PropTypes.string,
    model: PropTypes.string,
    yil: PropTypes.number,
    toplamYakitTutar: PropTypes.number,
    toplamBakimTutar: PropTypes.number,
    toplamArizaTutar: PropTypes.number,
    toplamSigortaTutar: PropTypes.number,
    toplamHarcamaTutar: PropTypes.number,
    toplamMaliyetTutar: PropTypes.number,
  }).isRequired,
};
