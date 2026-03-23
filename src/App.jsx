import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Modal, ConfigProvider } from "antd";
import tr_TR from "antd/locale/tr_TR";
import en_US from "antd/locale/en_US";
import ru_RU from "antd/locale/ru_RU";
import az_AZ from "antd/locale/az_AZ";
import { useTranslation } from "react-i18next";
import { getItemWithExpiration } from "./utils/expireToken";
import { initDevToolsProtection } from "./utils/devToolsProtection";
import { useVersionCheck } from "./hooks/useVersionCheck";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/dashboard/Dashboard";

// Retry wrapper for lazy imports — handles stale chunks after deployments
const lazyWithRetry = (importFn) =>
  lazy(() =>
    importFn().catch((error) => {
      const lastReload = sessionStorage.getItem("chunk_reload_time");
      // Eğer son 10 saniye içinde zaten yenileme yapıldıysa tekrar yenileme yapma (kısır döngüyü önle)
      const isRecent = lastReload && Date.now() - parseInt(lastReload, 10) < 10000;
      
      if (!isRecent) {
        sessionStorage.setItem("chunk_reload_time", Date.now().toString());
        window.location.reload();
        return new Promise(() => {}); // prevent rendering while reloading
      }
      
      return Promise.reject(error); // Eğer yakın zamanda yenilendiyse ve hala hata veriyorsa hatayı fırlat
    })
  );

// Lazy loading for all other pages (not Dashboard)
// arac yonetimi
const Vehicles = lazyWithRetry(() => import("./_root/pages/vehicles-control/vehicles/Vehicles"));
const Yakit = lazyWithRetry(() => import("./_root/pages/vehicles-control/yakit/Yakit"));
const Sefer = lazyWithRetry(() => import("./_root/pages/vehicles-control/sefer/Sefer"));
const Sigorta = lazyWithRetry(() => import("./_root/pages/vehicles-control/sigorta/Sigorta"));
const Kaza = lazyWithRetry(() => import("./_root/pages/vehicles-control/kaza/Kaza"));
const Harcama = lazyWithRetry(() => import("./_root/pages/vehicles-control/harcama/Harcama"));
const Ceza = lazyWithRetry(() => import("./_root/pages/vehicles-control/ceza/Ceza"));
const HasarTakibi = lazyWithRetry(() => import("./_root/pages/vehicles-control/HasarTakibi/HasarTakibi.jsx"));
const YakitLimitleri = lazyWithRetry(() => import("./_root/pages/vehicles-control/YakitLimitleri/YakitLimitleri.jsx"));
const KmUpdate = lazyWithRetry(() => import("./_root/pages/vehicles-control/hizli-km/KmUpdate"));
const KiralikAraclar = lazyWithRetry(() => import("./_root/pages/vehicles-control/kiralikAraclar/KiralikAraclarTablo.jsx"));
const IkameAracYonetimi = lazyWithRetry(() => import("./_root/pages/vehicles-control/IkameAracYonetimi/IkameAracYonetimi.jsx"));

// hgs islemleri
const HgsİslemTakibi = lazyWithRetry(() => import("./_root/pages/HgsIslemleri/HgsIslemTakibi/HgsIslemTakibi.jsx"));

// Talep yonetimi
const TalepYonetimi = lazyWithRetry(() => import("./_root/pages/TalepYonetimi/TalepYonetimi.jsx"));

// yakit yonetimi
const YakitTanimlar = lazyWithRetry(() => import("./_root/pages/yakit-yonetim/yakit-tanim/YakitTanimlar"));
const YakitCikisFisleri = lazyWithRetry(() => import("./_root/pages/yakit-yonetim/cikis-fis/YakitCikisFisleri"));
const YakitTransferler = lazyWithRetry(() => import("./_root/pages/yakit-yonetim/transferler/YakitTransferler"));
const YakitGirisFisleri = lazyWithRetry(() => import("./_root/pages/yakit-yonetim/giris-fis/YakitGirisFisleri"));

