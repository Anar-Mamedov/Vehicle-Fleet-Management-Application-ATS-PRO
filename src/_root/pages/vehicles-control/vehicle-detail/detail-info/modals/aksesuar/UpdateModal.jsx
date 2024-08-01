import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import {
  GetAccItemByIdService,
  UpdateAccItemService,
} from "../../../../../../../api/services/vehicles/vehicles/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import DateInput from "../../../../../../components/form/date/DateInput";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetAccItemByIdService(id);
        setValue("aksesuarKodId", res?.data.aksesuarKodId);
        setValue("aksesuar", res?.data.aksesuar);
        setValue("ureticiKod", res?.data.ureticiKod);
        setValue("miktar", res?.data.miktar);
        setValue("fiyat", res?.data.fiyat);
        setValue("degistirmeTarih", dayjs(res?.data.degistirmeTarih));
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
      aksesuarKodId: values.aksesuarKodId || -1,
      ureticiKod: values.ureticiKod,
      miktar: values.miktar,
      fiyat: values.fiyat,
      degistirmeTarih:
        dayjs(values.degistirmeTarih).format("YYYY-MM-DD") || null,
    };

    UpdateAccItemService(body).then((res) => {
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
      title={t("aksesuarGuncelle")}
      open={updateModal}
      onCancel={() => setUpdateModal(false)}
      maskClosable={false}
      footer={footer}
      width={600}
    >
      <FormProvider {...methods}>
        <form>
          <div className="flex flex-col gap-1">
            <label>{t("tanim")}</label>
            <CodeControl name="aksesuar" codeName="aksesuarKodId" id={105} />
          </div>
          <div className="flex flex-col gap-1">
            <label>{t("miktar")}</label>
            <NumberInput name="miktar" />
          </div>
          <div className="flex flex-col gap-1">
            <label>{t("fiyat")}</label>
            <NumberInput name="fiyat" />
          </div>
          <div className="flex flex-col gap-1">
            <label>{t("ureticiKod")}</label>
            <TextInput name="ureticiKod" />
          </div>
          <div className="flex flex-col gap-1">
            <label>{t("degistirmeTarih")}</label>
            <DateInput name="degistirmeTarih" />
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
};

export default UpdateModal;
