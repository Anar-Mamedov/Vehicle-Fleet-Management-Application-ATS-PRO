import React, { useState } from "react";
import { Tabs } from "antd";
import { HomeOutlined, SettingOutlined, ToolOutlined, DatabaseOutlined, CodeOutlined, CarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { t } from "i18next";
import FirmaBilgileri from "./FirmaBilgileri/FirmaBilgileri";
import HatirlaticiAyarlari from "./HatirlaticiAyarlari/HatirlaticiAyarlari";
import Araclar from "./Araclar/Araclar";
import StokIslemleri from "./StokIslemleri/StokIslemleri";
import OtomatikKodlar from "./OtomatikKodlar/OtomatikKodlar";
import YakitIslemleri from "./YakitIslemleri/YakitIslemleri";
import TabloAyarlari from "./TabloAyarlari/TabloAyarlari";
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab-active {
    background-color: #e6f7ff; /* Soluk mavi arka plan */
    border-right: 1.5px solid #004ea2ff; /* Sağ kenar 1 px solid mavi */
  }
`;

function AyarlarTabs() {
  const [activeKey, setActiveKey] = useState("1");

  const onChange = (key) => {
    setActiveKey(key);
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <HomeOutlined />
          <div style={{ paddingTop: "2px" }}>{t("firmaBilgileri")}</div>
        </div>
      ),
      children: activeKey === "1" && <FirmaBilgileri />,
    },
    {
      key: "2",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <SettingOutlined />
          <div style={{ paddingTop: "2px" }}>{t("hatirlaticiAyarlari")}</div>
        </div>
      ),
      children: activeKey === "2" && <HatirlaticiAyarlari />,
    },
    {
      key: "3",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <ToolOutlined />
          <div style={{ paddingTop: "2px" }}>{t("araclar")}</div>
        </div>
      ),
      children: activeKey === "3" && <Araclar />,
    },
    {
      key: "4",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <DatabaseOutlined />
          <div style={{ paddingTop: "2px" }}>{t("stokIslemleri")}</div>
        </div>
      ),
      children: activeKey === "4" && <StokIslemleri />,
    },
    {
      key: "5",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <CodeOutlined />
          <div style={{ paddingTop: "2px" }}>{t("otomatikKodlar")}</div>
        </div>
      ),
      children: activeKey === "5" && <OtomatikKodlar />,
    },
    {
      key: "6",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <CarOutlined />
          <div style={{ paddingTop: "2px" }}>{t("yakitIslemleri")}</div>
        </div>
      ),
      children: activeKey === "6" && <YakitIslemleri />,
    },
    {
      key: "7",
      label: (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <ToolOutlined />
          <div style={{ paddingTop: "2px" }}>{t("tabloAyarlari")}</div>
        </div>
      ),
      children: activeKey === "7" && <TabloAyarlari />,
    },
  ];

  return <StyledTabs tabPosition={"left"} activeKey={activeKey} onChange={onChange} items={items} />;
}

export default AyarlarTabs;
