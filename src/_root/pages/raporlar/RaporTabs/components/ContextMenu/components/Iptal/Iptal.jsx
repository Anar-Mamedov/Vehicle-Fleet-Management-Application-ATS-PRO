import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import Forms from "./components/Forms";
import { Controller, useForm, FormProvider } from "react-hook-form";
import AxiosInstance from "../../../../../../../../api/http";
import dayjs from "dayjs";

export default function Iptal({ selectedRows, refreshTableData, iptalDisabled }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      fisNo: "",
      iptalTarihi: "",
      iptalSaati: "",
      iptalNeden: "",
      // Add other default values here
    },
  });
  const { setValue, reset, handleSubmit } = methods;

  // Sil düğmesini gizlemek için koşullu stil
  const buttonStyle = iptalDisabled ? { display: "none" } : {};

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const onSubmited = (data) => {
    // Seçili satırlar için Body dizisini oluştur
    const Body = selectedRows.map((row) => ({
      TB_IS_TALEP_ID: row.key,
      IST_TALEP_NO: row.IST_KOD,
      KLL_ADI: "Orjin", // Bu değer sabitse bu şekilde, dinamikse değiştirilmelidir
      IST_IPTAL_NEDEN: data.iptalNeden,
      IST_IPTAL_TARIH: formatDateWithDayjs(data.iptalTarihi),
      IST_IPTAL_SAAT: formatTimeWithDayjs(data.iptalSaati),
      ITL_ISLEM_ID: 5, // Sabit bir değerse bu şekilde kalabilir, dinamikse değiştirilmelidir
      ITL_ISLEM: "Iptal",
      ITL_ISLEM_DURUM: "IPTAL EDILDI",
      ITL_TALEP_ISLEM: "Iptal",
      ITL_ACIKLAMA: "Talep No: " + row.IST_KOD + " - Konu: Orjin Tarafından İptal Edildi",
    }));

    AxiosInstance.post("IsTalepIptalEtKapat", Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        reset();
        setIsModalOpen(false); // Sadece başarılı olursa modalı kapat
        refreshTableData();
        if (response.status_code === 200 || response.status_code === 201) {
          message.success("Ekleme Başarılı.");
        } else if (response.status_code === 401) {
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

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      reset();
    }
  };
  return (
    <FormProvider {...methods}>
      <div style={buttonStyle}>
        <Button style={{ paddingLeft: "0px" }} type="text" onClick={handleModalToggle}>
          İptal Et
        </Button>
        <Modal title="İş Talebi İptal" open={isModalOpen} onOk={methods.handleSubmit(onSubmited)} onCancel={handleModalToggle}>
          <form onSubmit={methods.handleSubmit(onSubmited)}>
            <Forms isModalOpen={isModalOpen} selectedRows={selectedRows} />
          </form>
        </Modal>
      </div>
    </FormProvider>
  );
}
