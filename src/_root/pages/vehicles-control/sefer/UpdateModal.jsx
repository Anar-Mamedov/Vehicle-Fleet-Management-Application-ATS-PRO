import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetExpeditionItemByIdService, UpdateExpeditionItemService } from "../../../../api/services/vehicles/operations_services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../api/services/upload/services";
import { CodeItemValidateService } from "../../../../api/services/code/services";
import { Modal, Tabs, Button } from "antd";
import { AppstoreOutlined, CheckOutlined, CloseOutlined, ControlOutlined, FileDoneOutlined, FileTextOutlined, PaperClipOutlined, PictureOutlined, ProfileOutlined, SwapOutlined } from "@ant-design/icons";
import GeneralInfo from "./tabs/GeneralInfo";
import { sectionIconStyle } from "./components/uiStyles";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import DosyaUpload from "../../../components/Dosya/DosyaUpload";
import ResimUpload from "../../../components/Resim/ResimUpload";
import Yakit from "../yakit/Yakit";
import Harcamalar from "../harcama/Harcama";
import TasimaRotaBilgileri from "./tabs/TasimaRota/TasimaRota";

// Servis boş değerleri "" olarak döndürüyor; select'e boş string yazılırsa antd alanı dolu sayar ve placeholder görünmez
const toNullable = (value) => (value === "" || value === undefined ? null : value);

// Kod/kayıt kimliklerinde 0 "seçim yok" demektir, select'e null yazılır
const toNullableId = (value) => (value === 0 || value === "" || value === undefined ? null : value);

// Boş bırakılan tarih/saat alanları servise "Invalid Date" olarak gitmemeli
const formatDateValue = (value) => (value && dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : null);
const formatTimeValue = (value) => (value && dayjs(value).isValid() ? dayjs(value).format("HH:mm:ss") : null);

