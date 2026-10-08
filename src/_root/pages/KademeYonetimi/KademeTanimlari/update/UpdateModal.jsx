import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, Modal, Spin, Tabs, Tag, message } from "antd";
import { t } from "i18next";
import { GetWorkShopDefItemByIdService, UpdateWorkShopDefItemService } from "../../../../../api/services/kademe/services";
import DosyaUpload from "../../../../components/Dosya/DosyaUpload";
import ResimUpload from "../../../../components/Resim/ResimUpload";
import GenelBilgiler from "../tabs/GenelBilgiler";
import Aciklama from "../tabs/Aciklama";
import { hintStyle } from "../components/uiStyles";
import { KADEME_REF_GROUP, isSuccessResponse } from "../constants";
import { buildKademeBody, getDefaultKademeValues, mapKademeToFormValues } from "../formHelpers";

const tagStyle = {
  borderRadius: "12px",
  margin: 0,
  fontWeight: 400,
};

const UpdateModal = ({ selectedRow, open, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const methods = useForm({ defaultValues: getDefaultKademeValues() });
  const { control, handleSubmit, reset } = methods;
  const [kademeKod, durum] = useWatch({ control, name: ["kademeKod", "durum"] });

  const kademeId = selectedRow?.siraNo;

  // Satıra tıklanınca kaydın güncel hali id ile okunup forma yazılır
  useEffect(() => {
    if (!open || !kademeId) return undefined;

    let ignore = false;
    setLoading(true);

    GetWorkShopDefItemByIdService(kademeId)
      .then((res) => {
        if (!ignore) reset(mapKademeToFormValues(res.data));
      })
      .catch(() => {
        if (!ignore) message.error(t("islemBasarisiz"));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [open, kademeId, reset]);

  const closeModal = () => {
    onClose();
    reset(getDefaultKademeValues());
  };

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    try {
      const response = await UpdateWorkShopDefItemService({ siraNo: kademeId, ...buildKademeBody(values) });

      if (isSuccessResponse(response)) {
        message.success(t("islemBasarili"));
        closeModal();
        onRefresh();
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  });

  const items = [
    {
      key: "genelBilgiler",
      label: t("genelBilgiler"),
      children: <GenelBilgiler kademeId={kademeId} />,
    },
    {
      key: "aciklama",
      label: t("aciklama"),
      children: <Aciklama />,
    },
    {
      key: "ekliBelgeler",
      label: t("ekliBelgeler"),
      children: <DosyaUpload selectedRowID={kademeId} refGroup={KADEME_REF_GROUP} />,
    },
    {
      key: "resimler",
      label: t("resimler"),
      children: <ResimUpload selectedRowID={kademeId} refGroup={KADEME_REF_GROUP} />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={loading}>
      {t("guncelle")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
  ];

  // Detay yüklenirken form boş olduğu için başlıktaki kod tablodan gelen satırdan okunur
  const modalTitle = (
    <div className="flex flex-col">
      <div className="flex align-center" style={{ gap: "8px" }}>
        <span>{t("kademeDetayi")}</span>
        {(kademeKod || selectedRow?.kademeKod) && <Tag style={tagStyle}>{kademeKod || selectedRow?.kademeKod}</Tag>}
        <Tag color={durum ? "success" : "error"} style={tagStyle}>
          {durum ? t("aktif") : t("pasif")}
        </Tag>
      </div>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("kademeDetayiAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={1000} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <Tabs defaultActiveKey="genelBilgiler" items={items} />
          </Spin>
        </form>
      </FormProvider>
    </Modal>
  );
};

UpdateModal.propTypes = {
  selectedRow: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default UpdateModal;
