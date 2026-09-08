import React, { useState } from "react";
import { Card, Dropdown, Modal, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import { colors } from "../utils/constants";

const { Text } = Typography;

// Analiz bölümlerinin ortak kart kabuğu: başlık, alt başlık ve sağ üstteki işlem menüsü
export default function AnalizKarti({ title, subtitle, onRefresh, onDownload, children }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const menuItems = [
    { key: "refresh", label: t("verileriYenile") },
    { key: "download", label: t("indir") },
    { key: "fullscreen", label: t("tamEkranAc") },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "refresh" && typeof onRefresh === "function") {
      onRefresh();
    }
    if (key === "download" && typeof onDownload === "function") {
      onDownload();
    }
    if (key === "fullscreen") {
      setFullscreenOpen(true);
    }
  };

  return (
    <>
      <Card bordered={false} style={{ borderRadius: 12, border: `1px solid ${colors.cardBorder}`, height: "100%" }} styles={{ body: { padding: 20 } }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.title }}>{title}</div>
            {subtitle ? (
              <Text type="secondary" style={{ fontSize: 12 }}>
                {subtitle}
              </Text>
            ) : null}
          </div>
          <Dropdown trigger={["click"]} placement="bottomRight" menu={{ items: menuItems, onClick: handleMenuClick }}>
            <button
              type="button"
              aria-label={title}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: `1px solid ${colors.cardBorder}`,
                background: "#ffffff",
                color: colors.muted,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              <MoreOutlined />
            </button>
          </Dropdown>
        </div>
        {children}
      </Card>

      <Modal title={title} open={fullscreenOpen} onCancel={() => setFullscreenOpen(false)} footer={null} width="92vw" style={{ top: 20 }} styles={{ body: { maxHeight: "78vh", overflow: "auto" } }}>
        {children}
      </Modal>
    </>
  );
}

AnalizKarti.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onRefresh: PropTypes.func,
  onDownload: PropTypes.func,
  children: PropTypes.node,
};

AnalizKarti.defaultProps = {
  subtitle: undefined,
  onRefresh: undefined,
  onDownload: undefined,
  children: null,
};
