import React from "react";
import { t } from "i18next";
import { HomeOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import FirmaSettings from "./tabs/firma/FirmaSettings";
import HatirlaticiSettings from "./tabs/hatirlatici/HatirlaticiSettings";
import VehiclesSettings from "./tabs/araclar/VehiclesSettings";
import StokSettings from "./tabs/stok/StokSettings";
import YakitSettings from "./tabs/yakit/YakitSettings";
import OtomatikKodlar from "./tabs/otomatik-kodlar/OtomatikKodlar";

const breadcrumb = [
  {
    href: "/",
    title: <HomeOutlined />,
  },
  {
    title: t("ayarlar"),
  },
];

const Settings = () => {
  const items = [
    {
      key: 1,
      label: t("firmaBilgileri"),
      children: <FirmaSettings />,
    },
    {
      key: 2,
      label: t("hatirlaticiAyarlari"),
      children: <HatirlaticiSettings />,
    },
    {
      key: 3,
      label: t("araclar"),
      children: <VehiclesSettings />,
    },
    {
      key: 4,
      label: t("stokIslemleri"),
      children: <StokSettings />,
    },
    {
      key: 5,
      label: t("otomatikKodlar"),
      children: <OtomatikKodlar />,
    },
    {
      key: 6,
      label: t("yakitIslemleri"),
      children: <YakitSettings />,
    },
  ];

  return (
    <div>
      {/* <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div> */}

      <div className="content">
        <Tabs defaultActiveKey="1" tabPosition="left" items={items} />
      </div>
    </div>
  );
};

export default Settings;
