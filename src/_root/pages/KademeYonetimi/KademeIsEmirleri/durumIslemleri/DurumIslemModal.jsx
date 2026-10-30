import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Spin, message } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";
import { GetVehicleServiceByIdService } from "../../../../../api/services/isEmri/services";
import { formatDateForApi, formatTimeForApi, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import FormField from "../../KademeTanimlari/components/FormField";
import { labelStyle } from "../../KademeTanimlari/components/uiStyles";
import { DURUM_ISLEMI, IS_EMRI_IPTAL_NEDEN_KOD_ID } from "../constants";
import { uygulaDurumIslemi } from "./durumIslemHelpers";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const ISLEM_BASLIKLARI = {
  [DURUM_ISLEMI.KAPAT]: "isEmriniKapat",
  [DURUM_ISLEMI.IPTAL_ET]: "isEmriniIptalEt",
  [DURUM_ISLEMI.YENIDEN_AC]: "isEmriniYenidenAc",
};

const getDefaultValues = () => ({
  baslamaTarih: null,
  baslamaSaat: null,
  bitisTarih: null,
  bitisSaat: null,
  kapanisTarih: null,
  kapanisSaat: null,
  iptalNeden: null,
  iptalNedenID: null,
  aciklama: null,
});

// API notundaki gövde: kapatmada başlama/bitiş gönderilmezse (null) kayıttaki değer korunur, kapanış gönderilmezse
// sunucu zamanı yazılır; iptalde neden kodu gider; açıklama boşsa backend duruma göre otomatik açıklama yazar.
const buildDurumIslemBody = ({ islem, values, siraNo, tarihlerGonderilir }) => {
  const body = { siraNo, durumId: islem, aciklama: values.aciklama?.trim() || null };

  if (islem === DURUM_ISLEMI.IPTAL_ET) {
    return { ...body, nedenKodId: values.iptalNedenID || 0 };
  }

  if (islem !== DURUM_ISLEMI.KAPAT) return body;

  const kapanis = { kapanisTarih: formatDateForApi(values.kapanisTarih), kapanisSaat: formatTimeForApi(values.kapanisSaat) };
  if (!tarihlerGonderilir) return { ...body, ...kapanis };

  return {
    ...body,
    ...kapanis,
    baslangicTarih: formatDateForApi(values.baslamaTarih),
    baslangicSaat: formatTimeForApi(values.baslamaSaat),
    bitisTarih: formatDateForApi(values.bitisTarih),
    bitisSaat: formatTimeForApi(values.bitisSaat),
  };
};

// Listede seçili iş emirlerini kapatır (5), iptal eder (3) veya yeniden açar (6).
// Kapatmada başlama/bitiş yalnızca tek kayıtta gösterilir ve kaydın güncel değeriyle dolar;
// birden çok kayıtta gönderilmez, her iş emri kendi değerini korur.
const DurumIslemModal = ({ open, islem, kayitlar, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { handleSubmit, reset } = methods;

  const tekKayitId = kayitlar.length === 1 ? kayitlar[0].siraNo : null;
  const tarihlerGonderilir = islem === DURUM_ISLEMI.KAPAT && Boolean(tekKayitId);

  useEffect(() => {
    if (!open) return undefined;

    const simdi = dayjs();
    const varsayilanlar = islem === DURUM_ISLEMI.KAPAT ? { ...getDefaultValues(), kapanisTarih: simdi, kapanisSaat: simdi } : getDefaultValues();
    reset(varsayilanlar);
    if (!tarihlerGonderilir) return undefined;

    let ignore = false;
    setLoading(true);

    GetVehicleServiceByIdService(tekKayitId)
      .then((res) => {
        if (ignore) return;
        const detay = res.data || {};
        reset({
          ...varsayilanlar,
          baslamaTarih: toDayjsOrNull(detay.baslamaTarih),
          baslamaSaat: toTimeDayjsOrNull(detay.baslamaSaat),
          bitisTarih: toDayjsOrNull(detay.bitisTarih),
          bitisSaat: toTimeDayjsOrNull(detay.bitisSaat),
        });
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
  }, [open, islem, tekKayitId, tarihlerGonderilir, reset]);

  const closeModal = () => {
    reset(getDefaultValues());
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    try {
      const basarili = await uygulaDurumIslemi(kayitlar, (siraNo) => buildDurumIslemBody({ islem, values, siraNo, tarihlerGonderilir }));
      if (basarili) {
        closeModal();
        onSaved();
      }
    } finally {
      setSaving(false);
    }
  });

  const islemAdi = ISLEM_BASLIKLARI[islem] ? t(ISLEM_BASLIKLARI[islem]) : "";

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("vazgec")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={loading}>
      {islemAdi}
    </Button>,
  ];

  return (
    <Modal title={islemAdi} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={640} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <div className="grid" style={{ rowGap: "16px", columnGap: "16px", paddingTop: "8px" }}>
              <div className="col-span-12 flex flex-col gap-1">
                <span style={labelStyle}>{`${t("seciliIsEmirleri")} (${kayitlar.length})`}</span>
                <span style={{ color: "#141414" }}>{kayitlar.map((kayit) => kayit.servisNo).join(", ")}</span>
              </div>

              {tarihlerGonderilir && (
                <>
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
                </>
              )}

              {islem === DURUM_ISLEMI.KAPAT && (
                <FormField span={6} label={t("kapanisTarihiSaati")}>
                  <div className="flex" style={{ gap: "8px" }}>
                    <div style={{ flex: 1 }}>
                      <DateInput name="kapanisTarih" style={{ width: "100%" }} />
                    </div>
                    <TimeInput name="kapanisSaat" style={{ width: "110px" }} />
                  </div>
                </FormField>
              )}

              {islem === DURUM_ISLEMI.IPTAL_ET && (
                <FormField span={12} label={t("iptalNedeni")} required>
                  <KodIDSelectbox name1="iptalNeden" kodID={IS_EMRI_IPTAL_NEDEN_KOD_ID} isRequired placeholder={t("iptalNedeniSeciniz")} inputWidth="100%" />
                </FormField>
              )}

              <FormField span={12} label={t("aciklama")}>
                <div style={sayacAlaniStyle}>
                  <Textarea name="aciklama" rows={4} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount placeholder={t("durumIslemiAciklamaPlaceholder")} />
                </div>
              </FormField>
            </div>
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

DurumIslemModal.propTypes = {
  open: PropTypes.bool,
  islem: PropTypes.oneOf(Object.values(DURUM_ISLEMI)),
  kayitlar: PropTypes.arrayOf(PropTypes.shape({ siraNo: PropTypes.number, servisNo: PropTypes.string })).isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default DurumIslemModal;
