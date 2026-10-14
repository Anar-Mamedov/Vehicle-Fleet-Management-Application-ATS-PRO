import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, message } from "antd";
import { t } from "i18next";
import { AddMaterialRequestService, GetMalzemeTalepNoService } from "../../../../../api/services/isEmri/services";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import { formatDateAndTimeForApi, formatDateForApi } from "../../../../../utils/dateUtils";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import KademePersonelSelectbox from "../../../../components/KademePersonelSelectbox";
import AtananIsSelectbox from "../../../../components/AtananIsSelectbox";
import MalzemeTablo from "../../../../components/MalzemeTablo";
import FormField from "../../KademeTanimlari/components/FormField";
import { hintStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import { MALZEME_BIRIM_KOD_ID, MALZEME_TALEP_KOD_TABLE_NAME, MALZEME_TALEP_NEDEN_KOD_ID, isSuccessResponse } from "../constants";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

// Talep tarihi modal her açıldığında o anın tarih ve saatiyle gelir
const getDefaultValues = (isId, isTanim) => ({
  talepTarih: dayjs(),
  talepSaat: dayjs(),
  personel: null,
  personelID: null,
  gerekliTarih: null,
  talepNeden: null,
  talepNedenID: null,
  ilgiliIs: isId ? isTanim || null : null,
  ilgiliIsID: isId || null,
  malzemeKod: null,
  malzemeId: null,
  malzemeTanim: null,
  talepMiktar: null,
  birim: null,
  birimID: null,
  aciklama: null,
});

// İş emrine bağlı yeni malzeme talebi oluşturur.
// İlgili iş isteğe bağlıdır; Atanan İşler'den açılınca o iş seçili gelir, seçilmezse isId 0 gider.
const MalzemeTalepEtModal = ({ open, isEmriId, aracId, kademeId, isId = 0, isTanim, onClose, onSaved }) => {
  const [saving, setSaving] = useState(false);
  const methods = useForm({ defaultValues: getDefaultValues() });
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (open) reset(getDefaultValues(isId, isTanim));
  }, [open, isId, isTanim, reset]);

  const closeModal = () => {
    reset(getDefaultValues());
    onClose();
  };

  const handleMalzemeSelect = (malzeme) => {
    setValue("malzemeKod", malzeme.malzemeKod || null, { shouldValidate: true });
    setValue("malzemeId", malzeme.malzemeId || null);
    setValue("malzemeTanim", malzeme.tanim || null);
    // Birim malzeme kartından gelir; kullanıcı gerekirse değiştirebilir
    setValue("birim", malzeme.birim || null, { shouldValidate: true });
    setValue("birimID", malzeme.birimKodId || null);
  };

  const handleMalzemeClear = () => {
    setValue("malzemeKod", null);
    setValue("malzemeId", null);
    setValue("malzemeTanim", null);
  };

  // Tasarımda talep numarası formda yer almaz; kayıt anında numaratörden alınır ve benzersizliği kontrol edilir
  const getTalepNo = async () => {
    const numaratorResponse = await GetMalzemeTalepNoService();
    const talepNo = numaratorResponse?.data;
    if (!talepNo) return null;

    const kodKontrol = await CodeItemValidateService({ tableName: MALZEME_TALEP_KOD_TABLE_NAME, code: talepNo });
    return kodKontrol?.data?.status ? null : talepNo;
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!(Number(values.talepMiktar) > 0)) {
      message.warning(t("talepMiktariSifirdanBuyukOlmali"));
      return;
    }

    setSaving(true);
    try {
      const talepNo = await getTalepNo();
      if (!talepNo) {
        message.error(t("talepNoAlinamadi"));
        return;
      }

      const response = await AddMaterialRequestService({
        aracId: aracId || 0,
        servisSiraNo: isEmriId,
        birimKodId: values.birimID || 0,
        talepNo,
        malzemeId: values.malzemeId || 0,
        personelId: values.personelID || 0,
        talepNedenKodId: values.talepNedenID || 0,
        talepMiktar: Number(values.talepMiktar),
        talepTarih: formatDateAndTimeForApi(values.talepTarih, values.talepSaat),
        gerekliTarih: formatDateForApi(values.gerekliTarih),
        aciklama: values.aciklama || "",
        isId: values.ilgiliIsID || 0,
      });

      if (isSuccessResponse(response)) {
        message.success(t("malzemeTalebiOlusturuldu"));
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
  });

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving}>
      {t("kaydet")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("malzemeTalepEt")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("malzemeTalepEtAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={760} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <span style={{ ...sectionTitleStyle, marginTop: "8px" }}>{t("talepBilgileri")}</span>
          <div className="grid" style={{ rowGap: "16px", columnGap: "16px", marginBottom: "24px" }}>
            <FormField span={6} label={t("talepTarihi")} required>
              <div className="flex" style={{ gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <DateInput name="talepTarih" required requiredMessage={t("alanBosBirakilamaz")} style={{ width: "100%" }} />
                </div>
                <TimeInput name="talepSaat" style={{ width: "110px" }} />
              </div>
            </FormField>

            <FormField span={6} label={t("talepEden")} required>
              <KademePersonelSelectbox name1="personel" kademeId={kademeId} isRequired />
            </FormField>

            <FormField span={6} label={t("gerekliTarih")} required>
              <DateInput name="gerekliTarih" required requiredMessage={t("alanBosBirakilamaz")} style={{ width: "100%" }} />
            </FormField>

            <FormField span={6} label={t("talepNedeni")} required>
              <KodIDSelectbox name1="talepNeden" kodID={MALZEME_TALEP_NEDEN_KOD_ID} isRequired placeholder={t("seciniz")} inputWidth="100%" />
            </FormField>

            <FormField span={12} label={t("ilgiliIs")}>
              <AtananIsSelectbox name1="ilgiliIs" isEmriId={isEmriId} />
            </FormField>
          </div>

          <span style={sectionTitleStyle}>{t("malzemeBilgileri")}</span>
          <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
            <FormField span={6} label={t("malzemeKodu")} required>
              <MalzemeTablo name="malzemeKod" required placeholder={t("malzemeSeciniz")} onSelect={handleMalzemeSelect} onClear={handleMalzemeClear} />
            </FormField>

            <FormField span={6} label={t("malzemeAdi")} required>
              <TextInput name="malzemeTanim" readonly />
            </FormField>

            <FormField span={6} label={t("talepMiktari")} required>
              <NumberInput name="talepMiktar" required min={0} />
            </FormField>

            <FormField span={6} label={t("birim")} required>
              <KodIDSelectbox name1="birim" kodID={MALZEME_BIRIM_KOD_ID} isRequired placeholder={t("seciniz")} inputWidth="100%" addHide />
            </FormField>

            <FormField span={12} label={t("aciklama")}>
              <div style={sayacAlaniStyle}>
                <Textarea name="aciklama" rows={3} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount placeholder={t("malzemeTalepAciklamaPlaceholder")} />
              </div>
            </FormField>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

MalzemeTalepEtModal.propTypes = {
  open: PropTypes.bool,
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  kademeId: PropTypes.number,
  isId: PropTypes.number,
  isTanim: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default MalzemeTalepEtModal;
