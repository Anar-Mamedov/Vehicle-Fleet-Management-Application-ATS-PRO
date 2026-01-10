import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, Modal, Tabs, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { AddVehicleService } from "../../../../../api/services/vehicles/vehicles/services";
import GeneralInfo from "./GeneralInfo";
import PersonalFields from "../../../../components/form/personal-fields/PersonalFields";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import AxiosInstance from "../../../../../api/http";

const AddModal = ({ setStatus, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mandatoryFields, setMandatoryFields] = useState({});

  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "OZELALAN_1",
      value: `${t("ozelAlan")} 1`,
      type: "text",
    },
    {
      label: "ozelAlan2",
      key: "OZELALAN_2",
      value: `${t("ozelAlan")} 2`,
      type: "text",
    },
    {
      label: "ozelAlan3",
      key: "OZELALAN_3",
      value: `${t("ozelAlan")} 3`,
      type: "text",
    },
    {
      label: "ozelAlan4",
      key: "OZELALAN_4",
      value: `${t("ozelAlan")} 4`,
      type: "text",
    },
    {
      label: "ozelAlan5",
      key: "OZELALAN_5",
      value: `${t("ozelAlan")} 5`,
      type: "text",
    },
    {
      label: "ozelAlan6",
      key: "OZELALAN_6",
      value: `${t("ozelAlan")} 6`,
      type: "text",
    },
    {
      label: "ozelAlan7",
      key: "OZELALAN_7",
      value: `${t("ozelAlan")} 7`,
      type: "text",
    },
    {
      label: "ozelAlan8",
      key: "OZELALAN_8",
      value: `${t("ozelAlan")} 8`,
      type: "text",
    },
    {
      label: "ozelAlan9",
      key: "OZELALAN_9",
      value: `${t("ozelAlan")} 9`,
      type: "select",
      code: 865,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: `${t("ozelAlan")} 10`,
      type: "select",
      code: 866,
      name2: "ozelAlanKodId10",
    },
    {
      label: "ozelAlan11",
      key: "OZELALAN_11",
      value: `${t("ozelAlan")} 11`,
      type: "number",
    },
    {
      label: "ozelAlan12",
      key: "OZELALAN_12",
      value: `${t("ozelAlan")} 12`,
      type: "number",
    },
  ]);

  const defaultValues = {
    plaka: "",
    aracTipID: null,
    aracTip: undefined,
    guncelKm: "",
    markaId: null,
    modelId: null,
    yil: "",
    aracGrubuID: null,
    aracGrubu: undefined,
    aracCinsiID: null,
    aracCinsi: undefined,
    renkID: null,
    renk: undefined,
    lokasyonId: null,
    mulkiyet: "",
    departmanID: null,
    departman: undefined,
    surucuId: null,
    yakitTipId: null,
    muayeneTarih: "",
    sozlesmeTarih: "",
    egzosTarih: "",
    vergiTarih: "",
    takografTarih: "",
    ozelAlan1: "",
    ozelAlan2: "",
    ozelAlan3: "",
    ozelAlan4: "",
    ozelAlan5: "",
    ozelAlan6: "",
    ozelAlan7: "",
    ozelAlan8: "",
    ozelAlanKodId9: null,
    ozelAlanKodId10: null,
    ozelAlan11: null,
    ozelAlan12: null,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, watch, setValue } = methods;

  useEffect(() => {
    if (watch("plaka")) {
      const body = {
        tableName: "Arac",
        code: watch("plaka"),
      };
      CodeItemValidateService(body)
        .then((res) => {
          if (res.data.status) {
            setIsValid("error");
          } else {
            setIsValid("success");
          }
        })
        .catch((error) => {
          console.error("Validation error:", error);
          setIsValid("error");
        });
    } else {
      setIsValid("normal"); // Reset validation when plaka is empty
    }
  }, [watch("plaka")]);

  useEffect(() => {
    if (isModalOpen) {
      AxiosInstance.get("MandatoryFields/GetMandatoryFieldsByModule?module=arac")
        .then((response) => {
          if (response.data && response.data.fields) {
            setMandatoryFields(response.data.fields);
          }
        })
        .catch((error) => {
          console.error("Error fetching mandatory fields:", error);
        });
    }
  }, [isModalOpen]);

  const handleOk = handleSubmit(async (value) => {
    setLoading(true);
    setErrorMessage(""); // Reset error message before submission

    const kmLog = value.guncelKm
      ? {
          plaka: value.plaka,
          tarih: dayjs().format("YYYY-MM-DD"),
          saat: dayjs().format("HH:mm"),
          yeniKm: value.guncelKm,
          dorse: false,
          lokasyonId: value.lokasyonId,
        }
      : null;

    const body = {
      plaka: value.plaka,
      yil: value.yil ? dayjs(value.yil).year() : 0,
      markaId: value.markaId || 0,
      modelId: value.modelId || 0,
      aracGrubuId: value.aracGrubuID || 0,
      aracRenkId: value.renkID || 0,
      lokasyonId: value.lokasyonId || 0,
      departmanId: value.departmanID || 0,
      surucuId: value.surucuId || 0,
      aracTipId: value.aracTipID || 0,
      guncelKm: value.guncelKm || 0,
      muayeneTarih: value.muayeneTarih ? dayjs(value.muayeneTarih).format("YYYY-MM-DD") : null,
      egzosTarih: value.egzosTarih ? dayjs(value.egzosTarih).format("YYYY-MM-DD") : null,
      vergiTarih: value.vergiTarih ? dayjs(value.vergiTarih).format("YYYY-MM-DD") : null,
      takografTarih: value.takografTarih ? dayjs(value.takografTarih).format("YYYY-MM-DD") : null,
      sozlesmeTarih: value.sozlesmeTarih ? dayjs(value.sozlesmeTarih).format("YYYY-MM-DD") : null,
      yakitTipId: value.yakitTipId || 0,
      kmLog: kmLog,
      ozelAlan1: value.ozelAlan1 || "",
      ozelAlan2: value.ozelAlan2 || "",
      ozelAlan3: value.ozelAlan3 || "",
      ozelAlan4: value.ozelAlan4 || "",
      ozelAlan5: value.ozelAlan5 || "",
      ozelAlan6: value.ozelAlan6 || "",
      ozelAlan7: value.ozelAlan7 || "",
      ozelAlan8: value.ozelAlan8 || "",
      ozelAlanKodId9: value.ozelAlanKodId9 || -1,
      ozelAlanKodId10: value.ozelAlanKodId10 || -1,
      ozelAlan11: value.ozelAlan11 || 0,
      ozelAlan12: value.ozelAlan12 || 0,
    };

    try {
      const res = await AddVehicleService(body);
      if (res?.data.statusCode === 201) {
        setIsModalOpen(false);
        onRefresh();
        reset(defaultValues);
        setIsValid("normal");
        setActiveKey("1");
        message.success(t("aracBasariylaEklendi"));
      } else {
        setErrorMessage(res?.data.message || t("islemBasarisiz"));
        message.error(res?.data.message || t("islemBasarisiz"));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage(t("sunucuHatasi"));
      message.error(t("sunucuHatasi"));
    } finally {
      setLoading(false);
    }
  });

  const personalProps = {
    form: "Arac",
    fields,
    setFields,
    mandatoryFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo isValid={isValid} mandatoryFields={mandatoryFields} />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
  ];

  const footer = [
    <Button key="submit" type="primary" className="btn btn-min primary-btn" onClick={handleOk} disabled={isValid === "error"} loading={loading}>
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsModalOpen(false);
        reset(defaultValues);
        setIsValid("normal");
        setActiveKey("1");
        setErrorMessage("");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <div>
      <Button
        type="primary"
        className="btn primary-btn"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniAracGiris")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          setActiveKey("1");
          reset(defaultValues);
          setIsValid("normal");
          setErrorMessage("");
        }}
        maskClosable={false}
        footer={footer}
        width={1200}
        destroyOnClose
      >
        {errorMessage && <div style={{ marginBottom: 16, color: "red" }}>{errorMessage}</div>}
        <FormProvider {...methods}>
          <form>
            <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
  onRefresh: PropTypes.func.isRequired,
};

export default AddModal;
