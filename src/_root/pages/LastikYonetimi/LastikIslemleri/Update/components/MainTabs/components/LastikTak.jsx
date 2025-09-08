import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, message, InputNumber, Input, DatePicker, Button, Modal, Checkbox } from "antd";
import AxleListSelect from "./AxleListSelect";
import PositionListSelect from "./PositionListSelect";
import KodIDSelectbox from "../../../../../../../components/KodIDSelectbox";
import StoksuzLastikTablo from "../../../../../../../components/StoksuzLastikTablo";
import AxiosInstance from "../../../../../../../../api/http";
import LastikMarka from "../../../../../../../components/LastikMarka";
import LastikModel from "../../../../../../../components/LastikModel";
import { t } from "i18next";
import { Controller, FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/tr_TR";
import enLocale from "antd/es/date-picker/locale/en_US";
import ruLocale from "antd/es/date-picker/locale/ru_RU";
// Using tr locale for az since Ant Design does not have a specific Azerbaijani locale
import azLocale from "antd/es/date-picker/locale/tr_TR";

const getDecimalSeparator = () => {
  const lang = localStorage.getItem("i18nextLng") || "en";
  return ["tr", "az", "ru"].includes(lang) ? "," : ".";
};

// Get DatePicker locale based on i18next language
const getDatePickerLocale = () => {
  const lang = localStorage.getItem("i18nextLng") || "en";

  switch (lang) {
    case "tr":
      return locale;
    case "ru":
      return ruLocale;
    case "az":
      return azLocale;
    default:
      return enLocale;
  }
};

const { Text } = Typography;
const { TextArea } = Input;

export default function LastikTak({ aracId, wheelInfo, axleList, positionList, shouldOpenModal, onModalClose, showAddButton = true, refreshList, selectedAracDetay }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occupiedPositionsMap, setOccupiedPositionsMap] = useState({});

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
      tumBosAkslaraTak: false,
    },
    mode: "onChange",
  });

  const { control, setValue, watch } = methods;

  const fetchNewSerialNumber = React.useCallback(async () => {
    try {
      const response = await AxiosInstance.get("Numbering/GetModuleCodeByCode?code=LASTIK_SERI_NO");
      if (response.data) {
        setValue("siraNo", response.data);
      }
    } catch (error) {
      console.error("Error fetching serial number:", error);
      message.error(t("seriNoGetirilemedi"));
    }
  }, [setValue]);

  const fetchInstalledTiresMapping = React.useCallback(async () => {
    try {
      if (!aracId) return;
      const response = await AxiosInstance.get(`TyreOperation/GetInstalledTyresByVid?vId=${aracId}`);
      if (response?.data) {
        const tiresArray = Array.isArray(response.data) ? response.data : [response.data];
        const positionMap = tiresArray.reduce((acc, tire) => {
          if (tire.aksPozisyon && tire.pozisyonNo) {
            if (!acc[tire.aksPozisyon]) {
              acc[tire.aksPozisyon] = [];
            }
            if (!acc[tire.aksPozisyon].includes(tire.pozisyonNo)) {
              acc[tire.aksPozisyon].push(tire.pozisyonNo);
            }
          }
          return acc;
        }, {});
        setOccupiedPositionsMap(positionMap);
      }
    } catch (error) {
      console.error("Error fetching installed tires:", error);
    }
  }, [aracId]);

  // Listen for external modal trigger
  useEffect(() => {
    if (shouldOpenModal) {
      setIsModalOpen(true);
      fetchNewSerialNumber();
      setValue("montajTarihi", dayjs().format("YYYY-MM-DD"));
      setValue("montajKm", selectedAracDetay?.guncelKm ?? 0);
      fetchInstalledTiresMapping();
    }
  }, [shouldOpenModal, fetchNewSerialNumber, fetchInstalledTiresMapping, selectedAracDetay?.guncelKm, setValue]);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    fetchNewSerialNumber();
    setValue("montajTarihi", dayjs().format("YYYY-MM-DD"));
    setValue("montajKm", selectedAracDetay?.guncelKm ?? 0);
    setValue("tumBosAkslaraTak", false);
    fetchInstalledTiresMapping();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    methods.reset();
    if (onModalClose) {
      onModalClose();
    }
  };

  const getPositionsByAxleName = (axleName) => {
    if (!axleName || !positionList) return [];
    if (axleName === "onAks") {
      return positionList[0] || [];
    }
    if (axleName === "arkaAks") {
      return positionList[positionList.length - 1] || [];
    }
    const axleNumber = parseInt(String(axleName).replace("ortaAks", ""));
    if (!isNaN(axleNumber)) {
      return positionList[axleNumber] || [];
    }
    return [];
  };

  const computeEmptyPositions = () => {
    if (!Array.isArray(axleList) || axleList.length === 0) return [];
    const result = [];
    axleList.forEach((axleName) => {
      const allPositions = getPositionsByAxleName(axleName);
      const occupied = occupiedPositionsMap[axleName] || [];
      allPositions
        .filter((p) => !occupied.includes(p))
        .forEach((pozisyonNo) => {
          result.push({ aksPozisyon: axleName, pozisyonNo });
        });
    });
    return result;
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

  const createRequestBody = (data) => {
    const isBulk = !!data.tumBosAkslaraTak;
    if (isBulk) {
      const emptyPositions = computeEmptyPositions();
      if (!emptyPositions.length) {
        message.info(t("bosPozisyonYok") || "Boş pozisyon bulunamadı.");
        return null;
      }
      return {
        seriNo: data.siraNo,
        aracId: aracId,
        lastikSiraNo: data.lastikID,
        aksPozisyon: emptyPositions.map((x) => x.aksPozisyon),
        pozisyonNo: emptyPositions.map((x) => x.pozisyonNo),
        tahminiOmurKm: data.lastikOmru,
        ebatKodId: Number(data.lastikEbatID),
        tipKodId: Number(data.lastikTipID),
        lastikModelId: Number(data.modelID),
        lastikMarkaId: Number(data.markaID),
        disDerinligi: data.disDerinligi,
        basinc: data.basinc,
        aciklama: data.lastikAciklama,
        takildigiKm: data.montajKm,
        takilmaTarih: data.montajTarihi,
        tumBosAkslaraTak: true,
        durumId: 1,
        islemTipId: 1,
      };
    }

    return {
      seriNo: data.siraNo,
      aracId: aracId,
      lastikSiraNo: data.lastikID,
      aksPozisyon: data.selectedAxle,
      pozisyonNo: data.selectedPosition,
      tahminiOmurKm: data.lastikOmru,
      ebatKodId: Number(data.lastikEbatID),
      tipKodId: Number(data.lastikTipID),
      lastikModelId: Number(data.modelID),
      lastikMarkaId: Number(data.markaID),
      disDerinligi: data.disDerinligi,
      basinc: data.basinc,
      aciklama: data.lastikAciklama,
      takildigiKm: data.montajKm,
      takilmaTarih: data.montajTarihi,
      // tumBosAkslaraTak: data.tumBosAkslaraTak,
      durumId: 1,
      islemTipId: 1,
    };
  };

  const handleApiCall = async (data) => {
    try {
      const payload = createRequestBody(data);
      if (!payload) return false;
      const response = await AxiosInstance.post("TyreOperation/AddTyreOperation", payload);

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success("Güncelleme Başarılı.");
        if (typeof refreshList === "function") {
          await refreshList();
        }
        return true;
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else if (response.data.statusCode === 409) {
        message.error("Bu konuma zaten lastik takılmıştır!");
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

  const checkSiraNoUniqueness = async (siraNo) => {
    try {
      const response = await AxiosInstance.post("TableCodeItem/IsCodeItemExist", {
        tableName: "Lastik",
        code: siraNo,
      });

      if (response.data.status === true) {
        message.error("Sıra numarası benzersiz değildir!");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking siraNo uniqueness:", error);
      message.error("Sıra numarası kontrolü sırasında hata oluştu!");
      return false;
    }
  };

  const onSubmit = async (data) => {
    const isUnique = await checkSiraNoUniqueness(watch("siraNo"));
    if (!isUnique) return;

    const success = await handleApiCall(data);
    if (success) {
      methods.reset();
      handleCloseModal();
    }
  };

  const handleSaveAndNew = async (data) => {
    const isUnique = await checkSiraNoUniqueness(watch("siraNo"));
    if (!isUnique) return;

    const success = await handleApiCall(data);
    if (success) {
      methods.reset();
      fetchNewSerialNumber();
    }
  };

  const tumBosAkslaraTak = watch("tumBosAkslaraTak");

  return (
    <>
      {showAddButton && (
        <Button style={{ paddingLeft: "5px" }} type="link" onClick={handleOpenModal}>
          {t("add")}
        </Button>
      )}

      <Modal title={t("lastikMontaji") + " " + "[" + selectedAracDetay?.plaka + "]"} open={isModalOpen} onCancel={handleCloseModal} footer={null} width={800}>
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
                        <StoksuzLastikTablo
                          onSubmit={(selectedData) => {
                            // Set the lastik input value
                            setValue("lastik", selectedData.tanim);
                            setValue("lastikID", selectedData.siraNo);

                            // Set other related form fields
                            setValue("lastikOmru", selectedData.lastikOmru);

                            // First set the brand (marka) values
                            setValue("markaID", selectedData.markaId);
                            setValue("marka", selectedData.marka);

                            // Use setTimeout to ensure model values are set after marka values
                            setTimeout(() => {
                              // Then set the model values
                              setValue("modelID", selectedData.modelId);
                              setValue("model", selectedData.model);
                            }, 100);

                            // Set other tire properties
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
                        />
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
                      <LastikMarka name1="marka" isRequired={false} />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
                    <Text>{t("model")}</Text>
                    <div style={{ width: "250px" }}>
                      <LastikModel name1="model" isRequired={false} watchName="marka" />
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
                  {/* <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "350px" }}>
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

                  {!tumBosAkslaraTak && (
                    <>
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
                    </>
                  )}

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
                              locale={getDatePickerLocale()}
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

              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginTop: "20px", alignItems: "center" }}>
                <Controller
                  name="tumBosAkslaraTak"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {t("tumBosAkslaraTak")}
                    </Checkbox>
                  )}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <Button onClick={methods.handleSubmit(handleSaveAndNew)} disabled={tumBosAkslaraTak}>
                    {t("kaydetVeYeniEkle")}
                  </Button>
                  <Button type="primary" onClick={methods.handleSubmit(onSubmit)}>
                    {t("kaydet")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}

LastikTak.propTypes = {
  aracId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  wheelInfo: PropTypes.shape({
    axlePosition: PropTypes.string,
    wheelPosition: PropTypes.string,
  }),
  axleList: PropTypes.arrayOf(PropTypes.string).isRequired,
  positionList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  shouldOpenModal: PropTypes.bool,
  onModalClose: PropTypes.func,
  showAddButton: PropTypes.bool,
  refreshList: PropTypes.func,
  selectedAracDetay: PropTypes.shape({
    guncelKm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    plaka: PropTypes.string,
  }).isRequired,
};
