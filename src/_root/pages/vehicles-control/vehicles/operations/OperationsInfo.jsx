import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaWrench, FaGear, FaBuildingShield, FaTruckFast } from "react-icons/fa6";
import { FaFire, FaWallet, FaCarCrash } from "react-icons/fa";
import { MdFormatListBulleted, MdHealthAndSafety, MdSettingsInputComponent } from "react-icons/md";
import { PlakaContext } from "../../../../../context/plakaSlice";
import Yakit from "./yakit/Yakit";
import Ceza from "./ceza/Ceza";
import Harcama from "./harcama/Harcama";
import Sefer from "./sefer/Sefer";
import Kaza from "./kaza/Kaza";
import Sigorta from "./sigorta/Sigorta";
import Lastik from "./lastik/Lastik";
import Bakim from "./bakim/Bakim";
import KmTakibi from "./KmTakibi/KmTakibi.jsx";
import PeryodikBakimlar from "./PeryodikBakimlar/PeryodikBakimlar.jsx";
import Servisler from "./Servisler/Servisler";
import Surucu from "../../vehicle-detail/detail-info/modals/surucu/Surucu.jsx";
import Sil from "./Sil/Sil.jsx";
import Ekspertiz from "../../vehicle-detail/detail-info/modals/ekspertiz/Ekspertiz";
import AksYapilandirma from "../../../LastikYonetimi/LastikIslemleri/Update/EditDrawer.jsx";

const OperationsInfo = ({ ids, selectedRowsData, onRefresh }) => {
  const { setPlaka } = useContext(PlakaContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawer, setDrawer] = useState({ visible: false, data: null });

  const items = [
    {
      label: t("servisIslemleri"),
      key: "3",
      icon: <FaWrench className="text-info" />,
    },
    // {
    //   label: t("bakimlar"),
    //   key: "1",
    //   icon: <FaWrench className="text-info" />,
    // },
    {
      label: t("yakitlar"),
      key: "2",
      icon: <FaFire className="text-info" />,
    },
    // {
    //   label: t("gorevler"),
    //   key: "3",
    //   icon: <MdFormatListBulleted className="text-info" />,
    // },
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
    ...(ids.length === 1
      ? [
          {
            label: t("lastikler"),
            key: "8",
            icon: <FaGear className="text-info" />,
          },
        ]
      : []),
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
      label: t("degisenParcalar"),
      key: "11",
      icon: <MdSettingsInputComponent className="text-info" />,
    },
    {
      label: t("periyodikBakimlar"),
      key: "12",
      icon: <MdSettingsInputComponent className="text-info" />,
    },
    ...(ids.length <= 1
      ? [
          {
            label: t("surucuDegisiklikleri"),
            key: "13",
            icon: <MdSettingsInputComponent className="text-info" />,
          },
          {
            label: t("ekspertiz"),
            key: "15",
            icon: <MdSettingsInputComponent className="text-info" />,
          },
        ]
      : []),
    /*  {
      label: t("sozlesmeler"),
      key: "14",
      icon: <MdSettingsInputComponent className="text-info" />,
    }, */

    /*  {
      label: t("sil"),
      key: "16",
      icon: <DeleteOutlined className="text-info" />,
    }, */
  ];

  const menuProps = {
    items,
    onClick: (e) => {
      setSelectedItem(e.key);
      if (e.key === "8") {
        // When lastikler (key 8) is selected, set the drawer data and make it visible
        setDrawer({ visible: true, data: selectedRowsData[0] });
      }
    },
  };

  const renderModal = () => {
    switch (selectedItem) {
      case "1":
        return (
          <Bakim
            visible={selectedItem === "1"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "12":
        return (
          <PeryodikBakimlar
            visible={selectedItem === "12"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "2":
        return (
          <Yakit
            visible={selectedItem === "2"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "4":
        return (
          <Harcama
            visible={selectedItem === "4"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "5":
        return (
          <Kaza
            visible={selectedItem === "5"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "6":
        return (
          <Ceza
            visible={selectedItem === "6"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "7":
        return (
          <Sigorta
            visible={selectedItem === "7"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "8":
        return ids.length === 1 ? (
          <AksYapilandirma
            selectedRow={drawer.data}
            onDrawerClose={() => {
              setDrawer({ ...drawer, visible: false });
              setSelectedItem(null);
            }}
            drawerVisible={drawer.visible}
            onRefresh={onRefresh}
          />
        ) : null;
      case "9":
        return (
          <KmTakibi
            visible={selectedItem === "9"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "10":
        return (
          <Sefer
            visible={selectedItem === "10"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "3":
        return (
          <Servisler
            visible={selectedItem === "3"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            ids={ids}
            selectedRowsData={selectedRowsData}
          />
        );
      case "13":
        return (
          <Surucu
            visible={selectedItem === "13"}
            onClose={() => {
              setSelectedItem(null);
              // setPlaka([]);
            }}
            id={ids[0]}
            selectedRowsData={selectedRowsData}
          />
        );
      case "15":
        return (
          <Ekspertiz
            visible={selectedItem === "15"}
            onClose={() => {
              setSelectedItem(null);
            }}
            // Çoklu id gelebilir, sadece ilk indextekini gönderiyoruz
            id={ids[0]}
            selectedRowsData={selectedRowsData}
          />
        );

      /*  case "16":
        return (
          <Sil
            key={`Sil-${ids.join("-")}-${Date.now()}`} // Assign a unique key to force remounting
            ids={ids}
            onDeleteSuccess={() => {
              setSelectedItem(null);
              onRefresh();
              // Refresh data or perform other actions
            }}
            onCancel={() => {
              setSelectedItem(null);
            }}
          />
        ); */
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
  selectedRowsData: PropTypes.array,
  onRefresh: PropTypes.func,
};

export default OperationsInfo;
