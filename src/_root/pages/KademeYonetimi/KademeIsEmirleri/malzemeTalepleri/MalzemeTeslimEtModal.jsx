import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Alert, Button, Modal, Spin, message } from "antd";
import { t } from "i18next";
import {
  GetMaterialRequestItemByIdService,
  GetServiceWorkCardByIdService,
  GetVehicleServiceByIdService,
  UpdateMaterialRequestQuantityUsedService,
} from "../../../../../api/services/isEmri/services";
import { GetMaterialListByWareHouseIdService } from "../../../../../api/services/malzeme/services";
import { formatDateAndTimeForApi } from "../../../../../utils/dateUtils";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import MalzemeDepoSelectbox from "../../../../components/MalzemeDepoSelectbox";
import KademePersonelSelectbox from "../../../../components/KademePersonelSelectbox";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, hintStyle, labelStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import { formatMiktar, getKalanMiktar } from "../../MalzemeTalepleriTakipPaneli/constants";
import { getIsKartiKilitMesajKey, isMalzemeTeslimEdilebilir, isSuccessResponse, toNullable, toNullableId } from "../constants";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const ozetDegerStyle = { fontSize: "14px", fontWeight: 600, color: "#141414", lineHeight: "20px", wordBreak: "break-word" };

// Teslim edilecek miktarın yanındaki birim kutusu (tasarımdaki "ADET" eki)
const birimKutusuStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0 12px",
  border: "1px solid #d9d9d9",
  borderLeft: "none",
  borderRadius: "0 6px 6px 0",
  backgroundColor: "#fafafa",
  color: "#8c8c8c",
  whiteSpace: "nowrap",
};

// Teslim miktarı teslim bekleyen miktarla, teslim alan talep eden personelle, teslim zamanı şu anla açılır; kullanıcı değiştirebilir
const getDefaultValues = (talep = null) => ({
  stoklu: false,
  cikisDepo: null,
  cikisDepoID: null,
  teslimMiktari: talep ? getKalanMiktar(talep.talepMiktar, talep.kullanilanMiktar) || null : null,
  teslimAlanPersonel: toNullable(talep?.talepEden),
  teslimAlanPersonelID: toNullableId(talep?.personelId),
  teslimTarih: dayjs(),
  teslimSaat: dayjs(),
  aciklama: null,
});

const OzetAlani = ({ label, children, span = 4, vurgulu = false }) => (
  <div className={`col-span-${span} flex flex-col`} style={{ gap: "2px", minWidth: 0 }}>
    <span style={hintStyle}>{label}</span>
    <span style={vurgulu ? { ...ozetDegerStyle, color: "#1677ff" } : ozetDegerStyle}>{children || "-"}</span>
  </div>
);

OzetAlani.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  span: PropTypes.number,
  vurgulu: PropTypes.bool,
};

// Hata halinde detay servisleri { status: false, message } gövdesi döner
const getGovde = (response) => (response?.data?.status === false ? null : response?.data || null);

// Talebin bağlı işi ve iş emri birlikte okunur: iş emri özetteki İş Emri / Plaka için, ikisi de teslim kilidi için gerekir
const getTalepBaglami = async (talep, isEmriId) => {
  const servisSiraNo = isEmriId || talep.servisSiraNo;
  const [kartResponse, servisResponse] = await Promise.all([
    talep.isId ? GetServiceWorkCardByIdService(talep.isId) : null,
    servisSiraNo ? GetVehicleServiceByIdService(servisSiraNo) : null,
  ]);
  return { kart: getGovde(kartResponse), isEmri: getGovde(servisResponse) };
};

// Teslim yalnızca onaylanmış/kısmen teslim edilmiş talepte, bağlı iş kapalı değilken ve iş emri kilitli değilken yapılabilir
const getTeslimKilitMesajKey = (durum, { kart, isEmri }) => {
  if (!isMalzemeTeslimEdilebilir(durum)) return "malzemeTalebiTeslimEdilemez";
  return getIsKartiKilitMesajKey(kart ? kart.durum : null, isEmri?.durumBilgisi);
};

// Seçilen çıkış deposundaki kullanılabilir stok; malzeme o depoda yoksa stok 0'dır
const getDepoStogu = async (depoId, talep) => {
  const response = await GetMaterialListByWareHouseIdService(0, 0, talep.malzemeKod || "", depoId);
  const malzemeler = Array.isArray(response?.data?.materialList) ? response.data.materialList : [];
  const depodakiMalzeme = malzemeler.find((malzeme) => malzeme.malzemeId === talep.malzemeId);
  return Number(depodakiMalzeme?.stokMiktar) || 0;
};

