import React from "react";
import { Card, Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function PageHeaderCard() {
  return (
    <Card bordered={false} style={{ borderRadius: 22, background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" }}>
      <Space direction="vertical" size={4}>
        <Title level={4} style={{ margin: 0 }}>
          ATS PRO En’ler Analizi
        </Title>
        <Text type="secondary">Filodaki en dikkat çeken araçları, maliyet yoğunluklarını ve arıza eğilimlerini tek ekranda izleyin.</Text>
      </Space>
    </Card>
  );
}
