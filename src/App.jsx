import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getItemWithExpiration } from "./utils/expireToken";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/dashboard/Dashboard";

// Lazy loading for all other pages (not Dashboard)
// arac yonetimi
const Vehicles = lazy(() => import("./_root/pages/vehicles-control/vehicles/Vehicles"));
const Yakit = lazy(() => import("./_root/pages/vehicles-control/yakit/Yakit"));
const Sefer = lazy(() => import("./_root/pages/vehicles-control/sefer/Sefer"));
const Sigorta = lazy(() => import("./_root/pages/vehicles-control/sigorta/Sigorta"));
const Kaza = lazy(() => import("./_root/pages/vehicles-control/kaza/Kaza"));
const Harcama = lazy(() => import("./_root/pages/vehicles-control/harcama/Harcama"));
const Ceza = lazy(() => import("./_root/pages/vehicles-control/ceza/Ceza"));
const HasarTakibi = lazy(() => import("./_root/pages/vehicles-control/HasarTakibi/HasarTakibi.jsx"));
const KmUpdate = lazy(() => import("./_root/pages/vehicles-control/hizli-km/KmUpdate"));
const KiralikAraclar = lazy(() => import("./_root/pages/vehicles-control/kiralikAraclar/KiralikAraclarTablo.jsx"));

// hgs islemleri
const HgsİslemTakibi = lazy(() => import("./_root/pages/HgsIslemleri/HgsIslemTakibi/HgsIslemTakibi.jsx"));

// yakit yonetimi
const YakitTanimlar = lazy(() => import("./_root/pages/yakit-yonetim/yakit-tanim/YakitTanimlar"));
const YakitCikisFisleri = lazy(() => import("./_root/pages/yakit-yonetim/cikis-fis/YakitCikisFisleri"));
const YakitTransferler = lazy(() => import("./_root/pages/yakit-yonetim/transferler/YakitTransferler"));
const YakitGirisFisleri = lazy(() => import("./_root/pages/yakit-yonetim/giris-fis/YakitGirisFisleri"));

// malzeme depo
const Malzemeler = lazy(() => import("./_root/pages/malzeme-depo/malzeme/Malzemeler"));
const GirisFisleri1 = lazy(() => import("./_root/pages/malzeme-depo/giris-fis/GirisFisleri"));
const GirisFisleri = lazy(() => import("./_root/pages/malzeme-depo/GirisFisleri/GirisFisleri.jsx"));
const CikisFisleri1 = lazy(() => import("./_root/pages/malzeme-depo/cikis-fis/CikisFisleri"));
const CikisFisleri = lazy(() => import("./_root/pages/malzeme-depo/CikisFisleri/CikisFisleri.jsx"));
const Transferler = lazy(() => import("./_root/pages/malzeme-depo/TransferFisleri/TransferFisleri.jsx"));
const Transferler1 = lazy(() => import("./_root/pages/malzeme-depo/transferler/Transferler.jsx"));
const MalzemeHareketler = lazy(() => import("./_root/pages/malzeme-depo/MalzemeHaraketleri/MalzemeHaraketleri.jsx"));
const Hareketler = lazy(() => import("./_root/pages/malzeme-depo/hareketler/Hareketler"));
const MalzemeDepoTanimlari = lazy(() => import("./_root/pages/malzeme-depo/DepoTanimlari/DepoTanimlari.jsx"));

const Suruculer = lazy(() => import("./_root/pages/sistem-tanimlari/surucu/SurucuTanim"));
const Settings = lazy(() => import("./_root/pages/settings/Settings"));
const MarkaList = lazy(() => import("./_root/pages/sistem-tanimlari/marka-model/MarkaList"));
const Sehirler = lazy(() => import("./_root/pages/sistem-tanimlari/sehirler/Sehirler"));
const Guzergah = lazy(() => import("./_root/pages/sistem-tanimlari/guzergah/Guzergah"));
const IsKartlari = lazy(() => import("./_root/pages/sistem-tanimlari/is-kartlari/IsKartlari"));
const HgsGecisUcretleri = lazy(() => import("./_root/pages/sistem-tanimlari/hgs-gecis-fiyatlari/HgsGecisFiyatlari.jsx"));

