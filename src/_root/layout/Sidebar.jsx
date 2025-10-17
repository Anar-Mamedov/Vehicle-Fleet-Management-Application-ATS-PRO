import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Modal, Typography, Input } from "antd";
import { PieChartOutlined, CarOutlined } from "@ant-design/icons";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { LuWarehouse } from "react-icons/lu";
import { FaGears } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineDocumentReport, HiOutlineClipboardList } from "react-icons/hi";
import i18n, { t } from "i18next";
import Draggable from "react-draggable";
import Ayarlar from "../pages/Ayarlar/Ayarlar";
import versionData from "../../version.json";

import PropTypes from "prop-types";
const { Text } = Typography;

// Label içeriğinden düz metin çıkarır
const getItemLabelText = (label) => {
  if (typeof label === "string") {
    return label;
  }
  if (React.isValidElement(label)) {
    const children = label.props?.children;
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.filter((c) => typeof c === "string").join(" ");
    }
  }
  return "";
};

// Menü öğelerini arama terimine göre filtreler
const filterMenuItems = (menuItems, term) => {
  if (!term) return menuItems;
  const lower = term.toLowerCase();

  const recurse = (item) => {
    const labelText = getItemLabelText(item.label).toLowerCase();
    let matched = labelText.includes(lower);

    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const newItem = { ...item };
    if (hasChildren) {
      const filteredChildren = item.children.map(recurse).filter(Boolean);
      if (filteredChildren.length > 0) {
        newItem.children = filteredChildren;
        matched = true;
      } else {
        delete newItem.children;
      }
    }

    return matched ? newItem : null;
  };

  return menuItems.map(recurse).filter(Boolean);
};

// Menü gruplarına (children içeren) görünür alt menü sayısını ekler
const addCountBadges = (menuItems) => {
  if (!Array.isArray(menuItems)) return menuItems;

  return menuItems.map((item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    if (!hasChildren) return { ...item };

    const childrenWithBadges = addCountBadges(item.children);
    const count = childrenWithBadges.length;

    const badgeStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 18,
      height: 18,
      padding: "0 4px",
      fontSize: 12,
      lineHeight: 1,
      color: "#fff",
      backgroundColor: "#1677ff",
      borderRadius: 9,
      marginLeft: 8,
    };

    const labelText = getItemLabelText(item.label) || item.label;

    return {
      ...item,
      children: childrenWithBadges,
      label: (
        <span style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{labelText}</span>
          <span style={badgeStyle}>{count}</span>
        </span>
      ),
    };
  });
};

