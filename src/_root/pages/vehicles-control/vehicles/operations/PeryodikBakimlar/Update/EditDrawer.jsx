import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, ConfigProvider, Modal, message, Spin } from "antd";
import React, { useEffect, useState, useTransition } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import secondTabs from "./components/SecondTabs/SecondTabs";
import { useForm, Controller, useFormContext, FormProvider, set } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../../../api/http.jsx";
import SecondTabs from "./components/SecondTabs/SecondTabs";

export default function EditModal({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      Plaka: null,
      PlakaID: null,
      aktif: true,
      servisKodu: null,
      servisKoduID: null,
      servisTanimi: null,
      servisTipi: null,
      herKm: false,
      herKmInput: null,
      herKmInput2: null,
      herGun: false,
      herGunInput: null,
      herTarihi: null,
      aciklama: null,
      hedefTarih: null,
      hedefKm: null,
    },
  });

  const { setValue, reset, watch } = methods;

  const refreshTable = watch("refreshTable");

  // API'den gelen verileri form alanlarına set etme

  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (drawerVisible && selectedRow) {
        setOpen(true); // İşlemler tamamlandıktan sonra drawer'ı aç
        setLoading(true); // Yükleme başladığında
        try {
          const response = await AxiosInstance.get(`PeriodicMaintenance/GetPeriodicMaintenancesItemById?id=${selectedRow.key}`);
          const item = response.data; // Veri dizisinin ilk elemanını al
          // Form alanlarını set et
          setValue("Plaka", item.plaka);
          setValue("PlakaID", item.aracId);
          setValue("aktif", item.aktif);
          setValue("servisKodu", item.bakimKodu);
          setValue("servisKoduID", item.bakimId);
          setValue("servisTanimi", item.bakimTanimi);
          setValue("servisTipi", item.servisTipi);
          setValue("herKm", item.herKm);
          setValue("herKmInput", item.herKm);
          setValue("herKmInput2", item.sonKm);
          setValue("herGun", item.herGun);
          setValue("herGunInput", item.herGun);
          setValue("herTarihi", item.sonTarih ? (dayjs(item.sonTarih).isValid() ? dayjs(item.sonTarih) : null) : null);
          setValue("aciklama", item.aciklama);
          setValue("hedefTarih", item.hedefTarih ? (dayjs(item.hedefTarih).isValid() ? dayjs(item.hedefTarih) : null) : null);
          setValue("hedefKm", item.hedefKm);
          // ... Diğer setValue çağrıları

          setLoading(false); // Yükleme tamamlandığında
        } catch (error) {
          console.error("Veri çekilirken hata oluştu:", error);
          setLoading(false); // Hata oluştuğunda
        }
      }
    };

    handleDataFetchAndUpdate();
  }, [drawerVisible, selectedRow, setValue, onRefresh, methods.reset, AxiosInstance]);

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const onSubmit = (data) => {
    // Form verilerini API'nin beklediği formata dönüştür
    const Body = {
      siraNo: Number(selectedRow.key),
      aracId: Number(data.PlakaID),
      bakimId: Number(data.servisKoduID),
      herKm: Number(data.herKmInput),
      herGun: Number(data.herGunInput),
      sonKm: Number(data.herKmInput2),
      sonTarih: formatDateWithDayjs(data.herTarihi) || null,
      hedefTarih: formatDateWithDayjs(data.hedefTarih) || null,
      hedefKm: Number(data.hedefKm),
      aktif: data.aktif,
      aciklama: data.aciklama,
      kalanKm: 0,
      kalanSure: 0,
    };

    // API'ye POST isteği gönder
    AxiosInstance.post(`PeriodicMaintenance/UpdatePeriodicMaintenance`, Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          message.success("Ekleme Başarılı.");
          setOpen(false);
          onRefresh();
          methods.reset();
          onDrawerClose();
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
          message.error("Ekleme Başarısız.");
        }
      })
      .catch((error) => {
        // Handle errors here, e.g.:
        console.error("Error sending data:", error);
        if (navigator.onLine) {
          // İnternet bağlantısı var
          message.error("Hata Mesajı: " + error.message);
        } else {
          // İnternet bağlantısı yok
          message.error("Internet Bağlantısı Mevcut Değil.");
        }
      });
    console.log({ Body });
  };

  const onClose = () => {
    Modal.confirm({
      title: "İptal etmek istediğinden emin misin?",
      content: "Kaydedilmemiş değişiklikler kaybolacaktır.",
      okText: "Evet",
      cancelText: "Hayır",
      onOk: () => {
        setOpen(false);
        reset();
        onDrawerClose();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={tr_TR}>
        <Modal
          width="700px"
          centered
          title="Kayıdı Güncelle"
          open={drawerVisible}
          onCancel={onClose}
          footer={
            <Space>
              <Button onClick={onClose}>İptal</Button>
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
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
          {loading ? (
            <div style={{ overflow: "auto", height: "calc(100vh - 150px)" }}>
              <Spin
                spinning={loading}
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* İçerik yüklenirken gösterilecek alan */}
              </Spin>
            </div>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <MainTabs />
                <SecondTabs />
                {/*<Footer />*/}
              </div>
            </form>
          )}
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}
