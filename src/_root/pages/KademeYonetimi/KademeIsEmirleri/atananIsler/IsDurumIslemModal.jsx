import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Alert, Button, Modal, Spin, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, PauseOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { GetMaterialRequestListByServiceIdService } from "../../../../../api/services/isEmri/services";
import Textarea from "../../../../components/form/inputs/Textarea";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { getDolguButonStyle } from "../../components/islemButonStyles";
import DurumTag from "../components/DurumTag";
import useOnayAktif from "../hooks/useOnayAktif";
import { IS_ISLEMI, ONAY_TANIMI, getIsDurumTanimi, getIsIslemleri, getIsKartiKilitMesajKey, isMalzemeTalebiAcik } from "../constants";
import { getIsKartiDurumBilgisi, updateIsDurumu } from "./isDurumuGuncelle";

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const TEHLIKE_RENGI = "#e5484d";
const TAMAMLAMA_RENGI = "#10b981";

const ISLEM_GORUNUMLERI = {
  [IS_ISLEMI.DURDUR]: {
    baslikKey: "atananIsiDurdur",
    icon: <PauseOutlined />,
    renk: TEHLIKE_RENGI,
    nedenKey: "durdurmaNedeni",
    placeholderKey: "durdurmaNedeniPlaceholder",
    uzunluk: 500,
  },
  [IS_ISLEMI.BITIR]: {
    baslikKey: "atananIsiBitir",
    icon: <CheckCircleOutlined />,
    renk: TAMAMLAMA_RENGI,
    nedenKey: "tamamlamaNotu",
    ipucuKey: "tamamlamaNotuIpucu",
    placeholderKey: "tamamlamaNotuPlaceholder",
    uzunluk: 1000,
  },
  [IS_ISLEMI.IPTAL_ET]: {
    baslikKey: "atananIsiIptalEt",
    icon: <CloseCircleOutlined />,
    renk: TEHLIKE_RENGI,
    nedenKey: "iptalNedeni",
    placeholderKey: "iptalNedeniPlaceholder",
    uzunluk: 500,
  },
};

// Bitir metni iş tamamlama onay ayarına göre değişir; ayar okunamazsa (null) iki sonucu da anlatan metin gösterilir
const getBitirMetinleri = (onayAktif) => {
  if (onayAktif === true) {
    return { altBaslikKey: "atananIsiBitirOnayliAciklama", alertTipi: "info", alertKey: "atananIsiBitirOnayliBilgi", butonKey: "isiBitirVeOnayaGonder", basariKey: "isTamamlamaOnayinaGonderildi" };
  }
  if (onayAktif === false) {
    return { altBaslikKey: "atananIsiBitirOnaysizAciklama", alertTipi: "info", alertKey: "atananIsiBitirOnaysizBilgi", butonKey: "isiBitir", basariKey: "islemBasarili" };
  }
  return { altBaslikKey: "atananIsiBitirAciklama", alertTipi: "info", alertKey: "atananIsiBitirBilgi", butonKey: "isiBitir", basariKey: "islemBasarili" };
};

const getIslemMetinleri = (islem, onayAktif) => {
  if (islem === IS_ISLEMI.BITIR) return getBitirMetinleri(onayAktif);
  if (islem === IS_ISLEMI.DURDUR) {
    return { altBaslikKey: "atananIsiDurdurAciklama", alertTipi: "error", alertKey: "atananIsiDurdurUyari", butonKey: "isiDurdur", basariKey: "islemBasarili" };
  }
  return { altBaslikKey: "atananIsiIptalEtAciklama", alertTipi: "error", alertKey: "atananIsiIptalEtUyari", butonKey: "atananIsiIptalEt", basariKey: "islemBasarili" };
};

const BilgiSatiri = ({ label, children }) => (
  <div className="flex" style={{ gap: "12px", alignItems: "center", minHeight: "24px" }}>
    <span style={{ ...hintStyle, width: "140px", flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "#141414", minWidth: 0, wordBreak: "break-word" }}>{children || "—"}</span>
  </div>
);

BilgiSatiri.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

// İşe bağlı açık malzeme talebi sayısı; okunamazsa uyarı gösterilmez, iptal yine yapılabilir
const getAcikTalepSayisi = async (servisSiraNo, isId) => {
  try {
    const response = await GetMaterialRequestListByServiceIdService(servisSiraNo);
    const talepler = Array.isArray(response?.data) ? response.data : response?.data?.list || [];
    return talepler.filter((talep) => talep.isId === isId && isMalzemeTalebiAcik(talep.durum)).length;
  } catch {
    return 0;
  }
};

