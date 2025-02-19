import React, { useEffect, useState } from "react";
import { Typography, Space, message, InputNumber, Input, DatePicker, Button, Modal } from "antd";
import AxleListSelect from "./AxleListSelect";
import PositionListSelect from "./PositionListSelect";
import KodIDSelectbox from "../../../../../../../components/KodIDSelectbox";
import AxiosInstance from "../../../../../../../../api/http";
import { t } from "i18next";
import { Controller, useFormContext, FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";

const getDecimalSeparator = () => {
  const lang = localStorage.getItem("i18nextLng") || "en";
  return ["tr", "az", "ru"].includes(lang) ? "," : ".";
};

const { Text } = Typography;
const { TextArea } = Input;

export default function LastikTak({ wheelInfo, axleList, positionList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      selectedAxle: null,
      selectedPosition: null,
      lastikTip: null,
      lastikEbat: null,
      lastikTipID: null,
      lastikEbatID: null,
      siraNo: "",
      lastikOmru: 0,
      marka: null,
      markaID: null,
      model: null,
      modelID: null,
      disDerinligi: 0,
      basinc: 0,
      montajKm: 0,
      montajTarihi: null,
      lastikAciklama: null,
    },
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = methods;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    methods.reset();
  };

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

  const onSubmit = async (data) => {
    try {
      // Form verilerini API'nin beklediği formata dönüştür
      const Body = {
        seriNo: data.siraNo,
        aracId: 0,
        lastikSiraNo: 0 /* seçilen lastiğin idsi */,
        aksPozisyon: data.selectedAxle,
        pozisyonNo: data.selectedPosition,
        tahminiOmurKm: data.lastikOmru /* lastik ömür */,
        ebatKodId: Number(data.lastikEbatID),
        tipKodId: Number(data.lastikTipID),
        disDerinligi: data.disDerinligi,
        basinc: data.basinc,
        aciklama: data.lastikAciklama,
        takildigiKm: data.montajKm,
        takilmaTarih: data.montajTarihi,
      };

      const response = await AxiosInstance.post("TyreOperation/AddTyreOperation1", Body);

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success("Güncelleme Başarılı.");
        methods.reset();
        handleCloseModal();
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else {
        message.error("İşlem Başarısız.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      if (navigator.onLine) {
        message.error("Hata Mesajı: " + error.message);
      } else {
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
    }
  };

  const handleSaveAndNew = async (data) => {
    try {
      const Body = {
        seriNo: data.siraNo,
        aracId: 0,
        lastikSiraNo: 0,
        aksPozisyon: data.selectedAxle,
        pozisyonNo: data.selectedPosition,
        tahminiOmurKm: data.lastikOmru,
        ebatKodId: Number(data.lastikEbatID),
        tipKodId: Number(data.lastikTipID),
        disDerinligi: data.disDerinligi,
        basinc: data.basinc,
        aciklama: data.lastikAciklama,
        takildigiKm: data.montajKm,
        takilmaTarih: data.montajTarihi,
      };

      const response = await AxiosInstance.post("TyreOperation/AddTyreOperation1", Body);

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success("Güncelleme Başarılı.");
        methods.reset();
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else {
        message.error("İşlem Başarısız.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      if (navigator.onLine) {
        message.error("Hata Mesajı: " + error.message);
      } else {
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
    }
  };

  return (
    <>
      <Button type="link" onClick={handleOpenModal}>
        {t("add")}
      </Button>

      <Modal title={t("lastikTak")} open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800}>
        <FormProvider {...methods}>
          <form>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>
                      {t("siraNo")}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <div style={{ width: "250px" }}>
                      <Controller
                        name="siraNo"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: t("alanBosBirakilamaz"),
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <Input
                              {...field}
                              status={error ? "error" : ""}
                              style={{
                                width: "100%",
                              }}
                            />
                            {error && <div style={{ color: "red" }}>{error.message}</div>}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("lastikOmru")}</Text>
                    <div style={{ width: "250px" }}>
                      <Controller
                        name="lastikOmru"
                        control={control}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            min={0}
                            suffix="KM"
                            style={{
                              width: "100%",
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("marka")}</Text>
                    <div style={{ width: "250px" }}>
                      <KodIDSelectbox name1="marka" isRequired={false} kodID="700" />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("model")}</Text>
                    <div style={{ width: "250px" }}>
                      <KodIDSelectbox name1="model" isRequired={false} kodID="701" />
                    </div>
                  </div>

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
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "180px" }}>
                      <Text>{t("disDerinligi")}</Text>
                      <div style={{ width: "80px" }}>
                        <Controller
                          name="disDerinligi"
                          control={control}
                          render={({ field }) => (
                            <InputNumber
                              {...field}
                              min={0}
                              precision={2}
                              step={0.01}
                              decimalSeparator={getDecimalSeparator()}
                              style={{
                                width: "100%",
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "160px" }}>
                      <Text>{t("basinc")}</Text>
                      <div style={{ width: "90px" }}>
                        <Controller
                          name="basinc"
                          control={control}
                          render={({ field }) => (
                            <InputNumber
                              {...field}
                              min={0}
                              suffix="psi"
                              style={{
                                width: "100%",
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("montajKm")}</Text>
                    <div style={{ width: "250px" }}>
                      <Controller
                        name="montajKm"
                        control={control}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            min={0}
                            suffix="KM"
                            style={{
                              width: "100%",
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("montajTarihi")}</Text>
                    <div style={{ width: "250px" }}>
                      <Controller
                        name="montajTarihi"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            style={{ width: "100%" }}
                            format="DD.MM.YYYY"
                            placeholder={t("montajTarihi")}
                            allowClear={true}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => {
                              field.onChange(date ? date.format("YYYY-MM-DD") : null);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("aciklama")}</Text>
                    <div style={{ width: "250px" }}>
                      <Controller name="lastikAciklama" control={control} render={({ field }) => <TextArea {...field} rows={4} />} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <Button onClick={methods.handleSubmit(handleSaveAndNew)}>{t("kaydetVeYeniEkle")}</Button>
                <Button type="primary" onClick={methods.handleSubmit(onSubmit)}>
                  {t("kaydet")}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
