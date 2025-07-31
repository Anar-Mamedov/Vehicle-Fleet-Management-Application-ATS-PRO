import React, { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, message, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { AddLokasyonTransferService } from "../../../../../../../api/services/vehicles/vehicles/services";

import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
// import Driver from "../../../../../../components/form/selects/Driver";
// import Tutanak from "./Tutanak";
import ModalInput from "../../../../../../components/form/inputs/ModalInput";
import LokasyonTablo from "../../../../../../components/form/LokasyonTable";

const { Text } = Typography;

const AddModal = ({ setStatus, isModalOpen, setIsModalOpen, lokasyon, lokasyonId, onYeniLokasyonUpdated, guncelKm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { plaka, aracId, printData } = useContext(PlakaContext);
  const isFirstRender = useRef(true);

  const [data, setData] = useState(null);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);

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
      setValue("eskiLokasyon", lokasyon);
      setValue("eskiLokasyonId", lokasyonId);
      setValue("km", guncelKm);
      // Set teslimTarih and teslimSaat to current date and time each time the modal opens
      setValue("teslimTarih", dayjs());
      setValue("teslimSaat", dayjs());
    }
  }, [lokasyon, lokasyonId, isModalOpen, guncelKm]);

  const handleOk = handleSubmit(async (values) => {
    setIsLoading(true);
    const body = {
      logAracId: aracId,
      // plaka: plaka,
      // tutanakNo: values.tutanakNo,
      tarih: dayjs(values.teslimTarih).format("YYYY-MM-DD") || null,
      saat: dayjs(values.teslimSaat).format("HH:mm:ss") || null,
      aciklama: values.aciklama,
      aracKm: values.km || 0,
      bulunduguLokasyonId: Number(values.eskiLokasyonId),
      transferEdilenLokasyonId: values.yeniLokasyonID,

      // talepEdilenNesne: "34ABC123 → İstanbul"
      talepEdilenNesne: `${plaka} → ${values.yeniLokasyon}`,

      // surucuTeslimAlanId: values.surucuTeslimAlanId || -1,
      // surucuTeslimEdenId: values.surucuTeslimEdenId || -1,
    };

    try {
      const res = await AddLokasyonTransferService(body);
      if (res?.data.statusCode === 200) {
        message.success(t("islemBasarili"));
        // Invoke the callback function
        onYeniLokasyonUpdated(values?.yeniLokasyon, values?.yeniLokasyonID);
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

  const handleYeniLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };

  const handleYeniLokasyonMinusClick = () => {
    setValue("yeniLokasyon", null);
    setValue("yeniLokasyonID", null);
  };

  const teslimTarih = watch("teslimTarih");
  const teslimSaat = watch("teslimSaat");
  const yeniLokasyonID = watch("yeniLokasyonID");

  const isButtonDisabled = isLoading || !teslimTarih || !teslimSaat || !yeniLokasyonID;

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
        <Button key="submit" className="btn btn-min primary-btn" onClick={handleOk} loading={isLoading} disabled={isLoading || isButtonDisabled}>
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

  return (
    <div>
      {/* <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button> */}
      <Modal title={t("yeniLokasyonBilgi")} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} maskClosable={false} footer={footer} width={600}>
        <FormProvider {...methods}>
          <form>
            <div className="grid gap-1">
              {/* <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("tutanakNo")}</label>
                  <TextInput name="tutanakNo" style={validateStyle} />
                </div>
              </div> */}

              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("tarih")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <DateInput name="teslimTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>
                    {t("saat")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <TimeInput name="teslimSaat" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  {/*  <label>{t("teslimEden")}</label>
                  <Driver name="surucuTeslimEden" codeName="surucuTeslimEdenId" disabled={true} /> */}
                  <label htmlFor="eskiLokasyonId">{t("eskiLokasyon")}</label>
                  <TextInput name="eskiLokasyon" readonly={true} />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label className="text-info">{t("yeniLokasyon")}</label>
                  {/* <Driver name="surucuTeslimAlan" codeName="surucuTeslimAlanId" /> */}

                  <ModalInput name="yeniLokasyon" readonly={true} required={true} onPlusClick={handleYeniLokasyonPlusClick} onMinusClick={handleYeniLokasyonMinusClick} />
                  <LokasyonTablo
                    onSubmit={(selectedData) => {
                      setValue("yeniLokasyon", selectedData.location);
                      setValue("yeniLokasyonID", selectedData.key);
                    }}
                    isModalVisible={isLokasyonModalOpen}
                    setIsModalVisible={setIsLokasyonModalOpen}
                  />
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
