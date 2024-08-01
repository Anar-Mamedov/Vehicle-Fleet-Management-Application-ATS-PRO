import { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import { AddExpeditionItemService } from "../../../../../../api/services/vehicles/operations_services";
import PersonalFields from "../../../../../components/form/personal-fields/PersonalFields";
import GeneralInfo from "./tabs/GeneralInfo";
import { GetModuleCodeByCode } from "../../../../../../api/services/code/services";
import { CodeItemValidateService } from "../../../../../../api/service";

const AddModal = ({ setStatus }) => {
  const isFirstRender = useRef(true);
  const { data, plaka } = useContext(PlakaContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "OZELALAN_1",
      value: "Özel Alan 1",
      type: "text",
    },
    {
      label: "ozelAlan2",
      key: "OZELALAN_2",
      value: "Özel Alan 2",
      type: "text",
    },
    {
      label: "ozelAlan3",
      key: "OZELALAN_3",
      value: "Özel Alan 3",
      type: "text",
    },
    {
      label: "ozelAlan4",
      key: "OZELALAN_4",
      value: "Özel Alan 4",
      type: "text",
    },
    {
      label: "ozelAlan5",
      key: "OZELALAN_5",
      value: "Özel Alan 5",
      type: "text",
    },
    {
      label: "ozelAlan6",
      key: "OZELALAN_6",
      value: "Özel Alan 6",
      type: "text",
    },
    {
      label: "ozelAlan7",
      key: "OZELALAN_7",
      value: "Özel Alan 7",
      type: "text",
    },
    {
      label: "ozelAlan8",
      key: "OZELALAN_8",
      value: "Özel Alan 8",
      type: "text",
    },
    {
      label: "ozelAlan9",
      key: "OZELALAN_9",
      value: "Özel Alan 9",
      type: "select",
      code: 881,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 882,
      name2: "ozelAlanKodId10",
    },
    {
      label: "ozelAlan11",
      key: "OZELALAN_11",
      value: "Özel Alan 11",
      type: "number",
    },
    {
      label: "ozelAlan12",
      key: "OZELALAN_12",
      value: "Özel Alan 12",
      type: "number",
    },
  ]);

  const defaultValues = {
    seferAdedi: 1,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    setValue("seferAdedi", 1);
  }, []);

  useEffect(() => {
    let fark;
    if (watch("varisKm")) {
      fark = watch("varisKm") - watch("cikisKm");
    } else {
      fark = 0;
    }
    setValue("farkKm", fark);
  }, [watch("varisKm"), watch("cikisKm")]);

  useEffect(() => {
    if (isOpen && isFirstRender.current) {
      GetModuleCodeByCode("SEFER_NO").then((res) =>
        setValue("seferNo", res.data)
      );
    }
  }, [isOpen, setValue]);

  useEffect(() => {
    if (watch("seferNo")) {
      const body = {
        tableName: "SeferNo",
        code: watch("seferNo"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("seferNo")]);

  useEffect(() => {
    if (plaka.length === 1) {
      setValue("plaka", plaka[0].plaka);
      setValue("lokasyon", plaka[0].lokasyon);
      setValue("lokasyonId", plaka[0].lokasyonId);
    }
  }, [plaka]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      aracId: data.aracId,
      surucuId1: values.surucuId1 || 0,
      surucuId2: values.surucuId2 || 0,
      aciklama: values.aciklama,
      seferNo: values.seferNo,
      dorseId: values.dorseId || 0,
      guzergahId: values.guzergahId || 0,
      seferTipKodId: values.seferTipKodId || 0,
      seferDurumKodId: values.seferDurumKodId || 0,
      cikisTarih: dayjs(values.cikisTarih).format("YYYY-MM-DD"),
      varisTarih: dayjs(values.varisTarih).format("YYYY-MM-DD"),
      cikisSaat: dayjs(values.cikisSaat).format("HH:mm:ss"),
      varisSaat: dayjs(values.varisSaat).format("HH:mm:ss"),
      seferAdedi: values.seferAdedi || 0,
      cikisKm: values.cikisKm || 0,
      varisKm: values.varisKm || 0,
      farkKm: values.farkKm || 0,
      ozelAlan1: values.ozelAlan1 || "",
      ozelAlan2: values.ozelAlan2 || "",
      ozelAlan3: values.ozelAlan3 || "",
      ozelAlan4: values.ozelAlan4 || "",
      ozelAlan5: values.ozelAlan5 || "",
      ozelAlan6: values.ozelAlan6 || "",
      ozelAlan7: values.ozelAlan7 || "",
      ozelAlan8: values.ozelAlan8 || "",
      ozelAlanKodId9: values.ozelAlanKodId9 || 0,
      ozelAlanKodId10: values.ozelAlanKodId10 || 0,
      ozelAlan11: values.ozelAlan11 || 0,
      ozelAlan12: values.ozelAlan12 || 0,
    };
    setLoading(true);
    AddExpeditionItemService(body).then((res) => {
      if (res?.data.statusCode === 200) {
        setStatus(true);
        setIsOpen(false);
        setLoading(false);
        setActiveKey("1");
        if (plaka.length === 1) {
          reset();
        } else {
          reset();
        }
        setIsValid("normal");
      } else {
        message.error("Bir sorun oluşdu! Tekrar deneyiniz.");
      }
    });
    setStatus(false);
  });

  const personalProps = {
    form: "SEFER",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo isValid={isValid} />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
  ];

  const resetForm = (plaka, data, reset) => {
    if (plaka.length === 1) {
      reset();
    } else {
      reset();
    }
  };

  const footer = [
    loading ? (
      <Button className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button
        key="submit"
        className="btn btn-min primary-btn"
        onClick={onSubmit}
        disabled={
          isValid === "success"
            ? false
            : isValid === "error"
              ? true
              : false
        }
      >
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsOpen(false);
        resetForm(plaka, data, reset);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setIsOpen(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniSeferGirisi")}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <FormProvider {...methods}>
          <form>
            <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
};

export default AddModal;
