import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Spin, Table, message } from "antd";
import { t } from "i18next";
import { GetMaterialRequestItemByIdService, GetServiceWorkCardsByServiceIdService, UpdateMaterialRequestService } from "../../../../../api/services/isEmri/services";
import { compareDatesForSorter, formatDateForApi, formatIsoDateTimeForApi, toDayjsOrNull } from "../../../../../utils/dateUtils";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import DateInput from "../../../../components/form/date/DateInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import AtananIsSelectbox from "../../../../components/AtananIsSelectbox";
import MalzemeTablo from "../../../../components/MalzemeTablo";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, hintStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../components/DurumTag";
import {
  MALZEME_BIRIM_KOD_ID,
  MALZEME_TALEP_DURUM,
  MALZEME_TALEP_NEDEN_KOD_ID,
  formatTarihSaatDegeri,
  getMalzemeTalepDurumTanimi,
  isSuccessResponse,
  toNullable,
  toNullableId,
} from "../constants";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const ozetDegerStyle = { fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px" };

const getDefaultValues = () => ({
  malzemeKod: null,
  malzemeId: null,
  malzemeTanim: null,
  talepMiktar: null,
  kullanilanMiktar: 0,
  birim: null,
  birimID: null,
  gerekliTarih: null,
  talepNeden: null,
  talepNedenID: null,
  ilgiliIs: null,
  ilgiliIsID: null,
  aciklama: null,
});

const mapTalepToFormValues = (talep) => ({
  malzemeKod: toNullable(talep.malzemeKod),
  malzemeId: toNullableId(talep.malzemeId),
  malzemeTanim: toNullable(talep.malzemeTanim),
  talepMiktar: talep.talepMiktar ?? null,
  kullanilanMiktar: talep.kullanilanMiktar || 0,
  birim: toNullable(talep.malzemeBirim),
  birimID: toNullableId(talep.birimKodId),
  gerekliTarih: toDayjsOrNull(talep.gerekliTarih),
  talepNeden: toNullable(talep.talepNeden),
  talepNedenID: toNullableId(talep.talepNedenKodId),
  ilgiliIs: talep.isId ? toNullable(talep.isTanim) : null,
  ilgiliIsID: toNullableId(talep.isId),
  aciklama: toNullable(talep.aciklama),
});

// Detay yanıtında iş tanımı boş gelirse, select'te seçili işin görünmesi için tanım iş emrinin atanan işlerinden bulunur
const getIlgiliIsTanimi = async (talep, isEmriId) => {
  if (!talep.isId || talep.isTanim) return talep.isTanim || null;

  // Tanım bulunamazsa detay yine açılır; yalnızca select boş görünür
  try {
    const response = await GetServiceWorkCardsByServiceIdService(isEmriId);
    const isler = Array.isArray(response?.data) ? response.data : response?.data?.list || [];
    return isler.find((is) => is.siraNo === talep.isId)?.isTanim || null;
  } catch {
    return null;
  }
};

const OzetAlani = ({ label, children }) => (
  <div className="col-span-4 flex flex-col" style={{ gap: "2px", minWidth: 0 }}>
    <span style={hintStyle}>{label}</span>
    <span style={ozetDegerStyle}>{children || "-"}</span>
  </div>
);

OzetAlani.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

// Oluşturulmuş malzeme talebini gösterir; talep Bekliyor durumundayken malzeme bilgileri güncellenebilir.
// GetById yanıtında durum alanı olmadığı için durum listedeki satırdan verilir.
// İş emri id'si de yanıttaki servisSiraNo boş gelebildiği için açan sekmeden verilir.
// readOnly (kapalı/iptal iş emri) talebi durumundan bağımsız olarak yalnızca görüntülenir hale getirir.
const MalzemeTalepDetayiModal = ({ open, isEmriId, talepId, durum, readOnly = false, onClose, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [talep, setTalep] = useState(null);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (!open || !talepId) return undefined;

    let ignore = false;
    setLoading(true);

    GetMaterialRequestItemByIdService(talepId)
      .then(async (res) => {
        const isTanim = await getIlgiliIsTanimi(res.data, isEmriId);
        if (ignore) return;
        setTalep(res.data);
        reset(mapTalepToFormValues({ ...res.data, isTanim }));
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
  }, [open, isEmriId, talepId, reset]);

  const closeModal = () => {
    setTalep(null);
    reset(getDefaultValues());
    onClose();
  };

  const guncelDurum = talep?.durum ?? durum;
  const duzenlenebilir = !readOnly && Boolean(talep) && guncelDurum === MALZEME_TALEP_DURUM.BEKLIYOR;

  const durumTarihcesi = useMemo(
    () => [...(talep?.durumTarihcesi || [])].sort((a, b) => compareDatesForSorter(a.tarih, b.tarih)).map((kayit) => ({ ...kayit, key: kayit.siraNo })),
    [talep]
  );

  const handleMalzemeSelect = (malzeme) => {
    setValue("malzemeKod", malzeme.malzemeKod || null, { shouldValidate: true });
    setValue("malzemeId", malzeme.malzemeId || null);
    setValue("malzemeTanim", malzeme.tanim || null);
    setValue("birim", malzeme.birim || null, { shouldValidate: true });
    setValue("birimID", malzeme.birimKodId || null);
  };

  const handleMalzemeClear = () => {
    setValue("malzemeKod", null);
    setValue("malzemeId", null);
    setValue("malzemeTanim", null);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!(Number(values.talepMiktar) > 0)) {
      message.warning(t("talepMiktariSifirdanBuyukOlmali"));
      return;
    }

    setSaving(true);
    try {
      // Formda olmayan alanlar (talep no, talep eden, talep tarihi) detaydan aynen geri gönderilir
      const response = await UpdateMaterialRequestService({
        siraNo: talepId,
        birimKodId: values.birimID || 0,
        talepNo: talep.talepNo || "",
        malzemeId: values.malzemeId || 0,
        personelId: talep.personelId || 0,
        talepNedenKodId: values.talepNedenID || 0,
        talepMiktar: Number(values.talepMiktar),
        aciklama: values.aciklama || "",
        talepTarih: formatIsoDateTimeForApi(talep.talepTarih),
        gerekliTarih: formatDateForApi(values.gerekliTarih),
        isId: values.ilgiliIsID || 0,
      });

      if (isSuccessResponse(response)) {
        message.success(t("islemBasarili"));
        onChange();
        closeModal();
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  });

  const tarihceKolonlari = [
    { title: t("tarihSaat"), dataIndex: "tarih", key: "tarih", width: 170, render: (tarih) => formatTarihSaatDegeri(tarih) },
    { title: t("islemYapan"), dataIndex: "islemYapanIsim", key: "islemYapanIsim", ellipsis: true, render: (text) => text || "-" },
    { title: t("durum"), dataIndex: "durum", key: "durum", width: 160, render: (value) => <DurumTag durum={value} getTanim={getMalzemeTalepDurumTanimi} /> },
  ];

  const footer = duzenlenebilir
    ? [
        <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
          {t("iptal")}
        </Button>,
        <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={loading}>
          {t("kaydet")}
        </Button>,
      ]
    : [
        <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
          {t("kapat")}
        </Button>,
      ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("malzemeTalepDetayi")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("malzemeTalepDetayiAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={900} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <span style={{ ...sectionTitleStyle, marginTop: "8px" }}>{t("talepOzeti")}</span>
            <div className="grid" style={{ ...cardStyle, padding: "14px 16px", rowGap: "12px", columnGap: "16px", marginBottom: "24px", backgroundColor: "#fafafa" }}>
              <OzetAlani label={t("talepNo")}>{talep?.talepNo}</OzetAlani>
              <OzetAlani label={t("isEmriNo")}>{talep?.servisNo}</OzetAlani>
              <OzetAlani label={t("talepTarihi")}>{talep ? formatTarihSaatDegeri(talep.talepTarih) : null}</OzetAlani>
              <OzetAlani label={t("talepEden")}>{talep?.talepEden}</OzetAlani>
              <OzetAlani label={t("gerekliTarih")}>{talep ? formatDateByLocale(talep.gerekliTarih) : null}</OzetAlani>
              <OzetAlani label={t("durum")}>{guncelDurum ? <DurumTag durum={guncelDurum} getTanim={getMalzemeTalepDurumTanimi} /> : null}</OzetAlani>
            </div>

            <span style={sectionTitleStyle}>{t("malzemeBilgileri")}</span>
            <div className="grid" style={{ rowGap: "16px", columnGap: "16px", marginBottom: "24px" }}>
              <FormField span={6} label={t("malzemeKodu")} required>
                <MalzemeTablo name="malzemeKod" required disabled={!duzenlenebilir} placeholder={t("malzemeSeciniz")} onSelect={handleMalzemeSelect} onClear={handleMalzemeClear} />
              </FormField>

              <FormField span={6} label={t("malzemeAdi")} required>
                <TextInput name="malzemeTanim" readonly checked={!duzenlenebilir} />
              </FormField>

              <FormField span={4} label={t("talepMiktari")} required>
                <NumberInput name="talepMiktar" required min={0} checked={!duzenlenebilir} />
              </FormField>

              <FormField span={4} label={t("kullanilanMiktar")} hint={t("fiiliKullanimSonrasiOlusur")}>
                <NumberInput name="kullanilanMiktar" checked />
              </FormField>

              {/* KodIDSelectbox pasif yapılamadığı için kilitli talepte seçili değer salt okunur alanda gösterilir */}
              <FormField span={4} label={t("birim")} required>
                {duzenlenebilir ? (
                  <KodIDSelectbox name1="birim" kodID={MALZEME_BIRIM_KOD_ID} isRequired placeholder={t("seciniz")} inputWidth="100%" addHide />
                ) : (
                  <TextInput name="birim" checked />
                )}
              </FormField>

              <FormField span={6} label={t("gerekliTarih")} required>
                <DateInput name="gerekliTarih" required requiredMessage={t("alanBosBirakilamaz")} checked={!duzenlenebilir} style={{ width: "100%" }} />
              </FormField>

              <FormField span={6} label={t("talepNedeni")} required>
                {duzenlenebilir ? (
                  <KodIDSelectbox name1="talepNeden" kodID={MALZEME_TALEP_NEDEN_KOD_ID} isRequired placeholder={t("seciniz")} inputWidth="100%" />
                ) : (
                  <TextInput name="talepNeden" checked />
                )}
              </FormField>

              <FormField span={12} label={t("ilgiliIs")}>
                {duzenlenebilir ? <AtananIsSelectbox name1="ilgiliIs" isEmriId={isEmriId} /> : <TextInput name="ilgiliIs" checked />}
              </FormField>

              <FormField span={12} label={t("aciklama")}>
                <div style={sayacAlaniStyle}>
                  <Textarea name="aciklama" rows={3} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount checked={!duzenlenebilir} placeholder={t("malzemeTalepAciklamaPlaceholder")} />
                </div>
              </FormField>
            </div>

            <span style={sectionTitleStyle}>{t("durumTarihcesi")}</span>
            <Table size="small" bordered columns={tarihceKolonlari} dataSource={durumTarihcesi} pagination={false} />
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

MalzemeTalepDetayiModal.propTypes = {
  open: PropTypes.bool,
  isEmriId: PropTypes.number,
  talepId: PropTypes.number,
  durum: PropTypes.number,
  readOnly: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MalzemeTalepDetayiModal;
