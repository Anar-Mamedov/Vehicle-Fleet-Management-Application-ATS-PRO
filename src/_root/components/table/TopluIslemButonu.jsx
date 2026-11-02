import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Text } = Typography;

// Liste araç çubuğundaki seçili kayıt işlemleri düğmesi: yeşil "⋮", seçim varsa yanında sayısı.
// Dropdown/Popover tetikleyicisi olarak kullanılır; onların verdiği ref ve olay prop'ları Button'a iletilir.
const TopluIslemButonu = ({ seciliSayisi, ...rest }) => (
  <Button
    {...rest}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0px 5px",
      backgroundColor: "#2BC770",
      borderColor: "#2BC770",
      height: "32px",
    }}
  >
    {seciliSayisi >= 1 && <Text style={{ color: "white", marginLeft: "3px" }}>{seciliSayisi}</Text>}
    <MoreOutlined style={{ color: "white", fontSize: "20px", margin: "0" }} />
  </Button>
);

TopluIslemButonu.propTypes = {
  seciliSayisi: PropTypes.number.isRequired,
};

export default TopluIslemButonu;