// Onaylanan malzeme talebinin tamamını veya bir bölümünü teslim eder (tasarım: "Malzeme Teslim Et").
// Girilen miktar talebin daha önce teslim edilen miktarına eklenir (API alanı kullanilanMiktar);
// backend talep durumunu (Kısmi Teslim Edildi / Teslim Edildi) günceller ve malzeme hareketini oluşturur.
// Teslim alan personel iş emrinin kademesindeki personellerden seçilir (talepteki "Talep Eden" ile aynı liste).
// GetById yanıtında durum gelmeyebildiği için durum açan listedeki satırdan da verilir.
const MalzemeTeslimEtModal = ({ open, isEmriId, aracId, talepId, durum, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [talep, setTalep] = useState(null);
  const [isEmri, setIsEmri] = useState(null);
  const [kilitMesajKey, setKilitMesajKey] = useState(null);
  const [depoStogu, setDepoStogu] = useState(null);

  const methods = useForm({ defaultValues: getDefaultValues() });
  const { control, handleSubmit, reset, setValue, watch, clearErrors } = methods;
  const stoklu = useWatch({ control, name: "stoklu" });
  const cikisDepoID = useWatch({ control, name: "cikisDepoID" });
  const teslimMiktari = useWatch({ control, name: "teslimMiktari" });

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
    setKilitMesajKey(null);

    const yukle = async () => {
      const response = await GetMaterialRequestItemByIdService(talepId);
      if (ignore) return;
      const talepDetayi = response.data;
      setTalep(talepDetayi);
      reset(getDefaultValues(talepDetayi));

      const baglam = await getTalepBaglami(talepDetayi, isEmriId);
      if (ignore) return;
      setIsEmri(baglam.isEmri);
      setKilitMesajKey(getTeslimKilitMesajKey(talepDetayi.durum ?? durum, baglam));
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
  }, [open, talepId, durum, isEmriId, reset]);

  // Stoklu teslimde seçilen deponun kullanılabilir stoğu çıkış deposunun altında gösterilir
  useEffect(() => {
    if (!open || !stoklu || !cikisDepoID || !talep?.malzemeId) {
      setDepoStogu(null);
      return undefined;
    }

    let ignore = false;
    getDepoStogu(cikisDepoID, talep)
      .then((stok) => {
        if (!ignore) setDepoStogu(stok);
      })
      .catch(() => {
        if (!ignore) setDepoStogu(null);
      });

    return () => {
      ignore = true;
    };
  }, [open, stoklu, cikisDepoID, talep]);

  const closeModal = () => {
    setTalep(null);
    setIsEmri(null);
    setKilitMesajKey(null);
    setDepoStogu(null);
    reset(getDefaultValues());
    onClose();
  };

  const birim = talep?.malzemeBirim || "";
  const kalanMiktar = talep ? getKalanMiktar(talep.talepMiktar, talep.kullanilanMiktar) : 0;
  const miktar = Number(teslimMiktari) || 0;
  const miktarGecerli = miktar > 0 && miktar <= kalanMiktar;
  const tamamiTeslimEdilecek = miktarGecerli && miktar === kalanMiktar;
  const isEmriPlaka = [isEmri?.servisNo || talep?.servisNo, isEmri?.plaka].filter(Boolean).join(" · ");

  const handleInvalid = (errors) => {
    const yalnizcaDepoEksik = Object.keys(errors).every((alan) => alan === "cikisDepo");
    message.warning(t(yalnizcaDepoEksik ? "stokluMalzemedeCikisDeposuZorunlu" : "zorunluAlanlariDoldurun"));
  };

  const onSubmit = handleSubmit(async (values) => {
    if (kilitMesajKey) return;

    // Teslim miktarı 0'dan büyük, teslim bekleyen miktardan büyük olmayan bir tam sayı olmalıdır (servis tam sayı bekler)
    const teslimEdilecek = Number(values.teslimMiktari);
    if (!Number.isInteger(teslimEdilecek) || teslimEdilecek <= 0 || teslimEdilecek > kalanMiktar) {
      message.warning(t("teslimMiktariGecersiz", { kalan: formatMiktar(kalanMiktar, birim) }));
      return;
    }

    setSaving(true);
    try {
      const response = await UpdateMaterialRequestQuantityUsedService({
        siraNo: talepId,
        talepMiktar: Number(talep.talepMiktar) || 0,
        kullanilanMiktar: teslimEdilecek,
        aracId: aracId || talep.aracId || 0,
        malzemeId: talep.malzemeId || 0,
        servisSiraNo: isEmriId || talep.servisSiraNo || 0,
        birimKodId: talep.birimKodId || 0,
        cikisDepoSiraNo: values.stoklu ? values.cikisDepoID || 0 : 0,
        stoklu: Boolean(values.stoklu),
        aciklama: values.aciklama || null,
        teslimAlanPersonelId: values.teslimAlanPersonelID || 0,
        teslimTarih: formatDateAndTimeForApi(values.teslimTarih, values.teslimSaat),
      });

      if (isSuccessResponse(response)) {
        message.success(t("malzemeTeslimEdildi"));
        closeModal();
        onSaved();
      } else {
        message.error(response?.data?.message || t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  }, handleInvalid);

  const teslimPasif = loading || !talep || Boolean(kilitMesajKey);

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("vazgec")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={teslimPasif}>
      {t(tamamiTeslimEdilecek ? "tamaminiTeslimEt" : "teslimEt")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("malzemeTeslimEt")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("malzemeTeslimEtAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={760} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            {kilitMesajKey && <Alert type="warning" showIcon message={t(kilitMesajKey)} style={{ marginTop: "8px", marginBottom: "12px" }} />}

            <span style={{ ...sectionTitleStyle, marginTop: "8px" }}>{t("talepOzeti")}</span>
            <div style={{ ...cardStyle, padding: "14px 16px", marginBottom: "24px", backgroundColor: "#fafafa" }}>
              <div className="grid" style={{ rowGap: "12px", columnGap: "16px" }}>
                <OzetAlani span={3} label={t("talepNo")}>
                  {talep?.talepNo}
                </OzetAlani>
                <OzetAlani span={3} label={t("isEmriPlaka")}>
                  {isEmriPlaka}
                </OzetAlani>
                <OzetAlani span={3} label={t("malzemeKodu")}>
                  {talep?.malzemeKod}
                </OzetAlani>
                <OzetAlani span={3} label={t("malzemeTanimi")}>
                  {talep?.malzemeTanim}
                </OzetAlani>
              </div>
              <div style={{ borderTop: "1px solid #f0f0f0", margin: "12px 0" }} />
              <div className="grid" style={{ rowGap: "12px", columnGap: "16px" }}>
                <OzetAlani label={t("talepEdilen")}>{talep ? formatMiktar(talep.talepMiktar, birim) : null}</OzetAlani>
                <OzetAlani label={t("teslimEdilen")}>{talep ? formatMiktar(talep.kullanilanMiktar, birim) : null}</OzetAlani>
                <OzetAlani label={t("teslimBekleyenMiktar")} vurgulu>
                  {talep ? formatMiktar(kalanMiktar, birim) : null}
                </OzetAlani>
              </div>
            </div>

            <span style={sectionTitleStyle}>{t("teslimBilgileri")}</span>
            <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
              <div className="col-span-12 flex" style={{ alignItems: "center", gap: "8px" }}>
                <CheckboxInput name="stoklu" />
                <span style={{ ...labelStyle, color: "#141414" }}>{t("stokluMalzeme")}</span>
              </div>

              <FormField span={6} label={t("cikisDeposu")} required={stoklu}>
                <MalzemeDepoSelectbox name1="cikisDepo" disabled={!stoklu} isRequired={stoklu} />
                {depoStogu !== null && (
                  <span style={{ fontSize: "12px", color: depoStogu > 0 ? "#16a34a" : "#ff4d4f" }}>{t("kullanilabilirStok", { miktar: formatMiktar(depoStogu, birim) })}</span>
                )}
              </FormField>

              <FormField span={6} label={t("teslimEdilecekMiktar")} required hint={t("teslimMiktariIpucu")}>
                <div className="flex" style={{ alignItems: "stretch" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <NumberInput name="teslimMiktari" required min={0} />
                  </div>
                  {birim && <span style={birimKutusuStyle}>{birim}</span>}
                </div>
              </FormField>

              <FormField span={6} label={t("teslimAlanPersonel")} required>
                <KademePersonelSelectbox name1="teslimAlanPersonel" kademeId={toNullableId(isEmri?.kademeId)} isRequired />
              </FormField>

              <FormField span={6} label={t("teslimTarihiVeSaati")} required>
                <div className="flex" style={{ gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <DateInput name="teslimTarih" required requiredMessage={t("alanBosBirakilamaz")} style={{ width: "100%" }} />
                  </div>
                  <TimeInput name="teslimSaat" style={{ width: "110px" }} />
                </div>
              </FormField>

              <FormField span={12} label={t("aciklama")}>
                <div style={sayacAlaniStyle}>
                  <Textarea name="aciklama" rows={3} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount placeholder={t("teslimAciklamaPlaceholder")} />
                </div>
              </FormField>
            </div>

            {talep && !kilitMesajKey && miktarGecerli && (
              <Alert
                type="info"
                showIcon
                message={
                  tamamiTeslimEdilecek
                    ? t("teslimTamamiBilgi", { miktar: formatMiktar(kalanMiktar, birim) })
                    : t("teslimKismiBilgi", { miktar: formatMiktar(miktar, birim), kalan: formatMiktar(getKalanMiktar(kalanMiktar, miktar), birim) })
                }
              />
            )}
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

MalzemeTeslimEtModal.propTypes = {
  open: PropTypes.bool,
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  talepId: PropTypes.number,
  durum: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default MalzemeTeslimEtModal;
