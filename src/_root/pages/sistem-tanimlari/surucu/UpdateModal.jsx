import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal, Spin, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../api/services/code/services";
import { GetDriverByIdService, UpdateDriverService } from "../../../../api/services/sistem-tanimlari/surucu_services";
import { uploadPhoto } from "../../../../utils/upload";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import TemelBilgiler from "./tabs/TemelBilgiler";
import EhliyetVeMeslekiBelgeler from "./tabs/EhliyetVeMeslekiBelgeler";
import DetayBilgiler from "./tabs/DetayBilgiler";
import DosyaUpload from "../../../components/Dosya/DosyaUpload";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [isValid, setIsValid] = useState("normal");
  const [surucuId, setSurucuId] = useState(0);
  const [sonGirisZamani, setSonGirisZamani] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
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
    if (!drawerVisible) return undefined;

    // Yeni sürücü açılırken önceki kaydın bilgileri ekranda kalmasın diye form sıfırlanıp yükleniyor durumuna geçilir
    reset(defaultValues);
    setImagesURL([]);
    setSonGirisZamani(null);
    setDetailLoading(true);

    // Hızlı sürücü değişiminde geç gelen yanıtın yeni kaydın üstüne yazmaması için istek iptal edilmiş sayılır
    let isCurrentRequest = true;

    const fetchData = async () => {
      try {
        const res = await GetDriverByIdService(selectedRow?.key);
        if (!isCurrentRequest) return;

        setValue("surucuKod", res.data.surucuKod);
        setValue("isim", res.data.isim);
        setValue("lokasyonId", res.data.lokasyonId);
        setValue("lokasyon", res.data.lokasyon);
        setValue("surucuTipKodId", res.data.surucuTipKodId);
        setValue("surucuTip", res.data.surucuTip);
        setValue("gorevKodId", res.data.gorevKodId);
        setValue("gorev", res.data.gorev);
        setValue("unvan", res.data.unvan);
        setValue("mobilErisim", res.data.mobilErisim);
        setValue("gsm", res.data.gsm);
        setValue("aktif", res.data.aktif);
        setValue("departmanKodId", res.data.departmanKodId);
        setValue("departman", res.data.departman);
        setValue("cezaPuani", res.data.cezaPuani);
        setValue("sifre", res.data.sifre);
        setValue("iseBaslamaTarih", res.data.iseBaslamaTarih ? dayjs(res.data.iseBaslamaTarih) : null);
        setValue("dogumTarihi", res.data.dogumTarihi ? dayjs(res.data.dogumTarihi) : null);
        setValue("tcKimlikNo", res.data.tcKimlikNo);
        setValue("egitimDurumu", res.data.egitimDurumu);
        setValue("mezunOlduguOkul", res.data.mezunOlduguOkul);
        setValue("mezunOlduguBolum", res.data.mezunOlduguBolum);
        setValue("mezuniyetTarih", res.data.mezuniyetTarih ? dayjs(res.data.mezuniyetTarih) : null);
        setValue("isSicilNo", res.data.isSicilNo);
        setValue("kanGrubu", res.data.kanGrubu);
        setValue("kiyafetBedeni", res.data.kiyafetBedeni);
        setValue("acilDurumKisi", res.data.acilDurumKisi);
        setValue("acilDurumTelefonu", res.data.acilDurumTelefonu);
        setValue("ileriSurusEgitimi", res.data.ileriSurusEgitimi);
        setValue("yukEmniyetEgitimi", res.data.yukEmniyetEgitimi);
        setValue("src", res.data.src);
        setValue("srcTuru", res.data.srcTuru);
        setValue("srcBelgeNo", res.data.srcBelgeNo);
        setValue("srcVerilisTarih", res.data.srcVerilisTarih ? dayjs(res.data.srcVerilisTarih) : null);
        setValue("srcBitisTarih", res.data.srcBitisTarih ? dayjs(res.data.srcBitisTarih) : null);
        setValue("srcPiskoteknikVerilisTarihi", res.data.srcPiskoteknikVerilisTarihi ? dayjs(res.data.srcPiskoteknikVerilisTarihi) : null);
        setValue("srcPiskoteknikBitisTarihi", res.data.srcPiskoteknikBitisTarihi ? dayjs(res.data.srcPiskoteknikBitisTarihi) : null);
        setValue("srcPiskoteknik", res.data.srcPiskoteknik);
        setValue("srcPiskoteknikBelgeNo", res.data.srcPiskoteknikBelgeNo);
        setValue("takografKarti", res.data.takografKarti);
        setValue("takografKartNo", res.data.takografKartNo);
        setValue("takografVerilisTarih", res.data.takografVerilisTarih ? dayjs(res.data.takografVerilisTarih) : null);
        setValue("takografBitisTarih", res.data.takografBitisTarih ? dayjs(res.data.takografBitisTarih) : null);
        setValue("aciklama", res.data.aciklama);
        setValue("sinif", res.data.sinif);
        setValue("ehliyetVerildigiIlIlce", res.data.ehliyetVerildigiIlIlce);
        setValue("ehliyetVerilisTarih", res.data.ehliyetVerilisTarih ? dayjs(res.data.ehliyetVerilisTarih) : null);
        setValue("ehliyetYenilemeTarih", res.data.ehliyetYenilemeTarih ? dayjs(res.data.ehliyetYenilemeTarih) : null);
        setValue("ehliyetSeriNo", res.data.ehliyetSeriNo);
        setValue("ehliyetNo", res.data.ehliyetNo);
        setValue("isim", res.data.isim);
        setValue("email", res.data.email);
        setSurucuId(res.data.surucuId);
        setSonGirisZamani(res.data.sonGirisZamani || null);
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
      } finally {
        if (isCurrentRequest) setDetailLoading(false);
      }
    };

    fetchData();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      surucuId: surucuId,
      surucuKod: values.surucuKod,
      isim: values.isim,
      aktif: values.aktif,
      lokasyonId: values.lokasyonId || 0,
      departmanKodId: values.departmanKodId || -1,
      surucuTipKodId: values.surucuTipKodId || -1,
      gorevKodId: values.gorevKodId || -1,
      unvan: values.unvan,
      mobilErisim: values.mobilErisim || false,
      gsm: values.gsm,
      cezaPuani: values.cezaPuani,
      sifre: values.sifre,
      iseBaslamaTarih: values.iseBaslamaTarih ? dayjs(values.iseBaslamaTarih).format("YYYY-MM-DD") : null,
      dogumTarihi: values.dogumTarihi ? dayjs(values.dogumTarihi).format("YYYY-MM-DD") : null,
      tcKimlikNo: values.tcKimlikNo,
      egitimDurumu: values.egitimDurumu,
      mezunOlduguOkul: values.mezunOlduguOkul,
      mezunOlduguBolum: values.mezunOlduguBolum,
      mezuniyetTarih: values.mezuniyetTarih ? dayjs(values.mezuniyetTarih).format("YYYY-MM-DD") : null,
      isSicilNo: values.isSicilNo,
      kanGrubu: values.kanGrubu,
      kiyafetBedeni: values.kiyafetBedeni,
      acilDurumKisi: values.acilDurumKisi,
      acilDurumTelefonu: values.acilDurumTelefonu,
      ileriSurusEgitimi: values.ileriSurusEgitimi || false,
      yukEmniyetEgitimi: values.yukEmniyetEgitimi || false,
      src: values.src || false,
      srcTuru: values.srcTuru,
      srcBelgeNo: values.srcBelgeNo,
      srcVerilisTarih: values.srcVerilisTarih ? dayjs(values.srcVerilisTarih).format("YYYY-MM-DD") : null,
      srcBitisTarih: values.srcBitisTarih ? dayjs(values.srcBitisTarih).format("YYYY-MM-DD") : null,
      srcPiskoteknik: values.srcPiskoteknik || false,
      srcPiskoteknikVerilisTarihi: values.srcPiskoteknikVerilisTarihi ? dayjs(values.srcPiskoteknikVerilisTarihi).format("YYYY-MM-DD") : null,
      srcPiskoteknikBelgeNo: values.srcPiskoteknikBelgeNo,
      srcPiskoteknikBitisTarihi: values.srcPiskoteknikBitisTarihi ? dayjs(values.srcPiskoteknikBitisTarihi).format("YYYY-MM-DD") : null,
      takografKarti: values.takografKarti || false,
      takografKartNo: values.takografKartNo,
      takografVerilisTarih: values.takografVerilisTarih ? dayjs(values.takografVerilisTarih).format("YYYY-MM-DD") : null,
      takografBitisTarih: values.takografBitisTarih ? dayjs(values.takografBitisTarih).format("YYYY-MM-DD") : null,
      aciklama: values.aciklama,
      sinif: values.sinif,
      ehliyetVerildigiIlIlce: values.ehliyetVerildigiIlIlce,
      ehliyetVerilisTarih: values.ehliyetVerilisTarih ? dayjs(values.ehliyetVerilisTarih).format("YYYY-MM-DD") : null,
      ehliyetYenilemeTarih: values.ehliyetYenilemeTarih ? dayjs(values.ehliyetYenilemeTarih).format("YYYY-MM-DD") : null,
      ehliyetSeriNo: values.ehliyetSeriNo,
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
      email: values.email,
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
      label: t("temelBilgiler"),
      children: <TemelBilgiler isValid={isValid} setImages={setImages} urls={imagesURL} sonGirisZamani={sonGirisZamani} />,
    },
    {
      key: "2",
      label: t("ehliyetVeMeslekiBelgeler"),
      children: <EhliyetVeMeslekiBelgeler />,
    },
    {
      key: "3",
      label: t("detayBilgiler"),
      children: <DetayBilgiler />,
    },
    {
      key: "4",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "5",
      label: t("ekliBelgeler"),
      children: <DosyaUpload selectedRowID={selectedRow?.key} refGroup="SURUCU" />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={detailLoading}>
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

  // Detay yüklenirken form boş olduğu için başlıkta tablodan gelen isim gösterilir
  const modalTitle = `${watch("isim") || selectedRow?.isim || ""} - ${t("guncellemeEkrani")}`;

  return (
    <Modal title={modalTitle} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={detailLoading}>
            <div style={{ minHeight: "420px" }}>
              <Tabs defaultActiveKey="1" items={items} />
            </div>
          </Spin>
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
