import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { GetModuleCodeByCode, CodeItemValidateService } from "../../../../api/services/code/services";
import { AddDriverService } from "../../../../api/services/sistem-tanimlari/services";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import GeneralInfo from "./tabs/GeneralInfo";
import KisiselBilgiler from "./tabs/KisiselBilgiler";
import KimlikBilgiler from "./tabs/KimlikBilgiler";
import EhliyetBilgiler from "./tabs/EhliyetBilgiler";
import MeslekiYeterlilik from "./tabs/MeslekiYeterlilik";

const AddModal = ({ setStatus, onRefresh }) => {
  const isFirstRender = useRef(true);
  const [openModal, setopenModal] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);
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
      GetModuleCodeByCode("SURUCU_KOD").then((res) => setValue("surucuKod", res.data));
    }
  }, [openModal, setValue]);

  useEffect(() => {
    if (watch("surucuKod")) {
      const body = {
        tableName: "SurucuTanimlari",
        code: watch("surucuKod"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("surucuKod")]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      surucuKod: values.surucuKod,
      aktif: values.aktif,
      isim: values.isim,
      lokasyonId: values.lokasyonId || -1,
      departmanKodId: values.departmanKodId || -1,
      adres: values.adres,
      surucuTipKodId: values.surucuTipKodId || -1,
      gorevKodId: values.gorevKodId || -1,
      il: values.il,
      ilce: values.ilce,
      telefon1: values.telefon1,
      telefon2: values.telefon2,
      fax: values.fax,
      gsm: values.gsm,
      cezaPuani: values.cezaPuani,
      sifre: values.sifre,
      kanGrubu: values.kanGrubu,
      sskNo: values.sskNo,
      vergiNo: values.vergiNo,
      egitimDurumu: values.egitimDurumu,
      mezunOlduguOkul: values.mezunOlduguOkul,
      mezunOlduguBolum: values.mezunOlduguBolum,
      iseBaslamaTarih: dayjs(values.iseBaslamaTarih).format("YYYY-MM-DD"),
      istenAyrilmaTarih: dayjs(values.istenAyrilmaTarih).format("YYYY-MM-DD"),
      mezuniyetTarih: dayjs(values.mezuniyetTarih).format("YYYY-MM-DD"),
      tcKimlikNo: values.tcKimlikNo,
      kimlikSeriNo: values.kimlikSeriNo,
      babaAdi: values.babaAdi,
      anaAdi: values.anaAdi,
      dogumYeri: values.dogumYeri,
      dini: values.dini,
      kimlikKayitNo: values.kimlikKayitNo,
      dogumTarihi: dayjs(values.dogumTarihi).format("YYYY-MM-DD"),
      medeniHali: values.medeniHali,
      kayitliOlduguIl: values.kayitliOlduguIl,
      kayitliOlduguIlce: values.kayitliOlduguIlce,
      mahalleKoy: values.mahalleKoy,
      kimlikCiltNo: values.kimlikCiltNo,
      kimlikAileSiraNo: values.kimlikAileSiraNo,
      kimlikSiraNo: values.kimlikSiraNo,
      kimlikVerildigiYer: values.kimlikVerildigiYer,
      kimlikVerilisNedeni: values.kimlikVerilisNedeni,
      kimlikVerilisTarihi: dayjs(values.kimlikVerilisTarihi).format("YYYY-MM-DD"),
      myb: values.myb,
      mybVerilisTarih: dayjs(values.mybVerilisTarih).format("YYYY-MM-DD"),
      mybBelgeNo: values.mybBelgeNo,
      mybKapsadigiDigerMyb: values.mybKapsadigiDigerMyb,
      mybTuru: values.mybTuru,
      mybBitisTarih: dayjs(values.mybBitisTarih).format("YYYY-MM-DD"),
      srcPiskoteknik: values.srcPiskoteknik,
      srcPiskoteknikVerilisTarihi: dayjs(values.srcPiskoteknikVerilisTarihi).format("YYYY-MM-DD"),
      srcPiskoteknikBelgeNo: values.srcPiskoteknikBelgeNo,
      srcPiskoteknikBitisTarihi: dayjs(values.srcPiskoteknikBitisTarihi).format("YYYY-MM-DD"),
      aciklama: values.aciklama,
      sinif: values.sinif,
      ehliyetVerildigiIlIlce: values.ehliyetVerildigiIlIlce,
      ehliyetBelgeTarihi: dayjs(values.ehliyetBelgeTarihi).format("YYYY-MM-DD"),
      ehliyetSeriNo: values.ehliyetSeriNo,
      ehliyetKullandigiChiazProtez: values.ehliyetKullandigiChiazProtez,
      ehliyetNo: values.ehliyetNo,
      ozelAlan1: values.ozelAlan1,
      ozelAlan2: values.ozelAlan2,
      ozelAlan3: values.ozelAlan3,
      ozelAlan4: values.ozelAlan4,
      ozelAlan5: values.ozelAlan5,
      ozelAlan6: values.ozelAlan6,
      ozelAlan7: values.ozelAlan7,
      ozelAlan8: values.ozelAlan8,
      ozelAlanKodId9: values.ozelAlanKodId9 || -1,
      ozelAlanKodId10: values.ozelAlanKodId10 || -1,
      ozelAlan11: values.ozelAlan11 || -1,
      ozelAlan12: values.ozelAlan12 || -1,
    };

    AddDriverService(body).then((res) => {
      if (res.data.statusCode === 200) {
        onRefresh();
        reset(defaultValues);
        setopenModal(false);
        setActiveKey("1");
        setLoading(false);
      }
    });
    onRefresh();
  });

  const personalProps = {
    form: "Surucu",
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
      label: t("kisiselBilgiler"),
      children: <KisiselBilgiler />,
    },
    {
      key: "3",
      label: t("kimlikBIlgiler"),
      children: <KimlikBilgiler />,
    },
    {
      key: "4",
      label: t("ehliyetBilgiler"),
      children: <EhliyetBilgiler />,
    },
    {
      key: "5",
      label: t("meslekiYeterlilik"),
      children: <MeslekiYeterlilik />,
    },
    {
      key: "6",
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
      <Modal title={t("yeniSurucuGirisi")} open={openModal} onCancel={() => setopenModal(false)} maskClosable={false} footer={footer} width={1200}>
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
