import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Divider, Input, InputNumber, Modal } from "antd";
import { GetLastikByIdService, UpdateLastikService } from "../../../../../api/services/lastiktanim_services";
import LastikMarka from "../../../../components/LastikMarka";
import LastikModel from "../../../../components/LastikModel";
import Ebat from "../../../../components/form/Ebat";
import LastikTipi from "../../../../components/form/LastikTipi";
import FirmaUnvani from "../../../../components/form/FirmaUnvani";
import TextArea from "antd/es/input/TextArea";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [lastikId, setLastikId] = useState(0);

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, control, setValue } = methods;

  useEffect(() => {
    if (selectedRow) {
      GetLastikByIdService(selectedRow?.key).then((res) => {
        setValue("aciklama", res.data.aciklama);
        setValue("basinc", res.data.basinc);
        setValue("disDerinlik", res.data.disDerinlik);
        setValue("ebat", res.data.ebat);
        setValue("ebatKodId", res.data.ebatKodId);
        setValue("unvan", res.data.firma);
        setValue("firmaId", res.data.firmaId);
        setValue("fiyat", res.data.fiyat);
        setValue("lastikOmru", res.data.lastikOmru);
        setValue("marka", res.data.marka);
        setValue("markaID", res.data.markaId);
        setTimeout(() => {
          setValue("model", res.data.model);
          setValue("modelID", res.data.modelId);
        }, 100);
        setValue("tanim", res.data.tanim);
        setValue("tip", res.data.tip);
        setValue("tipKodId", res.data.tipKodId);
        setLastikId(res.data.siraNo);
      });
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: lastikId,
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

    UpdateLastikService(body).then((res) => {
      if (res.data.statusCode === 202) {
        onDrawerClose();
        onRefresh();
        reset(defaultValues);
      }
    });
    onRefresh();
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        reset(defaultValues);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal title={t("lastikTanimGuncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-1">
            <div className="col-span-12">
              <h2 className="">Genel Bilgiler</h2>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("lastikTanimi")}</label>
                <Controller name="tanim" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("marka")}</label>
                <LastikMarka name1="marka" isRequired={false} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("model")}</label>
                <LastikModel name1="model" isRequired={false} watchName="marka" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("ebat")}</label>
                <Controller name="ebatKodId" control={control} render={({ field }) => <Ebat field={field} />} />
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
              <h2 className="">Satınalma Bilgiler</h2>
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
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
  status: PropTypes.bool,
};

export default UpdateModal;
