import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../api/services/code/services";
import { GetDriverByIdService, UpdateDriverService } from "../../../../api/services/sistem-tanimlari/surucu_services";
import { uploadPhoto } from "../../../../utils/upload";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import GeneralInfoUpdate from "./tabs/GeneralInfoUpdate";
import KisiselBilgiler from "./tabs/KisiselBilgiler";
import KimlikBilgiler from "./tabs/KimlikBilgiler";
import EhliyetBilgiler from "./tabs/EhliyetBilgiler";
import MeslekiYeterlilik from "./tabs/MeslekiYeterlilik";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [isValid, setIsValid] = useState("normal");
  const [surucuId, setSurucuId] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
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

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetDriverByIdService(selectedRow?.key);

        setValue("surucuKod", res.data.surucuKod);
        setValue("isim", res.data.isim);
        setValue("lokasyonId", res.data.lokasyonId);
        setValue("lokasyon", res.data.lokasyon);
        setValue("adres", res.data.adres);
        setValue("surucuTipKodId", res.data.surucuTipKodId);
        setValue("surucuTip", res.data.surucuTip);
        setValue("gorevKodId", res.data.gorevKodId);
        setValue("gorev", res.data.gorev);
        setValue("ilce", res.data.ilce);
        setValue("il", res.data.il);
        setValue("telefon1", res.data.telefon1);
        setValue("telefon2", res.data.telefon2);
        setValue("gsm", res.data.gsm);
        setValue("fax", res.data.fax);
        setValue("aktif", res.data.aktif);
        setValue("departmanKodId", res.data.departmanKodId);
        setValue("departman", res.data.departman);
        setValue("cezaPuani", res.data.cezaPuani);
        setValue("sifre", res.data.sifre);
        setValue("kanGrubu", res.data.kanGrubu);
        setValue("sskNo", res.data.sskNo);
        setValue("vergiNo", res.data.vergiNo);
        setValue("egitimDurumu", res.data.egitimDurumu);
        setValue("mezunOlduguOkul", res.data.mezunOlduguOkul);
        setValue("mezunOlduguBolum", res.data.mezunOlduguBolum);
        setValue("tcKimlikNo", res.data.tcKimlikNo);
        setValue("kimlikSeriNo", res.data.kimlikSeriNo);
        setValue("iseBaslamaTarih", res.data.iseBaslamaTarih ? dayjs(res.data.iseBaslamaTarih) : null);
        setValue("istenAyrilmaTarih", res.data.istenAyrilmaTarih ? dayjs(res.data.istenAyrilmaTarih) : null);
        setValue("mezuniyetTarih", res.data.mezuniyetTarih ? dayjs(res.data.mezuniyetTarih) : null);
        setValue("babaAdi", res.data.babaAdi);
        setValue("anaAdi", res.data.anaAdi);
        setValue("dogumYeri", res.data.dogumYeri);
        setValue("dini", res.data.dini);
        setValue("kimlikKayitNo", res.data.kimlikKayitNo);
        setValue("kayitliOlduguIl", res.data.kayitliOlduguIl);
        setValue("medeniHali", res.data.medeniHali);
        setValue("dogumTarihi", res.data.dogumTarihi ? dayjs(res.data.dogumTarihi) : null);
        setValue("kayitliOlduguIlce", res.data.kayitliOlduguIlce);
        setValue("mahalleKoy", res.data.mahalleKoy);
        setValue("kimlikCiltNo", res.data.kimlikCiltNo);
        setValue("kimlikAileSiraNo", res.data.kimlikAileSiraNo);
        setValue("kimlikSiraNo", res.data.kimlikSiraNo);
        setValue("kimlikVerildigiYer", res.data.kimlikVerildigiYer);
        setValue("kimlikVerilisNedeni", res.data.kimlikVerilisNedeni);
        setValue("kimlikVerilisTarihi", res.data.kimlikVerilisTarihi ? dayjs(res.data.kimlikVerilisTarihi) : null);
        setValue("myb", res.data.myb);
        setValue("mybBelgeNo", res.data.mybBelgeNo);
        setValue("mybKapsadigiDigerMyb", res.data.mybKapsadigiDigerMyb);
        setValue("mybTuru", res.data.mybTuru);
        setValue("mybVerilisTarih", res.data.mybVerilisTarih ? dayjs(res.data.mybVerilisTarih) : null);
        setValue("mybBitisTarih", res.data.mybBitisTarih ? dayjs(res.data.mybBitisTarih) : null);
        setValue("srcPiskoteknikVerilisTarihi", res.data.srcPiskoteknikVerilisTarihi ? dayjs(res.data.srcPiskoteknikVerilisTarihi) : null);
        setValue("srcPiskoteknikBitisTarihi", res.data.srcPiskoteknikBitisTarihi ? dayjs(res.data.srcPiskoteknikBitisTarihi) : null);
        setValue("srcPiskoteknik", res.data.srcPiskoteknik);
        setValue("srcPiskoteknikBelgeNo", res.data.srcPiskoteknikBelgeNo);
        setValue("aciklama", res.data.aciklama);
        setValue("sinif", res.data.sinif);
        setValue("ehliyetVerildigiIlIlce", res.data.ehliyetVerildigiIlIlce);
        setValue("ehliyetBelgeTarihi", res.data.ehliyetBelgeTarihi ? dayjs(res.data.ehliyetBelgeTarihi) : null);
        setValue("ehliyetSeriNo", res.data.ehliyetSeriNo);
        setValue("ehliyetKullandigiChiazProtez", res.data.ehliyetKullandigiChiazProtez);
        setValue("ehliyetNo", res.data.ehliyetNo);
        setValue("isim", res.data.isim);
        setSurucuId(res.data.surucuId);
        setValue("ozelAlan1", res?.data.ozelAlan1);
        setValue("ozelAlan2", res?.data.ozelAlan2);
        setValue("ozelAlan3", res?.data.ozelAlan3);
        setValue("ozelAlan4", res?.data.ozelAlan4);
        setValue("ozelAlan5", res?.data.ozelAlan5);
        setValue("ozelAlan6", res?.data.ozelAlan6);
        setValue("ozelAlan7", res?.data.ozelAlan7);
        setValue("ozelAlan8", res?.data.ozelAlan8);
        setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9);
        setValue("ozelAlan9", res?.data.ozelAlan9);
        setValue("ozelAlan10", res?.data.ozelAlan10);
        setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10);
        setValue("ozelAlan11", res?.data.ozelAlan11);
        setValue("ozelAlan12", res?.data.ozelAlan12);

        setImagesURL([...images, res.data.defPhotoInfo]);
      } catch (error) {
        console.error("Error updating driver:", error);
      }
    };

    if (drawerVisible) {
      fetchData();
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      surucuId: surucuId,
      surucuKod: values.surucuKod,
      isim: values.isim,
      aktif: values.aktif,
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
      iseBaslamaTarih: values.iseBaslamaTarih ? dayjs(values.iseBaslamaTarih).format("YYYY-MM-DD") : null,
      istenAyrilmaTarih: values.istenAyrilmaTarih ? dayjs(values.istenAyrilmaTarih).format("YYYY-MM-DD") : null,
      mezuniyetTarih: values.mezuniyetTarih ? dayjs(values.mezuniyetTarih).format("YYYY-MM-DD") : null,
      tcKimlikNo: values.tcKimlikNo,
      kimlikSeriNo: values.kimlikSeriNo,
      babaAdi: values.babaAdi,
      anaAdi: values.anaAdi,
      dogumYeri: values.dogumYeri,
      dini: values.dini,
      kimlikKayitNo: values.kimlikKayitNo,
      dogumTarihi: values.dogumTarihi ? dayjs(values.dogumTarihi).format("YYYY-MM-DD") : null,
      medeniHali: values.medeniHali,
      kayitliOlduguIl: values.kayitliOlduguIl,
      kayitliOlduguIlce: values.kayitliOlduguIlce,
      mahalleKoy: values.mahalleKoy,
      kimlikCiltNo: values.kimlikCiltNo,
      kimlikAileSiraNo: values.kimlikAileSiraNo,
      kimlikSiraNo: values.kimlikSiraNo,
      kimlikVerildigiYer: values.kimlikVerildigiYer,
      kimlikVerilisNedeni: values.kimlikVerilisNedeni,
      kimlikVerilisTarihi: values.kimlikVerilisTarihi ? dayjs(values.kimlikVerilisTarihi).format("YYYY-MM-DD") : null,
      myb: values.myb,
      mybVerilisTarih: values.mybVerilisTarih ? dayjs(values.mybVerilisTarih).format("YYYY-MM-DD") : null,
      mybBelgeNo: values.mybBelgeNo,
      mybKapsadigiDigerMyb: values.mybKapsadigiDigerMyb,
      mybTuru: values.mybTuru,
      mybBitisTarih: values.mybBitisTarih ? dayjs(values.mybBitisTarih).format("YYYY-MM-DD") : null,
      srcPiskoteknik: values.srcPiskoteknik,
      srcPiskoteknikVerilisTarihi: values.srcPiskoteknikVerilisTarihi ? dayjs(values.srcPiskoteknikVerilisTarihi).format("YYYY-MM-DD") : null,
      srcPiskoteknikBelgeNo: values.srcPiskoteknikBelgeNo,
      srcPiskoteknikBitisTarihi: values.srcPiskoteknikBitisTarihi ? dayjs(values.srcPiskoteknikBitisTarihi).format("YYYY-MM-DD") : null,
      aciklama: values.aciklama,
      sinif: values.sinif,
      ehliyetVerildigiIlIlce: values.ehliyetVerildigiIlIlce,
      ehliyetBelgeTarihi: values.ehliyetBelgeTarihi ? dayjs(values.ehliyetBelgeTarihi).format("YYYY-MM-DD") : null,
      ehliyetSeriNo: values.ehliyetSeriNo,
      ehliyetKullandigiChiazProtez: values.ehliyetKullandigiChiazProtez,
      ehliyetNo: values.ehliyetNo,
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

    UpdateDriverService(body).then((res) => {
      if (res.data.statusCode === 202) {
        onDrawerClose();
        onRefresh();
        reset(defaultValues);
      }
    });

    uploadPhoto(surucuId, "SURUCU", images, true);
    setImages([]);
    setImagesURL([]);
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
      children: <GeneralInfoUpdate isValid={isValid} setImages={setImages} urls={imagesURL} />,
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
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        onDrawerClose();
        reset(defaultValues);
        setImages([]);
        setImagesURL([]);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal title={`${watch("isim")} - ${t("guncellemeEkrani")}`} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <form>
          <Tabs defaultActiveKey="1" items={items} />
        </form>
      </FormProvider>
    </Modal>
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
};

export default UpdateModal;
