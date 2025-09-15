import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetExpeditionItemByIdService, UpdateExpeditionItemService } from "../../../../api/services/vehicles/operations_services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../api/services/upload/services";
import { CodeItemValidateService } from "../../../../api/services/code/services";
import { uploadFile, uploadPhoto } from "../../../../utils/upload";
import { message, Modal, Tabs, Button } from "antd";
import GeneralInfo from "./tabs/GeneralInfo";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import FileUpload from "../../../components/upload/FileUpload";
import PhotoUpload from "../../../components/upload/PhotoUpload";
import Yakit from "../yakit/Yakit";
import Harcamalar from "../harcama/Harcama";
import TasimaRotaBilgileri from "./tabs/TasimaRota/TasimaRota";

const UpdateModal = ({ updateModal, setUpdateModal, id, setStatus, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const { data, plaka } = useContext(PlakaContext);
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
  // Add this new state
  const [yakitKey, setYakitKey] = useState(0);
  const [harcamaKey, setHarcamaKey] = useState(0);
  const [tasimaRotaKey, setTasimaRotaKey] = useState(0);

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

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (code !== watch("seferNo")) {
      const body = {
        tableName: "SeferNo",
        code: watch("seferNo"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    } else {
      setIsValid("normal");
    }
  }, [watch("seferNo"), code]);

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
    if (drawerVisible && selectedRow) {
      GetExpeditionItemByIdService(selectedRow?.key).then((res) => {
        setValue("plaka", res?.data.plaka);
        setValue("seferNo", res?.data.seferNo);
        setCode(res?.data.seferNo);
        if (dayjs(res?.data.cikisTarih).isValid()) {
          setValue("cikisTarih", dayjs(res?.data.cikisTarih));
        } else {
          setValue("cikisTarih", null);
        }
        if (dayjs(res?.data.varisTarih).isValid()) {
          setValue("varisTarih", dayjs(res?.data.varisTarih));
        } else {
          setValue("varisTarih", null);
        }
        if (dayjs(res?.data.cikisSaat, "HH:mm:ss", true).isValid()) {
          setValue("cikisSaat", dayjs(res?.data.cikisSaat, "HH:mm:ss"));
        } else {
          setValue("cikisSaat", null);
        }

        if (dayjs(res?.data.varisSaat, "HH:mm:ss", true).isValid()) {
          setValue("varisSaat", dayjs(res?.data.varisSaat, "HH:mm:ss"));
        } else {
          setValue("varisSaat", null);
        }
        setValue("aciklama", res?.data.aciklama);
        setValue("surucuId1", res?.data.surucuId1);
        setValue("surucu1", res?.data.surucuIsim1);
        setValue("surucuId2", res?.data.surucuId2);
        setValue("surucu2", res?.data.surucuIsim2);
        setValue("dorseId", res?.data.dorseId);
        setValue("dorsePlaka", res?.data.dorsePlaka);
        setValue("guzergahId", res?.data.guzergahId);
        setValue("guzergah", res?.data.guzergah);
        setValue("seferDurumKodId", res?.data.seferDurumKodId);
        setValue("seferDurum", res?.data.seferDurum);
        setValue("seferTipKodId", res?.data.seferTipKodId);
        setValue("seferTip", res?.data.seferTip);
        setValue("seferAdedi", res?.data.seferAdedi);
        setValue("varisKm", res?.data.varisKm);
        setValue("farkKm", res?.data.farkKm);
        setValue("cikisKm", res?.data.cikisKm);
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
      });

      GetPhotosByRefGroupService(selectedRow?.key, "SEFER").then((res) => setImageUrls(res.data));

      GetDocumentsByRefGroupService(selectedRow?.key, "SEFER").then((res) => setFilesUrl(res.data));
    }
  }, [selectedRow, drawerVisible]);

  // Ensure the first tab is active whenever the modal opens
  useEffect(() => {
    if (drawerVisible) {
      setActiveKey("1");
    }
  }, [drawerVisible]);

  const uploadFiles = () => {
    try {
      setLoadingFiles(true);
      uploadFile(selectedRow?.key, "SEFER", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(selectedRow?.key, "SEFER", images, false);
      setImageUrls([...imageUrls, data.imageUrl]);
    } catch (error) {
      message.error("Resim yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingImages(false);
    }
  };

  /*   useEffect(() => {
    setValue("surucuId1", data.surucuId);
    setValue("surucu1", data.surucuAdi);
  }, [data]); */

  // Add this useEffect to trigger re-render
  useEffect(() => {
    if (activeKey === "5") {
      setYakitKey((prevKey) => prevKey + 1);
    }
    if (activeKey === "6") {
      setHarcamaKey((prevKey) => prevKey + 1);
    }
    if (activeKey === "7") {
      setTasimaRotaKey((prevKey) => prevKey + 1);
    }
  }, [activeKey]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: selectedRow?.key,
      surucuId1: values.surucuId1 || 0,
      surucuId2: values.surucuId2 || 0,
      aciklama: values.aciklama,
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

    UpdateExpeditionItemService(body).then((res) => {
      if (res.data.statusCode === 202) {
        onDrawerClose();
        onRefresh();
        setActiveKey("1");
        if (plaka.length === 1) {
          reset();
        } else {
          reset();
        }
      }
    });

    uploadFiles();
    uploadImages();
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
      key: "5",
      label: t("yakitGiderleri"),
      children: <Yakit key={yakitKey} selectedRow={selectedRow} seferId={selectedRow?.key} isSefer={true} tableHeight="calc(100vh - 440px)" />,
    },
    {
      key: "6",
      label: t("harcamalar"),
      children: <Harcamalar key={harcamaKey} selectedRow={selectedRow} seferId={selectedRow?.key} isSefer={true} tableHeight="calc(100vh - 440px)" />,
    },
    {
      key: "7",
      label: t("tasima/RotaBilgileri"),
      children: (
        <TasimaRotaBilgileri
          key={tasimaRotaKey}
          selectedRow1={selectedRow}
          seferId={selectedRow?.key}
          isSefer={true}
          tableHeight="calc(100vh - 440px)"
          isActive={activeKey === "7"}
        />
      ),
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
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        onDrawerClose();
        onRefresh();
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("gorevBilgisiGuncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
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
