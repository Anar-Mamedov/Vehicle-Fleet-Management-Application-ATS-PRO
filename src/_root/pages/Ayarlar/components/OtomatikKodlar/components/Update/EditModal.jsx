import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import {
  Drawer,
  Typography,
  Button,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Checkbox,
  InputNumber,
  Radio,
  Divider,
  Image,
  Switch,
  message,
  Modal,
  ConfigProvider,
  Spin,
  Space,
} from "antd";
import React, { useEffect, useState, useTransition } from "react";
import { useForm, Controller, useFormContext, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../../../api/http.jsx";
import { t } from "i18next";

const { Text, Link } = Typography;
const { TextArea } = Input;

export default function EditModal({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) {
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      tanim: null,
      secilenID: null,
      aktif: false,
      onEk: null,
      alaniKilitle: false,
      no: null,
      haneSayisi: null,
    },
  });

  const { setValue, reset, watch, control } = methods;

  // API'den gelen verileri form alanlarına set etme

  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (drawerVisible && selectedRow) {
        // Form alanlarını set et
        setLoading(true); // Start loading
        // Form alanlarını set et
        setValue("tanim", selectedRow.tanim);
        setValue("secilenID", selectedRow.key);
        setValue("aktif", selectedRow.aktif);
        setValue("onEk", selectedRow.onEk);
        setValue("alaniKilitle", selectedRow.alaniKilitle);
        setValue("no", selectedRow.numara);
        setValue("haneSayisi", selectedRow.haneSayisi);
        setLoading(false); // End loading
      }
    };

    handleDataFetchAndUpdate();
  }, [drawerVisible, selectedRow, setValue, onRefresh, methods.reset, AxiosInstance]);

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
      tbNumaratorId: Number(selectedRow.key),
      tanim: data.tanim,
      onEk: data.onEk,
      alaniKilitle: data.alaniKilitle,
      aktif: data.aktif,
      numara: Number(data.no),
      haneSayisi: Number(data.haneSayisi),
    };

    // API'ye POST isteği gönder
    AxiosInstance.post(`Numbering/UpdateModuleInfo`, Body)
      .then((response) => {
        console.log("Data sent successfully:", response);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
          message.success(t("guncellemeBasarili"));
          onRefresh();
          methods.reset();
          onDrawerClose();
        } else if (response.data.statusCode === 401) {
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

  const onClose = () => {
    Modal.confirm({
      title: "İptal etmek istediğinden emin misin?",
      content: "Kaydedilmemiş değişiklikler kaybolacaktır.",
      okText: "Evet",
      cancelText: "Hayır",
      onOk: () => {
        reset();
        onDrawerClose();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={tr_TR}>
        <Modal
          width="500px"
          centered
          title={t("otomatikKodGuncelle")}
          open={drawerVisible}
          onCancel={onClose}
          footer={
            <Space>
              <Button onClick={onClose}>İptal</Button>
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#2bc770",
                  borderColor: "#2bc770",
                  color: "#ffffff",
                }}
              >
                Güncelle
              </Button>
            </Space>
          }
        >
          {loading ? (
            <div style={{ overflow: "auto", height: "calc(100vh - 150px)" }}>
              <Spin
                spinning={loading}
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* İçerik yüklenirken gösterilecek alan */}
              </Spin>
            </div>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
                  <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("tanim")}</Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <Controller name="tanim" control={control} render={({ field }) => <Input {...field} style={{ flex: 1 }} />} />
                    <Controller name="secilenID" control={control} render={({ field }) => <Input {...field} style={{ flex: 1, display: "none" }} />} />
                    <Controller
                      name="aktif"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value}>
                          {t("aktif")}
                        </Checkbox>
                      )}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
                  <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("onEk")}</Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <Controller name="onEk" control={control} render={({ field }) => <InputNumber {...field} min={0} style={{ flex: 1 }} />} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "15px", width: "100%" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
                    <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("no")}</Text>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      <Controller name="no" control={control} render={({ field }) => <InputNumber {...field} min={0} style={{ flex: 1 }} />} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
                    <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("haneSayisi")}</Text>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      <Controller name="haneSayisi" control={control} render={({ field }) => <InputNumber {...field} min={0} style={{ flex: 1 }} />} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                  <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("alaniKilitle")}</Text>
                  <Controller name="alaniKilitle" control={control} render={({ field }) => <Switch {...field} />} />
                </div>
              </div>
            </form>
          )}
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}