// Lastik Yonetimi
const LastikTanim = lazy(() => import("./_root/pages/sistem-tanimlari/lastik-tanim/LastikTanim"));
const Axle = lazy(() => import("./_root/pages/LastikYonetimi/Axle/Axle.jsx"));
const LastikIslemleri = lazy(() => import("./_root/pages/LastikYonetimi/LastikIslemleri/LastikIslemleri"));
const LastikEnvanteri = lazy(() => import("./_root/pages/LastikYonetimi/LastikEnvanteri/LastikEnvanteri"));

const CezaTanim = lazy(() => import("./_root/pages/sistem-tanimlari/ceza-tanim/CezaTanim"));
const ServisTanim = lazy(() => import("./_root/pages/sistem-tanimlari/servis-tanim/ServisTanim"));
const FirmaTanim = lazy(() => import("./_root/pages/sistem-tanimlari/firma-tanim/FirmaTanim"));
const PersonelTanim = lazy(() => import("./_root/pages/sistem-tanimlari/personel-tanim/PersonelTanim"));
const LokasyonTanimlari = lazy(() => import("./_root/pages/sistem-tanimlari/LokasyonTanimlari/LokasyonTanimlari.jsx"));
const YakitHaraketleri = lazy(() => import("./_root/pages/yakit-yonetim/YakitHareketleri/YakitIslemleri.jsx"));
const Ekspertizler = lazy(() => import("./_root/pages/vehicles-control/Ekspertizler/Ekspertizler.jsx"));

// Bakım ve Onarım
const PeriyordikBakimlar = lazy(() => import("./_root/pages/BakimVeOnarim/PeriyodikBakimlar/PeriyodikBakimlar.jsx"));

const Raporlar = lazy(() => import("./_root/pages/raporlar/RaporYonetimi.jsx"));
const KodYonetimi = lazy(() => import("./_root/pages/kod-yonetimi/KodYonetimi"));
const Hazirlaniyor = lazy(() => import("./_root/pages/Hazirlaniyor"));

const ServisIslemleri = lazy(() => import("./_root/pages/vehicles-control/ServisIslemleri/ServisIslemleri"));

// Analizler
const YakitTuketimAnalizi = lazy(() => import("./_root/pages/Analizler/YakitTuketimAnalizi/YakitTuketimAnalizi.jsx"));
const PerformansAnalizi = lazy(() => import("./_root/pages/Analizler/PerformansAnalizi/PerformansAnalizi.jsx"));
const MaliyetAnalizi = lazy(() => import("./_root/pages/Analizler/MaliyetAnalizi/MaliyetAnalizi.jsx"));
const MalzemeTuketimAnalizi = lazy(() => import("./_root/pages/Analizler/MalzemeTuketimAnalizi/MalzemeTuketimAnalizi.jsx"));

// sistem Ayarlari
const KullaniciTanimlari = lazy(() => import("./_root/pages/SistemAyarlari/KullaniciTanimlari/KullaniciTanimlari.jsx"));

// Profil Duzenleme
const ProfiliDuzenleTabs = lazy(() => import("./_root/pages/KullaniciProfil/components/ProfiliDuzenle/ProfiliDuzenleTabs.jsx"));

// Yetkısız İşlem
const YetkisizIslem = lazy(() => import("./_root/pages/YekisizIslem"));

const DenemeTable = lazy(() => import("./_root/pages/Deneme/DenemeTable.jsx"));

const CompanyKeyPage = lazy(() => import("./_auth/CompanyKeyPage.jsx"));

