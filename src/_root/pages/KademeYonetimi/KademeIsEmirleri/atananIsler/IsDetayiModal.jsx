import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Spin, message } from "antd";
import { BorderOutlined, CaretRightOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { GetServiceWorkCardByIdService, UpdateServiceWorkCardService } from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatTimeForApi, isEndBeforeStart, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import SelectInput from "../../../../components/form/selects/SelectInput";
import KademePersonelSelectbox from "../../../../components/KademePersonelSelectbox";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { IS_DURUM, formatSureUzun, getIsDurumOptions, isSuccessResponse, normalizeIsDurumu, toNullable, toNullableId } from "../constants";
import { updateIsDurumu } from "./isDurumuGuncelle";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

// Tasarımdaki iş kontrol düğmeleri: dolgulu, beyaz yazılı, 28px yüksekliğinde
const DURUM_BUTON_RENKLERI = {
  baslat: "#0ea5e9",
  durdur: "#f43f5e",
  bitir: "#10b981",
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
  personel: null,
  personelID: null,
  yardimciPersonel: null,
  yardimciPersonelID: null,
  baslamaTarih: null,
  baslamaSaat: null,
  bitisTarih: null,
  bitisSaat: null,
  durum: null,
  toplam: 0,
  aciklama: null,
});

const mapKartToFormValues = (kart) => ({
  personel: toNullable(kart.personelIsim),
  personelID: toNullableId(kart.personelId),
  yardimciPersonel: toNullable(kart.yardimciPersonelIsim),
  yardimciPersonelID: toNullableId(kart.yardimciPersonelId),
  baslamaTarih: toDayjsOrNull(kart.baslamaTarih),
  baslamaSaat: toTimeDayjsOrNull(kart.baslamaSaat),
  bitisTarih: toDayjsOrNull(kart.bitisTarih),
  bitisSaat: toTimeDayjsOrNull(kart.bitisSaat),
  durum: normalizeIsDurumu(kart.durum),
  toplam: kart.toplam || 0,
  aciklama: toNullable(kart.aciklama),
});

// Başlat: durdurulmuş iş "Yeniden Başladı", henüz başlamamış iş "Devam Ediyor" durumuna geçer
const getBaslatDurumu = (durum) => (durum === IS_DURUM.DURDU ? IS_DURUM.YENIDEN_BASLADI : IS_DURUM.DEVAM_EDIYOR);
const isCalisiyor = (durum) => durum === IS_DURUM.DEVAM_EDIYOR || durum === IS_DURUM.YENIDEN_BASLADI;

