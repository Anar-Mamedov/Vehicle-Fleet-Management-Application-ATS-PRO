import { useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { t } from "i18next";
import { GetMaterialRequestListByServiceIdService } from "../../../../../api/services/isEmri/services";

// İş emrine bağlı malzeme taleplerini okur; modal açıkken yüklenir, reload ile yeniden okunur.
// Sekme etiketindeki sayı da bu listeden geldiği için veri modal seviyesinde tutulur.
const useMalzemeTalepleri = (isEmriId, enabled) => {
  const [talepler, setTalepler] = useState([]);
  const [loading, setLoading] = useState(false);
  // Geç dönen bir isteğin daha yeni listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  const reload = useCallback(async () => {
    if (!isEmriId) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const response = await GetMaterialRequestListByServiceIdService(isEmriId);
      if (requestId !== requestIdRef.current) return;

      const list = Array.isArray(response?.data) ? response.data : response?.data?.list || [];
      setTalepler(list.map((item) => ({ ...item, key: item.siraNo })));
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
      setTalepler([]);
    }
  }, [enabled, reload]);

  return { talepler, loading, reload };
};

export default useMalzemeTalepleri;
