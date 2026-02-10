import { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import { GetAccidentItemByIdService, UpdateAccidentItemService } from "../../../../../../api/services/vehicles/operations_services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../../../api/services/upload/services";
import { Modal, Tabs, Button } from "antd";
import GeneralInfo from "./tabs/GeneralInfo";
import PersonalFields from "../../../../../components/form/personal-fields/PersonalFields";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import GeriOdeme from "./tabs/GeriOdeme";
import SigortaBilgileri from "./tabs/SigortaBilgileri";
import DosyaUpload from "../../../../../components/Dosya/DosyaUpload";
import ResimUpload from "../../../../../components/Resim/ResimUpload";

const UpdateModal = ({ updateModal, setUpdateModal, id, aracId, setStatus }) => {
  const { plaka } = useContext(PlakaContext);
  const [activeKey, setActiveKey] = useState("1");
  const [filesUrl, setFilesUrl] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
      code: 883,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 884,
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
    if (updateModal) {
      GetAccidentItemByIdService(id).then((res) => {
        setValue("aracKm", res?.data.aracKm);
        setValue("asliKusur", res?.data.asliKusur);
        setValue("asliKusurKodId", res?.data.asliKusurKodId);
        setValue("banka", res?.data.banka);
        setValue("bankaHesap", res?.data.bankaHesap);
        setValue("bankaKodId", res?.data.bankaKodId);
        setValue("belgeNo", res?.data.belgeNo);
        setValue("faturaTarih", res?.data.faturaTarih ? dayjs(res?.data.faturaTarih) : null);
        setValue("geriOdemeTarih", res?.data.geriOdemeTarih ? dayjs(res?.data.geriOdemeTarih) : null);
        setValue("kazaTarih", res?.data.kazaTarih ? dayjs(res?.data.kazaTarih) : null);
        setValue("aciklama", res?.data.aciklama);
        setValue("faturaTutar", res?.data.faturaTutar);
        setValue("lokasyonId", res?.data.lokasyonId);
        setValue("lokasyon", res?.data.lokasyon);
        setValue("geriOdeme", res?.data.geriOdeme);
        setValue("geriOdemeAciklama", res?.data.geriOdemeAciklama);
        setValue("geriOdemeTutar", res?.data.geriOdemeTutar);
        setValue("hasarNo", res?.data.hasarNo);
        setValue("karsiPlaka", res?.data.karsiPlaka);
        setValue("karsiSigorta", res?.data.karsiSigorta);
        setValue("karsiSurucu", res?.data.karsiSurucu);
        setValue("kazaSaat", res?.data.kazaSaat ? dayjs(res?.data.kazaSaat, ["HH:mm:ss", "HH:mm"]) : null);
        setValue("kazaSekli", res?.data.kazaSekli);
        setValue("kazaSekliKodId", res?.data.kazaSekliKodId);
        setValue("kazaTuru", res?.data.kazaTuru);
        setValue("kazaTuruKodId", res?.data.kazaTuruKodId);
        setValue("plaka", res?.data.plaka);
        setValue("policeNo", res?.data.policeNo);
        setValue("sigorta", res?.data.sigorta);
        setValue("firma", res?.data.firma);
        setValue("sigortaBilgisiVar", res?.data.sigortaBilgisiVar);
        setValue("sigortaId", res?.data.sigortaId);
        setValue("surucuId", res?.data.surucuId);
        setValue("surucu", res?.data.surucuIsim);
        setValue("surucuOder", res?.data.surucuOder);
        setValue("taliKusur", res?.data.taliKusur);
        setValue("taliKusurKodId", res?.data.taliKusurKodId);
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

      GetPhotosByRefGroupService(id, "KAZA").then((res) => setImageUrls(res.data));

      GetDocumentsByRefGroupService(id, "KAZA").then((res) => setFilesUrl(res.data));
    }
  }, [id, updateModal]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: id,
      aracId: aracId,
      surucuId: values.surucuId || 0,
      aciklama: values.aciklama,
      lokasyonId: values.lokasyonId,
      kazaTarih: dayjs(values.kazaTarih).format("YYYY-MM-DD"),
      faturaTarih: dayjs(values.faturaTarih).format("YYYY-MM-DD"),
      geriOdemeTarih: dayjs(values.geriOdemeTarih).format("YYYY-MM-DD"),
      kazaTuruKodId: values.kazaTuruKodId || 0,
      kazaSekliKodId: values.kazaSekliKodId || 0,
      asliKusurKodId: values.asliKusurKodId || 0,
      taliKusurKodId: values.taliKusurKodId || 0,
      bankaKodId: values.bankaKodId || 0,
      sigortaId: values.sigortaKodId || 0,
      aracKm: values.aracKm || 0,
      faturaTutar: values.faturaTutar || 0,
      geriOdemeTutar: values.geriOdemeTutar || 0,
      geriOdeme: values.geriOdeme,
      sigortaBilgisiVar: values.sigortaBilgisiVar,
      surucuOder: values.surucuOder,
      bankaHesap: values.bankaHesap,
      karsiSurucu: values.karsiSurucu,
      karsiPlaka: values.karsiPlaka,
      karsiSigorta: values.karsiSigorta,
      belgeNo: values.belgeNo,
      geriOdemeAciklama: values.geriOdemeAciklama,
      hasarNo: values.hasarNo,
      kazaSaat: dayjs(values.kazaSaat).format("HH:mm:ss"),
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

    UpdateAccidentItemService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setStatus(true);
        setActiveKey("1");
        if (plaka.length === 1) {
          reset();
        } else {
          reset();
        }
      }
    });
    setStatus(false);
  });

  const personalProps = {
    form: "KAZA",
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
      label: t("geriOdeme"),
      children: <GeriOdeme />,
    },
    {
      key: "3",
      label: t("sigortaBilgileri"),
      children: <SigortaBilgileri />,
    },
    {
      key: "4",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "5",
      label: `[${imageUrls.length}] ${t("resimler")}`,
      children: <ResimUpload selectedRowID={id} refGroup="KAZA" />,
    },
    {
      key: "6",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: <DosyaUpload selectedRowID={id} refGroup="KAZA" />,
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
        setUpdateModal(false);
        setStatus(true);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("kazaBilgisiGuncelle")} open={updateModal} onCancel={() => setUpdateModal(false)} maskClosable={false} footer={footer} width={1200}>
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
  aracId: PropTypes.number,
};

export default UpdateModal;
