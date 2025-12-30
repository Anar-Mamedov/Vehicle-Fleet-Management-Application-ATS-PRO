import React, { useContext, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import tr_TR from "antd/lib/locale/tr_TR";
import { t } from "i18next";
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, InputNumber, message, Modal, TimePicker, Row, Col } from "antd";
import { ArrowUpOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../context/plakaSlice";
import { SelectContext } from "../../../../../context/selectSlice";
import {
  GetKmRangeBeforeDateService,
  GetLastThreeFuelRecordService,
  GetMaterialPriceService,
} from "../../../../../api/services/vehicles/yakit/services";
import { UpdateVehicleDetailsInfoService } from "../../../../../api/services/vehicles/vehicles/services";
import Plaka from "../../../../components/form/selects/Plaka";
import PlakaGetValueFromProp from "../../../../components/form/selects/PlakaGetValueFromProp";
import Driver from "../../../../components/form/selects/Driver";
import MaterialType from "../../../../components/form/selects/MaterialType";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import YakitTank from "../../../../components/form/selects/YakitlTank";
import TextInput from "../../../../components/form/inputs/TextInput";
import UpdateModal from "../../../yakit-yonetim/yakit-tanim/UpdateModal";

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

const GeneralInfo = ({ setIsValid, response, selectedRow = null }) => {
  const [, contextHolder] = message.useMessage();
  const { control, setValue, watch } = useFormContext();
  const { data, history, setHistory } = useContext(PlakaContext);
  const { setFuelTankId } = useContext(SelectContext);

  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [content, setContent] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedYakitTipId, setSelectedYakitTipId] = useState(null);

  console.log("Anar", selectedRow);

  // ------------------------------------------------------------------
  // 1) PLAKA GELDİĞİNDE YAKIT TİPİ, TARİH, SAAT, etc. HAZIRLA
  // ------------------------------------------------------------------
  useEffect(() => {
    if (data.length === 0) return;
    setFuelTankId(data.yakitTipId);

    // Tarih bugün değilse fetchData çalışsın:
    if (dayjs(new Date()).format("DD.MM.YYYY") !== dayjs(watch("tarih")).format("DD.MM.YYYY")) {
      fetchData();
    } else {
      // Sadece son 3 yakıt kaydını çek
      GetLastThreeFuelRecordService(watch("aracId"), dayjs(watch("tarih")).format("YYYY-MM-DD"), dayjs(watch("saat")).format("HH:mm:ss")).then((res) => setHistory(res.data));
    }
  }, [data]);

  // ------------------------------------------------------------------
  // 2) YAKIT TİPİ DEĞİŞİNCE LİTRE FİYATI + KDV'Yİ GETİR
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!watch("yakitTipId")) return;

    GetMaterialPriceService(watch("yakitTipId")).then((res) => {
      setValue("litreFiyat", res?.data.price);
      setValue("kdvOrani", res?.data.kdv);
      setValue("kdvDahilHaric", res?.data.kdvDahilHaric);
    });

    // Reset miktar and tutar when yakitTipId changes
    setValue("miktar", null);
    setValue("tutar", null);
  }, [watch("yakitTipId"), setValue]);

  // ------------------------------------------------------------------
  // 2.1) ENSURE kdvDahilHaric IS ALWAYS SET CORRECTLY
  // ------------------------------------------------------------------
  useEffect(() => {
    // This effect ensures kdvDahilHaric is always set correctly
    // It runs both on component mount and when yakitTipId changes
    const yakitTipId = watch("yakitTipId");
    if (yakitTipId) {
      GetMaterialPriceService(yakitTipId).then((res) => {
        if (res?.data && res?.data.kdvDahilHaric !== undefined) {
          setValue("kdvDahilHaric", res?.data.kdvDahilHaric);
        }
      });
    }
  }, []);

  // ------------------------------------------------------------------
  // 3) FULL DEPO İSE VE MİKTAR ALANI BOŞ İSE -> OTO DEPO HACMİ YAP
  // ------------------------------------------------------------------
  useEffect(() => {
    const fullDepo = watch("fullDepo");
    const miktar = watch("miktar");
    const yakitHacmi = watch("yakitHacmi");

    // Only set the value when fullDepo is checked and miktar is null or 0
    // This prevents overriding user's manual clearing of the field
    if (fullDepo && (!miktar || miktar === 0) && !document.activeElement?.name?.includes("miktar")) {
      setValue("miktar", yakitHacmi);
    }
  }, [watch("fullDepo"), watch("miktar"), watch("yakitHacmi"), setValue]);

  // ------------------------------------------------------------------
  // 4) YAKIT TÜKETİMİ (tuketim) HESAPLAYAN ETKİ
  // ------------------------------------------------------------------
  useEffect(() => {
    const fullDepo = watch("fullDepo");
    const farkKm = watch("farkKm");
    const miktar = watch("miktar");
    const yakitHacmi = watch("yakitHacmi");

    let tktm = 0; // km başına litre (sonra *100 yapılıyor)

    if (fullDepo) {
      if (farkKm > 0 && miktar > 0) {
        tktm = miktar / farkKm;
      } else {
        tktm = 0;
      }

      // Detay pop-up içeriği fullDepo = true
      const contentFull = (
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
            <p className="text-info">{miktar} lt</p>
          </div>
          <div className="col-span-5">
            <p>{t("kalanYakitMiktari")}:</p>
          </div>
          <div className="col-span-6">
            <div className="text-info">
              <Controller name="depoYakitMiktar" control={control} render={({ field }) => <InputNumber {...field} value={yakitHacmi - miktar} readOnly />} />
              &nbsp; lt (Depo {fullDepo ? "fullendi" : "fullenmedi"})
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
      setContent(contentFull);
    } else {
      // fullDepo = false
      if (history[0]?.fullDepo) {
        // Son kayıtta full depo varsa
        if (farkKm > 0 && miktar > 0) {
          tktm = history[0]?.miktar / farkKm;
        } else {
          tktm = 0;
        }

        const contentNotFull = (
          <div className="grid detail-tuketim">
            <div className="col-span-5">
              <p>{t("gidilenYol")}:</p>
            </div>
            <div className="col-span-6">
              <p className="text-info">{farkKm} km</p>
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
                <Controller name="depoYakitMiktar" control={control} render={({ field }) => <InputNumber {...field} onChange={(val) => field.onChange(val)} />} />
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
        setContent(contentNotFull);
      } else {
        // Son kayıtta da fullDepo=false
        if (farkKm > 0 && miktar > 0) {
          tktm = yakitHacmi !== null ? yakitHacmi / farkKm : 0;
        } else {
          tktm = 0;
        }

        const contentOther = (
          <div className="grid detail-tuketim">
            <div className="col-span-5">
              <p>{t("gidilenYol")}:</p>
            </div>
            <div className="col-span-6">
              <p className="text-info">{farkKm} km</p>
            </div>
            <div className="col-span-5">
              <p>{t("aracDepoHacmi")}:</p>
            </div>
            <div className="col-span-6">
              <p className="text-info">{yakitHacmi} lt</p>
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
                <Controller name="depoYakitMiktar" control={control} render={({ field }) => <InputNumber {...field} onChange={(val) => field.onChange(val)} />} />
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
        setContent(contentOther);
      }
    }

    // Tüketim = tktm * 100 (lt/100km)
    setValue("tuketim", (tktm * 100).toFixed(2));
  }, [watch("fullDepo"), watch("farkKm"), watch("miktar"), watch("yakitHacmi"), control, history, setValue, t]);

  // ------------------------------------------------------------------
  // 5) DEPO HACMİ KONTROLÜ
  // ------------------------------------------------------------------
  useEffect(() => {
    if (watch("depoYakitMiktar") + history[0]?.miktar > watch("yakitHacmi")) {
      message.warning("Miktar depo hacminden büyükdür. Depo hacmini güncelleyin!");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [watch("depoYakitMiktar")]);

  // ------------------------------------------------------------------
  // 6) LİTRE FİYATI DEĞİŞİNCE MİKTAR VE TUTAR DEĞERLERİNİ SIFIRLA
  // ------------------------------------------------------------------
  useEffect(() => {
    // Skip initial render
    if (watch("litreFiyat") !== undefined) {
      setValue("miktar", null);
      setValue("tutar", null);
    }
  }, [watch("litreFiyat"), setValue]);

  // ------------------------------------------------------------------
  // 7) DEPO HACMİ GÜNCELLE
  // ------------------------------------------------------------------
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

  // ------------------------------------------------------------------
  // 10) FETCH DATA (sonAlinanKm + 3 yakıt kaydı)
  // ------------------------------------------------------------------
  const fetchData = () => {
    const body = {
      aracId: watch("aracId"),
      tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
      saat: dayjs(watch("saat")).format("HH:mm:ss"),
    };
    GetKmRangeBeforeDateService(body).then((res) => {
      if (res.data === -1) {
        setValue("sonAlinanKm", 0);
      } else {
        setValue("sonAlinanKm", res.data);
      }
      // Eskiden burada farkKm hesaplayıp set ediyorduk; SİLDİK
      // Çünkü artık bu hesaplamayı onChange'lerde yapıyoruz.
    });

    GetLastThreeFuelRecordService(watch("aracId"), dayjs(watch("tarih")).format("YYYY-MM-DD"), dayjs(watch("saat")).format("HH:mm:ss")).then((res) => setHistory(res.data));
  };

  // ------------------------------------------------------------------
  // 11) MODAL FOOTER
  // ------------------------------------------------------------------
  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={updateDepoHacmi}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => setOpen(false)}>
      {t("iptal")}
    </Button>,
  ];

  const detailModalFooter = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => setOpenDetail(false)}>
      {t("kapat")}
    </Button>,
  ];

  // ------------------------------------------------------------------
  // RETURN
  // ------------------------------------------------------------------
  return (
    <>
      {contextHolder}

      {/* --------- 1. KISIM: PLAKA, SÜRÜCÜ, TARİH, SAAT --------- */}
      <div className="grid gap-4 border p-10">
        <div className="col-span-6">
          <div className="grid gap-1">
            {/* --- Plaka --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="plaka">
                  {t("plaka")} <span className="text-danger">*</span>
                </label>
                {selectedRow ? <PlakaGetValueFromProp selectedRow={selectedRow} required={true} /> : <Plaka required={true} />}
              </div>
            </div>
            {/* --- Sürücü --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="surucuId">{t("surucu")}</label>
                <Driver />
              </div>
            </div>
            {/* --- Tarih --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("tarih")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tarih"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <ConfigProvider locale={tr_TR}>
                        <DatePicker
                          {...field}
                          format="DD.MM.YYYY"
                          className={fieldState.error ? "input-error" : ""}
                          onBlur={() => fetchData()}
                          onChange={(dateVal) => {
                            field.onChange(dateVal);
                          }}
                        />
                      </ConfigProvider>
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>
            {/* --- Saat --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("saat")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="saat"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                        <TimePicker
                          {...field}
                          format="HH:mm:ss"
                          className={fieldState.error ? "input-error" : ""}
                          onBlur={() => fetchData()}
                          onChange={(timeVal) => {
                            field.onChange(timeVal);
                          }}
                        />
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- YAKIT TİPİ, STOKTAN KULLANIM --- */}
        <div className="col-span-6">
          <div className="grid gap-1">
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("yakitTip")}</label>
                <MaterialType
                  name="yakitTip"
                  codeName="yakitTipId"
                  type="YAKIT"
                  onChange={(value) => {
                    // Reset miktar and tutar when yakitTipId changes
                    setValue("miktar", null);
                    setValue("tutar", null);
                  }}
                />
              </div>
            </div>
            <div className="col-span-6 flex flex-col">
              <label>{t("stoktanKullanim")}</label>
              <CheckboxInput name="stokKullanimi" />
            </div>
          </div>
        </div>
      </div>

      {/* --------- 2. KISIM: KM BİLGİLERİ --------- */}
      <div className="grid gap-4 border p-10 mt-10">
        <div className="col-span-6">
          <div className="grid gap-1">
            {/* --- SON ALINAN KM --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("sonAlinanKm")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="sonAlinanKm"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputNumber
                        {...field}
                        className={fieldState.error ? "input-error w-full" : "w-full"}
                        // Projende var olan readOnly kontrolü:
                        readOnly={data.sonAlinanKm !== 0}
                        onChange={(value) => {
                          field.onChange(value);

                          // YENİ MANTIK:
                          const alKm = watch("alinanKm") ?? 0;
                          if (value === 0) {
                            setValue("farkKm", 0);
                          } else {
                            setValue("farkKm", alKm - value);
                          }
                        }}
                      />
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>

            {/* --- ALINAN KM --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("yakitinAlindigiKm")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="alinanKm"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputNumber
                        {...field}
                        className={fieldState.error ? "input-error w-full" : "w-full"}
                        style={response === "error" ? { borderColor: "#dc3545" } : response === "success" ? { borderColor: "#23b545" } : { color: "#000" }}
                        onChange={(value) => {
                          field.onChange(value);

                          // Fark Km hesaplama mantığı
                          const sonKm = watch("sonAlinanKm") ?? 0;
                          if (sonKm === 0) {
                            setValue("farkKm", 0);
                          } else {
                            setValue("farkKm", value - sonKm);
                          }
                        }}
                      />
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>

            {/* --- FARK KM: SALT OKUNUR --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("farkKm")}</label>
                <Controller
                  name="farkKm"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      readOnly
                      // Negatifse 0 göster
                      value={watch("farkKm") < 0 ? 0 : watch("farkKm")}
                    />
                  )}
                />
              </div>
            </div>

            {/*
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("engelle")}</label>
                <Controller
                  name="engelle"
                  control={control}
                  render={({ field }) => <Checkbox className="custom-checkbox" {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                />
              </div>
            </div>
            */}
          </div>
        </div>

        {/* --------- SAĞ TARAFTA: MİKTAR, FULL DEPO, TÜKETİM vb. --------- */}
        <div className="col-span-6">
          <div className="grid gap-1">
            {/* --- MİKTAR --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <div className="flex align-baseline gap-1">
                  <label htmlFor="miktar">
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
                          if (watch("yakitHacmi") === 0 && !watch("fullDepo")) {
                            message.warning("Depo Hacmi sıfırdır. Depo hacmi giriniz!");
                          }
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

            {/* --- FULL DEPO + ORTALAMA TÜKETİM --- */}
            <div className="col-span-6">
              <div className="grid">
                <div className="col-span-4 flex flex-col">
                  <label htmlFor="">{t("fullDepo")}</label>
                  <CheckboxInput name="fullDepo" />
                </div>
                {/* <div className="col-span-8">
                  <div className="grid gap-1">
                    <div className="col-span-10">
                      <div className="flex flex-col gap-1">
                        <label>
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

            {/* --- LİTRE FİYATI --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {watch("birim") === "LITRE" && t("litre")} {t("fiyati")}
                </label>
                <div className="flex items-center gap-1">
                  <Controller
                    name="litreFiyat"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        className="w-full"
                        disabled={true}
                        decimalSeparator={getDecimalSeparator()}
                        onChange={(val) => {
                          field.onChange(val);
                          const tutarVal = watch("tutar") ?? 0;
                          if (!val || val === 0) {
                            setValue("miktar", 0);
                          } else {
                            const miktarHesap = +tutarVal / +val;
                            setValue("miktar", miktarHesap);
                          }
                        }}
                      />
                    )}
                  />
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      const yakitTipId = watch("yakitTipId");
                      if (yakitTipId) {
                        setSelectedYakitTipId(yakitTipId);
                        setUpdateModalOpen(true);
                      } else {
                        message.warning("Lütfen önce yakıt tipi seçiniz!");
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* --- TUTAR --- */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("tutar")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tutar"
                  control={control}
                  rules={{ required: "Bu alan boş bırakılamaz!" }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputNumber
                        {...field}
                        className={fieldState.error ? "input-error w-full" : "w-full"}
                        decimalSeparator={getDecimalSeparator()}
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
                      {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------- DEPO HACMİ GÜNCELLEME MODAL --------- */}
      <Modal open={open} maskClosable={false} title={t("depoHacmiGirisi")} footer={footer} onCancel={() => setOpen(false)}>
        <Controller name="yakitHacmi" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
      </Modal>

      {/* --------- ORTALAMA TÜKETİM DETAY MODAL --------- */}
      <Modal open={openDetail} maskClosable={false} title={t("ortalamaYakitTuketimi")} footer={detailModalFooter} onCancel={() => setOpenDetail(false)}>
        {content /* Yukarıda "setContent(...)" ile atanan JSX içeriği */}
      </Modal>

      {/* --------- YAKIT TANIM GÜNCELLEME MODAL --------- */}
      {updateModalOpen && (
        <UpdateModal
          updateModal={updateModalOpen}
          setUpdateModal={setUpdateModalOpen}
          setStatus={(status) => {
            if (status) {
              // Refresh litreFiyat after update
              if (watch("yakitTipId")) {
                GetMaterialPriceService(watch("yakitTipId")).then((res) => {
                  setValue("litreFiyat", res?.data.price);
                  setValue("kdvOrani", res?.data.kdv);
                });
              }
            }
          }}
          id={selectedYakitTipId}
        />
      )}

      {/* --------- SON 3 YAKIT KAYDI GÖRSEL --------- */}
      {watch("plaka") && history.length >= 3 && (
        <div className="grid gap-1 border p-10 mt-10">
          <div className="col-span-12">
            <div className="grid">
              {/* 3 kaydın eskisi gibi yan yana gösterimi */}
              <div className="col-span-2 flex flex-col" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px" }}>{dayjs(history[2]?.tarih).format("DD.MM.YYYY")}</p>
                <div>
                  <img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} />
                </div>
                <p style={{ fontSize: "14px" }}>{history[2]?.sonAlinanKm} km</p>
                <p style={{ fontSize: "14px" }}>
                  {history[2]?.miktar} Lt. {history[2]?.fullDepo && <CheckOutlined className="text-success" />}
                </p>
                <p style={{ fontSize: "14px" }}>{Number(history[2]?.tuketim).toFixed(history[2]?.ortalamaFormat || 2)} Lt.Km..</p>
              </div>
              <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
                <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                <p>{history[2]?.farkKm} km</p>
              </div>

              <div className="col-span-2 flex flex-col" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px" }}>{dayjs(history[1]?.tarih).format("DD.MM.YYYY")}</p>
                <div>
                  <img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} />
                </div>
                <p style={{ fontSize: "14px" }}>{history[1]?.sonAlinanKm} km</p>
                <p style={{ fontSize: "14px" }}>
                  {history[1]?.miktar} Lt. {history[1]?.fullDepo && <CheckOutlined className="text-success" />}
                </p>
                <p style={{ fontSize: "14px" }}>{Number(history[1]?.tuketim).toFixed(history[1]?.ortalamaFormat || 2)} Lt.Km..</p>
              </div>
              <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
                <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                <p>{history[1]?.farkKm} km</p>
              </div>

              <div className="col-span-2 flex flex-col" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px" }}>{dayjs(history[0]?.tarih).format("DD.MM.YYYY")}</p>
                <div>
                  <img src="/images/Mor.svg" alt="" style={{ width: "20%" }} />
                </div>
                <p style={{ fontSize: "14px" }}>{history[0]?.sonAlinanKm} km</p>
                <p style={{ fontSize: "14px" }}>
                  {history[0]?.miktar} Lt. {history[0]?.fullDepo && <CheckOutlined className="text-success" />}
                </p>
                <p style={{ fontSize: "14px" }}>{Number(history[0]?.tuketim).toFixed(history[0]?.ortalamaFormat || 2)} Lt.Km..</p>
              </div>
              <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
                <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                <p>{history[0]?.farkKm} km</p>
              </div>
              <div className="col-span-2 mt-20" style={{ textAlign: "center" }}>
                <div>
                  <img src="/images/Araba.svg" alt="" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="grid gap-4 border p-10 mt-10"
        style={{
          display: "none",
        }}
      >
        <div className="col-span-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="kdvOrani">
              {t("kdvOrani")} <span className="text-danger">*</span>
            </label>
            <InputNumber
              style={{ width: "100%" }}
              name="kdvOrani"
              placeholder={t("kdvOrani")}
              suffix="%"
              min={0}
              max={100}
              onChange={(value) => setValue("kdvOrani", value)}
              value={watch("kdvOrani")}
            />
          </div>
        </div>

        <div className="col-span-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="kdvTutari">{t("kdvTutari")}</label>
            <Input style={{ width: "100%" }} name="kdvTutari" placeholder={t("kdvTutari")} readOnly value={watch("kdvTutari")} />
          </div>
        </div>
      </div>

      <Row
        gutter={24}
        style={{
          display: "none",
        }}
      >
        <Col xs={24} md={8}>
          <div className="flex flex-col gap-1">
            <label>{t("kdvDahil")}</label>
            <Controller
              name="kdvDahilHaric"
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  {t("kdvDahil")}
                </Checkbox>
              )}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

GeneralInfo.propTypes = {
  setIsValid: PropTypes.func,
  response: PropTypes.string,
};

export default GeneralInfo;