// Atanan işin detayı: personel/tarih/işçilik güncellenir, iş Başlat/Durdur/Bitir ile anında durum değiştirir
const IsDetayiModal = ({ open, isId, kademeId, onClose, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [durumDegisiyor, setDurumDegisiyor] = useState(false);
  const [kart, setKart] = useState(null);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { getValues, handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (!open || !isId) return undefined;

    let ignore = false;
    setLoading(true);

    GetServiceWorkCardByIdService(isId)
      .then((res) => {
        if (ignore) return;
        setKart(res.data);
        reset(mapKartToFormValues(res.data));
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
    setKart(null);
    reset(getDefaultValues());
    onClose();
  };

  // Durum ve süre değiştiği için kart yeniden okunur; formdaki kaydedilmemiş diğer alanlara dokunulmaz.
  // Başlat/Bitir boş başlama/bitiş zamanını sistem zamanıyla kaydeder; form o alanlar boşsa kayıtlı değerle doldurulur.
  const changeDurum = async (status) => {
    setDurumDegisiyor(true);
    try {
      const response = await updateIsDurumu(isId, status);
      if (!isSuccessResponse(response)) {
        message.error(t("islemBasarisiz"));
        return;
      }

      const guncelKart = await GetServiceWorkCardByIdService(isId);
      setKart(guncelKart.data);
      setValue("durum", normalizeIsDurumu(guncelKart.data.durum));
      if (!getValues("baslamaTarih")) {
        setValue("baslamaTarih", toDayjsOrNull(guncelKart.data.baslamaTarih));
        setValue("baslamaSaat", toTimeDayjsOrNull(guncelKart.data.baslamaSaat));
      }
      if (!getValues("bitisTarih")) {
        setValue("bitisTarih", toDayjsOrNull(guncelKart.data.bitisTarih));
        setValue("bitisSaat", toTimeDayjsOrNull(guncelKart.data.bitisSaat));
      }
      message.success(t("islemBasarili"));
      onChange();
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setDurumDegisiyor(false);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    if (isEndBeforeStart(values.baslamaTarih, values.baslamaSaat, values.bitisTarih, values.bitisSaat)) {
      message.warning(t("bitisBaslamadanOnceOlamaz"));
      return;
    }

    setSaving(true);
    try {
      const response = await UpdateServiceWorkCardService({
        siraNo: isId,
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
        message.error(t("islemBasarisiz"));
        return;
      }

      // Durum güncelleme gövdesinde yer almaz; listeden farklı bir durum seçildiyse durum servisiyle kaydedilir
      if (values.durum && values.durum !== normalizeIsDurumu(kart?.durum)) {
        const durumResponse = await updateIsDurumu(isId, values.durum);
        if (!isSuccessResponse(durumResponse)) {
          message.error(t("isDurumuGuncellenemedi"));
          onChange();
          return;
        }
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

  const durum = normalizeIsDurumu(kart?.durum);
  const islemDevamEdiyor = loading || saving || durumDegisiyor;
  const baslatPasif = !kart || islemDevamEdiyor || !(durum === IS_DURUM.BEKLIYOR || durum === IS_DURUM.DURDU);
  const durdurPasif = !kart || islemDevamEdiyor || !isCalisiyor(durum);
  const bitirPasif = !kart || islemDevamEdiyor || durum === IS_DURUM.TAMAMLANDI;

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={!kart || islemDevamEdiyor}>
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
            <div className="flex" style={{ ...cardStyle, padding: "14px 16px", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "16px", backgroundColor: "#fafafa" }}>
              <div className="flex flex-col" style={{ flex: "1 1 220px", minWidth: 0 }}>
                <span style={{ ...hintStyle, textTransform: "uppercase" }}>{t("isTanimi")}</span>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#141414" }}>{kart?.isTanim || "-"}</span>
              </div>
              <div className="flex" style={{ gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <Button
                  icon={<CaretRightOutlined />}
                  loading={durumDegisiyor}
                  disabled={baslatPasif}
                  style={getDurumButonStyle(DURUM_BUTON_RENKLERI.baslat, baslatPasif)}
                  onClick={() => changeDurum(getBaslatDurumu(durum))}
                >
                  {t("baslat")}
                </Button>
                <Button icon={<BorderOutlined />} disabled={durdurPasif} style={getDurumButonStyle(DURUM_BUTON_RENKLERI.durdur, durdurPasif)} onClick={() => changeDurum(IS_DURUM.DURDU)}>
                  {t("durdur")}
                </Button>
                <Button icon={<CheckOutlined />} disabled={bitirPasif} style={getDurumButonStyle(DURUM_BUTON_RENKLERI.bitir, bitirPasif)} onClick={() => changeDurum(IS_DURUM.TAMAMLANDI)}>
                  {t("bitir")}
                </Button>
                <span style={sureKutusuStyle}>
                  <ClockCircleOutlined />
                  {`${t("sure")}: ${formatSureUzun(kart?.sure)}`}
                </span>
              </div>
            </div>

            <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
              <FormField span={6} label={t("atananPersonel")} required>
                <KademePersonelSelectbox name1="personel" kademeId={kademeId} isRequired />
              </FormField>

              <FormField span={6} label={t("yardimciPersonel")}>
                <KademePersonelSelectbox name1="yardimciPersonel" kademeId={kademeId} />
              </FormField>

              <FormField span={6} label={t("baslamaTarihiSaati")}>
                <div className="flex" style={{ gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <DateInput name="baslamaTarih" style={{ width: "100%" }} />
                  </div>
                  <TimeInput name="baslamaSaat" style={{ width: "110px" }} />
                </div>
              </FormField>

              <FormField span={6} label={t("bitisTarihiSaati")}>
                <div className="flex" style={{ gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <DateInput name="bitisTarih" style={{ width: "100%" }} />
                  </div>
                  <TimeInput name="bitisSaat" style={{ width: "110px" }} />
                </div>
              </FormField>

              <FormField span={6} label={t("durum")}>
                <SelectInput name="durum" options={getIsDurumOptions()} allowClear={false} />
              </FormField>

              <FormField span={6} label={t("iscilikTutari")}>
                <NumberInput name="toplam" min={0} />
              </FormField>

              <FormField span={12} label={t("aciklama")}>
                <div style={sayacAlaniStyle}>
                  <Textarea name="aciklama" rows={4} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount placeholder={t("isAciklamaPlaceholder")} />
                </div>
              </FormField>
            </div>
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

IsDetayiModal.propTypes = {
  open: PropTypes.bool,
  isId: PropTypes.number,
  kademeId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default IsDetayiModal;
