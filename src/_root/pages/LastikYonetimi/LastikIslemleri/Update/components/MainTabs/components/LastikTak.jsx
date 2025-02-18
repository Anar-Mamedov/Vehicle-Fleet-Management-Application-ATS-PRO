import React from "react";
import { Typography, Space } from "antd";
import { t } from "i18next";

const { Text } = Typography;

export default function LastikTak({ wheelInfo }) {
  const getPositionText = () => {
    if (!wheelInfo?.axlePosition) return "";

    // If it's a middle axle, it will already include the number
    if (wheelInfo.axlePosition.startsWith("ortaAks")) {
      return t(wheelInfo.axlePosition);
    }

    // For front and rear axles
    return t(wheelInfo.axlePosition);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>{t("secilenLastikBilgisi")}:</Text>
        <div style={{ marginTop: 8 }}>
          <Space>
            <Text>{getPositionText()}</Text>
            <Text>|</Text>
            <Text>{wheelInfo?.wheelPosition}</Text>
          </Space>
        </div>
      </div>
      {/* Add your tire selection/installation form here */}
    </div>
  );
}
