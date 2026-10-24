import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Drawer, Grid, Layout, theme } from "antd";
import { getItemWithExpiration } from "../utils/expireToken";
import HeaderComp from "./layout/Header";
import FooterComp from "./layout/Footer";
import Sidebar from "./layout/Sidebar";
import HatirlaticiPanel from "./components/Hatirlatici/HatirlaticiPanel";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const MOBILE_SIDEBAR_WIDTH = 250;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const screens = useBreakpoint();
  // useBreakpoint ilk render'da boş nesne döner; md bilinene kadar masaüstü düzeni korunur
  const isMobile = screens.md === false;
  const location = useLocation();
  const [hatirlaticiPinnable, setHatirlaticiPinnable] = useState(() => localStorage.getItem("hatirlatici_pinnable") === "true");
  const [hatirlaticiOpen, setHatirlaticiOpen] = useState(() => {
    return localStorage.getItem("hatirlatici_panel_open") === "true";
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const hasSession = getItemWithExpiration("token");

    if (!hasSession) {
      navigate("/login");
    }
  }, [navigate]);

  // Mobilde menüden bir sayfaya geçilince menü kapanır
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  // Sabitlenmiş hatırlatıcı paneli dar ekranda içeriği daralttığı için mobilde popover kullanılır
  const hatirlaticiPanelEnabled = hatirlaticiPinnable && !isMobile;

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {isMobile ? (
        <Drawer
          placement="left"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          closable={false}
          width={MOBILE_SIDEBAR_WIDTH}
          rootClassName="mobile-sidebar-drawer"
          styles={{ body: { padding: 0 } }}
        >
          <Sidebar collapsed={false} />
        </Drawer>
      ) : (
        <Sider trigger={null} collapsible collapsed={collapsed} className="main-layout-sider">
          <Sidebar collapsed={collapsed} />
        </Sider>
      )}
      <Layout>
        <HeaderComp
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          isMobile={isMobile}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
          hatirlaticiOpen={hatirlaticiOpen}
          setHatirlaticiOpen={handleHatirlaticiToggle}
          hatirlaticiPinnable={hatirlaticiPanelEnabled}
        />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <Content
            style={{
              padding: isMobile ? "8px" : "10px 20px",
              minHeight: 280,
              overflow: "auto",
              position: "relative",
              flex: 1,
              transition: "all 0.3s ease",
            }}
          >
            <Outlet />
          </Content>
          {hatirlaticiPanelEnabled && <HatirlaticiPanel open={hatirlaticiOpen} onClose={() => handleHatirlaticiToggle(false)} />}
        </div>
        <FooterComp />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
