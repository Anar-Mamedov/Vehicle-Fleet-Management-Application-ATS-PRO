import React, { useEffect, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Modal, Popconfirm, DatePicker, Input, ConfigProvider } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import KodIDSelectbox from "../../../../../../components/KodIDSelectbox";
import { t } from "i18next";
import dayjs from "dayjs";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";
// Import other locales as needed

const localeMap = {
  tr: trTR,
  en: enUS,
  ru: ruRU,
  az: azAZ,
  // Add other mappings here
};

// Define date format mapping based on language
const dateFormatMap = {
  tr: "DD.MM.YYYY",
  en: "MM/DD/YYYY",
  ru: "DD.MM.YYYY",
  az: "DD.MM.YYYY",
  // Add other mappings here
};

// Define time format mapping based on language
const timeFormatMap = {
  tr: "HH:mm",
  en: "hh:mm A",
  ru: "HH:mm",
  az: "HH:mm",
  // Add other mappings here
};

export default function ArsivdenCikar({ selectedRows, refreshTableData, disabled, hidePopover }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localeDateFormat, setLocaleDateFormat] = useState("MM/DD/YYYY"); // Default format
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm"); // Default format
  // Sil düğmesini gizlemek için koşullu stil
  const buttonStyle = disabled ? { display: "none" } : {};

  const methods = useForm({
    defaultValues: {
      selectedDate: null,
      neden: null,
      aciklama: "",
      nedenID: null,
    },
  });

  const { setValue, reset, handleSubmit, control } = methods;

  // Add useEffect to set current date when modal opens
  useEffect(() => {
    if (isModalVisible) {
      setValue("selectedDate", dayjs());
    }
  }, [isModalVisible, setValue]);

  const onSubmit = async (data) => {
    const aracIDs = selectedRows.map((row) => row.key);

    const body = {
      vIds: aracIDs,
      durum: false,
      tarih: data.selectedDate && dayjs(data.selectedDate).isValid() ? dayjs(data.selectedDate).format("YYYY-MM-DD") : null,
      nedenKodId: Number(data.nedenID),
      aciklama: data.aciklama,
    };

    try {
      const response = await AxiosInstance.post(`GetArchive/GetVehiclesArchiveById`, body);
      console.log("İşlem sonucu:", response);

      if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
        message.success(t("İşlem Başarılı"));
        refreshTableData();
        hidePopover();
        setIsModalVisible(false);
        reset();
      } else if (response.data.statusCode === 401) {
        message.error(t("Bu işlemi yapmaya yetkiniz bulunmamaktadır."));
      } else {
        message.error(t("İşlem Başarısız."));
      }
    } catch (error) {
      console.error("İşlem sırasında hata oluştu:", error);
      message.error(t("İşlem sırasında hata oluştu."));
    }
  };

  // Kullanıcının dilini localStorage'den alın
  const currentLang = localStorage.getItem("i18nextLng") || "en";
  const currentLocale = localeMap[currentLang] || enUS;

  useEffect(() => {
    // Ay ve tarih formatını dil bazında ayarlayın
    const selectedDateFormat = dateFormatMap[currentLang] || "MM/DD/YYYY";
    setLocaleDateFormat(selectedDateFormat);

    const selectedTimeFormat = timeFormatMap[currentLang] || "HH:mm";
    setLocaleTimeFormat(selectedTimeFormat);
  }, [currentLang]);

  // Modal kapandığında formu sıfırla
  const handleCancel = () => {
    setIsModalVisible(false);
    reset(); // Formu sıfırla
  };

  return (
    <div style={buttonStyle}>
      <div style={{ marginTop: "8px", cursor: "pointer" }} onClick={() => setIsModalVisible(true)}>
        {t("arsivdenCikar")}
      </div>

      <Modal title={t("arsivdenCikar")} open={isModalVisible} onOk={methods.handleSubmit(onSubmit)} onCancel={handleCancel}>
        <ConfigProvider locale={currentLocale}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Controller
                name="selectedDate"
                control={control}
                render={({ field }) => <DatePicker {...field} style={{ width: "100%", marginBottom: 8 }} format={localeDateFormat} placeholder={t("Tarih seçiniz")} />}
              />
              <KodIDSelectbox name1="neden" kodID={895} isRequired={false} placeholder={t("nedenSeciniz")} />
              <Controller name="aciklama" control={control} render={({ field }) => <Input.TextArea {...field} rows={4} placeholder={t("Açıklama")} style={{ marginTop: 8 }} />} />
            </form>
          </FormProvider>
        </ConfigProvider>
      </Modal>
    </div>
  );
}
// ...existing code...
