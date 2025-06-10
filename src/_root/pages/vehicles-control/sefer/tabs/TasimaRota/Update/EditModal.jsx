import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, message, Spin } from "antd";
import AxiosInstance from "../../../../../../../api/http";
import { Controller, useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import MainTabs from "./MainTabs/MainTabs";

export default function EditModal({ selectedRow, isModalVisible, onModalClose, onRefresh, secilenUstKayitID, selectedRow1 }) {
  const [loading, setLoading] = useState(false);
  const [isApiUpdate, setIsApiUpdate] = useState(false); // API'den gelen güncellemeleri izlemek için

  const methods = useForm({
    defaultValues: {
      plaka: selectedRow1.plaka,
      surucu: selectedRow1.surucuIsim1,
      seferNo: selectedRow1.seferNo,
      seferAdedi: selectedRow1.seferAdedi,
      firmaKodu: selectedRow1.firmaKodu,
      firmaID: null,
      firmaTanim: null,
      telefon: null,
      ilgili: null,
      faturaNo: null,
      irsaliyeNo: null,
      faturaTarih: null,
      faturaSaat: null,
      ucret: null,
      tasimaCinsi: null,
      tasimaCinsiID: null,
      tasimaMiktari: null,
      tasimaBirimi: null,
      tasimaBirimiID: null,
      cikisSehri: null,
      cikisSehriID: null,
      tasimaTuru: null,
      yuklemeKodu: null,
      yuklemeKoduID: null,
      varisSehri: null,
      varisSehriID: null,
      cikisYeri: null,
      cikisYeriID: null,
      cikisKm: null,
      varisYeri: null,
      varisYeriID: null,
      varisKm: null,
      mesafe: null,
      cikisTarih: null,
      cikisSaat: null,
      varisTarih: null,
      varisSaat: null,
      sureSaat: null,
      sureDk: null,
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
      ozelAlanID9: null,
      ozelAlan10: null,
      ozelAlanID10: null,
      ozelAlan11: null,
      ozelAlan12: null,
      odemeYapildi: false,
      // Add other default values here
    },
  });

  const { setValue, reset, handleSubmit } = methods;

  useEffect(() => {
    if (selectedRow1) {
      setValue("plaka", selectedRow1.plaka);
      setValue("surucu", selectedRow1.surucuIsim1);
      setValue("seferNo", selectedRow1.seferNo);
      setValue("seferAdedi", selectedRow1.seferAdedi);
    }
  }, [selectedRow1]);

  // API'den gelen verileri form alanlarına set etme
  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (isModalVisible && selectedRow) {
        setLoading(true);
        try {
          const response = await AxiosInstance.get(`ExpeditionOpr/GetExpeditionOperationItemById?id=${selectedRow.key}`);
          const item = response.data;

          setIsApiUpdate(true); // API güncellemeleri başlamadan önce flag'i true yap

          // API'den gelen verileri set ederken
          setValue("firmaID", item.firmaId);
          setValue("firmaTanim", item.firmaTanim);
          setValue("telefon", item.telefon);
          setValue("ilgili", item.ilgili);
          setValue("faturaNo", item.faturaNo);
          setValue("irsaliyeNo", item.faturaIrsaliye);
          setValue("faturaTarih", item.faturaTarih ? dayjs(item.faturaTarih) : null);
          setValue("faturaSaat", item.faturaSaat ? dayjs(item.faturaSaat, "HH:mm") : null);
          setValue("ucret", item.ucret);
          setValue("tasimaCinsi", item.tasimaCinsi);
          setValue("tasimaCinsiID", item.tasimaCinsiKodId);
          setValue("tasimaMiktari", item.yuklemeMiktari);
          setValue("tasimaBirimi", item.tasimaBirimi);
          setValue("tasimaBirimiID", item.yukelemeBirimKodId);
          setValue("cikisSehri", item.cikisSehri);
          setValue("cikisSehriID", item.cikisSehirId);
          setValue("tasimaTuru", item.tasimaTuru);
          setValue("tasimaTuruID", item.tasimaTuruKodId);
          setValue("yuklemeKodu", item.yuklemeKodu);
          setValue("yuklemeKoduID", item.yuklemeId);
          setValue("varisSehri", item.varisSehri);
          setValue("varisSehriID", item.varisSehirId);
          setValue("cikisYeri", item.cikisYeri);
          setValue("cikisYeriID", item.cikisSehirYerId);
          setValue("cikisKm", item.cikisKm);
          setValue("varisYeri", item.varisYeri);
          setValue("varisYeriID", item.varisSehirYerId);
          setValue("varisKm", item.varisKm);
          setValue("mesafe", item.mesafe);
          setValue("cikisTarih", item.cikisTarih ? dayjs(item.cikisTarih) : null);
          setValue("cikisSaat", item.cikisSaat ? dayjs(item.cikisSaat, "HH:mm") : null);
          setValue("varisTarih", item.varisTarih ? dayjs(item.varisTarih) : null);
          setValue("varisSaat", item.varisSaat ? dayjs(item.varisSaat, "HH:mm") : null);
          setValue("sureSaat", item.sureSaat);
          setValue("sureDk", item.sureDakika);
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
          setValue("ozelAlanID9", item.ozelAlanKodId9);
          setValue("ozelAlan10", item.ozelAlan10);
          setValue("ozelAlanID10", item.ozelAlanKodId10);
          setValue("ozelAlan11", item.ozelAlan11);
          setValue("ozelAlan12", item.ozelAlan12);
          setValue("odemeYapildi", item.odemeYapildi);

          setIsApiUpdate(false); // API güncellemeleri bittiğinde flag'i false yap
          setLoading(false);
        } catch (error) {
          console.error("Veri çekilirken hata oluştu:", error);
          setLoading(false);
        }
      }
    };

    handleDataFetchAndUpdate();
  }, [isModalVisible, selectedRow, setValue, onRefresh, methods.reset, AxiosInstance]);

  useEffect(() => {
    if (!isModalVisible) {
      reset();
    }
  }, [isModalVisible, reset]);

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  // Aşğaıdaki form elemanlarını eklemek üçün API ye gönderilme işlemi

  const onSubmited = (data) => {
    const Body = {
      seferOprId: Number(selectedRow.key),
      // expeditionOperation: selectedRow1.key,
      // seferSiraNo: Number(selectedRow1.key),
      firmaId: Number(data.firmaID),
      faturaNo: String(data.faturaNo || ""),
      faturaIrsaliye: String(data.irsaliyeNo || ""),
      faturaTarih: data.faturaTarih ? formatDateWithDayjs(data.faturaTarih) : null,
      faturaSaat: data.faturaSaat ? formatTimeWithDayjs(data.faturaSaat) : null,
      ucret: Number(data.ucret || 0),
      yuklemeMiktari: Number(data.tasimaMiktari || 0),
      mesafe: Number(data.mesafe || 0),
      odemeYapildi: Boolean(data.odemeYapildi),
      yukelemeBirimKodId: Number(data.tasimaBirimiID || 0),
      tasimaCinsiKodId: Number(data.tasimaCinsiID || 0),
      varisSehirId: Number(data.varisSehriID || 0),
      cikisSehirId: Number(data.cikisSehriID || 0),
      tasimaTuruKodId: Number(data.tasimaTuruID || 0),
      yuklemeId: Number(data.yuklemeKoduID || 0),
      varisSehirYerId: Number(data.varisYeriID || 0),
      cikisSehirYerId: Number(data.cikisYeriID || 0),
      varisTarih: data.varisTarih ? formatDateWithDayjs(data.varisTarih) : null,
      varisSaat: data.varisSaat ? formatTimeWithDayjs(data.varisSaat) : null,
      cikisTarih: data.cikisTarih ? formatDateWithDayjs(data.cikisTarih) : null,
      cikisSaat: data.cikisSaat ? formatTimeWithDayjs(data.cikisSaat) : null,
      sureSaat: Number(data.sureSaat || 0),
      sureDakika: Number(data.sureDk || 0),
      aciklama: String(data.aciklama || ""),
      ozelAlan1: String(data.ozelAlan1 || ""),
      ozelAlan2: String(data.ozelAlan2 || ""),
      ozelAlan3: String(data.ozelAlan3 || ""),
      ozelAlan4: String(data.ozelAlan4 || ""),
      ozelAlan5: String(data.ozelAlan5 || ""),
      ozelAlan6: String(data.ozelAlan6 || ""),
      ozelAlan7: String(data.ozelAlan7 || ""),
      ozelAlan8: String(data.ozelAlan8 || ""),
      ozelAlanKodId9: Number(data.ozelAlanID9 || 0),
      ozelAlanKodId10: Number(data.ozelAlanID10 || 0),
      ozelAlan11: Number(data.ozelAlan11 || 0),
      ozelAlan12: Number(data.ozelAlan12 || 0),
      varisKm: Number(data.varisKm || 0),
      cikisKm: Number(data.cikisKm || 0),
    };

    AxiosInstance.post(`ExpeditionOpr/UpdateExpeditionOperationItem `, Body)
      .then((response) => {
        console.log("Data sent successfully:", response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          message.success("Ekleme Başarılı.");
          reset();
          onModalClose(); // Modal'ı kapat
          onRefresh(); // Tabloyu yenile
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

  // Aşğaıdaki form elemanlarını eklemek üçün API ye gönderilme işlemi sonu

  return (
    <FormProvider {...methods}>
      <div>
        <Modal width="990px" title="İşçilik Güncelle" open={isModalVisible} onOk={methods.handleSubmit(onSubmited)} onCancel={onModalClose}>
          {loading ? (
            <Spin
              spinning={loading}
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              {/* İçerik yüklenirken gösterilecek alan */}
            </Spin>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmited)}>
              <MainTabs isApiUpdate={isApiUpdate} />
            </form>
          )}
        </Modal>
      </div>
    </FormProvider>
  );
}
