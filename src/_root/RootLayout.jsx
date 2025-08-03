import React, { useEffect, useState, lazy, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, theme } from "antd";
import { getItemWithExpiration } from "../utils/expireToken";

// Lazy load layout components
const HeaderComp = lazy(() => import("./layout/Header"));
const FooterComp = lazy(() => import("./layout/Footer"));
const Sidebar = lazy(() => import("./layout/Sidebar"));

const { Sider, Content } = Layout;

// Loading component for layout
const LayoutLoading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "16px",
      color: "#666",
    }}
  >
    Yükleniyor...
  </div>
);

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Suspense fallback={<LayoutLoading />}>
          <Sidebar collapsed={collapsed} />
        </Suspense>
      </Sider>
      <Layout>
        <Suspense fallback={<LayoutLoading />}>
          <HeaderComp colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed} />
        </Suspense>
        <Content
          style={{
            padding: "10px 20px",
            minHeight: 280,
            overflow: "auto",
            position: "relative",
          }}
        >
          <Outlet />
        </Content>
        <Suspense fallback={<LayoutLoading />}>
          <FooterComp />
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
