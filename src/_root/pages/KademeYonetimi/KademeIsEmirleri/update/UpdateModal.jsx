import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Spin, Tabs, Tag, message } from "antd";
import { t } from "i18next";
import { GetServiceCardCostService, GetVehicleServiceByIdService, UpdateServiceItemService } from "../../../../../api/services/isEmri/services";
import DosyaUpload from "../../../../components/Dosya/DosyaUpload";
import ResimUpload from "../../../../components/Resim/ResimUpload";
import GenelBilgiler from "../tabs/GenelBilgiler";
import AtananIsler from "../tabs/AtananIsler";
import MalzemeTalepleri from "../tabs/MalzemeTalepleri";
import Aciklama from "../tabs/Aciklama";
import IsEmriOzet from "../components/IsEmriOzet";
import DurumTag from "../components/DurumTag";
import useAtananIsler from "../hooks/useAtananIsler";
import useMalzemeTalepleri from "../hooks/useMalzemeTalepleri";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { IS_EMRI_REF_GROUP, isSuccessResponse, toNullableId } from "../constants";
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
  // Atanan işlerde veya malzeme taleplerinde değişiklik olduysa iş emri kaydedilmeden kapatılsa da liste yenilenir
  const [islerDegisti, setIslerDegisti] = useState(false);

  const methods = useForm({ defaultValues: getDefaultIsEmriValues() });
  const { handleSubmit, reset, setValue } = methods;

  const isEmriId = selectedRow?.siraNo;
  const { isler, loading: islerLoading, reload: reloadIsler } = useAtananIsler(isEmriId, open);
  const { talepler, loading: taleplerLoading, reload: reloadTalepler } = useMalzemeTalepleri(isEmriId, open);

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

  // İş veya malzeme talebi eklenip güncellendiğinde üst özetteki sayaçlar ve maliyetler değişir.
  // Formdaki kaydedilmemiş değerler korunsun diye form sıfırlanmaz; yalnızca özet ve maliyet alanları güncellenir.
  const refreshOzetVeMaliyet = useCallback(async () => {
    try {
      const [detayResponse, maliyetResponse] = await Promise.all([GetVehicleServiceByIdService(isEmriId), GetServiceCardCostService(isEmriId)]);
      const maliyet = maliyetResponse.data || {};
      setDetay(detayResponse.data);
      setValue("iscilik", maliyet.iscilik || 0);
      setValue("malzeme", maliyet.malzeme || 0);
      setValue("kdv", maliyet.kdv || 0);
      setValue("indirim", maliyet.indirim || 0);
    } catch {
      message.error(t("islemBasarisiz"));
    }
  }, [isEmriId, setValue]);

  const handleIslerChange = useCallback(() => {
    setIslerDegisti(true);
    reloadIsler();
    refreshOzetVeMaliyet();
  }, [reloadIsler, refreshOzetVeMaliyet]);

  const handleMalzemeTalepleriChange = useCallback(() => {
    setIslerDegisti(true);
    reloadTalepler();
    refreshOzetVeMaliyet();
  }, [reloadTalepler, refreshOzetVeMaliyet]);

  // Atanan İşler'den açılan talep hem işin malzeme sayısını hem de Malzeme Talepleri sekmesini etkiler
  const handleIsMalzemeTalebiChange = useCallback(() => {
    setIslerDegisti(true);
    reloadIsler();
    reloadTalepler();
    refreshOzetVeMaliyet();
  }, [reloadIsler, reloadTalepler, refreshOzetVeMaliyet]);

  const closeModal = ({ listeyiYenile = islerDegisti } = {}) => {
    if (listeyiYenile) onRefresh();
    setIslerDegisti(false);
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
        closeModal({ listeyiYenile: true });
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
      key: "atananIsler",
      label: `${t("atananIsler")} (${isler.length})`,
      children: (
        <AtananIsler
          isEmriId={isEmriId}
          aracId={toNullableId(detay?.aracId)}
          kademeId={toNullableId(detay?.kademeId)}
          isler={isler}
          loading={islerLoading}
          onChange={handleIslerChange}
          onMalzemeTalebiChange={handleIsMalzemeTalebiChange}
        />
      ),
    },
    {
      key: "malzemeTalepleri",
      label: `${t("malzemeTalepleri")} (${talepler.length})`,
      children: (
        <MalzemeTalepleri
          isEmriId={isEmriId}
          aracId={toNullableId(detay?.aracId)}
          kademeId={toNullableId(detay?.kademeId)}
          talepler={talepler}
          loading={taleplerLoading}
          onChange={handleMalzemeTalepleriChange}
        />
      ),
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
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => closeModal()}>
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
    <Modal title={modalTitle} open={open} onCancel={() => closeModal()} maskClosable={false} footer={footer} width={1200} destroyOnClose>
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
