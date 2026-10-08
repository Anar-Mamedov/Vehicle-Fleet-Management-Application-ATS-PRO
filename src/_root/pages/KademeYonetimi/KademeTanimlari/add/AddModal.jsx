import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, Modal, Tabs, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import { AddWorkShopDefItemService, GetKademeCodeService } from "../../../../../api/services/kademe/services";
import GenelBilgiler from "../tabs/GenelBilgiler";
import Aciklama from "../tabs/Aciklama";
import { hintStyle } from "../components/uiStyles";
import { KADEME_KOD_TABLE_NAME, isSuccessResponse } from "../constants";
import { buildKademeBody, getDefaultKademeValues } from "../formHelpers";

// Kod her tuşta değil, yazma durduktan sonra kontrol edilsin diye beklenen süre
const KOD_KONTROL_GECIKMESI_MS = 400;

const AddModal = ({ onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [kodDurumu, setKodDurumu] = useState("normal");

  const methods = useForm({ defaultValues: getDefaultKademeValues() });
  const { control, handleSubmit, reset, setValue } = methods;
  const kademeKod = useWatch({ control, name: "kademeKod" });

  // Modal açılınca numaratörden sıradaki kademe kodu alınır
  useEffect(() => {
    if (!open) return;

    GetKademeCodeService()
      .then((res) => setValue("kademeKod", res.data || null))
      .catch(() => message.error(t("islemBasarisiz")));
  }, [open, setValue]);

  // Kademe kodunun benzersizliği kontrol edilir; kullanılan bir kod ile kayıt yapılamaz
  useEffect(() => {
    if (!open || !kademeKod) {
      setKodDurumu("normal");
      return undefined;
    }

    let ignore = false;
    const timer = setTimeout(() => {
      CodeItemValidateService({ tableName: KADEME_KOD_TABLE_NAME, code: kademeKod })
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
  }, [open, kademeKod]);

  const closeModal = () => {
    setOpen(false);
    setKodDurumu("normal");
    reset(getDefaultKademeValues());
  };

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    try {
      // Gecikmeli kontrol henüz sonuçlanmadan kaydedilebileceği için kod kayıttan hemen önce bir kez daha doğrulanır
      const kodKontrol = await CodeItemValidateService({ tableName: KADEME_KOD_TABLE_NAME, code: values.kademeKod });
      if (kodKontrol.data.status) {
        setKodDurumu("error");
        message.error(t("kademeKoduKullaniliyor"));
        return;
      }

      const response = await AddWorkShopDefItemService(buildKademeBody(values));

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
      children: <GenelBilgiler kodDurumu={kodDurumu} />,
    },
    {
      key: "aciklama",
      label: t("aciklama"),
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
      <span>{t("yeniKademe")}</span>
      <span style={{ ...hintStyle, fontWeight: 400 }}>{t("yeniKademeAciklama")}</span>
    </div>
  );

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setOpen(true)}>
        <PlusOutlined /> {t("yeniKademe")}
      </Button>
      <Modal title={modalTitle} open={open} onCancel={closeModal} maskClosable={false} footer={footer} width={1000} destroyOnClose>
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
