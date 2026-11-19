import { useEffect, useState } from "react";
import { GetApprovalSettingsListService } from "../../../../../api/services/onay/services";

// Onay Ayarları'ndaki bir onay türünün (ONAY_TANIMI) aktif olup olmadığını okur.
// Ayar okunamazsa veya listede yoksa null döner; ekran bu durumda her iki sonucu da anlatan metni gösterir.
const useOnayAktif = (tanim, enabled) => {
  const [onayAktif, setOnayAktif] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;

    let ignore = false;
    setOnayAktif(null);

    GetApprovalSettingsListService()
      .then((res) => {
        if (ignore) return;
        const ayar = Array.isArray(res?.data) ? res.data.find((item) => item.tanim === tanim) : null;
        setOnayAktif(ayar ? Boolean(ayar.onayAktif) : null);
      })
      .catch(() => {
        if (!ignore) setOnayAktif(null);
      });

    return () => {
      ignore = true;
    };
  }, [tanim, enabled]);

  return onayAktif;
};

export default useOnayAktif;
