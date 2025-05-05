import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { t } from "i18next";
import PersonalFields from "../../../../components/form/PersonalFields";
import GeneralInfo from "./GeneralInfo";
import { AddHgsItemService } from "../../../../../api/services/hgs-islem-takibi/services";
import Iletisim from "./Iletisim";
import { CodeItemValidateService, GetModuleCodeByCode } from "../../../../../api/services/code/services";
import dayjs from "dayjs";

const AddModal = ({ setStatus, onRefresh }) => {
  const [openModal, setopenModal] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "ozelAlan1",
      value: `${t("ozelAlan")} 1`,
      type: "text",
    },
    {
      label: "ozelAlan2",
      key: "ozelAlan2",
      value: `${t("ozelAlan")} 2`,
      type: "text",
    },
    {
      label: "ozelAlan3",
      key: "ozelAlan3",
      value: `${t("ozelAlan")} 3`,
      type: "text",
    },
    {
      label: "ozelAlan4",
      key: "ozelAlan4",
      value: `${t("ozelAlan")} 4`,
      type: "text",
    },
    {
      label: "ozelAlan5",
      key: "ozelAlan5",
      value: `${t("ozelAlan")} 5`,
      type: "text",
    },
    {
      label: "ozelAlan6",
      key: "ozelAlan6",
      value: `${t("ozelAlan")} 6`,
      type: "text",
    },
    {
      label: "ozelAlan7",
      key: "ozelAlan7",
      value: `${t("ozelAlan")} 7`,
      type: "text",
    },
    {
      label: "ozelAlan8",
      key: "ozelAlan8",
      value: `${t("ozelAlan")} 8`,
      type: "text",
    },
    {
      label: "ozelAlan9",
      key: "ozelAlan9",
      value: `${t("ozelAlan")} 9`,
      type: "select",
      code: 865,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "ozelAlan10",
      value: `${t("ozelAlan")} 10`,
      type: "select",
      code: 866,
      name2: "ozelAlanKodId10",
    },
    {
      label: "ozelAlan11",
      key: "ozelAlan11",
      value: `${t("ozelAlan")} 11`,
      type: "number",
    },
    {
      label: "ozelAlan12",
      key: "ozelAlan12",
      value: `${t("ozelAlan")} 12`,
      type: "number",
    },
  ]);

  const defaultValues = {
    aktif: true,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  const onSubmit = handleSubmit((values) => {
    const body = [
      {
        tarih: values.tarih,
        saat: values.saat || "00:00",
        aracId: values.aracId,
        surucuId: values.surucuId,
        otoYolKodId: values.otoYolKodId,
        girisTarih: values.girisTarih,
        girisSaat: values.girisSaat ? dayjs(values.girisSaat).format("HH:mm") : "00:00",
        cikisTarih: values.cikisTarih,
        cikisSaat: values.cikisSaat ? dayjs(values.cikisSaat).format("HH:mm") : "00:00",
        girisYeriKodId: values.girisYeriKodId,
        cikisYeriKodId: values.cikisYeriKodId,
        odemeTuruKodId: values.odemeTuruKodId,
        gecisUcreti: values.gecisUcreti,
        odemeDurumuKodId: values.odemeDurumuKodId,
        fisNo: values.fisNo,
        gecisKategorisiKodId: values.gecisKategorisiKodId,
        guzergahId: values.guzergahId,
        aciklama: values.aciklama,
        ozelAlan1: values.ozelAlan1 || "",
        ozelAlan2: values.ozelAlan2 || "",
        ozelAlan3: values.ozelAlan3 || "",
        ozelAlan4: values.ozelAlan4 || "",
        ozelAlan5: values.ozelAlan5 || "",
        ozelAlan6: values.ozelAlan6 || "",
        ozelAlan7: values.ozelAlan7 || "",
        ozelAlan8: values.ozelAlan8 || "",
        ozelAlanKodId9: values.ozelAlanKodId9 || -1,
        ozelAlanKodId10: values.ozelAlanKodId10 || -1,
        ozelAlan11: values.ozelAlan11 || 0,
        ozelAlan12: values.ozelAlan12 || 0,
      }
    ];
  
    AddHgsItemService(body).then((res) => {
      if (res.data.statusCode === 200) {
        onRefresh();
        reset(defaultValues);
        setopenModal(false);
        setIsValid("normal");
        setActiveKey("1");
        setLoading(false);
      }
    });
  });

  const personalProps = {
    form: "HgsIslem",
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

  const footer = [
    loading ? (
      <Button className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid === "success" ? false : isValid === "error" ? true : false}>
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setopenModal(false);
        reset(defaultValues);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setopenModal(true)} disabled={isValid === "error" ? true : isValid === "success" ? false : false}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal title={t("yeniHgsIslemKaydi")} open={openModal} onCancel={() => setopenModal(false)} maskClosable={false} footer={footer} width={1200}>
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
