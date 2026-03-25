import React, { useState } from "react";
import { Switch, Typography } from "antd";
import { t } from "i18next";

const { Text } = Typography;

const AraYuzAyarlari = () => {
  const [hatirlaticiPinnable, setHatirlaticiPinnable] = useState(() => localStorage.getItem("hatirlatici_pinnable") === "true");

  const handlePinnableChange = (checked) => {
    setHatirlaticiPinnable(checked);
    localStorage.setItem("hatirlatici_pinnable", checked.toString());
    if (!checked) {
      localStorage.setItem("hatirlatici_panel_open", "false");
    }
    // RootLayout'un değişikliği anında yakalaması için custom event
    window.dispatchEvent(new Event("hatirlatici_pinnable_changed"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 400 }}>
        <Text>{t("hatirlaticiPillenebilir") || "Hatırlatıcı pillenebilir"}</Text>
        <Switch checked={hatirlaticiPinnable} onChange={handlePinnableChange} />
      </div>
      <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: "block" }}>
        Açık olduğunda hatırlatıcı paneli ekranın sağ tarafına sabitlenebilir. Kapalı olduğunda açılır menü olarak gösterilir.
      </Text>
    </div>
  );
};

export default AraYuzAyarlari;
