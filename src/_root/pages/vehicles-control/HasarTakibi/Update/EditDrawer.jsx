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
      fisNo: null,
      firma: null,
      firmaID: null,
      plaka: null,
      plakaID: null,
      tarih: null,
      saat: null,
      islemTipi: null,
      islemTipiID: null,
      girisDeposu: null,
      girisDeposuID: null,
      lokasyon: null,
      lokasyonID: null,
      totalAraToplam: null,
      totalIndirim: null,
      totalKdvToplam: null,
      totalGenelToplam: null,
      aciklama: null,
      ozelAlan1: null,
      ozelAlan2: null,
      ozelAlan3: null,
      ozelAlan4: null,
      ozelAlan5: null,
      ozelAlan6: null,
      ozelAlan7: null,
      ozelAlan8: null,
      ozelAlan9: null,
      ozelAlan9ID: null,
      ozelAlan10: null,
      ozelAlan10ID: null,
      ozelAlan11: null,
      ozelAlan12: null,
      fisIcerigi: [],
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
          const response = await AxiosInstance.get(`MaterialReceipt/GetMaterialReceiptById?receiptId=${selectedRow.key}`);
          const item = response.data; // Veri dizisinin ilk elemanını al
          // Form alanlarını set et
          setValue("mlzFisId", item.mlzFisId);
          setValue("fisNo", item.fisNo);
          setValue("firma", item.firmaTanim);
          setValue("firmaID", item.firmaId);
          setValue("plaka", item.plaka);
          setValue("plakaID", item.aracId);
          setValue("tarih", item.tarih ? (dayjs(item.tarih).isValid() ? dayjs(item.tarih) : null) : null);
          setValue("saat", item.saat ? (dayjs(item.saat, "HH:mm:ss").isValid() ? dayjs(item.saat, "HH:mm:ss") : null) : null);
          setValue("islemTipi", item.islemTipi);
          setValue("islemTipiID", item.islemTipiKodId);
          setValue("girisDeposu", item.girisDepo);
          setValue("girisDeposuID", item.girisDepoSiraNo);
          setValue("lokasyon", item.lokasyon);
          setValue("lokasyonID", item.lokasyonId);
          setTimeout(() => setValue("totalAraToplam", item.araToplam), 200);
          setTimeout(() => setValue("totalIndirim", item.indirimliToplam), 200);
          setTimeout(() => setValue("totalKdvToplam", item.kdvToplam), 200);
          setTimeout(() => setValue("totalGenelToplam", item.genelToplam), 200);
          setValue("aciklama", item.aciklama);
          setValue("ozelAlan1", item.ozelAlan1);
          setValue("ozelAlan2", item.ozelAlan2);
          setValue("ozelAlan3", item.ozelAlan3);
          setValue("ozelAlan4", item.ozelAlan4);
          setValue("ozelAlan5", item.ozelAlan5);
          setValue("ozelAlan6", item.ozelAlan6);
          setValue("ozelAlan7", item.ozelAlan7);
          setValue("ozelAlan8", item.ozelAlan8);
          setValue("ozelAlan9", item.ozelAlan9);
          setValue("ozelAlan9ID", item.ozelAlanKodId9);
          setValue("ozelAlan10", item.ozelAlan10);
          setValue("ozelAlan10ID", item.ozelAlanKodId10);
          setValue("ozelAlan11", item.ozelAlan11);
          setValue("ozelAlan12", item.ozelAlan12);
          setValue(
            "fisIcerigi",
            item.materialMovements?.map((movement) => ({
              key: movement.siraNo,
              siraNo: movement.siraNo,
              malzemeId: movement.malzemeId,
              malzemeKodu: movement.malezemeKod,
              malzemeTanimi: movement.malezemeTanim,
              malzemeTipi: movement.malzemeTip,
              birimKodId: movement.birimKodId,
              birim: movement.birim,
              miktar: movement.miktar,
              fiyat: movement.fiyat,
              araToplam: movement.araToplam,
              indirimOrani: movement.indirimOran,
              indirimTutari: movement.indirim,
              kdvOrani: movement.kdvOran,
              kdvDahilHaric: movement.kdvDahilHaric,
              kdvTutar: movement.kdvTutar,
              toplam: movement.toplam,
              malzemePlakaId: movement.mlzAracId,
              malzemePlaka: movement.plaka,
              malzemeLokasyonID: movement.lokasyonId,
              malzemeLokasyon: movement.lokasyon,
              aciklama: movement.aciklama,
              isPriceChanged: movement.isPriceChanged || false,
            })) || []
          );

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
      mlzFisId: data.mlzFisId,
      fisNo: data.fisNo,
      // firma: data.firma,
      firmaId: Number(data.firmaID),
      // plaka: data.plaka,
      aracId: Number(data.plakaID),
      tarih: formatDateWithDayjs(data.tarih),
      saat: formatTimeWithDayjs(data.saat),
      // islemTipi: data.islemTipi,
      islemTipiKodId: Number(data.islemTipiID),
      // girisDeposu: data.girisDeposu,
      girisDepoSiraNo: Number(data.girisDeposuID),
      // lokasyon: data.lokasyon,
      lokasyonId: Number(data.lokasyonID),
      araToplam: Number(data.totalAraToplam),
      indirimliToplam: Number(data.totalIndirim),
      kdvToplam: Number(data.totalKdvToplam),
      genelToplam: Number(data.totalGenelToplam),
      aciklama: data.aciklama,
      ozelAlan1: data.ozelAlan1,
      ozelAlan2: data.ozelAlan2,
      ozelAlan3: data.ozelAlan3,
      ozelAlan4: data.ozelAlan4,
      ozelAlan5: data.ozelAlan5,
      ozelAlan6: data.ozelAlan6,
      ozelAlan7: data.ozelAlan7,
      ozelAlan8: data.ozelAlan8,
      ozelAlanKodId9: Number(data.ozelAlan9ID),
      ozelAlanKodId10: Number(data.ozelAlan10ID),
      ozelAlan11: Number(data.ozelAlan11),
      ozelAlan12: Number(data.ozelAlan12),
      gc: 1,
      fisTip: "MALZEME",
      materialMovements:
        data.fisIcerigi?.map((item) => ({
          siraNo: item.key ? Number(item.key) : 0,
          tarih: formatDateWithDayjs(data.tarih),
          firmaId: Number(data.firmaID),
          girisDepoSiraNo: Number(data.girisDeposuID),
          isPriceChanged: item.isPriceChanged || false,
          isDeleted: item.isDeleted || false,
          // malzemeKodu: item.malzemeKodu,
          // malzemeTanimi: item.malzemeTanimi,
          // malzemeTipi: item.malzemeTipi,
          malzemeId: Number(item.malzemeId),
          // birim: item.birim,
          birimKodId: Number(item.birimKodId),
          miktar: Number(item.miktar),
          fiyat: Number(item.fiyat),
          araToplam: Number(item.araToplam),
          indirimOran: Number(item.indirimOrani),
          indirim: Number(item.indirimTutari),
          kdvOran: Number(item.kdvOrani),
          kdvDahilHaric: item.kdvDahilHaric,
          kdvTutar: Number(item.kdvTutar),
          toplam: Number(item.toplam),
          // plaka: item.malzemePlaka,
          mlzAracId: Number(item.malzemePlakaId),
          // lokasyon: item.malzemeLokasyon,
          lokasyonId: Number(item.malzemeLokasyonID),
          aciklama: item.aciklama,
          gc: 1,
          fisTip: "MALZEME",
        })) || [],
    };

    // API'ye POST isteği gönder
    AxiosInstance.post("MaterialReceipt/UpdateMaterialReceipt", Body)
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
          width="1300px"
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
