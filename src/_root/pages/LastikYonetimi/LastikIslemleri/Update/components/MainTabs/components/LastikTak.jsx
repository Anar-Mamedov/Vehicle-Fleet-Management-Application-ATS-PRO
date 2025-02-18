import React, { useEffect } from "react";
import { Typography, Space, message } from "antd";
import AxleListSelect from "./AxleListSelect";
import PositionListSelect from "./PositionListSelect";
import KodIDSelectbox from "../../../../../../../components/KodIDSelectbox";
import AxiosInstance from "../../../../../../../../api/http";
import { t } from "i18next";
import { Controller, useFormContext, FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
const { Text } = Typography;

export default function LastikTak({ wheelInfo, axleList, positionList }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const methods = useForm({
    defaultValues: {
      selectedAxle: null,
      selectedPosition: null,
      lastikTip: null,
      lastikEbat: null,
    },
  });

  const { setValue, reset, watch } = methods;

  useEffect(() => {
    if (wheelInfo?.axlePosition) {
      setValue("selectedAxle", wheelInfo.axlePosition);
      setValue("selectedPosition", wheelInfo.wheelPosition);
    }
  }, [wheelInfo, setValue]);

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const onSubmit = (data) => {
    // Form verilerini API'nin beklediği formata dönüştür
    const Body = {
      seriNo: "string",
      aracId: 0,
      lastikSiraNo: 0 /* seçilen lastiğin idsi */,
      aksPozisyon: Number(data.selectedAxle),
      pozisyonNo: Number(data.selectedPosition),
      tahminiOmurKm: 0 /* lastik ömür */,
      ebatKodId: Number(data.lastikEbat),
      tipKodId: Number(data.lastikTip),
      disDerinligi: 0,
      basinc: 0,
      aciklama: "string",
      takildigiKm: 0 /* montaj km */,
      takilmaTarih: "2025-02-12T07:42:32.413Z" /* montaj tarihi */,
    };
    // API'ye POST isteği gönder
    AxiosInstance.post("TyreOperation/AddTyreOperation", Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          message.success("Güncelleme Başarılı.");
          setOpen(false);
          onRefresh();
          methods.reset();
          onDrawerClose();
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
          message.error("İşlem Başarısız.");
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
            <Text>{t("ebat")}</Text>
            <div style={{ width: "250px" }}>
              <KodIDSelectbox name1="lastikEbat" isRequired={false} kodID="702" />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
            <Text>{t("tip")}</Text>
            <div style={{ width: "250px" }}>
              <KodIDSelectbox name1="lastikTip" isRequired={false} kodID="705" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
            <Text>
              {t("axle")}
              <span style={{ color: "red" }}>*</span>
            </Text>
            <div style={{ width: "250px" }}>
              <AxleListSelect axleList={axleList} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
            <Text>
              {t("position")}
              <span style={{ color: "red" }}>*</span>
            </Text>
            <div style={{ width: "250px" }}>
              <PositionListSelect positionList={positionList} />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
