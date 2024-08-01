import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";
import dayjs from "dayjs";
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { IoLocationSharp } from "react-icons/io5";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import { Button, message, Modal, Spin, Tabs } from "antd";
import { PlakaContext } from "../../../../context/plakaSlice";
import {
  GetVehicleByIdService,
  UpdateVehicleService,
} from "../../../../api/services/vehicles/vehicles/services";
import {
  GetDocumentsByRefGroupService,
  GetPhotosByRefGroupService,
} from "../../../../api/services/upload/services";
import { uploadFile, uploadPhoto } from "../../../../utils/upload";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import PhotoUpload from "../../../components/upload/PhotoUpload";
import FileUpload from "../../../components/upload/FileUpload";
import TextInput from "../../../components/form/inputs/TextInput";
import CodeControl from "../../../components/form/selects/CodeControl";
import Location from "../../../components/form/tree/Location";
import Marka from "../../../components/form/selects/Marka";
import Model from "../../../components/form/selects/Model";
import Driver from "../../../components/form/selects/Driver";
import MaterialType from "../../../components/form/selects/MaterialType";
import KmLog from "../../../components/table/KmLog";
import GeneralInfo from "./tabs/GeneralInfo";
import DetailInfo from "./detail-info/DetailInfo";
import ProfilePhoto from "./tabs/ProfilePhoto";

const breadcrumb = [
  { href: "/", title: <HomeOutlined /> },
  { href: "/araclar", title: t("araclar") },
  { title: t("aracDetayKarti") },
];

const DetailUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setPlaka, setAracId, setPrintData } = useContext(PlakaContext);
  const [profile, setProfile] = useState([]);
  const [urls, setUrls] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState({
    aktif: false,
    lokasyon: "",
    guncelKm: 0,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [dataStatus, setDataStatus] = useState(false);
  const [kmHistryModal, setKmHistryModal] = useState(false);
  const [guncelKmTarih, setGuncelKmTarih] = useState("");
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
      code: 865,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 866,
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
    plaka: "",
    aracTip: "",
    aracTipId: 0,
    guncelKm: 0,
    markaId: null,
    modelId: 0,
    yil: 0,
    aracGrubuId: 0,
    AracCinsiKodId: 0,
    aracRenkId: 0,
    lokasyonId: 0,
    mulkiyet: "",
    departmanId: 0,
    surucuId: 0,
    yakitTipId: 0,
    muayeneTarih: "",
    sozlesmeTarih: "",
    egzosTarih: "",
    vergiTarih: "",
    ozelAlan1: "",
    ozelAlan2: "",
    ozelAlan3: "",
    ozelAlan4: "",
    ozelAlan5: "",
    ozelAlan6: "",
    ozelAlan7: "",
    ozelAlan8: "",
    ozelAlanKodId9: "",
    ozelAlanKodId10: "",
    ozelAlan11: "",
    ozelAlan12: "",
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    setLoading(true);
    GetVehicleByIdService(id).then((res) => {
      setLoading(false);
      setPrintData(res.data);
      setDataSource(res.data);
      setData({
        ...data,
        aktif: res?.data.aktif,
        lokasyon: res.data.lokasyon,
        guncelKm: res?.data.guncelKm,
      });
      setValue("plaka", res?.data.plaka);
      setPlaka(res?.data.plaka);
      setAracId(res?.data.aracId);
      setGuncelKmTarih(res?.data.sonKmGuncellemeTarih);
      setValue("guncelKm", res?.data.guncelKm);
      setValue("aracTipId", res?.data.aracTipId ? res?.data.aracTipId : null);
      setValue("aracTip", res?.data.aracTip);
      setValue("bagliAracId", res?.data.bagliAracId);
      setValue("bagliArac", res?.data.bagliAracPlaka);
      setValue("hgsNo", res?.data.hgsNo);
      setValue("AracCinsiKodId", res?.data.aracCinsi);
      setValue("markaId", res?.data.markaId ? res?.data.markaId : null);
      setValue("marka", res?.data.marka);
      setValue("model", res?.data.model);
      setValue("modelId", res?.data.modelId ? res?.data.modelId : null);
      setValue("surucuId", res?.data.surucuId ? res?.data.surucuId : null);
      setValue("surucu", res?.data.surucu);
      setValue("kullanimAmaciKodId", res?.data.kullanimAmaciKodId);
      setValue("kullanimAmaci", res?.data.kullanimAmaci);
      setValue("yedekAnahtarId", res?.data.yedekAnahtarId);
      setValue("yedekAnahtar", res?.data.yedekAnahtar);
      setValue("anahtarKodu", res?.data.anahtarKodu);
      setValue(
        "lokasyonId",
        res?.data.lokasyonId ? res?.data.lokasyonId : null
      );
      setValue("lokasyon", res?.data.lokasyon);
      setValue(
        "yakitTipId",
        res?.data.yakitTipId ? res?.data.yakitTipId : null
      );
      setValue("yakitTip", res?.data.yakitTip);
      setValue(
        "aracRenkId",
        res?.data.aracRenkId ? res?.data.aracRenkId : null
      );
      setValue("renk", res?.data.renk);
      setValue("yil", res?.data.yil);
      setValue("aciklama", res?.data.aciklama);
      setValue(
        "aracGrubuId",
        res?.data.aracGrubuId ? res?.data.aracGrubuId : null
      );
      setValue("grup", res?.data.grup);
      setValue(
        "departmanId",
        res?.data.departmanId ? res?.data.departmanId : null
      );
      setValue("departman", res?.data.departman);
      setValue("havuzGrup", res?.data.havuzGrup);
      setValue(
        "durumKodId",
        res?.data.durumKodId ? res?.data.durumKodId : null
      );
      setValue("durum", res?.data.durum);
      setValue("tts", res?.data.tts);
      setValue(
        "muayeneTarih",
        res?.data.muayeneTarih &&
          res?.data.muayeneTarih !== "0001-01-01T00:00:00"
          ? dayjs(res?.data.muayeneTarih)
          : null
      );
      setValue(
        "sozlesmeTarih",
        res?.data.sozlesmeTarih &&
          res?.data.sozlesmeTarih !== "0001-01-01T00:00:00"
          ? dayjs(res?.data.sozlesmeTarih)
          : null
      );
      setValue(
        "vergiTarih",
        res?.data.vergiTarih && res?.data.vergiTarih !== "0001-01-01T00:00:00"
          ? dayjs(res?.data.vergiTarih)
          : null
      );
      setValue(
        "egzosTarih",
        res?.data.egzosTarih && res?.data.egzosTarih !== "0001-01-01T00:00:00"
          ? dayjs(res?.data.egzosTarih)
          : null
      );
      setValue("onGorulen", res?.data.onGorulen);
      setValue("onGorulenMin", res?.data.onGorulenMin);
      setValue("gerceklesen", res?.data.gerceklesen.toFixed(2));
      setValue("ozelAlan1", res?.data.ozelAlan1);
      setValue("ozelAlan2", res?.data.ozelAlan2);
      setValue("ozelAlan3", res?.data.ozelAlan3);
      setValue("ozelAlan4", res?.data.ozelAlan4);
      setValue("ozelAlan5", res?.data.ozelAlan5);
      setValue("ozelAlan6", res?.data.ozelAlan6);
      setValue("ozelAlan7", res?.data.ozelAlan7);
      setValue("ozelAlan8", res?.data.ozelAlan8);
      setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9);
      setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10);
      setValue("ozelAlan9", res?.data.ozelAlan9);
      setValue("ozelAlan10", res?.data.ozelAlan10);
      setValue("ozelAlan11", res?.data.ozelAlan11);
      setValue("ozelAlan12", res?.data.ozelAlan12);

      setUrls([...urls, res.data.defPhotoInfo]);
    });

    GetPhotosByRefGroupService(id, "Arac").then((res) =>
      setImageUrls(res.data)
    );
    GetDocumentsByRefGroupService(id, "Arac").then((res) =>
      setFilesUrl(res.data)
    );
  }, [id, status, dataStatus]);

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(id, "Arac", images, false);
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
      uploadFile(+id, "Arac", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const onSubmit = handleSubmit((values) => {
    const data = {
      aracId: id,
      plaka: values.plaka,
      anahtarKodu: values.anahtarKodu,
      aciklama: values.aciklama,
      yil: values.yil ? values.yil : 0,
      aracTipId: values.aracTipId || 0,
      guncelKm: values.guncelKm ? values.guncelKm : 0,
      kullanimAmaciKodId: values.kullanimAmaciKodId || 0,
      markaId: values.markaId || 0,
      modelId: values.modelId || 0,
      aracGrubuId: values.aracGrubuId || 0,
      aracRenkId: values.aracRenkId || 0,
      lokasyonId: values.lokasyonId || 0,
      departmanId: values.departmanId || 0,
      surucuId: values.surucuId || 0,
      bagliAracId: values.bagliAracId || 0,
      yedekAnahtarKodId: values.yedekAnahtarKodId || 0,
      hgsNo: values.hgsNo,
      muayeneTarih: values?.muayeneTarih
        ? dayjs(values?.muayeneTarih).format("YYYY-MM-DD")
        : null,
      egzosTarih: values?.egzosTarih
        ? dayjs(values?.egzosTarih).format("YYYY-MM-DD")
        : null,
      vergiTarih: values?.vergiTarih
        ? dayjs(values?.vergiTarih).format("YYYY-MM-DD")
        : null,
      sozlesmeTarih: values?.sozlesmeTarih
        ? dayjs(values?.sozlesmeTarih).format("YYYY-MM-DD")
        : null,
      yakitTipId: values.yakitTipId || 0,
      tts: values.tts,
      durumKodId: values.durumKodId || 0,
      aktif: true,
      havuzGrup: values.havuzGrup,
      onGorulenMin: values.onGorulenMin,
      onGorulen: values.onGorulen,
      gerceklesen: values.gerceklesen,
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
      ozelAlan11: values.ozelAlan11,
      ozelAlan12: values.ozelAlan12,
    };
    setLoading(true);
    UpdateVehicleService(data).then((res) => {
      if (res.data.statusCode === 200) {
        setStatus(true);
        setLoading(false);
        message.success("Güncelleme başarılı!");
      }
    });

    uploadImages();
    uploadFiles();

    uploadPhoto(id, "ARAC", profile, true);
    setProfile([]);
    setUrls([]);
    setActiveKey("1")
  });

  const personalProps = {
    form: "Arac",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "3",
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
      key: "4",
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
    <Button
      key="back"
      className="btn cancel-btn"
      onClick={() => setKmHistryModal(false)}
    >
      {t("kapat")}
    </Button>,
  ];

  const handleCancel = () => navigate("/araclar");

  return (
    <>
      {loading && (
        <div className="loading-spin">
          <div className="loader">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 100,
                  }}
                  spin
                />
              }
            />
          </div>
        </div>
      )}

      <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div>

      <FormProvider {...methods}>
        <div className="content">
          <div className="grid">
            <div className="col-span-3">
              <ProfilePhoto setImages={setProfile} urls={urls} />
              <div className="flex gap-1 justify-between mt-10">
                <p className="flex gap-1 align-center">
                  <span>
                    <FaCircle style={{ color: "green", fontSize: 12 }} />
                  </span>
                  <span>{data.aktif ? "Aktif" : "Pasif"}</span>
                </p>
                <p className="flex gap-1 align-center">
                  <span>
                    <IoLocationSharp style={{ color: "red" }} />
                  </span>
                  <span>{data.lokasyon}</span>
                </p>
                <p className="flex gap-1 align-center">
                  <span>
                    <PiClockCounterClockwiseBold style={{ color: "grey" }} />
                  </span>
                  <span>{data.guncelKm}</span>
                </p>
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid p-10 gap-1">
                <div className="col-span-12 flex gap-1 justify-end mb-10">
                  <Button
                    className="btn btn-min primary-btn"
                    onClick={onSubmit}
                  >
                    {t("guncelle")}
                  </Button>
                  <Button
                    className="btn btn-min cancel-btn"
                    onClick={handleCancel}
                  >
                    {t("kapat")}
                  </Button>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="plaka">{t("plaka")}</label>
                    <TextInput name="plaka" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("aracTip")} <span className="text-danger">*</span>
                    </label>
                    <CodeControl
                      name="aracTip"
                      codeName="aracTipId"
                      id={100}
                      required={true}
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="grid gap-1">
                    <div className="col-span-10">
                      <div className="flex flex-col gap-1">
                        <label className="flex gap-2">
                          <span>{t("guncelKm")}</span>{" "}
                          <span className="text-info">
                            {guncelKmTarih
                              ? `[ ${dayjs(guncelKmTarih).format(
                                  "DD.MM.YYYY"
                                )} ]`
                              : null}
                          </span>
                        </label>
                        <TextInput name="guncelKm" readonly={true} />
                      </div>
                    </div>
                    <div className="col-span-2 self-end">
                      <Button
                        className="w-full"
                        style={{ padding: "4px 0" }}
                        onClick={() => setKmHistryModal(true)}
                      >
                        ...
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="lokasyonId">
                      {t("lokasyon")} <span className="text-danger">*</span>
                    </label>
                    <Location required={true} />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="markaId">
                      {t("marka")} <span className="text-danger">*</span>
                    </label>
                    <Marka required={true} />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="modelId">
                      {t("model")} <span className="text-danger">*</span>
                    </label>
                    <Model required={true} />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="surucuId">{t("surucu")}</label>
                    <Driver />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="yakitTipId">
                      {t("yakitTip")} <span className="text-danger">*</span>
                    </label>
                    <MaterialType
                      name="yakitTip"
                      codeName="yakitTipId"
                      type="YAKIT"
                      required={true}
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="aracRenkId">{t("renk")}</label>
                    <CodeControl name="renk" codeName="aracRenkId" id={111} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content relative">
          <DetailInfo id={id} />
          <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
        </div>
      </FormProvider>

      <Modal
        title={`${t("kilometreGuncellemeGecmisi")}: ${dataSource?.plaka}`}
        open={kmHistryModal}
        onCancel={() => setKmHistryModal(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <KmLog data={dataSource} setDataStatus={setDataStatus} />
      </Modal>
    </>
  );
};

export default DetailUpdate;
