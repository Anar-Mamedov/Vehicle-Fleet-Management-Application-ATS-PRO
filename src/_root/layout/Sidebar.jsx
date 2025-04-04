import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Divider, Modal, Button } from "antd";
import { PieChartOutlined, CarOutlined } from "@ant-design/icons";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { PiTireBold } from "react-icons/pi";
import { LuWarehouse } from "react-icons/lu";
import { FaGears } from "react-icons/fa6";
import { BsFuelPump } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { t } from "i18next";
import Draggable from "react-draggable";
import Ayarlar from "../pages/Ayarlar/Ayarlar";

const Sidebar = () => {
  const location = useLocation();
  const draggleRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const showModal = () => {
    setOpen(true);
  };

  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: <Link to={"/"}>{t("dashboard")}</Link>,
    },
    {
      key: "2",
      icon: <CarOutlined />,
      label: t("aracYonetimi"),
      children: [
        {
          key: "3",
          label: <Link to={"/araclar"}>{t("araclar")}</Link>,
        },
        {
          key: "4",
          label: <Link to={"/yakit-islemleri"}>{t("yakitIslemleri")}</Link>,
        },
        {
          key: "6",
          label: <Link to={"/sefer-islemleri"}>{t("seferler")}</Link>,
        },
        {
          key: "7",
          label: <Link to={"/sigorta-islemleri"}>{t("sigortalar")}</Link>,
        },
        {
          key: "8",
          label: <Link to={"/harcama-islemleri"}>{t("harcamalar")}</Link>,
        },
        {
          key: "9",
          label: <Link to={"/kaza-islemleri"}>{t("kazalar")}</Link>,
        },
        {
          key: "10",
          label: <Link to={"/ceza-islemleri"}>{t("cezalar")}</Link>,
        },
        {
          key: "121",
          label: <Link to={"/ekspertizler"}>{t("ekspertizler")}</Link>,
        },
        {
          key: "12",
          label: <Link to={"/hizli-km-guncelleme"}>{t("hizliKmGuncelleme")}</Link>,
        },
      ],
    },
    {
      key: "19",
      icon: <GiAutoRepair />,
      label: t("bakim&Onarim"),
      children: [
        {
          key: "21",
          label: <Link to={"/servis-islemleri"}>{t("servisIslemleri")}</Link>,
        },
        {
          key: "20",
          label: <Link to={"/Periodic-Maintenance"}>{t("periyodikBakimlar")}</Link>,
        },
        {
          key: "22",
          label: <Link to={"/sefer-islemleri"}>{t("randevuTakibi")}</Link>,
        },
        /* {
          key: "24",
          label: <Link to={"/malzeme-tanimlari"}>{t("atolyeTanimlari")}</Link>,
        }, */
      ],
    },
    {
      key: "ds897g6",
      icon: <FaGears />,
      label: t("lastikYonetimi"),
      children: [
        {
          key: "365df3",
          label: <Link to={"/lastik-islemleri"}>{t("lastikIslemleri")}</Link>,
        },
        {
          key: "4jk3l56",
          label: <Link to={"/lastik-envanteri"}>{t("lastikEnvanteri")}</Link>,
        },
        {
          key: "45",
          label: <Link to={"/lastik-tanimlari"}>{t("lastikTanimlari")}</Link>,
        },
        {
          key: "3653",
          label: <Link to={"/axle"}>{t("aksTanimlari")}</Link>,
        },
      ],
    },
    {
      key: "31",
      icon: <LuWarehouse />,
      label: t("malzemeDepo"),
      children: [
        {
          key: "32",
          label: <Link to={"/malzeme-tanimlari"}>{t("malzemeTanimlari")}</Link>,
        },
        {
          key: "3j2h4b5kj2h34",
          label: <Link to={"/giris-fisleri"}>{t("girisFisleri")}</Link>,
        },
        /*  {
          key: "33",
          label: <Link to={"/giris-fisleri1"}>{t("Giris Fisleri Eski")}</Link>,
        }, */
        {
          key: "34",
          label: <Link to={"/cikis-fisleri"}>{t("cikisFisleri")}</Link>,
        },
        /* {
          key: "341",
          label: <Link to={"/cikis-fisleri1"}>{t("Cikis Fisleri Eski")}</Link>,
        }, */
        {
          key: "35",
          label: <Link to={"/transferler"}>{t("malzemeTransferleri")}</Link>,
        },
        /*  {
          key: "351",
          label: <Link to={"/transferler1"}>{t("Transferler Eski")}</Link>,
        }, */
        {
          key: "36",
          label: <Link to={"/hazirlaniyor"}>{t("talepler")}</Link>,
        },
        {
          key: "37",
          label: <Link to={"/hareketler"}>{t("malzemeHareketleri")}</Link>,
        },
        {
          key: "837",
          label: <Link to={"/hazirlaniyor"}>{t("malzemeDepoTanimlari")}</Link>,
        },
      ],
    },
    /* {
      key: "13",
      icon: <BsFuelPump />,
      label: t("yakitYonetimi"),
      children: [
        {
          key: "14",
          label: <Link to={"/yakit-tanimlari"}>{t("tanimlar")}</Link>,
        },
        {
          key: "15",
          label: <Link to={"/yakit-giris-fisleri"}>{t("girişFişleri")}</Link>,
        },
        {
          key: "16",
          label: <Link to={"/yakit-cikis-fisleri"}>{t("çıkışFişleri")}</Link>,
        },
        {
          key: "17",
          label: <Link to={"/yakit-transferler"}>{t("transferler")}</Link>,
        },
        {
          key: "18",
          label: <Link to={"/yakit-hareketleri"}>{t("hareketler")}</Link>,
        },
        {
          key: "138",
          label: <Link to={"/"}>{t("yakitTanklari")}</Link>,
        },
      ],
    }, */

    {
      key: "2v34789",
      icon: <FaGears />,
      label: t("analizler"),
      children: [
        {
          key: "2980345df",
          label: <Link to={"/fuel-analysis"}>{t("yakitTuketimAnalizleri")}</Link>,
        },
        {
          key: "3j4h5v34",
          label: <Link to={"/performance-analysis"}>{t("performansAnalizleri")}</Link>,
        },
        {
          key: "3jh4b5j3h5",
          label: <Link to={"/cost-analysis"}>{t("maliyetAnalizleri")}</Link>,
        },
      ],
    },
    {
      key: "38",
      icon: <HiOutlineDocumentReport />,
      label: <Link to={"/raporlar"}>{t("raporlar")}</Link>,
    },
    {
      key: "39",
      icon: <MdOutlineSystemUpdateAlt />,
      label: t("sistemTanimlari"),
      children: [
        {
          key: "14",
          label: <Link to={"/yakit-tanimlari"}>{t("tanimlar")}</Link>,
        },
        {
          key: "401",
          label: <Link to={"/lokasyon-tanimlari"}>{t("lokasyonlar")}</Link>,
        },
        {
          key: "40",
          label: <Link to={"/firma-tanimlari"}>{t("firma")}</Link>,
        },
        {
          key: "41",
          label: <Link to={"/surucu-tanimlari"}>{t("surucu")}</Link>,
        },
        {
          key: "42",
          label: <Link to={"/personel-tanimlari"}>{t("personel")}</Link>,
        },
        {
          key: "43",
          label: <Link to={"/servis-tanimlari"}>{t("servisTanimlari")}</Link>,
        },
        {
          key: "44",
          label: <Link to={"/guzergah-tanimlari"}>{t("guzergah")}</Link>,
        },

        {
          key: "46",
          label: <Link to={"/ceza-tanimlari"}>{t("cezaTanimlari")}</Link>,
        },
        {
          key: "47",
          label: <Link to={"/arac-marka-ve-model"}>{t("markaModel")}</Link>,
        },
        {
          key: "48",
          label: <Link to={"/sehir-tanimlari"}>{t("sehirTanimlari")}</Link>,
        },
        {
          key: "49",
          label: <Link to={"/is-kartlari"}>{t("isKartlari")}</Link>,
        },
      ],
    },
    {
      key: "50",
      icon: <FaGears />,
      label: t("sistemAyarari"),
      children: [
        {
          key: "51",
          label: <div onClick={showModal}>{t("ayarlar")}</div>,
        },
        {
          key: "52",
          label: <Link to={`/user_definitions`}>{t("kullaniciTanimlari")}</Link>,
        },
        {
          key: "53",
          label: <Link to={`/kod-yonetimi`}>{t("kodYonetimi")}</Link>,
        },
      ],
    },
  ];

  const findActiveKeys = () => {
    const findInItems = (path) => {
      for (const item of items) {
        // Check if this item matches the path
        if (item.label?.props?.to === path) {
          return { menuKey: item.key, parentKey: null };
        }
        // Check children if they exist
        if (item.children) {
          for (const child of item.children) {
            if (child.label?.props?.to === path) {
              return { menuKey: child.key, parentKey: item.key };
            }
          }
        }
      }
      // If we're at root path, return dashboard
      if (path === "/") {
        return { menuKey: "1", parentKey: null };
      }
      return { menuKey: null, parentKey: null };
    };

    return findInItems(location.pathname);
  };

  const { menuKey, parentKey } = findActiveKeys();
  const [selectedKey, setSelectedKey] = useState(menuKey || "1");
  const [openKeys, setOpenKeys] = useState(parentKey ? [parentKey] : []);

  useEffect(() => {
    const { menuKey, parentKey } = findActiveKeys();
    if (menuKey) {
      setSelectedKey(menuKey);
      // Eğer ana sayfadaysa (/) tüm grupları kapat
      if (location.pathname === "/") {
        setOpenKeys([]);
      } else if (parentKey) {
        setOpenKeys([parentKey]);
      }
    } else {
      // Eğer menuKey bulunamazsa (geçersiz route vs.) tüm grupları kapat
      setOpenKeys([]);
    }
  }, [location.pathname]);

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onOpenChange = (keys) => {
    // Eğer hiç açık menü yoksa veya son açılan menü kapandıysa
    if (keys.length === 0) {
      setOpenKeys([]);
      return;
    }

    // En son açılan/kapanan menü
    const latestOpenKey = keys[keys.length - 1];

    // Eğer zaten açık olan menüye tıklandıysa (yani kapatma işlemi)
    if (keys.length === 1 && keys[0] === openKeys[0]) {
      setOpenKeys([]);
      return;
    }

    // Yeni bir menü açıldığında sadece onu aç, diğerlerini kapat
    setOpenKeys([latestOpenKey]);
  };

  return (
    <>
      <div className="flex justify-center w-full py-20 text-center">
        <Link to="/">
          <img src="/images/logo_white.png" alt="ats logo" className="sidebar-logo" />
        </Link>
      </div>
      <Menu mode="inline" theme="dark" openKeys={openKeys} selectedKeys={[selectedKey]} onOpenChange={onOpenChange} items={items} />
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            <div style={{ fontSize: "20px" }}>{t("ayarlar")}</div>
          </div>
        }
        centered
        open={open}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        modalRender={(modal) => (
          <Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Ayarlar />
      </Modal>
    </>
  );
};

export default Sidebar;
