import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  FaWrench,
  FaGear,
  FaBuildingShield,
  FaTruckFast,
} from "react-icons/fa6";
import { FaFire, FaWallet, FaCarCrash } from "react-icons/fa";
import {
  MdFormatListBulleted,
  MdHealthAndSafety,
  MdSettingsInputComponent,
} from "react-icons/md";
import { PlakaContext } from "../../../../../context/plakaSlice";
import Yakit from "./yakit/Yakit";
import Ceza from "./ceza/Ceza";
import Harcama from "./harcama/Harcama";
import Sefer from "./sefer/Sefer";
import Kaza from "./kaza/Kaza";
import Sigorta from "./sigorta/Sigorta";
import Lastik from "./lastik/Lastik";
import Bakim from "./bakim/Bakim";

const OperationsInfo = ({ ids }) => {
  const { setPlaka } = useContext(PlakaContext)
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      label: t("bakimlar"),
      key: "1",
      icon: <FaWrench className="text-info" />,
    },
    {
      label: t("yakitlar"),
      key: "2",
      icon: <FaFire className="text-info" />,
    },
    {
      label: t("gorevler"),
      key: "3",
      icon: <MdFormatListBulleted className="text-info" />,
    },
    {
      label: t("harcamalar"),
      key: "4",
      icon: <FaWallet className="text-info" />,
    },
    {
      label: t("kazalar"),
      key: "5",
      icon: <FaCarCrash className="text-info" />,
    },
    {
      label: t("cezalar"),
      key: "6",
      icon: <FaBuildingShield className="text-info" />,
    },
    {
      label: t("sigortalar"),
      key: "7",
      icon: <MdHealthAndSafety className="text-info" />,
    },
    {
      label: t("lastikler"),
      key: "8",
      icon: <FaGear className="text-info" />,
    },
    {
      label: t("kmTakibi"),
      key: "9",
      icon: <FaTruckFast className="text-info" />,
    },
    {
      label: t("seferler"),
      key: "10",
      icon: <FaTruckFast className="text-info" />,
    },
    {
      label: t("parcalar"),
      key: "11",
      icon: <MdSettingsInputComponent className="text-info" />,
    },
  ];

  const menuProps = {
    items,
    onClick: (e) => {
      setSelectedItem(e.key);
    },
  };

  const renderModal = () => {
    switch (selectedItem) {
      case '1':
        return <Bakim visible={selectedItem === '1'} onClose={() => {
          setSelectedItem(null)
          setPlaka([])
        }} ids={ids} />;
      case "2":
        return (
          <Yakit
            visible={selectedItem === "2"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      case "4":
        return (
          <Harcama
            visible={selectedItem === "4"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      case "5":
        return (
          <Kaza
            visible={selectedItem === "5"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      case "6":
        return (
          <Ceza
            visible={selectedItem === "6"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      case "7":
        return (
          <Sigorta
            visible={selectedItem === "7"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      case "8":
        return (
          <Lastik
            visible={selectedItem === "8"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      case "10":
        return (
          <Sefer
            visible={selectedItem === "10"}
            onClose={() => {
              setSelectedItem(null)
              setPlaka([])
            }}
            ids={ids}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dropdown menu={menuProps} disabled={ids.length === 0}>
        <Button className="btn operations-btn">
          <Space>
            {t("islemler")}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      {selectedItem && renderModal()}
    </>
  );
};

OperationsInfo.propTypes = {
  ids: PropTypes.array,
};

export default OperationsInfo;
