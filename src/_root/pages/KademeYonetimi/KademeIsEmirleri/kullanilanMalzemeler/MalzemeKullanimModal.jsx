import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Alert, Button, Modal, Spin, Tabs, message } from "antd";
import { CalculatorOutlined, FileTextOutlined, InboxOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { AddServiceMaterialMovementService, GetMaterialMovementByIdService, UpdateServiceMaterialMovementService } from "../../../../../api/services/isEmri/services";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import DateInput from "../../../../components/form/date/DateInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import AtananIsSelectbox from "../../../../components/AtananIsSelectbox";
import MalzemeTalepSelectbox from "../../../../components/MalzemeTalepSelectbox";
import MalzemeDepoSelectbox from "../../../../components/MalzemeDepoSelectbox";
import MalzemeTablo from "../../../../components/MalzemeTablo";
import DepoMalzemeTablo from "../../../../components/DepoMalzemeTablo";
import FormField from "../../KademeTanimlari/components/FormField";
import { hintStyle, labelStyle } from "../../KademeTanimlari/components/uiStyles";
import { MALZEME_BIRIM_KOD_ID, isSuccessResponse } from "../constants";
import {
  buildMalzemeKullanimEklemeBody,
  buildMalzemeKullanimGuncellemeBody,
  getBagliIsTanimi,
  getDefaultMalzemeKullanimValues,
  hesaplaMalzemeTutarlari,
  mapMalzemeKullanimToFormValues,
} from "./malzemeKullanimHelpers";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 500;

// Ant Design karakter sayacını metin alanının altına taşırdığı için alanın altında yer bırakılır
const sayacAlaniStyle = { paddingBottom: "22px" };

const ozetKutusuStyle = {
  border: "1px solid #f0f0f0",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
  padding: "10px 14px",
  fontSize: "13px",
};

const ozetSatiriStyle = { display: "flex", justifyContent: "space-between", padding: "2px 0" };

const formatTutar = (value) => formatNumberWithLocale(value, 2, 2);

// Malzeme seçimi stoklu seçimine ve çıkış deposuna bağlı olduğu için bunlar değişince seçim temizlenir
const clearMalzemeSecimi = (setValue) => {
  setValue("malzemeKod", null);
  setValue("malzemeId", null);
  setValue("malzemeTanim", null);
  setValue("malzemeTip", null);
};

// İş emrinde kullanılan malzemeyi ekler veya günceller.
// kayitId verilirse güncelleme, kopyalanacakId verilirse o kaydın bilgileriyle yeni kayıt açılır.
// Güncellemede stoklu, depo, malzeme ve malzeme tipi backend'de değişmediği için kilitlidir.
const MalzemeKullanimModal = ({ open, kayitId, kopyalanacakId, isEmriId, aracId, onClose, onSaved }) => {
  const [activeTab, setActiveTab] = useState("malzeme");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [detay, setDetay] = useState(null);

  const isUpdate = Boolean(kayitId);
  const detayId = kayitId || kopyalanacakId;

  const methods = useForm({ defaultValues: getDefaultMalzemeKullanimValues() });
  const { control, handleSubmit, reset, setValue, watch, clearErrors } = methods;

  const [stoklu, cikisDepoID, miktar, fiyat, kdvOran, indirimOran, digerGiderler] = useWatch({
    control,
    name: ["stoklu", "cikisDepoID", "miktar", "fiyat", "kdvOran", "indirimOran", "digerGiderler"],
  });
  const tutarlar = hesaplaMalzemeTutarlari({ miktar, fiyat, kdvOran, indirimOran, digerGiderler });

  useEffect(() => {
    setValue("toplam", tutarlar.toplam);
  }, [tutarlar.toplam, setValue]);

  useEffect(() => {
    if (!open) return undefined;

    setActiveTab("malzeme");
    if (!detayId) {
      reset(getDefaultMalzemeKullanimValues());
      return undefined;
    }

    let ignore = false;
    setLoading(true);

    GetMaterialMovementByIdService(detayId)
      .then(async (res) => {
        const bagliIsTanimi = await getBagliIsTanimi(isEmriId, res.data.isId);
        if (ignore) return;
        setDetay(res.data);
        reset(mapMalzemeKullanimToFormValues(res.data, bagliIsTanimi));
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
  }, [open, detayId, isEmriId, reset]);

  // Yalnızca kullanıcı stoklu seçimini değiştirdiğinde depo ve malzeme temizlenir; kayıt yüklenirken (reset) temizlenmez
  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      if (name !== "stoklu" || type !== "change") return;
      setValue("cikisDepo", null);
      setValue("cikisDepoID", null);
      clearErrors("cikisDepo");
      clearMalzemeSecimi(setValue);
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, clearErrors]);

  const closeModal = () => {
    setDetay(null);
    reset(getDefaultMalzemeKullanimValues());
    onClose();
  };

  const handleMalzemeSelect = (malzeme) => {
    setValue("malzemeKod", malzeme.malzemeKod || null, { shouldValidate: true });
    setValue("malzemeId", malzeme.malzemeId || null);
    setValue("malzemeTanim", malzeme.tanim || null, { shouldValidate: true });
    setValue("malzemeTip", malzeme.malzemeTipKodText || null);
    // Birim ve birim fiyatı malzeme kartından gelir; kullanıcı gerekirse değiştirebilir
    setValue("birim", malzeme.birim || null, { shouldValidate: true });
    setValue("birimID", malzeme.birimKodId || null);
    setValue("fiyat", malzeme.fiyat || 0);
  };

  // Zorunlu alanların tümü ilk sekmede olduğu için eksik alan varsa o sekmeye dönülür
  const handleInvalid = (errors) => {
    setActiveTab("malzeme");
    const yalnizcaDepoEksik = Object.keys(errors).every((alan) => alan === "cikisDepo");
    message.warning(t(yalnizcaDepoEksik ? "stokluMalzemedeCikisDeposuZorunlu" : "zorunluAlanlariDoldurun"));
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!(Number(values.miktar) > 0)) {
      setActiveTab("malzeme");
      message.warning(t("kullanilanMiktarSifirdanBuyukOlmali"));
      return;
    }

    setSaving(true);
    try {
      const response = isUpdate
        ? await UpdateServiceMaterialMovementService(buildMalzemeKullanimGuncellemeBody(values, detay, isEmriId))
        : await AddServiceMaterialMovementService(buildMalzemeKullanimEklemeBody(values, { isEmriId, aracId }));

      if (isSuccessResponse(response)) {
        message.success(t(isUpdate ? "malzemeKullanimiGuncellendi" : "malzemeKullanimiEklendi"));
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

  const malzemeSecimiKilitli = isUpdate;

  const malzemeVeKullanimTab = (
    <div className="grid" style={{ rowGap: "16px", columnGap: "16px", paddingTop: "8px" }}>
      <div className="col-span-6 flex" style={{ alignItems: "flex-end", gap: "8px", paddingBottom: "6px" }}>
        <CheckboxInput name="stoklu" checked={malzemeSecimiKilitli} />
        <span style={{ ...labelStyle, color: "#141414" }}>{t("stokluMalzeme")}</span>
      </div>

      <FormField span={6} label={t("cikisDeposu")} required={stoklu && !malzemeSecimiKilitli}>
        <MalzemeDepoSelectbox
          name1="cikisDepo"
          disabled={!stoklu || malzemeSecimiKilitli}
          isRequired={stoklu && !malzemeSecimiKilitli}
          onChange={() => clearMalzemeSecimi(setValue)}
        />
      </FormField>

      <FormField span={6} label={t("malzemeKodu")} required>
        {stoklu ? (
          <DepoMalzemeTablo
            name="malzemeKod"
            wareHouseId={cikisDepoID}
            required
            disabled={malzemeSecimiKilitli}
            placeholder={t("malzemeSeciniz")}
            onSelect={handleMalzemeSelect}
            onClear={() => clearMalzemeSecimi(setValue)}
          />
        ) : (
          <MalzemeTablo
            name="malzemeKod"
            required
            disabled={malzemeSecimiKilitli}
            placeholder={t("malzemeSeciniz")}
            onSelect={handleMalzemeSelect}
            onClear={() => clearMalzemeSecimi(setValue)}
          />
        )}
      </FormField>

      <FormField span={6} label={t("kullanilanMiktar")} required>
        <div className="flex" style={{ gap: "8px", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <NumberInput name="miktar" required min={0} formatSection="stok" formatType="miktar" />
          </div>
          <div style={{ width: "150px" }}>
            <KodIDSelectbox name1="birim" kodID={MALZEME_BIRIM_KOD_ID} isRequired placeholder={t("birim")} inputWidth="100%" addHide />
          </div>
        </div>
      </FormField>

      <FormField span={6} label={t("malzemeTanimi")} required>
        <TextInput name="malzemeTanim" required />
      </FormField>

      {/* Malzeme tipi seçilen malzemenin kartından gelir; ekleme/güncelleme servisi bu alanı kaydetmez */}
      <FormField span={6} label={t("malzemeTipi")}>
        <TextInput name="malzemeTip" checked />
      </FormField>

      <FormField span={6} label={t("bagliTalep")}>
        <MalzemeTalepSelectbox name1="bagliTalep" isEmriId={isEmriId} />
      </FormField>

      <FormField span={6} label={t("bagliIs")}>
        <AtananIsSelectbox name1="bagliIs" isEmriId={isEmriId} />
      </FormField>

      <FormField span={12} label={t("aciklama")}>
        <div style={sayacAlaniStyle}>
          <Textarea name="aciklama" rows={3} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount />
        </div>
      </FormField>
    </div>
  );

  const fiyatTab = (
    <div style={{ paddingTop: "8px" }}>
      <Alert type="info" showIcon message={t("fiyatBilgileriOpsiyonel")} style={{ marginBottom: "16px" }} />
      <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
        <FormField span={6} label={t("birimFiyati")}>
          <NumberInput name="fiyat" min={0} formatSection="stok" formatType="tutar" />
        </FormField>

        <FormField span={6} label={t("kdvOrani")}>
          <NumberInput name="kdvOran" min={0} max={100} prefix />
        </FormField>

        <FormField span={6} label={t("indirimOrani")}>
          <NumberInput name="indirimOran" min={0} max={100} prefix />
        </FormField>

        <FormField span={6} label={t("digerGiderler")}>
          <NumberInput name="digerGiderler" min={0} formatSection="stok" formatType="tutar" />
        </FormField>

        <FormField span={6} label={t("toplamTutar")} required>
          <NumberInput name="toplam" checked formatSection="stok" formatType="tutar" />
        </FormField>

        <div className="col-span-6" style={ozetKutusuStyle}>
          <div style={ozetSatiriStyle}>
            <span style={hintStyle}>{t("araToplam")}</span>
            <span>{formatTutar(tutarlar.araToplam)}</span>
          </div>
          <div style={ozetSatiriStyle}>
            <span style={hintStyle}>{t("indirimTutari")}</span>
            <span>{`- ${formatTutar(tutarlar.indirim)}`}</span>
          </div>
          <div style={ozetSatiriStyle}>
            <span style={hintStyle}>{t("kdvTutari")}</span>
            <span>{formatTutar(tutarlar.kdvTutar)}</span>
          </div>
          <div style={ozetSatiriStyle}>
            <span style={hintStyle}>{t("digerGiderler")}</span>
            <span>{formatTutar(Number(digerGiderler) || 0)}</span>
          </div>
          <div style={{ ...ozetSatiriStyle, borderTop: "1px solid #f0f0f0", marginTop: "4px", paddingTop: "6px", fontWeight: 600 }}>
            <span>{t("genelToplam")}</span>
            <span style={{ color: "#1d4ed8" }}>{formatTutar(tutarlar.toplam)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const faturaTab = (
    <div style={{ paddingTop: "8px" }}>
      <Alert type="info" showIcon message={t("faturaBilgileriOpsiyonel")} style={{ marginBottom: "16px" }} />
      <div className="grid" style={{ rowGap: "16px", columnGap: "16px" }}>
        <FormField span={6} label={t("faturaNo")}>
          <TextInput name="faturaNo" />
        </FormField>

        <FormField span={6} label={t("faturaTarihi")}>
          <DateInput name="faturaTarih" style={{ width: "100%" }} />
        </FormField>

        <FormField span={6} label={t("belgeIrsaliyeNo")}>
          <TextInput name="belgeIrsaliyeNo" />
        </FormField>

        <FormField span={6} label={t("tedarikciTedarikYeri")}>
          <TextInput name="tedarikci" />
        </FormField>

        <FormField span={12} label={t("faturaAciklamasiNot")}>
          <div style={sayacAlaniStyle}>
            <Textarea name="faturaAciklama" rows={3} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount />
          </div>
        </FormField>
      </div>
    </div>
  );

  const tabItems = [
    { key: "malzeme", label: t("malzemeVeKullanimBilgileri"), icon: <InboxOutlined />, children: malzemeVeKullanimTab },
    { key: "fiyat", label: t("fiyatBilgileri"), icon: <CalculatorOutlined />, children: fiyatTab },
    { key: "fatura", label: t("faturaBilgileri"), icon: <FileTextOutlined />, children: faturaTab },
  ];

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={loading}>
      {isUpdate ? t("guncelle") : t("kaydet")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{isUpdate ? t("malzemeKullanimiGuncelle") : t("malzemeKullanimiEkle")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{isUpdate ? t("malzemeKullanimiGuncelleAciklama") : t("malzemeKullanimiEkleAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={860} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

MalzemeKullanimModal.propTypes = {
  open: PropTypes.bool,
  kayitId: PropTypes.number,
  kopyalanacakId: PropTypes.number,
  isEmriId: PropTypes.number,
  aracId: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default MalzemeKullanimModal;
