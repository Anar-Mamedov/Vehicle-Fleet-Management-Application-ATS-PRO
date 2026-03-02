import React, { useEffect, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal, Select, Tabs, Tag, Checkbox } from "antd";
import { LoadingOutlined, ArrowRightOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../api/http";
import PlakaSelectbox from "../../../../_root/components/PlakaSelectbox";
import DateInput from "../../../../_root/components/form/date/DateInput";
import NumberInput from "../../../../_root/components/form/inputs/NumberInput";
import TextInput from "../../../../_root/components/form/inputs/TextInput";
import Textarea from "../../../../_root/components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../_root/components/KodIDSelectbox";
import MarkaSelectbox from "../../../../_root/components/MarkaSelectbox";
import YakitTipSelectbox from "../../../../_root/components/YakitTipSelectbox";
import SigortaSelectbox from "../../../../_root/components/SigortaSelectbox";
import DosyaUpload from "../../../../_root/components/Dosya/DosyaUpload";
import ResimUpload from "../../../../_root/components/Resim/ResimUpload";

const UpdateModal = ({ id, isOpen, setIsOpen, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [fetchingDetail, setFetchingDetail] = useState(false);

  const defaultValues = {
    siraNo: 0,
    plaka: null,
    plakaID: null,
    durum: true,
    gun: 0,
    ikamePlaka: "",
    marka: null,
    markaID: null,
    baslangicTarih: null,
    bitisTarih: null,
    tedarikci: "",
    aracTipKodId: null,
    aracTipKodIdID: null,
    km: 0,
    nedenKodId: null,
    nedenKodIdID: null,
    sigorta: null,
    sigortaID: null,
    kmLimit: 0,
    hgs: null,
    yakitTip: null,
    yakitTipID: null,
    yakitPolitikasi: null,
    aciklama: "",
    iadeEdildi: false,
    iadeTarihi: null,
    iadekm: 0,
    iadeAciklama: "",
  };

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, watch, setValue, control } = methods;

  const baslangicTarih = watch("baslangicTarih");
  const bitisTarih = watch("bitisTarih");
  const iadeEdildi = watch("iadeEdildi");

  const kalanGun = bitisTarih ? dayjs(bitisTarih).diff(dayjs(), "day") : 0;

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

  useEffect(() => {
    if (!isOpen || !id) {
      return;
    }

    const extractItem = (data) => {
      if (data?.item && typeof data.item === "object") {
        return data.item;
      }
      if (data?.data && typeof data.data === "object" && !Array.isArray(data.data)) {
        return data.data;
      }
      return data;
    };

    setFetchingDetail(true);

    AxiosInstance.get(`ReplacementVehicle/GetReplacementVehicleItemById?id=${id}`)
      .then((res) => {
        const item = extractItem(res.data) || {};

        reset({
          siraNo: item.siraNo ?? id ?? 0,
          plaka: item.asilPlaka || item.asilAracPlaka || null,
          plakaID: item.aracId || null,
          durum: typeof item.durum === "boolean" ? item.durum : true,
          gun: item.gun ?? item.sure ?? 0,
          ikamePlaka: item.ikamePlaka ?? "",
          marka: item.ikameMarka || item.marka || null,
          markaID: item.markaId || null,
          baslangicTarih: item.baslangicTarih ? dayjs(item.baslangicTarih) : null,
          bitisTarih: item.bitisTarih ? dayjs(item.bitisTarih) : null,
          tedarikci: item.tedarikci ?? "",
          aracTipKodId: item.aracTip || null,
          aracTipKodIdID: item.aracTipKodId || null,
          km: item.km ?? 0,
          nedenKodId: item.neden || null,
          nedenKodIdID: item.nedenKodId || null,
          sigorta: item.policeNo || null,
          sigortaID: item.sigortaId || null,
          kmLimit: item.kmLimit ?? 0,
          hgs: item.hgs || null,
          yakitTip: item.yakitTipi || item.yakitTip || null,
          yakitTipID: item.yakitTipId || null,
          yakitPolitikasi: item.yakitPolitikasi || null,
          aciklama: item.aciklama ?? "",
          iadeEdildi: item.durum === false,
          iadeTarihi: item.iadeTarihi ? dayjs(item.iadeTarihi) : null,
          iadekm: item.iadekm ?? 0,
          iadeAciklama: item.iadeAciklama ?? "",
        });
      })
      .catch(() => {
        message.error(t("veriCekmeHatasi"));
        setIsOpen(false);
      })
      .finally(() => {
        setFetchingDetail(false);
      });
  }, [id, isOpen, reset, setIsOpen]);

  const closeModal = () => {
    setIsOpen(false);
    reset(defaultValues);
  };

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: values.siraNo || id || 0,
      aracId: values.plakaID || 0,
      durum: values.iadeEdildi ? false : Boolean(values.durum),
      gun: values.gun || 0,
      ikamePlaka: values.ikamePlaka || "",
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
      iadeEdildi: Boolean(values.iadeEdildi),
      iadeTarihi: values.iadeTarihi ? dayjs(values.iadeTarihi).toISOString() : null,
      iadekm: values.iadekm || 0,
      iadeAciklama: values.iadeAciklama || "",
    };

    setLoading(true);
    AxiosInstance.post("ReplacementVehicle/UpdateReplacementVehicleItem", body)
      .then((res) => {
        if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201 || res?.data?.statusCode === 202) {
          message.success(t("islemBasarili"));
          onRefresh();
          closeModal();
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
        {t("guncelle")}
      </Button>
    ),
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("ikameAracGuncelleme")} open={isOpen} destroyOnClose onCancel={closeModal} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <form>
          <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <Tag color={iadeEdildi ? "default" : "green"}>{iadeEdildi ? t("pasif") : t("aktif")}</Tag>
            <span style={{ color: kalanGun > 0 ? "#d48806" : "red", fontWeight: 600 }}>
              {t("kalan")}: {kalanGun} {t("gun")}
            </span>
          </div>

          {fetchingDetail ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <LoadingOutlined />
            </div>
          ) : (
            <>
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
                      <MarkaSelectbox name1="marka" />
                    </div>
                  </div>
                </div>
              </div>

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
                      <KodIDSelectbox name1="aracTipKodId" kodID={202} />
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

              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("aciklama")}</h3>
                <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
                <Textarea name="aciklama" />
              </div>

              <Tabs
                defaultActiveKey="return"
                items={[
                  {
                    key: "return",
                    label: t("iadeBilgileri"),
                    children: (
                      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
                        <div style={{ marginBottom: 16 }}>
                          <Controller
                            name="iadeEdildi"
                            control={control}
                            render={({ field }) => (
                              <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                                {t("iadeEdildi")}
                              </Checkbox>
                            )}
                          />
                        </div>
                        {iadeEdildi && (
                          <div className="grid gap-1">
                            <div className="col-span-6">
                              <div className="flex flex-col gap-1">
                                <label>{t("iadeTarihi")}</label>
                                <DateInput name="iadeTarihi" />
                              </div>
                            </div>
                            <div className="col-span-6">
                              <div className="flex flex-col gap-1">
                                <label>{t("iadeKm")}</label>
                                <NumberInput name="iadekm" />
                              </div>
                            </div>
                            <div className="col-span-12">
                              <div className="flex flex-col gap-1">
                                <label>{t("iadeAciklamasi")}</label>
                                <Textarea name="iadeAciklama" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: "documents",
                    label: t("ekliBelgeler"),
                    children: <DosyaUpload selectedRowID={id} refGroup="IKAME_ARAC" />,
                  },
                  {
                    key: "images",
                    label: t("resimler"),
                    children: <ResimUpload selectedRowID={id} refGroup="IKAME_ARAC" />,
                  },
                ]}
              />
            </>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};

UpdateModal.propTypes = {
  id: PropTypes.number,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  onRefresh: PropTypes.func,
};

export default UpdateModal;