const Sidebar = ({ collapsed }) => {
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
  const [searchValue, setSearchValue] = useState("");

  const showModal = React.useCallback(() => {
    setOpen(true);
  }, []);

  const items = React.useMemo(
    () => [
      {
        key: "1",
        icon: <PieChartOutlined />,
        label: <Link to={"/"}>{t("dashboard")}</Link>,
      },
      {
        key: "2",
        icon: <CarOutlined />,
        label: t("filoYonetimi"),
        children: [
          {
            key: "3",
            label: <Link to={"/araclar"}>{t("araclar")}</Link>,
          },
          /* {
            key: "4",
            label: <Link to={"/yakit-islemleri"}>{t("yakitIslemleri")}</Link>,
          }, */
          {
            key: "6",
            label: <Link to={"/sefer-islemleri"}>{t("gorevTakibi")}</Link>,
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
          /* {
            key: "kj234h5b",
            label: <Link to={"/hasar-takibi"}>{t("hasarTakibi")}</Link>,
          }, */
          /* {
            key: "3jkh45",
            label: <Link to={"/yakit-limitleri"}>{t("yakitLimitleri")}</Link>,
          }, */
          {
            key: "48ashjd6",
            label: <Link to={"/kiralik-araclar"}>{t("kiralikAraclar")}</Link>,
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
        key: "2435897xcv",
        icon: <CarOutlined />,
        label: t("yakitIslemleri"),
        children: [
          {
            key: "4",
            label: <Link to={"/yakit-islemleri"}>{t("yakitGirisleri")}</Link>,
          },
          {
            key: "3jkh45",
            label: <Link to={"/yakit-limitleri"}>{t("yakitLimitleri")}</Link>,
          },
          {
            key: "14",
            label: <Link to={"/yakit-tanimlari"}>{t("yakitTanimlari")}</Link>,
          },
        ],
      },
      {
        key: "19",
        icon: <GiAutoRepair />,
        label: t("bakim&ServisYonetimi"),
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
            key: "kj234h5b",
            label: <Link to={"/hasar-takibi"}>{t("hasarTakibi")}</Link>,
          },
          {
            key: "kjh564bg34511",
            label: <Link to={"/ariza-bildirimleri"}>{t("arizaBildirimleri")}</Link>,
          },
          /*  {
          key: "22",
          label: <Link to={"/sefer-islemleri"}>{t("randevuTakibi")}</Link>,
        }, */
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
        label: t("stok&malzemeYonetimi"),
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
            label: <Link to={"/transferler"}>{t("transferFisleri")}</Link>,
          },
          /*  {
          key: "351",
          label: <Link to={"/transferler1"}>{t("Transferler Eski")}</Link>,
        }, */
          /* {
          key: "36",
          label: <Link to={"/hazirlaniyor"}>{t("talepler")}</Link>,
        }, */
          {
            key: "373b24kj5hb",
            label: <Link to={"/malzeme-hareketleri"}>{t("malzemeHareketleri")}</Link>,
          },
          /*  {
          key: "37",
          label: <Link to={"/hareketler"}>{t("Malzeme Hareketleri Eski")}</Link>,
        }, */
          {
            key: "837",
            label: <Link to={"/malzeme-depo-tanimlari"}>{t("malzemeDepoTanimlari")}</Link>,
          },
          {
            key: "3jb4m5j3b5",
            label: <Link to={"/material-consumption-analysis"}>{t("malzemeTuketimAnalizi")}</Link>,
          },
        ],
      },
      {
        key: "2bskfa",
        icon: <HiOutlineDocumentReport />,
        label: <Link to={"/hgs-islem-takibi"}>{t("hgs&gecisIslemleri")}</Link>,
      },
      {
        key: "l23jkhb4",
        icon: <HiOutlineClipboardList />,
        label: <Link to={"/talep-yonetimi"}>{t("talepYonetimi")}</Link>,
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
            key: "401",
            label: <Link to={"/lokasyon-tanimlari"}>{t("lokasyonlar")}</Link>,
          },
          {
            key: "40",
            label: <Link to={"/firma-tanimlari"}>{t("firmalar")}</Link>,
          },
          {
            key: "41",
            label: <Link to={"/surucu-tanimlari"}>{t("suruculer")}</Link>,
          },
          {
            key: "42",
            label: <Link to={"/personel-tanimlari"}>{t("personeller")}</Link>,
          },
          {
            key: "43",
            label: <Link to={"/servis-tanimlari"}>{t("servisTanimlari")}</Link>,
          },

          {
            key: "44",
            label: <Link to={"/guzergah-tanimlari"}>{t("guzergahlar")}</Link>,
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
            label: <Link to={"/sehir-tanimlari"}>{t("sehirler")}</Link>,
          },
          {
            key: "49",
            label: <Link to={"/is-kartlari"}>{t("isKartlari")}</Link>,
          },
          {
            key: "798asd5fasd",
            label: <Link to={"/hgs-gecis-ucretleri"}>{t("hgsGecisUcretleri")}</Link>,
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
            label: (
              <button type="button" onClick={showModal} style={{ background: "transparent", border: 0, padding: 0, color: "inherit", cursor: "pointer" }}>
                {t("ayarlar")}
              </button>
            ),
          },
          {
            key: "52",
            label: <Link to={`/user_definitions`}>{t("kullaniciTanimlari")}</Link>,
          },
          {
            key: "53",
            label: <Link to={`/kod-yonetimi`}>{t("kodYonetimi")}</Link>,
          },
          {
            key: "54",
            label: t("onaylar"),
            children: [
              {
                key: "542",
                label: <Link to={`/onaylama-islemleri`}>{t("onayIslemleri")}</Link>,
              },
              {
                key: "541",
                label: <Link to={`/onayAyarlari`}>{t("onayAyarlari")}</Link>,
              },
            ],
          },
          /*{
          key: "53874",
          label: t("aktarimlar"),
          children: [
            
            {
              key: "55",
              label: <Link to={"/arac-aktarim"}>{t("aracAktarim")}</Link>,
            },
            {
              key: "5asdasdasd5",
              label: <Link to={"/ceza-aktarim"}>{t("cezaAktarim")}</Link>,
            },
            {
              key: "5asdasdasd6",
              label: <Link to={"/kaza-aktarim"}>{t("kazaAktarim")}</Link>,
            },
            {
              key: "5asdasdasd7",
              label: <Link to={"/surucu-aktarim"}>{t("surucuAktarim")}</Link>,
            },
            {
              key: "5asdasdasd8",
              label: <Link to={"/km-aktarim"}>{t("kmAktarim")}</Link>,
            },
            
            {
              key: "5asdasdasd9",
              label: <Link to={"/hgs-aktarim"}>{t("hgsAktarim")}</Link>,
            },
          ],
        },*/
        ],
      },
    ],
    [i18n.language, showModal]
  );

  const visibleItems = React.useMemo(() => filterMenuItems(items, searchValue.trim()), [items, searchValue]);
  const countedItems = React.useMemo(() => addCountBadges(visibleItems), [visibleItems]);

  const findActiveKeys = React.useCallback(() => {
    const findInItems = (path) => {
      for (const item of items) {
        // Check if this item matches the path
        if (item.label?.props?.to === path) {
          return { menuKey: item.key, parentKeys: [] };
        }
        // Check children if they exist
        if (item.children) {
          for (const child of item.children) {
            if (child.label?.props?.to === path) {
              return { menuKey: child.key, parentKeys: [item.key] };
            }
            // Check nested children (3rd level)
            if (child.children) {
              for (const grandChild of child.children) {
                if (grandChild.label?.props?.to === path) {
                  return { menuKey: grandChild.key, parentKeys: [item.key, child.key] };
                }
              }
            }
          }
        }
      }
      // If we're at root path, return dashboard
      if (path === "/") {
        return { menuKey: "1", parentKeys: [] };
      }
      return { menuKey: null, parentKeys: [] };
    };

    return findInItems(location.pathname);
  }, [items, location.pathname]);

  const { menuKey, parentKeys } = findActiveKeys();
  const [selectedKey, setSelectedKey] = useState(menuKey || "1");
  const [openKeys, setOpenKeys] = useState(parentKeys || []);

  useEffect(() => {
    const { menuKey, parentKeys } = findActiveKeys();
    if (menuKey) {
      setSelectedKey(menuKey);
      // Eğer ana sayfadaysa (/) tüm grupları kapat
      if (location.pathname === "/") {
        setOpenKeys([]);
      } else if (parentKeys && parentKeys.length > 0) {
        setOpenKeys(parentKeys);
      }
    } else {
      // Eğer menuKey bulunamazsa (geçersiz route vs.) tüm grupları kapat
      setOpenKeys([]);
    }
  }, [findActiveKeys, location.pathname]);

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

  // Menü yapısından parent-child ilişkilerini dinamik olarak çıkartan fonksiyon
  const getMenuRelations = () => {
    const relations = {};
    const mainMenuKeys = [];

    items.forEach((item) => {
      mainMenuKeys.push(item.key);
      if (item.children) {
        item.children.forEach((child) => {
          relations[child.key] = item.key; // child -> parent
          if (child.children) {
            child.children.forEach((grandChild) => {
              relations[grandChild.key] = child.key; // grandchild -> child
            });
          }
        });
      }
    });

    return { relations, mainMenuKeys };
  };

  const onOpenChange = (keys) => {
    // Eğer hiç açık menü yoksa
    if (keys.length === 0) {
      setOpenKeys([]);
      return;
    }

    const { relations, mainMenuKeys } = getMenuRelations();

    // İç içe menüler için kontrol - parent-child ilişkisi var mı?
    const hasNestedRelation = keys.some((key) => {
      const parentKey = relations[key];
      return parentKey && keys.includes(parentKey);
    });

    if (hasNestedRelation) {
      setOpenKeys(keys);
      return;
    }

    // Diğer durumlar için standart davranış
    const latestOpenKey = keys[keys.length - 1];

    // Ana menüler arasında geçiş yapılıyorsa sadece yeni olanı aç
    const isMainMenuSwitch = mainMenuKeys.includes(latestOpenKey) && openKeys.some((openKey) => mainMenuKeys.includes(openKey) && openKey !== latestOpenKey);

    if (isMainMenuSwitch) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys(keys);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Logo kısmı - sabit */}
        <div className="flex justify-center w-full py-20 text-center" style={{ flexShrink: 0 }}>
          <Link to="/" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "center", gap: "5px" }}>
            <img src="/images/logo_white.png" alt="ats logo" className="sidebar-logo" />
            <div style={{ marginBottom: "4px" }}>
              <Text style={{ color: "#ffffff", marginBottom: "20px", fontSize: collapsed ? "10px" : "14px" }}>v. {versionData.version}</Text>
            </div>
          </Link>
        </div>

        {/* Menü kısmı - scroll olabilir */}
        <div style={{ flex: 1, overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }} className="sidebar-menu-container">
          <div style={{ padding: "8px 12px" }}>
            <Input size="small" allowClear placeholder={t("menuSearch")} value={searchValue || null} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <Menu mode="inline" theme="dark" openKeys={openKeys} selectedKeys={[selectedKey]} onOpenChange={onOpenChange} /* items={countedItems} */ items={visibleItems} />
        </div>
      </div>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            role="button"
            tabIndex={0}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {
              setDisabled(false);
            }}
            onBlur={() => {
              setDisabled(true);
            }}
            onKeyDown={() => {
              setDisabled(false);
            }}
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

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
