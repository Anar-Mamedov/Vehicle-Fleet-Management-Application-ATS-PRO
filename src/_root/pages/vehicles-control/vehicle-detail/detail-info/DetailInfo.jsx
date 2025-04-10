import React, { useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import {
  DownOutlined,
  UserOutlined,
  IdcardOutlined,
  CarOutlined,
  ApartmentOutlined,
  ApiOutlined,
  BranchesOutlined,
  CreditCardOutlined,
  DatabaseOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { PiGearSixBold } from "react-icons/pi";
import { MdHealthAndSafety } from "react-icons/md";
import { Button, Dropdown, Space } from "antd";
import Ruhsat from "./modals/ruhsat/Ruhsat";
import Ekspertiz from "./modals/ekspertiz/Ekspertiz";
import Teknik from "./modals/teknik/Teknik";
import Satinalma from "./modals/satinalma/Satinalma";
import Satis from "./modals/satis/Satis";
import Garanti from "./modals/garanti/Garanti";
import TasitKarti from "./modals/tasit-karti/TasitKarti";
import Kapasite from "./modals/kapasite/Kapasite";
import Aksesuar from "./modals/aksesuar/Aksesuar";
import Surucu from "./modals/surucu/Surucu";
import Lokasyonlar from "./modals/lokasyon/Surucu";
// import Lastik from "./modals/lastik/Lastik";

const DetailInfo = ({ id, refreshVehicleData }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      label: t("ruhsatBilgileri"),
      key: "1",
      icon: <IdcardOutlined className="text-info" />,
    },
    {
      label: t("teknikBilgiler"),
      key: "2",
      icon: <BranchesOutlined className="text-info" />,
    },
    {
      label: t("ekspertizBilgiler"),
      key: "4",
      icon: <CarOutlined className="text-info" />,
    },
    {
      label: t("lastikBilgiler"),
      key: "11",
      icon: <PiGearSixBold className="text-info" />,
    },
    {
      label: t("aracSuruculeri"),
      key: "3",
      icon: <UserOutlined className="text-info" />,
    },
    {
      label: t("lokasyonDegisiklikleri"),
      key: "13",
      icon: <UserOutlined className="text-info" />,
    },

    {
      label: t("garantiBilgiler"),
      key: "8",
      icon: <MdHealthAndSafety className="text-info" />,
    },

    {
      label: t("tasitKartiYetkiBelgeleri"),
      key: "9",
      icon: <SolutionOutlined className="text-info" />,
    },
    {
      label: t("aksesuarlar"),
      key: "6",
      icon: <ApiOutlined className="text-info" />,
    },

    {
      label: t("kapasiteBilgiler"),
      key: "10",
      icon: <DatabaseOutlined className="text-info" />,
    },

    // {
    //   label: t("ustYapiBilgiler"),
    //   key: "5",
    //   icon: <ApartmentOutlined className="text-info" />,
    // },

    {
      label: t("satinalmaKiralamaBilgiler"),
      key: "7",
      icon: <CreditCardOutlined className="text-info" />,
    },

    {
      label: t("aracSatisBilgiler"),
      key: "12",
      icon: <ShoppingCartOutlined className="text-info" />,
    },
  ];

  const menuProps = {
    items,
    onClick: (e) => setSelectedItem(e.key),
  };

  const renderModal = () => {
    switch (selectedItem) {
      case "1":
        return <Ruhsat visible={selectedItem === "1"} onClose={() => setSelectedItem(null)} id={id} />;
      case "2":
        return <Teknik visible={selectedItem === "2"} onClose={() => setSelectedItem(null)} id={id} />;
      case "3":
        return <Surucu visible={selectedItem === "3"} onClose={() => setSelectedItem(null)} id={id} refreshVehicleData={refreshVehicleData} />;
      case "4":
        return <Ekspertiz visible={selectedItem === "4"} onClose={() => setSelectedItem(null)} id={id} />;
      // case "5":
      //     return (
      //       <UstYapi
      //         visible={selectedItem === "5"}
      //         onClose={() => setSelectedItem(null)}
      //         id={id}
      //       />
      //     );
      case "6":
        return <Aksesuar visible={selectedItem === "6"} onClose={() => setSelectedItem(null)} id={id} />;
      case "7":
        return <Satinalma visible={selectedItem === "7"} onClose={() => setSelectedItem(null)} id={id} />;
      case "8":
        return <Garanti visible={selectedItem === "8"} onClose={() => setSelectedItem(null)} id={id} />;
      case "9":
        return <TasitKarti visible={selectedItem === "9"} onClose={() => setSelectedItem(null)} id={id} />;
      case "10":
        return <Kapasite visible={selectedItem === "10"} onClose={() => setSelectedItem(null)} id={id} />;
      case "11":
        // Lastik component is not defined, so we'll return null for now
        // return <Lastik visible={selectedItem === "11"} onClose={() => setSelectedItem(null)} id={id} />;
        return null;
      case "12":
        return <Satis visible={selectedItem === "12"} onClose={() => setSelectedItem(null)} id={id} />;
      case "13":
        return <Lokasyonlar visible={selectedItem === "13"} onClose={() => setSelectedItem(null)} id={id} refreshVehicleData={refreshVehicleData} />;
      // default:
      //     return null;
    }
  };

  return (
    <>
      <Dropdown menu={menuProps}>
        <Button className="detail-info">
          <Space>
            {t("detayBilgiler")}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      {selectedItem && renderModal()}
    </>
  );
};

DetailInfo.propTypes = {
  id: PropTypes.string,
  refreshVehicleData: PropTypes.func,
};

export default DetailInfo;
