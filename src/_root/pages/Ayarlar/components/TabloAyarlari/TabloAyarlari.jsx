import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Spin, Button, message, Typography, Switch, Input } from "antd";

const { Text, Link } = Typography;
const { TextArea } = Input;

import dayjs from "dayjs";
import { t } from "i18next";

function TabloAyarlari() {
  const [infiniteScroll, setInfiniteScroll] = useState(false);

  // Load value from localStorage on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem("tabloInfiniteScroll");
    if (savedValue !== null) {
      setInfiniteScroll(savedValue === "true");
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("tabloInfiniteScroll", infiniteScroll.toString());
    message.success(t("ayarlarKaydedildi"));
    window.location.reload();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("tabloKaydirmaYonteminiSonsuzKaydirmayaAyarla")}</Text>
        <Switch checked={infiniteScroll} onChange={setInfiniteScroll} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", paddingBottom: "10px" }}>
        <Button
          onClick={handleSave}
          style={{
            backgroundColor: "#2bc770",
            borderColor: "#2bc770",
            color: "#ffffff",
          }}
        >
          {t("kaydet")}
        </Button>
      </div>
    </div>
  );
}

export default TabloAyarlari;
