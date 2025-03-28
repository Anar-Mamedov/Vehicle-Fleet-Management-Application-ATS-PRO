import React, { useContext, useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Checkbox, Divider, Input, InputNumber, message, Modal, Popconfirm } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import {
  GetKmRangeBeforeDateService,
  GetMaterialPriceService,
  ValidateFuelInfoInsertionService,
  ValidateFuelInfoUpdateService,
} from "../../../../../../../api/services/vehicles/operations_services";
import { UpdateVehicleDetailsInfoService } from "../../../../../../../api/services/vehicles/vehicles/services";
import HiddenInput from "../../../../../../components/form/inputs/HiddenInput";
import Driver from "../../../../../../components/form/selects/Driver";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
import MaterialType from "../../../../../../components/form/selects/MaterialType";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import YakitTank from "../../../../../../components/form/selects/YakitlTank";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import Guzergah from "../../../../../../components/form/selects/Guzergah";
import Location from "../../../../../../components/form/tree/Location";
import Firma from "../../../../../../components/form/selects/Firma";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import Textarea from "../../../../../../components/form/inputs/Textarea";

dayjs.locale("tr");

// Function to get decimal separator based on language
const getDecimalSeparator = () => {
  const lang = localStorage.getItem("i18nextLng") || "tr";

  switch (lang) {
    case "tr":
    case "az":
      return ",";
    case "ru":
    case "en":
      return ".";
    default:
      return ","; // Default to comma for other languages
  }
};

