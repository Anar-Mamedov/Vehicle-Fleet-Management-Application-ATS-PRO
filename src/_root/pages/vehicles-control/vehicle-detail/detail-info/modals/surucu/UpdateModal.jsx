import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { GetDriverSubstitutionByIdService, UpdateDriverSubstitutionItemService } from "../../../../../../../api/services/vehicles/vehicles/services";
import { CodeItemValidateService } from "../../../../../../../api/services/code/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
import Driver from "../../../../../../components/form/selects/Driver";
import Textarea from "../../../../../../components/form/inputs/Textarea";
// import Tutanak from "./Tutanak";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, aracID }) => {
  const { printData } = useContext(PlakaContext);
  const [isValid, setIsValid] = useState("normal");
  const [surucuIsValid, setSurucuIsValid] = useState(false);
  const [data, setData] = useState(null);
  const [code, setCode] = useState("normal");

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (code !== watch("tutanakNo")) {
      const body = {
        tableName: "TutanakNo",
        code: watch("tutanakNo"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    } else {
      setIsValid("normal");
    }
  }, [watch("tutanakNo"), code]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetDriverSubstitutionByIdService(id);
        setValue("surucuTeslimAlanId", res?.data.surucuTeslimAlanId);
        setValue("surucuTeslimAlan", res?.data.surucuIsimTeslimAlan);
        setValue("surucuTeslimEdenId", res?.data.surucuTeslimEdenId);
        setValue("surucuTeslimEden", res?.data.surucuIsimTeslimEden);
        setValue("aciklama", res?.data.aciklama);
        setValue("km", res?.data.km);
        setValue("tutanakNo", res?.data.tutanakNo);
        setCode(res?.data.tutanakNo);
        setValue("checked", true);
        setValue("teslimTarih", dayjs(res?.data.teslimTarih));
        setValue("teslimSaat", dayjs(res?.data.teslimSaat, "HH:mm:ss"));
      } catch (error) {
        console.error("Error updating driver:", error);
      }
    };

    if (updateModal) {
      fetchData();
    }
  }, [id, updateModal]);

  useEffect(() => {
    const data = {
      marka: printData.marka,
      model: printData.model,
      plaka: printData.plaka,
      km: watch("km"),
      ogs: printData.ogs,
      tasit: "",
      diger: "",
      teslimTarih: dayjs(watch("teslimTarih")).format("DD.MM.YYYY"),
      teslimEden: watch("surucuTeslimEden"),
      teslimAlan: watch("surucuTeslimAlan"),
    };

    setData(data);
  }, [watch("teslimTarih"), watch("surucuTeslimEden"), watch("surucuTeslimAlan"), watch("km"), printData]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      asAracId: aracID,
      siraNo: id,
      surucuTeslimAlanId: values.surucuTeslimAlanId || -1,
      surucuTeslimEdenId: values.surucuTeslimEdenId || -1,
      aciklama: values.aciklama,
      km: values.km,
      teslimTarih: dayjs(values.teslimTarih).format("YYYY-MM-DD") || null,
      teslimSaat: dayjs(values.teslimSaat).format("HH:mm:ss") || null,
    };

    UpdateDriverSubstitutionItemService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setStatus(true);
        reset(defaultValues);
      }
    });

    setStatus(false);
  });

  useEffect(() => {
    !watch("surucuTeslimAlanId") || watch("surucuTeslimAlanId") === watch("surucuTeslimEdenId") ? setSurucuIsValid(true) : setSurucuIsValid(false);
  }, [watch("surucuTeslimEdenId"), watch("surucuTeslimAlanId")]);

  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={onSubmit}
      disabled={isValid === "success" && !surucuIsValid ? false : isValid === "error" || surucuIsValid ? true : false}
    >
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
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("surucuGuncelle")} open={updateModal} onCancel={() => setUpdateModal(false)} maskClosable={false} footer={footer} width={600}>
      <FormProvider {...methods}>
        <form>
          <div className="grid gap-1">
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("tutanakNo")}</label>
                <TextInput name="tutanakNo" style={validateStyle} checked={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("teslimTarih")}</label>
                <DateInput name="teslimTarih" checked={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("teslimSaat")}</label>
                <TimeInput name="teslimSaat" readonly={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("teslimEden")}</label>
                <Driver name="surucuTeslimEden" codeName="surucuTeslimEdenId" disabled={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label className="text-info">{t("teslimAlan")}</label>
                <Driver name="surucuTeslimAlan" codeName="surucuTeslimAlanId" disabled={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("aracKm")}</label>
                <NumberInput name="km" checked={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("aciklama")}</label>
                <Textarea name="aciklama" />
              </div>
            </div>
            {/* <div className="col-span-12 mt-14">
              <Tutanak data={data} />
            </div> */}
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
  status: PropTypes.bool,
};

export default UpdateModal;
