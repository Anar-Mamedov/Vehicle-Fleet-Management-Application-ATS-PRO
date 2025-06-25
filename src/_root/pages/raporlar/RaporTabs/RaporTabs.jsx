import React, { useEffect, useState } from "react";
import { Tabs, Typography } from "antd";
import {
  ToolOutlined,
  FundProjectionScreenOutlined,
  SolutionOutlined,
  ProductOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  WalletOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../api/http.jsx";
import RaporsTables from "./components/RaporsTables";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb.jsx";
import { t } from "i18next";

const { Text } = Typography;

const breadcrumb = [{ href: "/", title: <HomeOutlined /> }, { title: t("raporTanimlari") }];

const onChange = (key) => {
  // console.log(key);
};

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
`;

//styled components end

export default function RaporTabs({ refreshKey, disabled, fieldRequirements }) {
  const { watch } = useFormContext();
  const [items, setItems] = useState([]); // state to hold the items

  useEffect(() => {
    // fetch data from API
    const lan = localStorage.getItem("i18nextLng") || "tr";
    AxiosInstance.get(`ReportGroup/GetReportGroup?lan=${lan}`).then((response) => {
      // map over the data to create items
      const newItems = response.data.map((item) => ({
        key: item.tbRaporGroupId.toString(),
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginRight: "10px" }}>{item.rpgAciklama}</div>
            <Text
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "#e4e4e4",
                minWidth: "20px",
                height: "20px",
              }}
            >
              {item.raporSayisi}
            </Text>
          </div>
        ),
        children: <RaporsTables tabKey={item.tbRaporGroupId.toString()} tabName={item.rpgAciklama} />, // replace with actual component
      }));

      // set the items
      setItems(newItems);
    });
  }, []);

  return (
    <div>
      {/* <div
        style={{
          backgroundColor: "white",
          marginBottom: "15px",
          padding: "15px",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <BreadcrumbComp items={breadcrumb} />
      </div> */}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 115px)",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <StyledTabs tabPosition="left" defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
}
