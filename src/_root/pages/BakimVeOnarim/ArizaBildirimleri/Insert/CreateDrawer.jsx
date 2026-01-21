import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import MainTabs from "./components/MainTabs/MainTabs";
// import SecondTabs from "./components/SecondTabs/SecondTabs"; // Removed as we moved everything to MainTabs
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";

export default function CreateDrawer({ onRefresh }) {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      talepNo: "",
      tarih: null,
      saat: null,
      plaka: null,
      plakaID: null,
      lokasyon: null,
      lokasyonID: null,
      talepOncelik: "Orta",
      aciklama: "",
      files: [],
      // Other fields can be null
    },
  });

  const { setValue, reset, handleSubmit } = methods;

  const getArizaNo = React.useCallback(async () => {
    try {
      const response = await AxiosInstance.get("Numbering/GetModuleCodeByCode", {
        params: {
          code: "TALEP_BILDIRIM",
        },
      });
      if (response.data) {
        setValue("talepNo", response.data);
      }
    } catch (error) {
      console.error("Error fetching talepNo:", error);
    }
  }, [setValue]);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      getArizaNo();
      setValue("tarih", dayjs());
      setValue("saat", dayjs());
    }
  }, [open, setValue, getArizaNo]);

  const onClose = () => {
    Modal.confirm({
      title: t("iptalEtmekIstediginizdenEminMisin"),
      content: t("kaydedilmemisDegisikliklerKaybolacaktir"),
      okText: t("evet"),
      cancelText: t("hayir"),
      onOk: () => {
        setOpen(false);
        setTimeout(() => {
          reset();
        }, 100);
      },
    });
  };

  const uploadPhotos = async (recordId, files) => {
    if (!files || files.length === 0) return;

    for (const file of files) {
      const formData = new FormData();
      formData.append("images", file.originFileObj || file);

      try {
        await AxiosInstance.post(`/Photo/UploadPhoto?refId=${recordId}&refGroup=TALEP_BILDIRIM&isForDefault=false`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Uploaded file:", file.name);
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
        message.error(`${file.name} yüklenemedi.`);
      }
    }
  };

  const onSubmit = (data) => {
    const Body = {
      talepNo: data.talepNo,
      aracId: Number(data.plakaID),
      lokasyonId: Number(data.lokasyonID),
      aciklama: data.aciklama,
      tarih: data.tarih ? dayjs(data.tarih).format("YYYY-MM-DD") : null,
      talepDurum: "beklemede",
      talepOncelik: data.talepOncelik,
      talepTur: "ariza",
      talepEdenId: Number(localStorage.getItem("id")),
    };

    AxiosInstance.post("RequestNotification/AddRequestItem", Body)
      .then(async (response) => {
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success(t("eklemeBasarili"));

          const recordId = response.data.data; // Provided by API doc
          if (data.files && data.files.length > 0) {
            await uploadPhotos(recordId, data.files);
          }

          setOpen(false);
          if (onRefresh) onRefresh();
          setTimeout(() => {
            reset();
          }, 100);
        } else {
          message.error(t("eklemeBasarisiz"));
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        message.error(t("basarisizOlundu"));
      });
  };

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={tr_TR}>
        <Button
          type="primary"
          onClick={showModal}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PlusOutlined />
          {t("ekle")}
        </Button>
        <Modal
          width="800px" // Adjusted width
          centered
          title={t("yeniArizaBildirimiOlustur")} // Updated title
          destroyOnClose
          open={open}
          onCancel={onClose}
          footer={
            <Space>
              <Button onClick={onClose}>{t("iptal")}</Button>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#2bc770",
                  borderColor: "#2bc770",
                  color: "#ffffff",
                }}
              >
                {t("kaydet")}
              </Button>
            </Space>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <MainTabs modalOpen={open} />
            </div>
          </form>
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}
