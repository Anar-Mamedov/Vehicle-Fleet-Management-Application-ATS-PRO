import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getItemWithExpiration } from "./utils/expireToken";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Dashboard from "./_root/pages/dashboard/Dashboard";

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

// Route definitions with lazy loading
const routes = [
  // Araç yönetimi - yüksek trafikli rotalar
  {
    path: "/araclar",
    lazy: () => import("./_root/pages/vehicles-control/vehicles/Vehicles"),
    preload: true, // Yüksek trafikli rota için preload
  },
  {
    path: "/kiralik-araclar",
    lazy: () => import("./_root/pages/vehicles-control/kiralikAraclar/KiralikAraclarTablo.jsx"),
  },
  {
    path: "/hizli-km-guncelleme",
    lazy: () => import("./_root/pages/vehicles-control/hizli-km/KmUpdate"),
  },
  {
    path: "/yakit-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/yakit/Yakit"),
    preload: true, // Yüksek trafikli rota için preload
  },
  {
    path: "/kod-yonetimi",
    lazy: () => import("./_root/pages/kod-yonetimi/KodYonetimi"),
  },
  {
    path: "/ceza-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/ceza/Ceza"),
  },
  {
    path: "/hasar-takibi",
    lazy: () => import("./_root/pages/vehicles-control/HasarTakibi/HasarTakibi.jsx"),
  },
  {
    path: "/sigorta-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/sigorta/Sigorta"),
  },
  {
    path: "/harcama-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/harcama/Harcama"),
  },
  {
    path: "/kaza-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/kaza/Kaza"),
  },
  {
    path: "/sefer-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/sefer/Sefer"),
  },
  {
    path: "/servis-islemleri",
    lazy: () => import("./_root/pages/vehicles-control/ServisIslemleri/ServisIslemleri"),
  },
  {
    path: "/ekspertizler",
    lazy: () => import("./_root/pages/vehicles-control/Ekspertizler/Ekspertizler.jsx"),
  },

  // Yakıt yönetimi
  {
    path: "/yakit-tanimlari",
    lazy: () => import("./_root/pages/yakit-yonetim/yakit-tanim/YakitTanimlar"),
  },
  {
    path: "/yakit-giris-fisleri",
    lazy: () => import("./_root/pages/yakit-yonetim/giris-fis/YakitGirisFisleri"),
  },
  {
    path: "/yakit-cikis-fisleri",
    lazy: () => import("./_root/pages/yakit-yonetim/cikis-fis/YakitCikisFisleri"),
  },
  {
    path: "/yakit-transferler",
    lazy: () => import("./_root/pages/yakit-yonetim/transferler/YakitTransferler"),
  },
  {
    path: "/yakit-hareketleri",
    lazy: () => import("./_root/pages/yakit-yonetim/YakitHareketleri/YakitIslemleri.jsx"),
  },

  // Malzeme depo
  {
    path: "/malzeme-tanimlari",
    lazy: () => import("./_root/pages/malzeme-depo/malzeme/Malzemeler"),
  },
  {
    path: "/giris-fisleri",
    lazy: () => import("./_root/pages/malzeme-depo/GirisFisleri/GirisFisleri.jsx"),
  },
  {
    path: "/giris-fisleri1",
    lazy: () => import("./_root/pages/malzeme-depo/giris-fis/GirisFisleri"),
  },
  {
    path: "/cikis-fisleri",
    lazy: () => import("./_root/pages/malzeme-depo/CikisFisleri/CikisFisleri.jsx"),
  },
  {
    path: "/cikis-fisleri1",
    lazy: () => import("./_root/pages/malzeme-depo/cikis-fis/CikisFisleri"),
  },
  {
    path: "/transferler",
    lazy: () => import("./_root/pages/malzeme-depo/TransferFisleri/TransferFisleri.jsx"),
  },
  {
    path: "/transferler1",
    lazy: () => import("./_root/pages/malzeme-depo/transferler/Transferler.jsx"),
  },
  {
    path: "/lokasyon-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/LokasyonTanimlari/LokasyonTanimlari.jsx"),
  },
  {
    path: "/malzeme-depo-tanimlari",
    lazy: () => import("./_root/pages/malzeme-depo/DepoTanimlari/DepoTanimlari.jsx"),
  },
  {
    path: "/malzeme-hareketleri",
    lazy: () => import("./_root/pages/malzeme-depo/MalzemeHaraketleri/MalzemeHaraketleri.jsx"),
  },
  {
    path: "/ayarlar",
    lazy: () => import("./_root/pages/settings/Settings"),
  },
  {
    path: "/hareketler",
    lazy: () => import("./_root/pages/malzeme-depo/hareketler/Hareketler"),
  },
  {
    path: "/arac-marka-ve-model",
    lazy: () => import("./_root/pages/sistem-tanimlari/marka-model/MarkaList"),
  },
  {
    path: "/sehir-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/sehirler/Sehirler"),
  },
  {
    path: "/guzergah-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/guzergah/Guzergah"),
  },
  {
    path: "/is-kartlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/is-kartlari/IsKartlari"),
  },

  // Lastik Yönetimi
  {
    path: "/lastik-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/lastik-tanim/LastikTanim"),
  },
  {
    path: "/axle",
    lazy: () => import("./_root/pages/LastikYonetimi/Axle/Axle.jsx"),
  },
  {
    path: "/lastik-islemleri",
    lazy: () => import("./_root/pages/LastikYonetimi/LastikIslemleri/LastikIslemleri"),
  },
  {
    path: "/lastik-envanteri",
    lazy: () => import("./_root/pages/LastikYonetimi/LastikEnvanteri/LastikEnvanteri"),
  },

  {
    path: "/ceza-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/ceza-tanim/CezaTanim"),
  },
  {
    path: "/servis-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/servis-tanim/ServisTanim"),
  },
  {
    path: "/firma-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/firma-tanim/FirmaTanim"),
  },
  {
    path: "/personel-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/personel-tanim/PersonelTanim"),
  },
  {
    path: "/hgs-gecis-ucretleri",
    lazy: () => import("./_root/pages/sistem-tanimlari/hgs-gecis-fiyatlari/HgsGecisFiyatlari.jsx"),
  },

  // HGS işlemleri
  {
    path: "/hgs-islem-takibi",
    lazy: () => import("./_root/pages/HgsIslemleri/HgsIslemTakibi/HgsIslemTakibi.jsx"),
  },

  // Analizler
  {
    path: "/fuel-analysis",
    lazy: () => import("./_root/pages/Analizler/YakitTuketimAnalizi/YakitTuketimAnalizi.jsx"),
  },
  {
    path: "/performance-analysis",
    lazy: () => import("./_root/pages/Analizler/PerformansAnalizi/PerformansAnalizi.jsx"),
  },
  {
    path: "/cost-analysis",
    lazy: () => import("./_root/pages/Analizler/MaliyetAnalizi/MaliyetAnalizi.jsx"),
  },
  {
    path: "/material-consumption-analysis",
    lazy: () => import("./_root/pages/Analizler/MalzemeTuketimAnalizi/MalzemeTuketimAnalizi.jsx"),
  },

  // Bakım ve Onarım
  {
    path: "/Periodic-Maintenance",
    lazy: () => import("./_root/pages/BakimVeOnarim/PeriyodikBakimlar/PeriyodikBakimlar.jsx"),
  },

  {
    path: "/surucu-tanimlari",
    lazy: () => import("./_root/pages/sistem-tanimlari/surucu/SurucuTanim"),
  },
  {
    path: "/raporlar",
    lazy: () => import("./_root/pages/raporlar/RaporYonetimi.jsx"),
  },
  {
    path: "/hazirlaniyor",
    lazy: () => import("./_root/pages/Hazirlaniyor"),
  },

  // Sistem Ayarları
  {
    path: "/user_definitions",
    lazy: () => import("./_root/pages/SistemAyarlari/KullaniciTanimlari/KullaniciTanimlari.jsx"),
  },

  // Profil Düzenleme
  {
    path: "/edit_profile",
    lazy: () => import("./_root/pages/KullaniciProfil/components/ProfiliDuzenle/ProfiliDuzenleTabs.jsx"),
  },
  {
    path: "/unauthorized",
    lazy: () => import("./_root/pages/YekisizIslem"),
  },

  // Aktarım
  {
    path: "/arac-aktarim",
    lazy: () => import("./_root/pages/Aktarim/AracAktarim.jsx"),
  },
  {
    path: "/ceza-aktarim",
    lazy: () => import("./_root/pages/Aktarim/CezaAktarim.jsx"),
  },
  {
    path: "/kaza-aktarim",
    lazy: () => import("./_root/pages/Aktarim/KazaAktarim.jsx"),
  },
  {
    path: "/surucu-aktarim",
    lazy: () => import("./_root/pages/Aktarim/SurucuAktarim.jsx"),
  },
  {
    path: "/km-aktarim",
    lazy: () => import("./_root/pages/Aktarim/KmAktarim.jsx"),
  },
  {
    path: "/hgs-aktarim",
    lazy: () => import("./_root/pages/Aktarim/HgsAktarim.jsx"),
  },

  {
    path: "/deneme",
    lazy: () => import("./_root/pages/Deneme/DenemeTable.jsx"),
  },
];

// Preload high-traffic routes
const preloadHighTrafficRoutes = () => {
  const highTrafficRoutes = routes.filter((route) => route.preload);
  highTrafficRoutes.forEach((route) => {
    route.lazy().then((module) => {
      // Module is now cached
      console.log(`Preloaded: ${route.path}`);
    });
  });
};

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

      // Preload high-traffic routes after successful login
      if (token) {
        preloadHighTrafficRoutes();
      }
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />

        {/* Optimized routes using React Router 7 lazy API */}
        {routes.map((route) => (
          <Route key={route.path} path={route.path} lazy={route.lazy} />
        ))}
      </Route>

      {hasToken && <Route path="/login" element={<AuthLayout />} />}
      <Route path="/CompanyKeyPage" lazy={() => import("./_auth/CompanyKeyPage.jsx")} />
    </Routes>
  );
};

export default App;
