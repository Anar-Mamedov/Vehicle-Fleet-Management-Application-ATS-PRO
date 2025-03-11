import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { CodeItemValidateService } from "../../../../../api/service";
import PersonalFields from "../../../../components/form/PersonalFields";
import GeneralInfo from "./GeneralInfo";
import Iletisim from "./Iletisim";
import { AddEmployeeService, GetPersonelCodeService } from "../../../../../api/services/personel_services";
import dayjs from "dayjs";
import KisiselBilgiler from "./KisiselBilgiler";

const AddModal = ({ setStatus, onRefresh }) => {
  const [openModal, setopenModal] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const isFirstRender = useRef(true);

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
    aktif: true,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (openModal && isFirstRender.current) {
      GetPersonelCodeService().then((res) => setValue("personelKod", res.data));
    }
  }, [openModal, setValue]);

  useEffect(() => {
    if (watch("personelKod")) {
      const body = {
        tableName: "PersonelTanimlari",
        code: watch("personelKod"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("personelKod")]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      personelKod: values.personelKod,
      isim: values.isim,
      lokasyonId: values.lokasyonId || -1,
      unvanKodId: values.unvanKodId || -1,
      personelTipiKodId: values.personelTipiKodId || -1,
      departmanKodId: values.departmanKodId || -1,
      gorevKodId: values.gorevKodId || -1,
      sskNo: values.sskNo,
      ehliyet: values.ehliyet,
      ehliyetSinifi: values.ehliyetSinifi,
      ehliyetNo: values.ehliyetNo,
      kanGrubu: values.kanGrubu,
      dogumTarihi: dayjs(values.dogumTarihi).format("YYYY-MM-DD"),
      anneAdi: values.anneAdi,
      babaAdi: values.babaAdi,
      tcKimlikNo: values.tcKimlikNo,
      beden: values.beden,
      ayakKabiNo: values.ayakKabiNo,
      adres: values.adres,
      il: values.il,
      ilce: values.ilce,
      email: values.email,
      web: values.web,
      tel1: values.tel1,
      tel2: values.tel2,
      fax: values.fax,
      aciklama: values.aciklama,
      gsm: values.gsm,
      aktif: values.aktif,
      iseBaslamaTarihi: dayjs(values.iseBaslamaTarihi).format("YYYY-MM-DD"),
      isetenAyrilmaTarihi: dayjs(values.isetenAyrilmaTarihi).format("YYYY-MM-DD"),
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
    };

    AddEmployeeService(body).then((res) => {
      if (res.data.statusCode === 200) {
        onRefresh();
        reset(defaultValues);
        setopenModal(false);
      }
    });
    onRefresh();
  });

  const personalProps = {
    form: "Personel",
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
      label: t("iletisim"),
      children: <Iletisim />,
    },
    {
      key: "3",
      label: t("kisiselBilgiler"),
      children: <KisiselBilgiler />,
    },
    {
      key: "4",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setopenModal(false);
        reset(defaultValues);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setopenModal(true)} disabled={isValid === "error" ? true : isValid === "success" ? false : false}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal title={t("yeniPersonelGirisi")} open={openModal} onCancel={() => setopenModal(false)} maskClosable={false} footer={footer} width={1200}>
        <FormProvider {...methods}>
          <form>
            <Tabs defaultActiveKey="1" items={items} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddModal;
