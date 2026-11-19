import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Button, Modal, Spin, message } from "antd";
import { BorderOutlined, CaretRightOutlined, CheckOutlined, ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { UpdateServiceWorkCardService } from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatTimeForApi, isEndBeforeStart, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import BenzersizKodInput from "../../../../components/form/inputs/BenzersizKodInput";
import KademePersonelSelectbox from "../../../../components/KademePersonelSelectbox";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, hintStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../components/DurumTag";
import {
  ACIKLAMA_ZORUNLU_IS_ISLEMLERI,
  IS_ISLEMI,
  IS_NO_TABLE_NAME,
  formatSureUzun,
  getIsDurumTanimi,
  getIsIslemleri,
  getIsKartiKilitMesajKey,
  isSuccessResponse,
  toNullable,
  toNullableId,
} from "../constants";
import { getIsKartiDurumBilgisi, updateIsDurumu } from "./isDurumuGuncelle";
import IsDurumIslemModal from "./IsDurumIslemModal";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

// Tasarımdaki iş kontrol düğmeleri: dolgulu, beyaz yazılı, 28px yüksekliğinde
const DURUM_BUTON_RENKLERI = {
  baslat: "#0ea5e9",
  durdur: "#f43f5e",
  bitir: "#10b981",
  iptalEt: "#475569",
};

const getDurumButonStyle = (renk, disabled) => ({
  height: "28px",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: renk,
  color: "#fff",
  fontSize: "12px",
  fontWeight: 600,
  boxShadow: "none",
  opacity: disabled ? 0.45 : 1,
});

const sureKutusuStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  height: "28px",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  color: "#475569",
  fontSize: "12px",
  fontWeight: 500,
};

const getDefaultValues = () => ({
  isNo: null,
  personel: null,
  personelID: null,
  yardimciPersonel: null,
  yardimciPersonelID: null,
  baslamaTarih: null,
  baslamaSaat: null,
  bitisTarih: null,
  bitisSaat: null,
  toplam: 0,
  aciklama: null,
});

const mapKartToFormValues = (kart) => ({
  isNo: toNullable(kart.isNo),
  personel: toNullable(kart.personelIsim),
  personelID: toNullableId(kart.personelId),
  yardimciPersonel: toNullable(kart.yardimciPersonelIsim),
  yardimciPersonelID: toNullableId(kart.yardimciPersonelId),
  baslamaTarih: toDayjsOrNull(kart.baslamaTarih),
  baslamaSaat: toTimeDayjsOrNull(kart.baslamaSaat),
  bitisTarih: toDayjsOrNull(kart.bitisTarih),
  bitisSaat: toTimeDayjsOrNull(kart.bitisSaat),
  toplam: kart.toplam || 0,
  aciklama: toNullable(kart.aciklama),
});

