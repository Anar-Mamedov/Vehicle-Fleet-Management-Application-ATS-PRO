import React from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { colors } from "../utils/constants";

// Hesaplanmış kolonların nasıl bulunduğunu anlatan bilgi ikonlu tablo başlığı
export default function KolonBasligi({ label, aciklama }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {label}
      <Tooltip title={aciklama}>
        <InfoCircleOutlined style={{ color: colors.muted, fontSize: 12 }} />
      </Tooltip>
    </span>
  );
}

KolonBasligi.propTypes = {
  label: PropTypes.string.isRequired,
  aciklama: PropTypes.string.isRequired,
};