// malzeme depo
const Malzemeler = lazyWithRetry(() => import("./_root/pages/malzeme-depo/malzeme/Malzemeler"));
const GirisFisleri1 = lazyWithRetry(() => import("./_root/pages/malzeme-depo/giris-fis/GirisFisleri"));
const GirisFisleri = lazyWithRetry(() => import("./_root/pages/malzeme-depo/GirisFisleri/GirisFisleri.jsx"));
const CikisFisleri1 = lazyWithRetry(() => import("./_root/pages/malzeme-depo/cikis-fis/CikisFisleri"));
const CikisFisleri = lazyWithRetry(() => import("./_root/pages/malzeme-depo/CikisFisleri/CikisFisleri.jsx"));
const Transferler = lazyWithRetry(() => import("./_root/pages/malzeme-depo/TransferFisleri/TransferFisleri.jsx"));
const Transferler1 = lazyWithRetry(() => import("./_root/pages/malzeme-depo/transferler/Transferler.jsx"));
const MalzemeHareketler = lazyWithRetry(() => import("./_root/pages/malzeme-depo/MalzemeHaraketleri/MalzemeHaraketleri.jsx"));
const Hareketler = lazyWithRetry(() => import("./_root/pages/malzeme-depo/hareketler/Hareketler"));
const MalzemeDepoTanimlari = lazyWithRetry(() => import("./_root/pages/malzeme-depo/DepoTanimlari/DepoTanimlari.jsx"));

const Suruculer = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/surucu/SurucuTanim"));
const Settings = lazyWithRetry(() => import("./_root/pages/settings/Settings"));
const MarkaList = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/marka-model/MarkaList"));
const Sehirler = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/sehirler/Sehirler"));
const Guzergah = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/guzergah/Guzergah"));
const IsKartlari = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/is-kartlari/IsKartlari"));
const HgsGecisUcretleri = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/hgs-gecis-fiyatlari/HgsGecisFiyatlari.jsx"));

// Lastik Yonetimi
const LastikTanim = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/lastik-tanim/LastikTanim"));
const Axle = lazyWithRetry(() => import("./_root/pages/LastikYonetimi/Axle/Axle.jsx"));
const LastikIslemleri = lazyWithRetry(() => import("./_root/pages/LastikYonetimi/LastikIslemleri/LastikIslemleri"));
const LastikEnvanteri = lazyWithRetry(() => import("./_root/pages/LastikYonetimi/LastikEnvanteri/LastikEnvanteri"));

const CezaTanim = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/ceza-tanim/CezaTanim"));
const ServisTanim = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/servis-tanim/ServisTanim"));
const FirmaTanim = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/firma-tanim/FirmaTanim"));
const PersonelTanim = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/personel-tanim/PersonelTanim"));
const LokasyonTanimlari = lazyWithRetry(() => import("./_root/pages/sistem-tanimlari/LokasyonTanimlari/LokasyonTanimlari.jsx"));
const YakitHaraketleri = lazyWithRetry(() => import("./_root/pages/yakit-yonetim/YakitHareketleri/YakitIslemleri.jsx"));
const Ekspertizler = lazyWithRetry(() => import("./_root/pages/vehicles-control/Ekspertizler/Ekspertizler.jsx"));

// Bakım ve Onarım
const PeriyordikBakimlar = lazyWithRetry(() => import("./_root/pages/BakimVeOnarim/PeriyodikBakimlar/PeriyodikBakimlar.jsx"));
const ArizaBildirimleri = lazyWithRetry(() => import("./_root/pages/BakimVeOnarim/ArizaBildirimleri/ArizaBildirimleri.jsx"));

const Raporlar = lazyWithRetry(() => import("./_root/pages/raporlar/RaporYonetimi.jsx"));
const KodYonetimi = lazyWithRetry(() => import("./_root/pages/kod-yonetimi/KodYonetimi"));
const Hazirlaniyor = lazyWithRetry(() => import("./_root/pages/Hazirlaniyor"));

const ServisIslemleri = lazyWithRetry(() => import("./_root/pages/vehicles-control/ServisIslemleri/ServisIslemleri"));

// Analizler
const YakitTuketimAnalizi = lazyWithRetry(() => import("./_root/pages/Analizler/YakitTuketimAnalizi/YakitTuketimAnalizi.jsx"));
const PerformansAnalizi = lazyWithRetry(() => import("./_root/pages/Analizler/PerformansAnalizi/PerformansAnalizi.jsx"));
const MaliyetAnalizi = lazyWithRetry(() => import("./_root/pages/Analizler/MaliyetAnalizi/MaliyetAnalizi.jsx"));
const MalzemeTuketimAnalizi = lazyWithRetry(() => import("./_root/pages/Analizler/MalzemeTuketimAnalizi/MalzemeTuketimAnalizi.jsx"));

// sistem Ayarlari
const KullaniciTanimlari = lazyWithRetry(() => import("./_root/pages/SistemAyarlari/KullaniciTanimlari/KullaniciTanimlari.jsx"));
const Onaylar = lazyWithRetry(() => import("./_root/pages/SistemAyarlari/Onaylar/Onaylar.jsx"));
const OnaylamaIslemleri = lazyWithRetry(() => import("./_root/pages/SistemAyarlari/OnaylamaIslemleri/OnaylamaIslemleri.jsx"));

