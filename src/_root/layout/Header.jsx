import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Avatar, Button, Layout, Spin, Popover } from "antd";
import { HomeOutlined, AntDesignOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import LanguageSelector from "../components/lang/LanguageSelector";
import Bildirim from "../components/Notification/Bildirim";
import Hatirlatici from "../components/Hatirlatici/Hatirlatici";
import { t } from "i18next";
import AxiosInstance from "../../api/http";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LanguageSelectbox from "../components/lang/LanguageSelectbox";
import KullaniciProfil from "../pages/KullaniciProfil/KullaniciProfil";
import { CompanyLogo } from "./components/CompanyLogo";
const { Header } = Layout;

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important; /* Blue color */
  }
`;

const HeaderComp = ({ collapsed, colorBgContainer, setCollapsed }) => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getHatirlatici = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/Reminder");
      if (response.data) {
        setData(response.data);
        setLoading(false);
      } else {
        console.error("API response is not in expected format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getHatirlatici1 = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post("/Graphs/GetGraphInfoByType?type=12");
      if (response.data) {
        setData1(response.data);
        setLoading(false);
      } else {
        console.error("API response is not in expected format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHatirlatici();
    getHatirlatici1();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("token_expire");
  //   navigate("/login");
  // };

  // const popoverContent = (
  //   <Button type="primary" onClick={handleLogout}>
  //     {t("logout")}
  //   </Button>
  // );

  return (
    <Header
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="flex justify-between align-center gap-1 header">
        <div className="flex gap-1 justify-between align-baseline" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 32,
              height: 32,
            }}
          />
          <HomeOutlined />
          {/* <LanguageSelector /> */}
          <LanguageSelectbox />
          <CompanyLogo />
        </div>
        <div style={{ gap: "10px" }} className="flex gap-1 justify-between align-center">
          <CustomSpin spinning={loading}>
            <Hatirlatici data={data} getHatirlatici={getHatirlatici} data1={data1} getHatirlatici1={getHatirlatici1} loading={loading} />
          </CustomSpin>
          <Bildirim />
          <Input className="search-input" placeholder={t("arama")} allowClear />
          {/* <Popover content={popoverContent} trigger="click">
            <Avatar className="header-avatar" icon={<AntDesignOutlined />} />
          </Popover> */}
          <KullaniciProfil />
        </div>
      </div>
    </Header>
  );
};

HeaderComp.propTypes = {
  collapsed: PropTypes.bool,
  colorBgContainer: PropTypes.string,
  setCollapsed: PropTypes.func,
};

export default HeaderComp;