// Aktarım
const AracAktarim = lazy(() => import("./_root/pages/Aktarim/AracAktarim.jsx"));
const CezaAktarim = lazy(() => import("./_root/pages/Aktarim/CezaAktarim.jsx"));
const KazaAktarim = lazy(() => import("./_root/pages/Aktarim/KazaAktarim.jsx"));
const SurucuAktarim = lazy(() => import("./_root/pages/Aktarim/SurucuAktarim.jsx"));
const KmAktarim = lazy(() => import("./_root/pages/Aktarim/KmAktarim.jsx"));
const HgsAktarim = lazy(() => import("./_root/pages/Aktarim/HgsAktarim.jsx"));

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

const App = () => {
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getItemWithExpiration("token");
    const companyKey = localStorage.getItem("companyKey");

    if (!token && !companyKey) {
      navigate("/CompanyKeyPage");
    } else if (!token && companyKey) {
      setHasToken(true);
      navigate("/login");
    } else {
      setHasToken(false);
      // Redirect logged-in users away from login page
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        {/* Lazy loaded routes - wrapped with Suspense */}
        <Route
          path="/araclar"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Vehicles />
            </Suspense>
          }
        />
        <Route
          path="/kiralik-araclar"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <KiralikAraclar />
            </Suspense>
          }
        />
        <Route
          path="/hizli-km-guncelleme"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <KmUpdate />
            </Suspense>
          }
        />
        <Route
          path="/yakit-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Yakit />
            </Suspense>
          }
        />
        <Route
          path="/kod-yonetimi"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <KodYonetimi />
            </Suspense>
          }
        />
        <Route
          path="/ceza-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Ceza />
            </Suspense>
          }
        />
        <Route
          path="/hasar-takibi"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HasarTakibi />
            </Suspense>
          }
        />
        <Route
          path="/sigorta-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Sigorta />
            </Suspense>
          }
        />
        <Route
          path="/harcama-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Harcama />
            </Suspense>
          }
        />
        <Route
          path="/kaza-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Kaza />
            </Suspense>
          }
        />
        <Route
          path="/sefer-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Sefer />
            </Suspense>
          }
        />
        <Route
          path="/servis-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ServisIslemleri />
            </Suspense>
          }
        />
        <Route
          path="/ekspertizler"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Ekspertizler />
            </Suspense>
          }
        />
        {/* yakit yonetimi */}
        <Route
          path="/yakit-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YakitTanimlar />
            </Suspense>
          }
        />
        <Route
          path="/yakit-giris-fisleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YakitGirisFisleri />
            </Suspense>
          }
        />
        <Route
          path="/yakit-cikis-fisleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YakitCikisFisleri />
            </Suspense>
          }
        />
        <Route
          path="/yakit-transferler"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YakitTransferler />
            </Suspense>
          }
        />
        <Route
          path="/yakit-hareketleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YakitHaraketleri />
            </Suspense>
          }
        />
        {/* malzeme depo */}
        <Route
          path="/malzeme-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Malzemeler />
            </Suspense>
          }
        />
        <Route
          path="/giris-fisleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <GirisFisleri />
            </Suspense>
          }
        />
        <Route
          path="/giris-fisleri1"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <GirisFisleri1 />
            </Suspense>
          }
        />
        <Route
          path="/cikis-fisleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CikisFisleri />
            </Suspense>
          }
        />
        <Route
          path="/cikis-fisleri1"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CikisFisleri1 />
            </Suspense>
          }
        />
        <Route
          path="/transferler"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Transferler />
            </Suspense>
          }
        />
        <Route
          path="/transferler1"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Transferler1 />
            </Suspense>
          }
        />
        <Route
          path="/lokasyon-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LokasyonTanimlari />
            </Suspense>
          }
        />
        <Route
          path="/malzeme-depo-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MalzemeDepoTanimlari />
            </Suspense>
          }
        />
        <Route
          path="/malzeme-hareketleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MalzemeHareketler />
            </Suspense>
          }
        />

        <Route
          path="/ayarlar"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          }
        />
        <Route
          path="/hareketler"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Hareketler />
            </Suspense>
          }
        />
        <Route
          path="/arac-marka-ve-model"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MarkaList />
            </Suspense>
          }
        />
        <Route
          path="/sehir-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Sehirler />
            </Suspense>
          }
        />
        <Route
          path="/guzergah-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Guzergah />
            </Suspense>
          }
        />
        <Route
          path="/is-kartlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <IsKartlari />
            </Suspense>
          }
        />

        {/* Lastik Yonetimi */}
        <Route
          path="/lastik-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LastikTanim />
            </Suspense>
          }
        />
        <Route
          path="/axle"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Axle />
            </Suspense>
          }
        />
        <Route
          path="/lastik-islemleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LastikIslemleri />
            </Suspense>
          }
        />
        <Route
          path="/lastik-envanteri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LastikEnvanteri />
            </Suspense>
          }
        />

        <Route
          path="/ceza-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CezaTanim />
            </Suspense>
          }
        />
        <Route
          path="/servis-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ServisTanim />
            </Suspense>
          }
        />
        <Route
          path="/firma-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <FirmaTanim />
            </Suspense>
          }
        />
        <Route
          path="/personel-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PersonelTanim />
            </Suspense>
          }
        />
        <Route
          path="/hgs-gecis-ucretleri"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HgsGecisUcretleri />
            </Suspense>
          }
        />
        {/* hgs islemleri */}
        <Route
          path="/hgs-islem-takibi"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HgsİslemTakibi />
            </Suspense>
          }
        />
        {/*Analızlar*/}
        <Route
          path="/fuel-analysis"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YakitTuketimAnalizi />
            </Suspense>
          }
        />
        <Route
          path="/performance-analysis"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PerformansAnalizi />
            </Suspense>
          }
        />
        <Route
          path="/cost-analysis"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MaliyetAnalizi />
            </Suspense>
          }
        />
        <Route
          path="/material-consumption-analysis"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MalzemeTuketimAnalizi />
            </Suspense>
          }
        />

        {/* Bakım ve Onarım */}
        <Route
          path="/Periodic-Maintenance"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PeriyordikBakimlar />
            </Suspense>
          }
        />

        <Route
          path="/surucu-tanimlari"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Suruculer />
            </Suspense>
          }
        />
        <Route
          path="/raporlar"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Raporlar />
            </Suspense>
          }
        />
        <Route
          path="/hazirlaniyor"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Hazirlaniyor />
            </Suspense>
          }
        />

        {/* Sistem Ayarlari */}
        <Route
          path="/user_definitions"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <KullaniciTanimlari />
            </Suspense>
          }
        />

        {/* Profil Düzenleme */}
        <Route
          path="/edit_profile"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProfiliDuzenleTabs />
            </Suspense>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <YetkisizIslem />
            </Suspense>
          }
        />

        {/* Aktarım */}
        <Route
          path="/arac-aktarim"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AracAktarim />
            </Suspense>
          }
        />
        <Route
          path="/ceza-aktarim"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CezaAktarim />
            </Suspense>
          }
        />
        <Route
          path="/kaza-aktarim"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <KazaAktarim />
            </Suspense>
          }
        />
        <Route
          path="/surucu-aktarim"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SurucuAktarim />
            </Suspense>
          }
        />
        <Route
          path="/km-aktarim"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <KmAktarim />
            </Suspense>
          }
        />
        <Route
          path="/hgs-aktarim"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HgsAktarim />
            </Suspense>
          }
        />

        <Route
          path="/deneme"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <DenemeTable />
            </Suspense>
          }
        />
      </Route>
      {hasToken && <Route path="/login" element={<AuthLayout />} />}
      <Route
        path="/CompanyKeyPage"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <CompanyKeyPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
