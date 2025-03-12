import React, { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import AxiosInstance from "../../../../../../../api/http";
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

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, aracID, record, refreshVehicleData, refreshData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const { plaka, aracId, printData } = useContext(PlakaContext);
  const isFirstRender = useRef(true);
  const [isValid, setIsValid] = useState("normal");
  const [surucuIsValid, setSurucuIsValid] = useState(false);
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

  // Fetch location log data from API
  const fetchLocationLogData = async (logId) => {
    if (!logId) return;

    setIsFetchingData(true);
    try {
      const response = await AxiosInstance.get(`LocationTransfer/GetLocationLogById?id=${logId}`);

      // The response data is directly the location log object
      if (response.data) {
        const logData = response.data;

        // Set values from the API response
        setValue("eskiLokasyon", logData?.bulunduguLokasyon || "");
        setValue("eskiLokasyonId", logData?.bulunduguLokasyonId || 0);
        setValue("km", logData?.aracKm || 0);

        // Set yeniLokasyon values from the API response
        setValue("yeniLokasyon", logData?.transferEdilenLokasyon || "");
        setValue("yeniLokasyonID", logData?.transferEdilenLokasyonId || 0);

        // Set date and time from the API response
        setValue("teslimTarih", logData?.tarih ? dayjs(logData.tarih) : dayjs());
        setValue("teslimSaat", logData?.saat ? dayjs(`2000-01-01 ${logData.saat}`) : dayjs());

        // Set description from the API response
        setValue("aciklama", logData?.aciklama || "");

        // Set IDs for the form submission
        setValue("logAracId", logData?.logAracId || 0);
        setValue("aracBolgeLogId", logData?.aracBolgeLogId || 0);

        // Set transferNedeni if available
        setValue("transferNedeni", logData?.transferNedeni || "");
      } else {
        message.warning(t("kayitBulunamadi"));
      }
    } catch (error) {
      console.error("Error fetching location log data:", error);
      message.error(error?.response?.data?.message || t("veriGetirmeHatasi"));
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    if (updateModal && id) {
      // Fetch data from API when modal opens and id is available
      fetchLocationLogData(id);
    }
  }, [updateModal, id]);

  useEffect(() => {
    if (updateModal && isFirstRender.current) {
      GetModuleCodeByCode("ARAC_TESTLIM").then((res) => setValue("tutanakNo", res.data));
    }
  }, [updateModal, setValue]);

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

    // Log the values being submitted

    const body = {
      aracBolgeLogId: values.aracBolgeLogId || id, // Include the aracBolgeLogId for updating the correct record
      logAracId: values.logAracId || aracId, // Use the logAracId from API response, fallback to context if not available
      // plaka: plaka,
      // tutanakNo: values.tutanakNo,
      tarih: dayjs(values.teslimTarih).format("YYYY-MM-DD") || null,
      saat: dayjs(values.teslimSaat).format("HH:mm:ss") || null,
      aciklama: values.aciklama,
      aracKm: values.km || 0,
      bulunduguLokasyonId: Number(values.eskiLokasyonId),
      transferEdilenLokasyonId: values.yeniLokasyonID,
      transferNedeni: values.transferNedeni || "", // Use transferNedeni from form values if available
      // surucuTeslimAlanId: values.surucuTeslimAlanId || -1,
      // surucuTeslimEdenId: values.surucuTeslimEdenId || -1,
    };

    // Log the body being sent to the API

    try {
      // Using the UpdateLocationLogItem endpoint for updating location logs
      const res = await AxiosInstance.post("LocationTransfer/UpdateLocationLogItem", body);

      if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201 || res?.data?.statusCode === 202) {
        message.success(t("islemBasarili"));

        // Set status to true to trigger a refresh in the parent component
        setStatus(true);

        // Call the explicit refresh function if available
        if (typeof refreshData === "function") {
          refreshData();
        }

        // Update vehicle data if refreshVehicleData function is provided
        if (typeof refreshVehicleData === "function") {
          refreshVehicleData();
        }

        // Close the modal and reset the form
        setUpdateModal(false);
        reset();
      } else {
        // Handle unsuccessful response
        message.error(res?.data?.message || t("islemBasarisiz"));
      }
    } catch (error) {
      console.error("Error updating location log:", error);
      message.error(error?.response?.data?.message || t("islemBasarisiz"));
    } finally {
      setIsLoading(false);
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

  const isButtonDisabled = isLoading || isFetchingData || !teslimTarih || !teslimSaat || !yeniLokasyonID || isValid !== "success" || surucuIsValid;

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
          loading={isLoading || isFetchingData}
          disabled={isLoading || isFetchingData || isButtonDisabled}
        >
          {t("kaydet")}
        </Button>
        <Button
          key="back"
          className="btn btn-min cancel-btn"
          onClick={() => {
            setUpdateModal(false);
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
    <Modal title={t("lokasyonGuncelle")} open={updateModal} onCancel={() => setUpdateModal(false)} maskClosable={false} footer={footer} width={600}>
      <FormProvider {...methods}>
        <form>
          {isFetchingData ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span>{t("yukleniyor")}...</span>
            </div>
          ) : (
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
          )}
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
  id: PropTypes.number,
  aracID: PropTypes.number,
  refreshVehicleData: PropTypes.func,
  refreshData: PropTypes.func,
};

export default UpdateModal;