// Profil Duzenleme
const ProfiliDuzenleTabs = lazyWithRetry(() => import("./_root/pages/KullaniciProfil/components/ProfiliDuzenle/ProfiliDuzenleTabs.jsx"));

// Yetkısız İşlem
const YetkisizIslem = lazyWithRetry(() => import("./_root/pages/YekisizIslem"));

const DenemeTable = lazyWithRetry(() => import("./_root/pages/Deneme/DenemeTable.jsx"));

const CompanyKeyPage = lazyWithRetry(() => import("./_auth/CompanyKeyPage.jsx"));

// Aktarım
const AracAktarim = lazyWithRetry(() => import("./_root/pages/Aktarim/AracAktarim.jsx"));
const CezaAktarim = lazyWithRetry(() => import("./_root/pages/Aktarim/CezaAktarim.jsx"));
const KazaAktarim = lazyWithRetry(() => import("./_root/pages/Aktarim/KazaAktarim.jsx"));
const SurucuAktarim = lazyWithRetry(() => import("./_root/pages/Aktarim/SurucuAktarim.jsx"));
const KmAktarim = lazyWithRetry(() => import("./_root/pages/Aktarim/KmAktarim.jsx"));
const HgsAktarim = lazyWithRetry(() => import("./_root/pages/Aktarim/HgsAktarim.jsx"));

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
      color: "#666",
    }}
  >
    Yükleniyor...
  </div>
);

