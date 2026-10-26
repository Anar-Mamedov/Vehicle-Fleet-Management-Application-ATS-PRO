import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, message } from "antd";
import { t } from "i18next";
import { AddServiceWorkCardService } from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatTimeForApi, isEndBeforeStart } from "../../../../../utils/dateUtils";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import KademePersonelSelectbox from "../../../../components/KademePersonelSelectbox";
import IsTanimiTablo from "../../../../components/IsTanimiTablo";
import FormField from "../../KademeTanimlari/components/FormField";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { IS_TURU_KOD_ID, isSuccessResponse } from "../constants";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const getDefaultValues = () => ({
  isTanimi: null,
  isTanimId: null,
  isTip: null,
  isTipID: null,
  personel: null,
  personelID: null,
  baslamaTarih: null,
  baslamaSaat: null,
  bitisTarih: null,
  bitisSaat: null,
  aciklama: null,
});

// İş emrine yeni iş atar; personel yalnızca iş emrinin kademesine atanmış personellerden seçilir
const IsAtaModal = ({ open, isEmriId, aracId, kademeId, onClose, onSaved }) => {
  const [saving, setSaving] = useState(false);
  const methods = useForm({ defaultValues: getDefaultValues() });
  const { handleSubmit, reset, setValue } = methods;

  const closeModal = () => {
    reset(getDefaultValues());
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    if (isEndBeforeStart(values.baslamaTarih, values.baslamaSaat, values.bitisTarih, values.bitisSaat)) {
      message.warning(t("bitisBaslamadanOnceOlamaz"));
      return;
    }

    setSaving(true);
    try {
      const response = await AddServiceWorkCardService({
        aracId: aracId || 0,
        isTanimId: values.isTanimId || 0,
        isTipKodId: values.isTipID || 0,
        servisSiraNo: isEmriId,
        personelId: values.personelID || 0,
        baslamaTarih: formatDateForApi(values.baslamaTarih),
        baslamaSaat: formatTimeForApi(values.baslamaSaat, true),
        bitisTarih: formatDateForApi(values.bitisTarih),
        bitisSaat: formatTimeForApi(values.bitisSaat, true),
        aciklama: values.aciklama || "",
        isFromIsEmri: true,
      });

      if (isSuccessResponse(response)) {
        message.success(t("islemBasarili"));
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
      {t("isiAta")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("isAta")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("isAtaAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={760} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <div className="grid" style={{ rowGap: "16px", columnGap: "16px", paddingTop: "8px" }}>
            <FormField span={12} label={t("isTanimi")} required>
              <IsTanimiTablo
                name="isTanimi"
                required
                placeholder={t("isTanimiSeciniz")}
                onSelect={(isTanimi) => {
                  setValue("isTanimi", isTanimi.tanim, { shouldValidate: true });
                  setValue("isTanimId", isTanimi.isTanimId);
                  setValue("isTip", isTanimi.isTip || null, { shouldValidate: true });
                  setValue("isTipID", isTanimi.isTipKodId || null);
                }}
                onClear={() => {
                  setValue("isTanimi", null);
                  setValue("isTanimId", null);
                }}
              />
            </FormField>

            <FormField span={6} label={t("isTuru")} required>
              <KodIDSelectbox name1="isTip" kodID={IS_TURU_KOD_ID} isRequired placeholder={t("seciniz")} inputWidth="100%" addHide />
            </FormField>

            <FormField span={6} label={t("atananPersonel")} required>
              <KademePersonelSelectbox name1="personel" kademeId={kademeId} isRequired />
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

            <FormField span={12} label={t("aciklama")}>
              <div style={sayacAlaniStyle}>
                <Textarea name="aciklama" rows={4} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount placeholder={t("isAciklamaPlaceholder")} />
              </div>
            </FormField>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

IsAtaModal.propTypes = {
  open: PropTypes.bool,
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  kademeId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default IsAtaModal;
