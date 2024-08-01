import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Select } from "antd";
import {
  GetVehicleDetailsInfoService,
  UpdateVehicleDetailsInfoService,
} from "../../../../../../../api/services/vehicles/vehicles/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";

const Teknik = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {
    tsasiNo: null,
    tsilindirHacmi: null,
    tsilindirSaysi: null,
    tmotorGucu: null,
    tanahtarKod: null,
    tmotorNo: null,
    ttork: null,
    tvitesTipi: null,
    tradyoKod: null,
    dtyKapiAdedi: null,
    dtyMaxHiz: null,
    dtyHizlanma: null,
    dtyCekisAksi: null,
    tnetAgirlik: null,
    tyakitHacmi: null,
    tboy: null,
    tgenislik: null,
    tyukseklik: null,
    tonlastik: null,
    tarkalastik: null,
    tkatarAgirlik: null,
    tbagajHacmi: null,
    tonBasinc: null,
    tarkaBasinc: null,
    taciklama: null,
    dtyAksMesafesi: null,
    dtyIcYukseklik: null,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, setValue, control } = methods;

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 1).then((res) => {
      setValue("tsasiNo", res.data.tsasiNo);
      setValue("tsilindirHacmi", res.data.tsilindirHacmi);
      setValue("dtyIcYukseklik", res.data.dtyIcYukseklik);
      setValue("dtyAksMesafesi", res.data.dtyAksMesafesi);
      setValue("taciklama", res.data.taciklama);
      setValue("tbagajHacmi", res.data.tbagajHacmi);
      setValue("tarkaBasinc", res.data.tarkaBasinc);
      setValue("tonBasinc", res.data.tonBasinc);
      setValue("tkatarAgirlik", res.data.tkatarAgirlik);
      setValue("tarkalastik", res.data.tarkalastik);
      setValue("tonlastik", res.data.tonlastik);
      setValue("tyukseklik", res.data.tyukseklik);
      setValue("tgenislik", res.data.tgenislik);
      setValue("tboy", res.data.tboy);
      setValue("tyakitHacmi", res.data.tyakitHacmi);
      setValue("tnetAgirlik", res.data.tnetAgirlik);
      setValue("dtyCekisAksi", res.data.dtyCekisAksi);
      setValue("dtyHizlanma", res.data.dtyHizlanma);
      setValue("dtyMaxHiz", res.data.dtyMaxHiz);
      setValue("dtyKapiAdedi", res.data.dtyKapiAdedi);
      setValue("tradyoKod", res.data.tradyoKod);
      setValue("tvitesTipi", res.data.tvitesTipi);
      setValue("ttork", res.data.ttork);
      setValue("tmotorNo", res.data.tmotorNo);
      setValue("tanahtarKod", res.data.tanahtarKod);
      setValue("tmotorGucu", res.data.tmotorGucu);
      setValue("tsilindirSaysi", res.data.tsilindirSaysi);
    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = {
      dtyAracId: +id,
      tsasiNo: values.tsasiNo,
      tsilindirHacmi: values.tsilindirHacmi,
      tsilindirSaysi: values.tsilindirSaysi,
      tmotorGucu: values.tmotorGucu,
      tanahtarKod: values.tanahtarKod,
      tmotorNo: values.tmotorNo,
      ttork: values.ttork,
      tvitesTipi: values.tvitesTipi,
      tradyoKod: values.tradyoKod,
      dtyKapiAdedi: values.dtyKapiAdedi,
      dtyMaxHiz: values.dtyMaxHiz,
      dtyHizlanma: values.dtyHizlanma,
      dtyCekisAksi: values.dtyCekisAksi,
      tnetAgirlik: values.tnetAgirlik,
      tyakitHacmi: values.tyakitHacmi,
      tboy: values.tboy,
      tgenislik: values.tgenislik,
      tyukseklik: values.tyukseklik,
      tonlastik: values.tonlastik,
      tarkalastik: values.tarkalastik,
      tkatarAgirlik: values.tkatarAgirlik,
      tbagajHacmi: values.tbagajHacmi,
      tonBasinc: values.tonBasinc,
      tarkaBasinc: values.tarkaBasinc,
      taciklama: values.taciklama,
      dtyAksMesafesi: values.dtyAksMesafesi,
      dtyIcYukseklik: values.dtyIcYukseklik,
    };

    UpdateVehicleDetailsInfoService(1, body).then((res) => {
      if (res.data.statusCode === 202) {
        setStatus(true);
        onClose();
      }
    });
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal
      title={t("teknikBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <FormProvider {...methods}>
        <div className="mt-14">
          <h2>{t("motorBilgileri")}</h2>
          <div className="grid gap-1 border p-20 mt-10">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("sasiNo")}</label>
                <TextInput name="tsasiNo" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("motorSeriNo")}</label>
                <TextInput name="tmotorNo" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("kapiAdedi")}</label>
                <NumberInput name="dtyKapiAdedi" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("silindirHacmiCC")}</label>
                <TextInput name="tsilindirHacmi" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("silindirSayisi")}</label>
                <TextInput name="tsilindirSaysi" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("maxHiz")}</label>
                <TextInput name="dtyMaxHiz" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("motorGucuBG")}</label>
                <TextInput name="tmotorGucu" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("tork")}</label>
                <TextInput name="ttork" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("hizlanma")}</label>
                <TextInput name="dtyHizlanma" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("vitesTip")}</label>
                <Controller
                  name="tvitesTipi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      {...field}
                      options={[
                        { value: "DUZ", label: <span>DÜZ</span> },
                        { value: "OTOMATIK", label: <span>OTOMATİK</span> },
                      ]}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("cekisAksi")}</label>
                <TextInput name="dtyCekisAksi" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("anahtarKod")}</label>
                <TextInput name="tanahtarKod" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("radyoKod")}</label>
                <TextInput name="tradyoKod" />
              </div>
            </div>
          </div>
          <h2 className="mt-14">{t("boyutBilgileri")}</h2>
          <div className="grid gap-1 border p-20 mt-10">
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("netAgirlik")}</label>
                <NumberInput name="tnetAgirlik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("katarAgirlik")}</label>
                <NumberInput name="tkatarAgirlik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("icYukseklik")}</label>
                <NumberInput name="dtyIcYukseklik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("yakitDeposu")}</label>
                <NumberInput name="tyakitHacmi" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("bagajHacmi")}</label>
                <TextInput name="tbagajHacmi" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("aksMesafesi")}</label>
                <TextInput name="dtyAksMesafesi" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("boy")}</label>
                <TextInput name="tboy" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("genislik")}</label>
                <TextInput name="tgenislik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("yukseklik")}</label>
                <TextInput name="tyukseklik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("onLastik")}</label>
                <TextInput name="tonlastik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("onBasinc")}</label>
                <TextInput name="tonBasinc" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("arkaLastik")}</label>
                <TextInput name="tarkalastik" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>{t("arkaBasinc")}</label>
                <TextInput name="tarkaBasinc" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-10">
            <label>{t("aciklama")}</label>
            <Textarea name="taciklama" />
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

Teknik.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Teknik;
