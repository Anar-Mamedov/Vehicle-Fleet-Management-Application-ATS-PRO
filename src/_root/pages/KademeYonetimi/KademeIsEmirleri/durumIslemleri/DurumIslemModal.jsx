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
import NumberInput from "../../../../components/form/inputs/NumberInput";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import FormField from "../../KademeTanimlari/components/FormField";
import { labelStyle } from "../../KademeTanimlari/components/uiStyles";
import { DURUM_ISLEMI, IS_EMRI_IPTAL_NEDEN_KOD_ID, toNullable, toNullableId } from "../constants";
import { getKayitBasariMesaji } from "../formHelpers";
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
  km: null,
  iptalNeden: null,
  iptalNedenID: null,
  aciklama: null,
});

// API notundaki gövde: kapatmada başlama, bitiş, kapanış ve km gider; iptalde neden kodu gider;
// açıklama boşsa backend duruma göre otomatik açıklama yazar.
// Periyodik bakımda km'nin geçerliliğini backend denetler; boş km 0 gider ve backend reddeder.
const buildDurumIslemBody = ({ islem, values, siraNo }) => {
  const body = { siraNo, durumId: islem, aciklama: values.aciklama?.trim() || null };

  if (islem === DURUM_ISLEMI.IPTAL_ET) {
    return { ...body, nedenKodId: values.iptalNedenID || 0 };
  }

  if (islem !== DURUM_ISLEMI.KAPAT) return body;

  return {
    ...body,
    baslangicTarih: formatDateForApi(values.baslamaTarih),
    baslangicSaat: formatTimeForApi(values.baslamaSaat),
    bitisTarih: formatDateForApi(values.bitisTarih),
    bitisSaat: formatTimeForApi(values.bitisSaat),
    kapanisTarih: formatDateForApi(values.kapanisTarih),
    kapanisSaat: formatTimeForApi(values.kapanisSaat),
    km: Number(values.km) || 0,
  };
};

// Salt okunur bilgi: etiket ve altında düz metin
const BilgiAlani = ({ span = 12, label, children }) => (
  <div className={`col-span-${span} flex flex-col gap-1`}>
    <span style={labelStyle}>{label}</span>
    <span style={{ color: "#141414" }}>{children}</span>
  </div>
);

BilgiAlani.propTypes = {
  span: PropTypes.number,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Kapatmadaki tarih ve saat alanları yan yana durur ve ikisi de zorunludur
const ZorunluTarihSaat = ({ tarihName, saatName }) => (
  <div className="flex" style={{ gap: "8px", alignItems: "flex-start" }}>
    <div style={{ flex: 1 }}>
      <DateInput name={tarihName} required requiredMessage={t("alanBosBirakilamaz")} style={{ width: "100%" }} />
    </div>
    <div style={{ width: "110px" }}>
      <TimeInput name={saatName} required style={{ width: "100%" }} />
    </div>
  </div>
);

ZorunluTarihSaat.propTypes = {
  tarihName: PropTypes.string.isRequired,
  saatName: PropTypes.string.isRequired,
};

// Listede seçili iş emirlerini iptal eder (3) veya yeniden açar (6); kapatma (5) tek iş emrinde yapılır.
// Kapatmada başlama, bitiş, km ve servis tanımı iş emrinin güncel değeriyle dolar.
// Kapatma reddedilirse (ör. periyodik bakımda geçersiz km) modal açık kalır, kullanıcı km'yi düzeltip yeniden dener.
const DurumIslemModal = ({ open, islem, kayitlar, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  // Plaka ve servis tanımı backend'e gönderilmez; tanım gösterilir, ikisi bakım ötelemesi mesajında kullanılır
  const [kapatilanIsEmri, setKapatilanIsEmri] = useState(null);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { handleSubmit, reset } = methods;

  const kapatma = islem === DURUM_ISLEMI.KAPAT;
  const kapatilanId = kapatma ? kayitlar[0]?.siraNo : null;

  useEffect(() => {
    if (!open) return undefined;

    const simdi = dayjs();
    const varsayilanlar = kapatma ? { ...getDefaultValues(), kapanisTarih: simdi, kapanisSaat: simdi } : getDefaultValues();
    reset(varsayilanlar);
    setKapatilanIsEmri(null);
    if (!kapatilanId) return undefined;

    let ignore = false;
    setLoading(true);

    GetVehicleServiceByIdService(kapatilanId)
      .then((res) => {
        if (ignore) return;
        const detay = res.data || {};
        reset({
          ...varsayilanlar,
          baslamaTarih: toDayjsOrNull(detay.baslamaTarih),
          baslamaSaat: toTimeDayjsOrNull(detay.baslamaSaat),
          bitisTarih: toDayjsOrNull(detay.bitisTarih),
          bitisSaat: toTimeDayjsOrNull(detay.bitisSaat),
          km: toNullableId(detay.km),
        });
        setKapatilanIsEmri({ plaka: toNullable(detay.plaka), servisTanimi: toNullable(detay.servisTanimi) });
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
  }, [open, kapatma, kapatilanId, reset]);

  const closeModal = () => {
    reset(getDefaultValues());
    onClose();
  };

  // Kapatmada periyodik bakım ötelendiyse yanıttaki hedef km/tarih bildirilir; diğer işlemlerde genel mesaj kalır
  const getBasariMesaji = kapatma ? (responseData) => getKayitBasariMesaji(responseData, kapatilanIsEmri || {}) : undefined;

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    try {
      const basarili = await uygulaDurumIslemi(kayitlar, (siraNo) => buildDurumIslemBody({ islem, values, siraNo }), getBasariMesaji);
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
              {/* Kapatmada servis tanımı seçili iş emrinin sağında durur */}
              <BilgiAlani span={kapatma ? 6 : 12} label={`${t("seciliIsEmirleri")} (${kayitlar.length})`}>
                {kayitlar.map((kayit) => kayit.servisNo).join(", ")}
              </BilgiAlani>

              {kapatma && (
                <>
                  <BilgiAlani span={6} label={t("servisBakimTanimi")}>
                    {kapatilanIsEmri?.servisTanimi || "-"}
                  </BilgiAlani>
                  <FormField span={6} label={t("baslamaTarihiSaati")} required>
                    <ZorunluTarihSaat tarihName="baslamaTarih" saatName="baslamaSaat" />
                  </FormField>
                  <FormField span={6} label={t("bitisTarihiSaati")} required>
                    <ZorunluTarihSaat tarihName="bitisTarih" saatName="bitisSaat" />
                  </FormField>
                  <FormField span={6} label={t("kapanisTarihiSaati")} required>
                    <ZorunluTarihSaat tarihName="kapanisTarih" saatName="kapanisSaat" />
                  </FormField>
                  <FormField span={6} label={t("aracKm")}>
                    <NumberInput name="km" min={0} />
                  </FormField>
                </>
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
