import React, { useRef } from "react";
import { Modal, Button, QRCode, Typography } from "antd";
import { t } from "i18next";
import PropTypes from "prop-types";

const { Text } = Typography;

const QR_SIZE = 300;
const LOGO_MAX_WIDTH = QR_SIZE * 0.3;
const LOGO_MAX_HEIGHT = QR_SIZE * 0.18;

const DEFAULT_LOGO = {
  width: 512,
  height: 152,
  src: "/images/ats_pro_logo.png",
};

const OMEGA_LOGO = {
  width: 553,
  height: 148,
  src: "/images/omega-logo.png",
};

const scaleLogoSize = (originalWidth, originalHeight) => {
  const aspect = originalWidth / originalHeight;
  let width = LOGO_MAX_WIDTH;
  let height = width / aspect;

  if (height > LOGO_MAX_HEIGHT) {
    height = LOGO_MAX_HEIGHT;
    width = height * aspect;
  }

  return { width, height };
};

export default function QRCodeGenerator({
  visible,
  onClose,
  value,
  fileName = "QR-Code",
  title,
  showValue = true,
  defaultLogo = DEFAULT_LOGO,
  omegaLogo = OMEGA_LOGO,
}) {
  const qrRef = useRef(null);

  const isOmegaDomain = typeof window !== "undefined" && window.location.hostname === "omegaerp.net";
  const selectedLogo = isOmegaDomain ? omegaLogo : defaultLogo;
  const iconSize = scaleLogoSize(selectedLogo.width, selectedLogo.height);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");

    if (!ctx) return;

    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = exportCanvas.toDataURL("image/png", 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      title={title || t("qrKod")}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          {t("kapat")}
        </Button>,
        <Button key="download" type="primary" onClick={handleDownload}>
          {t("indir")}
        </Button>,
      ]}
      centered
      width={400}
      destroyOnClose
    >
      <div ref={qrRef} style={{ display: "flex", justifyContent: "center", padding: "20px", backgroundColor: "#ffffff" }}>
        <QRCode
          value={value}
          size={QR_SIZE}
          errorLevel="H"
          bordered={false}
          color="#000000"
          bgColor="#ffffff"
          icon={selectedLogo.src}
          iconSize={iconSize}
          type="canvas"
        />
      </div>
      {showValue && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Text type="secondary">{value}</Text>
        </div>
      )}
    </Modal>
  );
}

QRCodeGenerator.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  title: PropTypes.string,
  showValue: PropTypes.bool,
  defaultLogo: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }),
  omegaLogo: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
  }),
};
