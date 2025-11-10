import React, { useCallback, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../../../../../api/http";
import { Controller, useForm, FormProvider } from "react-hook-form";
import MainTabs from "./MainTabs/MainTabs";
import dayjs from "dayjs";

export default function CreateModal({ workshopSelectedId, onSubmit, onRefresh, onCountsRefresh, secilenKayitID, plaka, aracID, kdvOran, baslangicTarihi }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      // plaka: plaka,
      aracID: aracID,
      aciklama: "",
      stokluMalzeme: false,
      malzemeKodu: "",
      malzemeKoduID: "",
      malzemeTanimi: "",
      miktar: 1,
      iscilikUcreti: 0,
      kdvOrani: kdvOran,
      kdvDegeri: 0,
      indirimOrani: 0,
      indirimYuzde: 0,
      toplam: 0,
      isTipi: null,
      isTipiID: "",
      depo: null,
      depoID: "",
      birim: null,
      birimID: "",
      baslangicTarihi: baslangicTarihi || "",
      // Add other default values here
    },
  });

  const { reset, handleSubmit, getValues } = methods;

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
      mlzAracId: Number(data.aracID),
      servisSirano: Number(secilenKayitID),
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
      malezemeTanim: data.malzemeTanimi,
      tarih: formatDateWithDayjs(baslangicTarihi),
    };

    AxiosInstance.post(`MaterialMovements/AddMaterialMovementService`, Body)
      .then((response) => {
        console.log("Data sent successfully:", response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success("Ekleme Başarılı.");
          reset();
          setIsModalVisible(false); // Sadece başarılı olursa modalı kapat
          onRefresh?.();
          onCountsRefresh?.();
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

  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
    if (!isModalVisible) {
      reset();
    }
  };

  const handleBulkMaterialAdd = useCallback(
    async (selectedItems) => {
      if (!selectedItems?.length) {
        message.warning("Lütfen en az bir malzeme seçin.");
        return;
      }

      if (!secilenKayitID) {
        message.warning("İş emri seçili değil.");
        return;
      }

      const formValues = getValues();

      setLoading(true);
      try {
        const formattedDate = formatDateWithDayjs(formValues.baslangicTarihi || baslangicTarihi);

        const payload = selectedItems.map((item) => ({
          mlzAracId: Number(formValues.aracID || aracID || 0),
          servisSirano: Number(secilenKayitID),
          cikisDepoSiraNo: Number(formValues.depoID || 0),
          malzemeId: Number(item.malzemeId || item.key),
          birimKodId: Number(item.birimKodId || formValues.birimID || 0),
          miktar: Number(formValues.miktar || 1),
          fiyat: Number(item.fiyat ?? formValues.iscilikUcreti ?? 0),
          gc: 3,
          kdvOran: Number(formValues.kdvOrani || 0),
          indirim: Number(formValues.indirimOrani || 0),
          indirimOran: Number(formValues.indirimYuzde || 0),
          toplam: Number(formValues.toplam || 0),
          aciklama: formValues.aciklama,
          stoklu: formValues.stokluMalzeme,
          kdvTutar: Number(formValues.kdvDegeri || 0),
          malzemeTipKodId: Number(item.malzemeTipKodId || formValues.isTipiID || 0),
          malezemeTanim: item.tanim,
          tarih: formattedDate,
        }));

        const response = await AxiosInstance.post(`MaterialMovements/AddBulkMaterialMovementService`, payload);

        if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201) {
          message.success("Seçili malzemeler başarıyla eklendi.");
          reset();
          setIsModalVisible(false);
          onRefresh?.();
          onCountsRefresh?.();
        } else {
          message.error(response?.data?.message || "Seçili malzemeler eklenemedi.");
        }
      } catch (error) {
        console.error("Çoklu malzeme ekleme hatası:", error);
        message.error("Seçili malzemeler eklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    },
    [aracID, baslangicTarihi, getValues, onCountsRefresh, onRefresh, reset, secilenKayitID]
  );

  // Aşğaıdaki form elemanlarını eklemek üçün API ye gönderilme işlemi sonu

  return (
    <FormProvider {...methods}>
      <div>
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <Button type="link" onClick={handleModalToggle}>
            <PlusOutlined /> Yeni Kayıt
          </Button>
        </div>

        <Modal width="960px" title="Malzeme Ekle" open={isModalVisible} centered onOk={methods.handleSubmit(onSubmited)} onCancel={handleModalToggle}>
          {loading ? (
            <Spin spinning={loading} size="large" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
              {/* İçerik yüklenirken gösterilecek alan */}
            </Spin>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmited)}>
              <MainTabs aracID={aracID} onBulkAdd={handleBulkMaterialAdd} />
            </form>
          )}
        </Modal>
      </div>
    </FormProvider>
  );
}