// Atanan işin detayı: personel/tarih/işçilik güncellenir; durum yalnızca işlem düğmeleriyle değişir.
// Başlat ve Devam Et anında uygulanır; Durdur, Bitir ve İptal açıklama modalını açar.
// readOnly (kapalı/iptal iş emri), tamamlanan/iptal edilen iş veya tamamlanan iş emri detayı yalnızca görüntülenir hale getirir.
const IsDetayiModal = ({ open, isId, kademeId, readOnly = false, onClose, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [durumDegisiyor, setDurumDegisiyor] = useState(false);
  const [bilgi, setBilgi] = useState(null);
  const [durumIslemi, setDurumIslemi] = useState(null);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { getValues, handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (!open || !isId) return undefined;

    let ignore = false;
    setLoading(true);

    getIsKartiDurumBilgisi(isId)
      .then((durumBilgisi) => {
        if (ignore) return;
        if (!durumBilgisi) {
          message.error(t("islemBasarisiz"));
          return;
        }
        setBilgi(durumBilgisi);
        reset(mapKartToFormValues(durumBilgisi.kart));
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
  }, [open, isId, reset]);

  const closeModal = () => {
    setBilgi(null);
    setDurumIslemi(null);
    reset(getDefaultValues());
    onClose();
  };

  // Durum ve süre değiştiği için kart yeniden okunur; formdaki kaydedilmemiş diğer alanlara dokunulmaz.
  // Başlat/Bitir boş başlama/bitiş zamanını sistem zamanıyla kaydeder; form o alanlar boşsa kayıtlı değerle doldurulur.
  const refreshKart = async () => {
    const guncelBilgi = await getIsKartiDurumBilgisi(isId);
    if (!guncelBilgi) return;

    const guncelKart = guncelBilgi.kart;
    setBilgi(guncelBilgi);
    if (!getValues("baslamaTarih")) {
      setValue("baslamaTarih", toDayjsOrNull(guncelKart.baslamaTarih));
      setValue("baslamaSaat", toTimeDayjsOrNull(guncelKart.baslamaSaat));
    }
    if (!getValues("bitisTarih")) {
      setValue("bitisTarih", toDayjsOrNull(guncelKart.bitisTarih));
      setValue("bitisSaat", toTimeDayjsOrNull(guncelKart.bitisSaat));
    }
  };

  const handleDurumDegisti = async () => {
    onChange();
    try {
      await refreshKart();
    } catch {
      message.error(t("islemBasarisiz"));
    }
  };

  const handleIslem = async (islem) => {
    if (ACIKLAMA_ZORUNLU_IS_ISLEMLERI.includes(islem)) {
      setDurumIslemi(islem);
      return;
    }

    setDurumDegisiyor(true);
    try {
      const sonuc = await updateIsDurumu(isId, islem);
      if (!sonuc.basarili) {
        message.error(sonuc.mesaj);
        return;
      }
      message.success(t("islemBasarili"));
      await handleDurumDegisti();
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setDurumDegisiyor(false);
    }
  };

  const kart = bilgi?.kart;
  const kilitMesajKey = bilgi ? getIsKartiKilitMesajKey(kart.durum, bilgi.isEmriDurumu) : null;
  const saltOkunur = readOnly || Boolean(kilitMesajKey);

  const onSubmit = handleSubmit(async (values) => {
    if (saltOkunur) return;

    if (isEndBeforeStart(values.baslamaTarih, values.baslamaSaat, values.bitisTarih, values.bitisSaat)) {
      message.warning(t("bitisBaslamadanOnceOlamaz"));
      return;
    }

    setSaving(true);
    try {
      const response = await UpdateServiceWorkCardService({
        siraNo: isId,
        isNo: values.isNo || "",
        personelId: values.personelID || 0,
        yardimciPersonelId: values.yardimciPersonelID || 0,
        baslamaTarih: formatDateForApi(values.baslamaTarih),
        baslamaSaat: formatTimeForApi(values.baslamaSaat, true),
        bitisTarih: formatDateForApi(values.bitisTarih),
        bitisSaat: formatTimeForApi(values.bitisSaat, true),
        toplam: Number(values.toplam) || 0,
        aciklama: values.aciklama || "",
      });

      if (!isSuccessResponse(response)) {
        message.error(response?.data?.message || t("islemBasarisiz"));
        return;
      }

      message.success(t("islemBasarili"));
      onChange();
      closeModal();
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  });

  const islemDevamEdiyor = loading || saving || durumDegisiyor;
  const islemler = kart && !saltOkunur ? getIsIslemleri(kart.durum) : {};
  const isIslemiPasif = (islem) => islemDevamEdiyor || !islemler[islem];
  // Başlamamış iş Başlat, durmuş veya malzeme bekleyen iş Devam Et ile çalışmaya geçer
  const calistirmaIslemi = islemler[IS_ISLEMI.DEVAM_ET] ? IS_ISLEMI.DEVAM_ET : IS_ISLEMI.BASLAT;

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={saltOkunur || !kart || islemDevamEdiyor}>
      {t("kaydet")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("isDetayi")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("isDetayiAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={820} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            {kilitMesajKey && <Alert type="warning" showIcon message={t(kilitMesajKey)} style={{ marginBottom: "12px" }} />}

            <div className="flex" style={{ ...cardStyle, padding: "14px 16px", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "16px", backgroundColor: "#fafafa" }}>
              <div className="flex flex-col" style={{ flex: "1 1 220px", minWidth: 0, gap: "4px" }}>
                <span style={{ ...hintStyle, textTransform: "uppercase" }}>{t("isTanimi")}</span>
                <div className="flex" style={{ gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#141414" }}>{kart?.isTanim || "-"}</span>
                  {kart && <DurumTag durum={kart.durum} getTanim={getIsDurumTanimi} />}
                </div>
              </div>
              <div className="flex" style={{ gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <Button
                  icon={<CaretRightOutlined />}
                  loading={durumDegisiyor}
                  disabled={isIslemiPasif(calistirmaIslemi)}
                  style={getDurumButonStyle(DURUM_BUTON_RENKLERI.baslat, isIslemiPasif(calistirmaIslemi))}
                  onClick={() => handleIslem(calistirmaIslemi)}
                >
                  {t(calistirmaIslemi === IS_ISLEMI.DEVAM_ET ? "devamEt" : "baslat")}
                </Button>
                <Button
                  icon={<BorderOutlined />}
                  disabled={isIslemiPasif(IS_ISLEMI.DURDUR)}
                  style={getDurumButonStyle(DURUM_BUTON_RENKLERI.durdur, isIslemiPasif(IS_ISLEMI.DURDUR))}
                  onClick={() => handleIslem(IS_ISLEMI.DURDUR)}
                >
                  {t("durdur")}
                </Button>
                <Button
                  icon={<CheckOutlined />}
                  disabled={isIslemiPasif(IS_ISLEMI.BITIR)}
                  style={getDurumButonStyle(DURUM_BUTON_RENKLERI.bitir, isIslemiPasif(IS_ISLEMI.BITIR))}
                  onClick={() => handleIslem(IS_ISLEMI.BITIR)}
                >
                  {t("bitir")}
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  disabled={isIslemiPasif(IS_ISLEMI.IPTAL_ET)}
                  style={getDurumButonStyle(DURUM_BUTON_RENKLERI.iptalEt, isIslemiPasif(IS_ISLEMI.IPTAL_ET))}
                  onClick={() => handleIslem(IS_ISLEMI.IPTAL_ET)}
                >
                  {t("iptalEt")}
                </Button>
                <span style={sureKutusuStyle}>
                  <ClockCircleOutlined />
                  {`${t("sure")}: ${formatSureUzun(kart?.sure)}`}
                </span>
              </div>
            </div>

            {/* KademePersonelSelectbox pasif yapılamadığı için salt okunur modda seçili personel salt okunur alanda gösterilir */}
            <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
              <FormField span={6} label={t("atananPersonel")} required>
                {saltOkunur ? <TextInput name="personel" checked /> : <KademePersonelSelectbox name1="personel" kademeId={kademeId} isRequired />}
              </FormField>

              <FormField span={6} label={t("yardimciPersonel")}>
                {saltOkunur ? <TextInput name="yardimciPersonel" checked /> : <KademePersonelSelectbox name1="yardimciPersonel" kademeId={kademeId} />}
              </FormField>

              <FormField span={6} label={t("baslamaTarihiSaati")}>
                <div className="flex" style={{ gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <DateInput name="baslamaTarih" checked={saltOkunur} style={{ width: "100%" }} />
                  </div>
                  <TimeInput name="baslamaSaat" readonly={saltOkunur} style={{ width: "110px" }} />
                </div>
              </FormField>

              <FormField span={6} label={t("bitisTarihiSaati")}>
                <div className="flex" style={{ gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <DateInput name="bitisTarih" checked={saltOkunur} style={{ width: "100%" }} />
                  </div>
                  <TimeInput name="bitisSaat" readonly={saltOkunur} style={{ width: "110px" }} />
                </div>
              </FormField>

              <FormField span={6} label={t("isNo")}>
                <BenzersizKodInput name="isNo" tableName={IS_NO_TABLE_NAME} initialValue={toNullable(kart?.isNo)} disabled={saltOkunur} />
              </FormField>

              <FormField span={6} label={t("iscilikTutari")}>
                <NumberInput name="toplam" min={0} checked={saltOkunur} />
              </FormField>

              <FormField span={12} label={t("aciklama")}>
                <div style={sayacAlaniStyle}>
                  <Textarea name="aciklama" rows={4} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount checked={saltOkunur} placeholder={t("isAciklamaPlaceholder")} />
                </div>
              </FormField>
            </div>
          </Spin>
        </form>
      </FormProvider>

      <IsDurumIslemModal open={durumIslemi !== null} islem={durumIslemi} isId={isId} onClose={() => setDurumIslemi(null)} onSaved={handleDurumDegisti} />
    </Modal>
  );
};

IsDetayiModal.propTypes = {
  open: PropTypes.bool,
  isId: PropTypes.number,
  kademeId: PropTypes.number,
  readOnly: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default IsDetayiModal;
