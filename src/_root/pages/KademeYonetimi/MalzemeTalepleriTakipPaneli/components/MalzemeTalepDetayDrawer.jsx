import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Drawer, Empty, Progress, Spin, Timeline, message } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { GetMaterialRequestItemByIdService } from "../../../../../api/services/isEmri/services";
import { compareDatesForSorter } from "../../../../../utils/dateUtils";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { cardStyle, hintStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../../KademeIsEmirleri/components/DurumTag";
import PersonelBilgisi from "../../components/PersonelBilgisi";
import { MALZEME_TALEP_DURUM, formatTarihSaatDegeri, getMalzemeTalepDurumTanimi } from "../../KademeIsEmirleri/constants";
import { formatMiktar, getKalanMiktar, getKullanimYuzdesi } from "../constants";

const degerStyle = { fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px", wordBreak: "break-word" };

const Alan = ({ label, children, span = 4 }) => (
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

// Malzeme talebinin salt okunur detayı (GetMaterialRequestItemById); plaka, ünvan ve fotoğraf detayda olmadığı için liste satırından okunur
const MalzemeTalepDetayDrawer = ({ open, satir, yenilemeAnahtari, onClose, onIsEmriAc, onKullanimaAktar }) => {
  const [loading, setLoading] = useState(false);
  const [talep, setTalep] = useState(null);
  const talepId = satir?.siraNo;

  useEffect(() => {
    if (!open || !talepId) return undefined;

    let ignore = false;
    setLoading(true);

    GetMaterialRequestItemByIdService(talepId)
      .then((res) => {
        if (ignore) return;
        if (res?.data?.status === false) {
          message.error(res.data.message || t("islemBasarisiz"));
          return;
        }
        setTalep(res.data);
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
  }, [open, talepId, yenilemeAnahtari]);

  const durumTarihcesi = useMemo(() => [...(talep?.durumTarihcesi || [])].sort((a, b) => compareDatesForSorter(a.tarih, b.tarih)), [talep]);

  const closeDrawer = () => {
    setTalep(null);
    onClose();
  };

  // Detay yüklenene kadar liste satırındaki değerler gösterilir
  const kayit = talep || satir || {};
  const durum = talep?.durum ?? satir?.durum;
  const kullanimYuzdesi = getKullanimYuzdesi(kayit.talepMiktar, kayit.kullanilanMiktar);

  const title = (
    <div className="flex flex-col">
      <span>{t("malzemeTalepDetayi")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{kayit.talepNo || ""}</span>
    </div>
  );

  const extra = (
    <div className="flex" style={{ gap: "8px", alignItems: "center" }}>
      {durum ? <DurumTag durum={durum} getTanim={getMalzemeTalepDurumTanimi} /> : null}
      {satir?.servisSiraNo ? (
        <Button size="small" icon={<ExportOutlined />} onClick={() => onIsEmriAc(satir)}>
          {t("isEmrineGit")}
        </Button>
      ) : null}
    </div>
  );

  const footer = (
    <div className="flex" style={{ justifyContent: "flex-end", gap: "8px" }}>
      <Button className="btn btn-min cancel-btn" onClick={closeDrawer}>
        {t("kapat")}
      </Button>
      {satir && durum !== MALZEME_TALEP_DURUM.TAMAMLANDI && (
        <Button className="btn btn-min primary-btn" onClick={() => onKullanimaAktar(satir)}>
          {t("kullanimaAktar")}
        </Button>
      )}
    </div>
  );

  const tarihceItems = durumTarihcesi.map((kayitSatiri) => {
    const tanim = getMalzemeTalepDurumTanimi(kayitSatiri.durum);
    return {
      key: kayitSatiri.siraNo,
      color: tanim?.color,
      children: (
        <div className="flex flex-col">
          <span style={{ fontWeight: 600, color: "#141414" }}>{tanim ? t(tanim.labelKey) : "—"}</span>
          <span style={hintStyle}>{[formatTarihSaatDegeri(kayitSatiri.tarih), kayitSatiri.islemYapanIsim].filter(Boolean).join(" · ")}</span>
        </div>
      ),
    };
  });

  return (
    <Drawer title={title} extra={extra} open={open} onClose={closeDrawer} footer={footer} width={600} destroyOnClose>
      <Spin spinning={loading}>
        <span style={sectionTitleStyle}>{t("talepVeIsEmriBilgileri")}</span>
        <div className="grid" style={{ ...cardStyle, padding: "14px 16px", rowGap: "14px", columnGap: "16px", marginBottom: "24px", backgroundColor: "#fafafa" }}>
          <Alan label={t("isEmriNo")}>
            {kayit.servisNo && satir?.servisSiraNo ? (
              <a role="link" tabIndex={0} onClick={() => onIsEmriAc(satir)} onKeyDown={(e) => e.key === "Enter" && onIsEmriAc(satir)}>
                {kayit.servisNo}
              </a>
            ) : (
              kayit.servisNo
            )}
          </Alan>
          <Alan label={t("plaka")}>{satir?.plaka}</Alan>
          <Alan label={t("isTanimi")}>{talep?.isTanim}</Alan>
          <div className="col-span-4 flex flex-col" style={{ gap: "4px", minWidth: 0 }}>
            <span style={hintStyle}>{t("talepEden")}</span>
            <PersonelBilgisi isim={kayit.talepEden} unvan={satir?.unvan} resim={satir?.personelVarsayilanResim} />
          </div>
          <Alan label={t("talepTarihi")}>{formatDateByLocale(kayit.talepTarih, undefined, "—")}</Alan>
          <Alan label={t("gerekliTarih")}>{formatDateByLocale(kayit.gerekliTarih, undefined, "—")}</Alan>
          <Alan label={t("talepNedeni")} span={12}>
            {talep?.talepNeden}
          </Alan>
        </div>

        <span style={sectionTitleStyle}>{t("malzemeVeMiktarBilgileri")}</span>
        <div className="grid" style={{ ...cardStyle, padding: "14px 16px", rowGap: "14px", columnGap: "16px", marginBottom: "24px" }}>
          <Alan label={t("malzemeKodu")}>{kayit.malzemeKod}</Alan>
          <Alan label={t("malzemeAdi")} span={8}>
            {kayit.malzemeTanim}
          </Alan>
          <Alan label={t("talepMiktari")}>{formatMiktar(kayit.talepMiktar, kayit.malzemeBirim)}</Alan>
          <Alan label={t("kullanilanMiktar")}>{formatMiktar(kayit.kullanilanMiktar, kayit.malzemeBirim)}</Alan>
          <Alan label={t("kalanMiktar")}>{formatMiktar(getKalanMiktar(kayit.talepMiktar, kayit.kullanilanMiktar), kayit.malzemeBirim)}</Alan>
          <div className="col-span-12 flex flex-col" style={{ gap: "2px" }}>
            <span style={hintStyle}>{t("kullanimaAktarimIlerlemesi")}</span>
            <Progress percent={kullanimYuzdesi} size="small" strokeColor="#16a34a" />
          </div>
        </div>

        <span style={sectionTitleStyle}>{t("aciklama")}</span>
        <div style={{ ...cardStyle, padding: "14px 16px", marginBottom: "24px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{kayit.aciklama || "—"}</div>

        <span style={sectionTitleStyle}>{t("durumTarihcesi")}</span>
        {tarihceItems.length > 0 ? <Timeline items={tarihceItems} style={{ paddingTop: "8px" }} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("kayitBulunamadi")} />}
      </Spin>
    </Drawer>
  );
};

MalzemeTalepDetayDrawer.propTypes = {
  open: PropTypes.bool,
  satir: PropTypes.object,
  yenilemeAnahtari: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onIsEmriAc: PropTypes.func.isRequired,
  onKullanimaAktar: PropTypes.func.isRequired,
};

export default MalzemeTalepDetayDrawer;
