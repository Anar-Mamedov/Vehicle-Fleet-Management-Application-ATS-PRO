import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, ConfigProvider, Modal, message, Spin } from "antd";
import React, { useEffect, useState, useTransition } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import SecondTabs from "./components/SecondTabs/SecondTabs";
import { useForm, Controller, useFormContext, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import { t } from "i18next";

export default function EditModal({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) {
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      hasarNo: undefined,
      hasarTipi: undefined,
      hasarTipiID: undefined,
      hasarliBolge: undefined,
      hasarliBolgeID: undefined,
      hasarBoyutu: undefined,
      hasarBoyutuID: undefined,
      olayYeri: undefined,
      olayYeriID: undefined,
      tarih: null,
      saat: null,
      plaka: undefined,
      plakaID: undefined,
      surucu: undefined,
      surucuID: undefined,
      marka: undefined,
      model: undefined,
      lokasyon: undefined,
      lokasyonID: undefined,
      policeNo: undefined,
      aracKullanilabilir: undefined,
      kazayaKarisanBaskaAracVar: undefined,
      polisRaporuVar: undefined,
      aciklama: undefined,
      ozelAlan1: undefined,
      ozelAlan2: undefined,
      ozelAlan3: undefined,
      ozelAlan4: undefined,
      ozelAlan5: undefined,
      ozelAlan6: undefined,
      ozelAlan7: undefined,
      ozelAlan8: undefined,
      ozelAlan9: undefined,
      ozelAlan9ID: undefined,
      ozelAlan10: undefined,
      ozelAlan10ID: undefined,
      ozelAlan11: undefined,
      ozelAlan12: undefined,
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
          const response = await AxiosInstance.get(`DamageTracking/GetDamageItemById?id=${selectedRow.key}`);
          const item = response.data; // Veri dizisinin ilk elemanını al
          // Form alanlarını set et
          setValue("tbHasarId", item.tbHasarId || undefined);
          setValue("hasarNo", item.hasarNo || undefined);
          setValue("hasarNo1", item.hasarNo || undefined);
          setValue("hasarTipi", item.hasarTipi || undefined);
          setValue("hasarTipiID", item.hasarTipiKodId || undefined);
          setValue("hasarliBolge", item.hasarBolge || undefined);
          setValue("hasarliBolgeID", item.hasarBolgeKodId || undefined);
          setValue("hasarBoyutu", item.hasarBoyut || undefined);
          setValue("hasarBoyutuID", item.hasarBoyutuKodId || undefined);
          setValue("olayYeri", item.olayYeri || undefined);
          setValue("olayYeriID", item.olayYeriKodId || undefined);
          setValue("tarih", item.tarih ? (dayjs(item.tarih).isValid() ? dayjs(item.tarih) : null) : null);
          setValue("saat", item.saat ? (dayjs(item.saat, "HH:mm:ss").isValid() ? dayjs(item.saat, "HH:mm:ss") : null) : null);
          setValue("plaka", item.plaka || undefined);
          setValue("plakaID", item.aracId || undefined);
          setValue("surucu", item.surucuAdi || undefined);
          setValue("surucuID", item.surucuId || undefined);
          setValue("marka", item.marka || undefined);
          setValue("model", item.model || undefined);
          setValue("lokasyon", item.lokasyon || undefined);
          setValue("lokasyonID", item.lokasyonId || undefined);
          setValue("policeNo", item.policeNo || undefined);
          setValue("aracKullanilabilir", item.aracKullanilir || undefined);
          setValue("kazayaKarisanBaskaAracVar", item.kazaYapanBaskaArac || undefined);
          setValue("polisRaporuVar", item.polisRaporuVar || undefined);
          setValue("aciklama", item.olayAniAciklamasi || undefined);

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
      tbHasarId: data.tbHasarId || 0,
      hasarNo: data.hasarNo || "",
      aracId: data.plakaID || 0,
      surucuId: data.surucuID || 0,
      tarih: formatDateWithDayjs(data.tarih) || "",
      saat: formatTimeWithDayjs(data.saat) || "",
      olayYeriKodId: data.olayYeriID || 0,
      olayAniAciklamasi: data.aciklama || "",
      hasarTipiKodId: data.hasarTipiID || 0,
      hasarBolgeKodId: data.hasarliBolgeID || 0,
      hasarBoyutuKodId: data.hasarBoyutuID || 0,
      lokasyonId: data.lokasyonID || 0,
      policeNo: data.policeNo || "",
      aracKullanilir: data.aracKullanilabilir || false,
      kazaYapanBaskaArac: data.kazayaKarisanBaskaAracVar || false,
      polisRaporuVar: data.polisRaporuVar || false,
    };

    // API'ye POST isteği gönder
    AxiosInstance.post("DamageTracking/UpdateDamageTrackItem", Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          const formattedDate = dayjs(response.data.targetDate).isValid() ? dayjs(response.data.targetDate).format("DD-MM-YYYY") : response.data.targetDate;
          if (response.data.targetKm !== undefined && response.data.targetDate !== undefined) {
            message.success(data.Plaka + " Plakalı Aracın " + " (" + data.servisTanimi + ") " + response.data.targetKm + " km ve " + formattedDate + " Tarihine Güncellenmiştir.");
          } else {
            message.success("Güncelleme Başarılı.");
          }
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
          width="1050px"
          centered
          title={t("hasarTakibiGuncelle")}
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
                <SecondTabs selectedRowID={selectedRow?.key} />
              </div>
            </form>
          )}
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}
