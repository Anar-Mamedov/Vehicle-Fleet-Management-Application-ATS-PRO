import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../../api/services/upload/services";
import { UpdateHgsGecisFiyat, GetHgsGecisFiyatByIdService } from "../../../../../api/services/hgs-islem-takibi/services";
import GeneralInfo from "./GeneralInfo";
import Iletisim from "./Iletisim";
import PersonalFields from "../../../../components/form/PersonalFields";
import FinansBilgileri from "./FinansBilgileri";
import { uploadFile, uploadPhoto } from "../../../../../utils/upload";
import PhotoUpload from "../../../../components/upload/PhotoUpload";
import FileUpload from "../../../../components/upload/FileUpload";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [isValid, setIsValid] = useState("normal");
  const [code, setCode] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [firmaId, setFirmaId] = useState(0);

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (drawerVisible && selectedRow) {
      GetHgsGecisFiyatByIdService(selectedRow?.key).then((res) => {
        const data = res?.data;
        setValue("siraNo", data.siraNo);
        setValue("firmaId", data.firmaId);
        setValue("firmaAdi", data.firmaAdi);
        setValue("girisYeriKodId", data.girisYeriKodId);
        setValue("girisYeri", data.girisYeri);
        setValue("cikisYeriKodId", data.cikisYeriKodId);
        setValue("cikisYeri", data.cikisYeri);
        setValue("fiyat", data.fiyat);
        setValue("aciklama", data.aciklama);
      });
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: values.siraNo || 0,
      firmaId: values.firmaId || 0,
      girisYeriKodId: values.girisYeriKodId || 0,
      cikisYeriKodId: values.cikisYeriKodId || 0,
      fiyat: values.fiyat || 0,
      aciklama: values.aciklama || "",
    };
  
    UpdateHgsGecisFiyat(body).then((res) => {
      if (res.data.statusCode === 202) {
        onDrawerClose();
        onRefresh();
        reset(defaultValues);
        setActiveKey("1");
      }
    });
  });

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo isValid={isValid} />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid === "success" ? false : isValid === "error" ? true : false}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        onDrawerClose();
        reset(defaultValues);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("HgsGecisFiyatGuncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
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
