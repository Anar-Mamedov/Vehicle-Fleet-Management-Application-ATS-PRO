import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Drawer, Spin, message } from "antd";
import { t } from "i18next";
import { GetServiceWorkCardByIdService } from "../../../../../api/services/isEmri/services";
import { cardStyle, hintStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../../KademeIsEmirleri/components/DurumTag";
import PersonelBilgisi from "../../components/PersonelBilgisi";
import TarihSaat from "../../components/TarihSaat";
import { getDolguButonStyle } from "../../components/islemButonStyles";
import { getIsDurumTanimi } from "../../KademeIsEmirleri/constants";
import { formatPlanlananSure, getAnaDurumAksiyonu } from "../constants";
import SureSayaci from "./SureSayaci";
import IsDurumGecmisi from "./IsDurumGecmisi";

const degerStyle = { fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px", wordBreak: "break-word" };

const Alan = ({ label, children, span = 6 }) => (
  <div className={`col-span-${span} flex flex-col`} style={{ gap: "2px", minWidth: 0 }}>
    <span style={hintStyle}>{label}</span>
    <span style={degerStyle}>{children || "—"}</span>
  </div>
);

Alan.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  span: PropTypes.number,
};

// Atanan işin salt okunur detayı. Liste satırındaki bilgiler (araç, kademe, süre sayacı) satırdan,
// yardımcı personel, planlanan süre ve açıklama GetServiceWorkCardById yanıtından okunur.
const AtananIsDetayDrawer = ({ open, kart, yenilemeAnahtari, durumDegisiyor, onClose, onDurumDegistir, onIsEmriAc }) => {
  const [loading, setLoading] = useState(false);
  const [detay, setDetay] = useState(null);
  const isId = kart?.siraNo;

  useEffect(() => {
    if (!open || !isId) return undefined;

    let ignore = false;
    setLoading(true);

    GetServiceWorkCardByIdService(isId)
      .then((res) => {
        if (ignore) return;
        if (res?.data?.status === false) {
          message.error(res.data.message || t("islemBasarisiz"));
          return;
        }
        setDetay(res.data);
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
  }, [open, isId, yenilemeAnahtari]);

  const closeDrawer = () => {
    setDetay(null);
    onClose();
  };

  const anaAksiyon = getAnaDurumAksiyonu(kart?.durum);
  const arac = [kart?.marka, kart?.model].filter(Boolean).join(" ");

  const title = (
    <div className="flex flex-col">
      <span>{t("atananIsDetayi")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("atananIsDetayiAciklama")}</span>
    </div>
  );

  const footer = (
    <div className="flex" style={{ justifyContent: "flex-end", gap: "8px" }}>
      <Button className="btn btn-min cancel-btn" onClick={closeDrawer}>
        {t("kapat")}
      </Button>
      {anaAksiyon && (
        <Button loading={durumDegisiyor} style={getDolguButonStyle(anaAksiyon.color)} onClick={() => onDurumDegistir(kart, anaAksiyon.status)}>
          {t(anaAksiyon.labelKey)}
        </Button>
      )}
    </div>
  );

  return (
    <Drawer
      title={title}
      extra={kart ? <DurumTag durum={kart.durum} getTanim={getIsDurumTanimi} /> : null}
      open={open}
      onClose={closeDrawer}
      footer={footer}
      width={560}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <div className="grid" style={{ ...cardStyle, padding: "14px 16px", rowGap: "12px", columnGap: "16px", marginBottom: "24px", backgroundColor: "#fafafa" }}>
          <Alan label={t("isEmriNo")} span={3}>
            {kart?.servisNo ? (
              <a role="link" tabIndex={0} onClick={() => onIsEmriAc(kart)} onKeyDown={(e) => e.key === "Enter" && onIsEmriAc(kart)}>
                {kart.servisNo}
              </a>
            ) : null}
          </Alan>
          <Alan label={t("plaka")} span={3}>
            {kart?.plaka}
          </Alan>
          <Alan label={t("arac")} span={3}>
            {arac}
          </Alan>
          <Alan label={t("kademe")} span={3}>
            {kart?.kademeAdi}
          </Alan>
        </div>

        <span style={sectionTitleStyle}>{t("isBilgileri")}</span>
        <div className="grid" style={{ rowGap: "14px", columnGap: "16px", marginBottom: "24px" }}>
          <div className="col-span-6 flex flex-col" style={{ gap: "4px", minWidth: 0 }}>
            <span style={hintStyle}>{t("personelTekil")}</span>
            <PersonelBilgisi isim={kart?.personelIsim} unvan={kart?.unvan} resim={kart?.personelVarsayilanResim} />
          </div>
          <Alan label={t("yardimciPersonel")}>{detay?.yardimciPersonelIsim}</Alan>
          <Alan label={t("isTanimi")} span={12}>
            {kart?.isTanim}
          </Alan>
          <Alan label={t("aciklama")} span={12}>
            {detay?.aciklama ?? kart?.aciklama}
          </Alan>
        </div>

        <span style={sectionTitleStyle}>{t("sureBilgileri")}</span>
        <div className="grid" style={{ rowGap: "14px", columnGap: "16px", marginBottom: "24px" }}>
          <Alan label={t("planlananSure")}>{formatPlanlananSure(detay?.sure ?? kart?.sure)}</Alan>
          <Alan label={t("gerceklesenSure")}>{kart ? <SureSayaci kart={kart} /> : null}</Alan>
          <Alan label={t("baslama")}>{kart ? <TarihSaat tarih={kart.baslamaTarih} saat={kart.baslamaSaat} /> : null}</Alan>
          <Alan label={t("bitis")}>{kart ? <TarihSaat tarih={kart.bitisTarih} saat={kart.bitisSaat} /> : null}</Alan>
        </div>

        <span style={sectionTitleStyle}>{t("durumGecmisi")}</span>
        <IsDurumGecmisi isId={isId} yenilemeAnahtari={yenilemeAnahtari} />
      </Spin>
    </Drawer>
  );
};

AtananIsDetayDrawer.propTypes = {
  open: PropTypes.bool,
  kart: PropTypes.object,
  yenilemeAnahtari: PropTypes.number,
  durumDegisiyor: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDurumDegistir: PropTypes.func.isRequired,
  onIsEmriAc: PropTypes.func.isRequired,
};

export default AtananIsDetayDrawer;
