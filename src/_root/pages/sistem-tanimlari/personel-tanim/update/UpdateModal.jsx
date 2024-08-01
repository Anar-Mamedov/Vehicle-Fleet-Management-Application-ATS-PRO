import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../../api/service";
import GeneralInfo from "./GeneralInfo";
import Iletisim from "./Iletisim";
import PersonalFields from "../../../../components/form/PersonalFields";
import {
  GetEmployeeByIdService,
  UpdateEmployeeService,
} from "../../../../../api/services/personel_services";
import dayjs from "dayjs";
import KisiselBilgiler from "../add/KisiselBilgiler";
import { uploadPhoto } from "../../../../../utils/upload";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
  const [isValid, setIsValid] = useState("normal");
  const [personelId, setPersonelId] = useState(0);
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
    if (watch("personelKod")) {
      const body = {
        tableName: "PersonelTanimlari",
        code: watch("personelKod"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("personelKod")]);

  useEffect(() => {
    GetEmployeeByIdService(id).then((res) => {
      setValue("personelKod", res.data.personelKod);
      setValue("isim", res.data.isim);
      setValue("lokasyonId", res.data.lokasyonId);
      setValue("lokasyon", res.data.lokasyon);
      setValue("unvanKodId", res.data.unvanKodId);
      setValue("unvan", res.data.unvan);
      setValue("personelTipiKodId", res.data.personelTipiKodId);
      setValue("personelTipi", res.data.personelTipi);
      setValue("departmanKodId", res.data.departmanKodId);
      setValue("departman", res.data.departman);
      setValue("gorevKodId", res.data.gorevKodId);
      setValue("gorev", res.data.gorev);
      setValue("sskNo", res.data.sskNo);
      setValue("ehliyet", res.data.ehliyet);
      setValue("ehliyetSinifi", res.data.ehliyetSinifi);
      setValue("ehliyetNo", res.data.ehliyetNo);
      setValue("kanGrubu", res.data.kanGrubu);
      setValue("dogumTarihi", dayjs(res.data.dogumTarihi));
      setValue("anneAdi", res.data.anneAdi);
      setValue("babaAdi", res.data.babaAdi);
      setValue("tcKimlikNo", res.data.tcKimlikNo);
      setValue("beden", res.data.beden);
      setValue("ayakKabiNo", res.data.ayakKabiNo);
      setValue("adres", res.data.adres);
      setValue("ilce", res.data.ilce);
      setValue("il", res.data.il);
      setValue("tel1", res.data.tel1);
      setValue("tel2", res.data.tel2);
      setValue("gsm", res.data.gsm);
      setValue("fax", res.data.fax);
      setValue("email", res.data.email);
      setValue("web", res.data.web);
      setValue("iseBaslamaTarihi", dayjs(res.data.iseBaslamaTarihi));
      setValue("isetenAyrilmaTarihi", dayjs(res.data.isetenAyrilmaTarihi));
      setValue("aktif", res.data.aktif);
      setPersonelId(res.data.personelId);
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

      setImagesURL([res.data.defPhotoInfo]);
    });
  }, [id, updateModal]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      personelId: personelId,
      personelKod: values.personelKod,
      isim: values.isim,
      lokasyonId: values.lokasyonId || -1,
      unvanKodId: values.unvanKodId || -1,
      personelTipiKodId: values.personelTipiKodId || -1,
      departmanKodId: values.departmanKodId || -1,
      gorevKodId: values.gorevKodId || -1,
      sskNo: values.sskNo,
      ehliyet: values.ehliyet,
      ehliyetSinifi: values.ehliyetSinifi,
      ehliyetNo: values.ehliyetNo,
      kanGrubu: values.kanGrubu,
      dogumTarihi: dayjs(values.dogumTarihi).format("YYYY-MM-DD"),
      anneAdi: values.anneAdi,
      babaAdi: values.babaAdi,
      tcKimlikNo: values.tcKimlikNo,
      beden: values.beden,
      ayakKabiNo: values.ayakKabiNo,
      adres: values.adres,
      il: values.il,
      ilce: values.ilce,
      email: values.email,
      web: values.web,
      tel1: values.tel1,
      tel2: values.tel2,
      fax: values.fax,
      aciklama: values.aciklama,
      gsm: values.gsm,
      aktif: values.aktif,
      iseBaslamaTarihi: dayjs(values.iseBaslamaTarihi).format("YYYY-MM-DD"),
      isetenAyrilmaTarihi: dayjs(values.isetenAyrilmaTarihi).format(
        "YYYY-MM-DD"
      ),
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

    UpdateEmployeeService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setStatus(true);
        reset(defaultValues);
      }
    });

    uploadPhoto(personelId, "PERSONEL", images, true);
    setImages([])
    setImagesURL([])
    setStatus(false);
  });

  const personalProps = {
    form: "Firma",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: (
        <GeneralInfo isValid={isValid} setImages={setImages} urls={imagesURL} />
      ),
    },
    {
      key: "2",
      label: t("iletisim"),
      children: <Iletisim />,
    },
    {
      key: "3",
      label: t("KisiselBilgiler"),
      children: <KisiselBilgiler />,
    },
    {
      key: "4",
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
        setUpdateModal(false);
        reset(defaultValues);
        setImages([])
        setImagesURL([])
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal
      title={t("servisGuncelle")}
      open={updateModal}
      onCancel={() => setUpdateModal(false)}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
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
  record: PropTypes.object,
  status: PropTypes.bool,
};

export default UpdateModal;