const GeneralInfo = ({ setIsValid, response, setResponse }) => {
  const { control, watch, setValue } = useFormContext();
  const { history, setHistory, data } = useContext(PlakaContext);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openTutarModal, setOpenTutarModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState(null);
  const [logError, setLogError] = useState(false);
  const [originalLitreFiyat, setOriginalLitreFiyat] = useState(null);
  const [showPopconfirm, setShowPopconfirm] = useState(false);

  const calculateTuketim = () => {
    const fullDepo = watch("fullDepo");
    const farkKm = watch("farkKm");
    const miktar = watch("miktar");
    const yakitHacmi = watch("yakitHacmi");

    let tktm = 0;

    if (fullDepo) {
      if (farkKm > 0 && miktar > 0) {
        tktm = miktar / farkKm;
      } else {
        tktm = 0;
      }
      const content = (
        <div className="grid detail-tuketim">
          <div className="col-span-5">
            <p>{t("gidilenYol")}:</p>
          </div>
          <div className="col-span-6">
            <p className="text-info">{watch("farkKm")} km</p>
          </div>
          <div className="col-span-5">
            <p>{t("yakitMiktari")}:</p>
          </div>
          <div className="col-span-6">
            <p className="text-info">{watch("miktar")} lt</p>
          </div>
          <div className="col-span-5">
            <p>{t("kalanYakitMiktari")}:</p>
          </div>
          <div className="col-span-6">
            <div className="text-info">
              <Controller
                name="depoYakitMiktar"
                control={control}
                render={({ field }) => <InputNumber {...field} value={watch("yakitHacmi") - watch("miktar")} onChange={(e) => field.onChange(e)} readOnly />}
              />
              &nbsp; lt (Depo {watch("fullDepo") ? "fullendi" : "fullenmedi"})
            </div>
          </div>
          <div className="col-span-12">
            <Divider />
          </div>
          <div className="col-span-5">
            <p>{t("yakitTuketimi")}:</p>
          </div>
          <div className="col-span-6">
            <p className="text-info">{watch("tuketim")} lt/km</p>
          </div>
        </div>
      );

      setContent(content);
    } else {
      if (history[0]?.fullDepo) {
        if (farkKm > 0 && miktar > 0) {
          tktm = history[0]?.miktar / farkKm;
        } else {
          tktm = 0;
        }

        const content = (
          <div className="grid detail-tuketim">
            <div className="col-span-5">
              <p>{t("gidilenYol")}:</p>
            </div>
            <div className="col-span-6">
              <p className="text-info">{watch("farkKm")} km</p>
            </div>
            <div className="col-span-5">
              <p>{t("oncekiYakitMiktari")}:</p>
            </div>
            <div className="col-span-6">
              <p className="text-info">{history[0]?.miktar} lt</p>
            </div>
            <div className="col-span-5">
              <p>{t("kalanYakitMiktari")}:</p>
            </div>
            <div className="col-span-6">
              <div className="text-info">
                <Controller name="depoYakitMiktar" control={control} render={({ field }) => <InputNumber {...field} onChange={(e) => field.onChange(e)} />} />
                &nbsp; lt (Depo {history[0]?.fullDepo ? "fullendi" : "fullenmedi"})
              </div>
            </div>
            <div className="col-span-12">
              <Divider />
            </div>
            <div className="col-span-5">
              <p>{t("yakitTuketimi")}:</p>
            </div>
            <div className="col-span-6">
              <p className="text-info">{watch("tuketim")} lt/km</p>
            </div>
          </div>
        );

        setContent(content);
      } else {
        if (farkKm > 0 && miktar > 0) {
          yakitHacmi !== null ? (tktm = yakitHacmi / farkKm) : (tktm = 0);

          const content = (
            <div className="grid detail-tuketim">
              <div className="col-span-5">
                <p>{t("gidilenYol")}:</p>
              </div>
              <div className="col-span-6">
                <p className="text-info">{watch("farkKm")} km</p>
              </div>
              <div className="col-span-5">
                <p>{t("aracDepoHacmi")}:</p>
              </div>
              <div className="col-span-6">
                <p className="text-info">{watch("yakitHacmi")} lt</p>
              </div>
              <div className="col-span-5">
                <p>{t("oncekiYakitMiktari")}:</p>
              </div>
              <div className="col-span-6">
                <p className="text-info">{history[0]?.miktar} lt</p>
              </div>
              <div className="col-span-5">
                <p>{t("kalanYakitMiktari")}:</p>
              </div>
              <div className="col-span-6">
                <div className="text-info">
                  <Controller name="depoYakitMiktar" control={control} render={({ field }) => <InputNumber {...field} onChange={(e) => field.onChange(e)} />} />
                  &nbsp; lt (Depo {history[0]?.fullDepo ? "fullendi" : "fullenmedi"})
                </div>
              </div>
              <div className="col-span-12">
                <Divider />
              </div>
              <div className="col-span-5">
                <p>{t("yakitTuketimi")}:</p>
              </div>
              <div className="col-span-6">
                <p className="text-info">{watch("tuketim")} lt/km</p>
              </div>
            </div>
          );

          setContent(content);
        } else {
          tktm = 0;
        }
      }
    }
    setValue("tuketim", (tktm * 100).toFixed(2));
  };

  useEffect(() => {
    if (watch("depoYakitMiktar") + history[0]?.miktar > watch("yakitHacmi")) {
      message.warning("Miktar depo hacminden büyükdür. Depo hacmini güncelleyin!");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [watch("depoYakitMiktar")]);

  /*   useEffect(() => {
    if (watch("yakitTipId")) {
      GetMaterialPriceService(watch("yakitTipId")).then((res) => {
        if (watch("litreFiyat") === null || watch("litreFiyat") === undefined) {
          setValue("litreFiyat", res?.data.price);
        }
        setValue("kdvOran", res?.data.kdv);
      });
    }
  }, [watch("yakitTipId")]); */

  useEffect(() => {
    const tutar = parseFloat(watch("tutar")) || 0;
    const kdvOrani = parseFloat(watch("kdvOran")) || 0;
    const kdvDahilMi = watch("kdvDahil");

    let kdvTutari = 0;

    if (kdvDahilMi) {
      // KDV dahilse: Tutar = Mal bedeli + KDV
      // KDV = (Tutar * KDV Oranı) / (100 + KDV Oranı)
      kdvTutari = (tutar * kdvOrani) / (100 + kdvOrani);
    } else {
      // KDV hariçse: Tutar = Mal bedeli
      // KDV = Tutar * (KDV Oranı / 100)
      kdvTutari = (tutar * kdvOrani) / 100;
    }

    setValue("kdv", kdvTutari.toFixed(2));
  }, [watch("kdvOran"), watch("tutar"), watch("kdvDahil")]);

  // Calculate kdvSizTutar based on kdvDahil status
  useEffect(() => {
    const tutar = parseFloat(watch("tutar")) || 0;
    const kdv = parseFloat(watch("kdv")) || 0;
    const kdvDahilMi = watch("kdvDahil");

    let kdvSizTutar = 0;

    if (kdvDahilMi) {
      // If KDV is included, subtract KDV from tutar
      kdvSizTutar = tutar - kdv;
    } else {
      // If KDV is not included, tutar is already without KDV
      kdvSizTutar = tutar;
    }

    setValue("kdvSizTutar", kdvSizTutar.toFixed(2));
  }, [watch("tutar"), watch("kdv"), watch("kdvDahil")]);

  useEffect(() => {
    const tutar = watch("miktar") * watch("litreFiyat");
    setValue("tutar", tutar.toFixed(2));
  }, [watch("litreFiyat")]);

  // Reset originalLitreFiyat when component unmounts
  useEffect(() => {
    return () => {
      setOriginalLitreFiyat(null);
    };
  }, []);

  useEffect(() => {
    GetKmRangeBeforeDateService(data.aracId, dayjs(watch("tarih")).format("YYYY-MM-DD"), dayjs(watch("saat")).format("HH:mm:ss")).then((res) => setHistory(res.data));
  }, [data]);

  const validateLog = () => {
    const body = {
      siraNo: watch("siraNo"),
      aracId: watch("aracId"),
      plaka: watch("plaka"),
      sonAlinanKm: watch("sonAlinanKm"),
      farkKm: watch("farkKm"),
      tuketim: watch("tuketim"),
      alinanKm: watch("alinanKm"),
      hasToInsertKmLog: watch("engelle"),
      tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
      saat: dayjs(watch("saat")).format("HH:mm:ss"),
      kmLog: {
        siraNo: watch("kmLogId"),
        kmAracId: watch("aracId"),
        plaka: watch("plaka"),
        tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
        saat: dayjs(watch("saat")).format("HH:mm:ss"),
        yeniKm: watch("alinanKm"),
        eskiKm: watch("eskiKm"),
        dorse: false,
        kaynak: "YAKIT",
        lokasyonId: watch("lokasyonId"),
      },
    };

    ValidateFuelInfoUpdateService(body).then((res) => {
      if (res?.data.statusCode === 400) {
        setResponse("error");
        if (res?.data.message === " Invalid Km range for both KmLog and FuelKm !") {
          setErrorMessage("Alınan Km Yakıt ve Km Log-a girilemez!");
          setIsValid(true);
        } else if (res?.data.message === " Invalid FuelKm Range !") {
          setErrorMessage("Alınan Km Yakıt Log-a girilemez!");
          setIsValid(true);
        } else if (res?.data.message === " Invalid KmLog Range !") {
          setLogError(true);
        }
      } else if (res?.data.statusCode === 200) {
        setResponse("success");
        setIsValid(false);
      }
    });
    setIsValid(true);
  };

  useEffect(() => {
    if (logError) {
      if (watch("engelle")) {
        setResponse("success");
        setIsValid(false);
      } else {
        setIsValid(true);
        setResponse("error");
        setErrorMessage("Alınan Km Km Log-a girilemez!");
      }
    }
  }, [watch("engelle"), logError]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage);
    }
    setErrorMessage("");
  }, [errorMessage]);

  const updateDepoHacmi = () => {
    const body = {
      dtyAracId: watch("aracId"),
      tyakitHacmi: watch("yakitHacmi"),
    };

    UpdateVehicleDetailsInfoService(1, body).then((res) => {
      if (res?.data.statusCode === 202) {
        setOpen(false);
      }
    });
  };

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={updateDepoHacmi}>
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setOpen(false);
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  const detailModalFooter = [
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setOpenDetail(false);
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-6" style={{ display: "none" }}>
              <div className="flex flex-col gap-1">
                <HiddenInput name="aracId" />
                <HiddenInput name="kdvOran" />
                <HiddenInput name="siraNo" />
                <HiddenInput name="eskiKm" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="plaka">{t("plaka")}</label>
                <TextInput name="plaka" readonly={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("surucu")}</label>
                <Driver name="surucu" codeName="surucuId" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tarih")}</label>
                <DateInput name="tarih" checked={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("saat")}</label>
                <TimeInput name="saat" readonly={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label htmlFor="yakitId">{t("yakitTip")}</label>
                <MaterialType name="yakitTip" codeName="yakitTipId" type="YAKIT" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("stoktanKullanim")}</label>
                <CheckboxInput name="stokKullanimi" />
              </div>
            </div>
            {/* <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("yakitTank")} --- ?</label>
                <YakitTank />
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-span-6">
          <Divider />
        </div>
        <div className="col-span-6">
          <Divider />
        </div>
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">{t("sonAlinanKm")}</label>
                <TextInput name="sonAlinanKm" readonly={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("yakitinAlindigiKm")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="alinanKm"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputNumber
                        className={fieldState.error ? "input-error w-full" : "w-full"}
                        {...field}
                        style={response === "error" ? { borderColor: "#dc3545" } : response === "success" ? { borderColor: "#23b545" } : { color: "#000" }}
                        {...field}
                        onPressEnter={(e) => {
                          validateLog();
                          e.target.blur();
                        }}
                        onBlur={validateLog}
                        onChange={(e) => {
                          field.onChange(e);
                          setIsValid(true);
                          if (watch("sonAlinanKm") === 0 && !watch("alinanKm")) {
                            setValue("farkKm", 0);
                          } else {
                            const fark = +e - watch("sonAlinanKm");
                            setValue("farkKm", fark);
                          }
                          calculateTuketim();
                        }}
                      />
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">{t("farkKm")}</label>
                <Controller
                  name="farkKm"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      readOnly={watch("sonAlinanKm") === 0}
                      onPressEnter={(e) => {
                        validateLog();
                        e.target.blur();
                      }}
                      value={watch("farkKm") < 0 ? 0 : watch("farkKm")}
                      onBlur={validateLog}
                      onChange={(e) => {
                        field.onChange(e);
                        setIsValid(true);
                        const alinanKm = watch("sonAlinanKm") + +e;
                        setValue("alinanKm", alinanKm);
                        validateLog();
                        calculateTuketim();
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("engelle")}</label>
                <Controller
                  name="engelle"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      className="custom-checkbox"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        validateLog();
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <div className="flex align-baseline gap-1">
                  <label className="text-info">
                    {t("miktar")} (lt) <span className="text-danger">*</span>
                  </label>
                  <Button className="depo" onClick={() => setOpen(true)}>
                    Depo Hacmi: {watch("yakitHacmi")} {(watch("birim") === "LITRE" && "lt") || "lt"}
                  </Button>
                </div>
                <Controller
                  name="miktar"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputNumber
                        {...field}
                        className={fieldState.error ? "input-error w-full" : "w-full"}
                        decimalSeparator={getDecimalSeparator()}
                        onPressEnter={(e) => {
                          if (watch("yakitHacmi") === 0 && !watch("fullDepo")) message.warning("Depo Hacmi sıfırdır. Depo hacmi giriniz!");

                          if (watch("yakitHacmi") < +e.target.value + +watch("depoYakitMiktar")) {
                            message.warning("Miktar depo hacminden büyükdür. Depo hacmini güncelleyin!");
                            setIsValid(true);
                          } else {
                            setIsValid(false);
                          }
                        }}
                        onChange={(val) => {
                          field.onChange(val);
                          const litreFiyat = watch("litreFiyat") ?? 0;
                          const tutarHesap = +val * +litreFiyat;
                          setValue("tutar", tutarHesap);
                        }}
                      />
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid">
                <div className="col-span-4 flex flex-col">
                  <label htmlFor="">{t("fullDepo")}</label>
                  <Controller
                    control={control}
                    name="fullDepo"
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.checked);
                          calculateTuketim();
                        }}
                      />
                    )}
                  />
                </div>
                {/* <div className="col-span-8">
                  <div className="grid gap-1">
                    <div className="col-span-10">
                      <div className="flex flex-col gap-1">
                        <label className="text-danger">
                          {t("ortalamaTuketim")} <ArrowUpOutlined style={{ color: "red" }} />
                        </label>
                        <TextInput name="tuketim" readonly={true} />
                      </div>
                    </div>
                    <div className="col-span-2 self-end">
                      <Button className="w-full text-center" style={{ padding: "4px" }} onClick={() => setOpenDetail(true)}>
                        ...
                      </Button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {watch("birim") === "LITRE" && t("litr")} {t("fiyati")}
                </label>
                <Controller
                  name="litreFiyat"
                  control={control}
                  render={({ field }) => (
                    <Popconfirm
                      title={t("uyari") || "Uyarı"}
                      description={
                        t("litreFiyat_degistirildiginde_miktar_ve_tutar_sifirlanacak") ||
                        "Litre fiyatı değiştirildiğinde miktar ve tutar değerleri sıfırlanacaktır. Devam etmek istiyor musunuz?"
                      }
                      open={showPopconfirm}
                      onConfirm={() => {
                        // User confirmed, reset miktar and tutar
                        setValue("miktar", 0);
                        setValue("tutar", 0);
                        setShowPopconfirm(false);
                        calculateTuketim();
                      }}
                      onCancel={() => {
                        // User canceled, revert litreFiyat to original value
                        field.onChange(originalLitreFiyat);
                        setValue("litreFiyat", originalLitreFiyat);
                        setShowPopconfirm(false);
                      }}
                      okText={t("evet")}
                      cancelText={t("hayir")}
                    >
                      <InputNumber
                        {...field}
                        className="w-full"
                        onChange={(e) => {
                          // Store original value if this is the first change
                          if (originalLitreFiyat === null) {
                            setOriginalLitreFiyat(field.value);
                          }

                          // Check if miktar or tutar has values
                          if ((watch("miktar") > 0 || watch("tutar") > 0) && e !== field.value) {
                            field.onChange(e); // Update the field value temporarily
                            setShowPopconfirm(true); // Show confirmation
                          } else {
                            // No confirmation needed, just update
                            field.onChange(e);
                            if (e === null) {
                              setValue("miktar", 0);
                            } else {
                              const miktar = watch("tutar") / +e;
                              setValue("miktar", Math.round(miktar));
                            }
                            calculateTuketim();
                          }
                        }}
                      />
                    </Popconfirm>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("tutar")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tutar"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="flex items-center gap-1">
                        <InputNumber
                          {...field}
                          decimalSeparator={getDecimalSeparator()}
                          className="w-full"
                          onChange={(val) => {
                            field.onChange(val);
                            const litreFiyat = watch("litreFiyat") ?? 0;
                            if (!litreFiyat || litreFiyat === 0) {
                              setValue("miktar", 0);
                            } else {
                              const miktarHesap = +val / litreFiyat;
                              setValue("miktar", miktarHesap);
                            }
                          }}
                        />
                        <Button type="primary" onClick={() => setOpenTutarModal(true)}>
                          {t("detay")}
                        </Button>
                      </div>
                      {fieldState.error && <div className="text-danger">{fieldState.error.message}</div>}
                    </>
                  )}
                />
              </div>
            </div>
            {/* <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label className="text-info">{t("kdvTutar")}</label>
                <TextInput name="kdv" readonly={true} />
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-span-6">
          <Divider />
        </div>
        <div className="col-span-6">
          <Divider />
        </div>
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("faturaFisNo")}</label>
                <TextInput name="faturaNo" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("faturaFisTarih")}</label>
                <DateInput name="faturaTarih" />
              </div>
            </div>
            {/* <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("gorevNo")} -- ?</label>
                <TextInput name="" readonly={true} />
              </div>
            </div> */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("ozelKullanim")}</label>
                <CheckboxInput name="ozelKullanim" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            {/* <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("masrafMerkezi")} -- ?</label>
                <TextInput name="" readonly={true} />
              </div>
            </div> */}
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("guzergah")}</label>
                <Guzergah />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasyonId">{t("lokasyon")}</label>
                <Location />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("firma")}</label>
                <Firma />
              </div>
            </div>
            <div className="col-span-8">
              <div className="flex flex-col gap-1">
                <label>{t("istasyon")}</label>
                <CodeControl name="istasyon" codeName="istasyonKodId" id={203} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <Divider />
        </div>
        <div className="col-span-12 p-20">
          <div className="flex flex-col gap-1">
            <label>{t("aciklama")}</label>
            <Textarea name="aciklama" />
          </div>
        </div>
      </div>

      <Modal open={open} maskClosable={false} title={t("depoHacmiGirisi")} footer={footer} onCancel={() => setOpen(false)}>
        <TextInput name="yakitHacmi" />
      </Modal>

      <Modal open={openDetail} maskClosable={false} title={t("ortalamaYakitTuketimi")} footer={detailModalFooter} onCancel={() => setOpenDetail(false)}>
        {content}
      </Modal>

      {/* Tutar Modal */}
      <Modal
        title={t("tutar") + " " + t("detay")}
        open={openTutarModal}
        onCancel={() => setOpenTutarModal(false)}
        footer={[
          <Button key="back" onClick={() => setOpenTutarModal(false)}>
            {t("kapat")}
          </Button>,
        ]}
        width={600}
      >
        <div className="flex flex-col gap-1">
          {/* KDV Section */}
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="kdvOran">
                    {t("kdvOrani")} <span className="text-danger">*</span>
                  </label>
                  <InputNumber
                    style={{ width: "100%" }}
                    name="kdvOran"
                    placeholder={t("kdvOrani")}
                    suffix="%"
                    min={0}
                    max={100}
                    onChange={(value) => setValue("kdvOran", value)}
                    value={watch("kdvOran")}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("kdvDahil")}</label>
                  <Controller
                    name="kdvDahil"
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                        {t("kdvDahil")}
                      </Checkbox>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="kdv">{t("kdvTutari")}</label>
                  <InputNumber
                    style={{ width: "100%" }}
                    name="kdv"
                    placeholder={t("kdvTutari")}
                    readOnly
                    value={watch("kdv")}
                    decimalSeparator={localStorage.getItem("i18nextLng") === "tr" ? "," : "."}
                    formatter={(value) => {
                      if (value === null || value === undefined) return "";
                      return `${value}`.replace(".", localStorage.getItem("i18nextLng") === "tr" ? "," : ".");
                    }}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="kdvSizTutar">{t("kdvSizTutar")}</label>
                  <InputNumber
                    style={{ width: "100%" }}
                    name="kdvSizTutar"
                    placeholder={t("kdvSizTutar")}
                    readOnly
                    value={watch("kdvSizTutar")}
                    decimalSeparator={localStorage.getItem("i18nextLng") === "tr" ? "," : "."}
                    formatter={(value) => {
                      if (value === null || value === undefined) return "";
                      return `${value}`.replace(".", localStorage.getItem("i18nextLng") === "tr" ? "," : ".");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

GeneralInfo.propTypes = {
  setIsValid: PropTypes.func,
  response: PropTypes.string,
  setResponse: PropTypes.func,
};

export default GeneralInfo;
