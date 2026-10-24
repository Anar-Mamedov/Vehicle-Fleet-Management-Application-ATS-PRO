import React from "react";
import { Grid, Tabs } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { useForm, FormProvider } from "react-hook-form";
import HesapBilgilerim from "./components/HesapBilgilerim";
import ChangePassword from "./components/ChangePassword";
import { useLocation } from "react-router-dom";

//styled components
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin: 0 !important;
    width: 100% !important;
    padding: 10px 15px;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: flex-start;
    border-left: 1px solid #ffffff !important;
  }

  .ant-tabs-tab-active {
    background-color: #4096ff0f;
    border-bottom: 1px solid #4096ff !important;
    border-top: 1px solid #4096ff !important;

    .ant-typography {
      background-color: #4096ff !important;
      color: #ffffff;
    }
  }

  .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn,
  .ant-tabs-nav .ant-tabs-tab-active:hover .ant-tabs-tab-btn {
    color: #4096ff !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:not(:first-child) {
    border-left: 1px solid #80808024;
  }

  .ant-tabs-ink-bar {
    background: rgba(43, 199, 112, 0);
  }

  .ant-tabs-tab-btn {
    width: 100%;
  }

  /* Mobilde sekmeler üstte yan yana dizilir; sol menüdeki tam genişlik burada uygulanmaz */
  &.ant-tabs-top .ant-tabs-tab {
    width: auto !important;
  }
`;

//styled components end

const { useBreakpoint } = Grid;

function ProfiliDuzenleTabs() {
  const screens = useBreakpoint();
  // Sol sekme menüsü dar ekranda içeriği sıkıştırdığı için mobilde sekmeler üste alınır
  const isMobile = screens.md === false;
  const location = useLocation();
  const { userData } = location.state;
  const methods = useForm();

  const items = [
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginRight: "10px" }}>{t("hesapBilgilerim")}</div>
        </div>
      ),
      children: (
        <FormProvider {...methods}>
          <HesapBilgilerim userData={userData} />
        </FormProvider>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginRight: "10px" }}>{t("guvenlik")}</div>
        </div>
      ),
      children: (
        <FormProvider {...methods}>
          <ChangePassword userData={userData} />
        </FormProvider>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "white", padding: "10px", height: "calc(-120px + 100vh)", borderRadius: "8px", filter: "drop-shadow(rgba(0, 0, 0, 0.1) 0px 2px 4px)" }}>
      <StyledTabs tabPosition={isMobile ? "top" : "left"} defaultActiveKey="1" items={items} />
    </div>
  );
}

export default ProfiliDuzenleTabs;
