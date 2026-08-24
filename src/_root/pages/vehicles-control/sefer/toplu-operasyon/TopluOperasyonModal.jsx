import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, message } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { t } from "i18next";
import dayjs from "dayjs";
import { BulkInsertExpeditionsService } from "../../../../../api/services/vehicles/operations_services";
import { BORDER_COLOR } from "../components/uiStyles";
import AdimGostergesi from "./AdimGostergesi";
import AracSecimi from "./AracSecimi";
import HareketlerAdimi from "./HareketlerAdimi";
import OlusturAdimi from "./OlusturAdimi";
import OnizlemeAdimi from "./OnizlemeAdimi";
import OrtakBilgiler from "./OrtakBilgiler";
import OzetPaneli from "./OzetPaneli";
import { buildExpeditionBody } from "./istekGovdesi";

// Sihirbazın adımları; gösterge ve ileri/geri hareketi bu sırayı izler
const STEP_KEYS = ["adimAracSecimi", "adimOrtakOperasyonBilgileri", "adimHareketler", "adimOnizleme", "adimOlustur"];

const ARAC_SECIMI_ADIMI = 1;
const ORTAK_BILGILER_ADIMI = 2;
const HAREKETLER_ADIMI = 3;
const ONIZLEME_ADIMI = 4;
const OLUSTUR_ADIMI = 5;

// Diğer operasyon modallarıyla aynı ölçüde, ortada duran pencere
const MODAL_WIDTH = 1400;

const headerStyle = {
  backgroundColor: "white",
  borderBottom: `1px solid ${BORDER_COLOR}`,
  padding: "12px 24px 0",
  flexShrink: 0,
};

const bodyStyle = {
  flex: 1,
  minHeight: 0,
  overflow: "auto",
  padding: "20px 24px",
  display: "flex",
  gap: "20px",
  alignItems: "flex-start",
};

const footerStyle = {
  backgroundColor: "white",
  borderTop: `1px solid ${BORDER_COLOR}`,
  padding: "12px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
};

const TopluOperasyonModal = ({ open, onClose, onRefresh }) => {
  const [activeStep, setActiveStep] = useState(ARAC_SECIMI_ADIMI);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  // Hareketler henüz servise gönderilmez; son adımda `expeditionOperations` olarak gidecek
  const [hareketler, setHareketler] = useState([]);
  const [saving, setSaving] = useState(false);

  // Ortak operasyon bilgileri adımları arasında korunsun diye form sihirbaz seviyesinde tutulur
  const methods = useForm();
  const { reset } = methods;

  // Sihirbaz her açılışta baştan başlar
  useEffect(() => {
    if (!open) return;

    setActiveStep(ARAC_SECIMI_ADIMI);
    setSelectedRowKeys([]);
    setSelectedVehicles([]);
    setHareketler([]);
    // Operasyon tarihi bugünle açılır; kullanıcı isterse değiştirir
    reset({ cikisTarih: dayjs() });
  }, [open, reset]);

  const steps = STEP_KEYS.map((key, index) => ({ no: index + 1, label: t(key) }));

  const handleSelectionChange = (keys, rows) => {
    setSelectedRowKeys(keys);
    setSelectedVehicles(rows);
  };

  const handleBack = () => {
    if (activeStep === ARAC_SECIMI_ADIMI) {
      onClose();
      return;
    }

    setActiveStep((step) => step - 1);
  };

  const handleNext = async () => {
    if (activeStep === ORTAK_BILGILER_ADIMI) {
      const isValid = await methods.trigger();
      // Güzergah global bileşeni zorunluluk prop'u almadığı için değeri burada kontrol edilir (bkz. RULES.md 12.0.1)
      const guzergahSecildi = Boolean(methods.getValues("guzergahId"));

      if (!isValid || !guzergahSecildi) {
        message.error(t("zorunluAlanlariDoldurunuz"));
        return;
      }
    }

    setActiveStep((step) => Math.min(step + 1, STEP_KEYS.length));
  };

  // Araç seçimi adımında en az bir araç seçilmeden ilerlenemez
  const nextDisabled = activeStep === ARAC_SECIMI_ADIMI && selectedRowKeys.length === 0;

  const renderStep = () => {
    if (activeStep === ARAC_SECIMI_ADIMI) {
      return <AracSecimi selectedRowKeys={selectedRowKeys} onSelectionChange={handleSelectionChange} />;
    }

    if (activeStep === ORTAK_BILGILER_ADIMI) {
      return <OrtakBilgiler />;
    }

    if (activeStep === HAREKETLER_ADIMI) {
      return <HareketlerAdimi hareketler={hareketler} onChange={setHareketler} />;
    }

    if (activeStep === ONIZLEME_ADIMI) {
      return <OnizlemeAdimi araclar={selectedVehicles} hareketler={hareketler} />;
    }

    return <OlusturAdimi aracSayisi={selectedVehicles.length} hareketSayisi={hareketler.length} />;
  };

  // Kayıtlar yalnızca son adımda, tek istekle oluşturulur
  const handleCreate = async () => {
    setSaving(true);

    try {
      const body = {
        aracIds: selectedVehicles.map((vehicle) => vehicle.aracId),
        expedition: buildExpeditionBody(methods.getValues()),
        expeditionOperations: hareketler.map((hareket) => hareket.body),
      };

      const response = await BulkInsertExpeditionsService(body);
      const statusCode = response?.data?.statusCode;

      if ([200, 201, 202, 204].includes(statusCode)) {
        message.success(t("islemBasarili"));
        onRefresh();
        onClose();
        return;
      }

      message.error(statusCode === 401 ? t("buIslemiYapmayaYetkinizYok") : t("islemBasarisiz"));
    } catch (error) {
      console.error("Error creating expeditions:", error);
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  };

  const primaryButton =
    activeStep === OLUSTUR_ADIMI ? (
      <Button type="primary" onClick={handleCreate} loading={saving}>
        <CheckOutlined /> {t("adimOlustur")}
      </Button>
    ) : (
      <Button type="primary" onClick={handleNext} disabled={nextDisabled}>
        {t("ileri")} <ArrowRightOutlined />
      </Button>
    );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      maskClosable={false}
      width={MODAL_WIDTH}
      centered
      styles={{
        content: { padding: 0, overflow: "hidden", maxHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column" },
        body: { padding: 0, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", backgroundColor: "#f5f6fa" },
      }}
    >
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={handleBack} />
            <span style={{ fontSize: "18px", fontWeight: 600, color: "#141414" }}>{t("yeniOperasyonOlustur")}</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button onClick={onClose} icon={<CloseOutlined />}>
              {t("iptal")}
            </Button>
            {primaryButton}
          </div>
        </div>

        <AdimGostergesi steps={steps} activeStep={activeStep} />
      </div>

      <div style={bodyStyle}>
        <aside style={{ width: "320px", flexShrink: 0 }}>
          <OzetPaneli aracSayisi={selectedVehicles.length} hareketSayisi={hareketler.length} bilgiNotu={t("aracSecimiBilgiNotu")} />
        </aside>
        <main style={{ flex: 1, minWidth: 0 }}>
          <FormProvider {...methods}>{renderStep()}</FormProvider>
        </main>
      </div>

      <div style={footerStyle}>
        <Button onClick={handleBack} icon={<ArrowLeftOutlined />} disabled={activeStep === ARAC_SECIMI_ADIMI}>
          {t("geri")}
        </Button>
        {primaryButton}
      </div>
    </Modal>
  );
};

TopluOperasyonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default TopluOperasyonModal;
