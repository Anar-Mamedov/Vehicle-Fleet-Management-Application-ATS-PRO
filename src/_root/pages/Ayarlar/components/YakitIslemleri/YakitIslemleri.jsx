import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Spin, Button, message } from "antd";
import AxiosInstance from "../../../../../api/http";
import Forms from "./components/Forms";
import dayjs from "dayjs";
import { t } from "i18next";

function YakitIslemleri() {
  const [loading, setLoading] = useState(true);

  const methods = useForm({
    defaultValues: {
      // kilometreKontrolZorunlu: false,
      gidilenMesafeKontrolu: false,
      gidilenMesafeMin: null,
      gidilenMesafeMax: null,
      gidilenMesafeIslem: null,
    },
  });

  const { setValue, reset, watch } = methods;

  // API'den gelen verileri form alanlarına set etme
  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`CommonSettings/GetSettingByType?type=4`);
      const item = response.data;
      if (item) {
        // setValue("kilometreKontrolZorunlu", item.yakitKilometreKontrol);
        setValue("gidilenMesafeKontrolu", item.yakitGidilenMesafeKontrol);
        setValue("gidilenMesafeMin", item.yakitGidilenMesafeMin);
        setValue("gidilenMesafeMax", item.yakitGidilenMesafeMax);
        setValue("gidilenMesafeIslem", item.yakitGidilenMesafeIslem);
        setValue("yakitMiktarKontrol", item.yakitMiktarKontrol);
        setValue("yakitMiktarMin", item.yakitMiktarMin);
        setValue("yakitMiktarMax", item.yakitMiktarMax);
        setValue("yakitMiktarIslem", item.yakitMiktarIslem);
        setValue("yakitTutarKontrol", item.yakitTutarKontrol);
        setValue("yakitTutarMin", item.yakitTutarMin);
        setValue("yakitTutarMax", item.yakitTutarMax);
        setValue("yakitTutarIslem", item.yakitTutarIslem);
        setValue("yakitTankKapasiteUyar", item.yakitTankKapasiteUyar);
        setValue("yakitMaxTuketimFazlaIslem", item.yakitMaxTuketimFazlaIslem);
        setValue("yakitMinTuketimDusukIslem", item.yakitMinTuketimDusukIslem);
        setValue("yakitTankKapasiteAsimIslem", item.yakitTankKapasiteAsimIslem);
        setValue("yakitMiktarFormat", item.yakitMiktarFormat === 0 ? null : item.yakitMiktarFormat);
        setValue("yakitTutarFormat", item.yakitTutarFormat === 0 ? null : item.yakitTutarFormat);
        setValue("yakitOrtalamaFormat", item.yakitOrtalamaFormat === 0 ? null : item.yakitOrtalamaFormat);
      }
    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
      setLoading(false); // Hata oluştuğunda
    } finally {
      setLoading(false); // Her durumda
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const onSubmit = async (data) => {
    // Form verilerini API'nin beklediği formata dönüştür
    const Body = {
      siraNo: 1,
      // yakitKilometreKontrol: data.kilometreKontrolZorunlu,
      yakitGidilenMesafeKontrol: data.gidilenMesafeKontrolu,
      yakitGidilenMesafeMin: data.gidilenMesafeMin,
      yakitGidilenMesafeMax: data.gidilenMesafeMax,
      yakitGidilenMesafeIslem: data.gidilenMesafeIslem,
      yakitMiktarKontrol: data.yakitMiktarKontrol,
      yakitMiktarMin: data.yakitMiktarMin,
      yakitMiktarMax: data.yakitMiktarMax,
      yakitMiktarIslem: data.yakitMiktarIslem,
      yakitTutarKontrol: data.yakitTutarKontrol,
      yakitTutarMin: data.yakitTutarMin,
      yakitTutarMax: data.yakitTutarMax,
      yakitTutarIslem: data.yakitTutarIslem,
      yakitTankKapasiteUyar: data.yakitTankKapasiteUyar,
      yakitMaxTuketimFazlaIslem: data.yakitMaxTuketimFazlaIslem,
      yakitMinTuketimDusukIslem: data.yakitMinTuketimDusukIslem,
      yakitTankKapasiteAsimIslem: data.yakitTankKapasiteAsimIslem,
      yakitMiktarFormat: Number(data.yakitMiktarFormat),
      yakitTutarFormat: Number(data.yakitTutarFormat),
      yakitOrtalamaFormat: Number(data.yakitOrtalamaFormat),
    };

    setLoading(true);

    // API'ye POST isteği gönder
    try {
      const response = await AxiosInstance.post("CommonSettings/UpdateSettingByType?type=4", Body);
      console.log("Data sent successfully:", response);

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success("Güncelleme Başarılı.");
        /* setOpen(false);
           onRefresh(); 
           onDrawerClose();
        */
        methods.reset();
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else {
        message.error("Ekleme Başarısız.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      if (navigator.onLine) {
        // İnternet bağlantısı var
        message.error("Hata Mesajı: " + error.message);
      } else {
        // İnternet bağlantısı yok
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
    } finally {
      setLoading(false);
      fetchData();
    }
    console.log({ Body });
  };
  return (
    <FormProvider {...methods}>
      <div style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", paddingBottom: "10px" }}>
              <Forms />
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#2bc770",
                  borderColor: "#2bc770",
                  color: "#ffffff",
                }}
              >
                {t("guncelle")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </FormProvider>
  );
}

export default YakitIslemleri;