// Atanan işi durdurur (5), bitirir (12) veya iptal eder (13); üçünde de açıklama zorunludur.
// İş kartı ve iş emri durumu modal açılınca yeniden okunur; kilitli ya da bu işleme uygun olmayan işte kayıt kapalıdır.
const IsDurumIslemModal = ({ open, islem, isId, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bilgi, setBilgi] = useState(null);
  const [acikTalepSayisi, setAcikTalepSayisi] = useState(0);
  const onayAktif = useOnayAktif(ONAY_TANIMI.IS_TAMAMLAMA, open && islem === IS_ISLEMI.BITIR);

  const methods = useForm({ defaultValues: { aciklama: null } });
  const { control, handleSubmit, reset } = methods;
  const aciklama = useWatch({ control, name: "aciklama" });

  useEffect(() => {
    if (!open || !isId) return undefined;

    let ignore = false;
    reset({ aciklama: null });
    setBilgi(null);
    setAcikTalepSayisi(0);
    setLoading(true);

    const yukle = async () => {
      const durumBilgisi = await getIsKartiDurumBilgisi(isId);
      if (ignore) return;
      if (!durumBilgisi) {
        message.error(t("islemBasarisiz"));
        return;
      }
      setBilgi(durumBilgisi);

      if (islem !== IS_ISLEMI.IPTAL_ET || !durumBilgisi.kart.servisSiraNo) return;
      const sayi = await getAcikTalepSayisi(durumBilgisi.kart.servisSiraNo, isId);
      if (!ignore) setAcikTalepSayisi(sayi);
    };

    yukle()
      .catch(() => {
        if (!ignore) message.error(t("islemBasarisiz"));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [open, isId, islem, reset]);

  const closeModal = () => {
    reset({ aciklama: null });
    setBilgi(null);
    onClose();
  };

  const gorunum = ISLEM_GORUNUMLERI[islem] || ISLEM_GORUNUMLERI[IS_ISLEMI.DURDUR];
  const metinler = getIslemMetinleri(islem, onayAktif);
  const kart = bilgi?.kart;
  const kilitMesajKey = bilgi ? getIsKartiKilitMesajKey(kart.durum, bilgi.isEmriDurumu) : null;
  const islemUygun = bilgi ? getIsIslemleri(kart.durum)[islem] : false;
  const kayitPasif = loading || !bilgi || Boolean(kilitMesajKey) || !islemUygun || !aciklama?.trim();

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    try {
      const sonuc = await updateIsDurumu(isId, islem, values.aciklama);
      if (!sonuc.basarili) {
        message.error(sonuc.mesaj);
        return;
      }

      message.success(t(metinler.basariKey));
      closeModal();
      onSaved();
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  });

  const title = (
    <div className="flex" style={{ gap: "12px", alignItems: "flex-start" }}>
      <span
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: "18px",
          color: gorunum.renk,
          backgroundColor: `${gorunum.renk}1a`,
        }}
      >
        {gorunum.icon}
      </span>
      <div className="flex flex-col">
        <span>{t(gorunum.baslikKey)}</span>
        <span style={{ ...hintStyle, fontWeight: 400 }}>{t(metinler.altBaslikKey)}</span>
      </div>
    </div>
  );

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("vazgec")}
    </Button>,
    islem === IS_ISLEMI.BITIR ? (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={kayitPasif}>
        {t(metinler.butonKey)}
      </Button>
    ) : (
      <Button key="submit" onClick={onSubmit} loading={saving} disabled={kayitPasif} style={getDolguButonStyle(TEHLIKE_RENGI, kayitPasif)}>
        {t(metinler.butonKey)}
      </Button>
    ),
  ];

  return (
    <Modal title={title} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={560} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <div className="flex flex-col" style={{ gap: "16px", paddingTop: "8px" }}>
              {kilitMesajKey && <Alert type="warning" showIcon message={t(kilitMesajKey)} />}
              {bilgi && !kilitMesajKey && !islemUygun && <Alert type="warning" showIcon message={t("isDurumuBuIslemeUygunDegil")} />}

              <div className="flex flex-col" style={{ ...cardStyle, padding: "12px 16px", gap: "6px", backgroundColor: "#fafafa" }}>
                <BilgiSatiri label={t("isTanimi")}>{kart?.isTanim}</BilgiSatiri>
                <BilgiSatiri label={t("atananPersonel")}>{kart?.personelIsim}</BilgiSatiri>
                <BilgiSatiri label={t("mevcutDurum")}>{kart ? <DurumTag durum={kart.durum} getTanim={getIsDurumTanimi} /> : null}</BilgiSatiri>
              </div>

              {islem === IS_ISLEMI.IPTAL_ET && acikTalepSayisi > 0 && <Alert type="warning" showIcon message={t("atananIsAcikMalzemeTalebiUyari", { sayi: acikTalepSayisi })} />}

              <div className="grid">
                <FormField span={12} label={t(gorunum.nedenKey)} required hint={gorunum.ipucuKey ? t(gorunum.ipucuKey) : undefined}>
                  <div style={sayacAlaniStyle}>
                    <Textarea name="aciklama" rows={4} length={gorunum.uzunluk} showCount checked={Boolean(kilitMesajKey)} placeholder={t(gorunum.placeholderKey)} />
                  </div>
                </FormField>
              </div>

              <Alert type={metinler.alertTipi} showIcon message={t(metinler.alertKey)} />
            </div>
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

IsDurumIslemModal.propTypes = {
  open: PropTypes.bool,
  islem: PropTypes.oneOf([IS_ISLEMI.DURDUR, IS_ISLEMI.BITIR, IS_ISLEMI.IPTAL_ET]),
  isId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default IsDurumIslemModal;
