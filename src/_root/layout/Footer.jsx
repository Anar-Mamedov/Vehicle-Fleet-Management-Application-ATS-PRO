import React from "react";
import { Layout } from "antd";
import dayjs from "dayjs";

const { Footer } = Layout;

const FooterComp = () => {
  const currentYear = dayjs().year();

  return (
    <Footer className="footer">
      <small>Orjin Yazılım · Kurumsal Filo Yönetim Platformu © 1998 - {currentYear}</small>
    </Footer>
  );
};

export default FooterComp;
