import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, message, Spin } from "antd";
import AxiosInstance from "../../../../../../../../../../api/http";
import { Controller, useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import MainTabs from "./MainTabs/MainTabs";

export default function EditModal({ selectedRow, isModalVisible, onModalClose, onRefresh, secilenUstKayitID }) {
  const [loading, setLoading] = useState(false);
  const [isApiUpdate, setIsApiUpdate] = useState(false); // API'den gelen güncellemeleri izlemek için

  const methods = useForm({
    defaultValues: {
      plaka: null,
      aracID: "",
      aciklama: "",
      yapilanIs: "",
      yapilanIsID: "",
      personel: "",
      personelID: "",
      kdvOrani: 0,
      kdvDegeri: 0,
      iscilikUcreti: 0,
      indirimYuzde: 0,
      indirimOrani: 0,
      toplam: 0,
      saat: "",
      dakika: "",
      isTipi: null,
      isTipiID: "",
      // Add other default values here
    },
  });

  const { setValue, reset, handleSubmit } = methods;

  // API'den gelen verileri form alanlarına set etme
  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (isModalVisible && selectedRow) {
        setLoading(true);
        try {
          const response = await AxiosInstance.get(`ServiceWorkCard/GetServiceWorkCardById?id=${selectedRow.key}`);
          const item = response.data;

          setIsApiUpdate(true); // API güncellemeleri başlamadan önce flag'i true yap

          // API'den gelen verileri set ederken
          setValue("plaka", item.plaka);
          setValue("aracID", item.aracId);
          setValue("aciklama", item.aciklama);
          setValue("yapilanIs", item.isTanim);
          setValue("yapilanIsID", item.isTanimId);
          setValue("personel", item.personelIsim);
          setValue("personelID", item.personelId);
          setValue("iscilikUcreti", item.iscilikUcreti);
          setValue("kdvOrani", item.kdvOran);
          setValue("kdvDegeri", item.kdvTutar);
          setValue("indirimOrani", item.indirim);
          setValue("indirimYuzde", item.indirimOran);
          setValue("toplam", item.toplam);

          setValue("saat", item.sureSaat);
          setValue("dakika", item.sureDakika);
          setValue("isTipi", item.isTip ? item.isTip : null);
          setValue("isTipiID", item.isTipKodId);

          // Diğer setValue çağrıları burada yapılır

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
      siraNo: Number(selectedRow.key),
      aracId: Number(data.aracID),
      isTanimId: Number(data.yapilanIsID),
      isTipKodId: Number(data.isTipiID),
      indirimOran: Number(data.indirimYuzde),
      indirim: Number(data.indirimOrani),
      kdvOran: Number(data.kdvOrani),
      kdvTutar: Number(data.kdvDegeri),
      iscilikUcreti: Number(data.iscilikUcreti),
      toplam: Number(data.toplam),
      servisSiraNo: Number(secilenUstKayitID),
      aciklama: data.aciklama,
      sureSaat: Number(data.saat),
      sureDakika: Number(data.dakika),
      personelId: Number(data.personelID),
    };

    AxiosInstance.post(`ServiceWorkCard/UpdateServiceWorkCard`, Body)
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
