import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import { Controller, useForm, FormProvider, set } from "react-hook-form";
import AxiosInstance from "../../../../../../../../api/http";
import dayjs from "dayjs";
import Sekmeler from "./Sekmeler/Sekmeler";

export default function Parametreler() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      oncelikTanim: "",
      oncelikID: "",
      isEmriTipi: null,
      isEmriTipiID: "",
      isTalepTipi: null,
      isTalepTipiID: "",
      talepTarihiDegistirilebilir: false,
      talepKodu: true,
      talepTarihi: true,
      talepteBulunan: true,
      lokasyon: false,
      bildirilenBina: false,
      bildirilenKat: false,
      makineTanimi: false,
      ekipmanTanimi: false,
      makineDurumu: false,
      irtibatTelefonu: false,
      email: false,
      departman: false,
      iletisimSekli: false,
      isKategorisi: false,
      servisNedeni: false,
      isTakipcisi: false,
      konu: false,
      aciklama: false,
      isEmriTipiCheck: false,
      oncelik: false,
      bildirimTipi: false,
      planlananBaslamaTarihi: false,
      planlananBitisTarihi: false,
      ozelAlan1: false,
      ozelAlan2: false,
      ozelAlan3: false,
      ozelAlan4: false,
      ozelAlan5: false,
      ozelAlan6: false,
      ozelAlan7: false,
      ozelAlan8: false,
      ozelAlan9: false,
      ozelAlan10: false,
      // Add other default values here
    },
  });
  const { setValue, reset, handleSubmit } = methods;

  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (isModalOpen) {
        try {
          const response = await AxiosInstance.get(`IsTalepParametre`);
          const data = response;
          const item = data[0]; // Veri dizisinin ilk elemanını al

          // Form alanlarını set et
          setValue("oncelikTanim", item.ISP_ONCELIK_TEXT);
          setValue("isEmriTipi", item.ISP_ISEMRI_TIPI_TEXT);
          setValue("isTalepTipi", item.ISP_VARSAYILAN_IS_TIPI_TEXT);
          setValue("email", item.ISP_MAIL);
          setValue("departman", item.ISP_DEPARTMAN);
          setValue("iletisimSekli", item.ISP_ILETISIM_SEKLI);
          setValue("isKategorisi", item.ISP_IS_KATEGORI);
          setValue("servisNedeni", item.ISP_SERVIS_NEDEN);
          setValue("isTakipcisi", item.ISP_IS_TAKIPCI);
          setValue("talepKodu", item.ISP_TALEP_KOD);
          setValue("talepTarihi", item.ISP_TALEP_TARIHI);
          setValue("talepteBulunan", item.ISP_TALEPTE_BULUNAN);
          setValue("bildirilenBina", item.ISP_BINA);
          setValue("bildirilenKat", item.ISP_KAT);
          setValue("oncelik", item.ISP_ONCELIK);
          setValue("makineTanimi", item.ISP_MAKINE_KOD);
          setValue("ekipmanTanimi", item.ISP_EKIPMAN_KOD);
          setValue("irtibatTelefonu", item.ISP_IRTIBAT_TEL);
          setValue("bildirimTipi", item.ISP_BILDIRIM_TIPI);
          setValue("planlananBaslamaTarihi", item.ISP_PLANLANAN_BASLAMA_TARIH);
          setValue("planlananBitisTarihi", item.ISP_PLANLANAN_BITIS_TARIH);
          setValue("konu", item.ISP_KONU);
          setValue("aciklama", item.ISP_ACIKLAMA);
          setValue("ozelAlan1", item.ISP_OZEL_ALAN_1);
          setValue("ozelAlan2", item.ISP_OZEL_ALAN_2);
          setValue("ozelAlan3", item.ISP_OZEL_ALAN_3);
          setValue("ozelAlan4", item.ISP_OZEL_ALAN_4);
          setValue("ozelAlan5", item.ISP_OZEL_ALAN_5);
          setValue("ozelAlan6", item.ISP_OZEL_ALAN_6);
          setValue("ozelAlan7", item.ISP_OZEL_ALAN_7);
          setValue("ozelAlan8", item.ISP_OZEL_ALAN_8);
          setValue("ozelAlan9", item.ISP_OZEL_ALAN_9);
          setValue("ozelAlan10", item.ISP_OZEL_ALAN_10);
          setValue("oncelikID", item.ISP_ONCELIK_ID);
          setValue("isEmriTipiID", item.ISP_ISEMRI_TIPI_ID);
          setValue("lokasyon", item.ISP_LOKASYON);
          setValue("isTalepTipiID", item.ISP_VARSAYILAN_IS_TIPI);
          setValue("talepTarihiDegistirilebilir", item.ISP_DUZENLEME_TARIH_DEGISIMI);
          setValue("makineDurumu", item.ISP_ZOR_MAKINE_DURUM_KOD_ID);
          setValue("isEmriTipiCheck", item.ISP_ZOR_ISEMRI_TIPI_ID);
        } catch (error) {
          console.error("Veri çekilirken hata oluştu:", error);
        }
      }
    };

    handleDataFetchAndUpdate();
  }, [isModalOpen, setValue, methods.reset]);

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
    const Body = {
      //       TB_IS_TALEBI_PARAMETRE_ID: (Karşılık yok)
      // ISP_KAYIT_SAYISI: (Karşılık yok)
      // ISP_YENILEME_SURE: (Karşılık yok)
      // ISP_ACILIS_DURUM: (Karşılık yok)
      // ISP_KULLANICI_TANIM: (Karşılık yok)
      ISP_TALEP_KOD: data.talepKodu,
      ISP_TALEP_TARIHI: data.talepTarihi,
      ISP_TALEPTE_BULUNAN: data.talepteBulunan,
      ISP_BINA: data.bildirilenBina,
      ISP_KAT: data.bildirilenKat,
      ISP_ONCELIK: data.oncelik,
      ISP_MAKINE_KOD: data.makineTanimi,
      ISP_EKIPMAN_KOD: data.ekipmanTanimi,
      ISP_IRTIBAT_TEL: data.irtibatTelefonu,
      ISP_MAIL: data.email,
      ISP_ILETISIM_SEKLI: data.iletisimSekli,
      ISP_BILDIRIM_TIPI: data.bildirimTipi,
      ISP_IS_KATEGORI: data.isKategorisi,
      ISP_SERVIS_NEDEN: data.servisNedeni,
      ISP_IS_TAKIPCI: data.isTakipcisi,
      ISP_PLANLANAN_BASLAMA_TARIH: data.planlananBaslamaTarihi,
      ISP_PLANLANAN_BITIS_TARIH: data.planlananBitisTarihi,
      ISP_KONU: data.konu,
      ISP_ACIKLAMA: data.aciklama,
      ISP_OZEL_ALAN_1: data.ozelAlan1,
      ISP_OZEL_ALAN_2: data.ozelAlan2,
      ISP_OZEL_ALAN_3: data.ozelAlan3,
      ISP_OZEL_ALAN_4: data.ozelAlan4,
      ISP_OZEL_ALAN_5: data.ozelAlan5,
      ISP_OZEL_ALAN_6: data.ozelAlan6,
      ISP_OZEL_ALAN_7: data.ozelAlan7,
      ISP_OZEL_ALAN_8: data.ozelAlan8,
      ISP_OZEL_ALAN_9: data.ozelAlan9,
      ISP_OZEL_ALAN_10: data.ozelAlan10,
      ISP_ONCELIK_ID: data.oncelikID,
      // ISP_ACILIS_EKRAN: (Karşılık yok)
      // ISP_MAIL_SERVER: (Karşılık yok)
      // ISP_MAIL_PORT: (Karşılık yok)
      // ISP_GIRIS_YENILEME_SURE: (Karşılık yok)
      ISP_ISEMRI_TIPI_ID: data.isEmriTipiID,
      ISP_ZOR_ISEMRI_TIPI_ID: data.isEmriTipiCheck,
      ISP_ZOR_MAKINE_DURUM_KOD_ID: data.makineDurumu,
      // ISP_OLUSTURAN_ID: (Karşılık yok)
      // ISP_OLUSTURMA_TARIH: (Karşılık yok)
      // ISP_DEGISTIREN_ID: (Karşılık yok)
      // ISP_DEGISTIRME_TARIH: (Karşılık yok)
      // ISP_MAIL_ADRES: (Karşılık yok)
      // ISP_MAIL_SIFRE: (Karşılık yok)
      // ISP_SSL: (Karşılık yok)
      ISP_DUZENLEME_TARIH_DEGISIMI: data.talepTarihiDegistirilebilir,
      // ISP_ACIKTALEP_BILDIRIM: (Karşılık yok)
      ISP_DEPARTMAN: data.departman,
      ISP_LOKASYON: data.lokasyon,
      ISP_VARSAYILAN_IS_TIPI: data.isTalepTipiID,
    };

    AxiosInstance.post("UpdateIsTalepParametre", Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        reset();
        setIsModalOpen(false); // Sadece başarılı olursa modalı kapat
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
      <div>
        <Button style={{ display: "flex", padding: "0px 0px", alignItems: "center", justifyContent: "flex-start" }} type="submit" onClick={handleModalToggle}>
          Parametreler
        </Button>
        <Modal width={1200} title="Parametreler" open={isModalOpen} onOk={methods.handleSubmit(onSubmited)} onCancel={handleModalToggle}>
          <form onSubmit={methods.handleSubmit(onSubmited)}>
            <Sekmeler isModalOpen={isModalOpen} />
          </form>
        </Modal>
      </div>
    </FormProvider>
  );
}
