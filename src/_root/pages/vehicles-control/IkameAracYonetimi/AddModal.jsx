import React, { useEffect, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal, Select } from "antd";
import { PlusOutlined, LoadingOutlined, ArrowRightOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../api/http";
import PlakaSelectbox from "../../../../_root/components/PlakaSelectbox";
import DateInput from "../../../../_root/components/form/date/DateInput";
import NumberInput from "../../../../_root/components/form/inputs/NumberInput";
import TextInput from "../../../../_root/components/form/inputs/TextInput";
import Textarea from "../../../../_root/components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../_root/components/KodIDSelectbox";
import YakitTipSelectbox from "../../../../_root/components/YakitTipSelectbox";
import SigortaSelectbox from "../../../../_root/components/SigortaSelectbox";

const AddModal = ({ onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    plaka: null,
    plakaID: null,
    ikamePlaka: "",
    marka: null,
    markaID: null,
    baslangicTarih: null,
    bitisTarih: null,
    gun: 0,
    tedarikci: "",
    aracTipKodId: null,
    aracTipKodIdID: null,
    km: 0,
    nedenKodId: null,
    nedenKodIdID: null,
    kmLimit: 0,
    hgs: null,
    sigorta: null,
    sigortaID: null,
    yakitTip: null,
    yakitTipID: null,
    yakitPolitikasi: null,
    aciklama: "",
  };

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, watch, setValue, control } = methods;

  const baslangicTarih = watch("baslangicTarih");
  const bitisTarih = watch("bitisTarih");

  useEffect(() => {
    if (baslangicTarih && bitisTarih) {
      const start = dayjs(baslangicTarih);
      const end = dayjs(bitisTarih);
      const diff = end.diff(start, "day");
      setValue("gun", diff >= 0 ? diff : 0);
    } else {
      setValue("gun", 0);
    }
  }, [baslangicTarih, bitisTarih, setValue]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      aracId: values.plakaID || 0,
      gun: values.gun || 0,
      ikamePlaka: values.ikamePlaka || "",
      ikameMarka: values.marka || "",
      markaId: values.markaID || 0,
      baslangicTarih: values.baslangicTarih ? dayjs(values.baslangicTarih).toISOString() : null,
      bitisTarih: values.bitisTarih ? dayjs(values.bitisTarih).toISOString() : null,
      tedarikci: values.tedarikci || "",
      aracTipKodId: values.aracTipKodIdID || 0,
      km: values.km || 0,
      nedenKodId: values.nedenKodIdID || 0,
      sigortaId: values.sigortaID || 0,
      kmLimit: values.kmLimit || 0,
      hgs: values.hgs || "",
      yakitTipId: values.yakitTipID || 0,
      yakitPolitikasi: values.yakitPolitikasi || "",
      aciklama: values.aciklama || "",
    };

    setLoading(true);
    AxiosInstance.post("ReplacementVehicle/AddReplacementVehicle", body)
      .then((res) => {
        if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201 || res?.data?.statusCode === 202) {
          message.success(t("islemBasarili"));
          onRefresh();
          setIsOpen(false);
          reset();
        } else {
          message.error(t("islemBasarisiz"));
        }
      })
      .catch(() => {
        message.error(t("islemBasarisiz"));
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const footer = [
    loading ? (
      <Button key="loading" className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsOpen(false);
        reset();
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Button
        className="btn primary-btn"
        onClick={() => {
          reset();
          setIsOpen(true);
        }}
      >
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("ikameAracEkleme")}
        open={isOpen}
        destroyOnClose
        onCancel={() => {
          setIsOpen(false);
          reset();
        }}
        maskClosable={false}
        footer={footer}
        width={900}
      >
        <FormProvider {...methods}>
          <form>
            {/* Araç İlişkisi */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("aracIliskisi")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <div className="grid gap-1">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("asilArac")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <PlakaSelectbox name1="plaka" isRequired />
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ paddingTop: 20 }}>
                  <ArrowRightOutlined style={{ fontSize: 18, color: "#999" }} />
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("ikameArac")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextInput name="ikamePlaka" required />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("marka")}</label>
                    <TextInput name="marka" />
                  </div>
                </div>
              </div>
            </div>

            {/* İkame Süresi */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("ikameSuresi")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <div className="grid gap-1">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("baslangic")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <DateInput name="baslangicTarih" required />
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ paddingTop: 20 }}>
                  <ArrowRightOutlined style={{ fontSize: 18, color: "#999" }} />
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("bpitisTarihi")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <DateInput name="bitisTarih" required />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("sureGun")}</label>
                    <NumberInput name="gun" checked />
                  </div>
                </div>
              </div>
            </div>

            {/* Operasyon */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("operasyon")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <div className="grid gap-1">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("tedarikci")}</label>
                    <TextInput name="tedarikci" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("aracTip")}</label>
                    <KodIDSelectbox name1="aracTipKodId" kodID={100} />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("aracKm")}</label>
                    <NumberInput name="km" />
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("verilisNedeni")}</label>
                    <KodIDSelectbox name1="nedenKodId" kodID={914} />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("kmLimiti")}</label>
                    <NumberInput name="kmLimit" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("hgsEtiketi")}</label>
                    <Controller
                      name="hgs"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          allowClear
                          placeholder={t("seciniz")}
                          options={[
                            { label: t("var"), value: "Var" },
                            { label: t("yok"), value: "Yok" },
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("policeNo")}</label>
                    <SigortaSelectbox name1="sigorta" vehicleIdField="plakaID" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("yakitTip")}</label>
                    <YakitTipSelectbox name1="yakitTip" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("yakitPolitikasi")}</label>
                    <Controller
                      name="yakitPolitikasi"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          allowClear
                          placeholder={t("seciniz")}
                          options={[
                            { label: t("ayniSeviye"), value: "ayniSeviye" },
                            { label: t("fullFull"), value: "fullFull" },
                            { label: t("serbest"), value: "serbest" },
                            { label: t("bosBos"), value: "bosBos" },
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div style={{ marginBottom: 8 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("aciklama")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <Textarea name="aciklama" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  onRefresh: PropTypes.func,
};

export default AddModal;
