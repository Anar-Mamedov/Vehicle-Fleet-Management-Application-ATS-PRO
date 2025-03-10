import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { uploadPhoto, uploadFile } from "../../../../../../../utils/upload";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { GetFuelCardContentByIdService, GetFuelCardInfoByFuelIdService, UpdateFuelService } from "../../../../../../../api/services/vehicles/operations_services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../../../../api/services/upload/services";
import GeneralInfo from "./GeneralInfo";
import PersonalFields from "../../../../../../components/form/personal-fields/PersonalFields";
import PhotoUpload from "../../../../../../components/upload/PhotoUpload";
import FileUpload from "../../../../../../components/upload/FileUpload";

const UpdateModal = ({ updateModal, setUpdateModal, id, setStatus, aracId }) => {
  const { data, plaka, setData } = useContext(PlakaContext);
  const [isValid, setIsValid] = useState(false);
  const [response, setResponse] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  // file
  const [filesUrl, setFilesUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  // photo
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState([]);

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
      code: 867,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 868,
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
    sonAlinanKm: null,
    plaka: "",
    yakitTipId: null,
    yakitTanki: "",
    surucuId: null,
    surucu: "",
    litreFiyat: null,
    yakitHacmi: null,
    tarih: dayjs(new Date()),
    saat: dayjs(new Date()),
    alinanKm: null,
    farkKm: null,
    miktar: null,
    fullDepo: false,
    tutar: null,
    tuketim: null,
    engelle: false,
    kdv: null,
    kdvOran: null,
    kdvDahil: false,
    kdvSizTutar: null,
    kdvTutar: null,
    birim: null,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, watch, setValue } = methods;

  useEffect(() => {
    if (updateModal) {
      GetFuelCardInfoByFuelIdService(id).then((res) => {
        setValue("aracId", res?.data.aracId);
        setValue("plaka", res?.data.plaka);
        setValue("surucuId", res?.data.surucuId);
        setValue("surucu", res?.data.surucuAdi);
        setValue("yakitTipId", res?.data.yakitTipId);
        setValue("yakitTip", res?.data.yakitTip);
        setValue("lokasyonId", res?.data.lokasyonId);
        setValue("lokasyon", res?.data.lokasyon);
        setValue("firmaId", res?.data.firmaId);
        setValue("firma", res?.data.firma);
        setValue("istasyonKodId", res?.data.istasyonKodId);
        setValue("istasyon", res?.data.istasyon);
        setValue("sonAlinanKm", res?.data.sonAlinanKm);
        setValue("alinanKm", res?.data.alinanKm);
        setValue("farkKm", res?.data.farkKm);
        setValue("tuketim", res?.data.tuketim);
        setValue("miktar", res?.data.miktar);
        setValue("tutar", res?.data.tutar);
        setValue("litreFiyat", res?.data.litreFiyat);
        /*  setValue("kdvOran", res?.data.kdv);
        const kdvAmount = (watch("tutar") * (100 - res?.data.kdv)) / 100;
        setValue("kdv", kdvAmount); */
        setValue("kdvOran", res?.data.kdvOran);
        setValue("kdvDahil", res?.data.kdvDahilHaric);
        // setValue("kdvSizTutar", res?.data.kdvSizTutar);
        setValue("kdv", res?.data.kdv);
        setValue("faturaNo", res?.data.faturaNo);
        setValue("guzergahId", res?.data.guzergahId);
        setValue("guzergah", res?.data.guzergah);
        setValue("ozelKullanim", res?.data.ozelKullanim);
        setValue("fullDepo", res?.data.fullDepo);
        setValue("stokKullanimi", res?.data.stokKullanimi);
        setValue("aciklama", res?.data.aciklama);
        setValue("faturaTarih", res?.data.faturaTarih ? dayjs(res?.data.faturaTarih) : null);
        setValue("tarih", res?.data.tarih ? dayjs(res?.data.tarih) : null);
        setValue("saat", dayjs(res?.data.saat, "HH:mm:ss"));
        setValue("ozelAlan1", res?.data.ozelAlan1);
        setValue("ozelAlan2", res?.data.ozelAlan2);
        setValue("ozelAlan3", res?.data.ozelAlan3);
        setValue("ozelAlan4", res?.data.ozelAlan4);
        setValue("ozelAlan5", res?.data.ozelAlan5);
        setValue("ozelAlan6", res?.data.ozelAlan6);
        setValue("ozelAlan7", res?.data.ozelAlan7);
        setValue("ozelAlan8", res?.data.ozelAlan8);
        setValue("ozelAlan9", res?.data.ozelAlan9);
        setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9);
        setValue("ozelAlan10", res?.data.ozelAlan10);
        setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10);
        setValue("ozelAlan11", res?.data.ozelAlan11);
        setValue("ozelAlan12", res?.data.ozelAlan12);
        setValue("siraNo", res?.data.siraNo);
        setValue("kmLogId", res?.data.kmLogId);
        setValue("eskiKm", res?.data.kmLogEskiKm);
        setValue("engelle", res?.data.hasToInsertKmLog);
        setValue("yakitHacmi", res?.data.yakitHacmi);
        setValue("kdvDahilHaric", res?.data.kdvDahilHaric);
      });

      GetPhotosByRefGroupService(id, "YAKIT").then((res) => setImageUrls(res.data));
      GetDocumentsByRefGroupService(id, "YAKIT").then((res) => setFilesUrl(res.data));

      setImages([]);
    }
  }, [id, updateModal]);

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(id, "YAKIT", images, false);
      setImageUrls([...imageUrls, data.imageUrl]);
    } catch (error) {
      message.error("Resim yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingImages(false);
    }
  };

  const uploadFiles = () => {
    try {
      setLoadingFiles(true);
      uploadFile(id, "YAKIT", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const onSubmit = handleSubmit((values) => {
    const kmLog = !watch("engelle")
      ? {
          siraNo: watch("kmLogId"),
          kmAracId: watch("aracId"),
          plaka: watch("plaka"),
          tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
          saat: dayjs(watch("saat")).format("HH:mm:ss"),
          yeniKm: watch("alinanKm"),
          eskiKm: watch("eskiKm"),
          dorse: false,
          kaynak: "YAKIT",
          lokasyonId: watch("lokasyonId"),
        }
      : null;

    const body = {
      siraNo: id,
      aracId: aracId,
      plaka: values.plaka,
      tarih: values.tarih ? dayjs(values.tarih).format("YYYY-MM-DD") : null,
      faturaTarih: values.faturaTarih ? dayjs(values.faturaTarih).format("YYYY-MM-DD") : null,
      saat: values.saat ? dayjs(values.saat).format("HH:mm:ss") : null,
      aciklama: values.aciklama,
      faturaNo: values.faturaNo,
      sonAlinanKm: values.sonAlinanKm,
      farkKm: values.farkKm,
      // "yakitHacmi": `${values.yakitHacmi}`,
      yakitTipId: values.yakitTipId,
      lokasyonId: values.lokasyonId,
      guzergahId: values.guzergahId,
      surucuId: values.surucuId,
      firmaId: values.firmaId,
      istasyonKodId: values.istasyonKodId,
      // tuketim: values.tuketim,
      alinanKm: values.alinanKm,
      miktar: values.miktar,
      kdv: values.kdv,
      kdvOran: values.kdvOran,
      kdvDahilHaric: values.kdvDahil,
      kdvSizTutar: values.kdvSizTutar,
      fullDepo: values.fullDepo,
      ozelKullanim: values.ozelKullanim,
      stokKullanimi: values.stokKullanimi,
      litreFiyat: values.litreFiyat,
      tutar: values.tutar,
      birim: values.birim,
      hasToInsertKmLog: values.engelle,
      kmLog: kmLog,
      ozelAlan1: values.ozelAlan1,
      ozelAlan2: values.ozelAlan2,
      ozelAlan3: values.ozelAlan3,
      ozelAlan4: values.ozelAlan4,
      ozelAlan5: values.ozelAlan5,
      ozelAlan6: values.ozelAlan6,
      ozelAlan7: values.ozelAlan7,
      ozelAlan8: values.ozelAlan8,
      ozelAlanKodId9: values.ozelAlanKodId9 || 0,
      ozelAlanKodId10: values.ozelAlanKodId10 || 0,
      ozelAlan11: values.ozelAlan11 || 0,
      ozelAlan12: values.ozelAlan12 || 0,
      depoYakitMiktar: values.depoYakitMiktar,
      // "yakitTanki": values.yakitTanki
    };

    UpdateFuelService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setResponse("normal");
        setStatus(true);
        if (plaka.length === 1) {
          reset({
            plaka: data.plaka,
            sonAlinanKm: data.sonAlinanKm,
            litreFiyat: data.litreFiyat,
            tarih: dayjs(new Date()),
            saat: dayjs(new Date()),
            alinanKm: null,
            farkKm: null,
            miktar: null,
            fullDepo: false,
            tutar: null,
            tuketim: null,
            engelle: false,
            surucuId: data.surucuId,
            yakitTipId: data.yakitTipId,
            yakitTip: data.yakitTip,
            surucu: data.surucuAdi,
            stokKullanimi: data.stokKullanimi,
            yakitHacmi: data.yakitHacmi,
          });
        } else {
          reset();
        }
        setActiveKey("1");
        if (plaka.length === 1) {
          GetFuelCardContentByIdService(plaka[0].id).then((res) => {
            setData(res.data);
          });
        }
      }
    });

    uploadImages();
    uploadFiles();
    setStatus(false);
  });

  const personalProps = {
    form: "YAKIT",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo setIsValid={setIsValid} response={response} setResponse={setResponse} />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "3",
      label: `[${imageUrls.length}] ${t("resimler")}`,
      children: <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />,
    },
    {
      key: "4",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        setResponse("normal");
        setStatus(true);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Modal title={t("yakitBilgisiGuncelle")} open={updateModal} onCancel={() => setUpdateModal(false)} maskClosable={false} footer={footer} width={1200}>
        <FormProvider {...methods}>
          <form>
            <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
  aracId: PropTypes.number,
};

export default UpdateModal;
