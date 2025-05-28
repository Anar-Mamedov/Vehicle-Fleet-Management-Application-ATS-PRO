import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, ConfigProvider, Modal, message, Spin } from "antd";
import React, { useEffect, useState, useTransition } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import secondTabs from "./components/SecondTabs/SecondTabs";
import { useForm, Controller, useFormContext, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import Footer from "../Footer";
import SecondTabs from "./components/SecondTabs/SecondTabs";

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
          setValue("PlakaLabel", item.plaka);
          setValue("duzenlenmeTarihi", item.tarih ? (dayjs(item.tarih).isValid() ? dayjs(item.tarih) : null) : null);
          setValue("duzenlenmeSaati", item.saat ? (dayjs(item.saat, "HH:mm:ss").isValid() ? dayjs(item.saat, "HH:mm:ss") : null) : null);
          setValue("servisKodu", item.servisKodu);
          setValue("servisKoduID", item.bakimId);
          setValue("servisTanimi", item.servisTanimi);
          setValue("servisTipi", item.servisTipi);
          setValue("Surucu", item.surucuIsim ? item.surucuIsim : null);
          setValue("SurucuID", item.surucuId);
          setValue("baslamaTarihi", item.baslamaTarih ? (dayjs(item.baslamaTarih).isValid() ? dayjs(item.baslamaTarih) : null) : null);
          setValue("baslamaSaati", item.baslamaSaat ? (dayjs(item.baslamaSaat, "HH:mm:ss").isValid() ? dayjs(item.baslamaSaat, "HH:mm:ss") : null) : null);
          setValue("bitisTarihi", item.bitisTarih ? (dayjs(item.bitisTarih).isValid() ? dayjs(item.bitisTarih) : null) : null);
          setValue("bitisSaati", item.bitisSaat ? (dayjs(item.bitisSaat, "HH:mm:ss").isValid() ? dayjs(item.bitisSaat, "HH:mm:ss") : null) : null);
          setValue("aracKM", item.km ? item.km : null);
          setValue("islemiYapan", String(item.islemiYapan));
          setValue("islemiYapan1", item.islemiYapanText);
          setValue("islemiYapan1ID", item.islemiYapanId);
          setValue("servisNedeni", item.servisNedeni ? item.servisNedeni : null);
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

          setValue("isPeriyodik", item.isPeriyodik);

          setPeriyodikBakim(item.isPeriyodik ? "[Periyodik Bakım]" : "");

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
          setValue("ozelAlan9", item.ozelAlan9 ? item.ozelAlan9 : null);
          setValue("ozelAlan9ID", item.ozelAlanKodId9);
          setValue("ozelAlan10", item.ozelAlan10 ? item.ozelAlan10 : null);
          setValue("ozelAlan10ID", item.ozelAlanKodId10);
          setValue("ozelAlan11", item.ozelAlan11);
          setValue("ozelAlan12", item.ozelAlan12);
          setValue("isRecordSeen", item.isRecordSeen);
          setValue("kdvOran", item.kdvOran);
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

  // Form verilerinden Body objesini oluşturan yardımcı fonksiyon
  const createRequestBody = (data) => {
    return {
      siraNo: Number(data.secilenKayitID),
      aracId: Number(data.PlakaID),
      bakimId: Number(data.servisKoduID),
      kazaId: Number(data.hasarNoID),
      durumBilgisi: Number(data.durumBilgisi),
      tamamlandi: data.durumBilgisi === "4" ? true : false,
      islemiYapan: data.islemiYapan,
      servisNedeniKodId: Number(data.servisNedeniID),
      islemiYapanId: Number(data.islemiYapan1ID),
      surucuId: Number(data.SurucuID),
      km: Number(data.aracKM),
      indirim: Number(data.eksiUcreti),
      kdv: Number(data.kdvUcreti),
      diger: Number(data.digerUcreti),
      malzeme: Number(data.malzemeUcreti),
      iscilik: Number(data.iscilikUcreti),
      talepNo: data.talepNo,
      onayId: Number(data.onayID),
      tarih: formatDateWithDayjs(data.duzenlenmeTarihi) || null,
      baslamaTarih: formatDateWithDayjs(data.baslamaTarihi) || null,
      bitisTarih: formatDateWithDayjs(data.bitisTarihi) || null,
      faturaTarih: formatDateWithDayjs(data.faturaTarihi) || null,
      saat: formatTimeWithDayjs(data.duzenlenmeSaati) || null,
      baslamaSaat: formatTimeWithDayjs(data.baslamaSaati) || null,
      bitisSaat: formatTimeWithDayjs(data.bitisSaati) || null,
      faturaNo: data.faturaNo,
      aciklama: data.aciklama,
      sikayetler: data.sikayetler,
      sigortaVar: data.sigortaBilgileri,
      surucuOder: data.surucuOder,
      garantili: data.garantiKapsami,
      sigortaId: Number(data.sigortaID),
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
      isRecordSeen: false,
    };
  };

  const onSubmit = (data) => {
    // Body objesini ortak fonksiyondan al
    const Body = createRequestBody(data);

    // API'ye POST isteği gönder
    AxiosInstance.post("VehicleServices/UpdateServiceItem", Body)
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

  // Sadece isRecordSeen güncellemesi için ayrı bir fonksiyon
  const onSubmitRecordSeen = (data) => {
    // Body objesini ortak fonksiyondan al
    const Body = createRequestBody(data);

    // API'ye POST isteği gönder
    AxiosInstance.post("VehicleServices/UpdateServiceItem", Body)
      .then((response) => {
        console.log("Record seen status updated successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          setValue("isRecordSeen", false);
          // Modal kapatılmadan hafif bir bildirim
          // message.success({ content: "Kayıt görüldü olarak işaretlendi", duration: 2 });
          onRefresh();
        } else {
          console.error("Failed to update record seen status");
        }
      })
      .catch((error) => {
        console.error("Error updating record seen status:", error);
      });
  };

  useEffect(() => {
    if (watch("isRecordSeen") == true) {
      // methods.handleSubmit(onSubmit)(); - eski kod
      methods.handleSubmit(onSubmitRecordSeen)(); // Yeni kod - özel submit fonksiyonu
    }
  }, [watch("isRecordSeen")]);

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
        <Modal
          width="1400px"
          centered
          title={`Servis Güncelleme ${periyodikBakim}`}
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
