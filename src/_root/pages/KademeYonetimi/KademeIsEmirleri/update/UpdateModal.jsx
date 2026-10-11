import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Spin, Tabs, Tag, message } from "antd";
import { t } from "i18next";
import { GetServiceCardCostService, GetVehicleServiceByIdService, UpdateServiceItemService } from "../../../../../api/services/isEmri/services";
import DosyaUpload from "../../../../components/Dosya/DosyaUpload";
import ResimUpload from "../../../../components/Resim/ResimUpload";
import GenelBilgiler from "../tabs/GenelBilgiler";
import Aciklama from "../tabs/Aciklama";
import IsEmriOzet from "../components/IsEmriOzet";
import DurumTag from "../components/DurumTag";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { IS_EMRI_REF_GROUP, isSuccessResponse } from "../constants";
import { buildIsEmriBody, buildKorunanServisAlanlari, getDefaultIsEmriValues, getKayitBasariMesaji, mapIsEmriToFormValues } from "../formHelpers";

const tagStyle = {
  borderRadius: "12px",
  margin: 0,
  fontWeight: 400,
};

const UpdateModal = ({ selectedRow, open, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [detay, setDetay] = useState(null);

  const methods = useForm({ defaultValues: getDefaultIsEmriValues() });
  const { handleSubmit, reset } = methods;

  const isEmriId = selectedRow?.siraNo;

  // Satıra tıklanınca kaydın güncel hali ve işçilik/malzeme maliyeti id ile okunup forma yazılır
  useEffect(() => {
    if (!open || !isEmriId) return undefined;

    let ignore = false;
    setLoading(true);

    Promise.all([GetVehicleServiceByIdService(isEmriId), GetServiceCardCostService(isEmriId)])
      .then(([detayResponse, maliyetResponse]) => {
        if (ignore) return;

        const maliyet = maliyetResponse.data || {};
        setDetay(detayResponse.data);
        reset({
          ...mapIsEmriToFormValues(detayResponse.data),
          iscilik: maliyet.iscilik || 0,
          malzeme: maliyet.malzeme || 0,
          kdv: maliyet.kdv || 0,
          indirim: maliyet.indirim || 0,
        });
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
  }, [open, isEmriId, reset]);

  const closeModal = () => {
    onClose();
    setDetay(null);
    reset(getDefaultIsEmriValues());
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!detay) return;

    setSaving(true);
    try {
      const response = await UpdateServiceItemService({ siraNo: isEmriId, ...buildKorunanServisAlanlari(detay), ...buildIsEmriBody(values) });

      if (isSuccessResponse(response)) {
        message.success(getKayitBasariMesaji(response.data, values));
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
      children: <GenelBilgiler isUpdate />,
    },
    {
      key: "resimler",
      label: t("resimler"),
      children: <ResimUpload selectedRowID={isEmriId} refGroup={IS_EMRI_REF_GROUP} />,
    },
    {
      key: "ekliBelgeler",
      label: t("ekliBelgeler"),
      children: <DosyaUpload selectedRowID={isEmriId} refGroup={IS_EMRI_REF_GROUP} />,
    },
    {
      key: "aciklama",
      label: t("isEmriAciklamasi"),
      children: <Aciklama />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={loading || !detay}>
      {t("guncelle")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
  ];

  // Detay yüklenirken başlıktaki numara ve durum tablodan gelen satırdan okunur
  const servisNo = detay?.servisNo || selectedRow?.servisNo;
  const durum = detay?.durumBilgisi ?? selectedRow?.durumBilgisi;

  const modalTitle = (
    <div className="flex flex-col">
      <div className="flex align-center" style={{ gap: "8px" }}>
        <span>{t("isEmriDetayi")}</span>
        {servisNo && <Tag style={tagStyle}>{servisNo}</Tag>}
        {durum ? <DurumTag durum={durum} /> : null}
      </div>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("isEmriDetayiAciklama")}</span>
    </div>
  );

  return (
    <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={1200} destroyOnClose>
      <FormProvider {...methods}>
        <form>
          <Spin spinning={loading}>
            <IsEmriOzet detay={detay} />
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