// ProtectedRoute bileşeni: Auth durumunu kontrol eder ve yetkisiz ziyaretçileri login'e yönlendirir.
const ProtectedRoute = ({ children }) => {
  const token = getItemWithExpiration("token");
  const companyKey = localStorage.getItem("companyKey");

  if (!token && !companyKey) {
    return <Navigate to="/CompanyKeyPage" replace />;
  }
  if (!token && companyKey) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

// PublicRoute bileşeni: Zaten giriş yapmış olan kullanıcıları ana sayfaya yönlendirir.
const PublicRoute = ({ children }) => {
  const token = getItemWithExpiration("token");
  const companyKey = localStorage.getItem("companyKey");

  if (token && companyKey) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  const [showVersionUpdateModal, setShowVersionUpdateModal] = useState(false);
  const { t, i18n } = useTranslation();
  const { hasUpdate, handleUpdate, dismissUpdate } = useVersionCheck(showVersionUpdateModal);

  // DevTools protection - Initialize on component mount
  useEffect(() => {
    initDevToolsProtection();
  }, []);

  const handleVersionUpdateCancel = () => {
    setShowVersionUpdateModal(false);
    dismissUpdate();
  };

  const getAntdLocale = () => {
    switch (i18n.language) {
      case "en":
        return en_US;
      case "ru":
        return ru_RU;
      case "az":
        return az_AZ;
      case "tr":
      default:
        return tr_TR;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()}>
      <Modal
        title={t("versionUpdateTitle")}
        open={showVersionUpdateModal && hasUpdate}
        onOk={handleUpdate}
        onCancel={handleVersionUpdateCancel}
        okText={t("versionUpdateButton")}
        cancelText={t("versionUpdateLater")}
        closable={false}
        maskClosable={false}
      >
        <p>{t("versionUpdateMessage")}</p>
      </Modal>

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes - Sadece giriş yapmamış kişilerin erişmesi gereken sayfalar */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthLayout />} />
            <Route path="/CompanyKeyPage" element={<CompanyKeyPage />} />
          </Route>

          {/* Protected Routes - Sadece giriş yapmış yetkili kullanıcıların görebileceği sayfalar */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              
              <Route path="/araclar" element={<Vehicles />} />
              <Route path="/kiralik-araclar" element={<KiralikAraclar />} />
              <Route path="/ikame-arac-yonetimi" element={<IkameAracYonetimi />} />
              <Route path="/hizli-km-guncelleme" element={<KmUpdate />} />
              <Route path="/yakit-islemleri" element={<Yakit />} />
              <Route path="/kod-yonetimi" element={<KodYonetimi />} />
              <Route path="/ceza-islemleri" element={<Ceza />} />
              <Route path="/hasar-takibi" element={<HasarTakibi />} />
              <Route path="/yakit-limitleri" element={<YakitLimitleri />} />
              <Route path="/sigorta-islemleri" element={<Sigorta />} />
              <Route path="/harcama-islemleri" element={<Harcama />} />
              <Route path="/kaza-islemleri" element={<Kaza />} />
              <Route path="/sefer-islemleri" element={<Sefer />} />
              <Route path="/servis-islemleri" element={<ServisIslemleri />} />
              <Route path="/ekspertizler" element={<Ekspertizler />} />
              
              {/* yakit yonetimi */}
              <Route path="/yakit-tanimlari" element={<YakitTanimlar />} />
              <Route path="/yakit-giris-fisleri" element={<YakitGirisFisleri />} />
              <Route path="/yakit-cikis-fisleri" element={<YakitCikisFisleri />} />
              <Route path="/yakit-transferler" element={<YakitTransferler />} />
              <Route path="/yakit-hareketleri" element={<YakitHaraketleri />} />
              
              {/* malzeme depo */}
              <Route path="/malzeme-tanimlari" element={<Malzemeler />} />
              <Route path="/giris-fisleri" element={<GirisFisleri />} />
              <Route path="/giris-fisleri1" element={<GirisFisleri1 />} />
              <Route path="/cikis-fisleri" element={<CikisFisleri />} />
              <Route path="/cikis-fisleri1" element={<CikisFisleri1 />} />
              <Route path="/transferler" element={<Transferler />} />
              <Route path="/transferler1" element={<Transferler1 />} />
              <Route path="/lokasyon-tanimlari" element={<LokasyonTanimlari />} />
              <Route path="/malzeme-depo-tanimlari" element={<MalzemeDepoTanimlari />} />
              <Route path="/malzeme-hareketleri" element={<MalzemeHareketler />} />
              <Route path="/ayarlar" element={<Settings />} />
              <Route path="/hareketler" element={<Hareketler />} />
              <Route path="/arac-marka-ve-model" element={<MarkaList />} />
              <Route path="/sehir-tanimlari" element={<Sehirler />} />
              <Route path="/guzergah-tanimlari" element={<Guzergah />} />
              <Route path="/is-kartlari" element={<IsKartlari />} />
              
              {/* Lastik Yonetimi */}
              <Route path="/lastik-tanimlari" element={<LastikTanim />} />
              <Route path="/axle" element={<Axle />} />
              <Route path="/lastik-islemleri" element={<LastikIslemleri />} />
              <Route path="/lastik-envanteri" element={<LastikEnvanteri />} />
              <Route path="/ceza-tanimlari" element={<CezaTanim />} />
              <Route path="/servis-tanimlari" element={<ServisTanim />} />
              <Route path="/firma-tanimlari" element={<FirmaTanim />} />
              <Route path="/personel-tanimlari" element={<PersonelTanim />} />
              <Route path="/hgs-gecis-ucretleri" element={<HgsGecisUcretleri />} />
              
              {/* hgs islemleri */}
              <Route path="/hgs-islem-takibi" element={<HgsİslemTakibi />} />
              
              {/* Talep yonetimi */}
              <Route path="/talep-yonetimi" element={<TalepYonetimi />} />
              
              {/* Analizler */}
              <Route path="/fuel-analysis" element={<YakitTuketimAnalizi />} />
              <Route path="/performance-analysis" element={<PerformansAnalizi />} />
              <Route path="/cost-analysis" element={<MaliyetAnalizi />} />
              <Route path="/material-consumption-analysis" element={<MalzemeTuketimAnalizi />} />
              
              {/* Bakım ve Onarım */}
              <Route path="/Periodic-Maintenance" element={<PeriyordikBakimlar />} />
              <Route path="/ariza-bildirimleri" element={<ArizaBildirimleri />} />
              <Route path="/surucu-tanimlari" element={<Suruculer />} />
              <Route path="/raporlar" element={<Raporlar />} />
              <Route path="/hazirlaniyor" element={<Hazirlaniyor />} />
              
              {/* Sistem Ayarlari */}
              <Route path="/user_definitions" element={<KullaniciTanimlari />} />
              <Route path="/onayAyarlari" element={<Onaylar />} />
              <Route path="/onaylama-islemleri" element={<OnaylamaIslemleri />} />
              
              {/* Profil Düzenleme */}
              <Route path="/edit_profile" element={<ProfiliDuzenleTabs />} />
              <Route path="/unauthorized" element={<YetkisizIslem />} />
              
              {/* Aktarım */}
              <Route path="/arac-aktarim" element={<AracAktarim />} />
              <Route path="/ceza-aktarim" element={<CezaAktarim />} />
              <Route path="/kaza-aktarim" element={<KazaAktarim />} />
              <Route path="/surucu-aktarim" element={<SurucuAktarim />} />
              <Route path="/km-aktarim" element={<KmAktarim />} />
              <Route path="/hgs-aktarim" element={<HgsAktarim />} />
              
              <Route path="/deneme" element={<DenemeTable />} />
              
              {/* 404 - Found Route / Tüm Bilinmeyen Rotalar */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
