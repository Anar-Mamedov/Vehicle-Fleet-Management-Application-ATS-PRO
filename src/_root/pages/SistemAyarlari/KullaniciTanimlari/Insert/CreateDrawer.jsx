import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import { t } from "i18next";

export default function CreateModal({ selectedLokasyonId, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [periyodikBakim, setPeriyodikBakim] = useState("");
  const showModal = () => {
    setOpen(true);
  };
  const onClose = () => {
    Modal.confirm({
      title: "İptal etmek istediğinden emin misin?",
      content: "Kaydedilmemiş değişiklikler kaybolacaktır.",
      okText: "Evet",
      cancelText: "Hayır",
      onOk: () => {
        setOpen(false);
        methods.reset();
      },
      onCancel: () => {
        // Do nothing, continue from where the user left off
      },
    });
  };

  // back-end'e gönderilecek veriler

  //* export
  const methods = useForm({
    defaultValues: {
      rolSelect: null,
      mail: "",
      kullaniciKod: "",
      isim: "",
      soyisim: "",
      telefonNo: "",
      sifre: "",
      paraf: "",
      color: "#ffffff",
    },
  });

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const { setValue, reset, watch } = methods;

  //* export
  const onSubmit = (data) => {
    const Body = {
      kullaniciKod: data.kullaniciKod,
      isim: data.isim,
      sifre: data.sifre,
      aktif: true,
      soyAd: data.soyisim,
      email: data.mail,
      telefon: data.telefonNo,
      paraf: data.paraf,
      kullaniciRengi: data.color.toHexString(),
    };

    // AxiosInstance.post("/api/endpoint", { Body }).then((response) => {
    // handle response
    // });

    AxiosInstance.post("User/AddUser", Body)
      .then((response) => {
        // Handle successful response here, e.g.:
        console.log("Data sent successfully:", response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success("Ekleme Başarılı.");
          setOpen(false);
          onRefresh();
          reset();
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
          message.error("Ekleme Başarısız.");
        }
      })
      .catch((error) => {
        // Handle errors here, e.g.:
        console.error("Error sending data:", error);
        message.error("Başarısız Olundu.");
      });
    console.log({ Body });
  };

  useEffect(() => {
    // Eğer selectedLokasyonId varsa ve geçerli bir değerse, formun default değerini güncelle
    if (selectedLokasyonId !== undefined && selectedLokasyonId !== null) {
      methods.reset({
        ...methods.getValues(),
        selectedLokasyonId: selectedLokasyonId,
      });
    }
  }, [selectedLokasyonId, methods]);

  const periyodikBilgisi = watch("periyodikBilgisi");

  useEffect(() => {
    if (periyodikBilgisi === true) {
      setPeriyodikBakim("[Periyodik Bakım]");
    } else {
      setPeriyodikBakim("");
    }
  }, [periyodikBilgisi]);

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
          Ekle
        </Button>
        <Modal
          width="600px"
          centered
          title={t("kullaniciTanimlama")}
          destroyOnClose
          open={open}
          onCancel={onClose}
          footer={
            <Space>
              <Button onClick={onClose}>{t("iptal")}</Button>
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
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
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div>
              <MainTabs modalOpen={open} />
            </div>
          </form>
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}
