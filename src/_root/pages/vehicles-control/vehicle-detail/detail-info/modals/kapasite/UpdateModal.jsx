import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Tabs } from "antd";
import {
  GetCapacityByIdService,
  UpdateCapacityByIdService,
} from "../../../../../../../api/services/vehicles/vehicles/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetCapacityByIdService(id);
        setValue("tanim", res?.data.tanim);
        setValue("miktar", res?.data.miktar);
        setValue("birim", res?.data.birim);
        setValue("birimKodId", res?.data.birimKodId);
      } catch (error) {
        console.error("Error updating driver:", error);
      }
    };

    if (updateModal) {
      fetchData();
    }
  }, [id, updateModal]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: id,
      tanim: values.tanim,
      miktar: values.miktar,
      birimKodId: values.birimKodId || -1,
    };

    UpdateCapacityByIdService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setStatus(true);
        reset(defaultValues);
      }
    });

    setStatus(false);
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
        setImages([]);
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal
      title={t("kapasiteGuncelle")}
      open={updateModal}
      onCancel={() => setUpdateModal(false)}
      maskClosable={false}
      footer={footer}
      width={600}
    >
      <FormProvider {...methods}>
        <form>
          <div className="flex flex-col gap-1">
            <label>{t("aciklama")}</label>
            <TextInput name="tanim" />
          </div>
          <div className="flex flex-col gap-1">
            <label>{t("miktar")}</label>
            <TextInput name="miktar" />
          </div>
          <div className="flex flex-col gap-1">
            <label>{t("birim")}</label>
            <CodeControl name="birim" codeName="birimKodId" id={110} />
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
  record: PropTypes.object,
};

export default UpdateModal;
