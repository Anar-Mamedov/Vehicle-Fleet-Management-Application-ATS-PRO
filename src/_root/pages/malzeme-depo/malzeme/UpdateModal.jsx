import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../api/services/code/services";
import {
  GetMaterialCardByIdService,
  UpdateMaterialCardService,
} from "../../../../api/services/malzeme/services";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import {
  GetDocumentsByRefGroupService,
  GetPhotosByRefGroupService,
} from "../../../../api/services/upload/services";
import GeneralInfo from "./tabs/GeneralInfo";
import { uploadFile, uploadPhoto } from "../../../../utils/upload";
import PhotoUpload from "../../../components/upload/PhotoUpload";
import FileUpload from "../../../components/upload/FileUpload";
import dayjs from "dayjs";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
  const [isValid, setIsValid] = useState("normal");
  const [code, setCode] = useState("normal");
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
      code: 869,
      name2: "ozelAlanKodId9",
    }, 
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 870,
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
    malzemeKod: "",
    tanim: "",
    stokMiktar: null,
    birimKodId: "",
    malzemeTipKodId: null,
    fiyat: null,
    firmaId: null,
    tedarikci: "",
    tedarikciFiyat: null,
    tedarikciIskontoOran: null,
    seriNo: "",
    barKodNo: "",
    depoId: null,
    bolum: "",
    raf: "",
    kritikMiktar: null,
    cikanMiktar: null,
    girenMiktar: null,
    sonAlisTarih: "",
    sonFiyat: null,
    kdvOran: null,
    aktif: false,
    yedekParca: false,
    sarfMlz: false,
    demirBas: false,
    olusturma: "",
    degistirme: "",
    aciklama: "",
    olcu: "",
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(id, "MALZEME", images, false);
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
      uploadFile(id, "MALZEME", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (code !== watch("malzemeKod")) {
      const body = {
        tableName: "Malzeme",
        code: watch("malzemeKod"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    } else {
      setIsValid("normal");
    }
  }, [watch("malzemeKod"), code]);

  const personalProps = {
    form: "MALZEME",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: "Genel Bilgiler",
      children: <GeneralInfo isValid={isValid} />,
    },
    {
      key: "2",
      label: "Özel Alanlar",
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "3",
      label: `[${imageUrls.length}] Resimler`,
      children: (
        <PhotoUpload
          imageUrls={imageUrls}
          loadingImages={loadingImages}
          setImages={setImages}
        />
      ),
    },
    {
      key: "4",
      label: `[${filesUrl.length}] Ekli Belgeler`,
      children: (
        <FileUpload
          filesUrl={filesUrl}
          loadingFiles={loadingFiles}
          setFiles={setFiles}
        />
      ),
    },
  ];

  useEffect(() => {
    GetMaterialCardByIdService(id).then((res) => {
      setValue("malzemeKod", res.data.malzemeKod);
      setCode(res?.data.malzemeKod);
      setValue("aktif", !res.data.aktif);
      setValue("barKodNo", res.data.barKodNo);
      setValue("birim", res.data.birim);
      setValue("birimKodId", res.data.birimKodId);
      setValue("bolum", res.data.bolum);
      setValue("demirBas", res.data.demirBas);
      setValue("depo", res.data.depo);
      setValue("depoId", res.data.depoId);
      setValue("fiyat", res.data.fiyat);
      setValue("kdvOran", res.data.kdvOran);
      setValue("malzemeTipKodText", res.data.malzemeTipKodText);
      setValue("malzemeTipKodId", res.data.malzemeTipKodId);
      setValue("olcu", res.data.olcu);
      setValue("raf", res.data.raf);
      setValue("sarfMlz", res.data.sarfMlz);
      setValue("seriNo", res.data.seriNo);
      setValue("tanim", res.data.tanim);
      setValue("firmaId", res.data.firmaId);
      setValue("tedarikciFiyat", res.data.tedarikciFiyat);
      setValue("tedarikciIskontoOran", res.data.tedarikciIskontoOran);
      setValue("yedekParca", res.data.yedekParca);
      setValue("unvan", res.data.tedarikci);
      setValue("kritikMiktar", res.data.kritikMiktar);
      setValue("kdvDH", res.data.kdvDahilHaric ? "Dahil" : "Hariç");
      setValue("girenMiktar", res.data.girenMiktar);
      setValue("sonAlinanFirma", res.data.sonAlinanFirma);
      setValue("cikanMiktar", res.data.cikanMiktar);
      setValue("sonMiktar", res.data.sonMiktar);
      setValue("stokMiktar", res.data.girenMiktar - res.data.cikanMiktar);
      setValue(
        "sonAlisTarih",
        dayjs(res.data.sonAlisTarih).format("DD.MM.YYYY")
      );
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

    GetPhotosByRefGroupService(id, "MALZEME").then((res) =>
      setImageUrls(res.data)
    );

    GetDocumentsByRefGroupService(id, "MALZEME").then((res) =>
      setFilesUrl(res.data)
    );
  }, [id, updateModal]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      malzemeId: id,
      tanim: values.tanim,
      stokMiktar: values.stokMiktar || 0,
      birimKodId: values.birimKodId || 0,
      malzemeTipKodId: values.malzemeTipKodId || 0,
      fiyat: values.fiyat || 0,
      firmaId: values.firmaId || 0,
      tedarikci: values.malzemtedarikcieKod,
      tedarikciFiyat: values.tedarikciFiyat || 0,
      tedarikciIskontoOran: values.tedarikciIskontoOran || 0,
      seriNo: values.seriNo,
      barKodNo: values.barKodNo,
      depoId: values.depoId || 0,
      bolum: values.bolum,
      raf: values.raf,
      kritikMiktar: values.kritikMiktar || 0,
      sonMiktar: values.sonMiktar || 0,
      kdvOran: values.kdvOran || 0,
      aktif: !values.aktif,
      yedekParca: values.yedekParca,
      sarfMlz: values.sarfMlz,
      demirBas: values.demirBas,
      olcu: values.olcu,
      kdvDahilHaric:
        values.kdvDH === "dahil" || values.kdvDH === "Dahil" ? true : false,
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

    UpdateMaterialCardService(body).then((res) => {
      if (res?.data.statusCode === 202) {
        setStatus(true);
        setUpdateModal(false);
        reset(defaultValues);
        setActiveKey("1");
      }
    });

    uploadImages();
    uploadFiles();
    setStatus(false);
  });

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={onSubmit}
      disabled={
        isValid === "success" ? false : isValid === "error" ? true : false
      }
    >
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        setStatus(true);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Modal
        title={t("malzemeBilgisiGuncelle")}
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
    </>
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
};

export default UpdateModal;
