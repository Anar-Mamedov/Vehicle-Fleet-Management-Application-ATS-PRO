import React, { useRef, useState } from "react";
import { Button, Card, Dropdown, Modal, Typography, message } from "antd";
import { ArrowsAltOutlined, FileExcelOutlined, FileImageOutlined, MoreOutlined, ReloadOutlined, TableOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import PropTypes from "prop-types";
import { t } from "i18next";
import { EXPANDED_MODAL_BODY_HEIGHT, colors } from "../utils/constants";
import { normalizeExportFileName } from "../utils/exporters";

const { Text } = Typography;

// Kendi içinde kayan tablolarda modal gövdesi taşmayı gizler, tek kaydırma tablonun içindedir
const TABLE_BODY_STYLE = { height: EXPANDED_MODAL_BODY_HEIGHT, overflow: "hidden" };
const SCROLLABLE_BODY_STYLE = { maxHeight: EXPANDED_MODAL_BODY_HEIGHT, overflow: "auto" };

// Sağdaki boşluk başlıktaki Excel düğmesinin modalın kapatma (X) düğmesiyle çakışmasını önler
const MODAL_TITLE_STYLE = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingRight: 40 };
const MODAL_TITLE_TEXT_STYLE = { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

// contentCentered verildiğinde kart gövdesi kartın tamamını kaplar ve içerik kalan boşluğun ortasına hizalanır
const CARD_STYLE = { borderRadius: 12, border: `1px solid ${colors.cardBorder}`, height: "100%" };
const CENTERED_CARD_STYLE = { ...CARD_STYLE, display: "flex", flexDirection: "column" };
const BODY_STYLE = { padding: 20 };
const CENTERED_BODY_STYLE = { ...BODY_STYLE, flex: 1, display: "flex", flexDirection: "column" };
const CENTERED_CONTENT_STYLE = { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" };

// Analiz bölümlerinin ortak kart kabuğu: başlık, alt başlık ve sağ üstteki işlem menüsü.
// Kartta özet içerik, "Büyüt" penceresinde ise varsa genişletilmiş içerik gösterilir.
export default function AnalizKarti({
  title,
  subtitle,
  extra = null,
  leadingMenuItems = [],
  onRefresh = undefined,
  onDownload = undefined,
  expandedContent = null,
  expandedScrollable = true,
  dataContent = null,
  contentCentered = false,
  children = null,
}) {
  const [expandedOpen, setExpandedOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const kartRef = useRef(null);

  const menuItems = [
    ...leadingMenuItems.map(({ key, icon, label }) => ({ key, icon, label })),
    { key: "expand", icon: <ArrowsAltOutlined />, label: t("buyut") },
    ...(dataContent ? [{ key: "data", icon: <TableOutlined />, label: t("verileriGoruntule") }] : []),
    { key: "excel", icon: <FileExcelOutlined />, label: t("excelEAktar") },
    { key: "image", icon: <FileImageOutlined />, label: t("gorselOlarakIndir") },
    { key: "refresh", icon: <ReloadOutlined />, label: t("yenile") },
  ];

  // Kart olduğu gibi PNG'ye çevrilir; işlem menüsü data-html2canvas-ignore ile görüntüye alınmaz
  const handleImageDownload = async () => {
    if (!kartRef.current) {
      return;
    }

    try {
      const canvas = await html2canvas(kartRef.current, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${normalizeExportFileName(title)}.png`;
      link.click();
    } catch (error) {
      console.error("Error creating image:", error);
      message.error(t("islemBasarisiz"));
    }
  };

  // Kart menüsündeki Excel işlemi, büyüt ve veri pencerelerinde de başlığın yanından çalışır
  const modalBasligi =
    typeof onDownload === "function" ? (
      <div style={MODAL_TITLE_STYLE}>
        <span style={MODAL_TITLE_TEXT_STYLE}>{title}</span>
        <Button type="text" icon={<FileExcelOutlined />} onClick={onDownload} style={{ flexShrink: 0 }}>
          {t("excelEAktar")}
        </Button>
      </div>
    ) : (
      title
    );

  const handleMenuClick = ({ key }) => {
    const leadingItem = leadingMenuItems.find((item) => item.key === key);
    if (leadingItem) {
      leadingItem.onClick();
      return;
    }

    if (key === "expand") {
      setExpandedOpen(true);
    }
    if (key === "data") {
      setDataOpen(true);
    }
    if (key === "excel" && typeof onDownload === "function") {
      onDownload();
    }
    if (key === "image") {
      handleImageDownload();
    }
    if (key === "refresh" && typeof onRefresh === "function") {
      onRefresh();
    }
  };

  return (
    <>
      <Card ref={kartRef} bordered={false} style={contentCentered ? CENTERED_CARD_STYLE : CARD_STYLE} styles={{ body: contentCentered ? CENTERED_BODY_STYLE : BODY_STYLE }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.title }}>{title}</div>
            {subtitle ? (
              <Text type="secondary" style={{ fontSize: 12 }}>
                {subtitle}
              </Text>
            ) : null}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {extra}
            <Dropdown trigger={["click"]} placement="bottomRight" menu={{ items: menuItems, onClick: handleMenuClick }}>
              <button
                type="button"
                aria-label={title}
                data-html2canvas-ignore="true"
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
        </div>
        {contentCentered ? <div style={CENTERED_CONTENT_STYLE}>{children}</div> : children}
      </Card>

      <Modal
        title={modalBasligi}
        open={expandedOpen}
        onCancel={() => setExpandedOpen(false)}
        footer={null}
        width="92vw"
        style={{ top: 20 }}
        styles={{ body: expandedScrollable ? SCROLLABLE_BODY_STYLE : TABLE_BODY_STYLE }}
        destroyOnClose
      >
        {expandedContent || children}
      </Modal>

      <Modal
        title={modalBasligi}
        open={dataOpen}
        onCancel={() => setDataOpen(false)}
        footer={null}
        width="92vw"
        style={{ top: 20 }}
        styles={{ body: TABLE_BODY_STYLE }}
        destroyOnClose
      >
        {dataContent}
      </Modal>
    </>
  );
}

AnalizKarti.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  extra: PropTypes.node,
  // Menünün başına eklenen bölüme özel işlemler
  leadingMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  onRefresh: PropTypes.func,
  onDownload: PropTypes.func,
  expandedContent: PropTypes.node,
  expandedScrollable: PropTypes.bool,
  // Verildiğinde menüye "Verileri Görüntüle" eklenir; grafik bölümlerinin tablo görünümü
  dataContent: PropTypes.node,
  // İçerik kartın yüksekliğinden kısa kaldığında alta boşluk bırakmak yerine dikeyde ortalar
  contentCentered: PropTypes.bool,
  children: PropTypes.node,
};
