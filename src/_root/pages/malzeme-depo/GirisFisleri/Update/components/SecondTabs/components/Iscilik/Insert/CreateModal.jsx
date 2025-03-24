import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../../../../../api/http";
import { Controller, useForm, FormProvider } from "react-hook-form";
import MainTabs from "./MainTabs/MainTabs";
import dayjs from "dayjs";

export default function CreateModal({ workshopSelectedId, onSubmit, onRefresh, secilenKayitID, plaka, aracID }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      plaka: plaka,
      aracID: aracID,
      aciklama: "",
      yapilanIs: "",
      yapilanIsID: "",
      personel: "",
      personelID: "",
      kdvOrani: 18,
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

  const { setValue, reset, handleSubmit, watch } = methods;

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
      aracId: Number(data.aracID),
      isTanimId: Number(data.yapilanIsID),
      isTipKodId: Number(data.isTipiID),
      indirimOran: Number(data.indirimYuzde),
      indirim: Number(data.indirimOrani),
      kdvOran: Number(data.kdvOrani),
      kdvTutar: Number(data.kdvDegeri),
      iscilikUcreti: Number(data.iscilikUcreti),
      toplam: Number(data.toplam),
      servisSiraNo: Number(secilenKayitID),
      aciklama: data.aciklama,
      sureSaat: Number(data.saat),
      sureDakika: Number(data.dakika),
      personelId: Number(data.personelID),
    };

    AxiosInstance.post(`ServiceWorkCard/AddServiceWorkCard`, Body)
      .then((response) => {
        console.log("Data sent successfully:", response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success("Ekleme Başarılı.");
          reset();
          setIsModalVisible(false); // Sadece başarılı olursa modalı kapat
          onRefresh();
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

  // Aşğaıdaki form elemanlarını eklemek üçün API ye gönderilme işlemi sonu

  return (
    <FormProvider {...methods}>
      <div>
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <Button type="link" onClick={handleModalToggle}>
            <PlusOutlined /> Yeni Kayıt
          </Button>
        </div>

        <Modal width="960px" title="İşçilik Ekle" open={isModalVisible} centered onOk={methods.handleSubmit(onSubmited)} onCancel={handleModalToggle}>
          {loading ? (
            <Spin spinning={loading} size="large" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
              {/* İçerik yüklenirken gösterilecek alan */}
            </Spin>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmited)}>
              <MainTabs />
            </form>
          )}
        </Modal>
      </div>
    </FormProvider>
  );
}
