import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Input, InputNumber, Modal } from "antd";
import IsTipi from "../../../../components/form/IsTipi";
import BakimDepartman from "../../../../components/form/BakimDepartmani";
import { GetIsKartiByIdService, UpdateIsKartiService } from "../../../../../api/services/isKartlari_services";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [isKartiId, setIsKartiId] = useState(0);

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, control, setValue } = methods;

  useEffect(() => {
    if (selectedRow) {
      GetIsKartiByIdService(selectedRow?.key).then((res) => {
        setValue("bakimDepartman", res.data.bakimDepartman);
        setValue("bakimDepartmanKodId", res.data.bakimDepartmanKodId);
        setValue("isTip", res.data.isTip);
        setValue("isTipKodId", res.data.isTipKodId);
        setValue("tanim", res.data.tanim);
        setValue("dakika", res.data.dakika);
        setValue("saat", res.data.saat);
        setValue("ucret", res.data.ucret);
        setIsKartiId(res.data.isTanimId);
      });
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      isTanimId: selectedRow?.key,
      tanim: values.tanim,
      isTipKodId: values.isTipKodId || -1,
      bakimDepartmanKodId: values.bakimDepartmanKodId || -1,
      dakika: values.dakika || 0,
      saat: values.saat || 0,
      ucret: values.ucret || 0,
    };

    UpdateIsKartiService(body).then((res) => {
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
        onDrawerClose();
        reset(defaultValues);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal title={t("isKartiGuncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={600}>
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("isTanimi")}</label>
                <Controller name="tanim" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("isTipi")}</label>
                <Controller name="isTipKodId" control={control} render={({ field }) => <IsTipi field={field} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("bakimDepartman")}</label>
                <Controller name="bakimDepartmanKodId" control={control} render={({ field }) => <BakimDepartman field={field} />} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("saat")}</label>
                <Controller name="saat" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("dakika")}</label>
                <Controller name="dakika" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("ucret")}</label>
                <Controller name="ucret" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
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
  selectedRow: PropTypes.object,
  onDrawerClose: PropTypes.func,
  drawerVisible: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default UpdateModal;
