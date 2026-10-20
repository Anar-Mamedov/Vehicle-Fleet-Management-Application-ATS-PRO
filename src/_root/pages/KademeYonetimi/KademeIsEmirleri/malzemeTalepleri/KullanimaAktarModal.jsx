import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, Modal, Spin, message } from "antd";
import { t } from "i18next";
import { GetMaterialRequestItemByIdService, UpdateMaterialRequestQuantityUsedService } from "../../../../../api/services/isEmri/services";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import MalzemeDepoSelectbox from "../../../../components/MalzemeDepoSelectbox";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, hintStyle, labelStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import { isSuccessResponse } from "../constants";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const ozetDegerStyle = { fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px" };

const getDefaultValues = (kalanMiktar = null) => ({
  stoklu: false,
  cikisDepo: null,
  cikisDepoID: null,
  kullanilanMiktar: kalanMiktar,
  aciklama: null,
});

const getKalanMiktar = (talep) => Math.max((Number(talep?.talepMiktar) || 0) - (Number(talep?.kullanilanMiktar) || 0), 0);

const OzetAlani = ({ label, children }) => (
  <div className="col-span-4 flex flex-col" style={{ gap: "2px", minWidth: 0 }}>
    <span style={hintStyle}>{label}</span>
    <span style={ozetDegerStyle}>{children ?? "-"}</span>
  </div>
);

OzetAlani.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

// Malzeme talebinden fiili kullanımı iş emrine aktarır.
// Girilen miktar talebin mevcut kullanımına eklenir; backend talep durumunu günceller ve malzeme hareketini oluşturur.
const KullanimaAktarModal = ({ open, isEmriId, aracId, talepId, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [talep, setTalep] = useState(null);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { control, handleSubmit, reset, setValue, watch, clearErrors } = methods;
  const stoklu = useWatch({ control, name: "stoklu" });

  // Kullanıcı stoklu seçimini değiştirince çıkış deposu temizlenir
  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      if (name !== "stoklu" || type !== "change") return;
      setValue("cikisDepo", null);
      setValue("cikisDepoID", null);
      clearErrors("cikisDepo");
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, clearErrors]);

  useEffect(() => {
    if (!open || !talepId) return undefined;

    let ignore = false;
    setLoading(true);

    GetMaterialRequestItemByIdService(talepId)
      .then((res) => {
        if (ignore) return;
        setTalep(res.data);
        reset(getDefaultValues(getKalanMiktar(res.data) || null));
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
  }, [open, talepId, reset]);

  const closeModal = () => {
    setTalep(null);
    reset(getDefaultValues());
    onClose();
  };

  const handleInvalid = (errors) => {
    const yalnizcaDepoEksik = Object.keys(errors).every((alan) => alan === "cikisDepo");
    message.warning(t(yalnizcaDepoEksik ? "stokluMalzemedeCikisDeposuZorunlu" : "zorunluAlanlariDoldurun"));
  };

  const onSubmit = handleSubmit(async (values) => {
    // Servis kullanılan miktarı tam sayı olarak bekler
    const kullanilanMiktar = Number(values.kullanilanMiktar);
    if (!Number.isInteger(kullanilanMiktar) || kullanilanMiktar <= 0) {
      message.warning(t("kullanilanMiktarTamSayiOlmali"));
      return;
    }

    setSaving(true);
    try {
      const response = await UpdateMaterialRequestQuantityUsedService({
        siraNo: talepId,
        talepMiktar: Number(talep.talepMiktar) || 0,
        kullanilanMiktar,
        aracId: aracId || talep.aracId || 0,
        malzemeId: talep.malzemeId || 0,
        servisSiraNo: isEmriId,
        birimKodId: talep.birimKodId || 0,
        cikisDepoSiraNo: values.stoklu ? values.cikisDepoID || 0 : 0,
        stoklu: Boolean(values.stoklu),
        aciklama: values.aciklama || null,
      });

      if (isSuccessResponse(response)) {
        message.success(t("kullanimaAktarildi"));
        closeModal();
        onSaved();
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  }, handleInvalid);

  const birim = talep?.malzemeBirim || "";
  const formatMiktar = (value) => `${formatNumberWithLocale(Number(value) || 0)} ${birim}`.trim();

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={loading || !talep}>
      {t("kullanimaAktar")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("kullanimaAktar")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("kullanimaAktarAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={720} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <span style={{ ...sectionTitleStyle, marginTop: "8px" }}>{t("talepOzeti")}</span>
            <div className="grid" style={{ ...cardStyle, padding: "14px 16px", rowGap: "12px", columnGap: "16px", marginBottom: "24px", backgroundColor: "#fafafa" }}>
              <OzetAlani label={t("talepNo")}>{talep?.talepNo || null}</OzetAlani>
              <OzetAlani label={t("malzemeKodu")}>{talep?.malzemeKod || null}</OzetAlani>
              <OzetAlani label={t("malzemeTanimi")}>{talep?.malzemeTanim || null}</OzetAlani>
              <OzetAlani label={t("talepMiktari")}>{talep ? formatMiktar(talep.talepMiktar) : null}</OzetAlani>
              <OzetAlani label={t("kullanilan")}>{talep ? formatMiktar(talep.kullanilanMiktar) : null}</OzetAlani>
              <OzetAlani label={t("kalanMiktar")}>{talep ? formatMiktar(getKalanMiktar(talep)) : null}</OzetAlani>
            </div>

            <span style={sectionTitleStyle}>{t("kullanimBilgileri")}</span>
            <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
              <div className="col-span-6 flex" style={{ alignItems: "flex-end", gap: "8px", paddingBottom: "6px" }}>
                <CheckboxInput name="stoklu" />
                <span style={{ ...labelStyle, color: "#141414" }}>{t("stokluMalzeme")}</span>
              </div>

              <FormField span={6} label={t("cikisDeposu")} required={stoklu}>
                <MalzemeDepoSelectbox name1="cikisDepo" disabled={!stoklu} isRequired={stoklu} />
              </FormField>

              <FormField span={6} label={t("kullanilanMiktar")} required hint={t("kullanimaAktarMiktarIpucu")}>
                <NumberInput name="kullanilanMiktar" required min={0} />
              </FormField>

              <FormField span={12} label={t("aciklama")}>
                <div style={sayacAlaniStyle}>
                  <Textarea name="aciklama" rows={3} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount />
                </div>
              </FormField>
            </div>
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

KullanimaAktarModal.propTypes = {
  open: PropTypes.bool,
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  talepId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default KullanimaAktarModal;