const UpdateModal = ({ updateModal, setUpdateModal, id, setStatus, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const { data, plaka } = useContext(PlakaContext);
  const [isValid, setIsValid] = useState("normal");
  const [code, setCode] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [filesUrl, setFilesUrl] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
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
    const varisKm = watch("varisKm");
    const cikisKm = watch("cikisKm");
    let fark = 0;
    if (varisKm !== undefined && varisKm !== null && varisKm !== "") {
      const varisNum = Number(varisKm);
      const cikisNum = Number(cikisKm || 0);
      if (!isNaN(varisNum) && !isNaN(cikisNum)) {
        fark = Math.round(varisNum - cikisNum);
        if (fark < 0) {
          fark = 0;
        }
      }
    }
    setValue("farkKm", fark);
  }, [watch("varisKm"), watch("cikisKm")]);

  useEffect(() => {
    if (drawerVisible && selectedRow) {
      GetExpeditionItemByIdService(selectedRow?.key).then((res) => {
        setValue("plaka", toNullable(res?.data.plaka));
        setValue("aracId", toNullableId(res?.data.aracId));
        setValue("seferNo", res?.data.seferNo);
        setValue("firmaId", toNullableId(res?.data.firmaId));
        setValue("firma", toNullable(res?.data.firma));
        setValue("seferSorumlusu", toNullable(res?.data.seferSorumlusu));
        setValue("seferYeriID", toNullableId(res?.data.seferYeriKodId));
        setValue("seferYeri", toNullable(res?.data.seferYeri));
        setValue("projeID", toNullableId(res?.data.projeKodId));
        setValue("proje", toNullable(res?.data.proje));
        setValue("departmanID", toNullableId(res?.data.departmanKodId));
        setValue("departman", toNullable(res?.data.departman));
        setValue("isEmriNo", res?.data.isEmriNo);
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
        setValue("surucuId1", toNullableId(res?.data.surucuId1));
        setValue("surucu1", toNullable(res?.data.surucuIsim1));
        setValue("surucuId2", toNullableId(res?.data.surucuId2));
        setValue("surucu2", toNullable(res?.data.surucuIsim2));
        setValue("dorseId", toNullableId(res?.data.dorseId));
        setValue("dorsePlaka", toNullable(res?.data.dorsePlaka));
        setValue("guzergahId", toNullableId(res?.data.guzergahId));
        setValue("guzergah", toNullable(res?.data.guzergah));
        setValue("seferDurumID", toNullableId(res?.data.seferDurumKodId));
        setValue("seferDurum", toNullable(res?.data.seferDurum));
        setValue("seferTipID", toNullableId(res?.data.seferTipKodId));
        setValue("seferTip", toNullable(res?.data.seferTip));
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
      seferNo: values.seferNo || "",
      surucuId1: values.surucuId1 || 0,
      surucuId2: values.surucuId2 || 0,
      aracId: values.aracId || 0,
      firmaId: values.firmaId || 0,
      seferSorumlusu: values.seferSorumlusu || "",
      seferYeriKodId: values.seferYeriID || 0,
      projeKodId: values.projeID || 0,
      departmanKodId: values.departmanID || 0,
      isEmriNo: values.isEmriNo || "",
      aciklama: values.aciklama || "",
      dorseId: values.dorseId || 0,
      guzergahId: values.guzergahId || 0,
      seferTipKodId: values.seferTipID || 0,
      seferDurumKodId: values.seferDurumID || 0,
      cikisTarih: formatDateValue(values.cikisTarih),
      varisTarih: formatDateValue(values.varisTarih),
      cikisSaat: formatTimeValue(values.cikisSaat),
      varisSaat: formatTimeValue(values.varisSaat),
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
      icon: <AppstoreOutlined />,
      children: <GeneralInfo isValid={isValid} isUpdate />,
    },
    {
      key: "7",
      label: t("operasyonHareketleri"),
      icon: <SwapOutlined />,
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
      key: "5",
      label: t("yakitGiderleri"),
      icon: <FileTextOutlined />,
      children: <Yakit key={yakitKey} selectedRow={selectedRow} seferId={selectedRow?.key} isSefer={true} tableHeight="calc(100vh - 440px)" />,
    },
    {
      key: "6",
      label: t("harcamalar"),
      icon: <FileDoneOutlined />,
      children: <Harcamalar key={harcamaKey} selectedRow={selectedRow} seferId={selectedRow?.key} isSefer={true} tableHeight="calc(100vh - 440px)" />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      icon: <ControlOutlined />,
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "3",
      label: t("resimler"),
      icon: <PictureOutlined />,
      children: <ResimUpload selectedRowID={selectedRow?.key} refGroup="SEFER" />,
    },
    {
      key: "4",
      label: t("ekliBelgeler"),
      icon: <PaperClipOutlined />,
      children: <DosyaUpload selectedRowID={selectedRow?.key} refGroup="SEFER" />,
    },
  ];

  const handleClose = () => {
    onDrawerClose();
    onRefresh();
    setActiveKey("1");
  };

  const footer = [
    <Button key="back" icon={<CloseOutlined />} onClick={handleClose}>
      {t("vazgec")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" icon={<CheckOutlined />} onClick={onSubmit}>
      {t("guncelle")}
    </Button>,
  ];

  // Başlıkta operasyon numarası ve güncel durumu birlikte gösterilir
  const seferNo = watch("seferNo");
  const seferDurum = watch("seferDurum");

  const modalTitle = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={sectionIconStyle}>
        <ProfileOutlined />
      </span>
      <span style={{ fontSize: "16px", fontWeight: 600, color: "#141414" }}>{t("operasyonGuncelleme")}</span>
      {seferNo ? <span style={{ fontSize: "14px", fontWeight: 400, color: "#8c8c8c" }}>{`(${[seferNo, seferDurum].filter(Boolean).join(" / ")})`}</span> : null}
    </div>
  );

  return (
    <Modal title={modalTitle} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1400}>
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
