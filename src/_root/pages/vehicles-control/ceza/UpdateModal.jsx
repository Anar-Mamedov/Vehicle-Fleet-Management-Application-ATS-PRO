import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetVehicleFineItemService, UpdateVehicleFineItemService } from "../../../../api/services/vehicles/operations_services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../api/services/upload/services";
import { uploadFile, uploadPhoto } from "../../../../utils/upload";
import { message, Modal, Tabs, Button } from "antd";
import GeneralInfo from "./tabs/GeneralInfo";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import FileUpload from "../../../components/upload/FileUpload";
import PhotoUpload from "../../../components/upload/PhotoUpload";
import ResimUpload from "../../../components/Resim/ResimUpload";
import DosyaUpload from "../../../components/Dosya/DosyaUpload";
import dayjs from "dayjs";
import ReportResultButton from "../../../components/ReportResultButton";

const UpdateModal = ({ updateModal, setUpdateModal, id, setStatus, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const { plaka } = useContext(PlakaContext);
  const [activeKey, setActiveKey] = useState("1");
  // file
  const [filesUrl, setFilesUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  // photo
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState([]);
  const [reportInfo, setReportInfo] = useState({
    moduleFormName: "",
    selectedRows: [],
  });

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
      code: 879,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 880,
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
  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    if (drawerVisible && selectedRow) {
      GetVehicleFineItemService(selectedRow?.key).then((res) => {
        const fineData = res?.data || {};
        setValue("aracId", fineData.aracId);
        setValue("plaka", fineData.plaka);
        setValue("tarih", fineData.tarih ? dayjs(fineData.tarih) : null);
        setValue("saat", dayjs(fineData.saat, "HH:mm:ss", true).isValid() ? dayjs(fineData.saat, "HH:mm:ss") : null);
        setValue("aciklama", fineData.aciklama);
        setValue("aracKm", fineData.aracKm);
        setValue("bankaHesap", fineData.bankaHesap);
        setValue("belgeNo", fineData.belgeNo);
        setValue("cezaMaddesi", fineData.cezaMaddesi);
        setValue("cezaMaddesiId", fineData.cezaMaddesiId);
        setValue("cezaPuan", fineData.cezaPuan);
        setValue("cezaTuru", fineData.cezaTuru);
        setValue("cezaTuruID", fineData.cezaTuruKodId);
        setValue("cezaBeyanTuru", fineData.cezaBeyanTuru);
        setValue("cezaBeyanTuruID", fineData.cezaBeyanTuruKodId);
        setValue("indirimOran", fineData.indirimOran);
        setValue("lokasyon", fineData.lokasyon);
        setValue("lokasyonId", fineData.lokasyonId);
        setValue("odeme", fineData.odeme);
        setValue("odemeTarih", fineData.odemeTarih ? dayjs(fineData.odemeTarih) : null);
        setValue("tebligTarih", fineData.tebligTarih ? dayjs(fineData.tebligTarih) : null);
        setValue("surucuId", fineData.surucuId);
        setValue("surucu", fineData.surucuIsim);
        setValue("surucuOder", fineData.surucuOder);
        setValue("odenenTutar", fineData.odenenTutar);
        setValue("tutar", fineData.tutar);
        setValue("ozelAlan1", fineData.ozelAlan1);
        setValue("ozelAlan2", fineData.ozelAlan2);
        setValue("ozelAlan3", fineData.ozelAlan3);
        setValue("ozelAlan4", fineData.ozelAlan4);
        setValue("ozelAlan5", fineData.ozelAlan5);
        setValue("ozelAlan6", fineData.ozelAlan6);
        setValue("ozelAlan7", fineData.ozelAlan7);
        setValue("ozelAlan8", fineData.ozelAlan8);
        setValue("ozelAlan9", fineData.ozelAlan9);
        setValue("ozelAlanKodId9", fineData.ozelAlanKodId9);
        setValue("ozelAlan10", fineData.ozelAlan10);
        setValue("ozelAlanKodId10", fineData.ozelAlanKodId10);
        setValue("ozelAlan11", fineData.ozelAlan11);
        setValue("ozelAlan12", fineData.ozelAlan12);
        setValue("odendigiTarih", fineData.odendigiTarih ? dayjs(fineData.odendigiTarih) : null);

        const hasSiraNo = fineData.siraNo !== null && typeof fineData.siraNo !== "undefined";
        setReportInfo({
          moduleFormName: fineData.moduleFormName || "",
          selectedRows: hasSiraNo ? [{ siraNo: fineData.siraNo }] : [],
        });
      });

      GetPhotosByRefGroupService(selectedRow?.key, "CEZA").then((res) => setImageUrls(res.data));

      GetDocumentsByRefGroupService(selectedRow?.key, "CEZA").then((res) => setFilesUrl(res.data));
    } else {
      setReportInfo({
        moduleFormName: "",
        selectedRows: [],
      });
    }
  }, [selectedRow, drawerVisible]);

  const uploadFiles = () => {
    try {
      setLoadingFiles(true);
      uploadFile(selectedRow?.key, "CEZA", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(selectedRow?.key, "CEZA", images, false);
      setImageUrls([...imageUrls, data.imageUrl]);
    } catch (error) {
      message.error("Resim yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingImages(false);
    }
  };

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: selectedRow?.key,
      tarih: values.tarih && dayjs(values.tarih).isValid() ? dayjs(values.tarih).format("YYYY-MM-DD") : null,
      saat: values.saat && dayjs(values.saat).isValid() ? dayjs(values.saat).format("HH:mm:ss") : null,
      cezaTuruKodId: values.cezaTuruID || 0,
      cezaBeyanTuruKodId: values.cezaBeyanTuruID || 0,
      tutar: values.tutar || 0,
      cezaPuan: values.cezaPuan || 0,
      odenenTutar: values.odenenTutar || 0,
      surucuId: values.surucuId || 0,
      odemeTarih: values.odemeTarih && dayjs(values.odemeTarih).isValid() ? dayjs(values.odemeTarih).format("YYYY-MM-DD") : null,
      odeme: values.odeme,
      cezaMaddesiId: values.cezaMaddesiId || 0,
      aciklama: values.aciklama,
      belgeNo: values.belgeNo,
      bankaHesap: values.bankaHesap,
      lokasyonId: values.lokasyonId || 0,
      aracKm: values.aracKm || 0,
      surucuOder: values.surucuOder,
      tebligTarih: values.tebligTarih && dayjs(values.tebligTarih).isValid() ? dayjs(values.tebligTarih).format("YYYY-MM-DD") : null,
      indirimOran: values.indirimOran || 0,
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
      odendigiTarih: values.odendigiTarih && dayjs(values.odendigiTarih).isValid() ? dayjs(values.odendigiTarih).format("YYYY-MM-DD") : null,
    };

    UpdateVehicleFineItemService(body).then((res) => {
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
    // setStatus(false);
  });

  const personalProps = {
    form: "CEZA",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo isUpdateMode={true} />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    /* {
      key: "3",
      label: `[${imageUrls.length}] ${t("resimler")}`,
      children: <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />,
    },
    {
      key: "4",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />,
    }, */
    {
      key: "5",
      label: `[${imageUrls.length}] ${t("resimler")}`,
      children: <ResimUpload selectedRowID={selectedRow?.key} refGroup={"CEZA"} />,
    },
    {
      key: "6",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: <DosyaUpload selectedRowID={selectedRow?.key} refGroup={"CEZA"} />,
    },
  ];

  const footer = (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
      <ReportResultButton moduleFormName={reportInfo.moduleFormName} selectedRows={reportInfo.selectedRows} />
      <div style={{ display: "flex", gap: "8px" }}>
        <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
          {t("guncelle")}
        </Button>
        <Button
          key="back"
          className="btn btn-min cancel-btn"
          onClick={() => {
            onDrawerClose();
            setActiveKey("1");
          }}
        >
          {t("kapat")}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal title={t("cezaBilgisiGuncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
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
  selectedRow: PropTypes.object,
  onDrawerClose: PropTypes.func,
  drawerVisible: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default UpdateModal;
