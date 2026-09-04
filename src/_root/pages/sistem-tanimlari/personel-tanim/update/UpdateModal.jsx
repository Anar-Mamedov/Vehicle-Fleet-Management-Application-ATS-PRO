import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../../api/service";
import TemelBilgiler from "../tabs/TemelBilgiler";
import { hintStyle } from "../components/uiStyles";
import Iletisim from "../tabs/Iletisim";
import PersonalFields from "../../../../components/form/PersonalFields";
import { GetEmployeeByIdService, UpdateEmployeeService } from "../../../../../api/services/personel_services";
import dayjs from "dayjs";
import KisiselBilgiler from "../add/KisiselBilgiler";
import { uploadPhoto } from "../../../../../utils/upload";
import DosyaUpload from "../../../../components/Dosya/DosyaUpload";

const getValidDate = (value) => {
  if (!value) return null;

  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate : null;
};

const formatDateForApi = (value) => getValidDate(value)?.format("YYYY-MM-DD") ?? null;

// Servis boş metin ve 0 döndürdüğünde placeholder kaybolmasın diye form alanlarına null yazılır
const toNullable = (value) => (value === "" || value === undefined ? null : value);
const toNullableId = (value) => (value === 0 || value === "" || value === undefined ? null : value);

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
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
    if (selectedRow){
      GetEmployeeByIdService(selectedRow?.key).then((res) => {
        setValue("personelKod", res.data.personelKod);
        setValue("isim", res.data.isim);
        setValue("lokasyonId", toNullableId(res.data.lokasyonId));
        setValue("lokasyon", toNullable(res.data.lokasyon));
        // KodIDSelectbox etiketi `name1`, id'yi `${name1}ID` alanına yazar; servis alan adları burada eşlenir
        setValue("unvan", toNullable(res.data.unvan));
        setValue("unvanID", toNullableId(res.data.unvanKodId));
        setValue("personelTipi", toNullable(res.data.personelTipi));
        setValue("personelTipiID", toNullableId(res.data.personelTipiKodId));
        setValue("departman", toNullable(res.data.departman));
        setValue("departmanID", toNullableId(res.data.departmanKodId));
        setValue("gorev", toNullable(res.data.gorev));
        setValue("gorevID", toNullableId(res.data.gorevKodId));
        setValue("uzmanlikAlani", toNullable(res.data.uzmanlikAlani));
        setValue("uzmanlikAlaniID", toNullableId(res.data.uzmanlikAlaniKodId));
        setValue("sicilNo", toNullable(res.data.sicilNo));
        setValue("mobilErisim", res.data.mobilErisim);
        setValue("sskNo", res.data.sskNo);
        setValue("ehliyet", res.data.ehliyet);
        setValue("ehliyetSinifi", res.data.ehliyetSinifi);
        setValue("ehliyetNo", res.data.ehliyetNo);
        setValue("kanGrubu", res.data.kanGrubu);
        setValue("dogumTarihi", getValidDate(res.data.dogumTarihi));
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
        setValue("postaKodu", res.data.postaKodu);
        setValue("acilKisi", res.data.acilKisi);
        setValue("yakinlik", res.data.yakinlik);
        setValue("acilDurumTel", res.data.acilDurumTel);
        setValue("iletisimNotu", res.data.iletisimNotu);
        setValue("fax", res.data.fax);
        setValue("email", res.data.email);
        setValue("web", res.data.web);
        setValue("iseBaslamaTarihi", getValidDate(res.data.iseBaslamaTarihi));
        setValue("isetenAyrilmaTarihi", getValidDate(res.data.isetenAyrilmaTarihi));
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
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      personelId: personelId,
      personelKod: values.personelKod,
      isim: values.isim,
      lokasyonId: values.lokasyonId || 0,
      unvanKodId: values.unvanID || 0,
      personelTipiKodId: values.personelTipiID || 0,
      departmanKodId: values.departmanID || 0,
      gorevKodId: values.gorevID || 0,
      uzmanlikAlaniKodId: values.uzmanlikAlaniID || 0,
      sicilNo: values.sicilNo || "",
      mobilErisim: values.mobilErisim || false,
      sskNo: values.sskNo,
      ehliyet: values.ehliyet,
      ehliyetSinifi: values.ehliyetSinifi,
      ehliyetNo: values.ehliyetNo,
      kanGrubu: values.kanGrubu,
      dogumTarihi: formatDateForApi(values.dogumTarihi),
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
      postaKodu: values.postaKodu,
      acilKisi: values.acilKisi,
      yakinlik: values.yakinlik,
      acilDurumTel: values.acilDurumTel,
      iletisimNotu: values.iletisimNotu,
      fax: values.fax,
      aciklama: values.aciklama,
      gsm: values.gsm,
      aktif: values.aktif,
      iseBaslamaTarihi: formatDateForApi(values.iseBaslamaTarihi),
      isetenAyrilmaTarihi: formatDateForApi(values.isetenAyrilmaTarihi),
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
        onDrawerClose();
        onRefresh();
        reset(defaultValues);
      }
    });

    uploadPhoto(personelId, "PERSONEL", images, true);
    setImages([]);
    setImagesURL([]);
  });

  const personalProps = {
    form: "Firma",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("temelBilgiler"),
      children: <TemelBilgiler isValid={isValid} setImages={setImages} urls={imagesURL} />,
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
    {
      key: "5",
      label: t("ekliBelgeler"),
      children: <DosyaUpload selectedRowID={selectedRow?.key} refGroup="PERSONEL" />,
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

  // Detay yüklenirken form boş olduğu için alt başlıkta tablodan gelen kod ve isim gösterilir
  const modalSubtitle = [watch("personelKod") || selectedRow?.personelKod, watch("isim") || selectedRow?.isim].filter(Boolean).join(" • ");

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("personelKartiGuncellemeEkrani")}</span>
      {modalSubtitle && <span style={{ ...hintStyle, fontWeight: 400 }}>{modalSubtitle}</span>}
    </div>
  );

  return (
    <Modal title={modalTitle} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
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
