import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getItemWithExpiration } from "./utils/expireToken";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

// Lazy loading for all pages
const Dashboard = lazy(() => import("./_root/pages/dashboard/Dashboard"));

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
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          {/* arac yonetimi */}
          <Route path="/araclar" element={<Vehicles />} />
          <Route path="/kiralik-araclar" element={<KiralikAraclar />} />
          <Route path="/hizli-km-guncelleme" element={<KmUpdate />} />
          <Route path="/yakit-islemleri" element={<Yakit />} />
          <Route path="/kod-yonetimi" element={<KodYonetimi />} />
          <Route path="/ceza-islemleri" element={<Ceza />} />
          <Route path="/hasar-takibi" element={<HasarTakibi />} />
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
          {/*Analızlar*/}
          <Route path="/fuel-analysis" element={<YakitTuketimAnalizi />} />
          <Route path="/performance-analysis" element={<PerformansAnalizi />} />
          <Route path="/cost-analysis" element={<MaliyetAnalizi />} />
          <Route path="/material-consumption-analysis" element={<MalzemeTuketimAnalizi />} />

          {/* Bakım ve Onarım */}
          <Route path="/Periodic-Maintenance" element={<PeriyordikBakimlar />} />

          <Route path="/surucu-tanimlari" element={<Suruculer />} />
          <Route path="/raporlar" element={<Raporlar />} />
          <Route path="/hazirlaniyor" element={<Hazirlaniyor />} />

          {/* Sistem Ayarlari */}
          <Route path="/user_definitions" element={<KullaniciTanimlari />} />

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
        </Route>
        {hasToken && <Route path="/login" element={<AuthLayout />} />}
        <Route path="/CompanyKeyPage" element={<CompanyKeyPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
