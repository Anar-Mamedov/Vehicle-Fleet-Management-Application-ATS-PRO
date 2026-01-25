import React, { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetExpenseByIdService, UpdateExpenseItemService } from "../../../../api/services/vehicles/operations_services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../api/services/upload/services";
import { Modal, Tabs, Button } from "antd";
import GeneralInfo from "./tabs/GeneralInfo";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import dayjs from "dayjs";
import DosyaUpload from "../../../components/Dosya/DosyaUpload";
import ResimUpload from "../../../components/Resim/ResimUpload";

const UpdateModal = ({ updateModal, setUpdateModal, id, setStatus, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
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
      code: 877,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 878,
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
    if (drawerVisible && selectedRow) {
      GetExpenseByIdService(selectedRow?.key).then((res) => {
        setValue("aracId", res?.data.aracId);
        setValue("plaka", res?.data.plaka);
        setValue("tarih", dayjs(res?.data.tarih));
        setValue("aciklama", res?.data.aciklama);
        setValue("lokasyon", res?.data.lokasyon);
        setValue("lokasyonId", res?.data.lokasyonId);
        setValue("surucuId", res?.data.surucuId);
        setValue("surucu", res?.data.surucuIsim);
        setValue("tutar", res?.data.tutar);
        setValue("harcama", res?.data.harcama);
        setValue("harcamaKodId", res?.data.harcamaKodId);
        setValue("maliyet", res?.data.maliyet);
        setValue("ozel", res?.data.ozel);
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

      GetPhotosByRefGroupService(selectedRow?.key, "HARCAMA").then((res) => setImageUrls(res.data));

      GetDocumentsByRefGroupService(selectedRow?.key, "HARCAMA").then((res) => setFilesUrl(res.data));
    }
  }, [drawerVisible, selectedRow]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: selectedRow?.key,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
      surucuId: values.surucuId || 0,
      lokasyonId: values.lokasyonId || 0,
      maliyet: values.maliyet,
      ozel: values.ozel,
      aciklama: values.aciklama,
      harcamaKodId: values.harcamaKodId || 0,
      tutar: values.tutar || 0,
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

    UpdateExpenseItemService(body).then((res) => {
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
    // setStatus(false);
  });

  const personalProps = {
    form: "HARCAMA",
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
      children: <ResimUpload selectedRowID={selectedRow?.key} refGroup="HARCAMA" />,
    },
    {
      key: "4",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: <DosyaUpload selectedRowID={selectedRow?.key} refGroup="HARCAMA" />,
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
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("harcamaBilgisiGuncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
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
