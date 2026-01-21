import React, { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import MainTabs from "./components/MainTabs/MainTabs";
import AxiosInstance from "../../../../api/http.jsx";
import PropTypes from "prop-types";

export default function CreateModal({ onRefresh }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      talepNo: "",
      tarih: dayjs(),
      saat: dayjs(),
      talepTur: null,
      talepOncelik: "orta",
      plaka: null,
      plakaID: null,
      lokasyon: null,
      lokasyonID: null,
      aciklama: "",
      files: [],
    },
  });

  const { setValue, reset } = methods;

  // Numaretörden numara çekme
  const getTalepNo = useCallback(() => {
    AxiosInstance.get("Numbering/GetModuleCodeByCode?code=TALEP_BILDIRIM")
      .then((res) => {
        setValue("talepNo", res.data);
      })
      .catch((err) => {
        console.error("Numaretör hatası:", err);
        message.error(t("hataOlustu"));
      });
  }, [setValue]);

  useEffect(() => {
    if (open) {
      getTalepNo();
      // Tarih/Saat default değerleri
      setValue("tarih", dayjs());
      setValue("saat", dayjs());
    }
  }, [open, getTalepNo, setValue]);

  const onClose = () => {
    setOpen(false);
    reset();
  };

  const uploadPhotos = async (refId, photos) => {
    if (!photos || photos.length === 0) return;

    for (const file of photos) {
      const formData = new FormData();
      formData.append("images", file.originFileObj || file);

      try {
        // refGroup="TALEP_BILDIRIM" sabit
        await AxiosInstance.post(`Photo/UploadPhoto?refId=${refId}&refGroup=TALEP_BILDIRIM&isForDefault=false`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Fotoğraf yükleme hatası:", error);
        message.warning(t("fotografYuklemeBasarisiz"));
      }
    }
  };

  const onSubmit = (data) => {
    setLoading(true);

    const terminTarihi = dayjs(data.tarih).format("YYYY-MM-DD");
    // const terminSaati = dayjs(data.saat).format("HH:mm:ss");

    // Body hazırlığı
    const Body = {
      talepNo: data.talepNo,
      aracId: Number(data.plakaID),
      lokasyonId: Number(data.lokasyonID),
      aciklama: data.aciklama,
      tarih: terminTarihi,
      talepDurum: "beklemede",
      talepOncelik: data.talepOncelik,
      talepTur: data.talepTur, // Kullanıcı seçimi (ariza, lastik, vb.)
      talepEdenId: Number(localStorage.getItem("id")),
    };

    AxiosInstance.post("RequestNotification/AddRequestItem", Body)
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          const recordId = res.data.data;

          // Fotoğrafları yükle
          if (data.files && data.files.length > 0) {
            await uploadPhotos(recordId, data.files);
          }

          message.success(t("islemBasarili"));
          onClose();
          if (onRefresh) onRefresh();
        } else {
          message.error(res.data.message || t("islemBasarisiz"));
        }
      })
      .catch((err) => {
        console.error("Kaydetme hatası:", err);
        message.error(t("islemBasarisiz"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ display: "flex", alignItems: "center" }}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniTalepBildirimiOlustur") || "Yeni Talep Bildirimi"}
        width={800}
        centered
        open={open}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            {t("iptal")}
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={methods.handleSubmit(onSubmit)}>
            {t("kaydet")}
          </Button>,
        ]}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div style={{ paddingTop: "20px" }}>
              <MainTabs modalOpen={open} />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}

CreateModal.propTypes = {
  onRefresh: PropTypes.func,
};
