import { useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { t } from "i18next";
import { GetOrderLogsByServiceIdService } from "../../../../../api/services/isEmri/services";

// İş emrinin durum tarihçesini okur; modal açıkken yüklenir, durum değişikliğinden sonra reload ile yeniden okunur.
// Kayıtlar backend'den yeniden eskiye sıralı gelir.
const useIsEmriTarihcesi = (isEmriId, enabled) => {
  const [kayitlar, setKayitlar] = useState([]);
  const [loading, setLoading] = useState(false);
  // Geç dönen bir isteğin daha yeni listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  const reload = useCallback(async () => {
    if (!isEmriId) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const response = await GetOrderLogsByServiceIdService(isEmriId);
      if (requestId !== requestIdRef.current) return;

      // Hata halinde dizi yerine { status: false, message } gövdesi döner
      if (!Array.isArray(response?.data)) {
        setKayitlar([]);
        message.error(response?.data?.message || t("islemBasarisiz"));
        return;
      }
      setKayitlar(response.data.map((item) => ({ ...item, key: item.siraNo })));
    } catch {
      if (requestId === requestIdRef.current) message.error(t("islemBasarisiz"));
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [isEmriId]);

  useEffect(() => {
    if (enabled) {
      reload();
    } else {
      requestIdRef.current += 1;
      setKayitlar([]);
    }
  }, [enabled, reload]);

  return { kayitlar, loading, reload };
};

export default useIsEmriTarihcesi;
