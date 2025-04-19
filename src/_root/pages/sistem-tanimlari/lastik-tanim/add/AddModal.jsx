import React, { useState, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Divider, Input, InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { AddIsLastikService } from "../../../../../api/services/lastiktanim_services";
import LastikMarka from "../../../../components/LastikMarka";
import LastikModel from "../../../../components/LastikModel";
import Ebat from "../../../../components/form/Ebat";
import LastikTipi from "../../../../components/form/LastikTipi";
import FirmaUnvani from "../../../../components/form/FirmaUnvani";
import TextArea from "antd/es/input/TextArea";

const AddModal = ({ setStatus, onRefresh }) => {
  const [openModal, setopenModal] = useState(false);

  const defaultValues = {
    tanim: null,
    aciklama: null,
    marka: null,
    markaID: null,
    markaLabel: null,
    model: null,
    modelID: null,
    modelLabel: null,
    tipKodId: null,
    ebatKodId: null,
    lastikOmru: null,
    basinc: null,
    disDerinlik: null,
    fiyat: null,
    firmaId: null,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const markaLabel = watch("markaLabel");
    const modelLabel = watch("modelLabel");

    if (!watch("tanim") && markaLabel && modelLabel) {
      setValue("tanim", `${markaLabel} ${modelLabel}`);
    }
  }, [watch, setValue, watch("markaLabel"), watch("modelLabel")]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      tanim: values.tanim,
      aciklama: values.aciklama,
      markaId: values.markaID || -1,
      modelId: values.modelID || -1,
      tipKodId: values.tipKodId || -1,
      ebatKodId: values.ebatKodId || -1,
      lastikOmru: values.lastikOmru || 0,
      basinc: values.basinc || 0,
      disDerinlik: values.disDerinlik || 0,
      fiyat: values.fiyat || 0,
      firmaId: values.firmaId || -1,
    };

    AddIsLastikService(body).then((res) => {
      if (res.data.statusCode === 200) {
        onRefresh();
        reset(defaultValues);
        setopenModal(false);
      }
    });
    onRefresh();
  });

  const handleOpenModal = () => {
    reset(defaultValues); // Reset form to null values when opening modal
    setopenModal(true);
  };

  const handleCloseModal = () => {
    setopenModal(false);
    reset(defaultValues);
  };

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={handleCloseModal}>
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={handleOpenModal}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal title={t("yeniLastikGirisi")} open={openModal} onCancel={handleCloseModal} maskClosable={false} footer={footer} width={1200}>
        <FormProvider {...methods}>
          <form>
            <div className="grid gap-1">
              <div className="col-span-12">
                <h2 className="">{t("genelBilgiler")}</h2>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("lastikTanimi")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <Controller
                    name="tanim"
                    control={control}
                    rules={{ required: t("alanBosBirakilamaz") }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input {...field} onChange={(e) => field.onChange(e.target.value)} status={error ? "error" : ""} />
                        {error && <div style={{ color: "red", marginTop: "5px" }}>{error.message}</div>}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("marka")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <LastikMarka name1="marka" isRequired={true} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("model")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <LastikModel name1="model" isRequired={true} watchName="marka" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("ebat")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <Controller
                    name="ebatKodId"
                    control={control}
                    rules={{ required: t("alanBosBirakilamaz") }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Ebat field={field} />
                        {error && <div style={{ color: "red", marginTop: "5px" }}>{error.message}</div>}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("tip")}</label>
                  <Controller name="tipKodId" control={control} render={({ field }) => <LastikTipi field={field} />} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("disDerinligi")}</label>
                  <Controller name="disDerinlik" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("basinc")}</label>
                  <Controller name="basinc" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("lastikOmru")}</label>
                  <Controller name="lastikOmru" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
                </div>
              </div>
            </div>
            <div className="m-20">
              <Divider />
            </div>
            <div className="grid gap-1">
              <div className="col-span-12">
                <h2 className="">{t("satinalmaBilgiler")}</h2>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("firma")}</label>
                  <Controller name="firmaId" control={control} render={({ field }) => <FirmaUnvani field={field} />} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("fiyat")}</label>
                  <Controller name="fiyat" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
                </div>
              </div>
            </div>
            <div className="m-20">
              <Divider />
            </div>
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Controller name="aciklama" control={control} render={({ field }) => <TextArea {...field} />} />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddModal;
