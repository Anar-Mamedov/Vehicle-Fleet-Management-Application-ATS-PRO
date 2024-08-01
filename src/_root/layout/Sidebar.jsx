import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    PieChartOutlined,
    CarOutlined,
} from '@ant-design/icons';
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { PiTireBold } from "react-icons/pi";
import { LuWarehouse } from "react-icons/lu";
import { FaGears } from 'react-icons/fa6';
import { BsFuelPump } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { t } from 'i18next';

const items = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: (
            <Link to={'/'}>{t("dashboard")}</Link>
        ),
    },
    {
        key: '2',
        icon: <CarOutlined />,
        label: t("aracYonetimi"),
        children: [
            {
                key: '3',
                label: (
                    <Link to={'/araclar'}>{t("araclar")}</Link>
                ),
            },
            {
                key: '4',
                label: (
                    <Link to={'/yakit-islemleri'}>{t("yakitIslemleri")}</Link>
                )
            },
            {
                key: '5',
                label: <Link to={'/'}>{t("servisIslemleri")}</Link>,
            },
            {
                key: '6',
                label: <Link to={'/sefer-islemleri'}>{t("seferler")}</Link>,
            },
            {
                key: '7',
                label: <Link to={'/sigorta-islemleri'}>{t("sigortalar")}</Link>,
            },
            {
                key: '8',
                label: <Link to={'/harcama-islemleri'}>{t("harcamalar")}</Link>,
            },
            {
                key: '9',
                label: <Link to={'/kaza-islemleri'}>{t("kazalar")}</Link>,
            },
            {
                key: '10',
                label: <Link to={'/ceza-islemleri'}>{t("cezalar")}</Link>,
            },
            {
                key: '11',
                label: <Link to={'/'}>{t("lastikler")}</Link>,
            },
            {
                key: '12',
                label: (
                    <Link to={'/hizli-km-guncelleme'}>{t("hizliKmGuncelleme")}</Link>
                ),
            },
        ],
    },
    {
        key: '13',
        icon: <BsFuelPump />,
        label: t("yakitYonetimi"),
        children: [
            {
                key: '14',
                label: (
                    <Link to={'/yakit-tanimlari'}>{t("tanimlar")}</Link>
                ),
            },
            {
                key: '15',
                label: (
                    <Link to={'/yakit-giris-fisleri'}>{t("girişFişleri")}</Link>
                )
            },
            {
                key: '16',
                label: <Link to={'/yakit-cikis-fisleri'}>{t("çıkışFişleri")}</Link>,
            },
            {
                key: '17',
                label: <Link to={'/yakit-transferler'}>{t("transferler")}</Link>,
            },
            {
                key: '18',
                label: <Link to={'/'}>{t("hareketler")}</Link>,
            },
        ],
    },
    {
        key: '19',
        icon: <GiAutoRepair />,
        label: 'Bakım ve Onarım Yönetimi',
        children: [
            {
                key: '20',
                label: (
                    <Link to={'/'}>{t("periyodikBakimlar")}</Link>
                ),
            },
            {
                key: '21',
                label: (
                    <Link to={'/'}>{t("girişFişleri")}</Link>
                )
            },
            {
                key: '22',
                label: <Link to={'/'}>{t("randevuTakibi")}</Link>,
            },
            {
                key: '23',
                label: <Link to={'/'}>{t("servısFaturalari")}</Link>,
            },
            {
                key: '24',
                label: <Link to={'/'}>{t("atolyeTanimlari")}</Link>,
            },
        ],
    },
    {
        key: '31',
        icon: <LuWarehouse />,
        label: t("malzemeDepo"),
        children: [
            {
                key: '32',
                label: (
                    <Link to={'/malzeme-tanimlari'}>{t("malzemeTanimlari")}</Link>
                ),
            },
            {
                key: '33',
                label: (
                    <Link to={'/giris-fisleri'}>{t("girisFisleri")}</Link>
                )
            },
            {
                key: '34',
                label: <Link to={'/cikis-fisleri'}>{t("cikisFisleri")}</Link>,
            },
            {
                key: '35',
                label: <Link to={'/transferler'}>{t("transferler")}</Link>,
            },
            {
                key: '36',
                label: <Link to={'/'}>{t("talepler")}</Link>,
            },
            {
                key: '37',
                label: <Link to={'/hareketler'}>{t("hareketler")}</Link>,
            },
        ],
    },
    {
        key: '38',
        icon: <HiOutlineDocumentReport />,
        label: (
            <Link to={'/raporlar'}>{t("raporlarAnalizler")}</Link>
        ),
    },
    {
        key: '39',
        icon: <MdOutlineSystemUpdateAlt />,
        label: t("sistemTanimlari"),
        children: [
            {
                key: '40',
                label: (
                    <Link to={'/firma-tanimlari'}>{t("firma")}</Link>
                ),
            },
            {
                key: '41',
                label: (
                    <Link to={'/surucu-tanimlari'}>{t("surucu")}</Link>
                ),
            },
            {
                key: '42',
                label: (
                    <Link to={'/personel-tanimlari'}>{t("personel")}</Link>
                ),
            },
            {
                key: '43',
                label: (
                    <Link to={'/servis-tanimlari'}>{t("servis")}</Link>
                ),
            },
            {
                key: '44',
                label: (
                    <Link to={'/guzergah-tanimlari'}>{t("guzergah")}</Link>
                ),
            },
            {
                key: '45',
                label: (
                    <Link to={'/lastik-tanimlari'}>{t("lastik")}</Link>
                ),
            },
            {
                key: '46',
                label: (
                    <Link to={'/ceza-tanimlari'}>{t("ceza")}</Link>
                ),
            },
            {
                key: '47',
                label: (
                    <Link to={'/arac-marka-ve-model'}>{t("markaModel")}</Link>
                ),
            },
            {
                key: '48',
                label: (
                    <Link to={'/sehir-tanimlari'}>{t("sehirTanimlari")}</Link>
                ),
            },
            {
                key: '49',
                label: (
                    <Link to={'/is-kartlari'}>{t("isKartlari")}</Link>
                ),
            },
        ],
    },

    {
        key: '50',
        icon: <FaGears />,
        label: 'Sistem Ayarları',
        children: [
            {
                key: '51',
                label: (
                    <Link to={'/ayarlar'}>{t("ayarlar")}</Link>
                ),
            },
            {
                key: '52',
                label: (
                    <Link to={`/kullanici-tanimlari`}>{t("kullaniciTanimlari")}</Link>
                ),
            },
            {
                key: '53',
                label: (
                    <Link to={`/kod-yonetimi`}>{t("kodYonetimi")}</Link>

                ),
            }
        ],
    },
];

const Sidebar = () => {
    const [openKeys, setOpenKeys] = useState([]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    return (
        <>
            <div className="flex justify-center w-full py-20 text-center">
                <Link to="/">
                    <img src="/images/logo_white.png" alt="ats logo" className='sidebar-logo' />
                </Link>
            </div>
            <Menu
                mode="inline"
                theme="dark"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                items={items}
            />
        </>
    )
}

export default Sidebar;
