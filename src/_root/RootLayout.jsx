import React, { useEffect, useState, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, theme } from "antd";
import { getItemWithExpiration } from "../utils/expireToken";
import HeaderComp from "./layout/Header";
import FooterComp from "./layout/Footer";
import Sidebar from "./layout/Sidebar";

const { Sider, Content } = Layout;

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
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
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <HeaderComp colorBgContainer={colorBgContainer} setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            padding: "10px 20px",
            minHeight: 280,
            overflow: "auto",
            position: "relative",
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </Content>
        <FooterComp />
      </Layout>
    </Layout>
  );
};

export default RootLayout;
