import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Empty, Spin, Timeline, message } from "antd";
import { t } from "i18next";
import { GetWorkCardLogsByWorkIdService } from "../../../../../api/services/isEmri/services";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { formatTarihSaatDegeri, getIsDurumTanimi } from "../../KademeIsEmirleri/constants";

// İş kartının durum tarihçesi; kayıtlar backend'den tarih ve sıra numarasına göre artan sırada gelir.
// yenilemeAnahtari değişince (ör. durum güncellendikten sonra) tarihçe yeniden okunur.
const IsDurumGecmisi = ({ isId, yenilemeAnahtari = 0 }) => {
  const [loading, setLoading] = useState(false);
  const [kayitlar, setKayitlar] = useState([]);

  useEffect(() => {
    if (!isId) return undefined;

    let ignore = false;
    setLoading(true);

    GetWorkCardLogsByWorkIdService(isId)
      .then((res) => {
        if (ignore) return;
        // Hata halinde dizi yerine { status: false, message } gövdesi döner
        if (!Array.isArray(res?.data)) {
          setKayitlar([]);
          message.error(res?.data?.message || t("islemBasarisiz"));
          return;
        }
        setKayitlar(res.data);
      })
      .catch(() => {
        if (!ignore) message.error(t("islemBasarisiz"));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isId, yenilemeAnahtari]);

  const items = kayitlar.map((kayit) => {
    const tanim = getIsDurumTanimi(kayit.durum);
    return {
      key: kayit.siraNo,
      color: tanim?.color,
      children: (
        <div className="flex flex-col">
          <span style={{ fontWeight: 600, color: "#141414" }}>{tanim ? t(tanim.labelKey) : "—"}</span>
          <span style={hintStyle}>{[formatTarihSaatDegeri(kayit.tarih), kayit.islemYapanIsim].filter(Boolean).join(" · ")}</span>
        </div>
      ),
    };
  });

  return (
    <Spin spinning={loading}>
      {items.length > 0 ? <Timeline items={items} style={{ paddingTop: "8px" }} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("kayitBulunamadi")} />}
    </Spin>
  );
};

IsDurumGecmisi.propTypes = {
  isId: PropTypes.number,
  yenilemeAnahtari: PropTypes.number,
};

export default IsDurumGecmisi;
