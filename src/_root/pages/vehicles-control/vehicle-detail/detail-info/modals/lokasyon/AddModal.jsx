import React, { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { AddLokasyonTransferService } from "../../../../../../../api/services/vehicles/vehicles/services";
import { CodeItemValidateService, GetModuleCodeByCode } from "../../../../../../../api/services/code/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
// import Driver from "../../../../../../components/form/selects/Driver";
// import Tutanak from "./Tutanak";
import ModalInput from "../../../../../../components/form/inputs/ModalInput";
import LokasyonTablo from "../../../../../../components/form/LokasyonTable";

const AddModal = ({ setStatus, isModalOpen: propIsModalOpen, setIsModalOpen: propSetIsModalOpen, lokasyon, lokasyonId, onYeniLokasyonUpdated, guncelKm, refreshVehicleData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { plaka, aracId, printData } = useContext(PlakaContext);
  const isFirstRender = useRef(true);
  const [isValid, setIsValid] = useState("normal");
  const [surucuIsValid, setSurucuIsValid] = useState(false);
  const [data, setData] = useState(null);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  // Create local state for modal visibility if props are not provided
  const [localIsModalOpen, setLocalIsModalOpen] = useState(false);

  // Use either the prop or local state for modal visibility
  const isModalOpenValue = propIsModalOpen !== undefined ? propIsModalOpen : localIsModalOpen;
  const setIsModalOpenValue = propSetIsModalOpen || setLocalIsModalOpen;

  // Add debugging logs
  /*   useEffect(() => {
    console.log("Modal state:", {
      propIsModalOpen,
      localIsModalOpen,
      isModalOpenValue,
      setIsModalOpenValue: !!setIsModalOpenValue,
    });
  }, [propIsModalOpen, localIsModalOpen, isModalOpenValue]); */

  const defaultValues = {
    checked: true,
    teslimTarih: dayjs(),
    teslimSaat: dayjs(),
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  // Initialize form with current values when component is mounted
  useEffect(() => {
    // Initialize with values from context if available
    if (printData) {
      const currentLokasyon = lokasyon || printData?.lokasyon || "";
      const currentLokasyonId = lokasyonId || printData?.lokasyonId || null;
      const currentKm = guncelKm || printData?.guncelKm || 0;

      setValue("eskiLokasyon", currentLokasyon);
      setValue("eskiLokasyonId", currentLokasyonId);
      setValue("km", currentKm);
    }
  }, [printData, lokasyon, lokasyonId, guncelKm, setValue]);

  useEffect(() => {
    if (isModalOpenValue && isFirstRender.current) {
      GetModuleCodeByCode("ARAC_TESTLIM").then((res) => setValue("tutanakNo", res.data));
    }
  }, [isModalOpenValue, setValue]);

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

  // Set date and time when modal is opened
  useEffect(() => {
    if (isModalOpenValue) {
      // Set teslimTarih and teslimSaat to current date and time each time the modal opens
      setValue("teslimTarih", dayjs());
      setValue("teslimSaat", dayjs());

      // Refresh location and km values when modal is opened
      const currentLokasyon = lokasyon || printData?.lokasyon || "";
      const currentLokasyonId = lokasyonId || printData?.lokasyonId || null;
      const currentKm = guncelKm || printData?.guncelKm || 0;

      setValue("eskiLokasyon", currentLokasyon);
      setValue("eskiLokasyonId", currentLokasyonId);
      setValue("km", currentKm);
    }
  }, [isModalOpenValue, setValue, lokasyon, lokasyonId, guncelKm, printData]);

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

      // surucuTeslimAlanId: values.surucuTeslimAlanId || -1,
      // surucuTeslimEdenId: values.surucuTeslimEdenId || -1,
    };

    try {
      const res = await AddLokasyonTransferService(body);
      if (res?.data.statusCode === 200) {
        message.success(t("islemBasarili"));

        // Invoke the callback function
        if (typeof onYeniLokasyonUpdated === "function") {
          onYeniLokasyonUpdated(values?.yeniLokasyon, values?.yeniLokasyonID);
        }

        // Call refreshVehicleData to update the vehicle data
        if (typeof refreshVehicleData === "function") {
          refreshVehicleData();
        }

        // Set status to true to trigger a refresh in the parent component
        setStatus(true);

        // Close the modal
        setIsModalOpenValue(false);

        // Reset the form
        reset();
      }
    } finally {
      setIsLoading(false);
      // Don't reset status here to ensure the parent component can detect the change
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

  const isButtonDisabled = isLoading || !teslimTarih || !teslimSaat || !yeniLokasyonID || isValid !== "success" || surucuIsValid;

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
            setIsModalOpenValue(false);
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
      <Button className="btn primary-btn" onClick={() => setIsModalOpenValue(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniLokasyonBilgi")}
        open={isModalOpenValue}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpenValue(false);
          reset();
        }}
        maskClosable={false}
        footer={footer}
        width={600}
        destroyOnClose={true}
      >
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
                  <NumberInput name="km" defaultValue={guncelKm || printData?.guncelKm || 0} />
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
  setStatus: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  lokasyon: PropTypes.string,
  lokasyonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onYeniLokasyonUpdated: PropTypes.func,
  guncelKm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  refreshVehicleData: PropTypes.func,
};

AddModal.defaultProps = {
  lokasyon: "",
  lokasyonId: null,
  guncelKm: 0,
  onYeniLokasyonUpdated: () => {},
  refreshVehicleData: () => {},
};

export default AddModal;
