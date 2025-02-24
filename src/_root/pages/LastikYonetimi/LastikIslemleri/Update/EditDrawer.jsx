import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, ConfigProvider, Modal, message, Spin } from "antd";
import React, { useEffect, useState, useTransition } from "react";
import Tablar from "./Tablar.jsx";
import { useForm, Controller, useFormContext, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";

export default function EditModal({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [periyodikBakim, setPeriyodikBakim] = useState("");
  const showModal = () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      aksSayisi: 2,
      onAxle: 1,
      arkaAxle: 1,
      aksTanimi: null,
      tip: null,
      tipID: null,
      aciklama: null,
      onAxleIslevTipi: null,
      arkaAxleIslevTipi: null,
      ortaAksTekerlerListesi: [],
      ortaAksTipIdListesi: [],
    },
  });

  const { setValue, reset, watch } = methods;

  // API'den gelen verileri form alanlarına set etme
  const handleDataFetchAndUpdate = async () => {
    setOpen(true); // İşlemler tamamlandıktan sonra drawer'ı aç
    setLoading(true); // Yükleme başladığında
    try {
      const response = await AxiosInstance.get(`Axel/GetAxelDefById?id=${selectedRow.aksId}`);
      const item = response.data; // Veri dizisinin ilk elemanını al
      // Form alanlarını set et
      setValue("secilenKayitID", item.siraNo);
      setValue("aksTanimi", item.aksTanimi);
      setValue("tip", item.aksTipi);
      setValue("tipID", item.aksTipId);
      setValue("aksSayisi", item.aksSayisi);
      setValue("onAxle", item.onAksTekerSayisi);
      setValue("arkaAxle", item.arkaAksTekerSayisi);
      setValue("onAxleIslevTipi", item.onAksTipId === 0 ? null : item.onAksTipId);
      setValue("arkaAxleIslevTipi", item.arkaAksTipId === 0 ? null : item.arkaAksTipId);
      if (item.ortaAksTekerlerListesi && item.ortaAksTipIdListesi) {
        item.ortaAksTekerlerListesi.forEach((value, index) => {
          setValue(`${index + 1}`, value); // index+1 matches your dynamic field naming pattern
        });
        item.ortaAksTipIdListesi.forEach((value, index) => {
          setValue(`${index + 1}IslevTipi`, value); // index+1 matches your dynamic field naming pattern
        });
      }
      setValue("aciklama", item.aciklama);
      // ... Diğer setValue çağrıları

      setLoading(false); // Yükleme tamamlandığında
    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
      setLoading(false); // Hata oluştuğunda
    }
  };

  useEffect(() => {
    if (drawerVisible && selectedRow) {
      handleDataFetchAndUpdate();
    }
  }, [drawerVisible, selectedRow, setValue, onRefresh, methods.reset, AxiosInstance]);

  const onRefresh1 = (selectedAxleId) => {
    if (selectedAxleId) {
      // Update the selectedRow with the new aksId
      selectedRow.aksId = selectedAxleId;
    }
    handleDataFetchAndUpdate();
  };

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
      siraNo: Number(data.secilenKayitID),
      aksTanimi: data.aksTanimi,
      aksTipId: Number(data.tipID),
      aksSayisi: data.aksSayisi,
      onAksTekerSayisi: data.onAxle,
      arkaAksTekerSayisi: data.arkaAxle,
      ortaAksTekerlerListesi: Array.from({ length: data.aksSayisi - 2 }, (_, index) => data[index + 1]),
      ortaAksTipIdListesi: Array.from({ length: data.aksSayisi - 2 }, (_, index) => data[`${index + 1}IslevTipi`]),
      onAksTipId: Number(data.onAxleIslevTipi),
      arkaAksTipId: Number(data.arkaAxleIslevTipi),
      aciklama: data.aciklama,
    };

    // API'ye POST isteği gönder
    AxiosInstance.post("Axel/UpdateAxelItem", Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          message.success("Güncelleme Başarılı.");
          setOpen(false);
          onRefresh();
          methods.reset();
          onDrawerClose();
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
          message.error("İşlem Başarısız.");
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
    setOpen(false);
    onRefresh();
    reset();
    onDrawerClose();
  };

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={tr_TR}>
        <Modal
          width="1200px"
          centered
          title={`Aks Yapılandırma ${selectedRow?.plaka}`}
          open={drawerVisible}
          onCancel={onClose}
          footer={
            null
            /* <Space>
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
            </Space> */
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
              <div style={{ padding: "5px" }}>
                <Tablar selectedRow={selectedRow} onRefresh1={onRefresh1} />
              </div>
            </form>
          )}
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}
