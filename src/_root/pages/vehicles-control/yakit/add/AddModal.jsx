import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../context/plakaSlice";
import { AddFuelService, GetFuelCardContentByIdService, GetMaterialPriceService } from "../../../../../api/services/vehicles/operations_services";
import GeneralInfo from "./GeneralInfo";
import PersonalFields from "../../../../components/form/personal-fields/PersonalFields";

const AddModal = ({ setStatus, onRefresh, seferId = null, selectedRow = null }) => {
  const { data, plaka, setPlaka, setData, setHistory } = useContext(PlakaContext);

  const [openModal, setopenModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [response, setResponse] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "OZELALAN_1",
      value: "Özel Alan 1",
      type: "text",
    },
    {
      label: "ozelAlan2",
      key: "OZELALAN_2",
      value: "Özel Alan 2",
      type: "text",
    },
    {
      label: "ozelAlan3",
      key: "OZELALAN_3",
      value: "Özel Alan 3",
      type: "text",
    },
    {
      label: "ozelAlan4",
      key: "OZELALAN_4",
      value: "Özel Alan 4",
      type: "text",
    },
    {
      label: "ozelAlan5",
      key: "OZELALAN_5",
      value: "Özel Alan 5",
      type: "text",
    },
    {
      label: "ozelAlan6",
      key: "OZELALAN_6",
      value: "Özel Alan 6",
      type: "text",
    },
    {
      label: "ozelAlan7",
      key: "OZELALAN_7",
      value: "Özel Alan 7",
      type: "text",
    },
    {
      label: "ozelAlan8",
      key: "OZELALAN_8",
      value: "Özel Alan 8",
      type: "text",
    },
    {
      label: "ozelAlan9",
      key: "OZELALAN_9",
      value: "Özel Alan 9",
      type: "select",
      code: 867,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 868,
      name2: "ozelAlanKodId10",
    },
    {
      label: "ozelAlan11",
      key: "OZELALAN_11",
      value: "Özel Alan 11",
      type: "number",
    },
    {
      label: "ozelAlan12",
      key: "OZELALAN_12",
      value: "Özel Alan 12",
      type: "number",
    },
  ]);

  const defaultValues = {
    sonAlinanKm: null,
    plaka: "",
    yakitTipId: null,
    yakitTanki: "",
    surucuId: null,
    surucu: "",
    litreFiyat: null,
    yakitHacmi: null,
    tarih: dayjs(new Date()),
    saat: dayjs(new Date()),
    alinanKm: null,
    farkKm: null,
    miktar: null,
    fullDepo: false,
    tutar: null,
    tuketim: null,
    engelle: false,
    kdvOrani: 20,
    kdvTutari: 0,
    kdvDahilHaric: false,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    setValue("surucuId", data.surucuId);
    setValue("surucu", data.surucuAdi);
    setValue("tarih", dayjs(new Date()));
    setValue("saat", dayjs(new Date()));
    setValue("sonAlinanKm", data.sonAlinanKm);
    setValue("litreFiyat", data.litreFiyat);
    setValue("yakitHacmi", data.yakitHacmi);
    setValue("yakitTip", data.yakitTip);
    setValue("yakitTipId", data.yakitTipId);
    setValue("yakitTanki", data.yakitTanki);
    setValue("birim", data.birim);
    setValue("depoYakitMiktar", data.depoYakitMiktar);
    setValue("guncelKmLog", data.guncelKmLog);
    setValue("kdvDahilHaric", data.kdvDahilHaric);

    // Ensure kdvDahilHaric is set correctly when modal opens
    if (data.yakitTipId) {
      GetMaterialPriceService(data.yakitTipId).then((res) => {
        if (res?.data && res?.data.kdvDahilHaric !== undefined) {
          setValue("kdvDahilHaric", res?.data.kdvDahilHaric);
        }
      });
    }

    if (plaka.length === 1) {
      setValue("plaka", plaka[0].id);
    }

    if (watch("farkKm") < 0 && !watch("alinanKm")) setValue("farkKm", null);

    const subscription = watch((value, { name }) => {
      if (name === "tutar" || name === "kdvOrani" || name === "kdvDahilHaric") {
        const tutar = parseFloat(value.tutar) || 0;
        const kdvOrani = parseFloat(value.kdvOrani) || 0;
        const kdvDahilMi = value.kdvDahilHaric;

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

        setValue("kdvTutari", kdvTutari.toFixed(2));
      }
    });
    return () => subscription.unsubscribe();
  }, [data]);

  useEffect(() => {
    if (!watch("yakitTipId")) return;

    GetMaterialPriceService(watch("yakitTipId")).then((res) => {
      setValue("litreFiyat", res?.data.price);
      setValue("kdvOrani", res?.data.kdv);
      setValue("kdvDahilHaric", res?.data.kdvDahilHaric);
    });
  }, [watch("yakitTipId"), setValue]);

  const onSubmit = handleSubmit((values) => {
    // Ensure kdvDahilHaric is set correctly before submission
    if (values.yakitTipId) {
      GetMaterialPriceService(values.yakitTipId).then((res) => {
        if (res?.data && res?.data.kdvDahilHaric !== undefined) {
          values.kdvDahilHaric = res?.data.kdvDahilHaric;
        }

        // Continue with form submission after ensuring kdvDahilHaric is set
        submitForm(values);
      });
    } else {
      // If no yakitTipId, just submit the form
      submitForm(values);
    }
  });

  const submitForm = (values) => {
    const kmLog = {
      kmAracId: data.aracId,
      plaka: data.plaka,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
      saat: dayjs(values.saat).format("HH:mm:ss"),
      eskiKm: data.sonAlinanKm,
      yeniKm: values.alinanKm,
      kaynak: "YAKIT",
      dorse: true,
      lokasyon: data.lokasyon,
      lokasyonId: data.lokasyonId,
      aciklama: "",
    };

    const body = {
      ...(seferId !== null && { SeferSirano: seferId }),
      aracId: data.aracId,
      plaka: data.plaka,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD") || null,
      saat: dayjs(values.saat).format("HH:mm:ss") || null,
      surucuId: values.surucuId,
      yakitTipId: values.yakitTipId,
      sonAlinanKm: values.sonAlinanKm,
      farkKm: values.farkKm,
      // tuketim: values.tuketim,
      alinanKm: values.alinanKm,
      miktar: values.miktar ? values.miktar : 0.0,
      fullDepo: values.fullDepo,
      stokKullanimi: values.stokKullanimi,
      litreFiyat: values.litreFiyat,
      tutar: values.tutar ? values.tutar : 0,
      kdvOran: values.kdvOrani || 0,
      kdv: values.kdvTutari || 0,
      kdvSizTutar: values.kdvDahilHaric ? values.tutar - values.kdvTutari || 0 : values.tutar || 0,
      kdvDahilHaric: values.kdvDahilHaric || false,
      birim: data.birim,
      ozelKullanim: false,
      kmLog: kmLog,
      depoYakitMiktar: values.depoYakitMiktar,
      yakitTanki: values.yakitTanki,
      lokasyonId: data.lokasyonId,
      ozelAlan1: values.ozelAlan1 || "",
      ozelAlan2: values.ozelAlan2 || "",
      ozelAlan3: values.ozelAlan3 || "",
      ozelAlan4: values.ozelAlan4 || "",
      ozelAlan5: values.ozelAlan5 || "",
      ozelAlan6: values.ozelAlan6 || "",
      ozelAlan7: values.ozelAlan7 || "",
      ozelAlan8: values.ozelAlan8 || "",
      ozelAlanKodId9: values.ozelAlanKodId9 || -1,
      ozelAlanKodId10: values.ozelAlanKodId10 || -1,
      ozelAlan11: values.ozelAlan11 || 0,
      ozelAlan12: values.ozelAlan12 || 0,
      hasToInsertKmLog: values.engelle ? values.engelle : false,
      isRecordSeen: true,
    };

    AddFuelService(body)
      .then((res) => {
        if (res?.data.statusCode == 200) {
          onRefresh();
          setResponse("normal");
          setopenModal(false);
          if (plaka.length === 1) {
            reset({
              plaka: data.plaka,
              sonAlinanKm: data.sonAlinanKm,
              litreFiyat: data.litreFiyat,
              tarih: dayjs(new Date()),
              saat: dayjs(new Date()),
              alinanKm: null,
              farkKm: null,
              miktar: null,
              fullDepo: false,
              tutar: null,
              tuketim: null,
              engelle: false,
              surucuId: data.surucuId,
              yakitTipId: data.yakitTipId,
              yakitTip: data.yakitTip,
              surucu: data.surucuAdi,
              stokKullanimi: data.stokKullanimi,
              yakitHacmi: data.yakitHacmi,
            });
          } else {
            reset({
              plaka: null,
              sonAlinanKm: null,
              litreFiyat: null,
              tarih: dayjs(new Date()),
              saat: dayjs(new Date()),
              alinanKm: null,
              farkKm: null,
              miktar: null,
              fullDepo: false,
              tutar: null,
              tuketim: null,
              engelle: false,
              surucuId: null,
              yakitTipId: null,
              yakitTip: null,
              surucu: null,
              stokKullanimi: null,
              yakitHacmi: null,
            });
          }
          setHistory([]);
          setLoading(false);
          setActiveKey("1");
          if (plaka.length === 1) {
            GetFuelCardContentByIdService(plaka[0].id).then((res) => {
              setData(res.data);
            });
          }
        } else if (res?.data.statusCode == 400) {
          const tarihSaat = `${dayjs(values.tarih).format("DD.MM.YYYY")} ${dayjs(values.saat).format("HH:mm:ss")}`;
          message.warning(
            `Seçtiğiniz tarih/saatte (${tarihSaat}) sistemdeki km aralığı ${res?.data?.data} - ${res?.data?.data1}. Girdiğiniz km (${values.alinanKm}) bu aralığın dışında olduğu için kayıt engellendi.`
          );
        } else {
          message.error("Bir sorun oluşdu! Tekrar deneyiniz.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // setStatus(false);
  };

  const personalProps = {
    form: "YAKIT",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: "Genel Bilgiler",
      children: <GeneralInfo selectedRow={selectedRow} setIsValid={setIsValid} response={response} setResponse={setResponse} />,
    },
    {
      key: "2",
      label: "Özel Alanlar",
      children: <PersonalFields personalProps={personalProps} />,
    },
  ];

  const resetForm = (plaka, data, reset) => {
    if (plaka.length === 1) {
      reset({
        plaka: data.plaka,
        sonAlinanKm: data.sonAlinanKm,
        litreFiyat: data.litreFiyat,
        tarih: dayjs(new Date()),
        saat: dayjs(new Date()),
        alinanKm: null,
        farkKm: null,
        miktar: null,
        fullDepo: false,
        tutar: null,
        tuketim: null,
        engelle: false,
        yakitHacmi: data.yakitHacmi,
        surucuId: data.surucuId,
        yakitTipId: data.yakitTipId,
        yakitTip: data.yakitTip,
        surucu: data.surucuAdi,
        stokKullanimi: data.stokKullanimi,
        kdvOrani: 20,
        kdvTutari: 0,
        kdvDahilHaric: data.kdvDahilHaric,
      });
      // Ensure kdvDahilHaric is set correctly after reset
      if (data.yakitTipId) {
        GetMaterialPriceService(data.yakitTipId).then((res) => {
          if (res?.data && res?.data.kdvDahilHaric !== undefined) {
            setValue("kdvDahilHaric", res?.data.kdvDahilHaric);
          }
        });
      }
    } else {
      reset();
    }
  };

  const footer = [
    loading ? (
      <Button className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid}>
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setopenModal(false);
        resetForm(plaka, data, reset);
        setResponse("normal");
        setHistory([]);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  const handleOpen = () => {
    reset(defaultValues); // Her açılışta formu varsayılan değerlere sıfırla
    setPlaka([]);
    setData([]);
    setopenModal(true);
  };

  return (
    <>
      <Button className="btn primary-btn" onClick={handleOpen}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniYakitGirisi")}
        open={openModal}
        // Modal kapandıktan sonra formu resetliyoruz
        afterClose={() => {
          // İstediğiniz defaultValues ile formu resetlersiniz
          reset(defaultValues);
        }}
        destroyOnClose
        onCancel={() => {
          setopenModal(false);
          resetForm(plaka, data, reset);
          setResponse("normal");
          setHistory([]);
          setActiveKey("1");
        }}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <p className="count">
          {t("guncelKm")}: [ {watch("guncelKmLog")} km ]
        </p>
        <FormProvider {...methods}>
          <form>
            <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
};

export default AddModal;
