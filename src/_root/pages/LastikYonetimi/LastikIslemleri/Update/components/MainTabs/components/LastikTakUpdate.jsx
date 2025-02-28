import React, { useEffect, useState } from "react";
import { Typography, Space, message, InputNumber, Input, DatePicker, Button, Modal } from "antd";
import AxleListSelect from "./AxleListSelect";
import PositionListSelect from "./PositionListSelect";
import KodIDSelectbox from "../../../../../../../components/KodIDSelectbox";
import StoksuzLastikTablo from "../../../../../../../components/StoksuzLastikTablo";
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

export default function LastikTak({ aracId, wheelInfo, axleList, positionList, shouldOpenModal, onModalClose, showAddButton = true, refreshList, tireData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTireData = async (siraNo) => {
    try {
      const response = await AxiosInstance.get(`TyreOperation/GetTyreOperationById?id=${siraNo}`);
      if (response && response.data) {
        const data = response.data;
        setValue("lastik", data.lastikTanim);
        setValue("lastikID", data.lastikSiraNo);
        setValue("selectedAxle", data.aksPozisyon);
        setValue("selectedPosition", data.pozisyonNo);
        setValue("lastikTip", data.tip);
        setValue("lastikEbat", data.ebat);
        setValue("lastikTipID", data.tipKodId);
        setValue("lastikEbatID", data.ebatKodId);
        setValue("seriNo", data.seriNo);
        setValue("lastikOmru", data.tahminiOmurKm);
        setValue("marka", data.lastikMarka);
        setValue("markaID", data.lastikMarkaId);
        setValue("model", data.lastikModel);
        setValue("modelID", data.lastikModelId);
        setValue("disDerinligi", data.disDerinligi);
        setValue("basinc", data.basinc);
        setValue("montajKm", data.takildigiKm);
        setValue("montajTarihi", data.takilmaTarih ? dayjs(data.takilmaTarih).format("YYYY-MM-DD") : null);
        setValue("lastikAciklama", data.aciklama);
      }
    } catch (error) {
      console.error("Error fetching tire data:", error);
      message.error(t("lastikVerileriAlinamadi"));
    }
  };

  const methods = useForm({
    defaultValues: {
      lastik: null,
      lastikID: null,
      selectedAxle: null,
      selectedPosition: null,
      lastikTip: null,
      lastikEbat: null,
      lastikTipID: null,
      lastikEbatID: null,
      seriNo: "",
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

  // Listen for external modal trigger
  useEffect(() => {
    if (shouldOpenModal) {
      setIsModalOpen(true);
    }
  }, [shouldOpenModal]);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    methods.reset();
    if (onModalClose) {
      onModalClose();
    }
  };

  useEffect(() => {
    if (wheelInfo?.axlePosition) {
      setValue("selectedAxle", wheelInfo.axlePosition);
      setValue("selectedPosition", wheelInfo.wheelPosition);
    }
  }, [wheelInfo, setValue]);

  useEffect(() => {
    if (tireData?.siraNo) {
      fetchTireData(tireData.siraNo);
    }
  }, [tireData]);

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const createRequestBody = (data) => ({
    siraNo: tireData?.siraNo,
    seriNo: data.seriNo,
    aracId: aracId,
    lastikSiraNo: data.lastikID,
    aksPozisyon: data.selectedAxle,
    pozisyonNo: data.selectedPosition,
    tahminiOmurKm: data.lastikOmru,
    ebatKodId: Number(data.lastikEbatID),
    tipKodId: Number(data.lastikTipID),
    lastikModelId: Number(data.modelID),
    lastikMarkaId: Number(data.markaID),
    /* disDerinligi: data.disDerinligi,
    basinc: data.basinc, */
    aciklama: data.lastikAciklama,
    takildigiKm: data.montajKm,
    takilmaTarih: data.montajTarihi,
    durumId: 1,
    islemTipId: 2,
  });

  const handleApiCall = async (data) => {
    try {
      const response = await AxiosInstance.post("TyreOperation/UpdateTyreOperation", createRequestBody(data));

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success("Güncelleme Başarılı.");
        if (typeof refreshList === "function") {
          await refreshList();
        }
        return true;
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else {
        message.error("İşlem Başarısız.");
      }
      return false;
    } catch (error) {
      console.error("Error sending data:", error);
      if (navigator.onLine) {
        message.error("Hata Mesajı: " + error.message);
      } else {
        message.error("Internet Bağlantısı Mevcut Değil.");
      }
      return false;
    }
  };

  const onSubmit = async (data) => {
    const success = await handleApiCall(data);
    if (success) {
      methods.reset();
      handleCloseModal();
    }
  };

  const handleSaveAndNew = async (data) => {
    const success = await handleApiCall(data);
    if (success) {
      methods.reset();
    }
  };

  const validateSeriNo = async (value) => {
    if (!value) return true;
    try {
      const response = await AxiosInstance.post("TableCodeItem/IsCodeItemExist", {
        tableName: "Lastik",
        code: value,
      });

      if (response.data.status === true) {
        return t("seriNumarasiBenzersizDegildir");
      }
      return true;
    } catch (error) {
      console.error("Error checking seriNo uniqueness:", error);
      return t("seriNumarasiKontroluSirasindaHataOlustu");
    }
  };

  const [isValidatingSeriNo, setIsValidatingSeriNo] = useState(false);

  return (
    <>
      {showAddButton && (
        <Button type="link" onClick={handleOpenModal}>
          {t("add")}
        </Button>
      )}

      <Modal title={t("lastikGuncelle")} open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800}>
        <FormProvider {...methods}>
          <form>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>
                      {t("lastik")}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <div style={{ width: "250px" }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "5px", width: "100%" }}>
                        <Controller
                          name="lastik"
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
                                placeholder={t("lastikSeciniz")}
                                disabled={true}
                                style={{
                                  width: "100%",
                                }}
                              />
                            </>
                          )}
                        />
                        {/* <StoksuzLastikTablo
                          onSubmit={(selectedData) => {
                            // Set the lastik input value
                            setValue("lastik", selectedData.tanim);
                            setValue("lastikID", selectedData.siraNo);

                            // Set other related form fields
                            setValue("lastikOmru", selectedData.lastikOmru);
                            setValue("markaID", selectedData.markaId);
                            setValue("marka", selectedData.marka);
                            setValue("modelID", selectedData.modelId);
                            setValue("model", selectedData.model);
                            setValue("lastikEbatID", selectedData.ebatKodId);
                            setValue("lastikEbat", selectedData.ebat);
                            setValue("lastikTipID", selectedData.tipKodId);
                            setValue("lastikTip", selectedData.tip);
                            setValue("disDerinligi", selectedData.disDerinlik);
                            setValue("basinc", selectedData.basinc);
                          }}
                          onClear={() => {
                            // Clear all tire-related fields
                            setValue("lastik", null);
                            setValue("lastikID", null);
                            setValue("lastikOmru", 0);
                            setValue("markaID", null);
                            setValue("marka", null);
                            setValue("modelID", null);
                            setValue("model", null);
                            setValue("lastikEbatID", null);
                            setValue("lastikEbat", null);
                            setValue("lastikTipID", null);
                            setValue("lastikTip", null);
                            setValue("disDerinligi", 0);
                            setValue("basinc", 0);
                          }}
                        /> */}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>
                      {t("seriNo")}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <div style={{ width: "250px" }}>
                      <Controller
                        name="seriNo"
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
                              onBlur={async (e) => {
                                field.onBlur(e);
                                const result = await validateSeriNo(e.target.value);
                                if (result !== true) {
                                  methods.setError("seriNo", { message: result });
                                } else {
                                  methods.clearErrors("seriNo");
                                }
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
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {/*   <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
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
                  </div> */}

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>
                      {t("axle")}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <div style={{ width: "250px" }}>
                      <AxleListSelect axleList={axleList} disabled={false} />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>
                      {t("position")}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <div style={{ width: "250px" }}>
                      <PositionListSelect positionList={positionList} disabled={false} />
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
                    <Text>
                      {t("montajTarihi")}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <div style={{ width: "250px" }}>
                      <Controller
                        name="montajTarihi"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: t("alanBosBirakilamaz"),
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <>
                            <DatePicker
                              {...field}
                              style={{ width: "100%" }}
                              format="DD.MM.YYYY"
                              placeholder={t("montajTarihi")}
                              allowClear={true}
                              status={error ? "error" : ""}
                              value={field.value ? dayjs(field.value) : null}
                              onChange={(date) => {
                                field.onChange(date ? date.format("YYYY-MM-DD") : null);
                              }}
                            />
                            {error && <div style={{ color: "red" }}>{error.message}</div>}
                          </>
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
                {/* <Button onClick={methods.handleSubmit(handleSaveAndNew)}>{t("kaydetVeYeniEkle")}</Button> */}
                <Button type="primary" onClick={methods.handleSubmit(onSubmit)}>
                  {t("guncelle")}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
