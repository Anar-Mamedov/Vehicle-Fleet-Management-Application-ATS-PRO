import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Modal, Typography } from "antd";
import { t } from "i18next";
import PropTypes from "prop-types";

const { Text } = Typography;

const infoKeyPrefixByTitle = {
  "En Çok Yakıt Tüketen İlk 10 Araç": "extremesInfoTopFuel",
  "En Masraflı İlk 10 Araç": "extremesInfoTopExpense",
  "En Çok Arızalanan İlk 10 Araç": "extremesInfoTopFailures",
  "En Çok Kullanılan İlk 10 Araç": "extremesInfoTopUsage",
  "En Yüksek Gider / km İlk 10 Araç": "extremesInfoCostPerKm",
  "En Uzun Süre Serviste Kalan Araçlar": "extremesInfoDowntime",
  "En Yüksek HGS Maliyeti Olan Araçlar": "extremesInfoHgs",
  "En Çok Arıza Yapan Araçlar": "extremesInfoFailureVehicles",
  "En Çok İşletme Gideri Olan Araçlar": "extremesInfoOperatingExpense",
};

function InfoModalContent({ title }) {
  const prefix = infoKeyPrefixByTitle[title];

  const info = {
    description: prefix ? t(`${prefix}Description`) : t("extremesInfoDefaultDescription"),
    calculation: prefix ? t(`${prefix}Calculation`) : t("extremesInfoDefaultCalculation"),
    interpretation: prefix ? t(`${prefix}Interpretation`) : t("extremesInfoDefaultInterpretation"),
    action: prefix ? t(`${prefix}Action`) : t("extremesInfoDefaultAction"),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      <div>
        <Text strong>{t("extremesInfoWhatShows")}</Text>
        <div style={{ marginTop: 4, color: "#475569" }}>{info.description}</div>
      </div>
      <div>
        <Text strong>{t("extremesInfoHowCalculated")}</Text>
        <div style={{ marginTop: 4, color: "#475569" }}>{info.calculation}</div>
      </div>
      <div>
        <Text strong>{t("extremesInfoHowInterpreted")}</Text>
        <div style={{ marginTop: 4, color: "#475569" }}>{info.interpretation}</div>
      </div>
      <div>
        <Text strong>{t("extremesInfoRecommendedAction")}</Text>
        <div style={{ marginTop: 4, color: "#475569" }}>{info.action}</div>
      </div>
    </div>
  );
}

InfoModalContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function CardActionMenu({ infoTitle, renderFullscreenContent, onRefresh }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const items = [
    { key: "refresh", label: t("extremesMenuRefresh") },
    { key: "download", label: t("extremesMenuDownload") },
    { key: "fullscreen", label: t("extremesMenuFullscreen") },
    { type: "divider" },
    { key: "info", label: t("extremesMenuInfo") },
  ];

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items,
          onClick: ({ key, domEvent }) => {
            domEvent?.stopPropagation?.();
            if (key === "info") {
              setInfoOpen(true);
            }
            if (key === "fullscreen") {
              setFullscreenOpen(true);
            }
            if (key === "refresh" && typeof onRefresh === "function") {
              onRefresh();
            }
          },
        }}
        placement="bottomRight"
      >
        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#ffffff",
            color: "#475569",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          <MoreOutlined />
        </button>
      </Dropdown>

      <Modal title={`${infoTitle} • ${t("extremesMenuInfo")}`} open={infoOpen} onCancel={() => setInfoOpen(false)} footer={null} width={560}>
        <InfoModalContent title={infoTitle} />
      </Modal>

      <Modal
        title={`${infoTitle} • ${t("extremesMenuFullscreen")}`}
        open={fullscreenOpen}
        onCancel={() => setFullscreenOpen(false)}
        footer={null}
        width="92vw"
        style={{ top: 20 }}
        styles={{ body: { maxHeight: "78vh", overflow: "auto" } }}
      >
        {typeof renderFullscreenContent === "function" ? renderFullscreenContent() : null}
      </Modal>
    </>
  );
}

CardActionMenu.propTypes = {
  infoTitle: PropTypes.string.isRequired,
  renderFullscreenContent: PropTypes.func,
  onRefresh: PropTypes.func,
};

CardActionMenu.defaultProps = {
  renderFullscreenContent: undefined,
  onRefresh: undefined,
};
