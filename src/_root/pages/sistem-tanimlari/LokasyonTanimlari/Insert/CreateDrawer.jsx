import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import Footer from "../Footer";
// import SecondTabs from "./components/secondTabs/secondTabs";

export default function CreateModal({ selectedLokasyonId, onRefresh }) {
  const [open, setOpen] = useState(false);
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

  const handleClick = () => {
    const values = methods.getValues();
    console.log(onSubmit(values));
  };

  //* export
  const methods = useForm({
    defaultValues: {
      anaLokasyonTanim: "",
      anaLokasyonID: 0,
      selectedLokasyonId: "",
      lokasyonTanimi: "",
      lokasyonAktif: true,
      LokasyonTipi: null,
      LokasyonTipiID: "",
      lokasyonBina: null,
      LokasyonBinaID: "",
      lokasyonMasrafMerkezi: "",
      lokasyonMasrafMerkeziID: "",
      LokasyonKat: null,
      LokasyonKatID: "",
      lokasyonYoneticiTanim: "",
      lokasyonYoneticiID: "",
      lokasyonDepoTanim: "",
      lokasyonDepoID: "",
      lokasyonEmail: "",
      lokasyonAciklama: "",
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

  const { setValue, reset } = methods;

  //* export
  const onSubmit = (data) => {
    const Body = {
      lokasyonTanim: data.lokasyonTanimi,
      anaLokasyonId: data.anaLokasyonID,
      lokasyonTipId: data.LokasyonTipiID || 0,
      lokasyonAciklama: data.lokasyonAciklama,
      lokasyonAktif: data.lokasyonAktif,
      lokasyonTumYol: data.anaLokasyonTumYol ? `${data.anaLokasyonTumYol}/${data.lokasyonTanimi}` : data.lokasyonTanimi,

      // LOK_MASRAF_MERKEZ_KOD_ID: data.lokasyonMasrafMerkeziID,
      // LOK_PERSONEL_ID: data.lokasyonYoneticiID,
      // LOK_EMAIL: data.lokasyonEmail,
      // LOK_BINA_KOD_ID: data.LokasyonBinaID,
      // LOK_KAT_KOD_ID: data.LokasyonKatID,
      // LOK_MALZEME_DEPO_ID: data.lokasyonDepoID,
      // add more fields as needed
    };

    // AxiosInstance.post("/api/endpoint", { Body }).then((response) => {
    // handle response
    // });

    AxiosInstance.post("Location/AddLocation", Body)
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            width="950px"
            title="Yeni Kayıt Ekle"
            open={open}
            onCancel={onClose}
            footer={
              <Space>
                <Button onClick={onClose}>İptal</Button>
                <Button
                  type="submit"
                  onClick={handleClick}
                  style={{
                    backgroundColor: "#2bc770",
                    borderColor: "#2bc770",
                    color: "#ffffff",
                  }}
                >
                  Kaydet
                </Button>
              </Space>
            }
          >
            <div style={{ overflow: "auto", height: "calc(100vh - 250px)" }}>
              <MainTabs />
              {/* <SecondTabs /> */}
              {/*<Footer />*/}
            </div>
          </Modal>
        </ConfigProvider>
      </form>
    </FormProvider>
  );
}
