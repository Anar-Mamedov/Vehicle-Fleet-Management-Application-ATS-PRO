import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, theme } from "antd";
import { getItemWithExpiration } from "../utils/expireToken";
import HeaderComp from "./layout/Header";
import FooterComp from "./layout/Footer";
import Sidebar from "./layout/Sidebar";
import HatirlaticiPanel from "./components/Hatirlatici/HatirlaticiPanel";

const { Sider, Content } = Layout;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hatirlaticiPinnable, setHatirlaticiPinnable] = useState(() => localStorage.getItem("hatirlatici_pinnable") === "true");
  const [hatirlaticiOpen, setHatirlaticiOpen] = useState(() => {
    return localStorage.getItem("hatirlatici_panel_open") === "true";
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const token = getItemWithExpiration("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  // Ayarlar modalından pinnable değiştiğinde yakalamak için
  useEffect(() => {
    const handleStorageChange = () => {
      const pinnable = localStorage.getItem("hatirlatici_pinnable") === "true";
      setHatirlaticiPinnable(pinnable);
      if (!pinnable) {
        setHatirlaticiOpen(false);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Aynı pencerede localStorage değişikliklerini yakalamak için custom event
    const handleCustomStorage = () => handleStorageChange();
    window.addEventListener("hatirlatici_pinnable_changed", handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("hatirlatici_pinnable_changed", handleCustomStorage);
    };
  }, []);

  const handleHatirlaticiToggle = (open) => {
    setHatirlaticiOpen(open);
    localStorage.setItem("hatirlatici_panel_open", open.toString());
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <HeaderComp
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          hatirlaticiOpen={hatirlaticiOpen}
          setHatirlaticiOpen={handleHatirlaticiToggle}
          hatirlaticiPinnable={hatirlaticiPinnable}
        />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <Content
            style={{
              padding: "10px 20px",
              minHeight: 280,
              overflow: "auto",
              position: "relative",
              flex: 1,
              transition: "all 0.3s ease",
            }}
          >
            <Outlet />
          </Content>
          {hatirlaticiPinnable && <HatirlaticiPanel open={hatirlaticiOpen} onClose={() => handleHatirlaticiToggle(false)} />}
        </div>
        <FooterComp />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
