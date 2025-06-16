import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useState, useTransition } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import secondTabs from "./components/SecondTabs/SecondTabs";
import { useForm, Controller, useFormContext, FormProvider, set } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import Footer from "../Footer";
import SecondTabs from "./components/SecondTabs/SecondTabs";

export default function EditModal({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) {
  const [, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  // Modal kapanıp tekrar açıldığında içerisindeki bulunan tab lardaki api lere tekrardan istek atmasını sağlamak için
  const [drawerKey, setDrawerKey] = useState(0);

  useEffect(() => {
    if (drawerVisible) {
      setDrawerKey((prevKey) => prevKey + 1); // Modal her açıldığında anahtarı artır
    }
  }, [drawerVisible]);

  // Modal kapanıp tekrar açıldığında içerisindeki bulunan tab lardaki api lere tekrardan istek atmasını sağlamak için son

  const showConfirmationModal = () => {
    Modal.confirm({
      title: "İptal etmek istediğinden emin misin?",
      content: "Kaydedilmemiş değişiklikler kaybolacaktır.",
      okText: "Evet",
      cancelText: "Hayır",
      onOk: () => {
        onDrawerClose(); // Close the modal
        onRefresh();
        reset();
      },
      onCancel: () => {
        // Do nothing, continue from where the user left off
      },
    });
  };

  const onClose = () => {
    // Kullanıcı "İptal" düğmesine tıkladığında Modal'ı göster
    showConfirmationModal();
  };

  // Modal'ın kapatılma olayını ele al
  const handleModalClose = () => {
    // Kullanıcı çarpı işaretine veya dış alana tıkladığında Modal'ı göster
    showConfirmationModal();
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
      lokasyonId: data.selectedLokasyonId,
      lokasyonTanim: data.lokasyonTanimi,
      anaLokasyonId: Number(data.anaLokasyonID),
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

    AxiosInstance.post("Location/UpdateLocation", Body)
      .then((response) => {
        // Handle successful response here, e.g.:
        console.log("Data sent successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          message.success("Ekleme Başarılı.");
          onDrawerClose(); // Close the modal
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

  /*  useEffect(() => {
    if (drawerVisible && selectedRow) {
      // console.log("selectedRow", selectedRow);
      // startTransition(() => {
      // Object.keys(selectedRow).forEach((key) => {
      //   console.log(key, selectedRow[key]);
      //   setValue(key, selectedRow[key]);
      setValue("selectedLokasyonId", selectedRow.key);
      setValue("lokasyonTanimi", selectedRow.lokasyonTanim);
      setValue("lokasyonAktif", selectedRow.lokasyonAktif);
      setValue("lokasyonAciklama", selectedRow.lokasyonAciklama);
      setValue("anaLokasyonID", selectedRow.anaLokasyonId);
      setValue("anaLokasyonTanim", selectedRow.anaLokasyon);
      setValue("LokasyonTipi", selectedRow.LOK_TIP);
      setValue("LokasyonTipiID", selectedRow.LOK_TIP_ID);
      setValue("LokasyonBina", selectedRow.LOK_BINA);
      setValue("LokasyonBinaID", selectedRow.LOK_BINA_KOD_ID);
      setValue("lokasyonMasrafMerkeziTanim", selectedRow.LOK_MASRAF_MERKEZ);
      setValue("lokasyonMasrafMerkeziID", selectedRow.LOK_MASRAF_MERKEZ_KOD_ID);
      setValue("LokasyonKat", selectedRow.LOK_KAT);
      setValue("LokasyonKatID", selectedRow.LOK_KAT_KOD_ID);
      setValue("lokasyonYoneticiTanim", selectedRow.LOK_PERSONEL);
      setValue("lokasyonYoneticiID", selectedRow.LOK_PERSONEL_ID);
      setValue("lokasyonDepoTanim", selectedRow.LOK_DEPO);
      setValue("lokasyonDepoID", selectedRow.LOK_MALZEME_DEPO_ID);
      setValue("lokasyonEmail", selectedRow.LOK_EMAIL);

      // add more fields as needed

      // });
      // });
    }
  }, [selectedRow, setValue, drawerVisible]); */

  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (drawerVisible && selectedRow) {
        setOpen(true); // İşlemler tamamlandıktan sonra drawer'ı aç
        setLoading(true); // Yükleme başladığında
        try {
          const response = await AxiosInstance.get(`Location/GetLocationById?locationId=${selectedRow.key}`);
          const item = response.data; // Veri dizisinin ilk elemanını al
          // Form alanlarını set et
          setValue("selectedLokasyonId", selectedRow.key);
          setValue("lokasyonTanimi", item.lokasyonTanim);
          setValue("lokasyonAktif", item.lokasyonAktif);
          setValue("anaLokasyonID", item.anaLokasyonId);
          setValue("anaLokasyonTanim", item.anaLokasyon);
          setValue("lokasyonAciklama", item.lokasyonAciklama);

          setValue("LokasyonTipi", item.LOK_TIP);
          setValue("LokasyonTipiID", item.LOK_TIP_ID);
          setValue("LokasyonBina", item.LOK_BINA);
          setValue("LokasyonBinaID", item.LOK_BINA_KOD_ID);
          setValue("lokasyonMasrafMerkeziTanim", item.LOK_MASRAF_MERKEZ);
          setValue("lokasyonMasrafMerkeziID", item.LOK_MASRAF_MERKEZ_KOD_ID);
          setValue("LokasyonKat", item.LOK_KAT);
          setValue("LokasyonKatID", item.LOK_KAT_KOD_ID);
          setValue("lokasyonYoneticiTanim", item.LOK_PERSONEL);
          setValue("lokasyonYoneticiID", item.LOK_PERSONEL_ID);
          setValue("lokasyonDepoTanim", item.LOK_DEPO);
          setValue("lokasyonDepoID", item.LOK_MALZEME_DEPO_ID);
          setValue("lokasyonEmail", item.LOK_EMAIL);
          // ... Diğer setValue çağrıları

          setLoading(false); // Yükleme tamamlandığında
        } catch (error) {
          console.error("Veri çekilirken hata oluştu:", error);
          setLoading(false); // Hata oluştuğunda
        }
      }
    };

    handleDataFetchAndUpdate();
  }, [selectedRow, setValue, drawerVisible]);

  useEffect(() => {
    if (!drawerVisible) {
      reset(); // Modal kapandığında formu sıfırla
    }
  }, [drawerVisible, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ConfigProvider locale={tr_TR}>
          <Modal
            key={drawerKey}
            width="950px"
            title="Kayıdı Güncelle"
            open={drawerVisible}
            onCancel={handleModalClose}
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
                  Güncelle
                </Button>
              </Space>
            }
          >
            {/* <MainTabs /> */}
            <SecondTabs refreshKey={drawerKey} />
            {/*<Footer />*/}
          </Modal>
        </ConfigProvider>
      </form>
    </FormProvider>
  );
}
