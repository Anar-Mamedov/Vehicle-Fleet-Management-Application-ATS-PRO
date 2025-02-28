import React, { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { AddDriverSubstitutionItemService } from "../../../../../../../api/services/vehicles/vehicles/services";
import { CodeItemValidateService, GetModuleCodeByCode } from "../../../../../../../api/services/code/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
import Driver from "../../../../../../components/form/selects/Driver";
// import Tutanak from "./Tutanak";

const AddModal = ({ setStatus, isModalOpen, setIsModalOpen, surucu, surucuId, onSurucuTeslimUpdated, guncelKm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { plaka, aracId, printData } = useContext(PlakaContext);
  const isFirstRender = useRef(true);
  const [isValid, setIsValid] = useState("normal");
  const [surucuIsValid, setSurucuIsValid] = useState(false);
  const [data, setData] = useState(null);

  const defaultValues = {
    checked: true,
    teslimTarih: dayjs(),
    teslimSaat: dayjs(),
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (isModalOpen) {
      setValue("surucuTeslimEden", surucu);
      setValue("surucuTeslimEdenId", surucuId);
      setValue("km", guncelKm);
      // Set teslimTarih and teslimSaat to current date and time each time the modal opens
      setValue("teslimTarih", dayjs());
      setValue("teslimSaat", dayjs());
    }
  }, [surucu, surucuId, isModalOpen, guncelKm]);

  useEffect(() => {
    if (isModalOpen && isFirstRender.current) {
      GetModuleCodeByCode("ARAC_TESTLIM").then((res) => setValue("tutanakNo", res.data));
    }
  }, [isModalOpen, setValue]);

  useEffect(() => {
    if (watch("tutanakNo")) {
      const body = {
        tableName: "TutanakNo",
        code: watch("tutanakNo"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("tutanakNo")]);

  const handleOk = handleSubmit(async (values) => {
    setIsLoading(true);
    const body = {
      asAracId: aracId,
      plaka: plaka,
      tutanakNo: values.tutanakNo,
      teslimTarih: dayjs(values.teslimTarih).format("YYYY-MM-DD") || null,
      teslimSaat: dayjs(values.teslimSaat).format("HH:mm:ss") || null,
      aciklama: values.aciklama,
      km: values.km || 0,
      surucuTeslimAlanId: values.surucuTeslimAlanId || -1,
      surucuTeslimEdenId: values.surucuTeslimEdenId || -1,
    };

    try {
      const res = await AddDriverSubstitutionItemService(body);
      if (res?.data.statusCode === 200) {
        // Extract the values from the form
        const surucuTeslimAlan = values.surucuTeslimAlan;
        const surucuTeslimAlanId = values.surucuTeslimAlanId;

        // Invoke the callback function
        onSurucuTeslimUpdated(surucuTeslimAlan, surucuTeslimAlanId);
        setIsModalOpen(false);
        setStatus(true);
        reset();
      }
    } finally {
      setIsLoading(false);
      setStatus(false);
    }
  });

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

  useEffect(() => {
    !watch("surucuTeslimAlanId") || watch("surucuTeslimAlanId") === watch("surucuTeslimEdenId") ? setSurucuIsValid(true) : setSurucuIsValid(false);
  }, [watch("surucuTeslimEdenId"), watch("surucuTeslimAlanId")]);

  const teslimTarih = watch("teslimTarih");
  const teslimSaat = watch("teslimSaat");
  const surucuTeslimAlanId = watch("surucuTeslimAlanId");

  const isButtonDisabled = isLoading || !teslimTarih || !teslimSaat || !surucuTeslimAlanId || isValid !== "success" || surucuIsValid;

  const footer = [
    // <Button
    //   key="submit"
    //   className="btn btn-min primary-btn"
    //   onClick={handleOk}
    //   loading={isLoading}
    //   disabled={isValid === "success" && !surucuIsValid ? false : isValid === "error" || surucuIsValid ? true : false}
    // >
    //   {t("kaydet")}
    // </Button>,
    <div key="" style={{ display: "flex", justifyContent: "space-between" }}>
      <div key="">{/* <Tutanak data={data} /> */}</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          key="submit"
          className="btn btn-min primary-btn"
          onClick={handleOk}
          loading={isLoading}
          disabled={isLoading || !teslimTarih || !teslimSaat || !surucuTeslimAlanId || isValid !== "success" || surucuIsValid}
        >
          {t("kaydet")}
        </Button>
        <Button
          key="back"
          className="btn btn-min cancel-btn"
          onClick={() => {
            setIsModalOpen(false);
            reset();
          }}
        >
          {t("kapat")}
        </Button>
      </div>
    </div>,
  ];

  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };

  return (
    <div>
      {/* <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button> */}
      <Modal title={t("yeniSurucuBilgi")} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} maskClosable={false} footer={footer} width={600}>
        <FormProvider {...methods}>
          <form>
            <div className="grid gap-1">
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("tutanakNo")}</label>
                  <TextInput name="tutanakNo" style={validateStyle} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("teslimTarih")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <DateInput name="teslimTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("teslimSaat")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <TimeInput name="teslimSaat" />
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
                  <Driver name="surucuTeslimAlan" codeName="surucuTeslimAlanId" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aracKm")}</label>
                  <NumberInput name="km" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aciklama")}</label>
                  <Textarea name="aciklama" />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
};

export default AddModal;
