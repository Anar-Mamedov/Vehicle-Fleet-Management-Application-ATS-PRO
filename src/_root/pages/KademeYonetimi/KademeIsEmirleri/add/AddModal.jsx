import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, Modal, Tabs, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import { AddServiceItemService, GetIsEmriCodeService } from "../../../../../api/services/isEmri/services";
import GenelBilgiler from "../tabs/GenelBilgiler";
import Aciklama from "../tabs/Aciklama";
import { hintStyle } from "../../KademeTanimlari/components/uiStyles";
import { IS_EMRI_KOD_TABLE_NAME, isSuccessResponse } from "../constants";
import { buildEklemeAlanlari, buildIsEmriBody, getDefaultIsEmriValues, getKayitBasariMesaji } from "../formHelpers";

// Numara her tuşta değil, yazma durduktan sonra kontrol edilsin diye beklenen süre
const KOD_KONTROL_GECIKMESI_MS = 400;

const AddModal = ({ onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [kodDurumu, setKodDurumu] = useState("normal");

  const methods = useForm({ defaultValues: getDefaultIsEmriValues() });
  const { control, handleSubmit, reset, setValue } = methods;
  const servisNo = useWatch({ control, name: "servisNo" });

  // Modal açılınca numaratörden sıradaki iş emri numarası alınır
  useEffect(() => {
    if (!open) return;

    GetIsEmriCodeService()
      .then((res) => setValue("servisNo", res.data || null))
      .catch(() => message.error(t("islemBasarisiz")));
  }, [open, setValue]);

  // İş emri numarasının benzersizliği kontrol edilir; kullanılan bir numara ile kayıt yapılamaz
  useEffect(() => {
    if (!open || !servisNo) {
      setKodDurumu("normal");
      return undefined;
    }

    let ignore = false;
    const timer = setTimeout(() => {
      CodeItemValidateService({ tableName: IS_EMRI_KOD_TABLE_NAME, code: servisNo })
        .then((res) => {
          if (!ignore) setKodDurumu(res.data.status ? "error" : "success");
        })
        .catch(() => {
          if (!ignore) setKodDurumu("normal");
        });
    }, KOD_KONTROL_GECIKMESI_MS);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [open, servisNo]);

  const closeModal = () => {
    setOpen(false);
    setKodDurumu("normal");
    reset(getDefaultIsEmriValues());
  };

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    try {
      // Gecikmeli kontrol henüz sonuçlanmadan kaydedilebileceği için numara kayıttan hemen önce bir kez daha doğrulanır
      const kodKontrol = await CodeItemValidateService({ tableName: IS_EMRI_KOD_TABLE_NAME, code: values.servisNo });
      if (kodKontrol.data.status) {
        setKodDurumu("error");
        message.error(t("isEmriNoKullaniliyor"));
        return;
      }

      const response = await AddServiceItemService({ ...buildIsEmriBody(values), ...buildEklemeAlanlari() });

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
      children: <GenelBilgiler kodDurumu={kodDurumu} />,
    },
    {
      key: "aciklama",
      label: t("isEmriAciklamasi"),
      children: <Aciklama />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} loading={saving} disabled={kodDurumu === "error"}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={closeModal}>
      {t("iptal")}
    </Button>,
  ];

  const modalTitle = (
    <div className="flex flex-col">
      <span>{t("yeniIsEmri")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("yeniIsEmriAciklama")}</span>
    </div>
  );

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setOpen(true)}>
        <PlusOutlined /> {t("yeniIsEmri")}
      </Button>
      <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={1200} destroyOnClose>
        <FormProvider {...methods}>
          <form>
            <Tabs defaultActiveKey="genelBilgiler" items={items} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default AddModal;
