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
      aracID: "",
      aciklama: "",
      stokluMalzeme: true,
      malzemeKodu: "",
      malzemeKoduID: "",
      malzemeTanimi: "",
      miktar: 1,
      iscilikUcreti: 0,
      kdvOrani: 20,
      kdvDegeri: 0,
      indirimOrani: 0,
      indirimYuzde: 0,
      toplam: 0,
      isTipi: null,
      isTipiID: "",
      depo: null,
      depoID: "",
      birim: null,
      birimID: "", // Add other default values here
    },
  });

  const { setValue, reset, handleSubmit } = methods;

  // API'den gelen verileri form alanlarına set etme
  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (isModalVisible && selectedRow) {
        setLoading(true);
        try {
          const response = await AxiosInstance.get(`MaterialMovements/GetMaterialMovementsById?id=${selectedRow.key}`);
          const item = response.data;

          setIsApiUpdate(true); // API güncellemeleri başlamadan önce flag'i true yap

          // API'den gelen verileri set ederken
          setValue("aracID", item.mlzAracId);
          setValue("aciklama", item.aciklama);
          setValue("stokluMalzeme", item.stoklu);
          setValue("malzemeKodu", item.malezemeKod);
          setValue("malzemeKoduID", item.malzemeId);
          setValue("malzemeTanimi", item.malezemeTanim);
          setValue("miktar", item.miktar);
          setValue("iscilikUcreti", item.fiyat);
          setValue("kdvOrani", item.kdvOran);
          setValue("kdvDegeri", item.kdvTutar);
          setValue("indirimOrani", item.indirim);
          setValue("indirimYuzde", item.indirimOran);
          setValue("toplam", item.toplam);
          setValue("isTipi", item.malzemeTip ? item.malzemeTip : null);
          setValue("isTipiID", item.malzemeTipKodId);
          setValue("depo", item.cikisDepo ? item.cikisDepo : null);
          setValue("depoID", item.cikisDepoSiraNo);
          setValue("birim", item.birim ? item.birim : null);
          setValue("birimID", item.birimKodId);

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
      servisSiraNo: Number(secilenUstKayitID),
      mlzAracId: Number(data.aracID),
      cikisDepoSiraNo: Number(data.depoID),
      malzemeId: Number(data.malzemeKoduID),
      birimKodId: Number(data.birimID),
      miktar: Number(data.miktar),
      fiyat: Number(data.iscilikUcreti),
      gc: 3,
      kdvOran: Number(data.kdvOrani),
      indirim: Number(data.indirimOrani),
      indirimOran: Number(data.indirimYuzde),
      toplam: Number(data.toplam),
      aciklama: data.aciklama,
      stoklu: data.stokluMalzeme,
      kdvTutar: Number(data.kdvDegeri),
      malzemeTipKodId: Number(data.isTipiID),
      malzemeTanim: data.malzemeTanimi,
    };

    AxiosInstance.post(`MaterialMovements/UpdateMaterialMovementService`, Body)
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
        <Modal width="990px" title="Malzeme Listesi Güncelle" open={isModalVisible} onOk={methods.handleSubmit(onSubmited)} onCancel={onModalClose}>
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
