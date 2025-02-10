import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, ConfigProvider, Modal, message, Spin } from "antd";
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
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      secilenKayitID: "",
      PlakaID: "",
      Plaka: null,
      duzenlenmeTarihi: null,
      duzenlenmeSaati: null,
      servisKodu: "",
      servisKoduID: "",
      servisTanimi: "",
      servisTipi: "",
      Surucu: null,
      SurucuID: "",
      servisNedeni: null,
      servisNedeniID: "",
      faturaTarihi: null,
      faturaNo: "",
      hasarNo: "",
      hasarNoID: "",
      talepNo: "",
      onay: null,
      onayID: "",
      onayLabel: "",
      baslamaTarihi: null,
      baslamaSaati: null,
      bitisTarihi: null,
      bitisSaati: null,
      aracKM: "",
      islemiYapan: "1",
      islemiYapan1: "",
      islemiYapan1ID: "",
      iscilikUcreti: "",
      malzemeUcreti: "",
      digerUcreti: "",
      kdvUcreti: "",
      eksiUcreti: "",
      sigortaBilgileri: false,
      sigorta: "",
      sigortaID: "",
      policeNo: "",
      firma: "",

      ozelAlan1: "",
      ozelAlan2: "",
      ozelAlan3: "",
      ozelAlan4: "",
      ozelAlan5: "",
      ozelAlan6: "",
      ozelAlan7: "",
      ozelAlan8: "",
      ozelAlan9: null,
      ozelAlan9ID: "",
      ozelAlan10: null,
      ozelAlan10ID: "",
      ozelAlan11: "",
      ozelAlan12: "",

      durumBilgisi: "",
      garantiKapsami: false,

      surucuOder: false,

      aciklama: "",
      sikayetler: "",
    },
  });

  const { setValue, reset, watch } = methods;

  const refreshTable = watch("refreshTable");

  // API'den gelen verileri form alanlarına set etme
  useEffect(() => {
    const fetchUcretCalculation = async () => {
      if ((drawerVisible && selectedRow) || refreshTable === true) {
        try {
          const response = await AxiosInstance.get(`VehicleServices/GetServiceCardCost?serviceId=${selectedRow.key}`);
          const item = response.data;
          if (item) {
            setValue("iscilikUcreti", item.iscilik);
            setValue("malzemeUcreti", item.malzeme);
            setValue("kdvUcreti", item.kdv);
            setValue("eksiUcreti", item.indirim);
          }
          setValue("refreshTable", false);
        } catch (error) {
          console.error("Veri çekilirken hata oluştu:", error);
          setLoading(false); // Hata oluştuğunda
        }
      }
    };

    fetchUcretCalculation();
  }, [drawerVisible, selectedRow, setValue, onRefresh, methods.reset, AxiosInstance, refreshTable]);

  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (drawerVisible && selectedRow) {
        setOpen(true); // İşlemler tamamlandıktan sonra drawer'ı aç
        setLoading(true); // Yükleme başladığında
        try {
          const response = await AxiosInstance.get(`VehicleServices/GetVehicleServiceById?id=${selectedRow.key}`);
          const item = response.data; // Veri dizisinin ilk elemanını al
          // Form alanlarını set et
          setValue("secilenKayitID", item.siraNo);
          setValue("PlakaID", item.aracId);
          setValue("Plaka", item.plaka);
          setValue("duzenlenmeTarihi", item.tarih ? (dayjs(item.tarih).isValid() ? dayjs(item.tarih) : null) : null);
          setValue("duzenlenmeSaati", item.saat ? (dayjs(item.saat, "HH:mm:ss").isValid() ? dayjs(item.saat, "HH:mm:ss") : null) : null);
          setValue("servisKodu", item.servisKodu);
          setValue("servisKoduID", item.bakimId);
          setValue("servisTanimi", item.servisTanimi);
          setValue("servisTipi", item.servisTipi);
          setValue("Surucu", item.surucuIsim);
          setValue("SurucuID", item.surucuId);
          setValue("baslamaTarihi", item.baslamaTarih ? (dayjs(item.baslamaTarih).isValid() ? dayjs(item.baslamaTarih) : null) : null);
          setValue("baslamaSaati", item.baslamaSaat ? (dayjs(item.baslamaSaat, "HH:mm:ss").isValid() ? dayjs(item.baslamaSaat, "HH:mm:ss") : null) : null);
          setValue("bitisTarihi", item.bitisTarih ? (dayjs(item.bitisTarih).isValid() ? dayjs(item.bitisTarih) : null) : null);
          setValue("bitisSaati", item.bitisSaat ? (dayjs(item.bitisSaat, "HH:mm:ss").isValid() ? dayjs(item.bitisSaat, "HH:mm:ss") : null) : null);
          setValue("aracKM", item.km);
          setValue("islemiYapan", String(item.islemiYapan));
          setValue("islemiYapan1", item.islemiYapanText);
          setValue("islemiYapan1ID", item.islemiYapanId);
          setValue("servisNedeni", item.servisNedeni);
          setValue("servisNedeniID", item.servisNedeniKodId);
          setValue("faturaTarihi", item.faturaTarih ? (dayjs(item.faturaTarih).isValid() ? dayjs(item.faturaTarih) : null) : null);
          setValue("faturaNo", item.faturaNo);
          setValue("hasarNo", item.hasarNo);
          setValue("hasarNoID", item.kazaId);
          setValue("talepNo", item.talepNo);
          setValue("onayID", item.onayId);
          setValue("durumBilgisi", String(item.durumBilgisi));
          setValue("garantiKapsami", item.garantili);
          setValue("surucuOder", item.surucuOder);
          // setValue("iscilikUcreti", item.iscilik);
          // setValue("malzemeUcreti", item.malzeme);
          setValue("digerUcreti", item.diger);
          // setValue("kdvUcreti", item.kdv);
          // setValue("eksiUcreti", item.indirim);

          setValue("sigortaBilgileri", item.sigortaVar);
          setValue("sigorta", item.sigortaPolice);
          setValue("sigortaID", item.sigortaId);
          setValue("policeNo", item.policeNo);
          setValue("firma", item.sigortaFirmaUnvan);
          setValue("aciklama", item.aciklama);
          setValue("sikayetler", item.sikayetler);

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
      siraNo: data.secilenKayitID,
      aracId: data.PlakaID,
      bakimId: data.servisKoduID,
      kazaId: data.hasarNoID,
      durumBilgisi: data.durumBilgisi,
      islemiYapan: data.islemiYapan,
      servisNedeniKodId: data.servisNedeniID,

      islemiYapanId: data.islemiYapan1ID,
      surucuId: data.SurucuID,
      km: data.aracKM,
      indirim: data.eksiUcreti,
      kdv: data.kdvUcreti,
      diger: data.digerUcreti,
      malzeme: data.malzemeUcreti,
      iscilik: data.iscilikUcreti,
      talepNo: data.talepNo,
      onayId: data.onayID,
      tarih: formatDateWithDayjs(data.duzenlenmeTarihi),
      baslamaTarih: formatDateWithDayjs(data.baslamaTarihi),
      bitisTarih: formatDateWithDayjs(data.bitisTarihi),
      faturaTarih: formatDateWithDayjs(data.faturaTarihi),
      saat: formatTimeWithDayjs(data.duzenlenmeSaati),
      baslamaSaat: formatTimeWithDayjs(data.baslamaSaati),
      bitisSaat: formatTimeWithDayjs(data.bitisSaati),
      faturaNo: data.faturaNo,
      aciklama: data.aciklama,
      sikayetler: data.sikayetler,
      sigortaVar: data.sigortaBilgileri,
      surucuOder: data.surucuOder,
      garantili: data.garantiKapsami,
      sigortaId: data.sigortaID,
      ozelAlan1: data.ozelAlan1,
      ozelAlan2: data.ozelAlan2,
      ozelAlan3: data.ozelAlan3,
      ozelAlan4: data.ozelAlan4,
      ozelAlan5: data.ozelAlan5,
      ozelAlan6: data.ozelAlan6,
      ozelAlan7: data.ozelAlan7,
      ozelAlan8: data.ozelAlan8,
      ozelAlanKodId9: data.ozelAlan9ID,
      ozelAlanKodId10: data.ozelAlan10ID,
      ozelAlan11: data.ozelAlan11,
      ozelAlan12: data.ozelAlan12,
    };

    // API'ye POST isteği gönder
    AxiosInstance.post("VehicleServices/UpdateServiceItem", Body)
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
          width="1300px"
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
              <div style={{ overflow: "auto", height: "calc(100vh - 150px)" }}>
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
