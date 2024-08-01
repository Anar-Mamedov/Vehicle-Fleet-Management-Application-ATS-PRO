import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import {
  GetDocumentsByRefGroupService,
  GetPhotosByRefGroupService,
} from "../../../../../api/services/upload/services";
import {
  UpdateCompanyItemService,
  GetCompanyByIdService,
} from "../../../../../api/services/sistem-tanimlari/services";
import GeneralInfo from "./GeneralInfo";
import Iletisim from "./Iletisim";
import PersonalFields from "../../../../components/form/PersonalFields";
import FinansBilgileri from "./FinansBilgileri";
import { uploadFile, uploadPhoto } from "../../../../../utils/upload";
import PhotoUpload from "../../../../components/upload/PhotoUpload";
import FileUpload from "../../../../components/upload/FileUpload";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
  const [isValid, setIsValid] = useState("normal");
  const [code, setCode] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [firmaId, setFirmaId] = useState(0);
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
    if (code !== watch("kod")) {
      const body = {
        tableName: "FirmaTanimlari",
        code: watch("kod"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    } else {
      setIsValid("normal");
    }
  }, [watch("kod"), code]);

  useEffect(() => {
    GetCompanyByIdService(id).then((res) => {
      setCode(res?.data.kod);
      setValue("web", res.data.web);
      setValue("vno", res.data.vno);
      setValue("vd", res.data.vd);
      setValue("unvan", res.data.unvan);
      setValue("lokasyon", res.data.lokasyon);
      setValue("lokasyonId", res.data.lokasyonId);
      setValue("tipTedarikci", res.data.tipTedarikci);
      setValue("tipSigorta", res.data.tipSigorta);
      setValue("tipServis", res.data.tipServis);
      setValue("tipMusteri", res.data.tipMusteri);
      setValue("tipKiralama", res.data.tipKiralama);
      setValue("tipDiger", res.data.tipDiger);
      setValue("tipAkaryakitIst", res.data.tipAkaryakitIst);
      setValue("terminSure", res.data.terminSure);
      setValue("tel_2", res.data.tel_2);
      setValue("tel_1", res.data.tel_1);
      setValue("sektor", res.data.sektor);
      setValue("kod", res.data.kod);
      setValue("indirimOran", res.data.indirimOran);
      setValue("ilgili_2", res.data.ilgili_2);
      setValue("ilgili_1", res.data.ilgili_1);
      setValue("ilce", res.data.ilce);
      setValue("il", res.data.il);
      setValue("firmaTipiKodId", res.data.firmaTipiKodId);
      setValue("firmaTipi", res.data.firmaTipi);
      setValue("gsm", res.data.gsm);
      setValue("fax", res.data.fax);
      setValue("email", res.data.email);
      setValue("borc", res.data.borc);
      setValue("bakiye", res.data.bakiye);
      setValue("alacak", res.data.alacak);
      setValue("aktif", res.data.aktif);
      setValue("adres_2", res.data.adres_2);
      setValue("adres_1", res.data.adres_1);
      setFirmaId(res.data.firmaId);
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
    });

    GetPhotosByRefGroupService(id, "FIRMA").then((res) => setImageUrls(res.data));
    GetDocumentsByRefGroupService(id, "FIRMA").then((res) => setFilesUrl(res.data));
  }, [id, updateModal]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      firmaId: firmaId,
      unvan: values.unvan,
      kod: values.kod,
      tel_1: values.tel_1,
      tel_2: values.tel_2,
      il: values.il,
      lokasyonId: values.lokasyonId,
      ilce: values.ilce,
      vno: values.vno,
      vd: values.vd,
      sektor: values.sektor,
      terminSure: values.terminSure,
      adres_1: values.adres_1,
      ilgili_1: values.ilgili_1,
      adres_2: values.adres_2,
      ilgili_2: values.ilgili_2,
      aciklama: values.aciklama,
      firmaTipiKodId: values.firmaTipiKodId || -1,
      borc: values.borc || 0,
      alacak: values.alacak || 0,
      bakiye: values.bakiye || 0,
      indirimOran: values.indirimOran || 0,
      tipServis: values.tipServis,
      tipDiger: values.tipDiger,
      tipMusteri: values.tipMusteri,
      tipSigorta: values.tipSigorta,
      tipAkaryakitIst: values.tipAkaryakitIst,
      tipTedarikci: values.tipTedarikci,
      tipKiralama: values.tipKiralama,
      aktif: values.aktif,
      email: values.email,
      web: values.web,
      fax: values.fax,
      gsm: values.gsm,
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

    UpdateCompanyItemService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setStatus(true);
        reset(defaultValues);
        setActiveKey("1");
      }
    });

    uploadImages();
    uploadFiles();
    setStatus(false);
  });

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(id, "FIRMA", images, false);
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
      uploadFile(id, "FIRMA", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const personalProps = {
    form: "Firma",
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
      label: t("finansBilgileri"),
      children: <FinansBilgileri />,
    },
    {
      key: "4",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "5",
      label: `[${imageUrls.length}] ${t("resimler")}`,
      children: (
        <PhotoUpload
          imageUrls={imageUrls}
          loadingImages={loadingImages}
          setImages={setImages}
        />
      ),
    },
    {
      key: "6",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: (
        <FileUpload
          filesUrl={filesUrl}
          loadingFiles={loadingFiles}
          setFiles={setFiles}
        />
      ),
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={
      isValid === "success" ? false : isValid === "error" ? true : false
    }>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        reset(defaultValues);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal
      title={t("firmaTanimBilgileriniGuncelle")}
      open={updateModal}
      onCancel={() => setUpdateModal(false)}
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
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
};

export default UpdateModal;
