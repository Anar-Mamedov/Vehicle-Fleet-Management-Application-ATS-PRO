import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input, Typography, Tabs, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../../api/http";
import { Controller, useForm, FormProvider } from "react-hook-form";
import MainTabs from "./MainTabs/MainTabs";
import dayjs from "dayjs";
import { t } from "i18next";

export default function CreateModal({ workshopSelectedId, onSubmit, onRefresh, secilenKayitID, plaka, aracID, kdvOran, selectedRow1 }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
    },
  });

  useEffect(() => {
    if (selectedRow1) {
      setValue("plaka", selectedRow1.plaka);
      setValue("surucu", selectedRow1.surucuIsim1);
      setValue("seferNo", selectedRow1.seferNo);
      setValue("seferAdedi", selectedRow1.seferAdedi);
    }
  }, [selectedRow1]);

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
      // expeditionOperation: selectedRow1.key,
      seferSiraNo: Number(selectedRow1.key),
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

    AxiosInstance.post(`ExpeditionOpr/AddExpeditionOperationItem`, Body)
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
            <PlusOutlined /> {t("yeniKayit")}
          </Button>
        </div>

        <Modal width="960px" title={t("tasima/RotaBilgileri")} open={isModalVisible} centered onOk={methods.handleSubmit(onSubmited)} onCancel={handleModalToggle}>
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
